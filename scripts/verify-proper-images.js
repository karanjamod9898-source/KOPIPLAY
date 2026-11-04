const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9295;

async function run() {
  console.log('=== VERIFYING REFINED GAME GRID & IMAGE DISPLAY ===');

  const userDataDir = path.join(__dirname, '..', '.chrome-tmp-gridfix');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${userDataDir}`,
    '--window-size=1920,1080'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const data = await new Promise((res, rej) => {
    http.get(`http://127.0.0.1:${PORT}/json`, r => {
      let s = ''; r.on('data', c => s += c); r.on('end', () => res(s));
    }).on('error', rej);
  });
  const page = JSON.parse(data).find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data.toString('utf8'));
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');

  // 1. Test #/games
  console.log('Navigating to http://127.0.0.1:8080/#/games');
  await send('Page.navigate', { url: 'http://127.0.0.1:8080/#/games' });
  await new Promise(r => setTimeout(r, 1500));

  const evalCards = await send('Runtime.evaluate', {
    expression: `(() => {
      const cards = Array.from(document.querySelectorAll('.poki-card')).slice(0, 20);
      return cards.map((c, i) => {
        const rect = c.getBoundingClientRect();
        const img = c.querySelector('img');
        const title = c.querySelector('.poki-card-title');
        return {
          i,
          title: title ? title.textContent : '',
          span: c.className.split(' ').filter(x => x.startsWith('span-'))[0],
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          ratio: (rect.width / rect.height).toFixed(2),
          imgLoaded: img ? img.complete && img.naturalWidth > 0 : false
        };
      });
    })()`,
    returnByValue: true
  });

  console.table(evalCards.result.value);

  const snap1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/proper_games_grid_desktop.png', Buffer.from(snap1.data, 'base64'));
  console.log('Saved reports/proper_games_grid_desktop.png');

  // 2. Test Mobile 375x812
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  const snapMobile = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/proper_games_grid_mobile.png', Buffer.from(snapMobile.data, 'base64'));
  console.log('Saved reports/proper_games_grid_mobile.png');

  // 3. Reset to Desktop and test Homepage #/
  await send('Emulation.clearDeviceMetricsOverride');
  await send('Page.navigate', { url: 'http://127.0.0.1:8080/#/' });
  await new Promise(r => setTimeout(r, 1500));

  const snapHome = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/proper_homepage_desktop.png', Buffer.from(snapHome.data, 'base64'));
  console.log('Saved reports/proper_homepage_desktop.png');

  ws.close();
  try { chromeProc.kill(); } catch (e) {}
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}

  console.log('=== ALL TESTS COMPLETED SUCCESSFULLY ===');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});


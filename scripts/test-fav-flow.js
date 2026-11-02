const http = require('http');
const { spawn } = require('child_process');

function getTargets(port) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function sendCommand(ws, method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function testFav() {
  const port = 9231;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--window-size=1366,768',
    'http://127.0.0.1:8080/#/game/neon-racer-02'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise(r => ws.addEventListener('open', r));
  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');

  await new Promise(r => setTimeout(r, 1000));

  // Toggle favorite via API or button
  const clickFav = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(function() {
      const toggle = (window.KOPI && window.KOPI.toggleFav) || (window.NEXUS && window.NEXUS.toggleFav);
      if (toggle) {
        toggle('neon-racer');
        return { called: true, count: JSON.parse(localStorage.getItem('kopiplay_favorites')).length };
      }
      return { called: false };
    })()`,
    returnByValue: true
  });
  console.log('Toggle favorite via controller:', clickFav.result.value);

  // Navigate to #/favorites
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/favorites';" });
  await new Promise(r => setTimeout(r, 600));

  const checkFavPage = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      favCardCount: document.querySelectorAll('#mainGamesGrid .game-card').length,
      cardTitle: document.querySelector('#mainGamesGrid .game-card-title') ? document.querySelector('#mainGamesGrid .game-card-title').innerText : ''
    })`,
    returnByValue: true
  });
  console.log('Favorites page with favorite game:', checkFavPage.result.value);

  // Navigate to #/recent
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/recent';" });
  await new Promise(r => setTimeout(r, 600));

  const checkRecentPage = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      recentCardCount: document.querySelectorAll('#mainGamesGrid .game-card').length,
      cardTitle: document.querySelector('#mainGamesGrid .game-card-title') ? document.querySelector('#mainGamesGrid .game-card-title').innerText : ''
    })`,
    returnByValue: true
  });
  console.log('Recent page with played game:', checkRecentPage.result.value);

  chrome.kill();
  process.exit(0);
}

testFav().catch(e => { console.error(e); process.exit(1); });

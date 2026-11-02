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

async function verify() {
  const port = 9229;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--window-size=1366,768',
    'http://127.0.0.1:8080/'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise(r => ws.addEventListener('open', r));
  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');

  // Check 1: Catalog length in browser
  const catCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: 'window.KIPO_CATALOG.length',
    returnByValue: true
  });
  console.log('Browser window.KIPO_CATALOG.length:', catCheck.result.value);

  // Check 2: Direct routes for removed games
  const slugs = ['rise-up-air-balloon', 'counter-war'];
  for (const s of slugs) {
    await sendCommand(ws, 'Page.navigate', { url: `http://127.0.0.1:8080/#/game/${s}` });
    await new Promise(r => setTimeout(r, 600));
    const check = await sendCommand(ws, 'Runtime.evaluate', {
      expression: '({ notFound: document.body.innerText.includes("Game Not Found"), title: document.title })',
      returnByValue: true
    });
    console.log(`Route #/game/${s}:`, check.result.value);
  }

  // Check 3: Search for counter-war
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/games?q=counter';" });
  await new Promise(r => setTimeout(r, 500));
  const searchCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: '({ cardCount: document.querySelectorAll("#mainGamesGrid .game-card").length })',
    returnByValue: true
  });
  console.log('Search "counter":', searchCheck.result.value);

  // Check 4: Category Action View
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/category/action';" });
  await new Promise(r => setTimeout(r, 500));
  const actionCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: '({ cardCount: document.querySelectorAll("#mainGamesGrid .game-card").length })',
    returnByValue: true
  });
  console.log('Category Action cards:', actionCheck.result.value);

  // Check 5: Live game player
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/game/neon-racer-02' });
  await new Promise(r => setTimeout(r, 1000));
  const liveCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: '({ title: document.title, iframe: !!document.querySelector("iframe") })',
    returnByValue: true
  });
  console.log('Live game test (neon-racer-02):', liveCheck.result.value);

  chrome.kill();
  process.exit(0);
}

verify().catch(e => { console.error(e); process.exit(1); });


const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

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

async function run() {
  const removedSlugs = [
    'temple-run',
    'angry-birds-blast',
    'fruit-ninja',
    'urus-city-driver',
    'charger-city-driver',
    'chiron-city-driver'
  ];

  const port = 9228;
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

  // Verify homepage catalog count in window.KIPO_CATALOG
  const catalogCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: 'window.KIPO_CATALOG.length',
    returnByValue: true
  });
  console.log('window.KIPO_CATALOG length in browser:', catalogCheck.result.value);

  // Check each removed game URL
  for (const slug of removedSlugs) {
    await sendCommand(ws, 'Page.navigate', { url: `http://127.0.0.1:8080/#/game/${slug}` });
    await new Promise(r => setTimeout(r, 600));

    const check = await sendCommand(ws, 'Runtime.evaluate', {
      expression: '({ text: document.body.innerText.includes("Game Not Found"), title: document.title })',
      returnByValue: true
    });
    console.log(`Navigation to #/game/${slug}:`, check.result.value);
  }

  // Check search for "Temple Run"
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/games?q=temple';" });
  await new Promise(r => setTimeout(r, 600));
  const searchCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: '({ cardCount: document.querySelectorAll("#mainGamesGrid .game-card").length, body: document.body.innerText.includes("No games found") })',
    returnByValue: true
  });
  console.log('Search for "temple":', searchCheck.result.value);

  // Navigate back to live game
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/game/neon-racer-02' });
  await new Promise(r => setTimeout(r, 1000));
  const liveCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: '({ title: document.title, iframePresent: !!document.querySelector("iframe") })',
    returnByValue: true
  });
  console.log('Live game check (neon-racer-02):', liveCheck.result.value);

  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

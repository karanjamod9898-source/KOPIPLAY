const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function getTargets(port) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + port + '/json', (res) => {
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

async function testSuspiciousGames() {
  const suspicious = [
    'arrow-escape-tap-puzzle',
    'level-devil',
    'rise-up-air-balloon',
    'monster-truck',
    'counter-war',
    'subway-winter-vacation',
    'pool-club',
    'tank-wars-2',
    'merge-haven',
    'temple-run',
    'hand-fight',
    'dream-restaurant-3d'
  ];

  const port = 9238;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--window-size=1280,800',
    'http://127.0.0.1:8080/'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');

  const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf';
  const results = [];

  for (const slug of suspicious) {
    console.log(`Checking game slug: ${slug}...`);
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/${slug}';` });
    await new Promise(r => setTimeout(r, 5000));

    // Capture screenshot
    const snap = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
    const snapPath = path.join(artifactDir, `audit_test_${slug}.png`);
    fs.writeFileSync(snapPath, Buffer.from(snap.data, 'base64'));

    const state = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        src: document.getElementById('gameFrame')?.src,
        loaderHidden: document.getElementById('playerLoader')?.classList.contains('hidden'),
        retryDisplay: document.getElementById('playerRetryOverlay')?.style.display
      })`,
      returnByValue: true
    });

    // Check all targets to see if the game iframe created child frames or targets
    const allT = await getTargets(port);
    const iframeT = allT.filter(t => t.type === 'iframe');

    results.push({
      slug,
      playerState: state.result.value,
      iframeTargets: iframeT.map(t => t.url.slice(0, 80))
    });
  }

  console.log('Suspicious games audit results:');
  console.log(JSON.stringify(results, null, 2));

  ws.close();
  chrome.kill();
  process.exit(0);
}

testSuspiciousGames();


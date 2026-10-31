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

async function testAndScreenshot(slugs) {
  const port = 9233;
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

  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'Page.enable');

  const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf';

  for (const slug of slugs) {
    console.log(`Navigating to #${slug}...`);
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/${slug}';` });
    await new Promise(r => setTimeout(r, 6000)); // wait for game to load

    const snap = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
    const snapPath = path.join(artifactDir, `game_audit_${slug}.png`);
    fs.writeFileSync(snapPath, Buffer.from(snap.data, 'base64'));
    console.log(`Saved screenshot for ${slug}: ${snapPath}`);
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

testAndScreenshot([
  'home-island',
  'bubble-fall',
  'angry-heroes',
  'rise-up-air-balloon',
  'hand-fight'
]);


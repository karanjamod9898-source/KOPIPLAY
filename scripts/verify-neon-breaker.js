const http = require('http');
const { spawn } = require('child_process');

function getTargets(port) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

function send(ws, method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function checkNeon() {
  const port = 9232;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    'http://127.0.0.1:8080/#/game/neon-breakout'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  await send(ws, 'Page.enable');
  await send(ws, 'Runtime.enable');
  await new Promise(r => setTimeout(r, 1000));

  const res = await send(ws, 'Runtime.evaluate', {
    expression: '({ title: document.title, iframe: !!document.querySelector("iframe"), iframeSrc: document.querySelector("iframe") ? document.querySelector("iframe").src : "" })',
    returnByValue: true
  });
  console.log('Neon Breaker check:', res.result.value);

  chrome.kill();
  process.exit(0);
}
checkNeon();


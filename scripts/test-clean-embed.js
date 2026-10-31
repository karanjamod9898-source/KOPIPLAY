const http = require('http');
const { spawn } = require('child_process');

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

async function testCleanEmbed(guid) {
  const port = 9237;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    'http://127.0.0.1:8080/'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');

  const cleanUrl = `https://html5.gamedistribution.com/${guid}/`;
  console.log('Injecting clean embed URL:', cleanUrl);

  await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const frame = document.createElement('iframe');
      frame.id = 'testCleanFrame';
      frame.src = '${cleanUrl}';
      frame.width = '800';
      frame.height = '600';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      frame.setAttribute('allowfullscreen', 'true');
      frame.sandbox = 'allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-pointer-lock allow-modals';
      document.body.appendChild(frame);
    })()`
  });

  await new Promise(r => setTimeout(r, 6000));

  const afterTargets = await getTargets(port);
  console.log('Clean embed targets:');
  afterTargets.forEach(t => console.log('  ', t.type, t.url.slice(0, 100)));

  ws.close();
  chrome.kill();
  process.exit(0);
}

testCleanEmbed('82c9d9ae7f6d4ca6b00b36025870d17a');


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

async function testGameInBrowser(slug) {
  const port = 9232;
  console.log(`Testing slug '${slug}' on port ${port}...`);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    'http://127.0.0.1:8080/#/game/' + slug
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'Page.enable');

  const logs = [];
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.consoleAPICalled') {
      logs.push(`[${m.params.type}] ` + m.params.args.map(a => a.value || a.description).join(' '));
    }
  });

  // Wait 9 seconds (timeout is 8s)
  await new Promise(r => setTimeout(r, 9000));

  const evalRes = await sendCommand(ws, 'Runtime.evaluate', {
    expression: JSON.stringify({
      title: 'check',
      code: `({
        iframeSrc: document.getElementById('gameFrame')?.src,
        loaderHidden: document.getElementById('playerLoader')?.classList.contains('hidden'),
        retryDisplay: document.getElementById('playerRetryOverlay')?.style.display,
        retryText: document.getElementById('playerRetryOverlay')?.innerText
      })`
    }) + '.code'
  });

  // Evaluate the code
  const statusRes = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      iframeSrc: document.getElementById('gameFrame')?.src,
      loaderHidden: document.getElementById('playerLoader')?.classList.contains('hidden'),
      retryDisplay: document.getElementById('playerRetryOverlay')?.style.display
    })`,
    returnByValue: true
  });

  console.log('Player DOM status:', statusRes.result.value);
  console.log('Recorded Console Messages:', logs);

  ws.close();
  chrome.kill();
}

testGameInBrowser('home-island');


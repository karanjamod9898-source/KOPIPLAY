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

async function testBatchGuids(guids) {
  const port = 9239;
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

  for (const item of guids) {
    const cleanUrl = `https://html5.gamedistribution.com/${item.guid}/`;
    console.log(`Testing ${item.title} (${cleanUrl})...`);
    
    await sendCommand(ws, 'Runtime.evaluate', {
      expression: `(() => {
        let f = document.getElementById('testFrame');
        if (!f) {
          f = document.createElement('iframe');
          f.id = 'testFrame';
          f.width = '800';
          f.height = '600';
          f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
          f.setAttribute('allowfullscreen', 'true');
          f.sandbox = 'allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-pointer-lock allow-modals allow-orientation-lock allow-presentation';
          document.body.appendChild(f);
        }
        f.src = '${cleanUrl}';
      })()`
    });

    await new Promise(r => setTimeout(r, 4000));

    const allT = await getTargets(port);
    const frameT = allT.filter(t => t.type === 'iframe');
    console.log(`  -> Targets spawned: ${frameT.length}`);
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

testBatchGuids([
  { title: 'Home Island', guid: 'da1111d4369f4cb08525d593fe515fa4' },
  { title: 'Ludo Kingdom', guid: '320b65ea8ce34cb7a4537ff63576d976' },
  { title: 'Daily Sudoku', guid: 'dd9701cd84da40699cdc404645f29c1f' },
  { title: 'Wood & Screw Puzzle', guid: 'eef2c852d9784065a22a21d51cfdc9fd' },
  { title: 'Bomber Plane', guid: '9da40c9b342846f99339b7c4c8a428b7' }
]);


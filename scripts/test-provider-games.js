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

async function testGameTarget(slug, name) {
  const port = 9241;
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

  await new Promise(r => setTimeout(r, 5000));

  const allTargets = await getTargets(port);
  const iframeTargets = allTargets.filter(t => t.type === 'iframe');

  console.log(`[${name}] (#/game/${slug}):`);
  console.log('  Child iframe targets:', iframeTargets.length);
  iframeTargets.forEach(t => console.log('   -', t.url.slice(0, 95)));

  ws.close();
  chrome.kill();
  await new Promise(r => setTimeout(r, 1000));
}

async function run() {
  await testGameTarget('neon-racer', 'Local Arcade');
  await testGameTarget('hg-tower-defend', 'HTMLGames CDN');
  await testGameTarget('hg-gold-mine', 'HTMLGames CDN');
  await testGameTarget('home-island', 'GameDistribution');
  await testGameTarget('hand-fight', 'GameMonetize');
  await testGameTarget('level-devil', 'GitHub Pages');
  await testGameTarget('rise-up-air-balloon', 'Famobi');
}

run().catch(console.error);


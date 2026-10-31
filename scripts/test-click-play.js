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

async function testClickPlay(slug) {
  const port = 9236;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    'http://127.0.0.1:8080/#/game/' + slug
  ]);

  await new Promise(r => setTimeout(r, 6000));
  const targets = await getTargets(port);
  const iframeTarget = targets.find(t => t.type === 'iframe' && t.url.includes('gamedistribution.com'));
  if (iframeTarget) {
    const ws = new WebSocket(iframeTarget.webSocketDebuggerUrl);
    await new Promise(r => ws.addEventListener('open', r));
    await sendCommand(ws, 'Runtime.enable');
    
    // Click the play button inside the splash
    const clickRes = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('#gdsdk__splash button, #gdsdk__splash a, [class*="play"], .pluto-play-button');
        if (btn) {
          btn.click();
          return { clicked: true, tag: btn.tagName, text: btn.innerText, href: btn.href || null };
        }
        return { clicked: false, buttons: Array.from(document.querySelectorAll('button, a')).map(b => b.innerText) };
      })()`,
      returnByValue: true
    });
    console.log('Click result:', clickRes.result.value);

    await new Promise(r => setTimeout(r, 4000));

    const afterRes = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        innerText: document.body.innerText.slice(0, 200),
        innerIframes: Array.from(document.querySelectorAll('iframe')).map(f => f.src)
      })`,
      returnByValue: true
    });
    console.log('After click:', afterRes.result.value);
    ws.close();
  }
  chrome.kill();
  process.exit(0);
}

testClickPlay('bubble-fall');


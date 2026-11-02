const http = require('http');
const { spawn } = require('child_process');

async function testDOM() {
  const port = 9265;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    'http://127.0.0.1:8080/'
  ]);

  await new Promise(r => setTimeout(r, 2200));
  http.get(`http://127.0.0.1:${port}/json`, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', async () => {
      const targets = JSON.parse(d);
      const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `(function() {
              var hdr = document.getElementById('app-header');
              var mn = document.getElementById('app-main');
              return {
                title: document.title,
                headerLength: hdr ? hdr.innerHTML.length : 0,
                mainLength: mn ? mn.innerHTML.length : 0,
                mixedCards: document.querySelectorAll('.mixed-game-grid .game-card').length,
                exploreCards: document.querySelectorAll('.explore-all-section .game-card').length,
                totalCards: document.querySelectorAll('.game-card').length,
                categories: document.querySelectorAll('.category-showcase-card').length,
                bodyBg: window.getComputedStyle(document.body).backgroundColor
              };
            })()`,
            returnByValue: true
          }
        }));
      });
      ws.addEventListener('message', ev => {
        const msg = JSON.parse(ev.data);
        if (msg.id === 1) {
          console.log('Result Full:', JSON.stringify(msg.result, null, 2));
          chrome.kill();
          process.exit(0);
        }
      });
    });
  });
}
testDOM().catch(err => { console.error(err); process.exit(1); });

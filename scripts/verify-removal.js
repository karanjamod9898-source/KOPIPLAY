const http = require('http');

function send(ws, method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 100000);
    const cb = (data) => {
      const msg = JSON.parse(data);
      if (msg.id === id) {
        ws.off('message', cb);
        resolve(msg.result);
      }
    };
    ws.on('message', cb);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

http.get('http://127.0.0.1:9251/json', (res) => {
  let raw = '';
  res.on('data', c => raw += c);
  res.on('end', async () => {
    const tabs = JSON.parse(raw);
    const WebSocket = require('ws');
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    ws.on('open', async () => {
      await send(ws, 'Page.enable');
      await send(ws, 'Runtime.enable');
      
      // Navigate to home
      await send(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/' });
      await new Promise(r => setTimeout(r, 1200));

      const homeRes = await send(ws, 'Runtime.evaluate', {
        expression: '({ heroStat: document.querySelector(".hero-stats") ? document.querySelector(".hero-stats").innerText : "", gameCount: window.KIPO_CATALOG ? window.KIPO_CATALOG.length : 0 })',
        returnByValue: true
      });
      console.log('Homepage test:', homeRes.result.value);

      // Navigate to removed game
      await send(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/game/temple-run' });
      await new Promise(r => setTimeout(r, 800));

      const notFoundRes = await send(ws, 'Runtime.evaluate', {
        expression: '({ heading: document.querySelector("#app-main h2") ? document.querySelector("#app-main h2").innerText : "", notFound: document.body.innerText.includes("Game Not Found") })',
        returnByValue: true
      });
      console.log('Removed game test (temple-run):', notFoundRes.result.value);

      // Navigate to an existing game
      await send(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/game/neon-racer-02' });
      await new Promise(r => setTimeout(r, 1000));

      const liveRes = await send(ws, 'Runtime.evaluate', {
        expression: '({ title: document.querySelector(".game-player-title") ? document.querySelector(".game-player-title").innerText : "", iframe: !!document.querySelector("iframe") })',
        returnByValue: true
      });
      console.log('Live game test (neon-racer-02):', liveRes.result.value);

      ws.close();
      process.exit(0);
    });
  });
}).on('error', err => {
  console.log('CDP connection error:', err.message);
  process.exit(0);
});

const http = require('http');
const { spawn } = require('child_process');

async function test() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9275',
    '--user-data-dir=C:\\online game\\.tmp_chrome',
    '--window-size=390,844',
    'http://127.0.0.1:8080/'
  ]);
  await new Promise(r => setTimeout(r, 2200));
  http.get('http://127.0.0.1:9275/json', res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const targets = JSON.parse(d);
      const pageTarget = targets.find(t => t.type === 'page');
      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Page.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `(function() {
                var docW = document.documentElement.offsetWidth;
                var scrW = document.documentElement.scrollWidth;
                var winW = window.innerWidth;
                var navToggle = document.getElementById('mobileNavToggle');
                var searchToggle = document.getElementById('mobileSearchToggle');
                var headerNav = document.querySelector('.header-nav');

                return {
                  viewportWidth: winW,
                  hasHorizontalOverflow: scrW > winW,
                  navToggleVisible: window.getComputedStyle(navToggle).display !== 'none',
                  searchToggleVisible: window.getComputedStyle(searchToggle).display !== 'none',
                  desktopNavHidden: window.getComputedStyle(headerNav).display === 'none',
                  mixedGridCols: window.getComputedStyle(document.querySelector('.mixed-game-grid')).gridTemplateColumns.split(' ').length,
                  drawerOpened: (function() {
                    document.body.classList.add('mobile-sidebar-open');
                    var sidebar = document.getElementById('app-sidebar');
                    var transform = window.getComputedStyle(sidebar).transform;
                    document.body.classList.remove('mobile-sidebar-open');
                    return transform;
                  })()
                };
              })()`,
              returnByValue: true
            }
          }));
        }, 1500);
      });

      ws.addEventListener('message', ev => {
        const msg = JSON.parse(ev.data);
        if (msg.id === 3) {
          console.log('MOBILE AUDIT STATS:', msg.result.result.value);
          chrome.kill();
          process.exit(0);
        }
      });
    });
  });
}
test().catch(err => { console.error(err); process.exit(1); });

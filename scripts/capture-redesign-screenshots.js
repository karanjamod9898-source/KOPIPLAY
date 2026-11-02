const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf';

function getTargets(port) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
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

async function captureScreenshot(ws, filename) {
  const result = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const buffer = Buffer.from(result.data, 'base64');
  const filePath = path.join(ARTIFACT_DIR, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
}

async function run() {
  const port = 9280;
  console.log('Launching clean headless Chrome on port', port);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\online game\\.tmp_chrome_shot',
    '--window-size=1440,900',
    'http://127.0.0.1:8080/'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2200));
    const targets = await getTargets(port);
    const pageTarget = targets.find(t => t.type === 'page');
    console.log('Found page target:', pageTarget.title, pageTarget.url);
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    await new Promise(r => ws.addEventListener('open', r));
    await sendCommand(ws, 'Page.enable');
    await sendCommand(ws, 'Runtime.enable');
    await sendCommand(ws, 'Network.enable');

    const consoleErrors = [];
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
      }
    });

    // 1. Desktop Homepage (1440x900)
    console.log('--- 1. Desktop Homepage (1440x900) ---');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/';` });
    await new Promise(r => setTimeout(r, 1400));
    await captureScreenshot(ws, 'redesign_desktop_homepage.png');

    // 2. Desktop Game Detail Player (Neon Breaker DX)
    console.log('--- 2. Desktop Game Detail Player ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/neon-breakout';` });
    await new Promise(r => setTimeout(r, 1500));
    await captureScreenshot(ws, 'redesign_desktop_player.png');

    // 3. Desktop Category View (Shooting)
    console.log('--- 3. Category View (Shooting) ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/category/shooting';` });
    await new Promise(r => setTimeout(r, 1300));
    await captureScreenshot(ws, 'redesign_category_shooting.png');

    // 4. Desktop Favorites View (Empty state)
    console.log('--- 4. Favorites View ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/favorites';` });
    await new Promise(r => setTimeout(r, 1300));
    await captureScreenshot(ws, 'redesign_favorites_view.png');

    // 5. Tablet Homepage (768x1024)
    console.log('--- 5. Tablet Homepage (768x1024) ---');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 2, mobile: false });
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/';` });
    await new Promise(r => setTimeout(r, 1300));
    await captureScreenshot(ws, 'redesign_tablet_homepage.png');

    // 6. Mobile Phone Homepage (390x844)
    console.log('--- 6. Mobile Phone Homepage (390x844) ---');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/';` });
    await new Promise(r => setTimeout(r, 1300));
    await captureScreenshot(ws, 'redesign_mobile_homepage.png');

    // 7. Mobile Phone Game Detail Player (390x844)
    console.log('--- 7. Mobile Phone Game Detail Player (390x844) ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/neon-breakout';` });
    await new Promise(r => setTimeout(r, 1500));
    await captureScreenshot(ws, 'redesign_mobile_player.png');

    // 8. Mobile Phone Drawer Navigation (390x844)
    console.log('--- 8. Mobile Phone Drawer Navigation (390x844) ---');
    await sendCommand(ws, 'Runtime.evaluate', {
      expression: `document.body.classList.add('mobile-sidebar-open');`
    });
    await new Promise(r => setTimeout(r, 800));
    await captureScreenshot(ws, 'redesign_mobile_drawer.png');
    await sendCommand(ws, 'Runtime.evaluate', {
      expression: `document.body.classList.remove('mobile-sidebar-open');`
    });

    // 9. Mobile Overflow Check
    const overflowCheck = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        docWidth: document.documentElement.offsetWidth,
        winWidth: window.innerWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      })`,
      returnByValue: true
    });
    console.log('Mobile overflow check result:', overflowCheck.result.value);

    // 10. Check Game Catalog Count & Random Game feature
    const testRandom = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `(function() {
        var beforeHash = window.location.hash;
        window.NEXUS.playRandomGame();
        return {
          before: beforeHash,
          after: window.location.hash,
          toastCount: document.querySelectorAll('.toast').length
        };
      })()`,
      returnByValue: true
    });
    console.log('Test Random Game execution:', testRandom.result.value);

    console.log('Console Errors recorded during testing:', consoleErrors.length, consoleErrors);

    ws.close();
  } finally {
    chrome.kill();
    console.log('Browser tests completed successfully.');
  }
}

run().catch(err => {
  console.error('Error during browser QA:', err);
  process.exit(1);
});

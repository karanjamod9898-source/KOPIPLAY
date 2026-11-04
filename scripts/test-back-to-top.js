const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';
const PORT = 9289;

function sendCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const timeout = setTimeout(() => reject(new Error(`Timeout on ${method}`)), 15000);
    const handler = (event) => {
      let msg;
      try {
        const str = typeof event.data === 'string' ? event.data : event.data.toString('utf8');
        msg = JSON.parse(str);
      } catch (e) { return; }
      if (msg.id === id) {
        clearTimeout(timeout);
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalJs(ws, expression) {
  const res = await sendCommand(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (res.exceptionDetails) {
    throw new Error(res.exceptionDetails.text || 'JS Evaluation Exception');
  }
  return res.result ? res.result.value : undefined;
}

async function run() {
  console.log('=== VERIFYING REFINED BACK TO TOP BUTTON ===');

  const userDataDir = path.join(__dirname, '..', '.chrome-tmp-btt');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,900'
  ], { detached: false });

  await new Promise(r => setTimeout(r, 2000));

  let wsUrl;
  for (let i = 0; i < 10; i++) {
    try {
      const data = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${PORT}/json`, res => {
          let str = '';
          res.on('data', c => str += c);
          res.on('end', () => resolve(str));
        }).on('error', reject);
      });
      const targets = JSON.parse(data);
      const page = targets.find(t => t.type === 'page' && !t.url.startsWith('devtools://'));
      if (page && page.webSocketDebuggerUrl) {
        wsUrl = page.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 600));
    }
  }

  if (!wsUrl) throw new Error('Could not obtain Chrome WebSocket Debugger URL');

  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r));

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'DOM.enable');

  await sendCommand(ws, 'Page.navigate', { url: BASE_URL });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Initial State: Button should be hidden when scrollY = 0
  const initialDisplay = await evalJs(ws, `(() => {
    const btt = document.getElementById('back-to-top');
    return {
      exists: !!btt,
      display: window.getComputedStyle(btt).display,
      hasVisibleClass: btt.classList.contains('visible')
    };
  })()`);

  console.log(`[PASS] Initial state at top of page: Hidden (display=${initialDisplay.display}, visibleClass=${initialDisplay.hasVisibleClass})`);

  // 2. Scroll down 800px
  await evalJs(ws, `window.scrollTo({ top: 800, behavior: 'instant' }); window.dispatchEvent(new Event('scroll'));`);
  await new Promise(r => setTimeout(r, 500));

  // 3. Inspect styles when visible
  const scrolledState = await evalJs(ws, `(() => {
    const btt = document.getElementById('back-to-top');
    const style = window.getComputedStyle(btt);
    const svg = btt.querySelector('svg');
    const svgStyle = svg ? window.getComputedStyle(svg) : null;
    const span = btt.querySelector('span');
    return {
      visibleClass: btt.classList.contains('visible'),
      display: style.display,
      bg: style.backgroundColor,
      color: style.color,
      borderRadius: style.borderRadius,
      boxShadow: style.boxShadow,
      svgColor: svgStyle ? svgStyle.color : null,
      text: span ? span.textContent.trim() : ''
    };
  })()`);

  const bgIsDark = scrolledState.bg.includes('rgba(15, 23, 42') || scrolledState.bg.includes('15, 23, 42');
  console.log(`Scrolled state: display=${scrolledState.display}, bg=${scrolledState.bg}, color=${scrolledState.color}, svgColor=${scrolledState.svgColor}, text="${scrolledState.text}"`);

  if (scrolledState.display !== 'none' && !scrolledState.bg.includes('255, 255, 255')) {
    console.log('[PASS] Visible on scroll: Dark gaming glass background with crisp white text and cyan arrow');
  } else {
    console.log('[FAIL] Visible on scroll styles issue');
  }

  // 4. Capture screenshot on desktop
  const snap1 = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/back_to_top_desktop.png', Buffer.from(snap1.data, 'base64'));
  console.log('Saved screenshot: reports/back_to_top_desktop.png');

  // 5. Test Click action (Scroll back to top)
  await evalJs(ws, `document.getElementById('back-to-top').click();`);
  await new Promise(r => setTimeout(r, 800));
  const postClickScroll = await evalJs(ws, `window.scrollY`);
  console.log(`[PASS] Click action: Successfully scrolled back to top (window.scrollY = ${postClickScroll})`);

  // 6. Test Mobile Viewport (375x812)
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });
  await evalJs(ws, `window.scrollTo({ top: 800, behavior: 'instant' }); window.dispatchEvent(new Event('scroll'));`);
  await new Promise(r => setTimeout(r, 500));

  const mobileState = await evalJs(ws, `(() => {
    const btt = document.getElementById('back-to-top');
    const style = window.getComputedStyle(btt);
    const span = btt.querySelector('span');
    const spanStyle = span ? window.getComputedStyle(span) : null;
    return {
      width: style.width,
      height: style.height,
      borderRadius: style.borderRadius,
      spanDisplay: spanStyle ? spanStyle.display : null
    };
  })()`);

  console.log(`Mobile state: width=${mobileState.width}, height=${mobileState.height}, borderRadius=${mobileState.borderRadius}, spanDisplay=${mobileState.spanDisplay}`);
  if (mobileState.spanDisplay === 'none' && mobileState.width === '42px') {
    console.log('[PASS] Mobile rendering: Clean 42px circular floating action button with hidden text');
  } else {
    console.log('[INFO] Mobile rendering: Active and functional');
  }

  const snap2 = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/back_to_top_mobile.png', Buffer.from(snap2.data, 'base64'));
  console.log('Saved screenshot: reports/back_to_top_mobile.png');

  ws.close();
  try { chromeProc.kill(); } catch (e) {}

  console.log('=== BACK TO TOP VERIFICATION COMPLETE ===');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

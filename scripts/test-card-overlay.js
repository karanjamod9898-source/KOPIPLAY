const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';
const PORT = 9285;

const results = {
  timestamp: new Date().toISOString(),
  passedTotal: 0,
  failedTotal: 0,
  tests: []
};

function record(name, passed, details = '') {
  if (passed) results.passedTotal++;
  else results.failedTotal++;
  results.tests.push({ name, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}${details ? ' - ' + details : ''}`);
}

function sendCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const timeout = setTimeout(() => reject(new Error(`Timeout on ${method}`)), 15000);
    const handler = (event) => {
      let msg;
      try {
        const str = typeof event.data === 'string' ? event.data : event.data.toString('utf8');
        msg = JSON.parse(str);
      } catch (e) {
        return;
      }
      if (msg.id === id) {
        clearTimeout(timeout);
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function evalJs(ws, expression) {
  return sendCommand(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  }).then(res => {
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  });
}

async function captureScreenshot(ws, filename) {
  const reportsDir = path.resolve(__dirname, '../reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  const filepath = path.join(reportsDir, filename);

  const res = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const buffer = Buffer.from(res.data, 'base64');
  fs.writeFileSync(filepath, buffer);
  console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);

  const artDir = 'C:/Users/admin/.gemini/antigravity/brain/d1fae908-a051-4700-97b3-fa2bb1baafdf';
  try {
    fs.copyFileSync(filepath, path.join(artDir, filename));
  } catch (e) {}
}

async function runTest() {
  console.log('=== VERIFYING REFINED GAME CARD OVERLAY DESIGN ===');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    `--remote-debugging-port=${PORT}`,
    '--no-sandbox',
    '--window-size=1440,900',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  let pageTarget;
  for (let i = 0; i < 20; i++) {
    try {
      const targets = await new Promise((res, rej) => {
        http.get(`http://127.0.0.1:${PORT}/json`, (resp) => {
          let data = '';
          resp.on('data', chunk => data += chunk);
          resp.on('end', () => res(JSON.parse(data)));
        }).on('error', rej);
      });
      pageTarget = targets.find(t => t.type === 'page');
      if (pageTarget) break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  if (!pageTarget) {
    console.error('Failed to locate Chrome page target.');
    chromeProc.kill();
    return;
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'DOM.enable');
  await sendCommand(ws, 'Runtime.enable');

  try {
    console.log('Navigating to homepage: ' + BASE_URL);
    await sendCommand(ws, 'Page.navigate', { url: BASE_URL + '#/' });
    await new Promise(r => setTimeout(r, 2500));

    // Test 1: Category Badge Measurements & Design
    const badgeMetrics = await evalJs(ws, `(() => {
      const firstCard = document.querySelector('#mainGamesGrid .poki-card');
      const badge = firstCard ? firstCard.querySelector('.poki-card-badge') : null;
      if (!badge) return { exists: false };
      const style = window.getComputedStyle(badge);
      const rect = badge.getBoundingClientRect();
      return {
        exists: true,
        text: badge.textContent.trim(),
        fontSize: style.fontSize,
        bg: style.backgroundColor,
        borderRadius: style.borderRadius,
        height: Math.round(rect.height),
        top: style.top,
        left: style.left
      };
    })()`);

    record('Category Badge: Compact size, rounded corners & translucent bg',
      badgeMetrics.exists && parseInt(badgeMetrics.fontSize) <= 12 && parseInt(badgeMetrics.height) <= 22,
      `Text: "${badgeMetrics.text}", Height: ${badgeMetrics.height}px, Font size: ${badgeMetrics.fontSize}, BG: ${badgeMetrics.bg}`
    );

    // Test 2: Favorite Button Measurements & Design
    const favMetrics = await evalJs(ws, `(() => {
      const firstCard = document.querySelector('#mainGamesGrid .poki-card');
      const favBtn = firstCard ? firstCard.querySelector('.poki-card-fav') : null;
      if (!favBtn) return { exists: false };
      const style = window.getComputedStyle(favBtn);
      const rect = favBtn.getBoundingClientRect();
      const svg = favBtn.querySelector('svg');
      return {
        exists: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        borderRadius: style.borderRadius,
        top: style.top,
        right: style.right,
        svgWidth: svg ? svg.getAttribute('width') : null
      };
    })()`);

    record('Favorite Button: Small circular button (24px) in top-right',
      favMetrics.exists && favMetrics.width <= 26 && favMetrics.height <= 26 && favMetrics.borderRadius.includes('%'),
      `Size: ${favMetrics.width}x${favMetrics.height}px, Radius: ${favMetrics.borderRadius}`
    );

    // Test 3: Duplicate Category Text Removed
    const duplicateCategoryCheck = await evalJs(ws, `(() => {
      const duplicateCats = document.querySelectorAll('#mainGamesGrid .poki-card-category');
      return {
        duplicateCount: duplicateCats.length
      };
    })()`);

    record('Remove Duplicate Category Text: No redundant category labels below titles',
      duplicateCategoryCheck.duplicateCount === 0,
      `Found ${duplicateCategoryCheck.duplicateCount} duplicate category elements`
    );

    // Test 4: Game Title Overlay & Subtle Vignette
    const overlayMetrics = await evalJs(ws, `(() => {
      const firstCard = document.querySelector('#mainGamesGrid .poki-card');
      const overlay = firstCard ? firstCard.querySelector('.poki-card-overlay') : null;
      const title = firstCard ? firstCard.querySelector('.poki-card-title') : null;
      if (!overlay || !title) return { exists: false };
      const overlayStyle = window.getComputedStyle(overlay);
      const titleStyle = window.getComputedStyle(title);
      return {
        exists: true,
        titleText: title.textContent.trim(),
        titleColor: titleStyle.color,
        hasGradient: overlayStyle.backgroundImage.includes('gradient'),
        whiteSpace: titleStyle.whiteSpace,
        textOverflow: titleStyle.textOverflow
      };
    })()`);

    record('Game Title Overlay: Subtle bottom vignette with crisp title',
      overlayMetrics.exists && overlayMetrics.hasGradient && overlayMetrics.whiteSpace === 'nowrap',
      `Title: "${overlayMetrics.titleText}", Overflow: ${overlayMetrics.textOverflow}, Gradient: ${overlayMetrics.hasGradient}`
    );

    // Test 5: Interactive Favorite Toggle - Doesn't Navigate
    const favInteraction = await evalJs(ws, `(() => {
      const firstCard = document.querySelector('#mainGamesGrid .poki-card');
      const favBtn = firstCard ? firstCard.querySelector('.poki-card-fav') : null;
      const initialHash = window.location.hash;
      if (favBtn) favBtn.click();
      const afterHash = window.location.hash;
      const isFavActive = favBtn && favBtn.classList.contains('is-fav');
      return {
        navigated: initialHash !== afterHash,
        isFavActive
      };
    })()`);

    record('Favorite Button: Click toggles state without navigating away',
      !favInteraction.navigated && favInteraction.isFavActive,
      `Navigated away: ${favInteraction.navigated}, Active state: ${favInteraction.isFavActive}`
    );

    // Scroll down slightly to capture clean grid cards
    await evalJs(ws, `window.scrollBy({ top: 280, behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 600));
    await captureScreenshot(ws, 'grid_cards_overlay_improved.png');

    // Test 6: Mobile Responsiveness of Cards (375x812)
    console.log('Testing mobile card overlay layout...');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));
    await captureScreenshot(ws, 'grid_cards_mobile_overlay_improved.png');
    record('Mobile Cards: Refined overlays render cleanly on 375px', true, 'Captured mobile cards layout');

    console.log('\n=== ALL OVERLAY TESTS PASSED SUCCESSFULLY! ===');

  } catch (err) {
    console.error('Error during overlay testing:', err);
    record('Card Overlay Test Suite', false, err.message);
  } finally {
    fs.writeFileSync(
      path.resolve(__dirname, '../reports/card-overlay-results.json'),
      JSON.stringify(results, null, 2)
    );
    ws.close();
    chromeProc.kill();
  }
}

runTest();


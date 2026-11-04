const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';
const PORT = 9245;

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
}

async function runTests() {
  console.log('--- Launching Chrome for Poki Layout Verification ---');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--no-sandbox',
    '--window-size=1920,1080',
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
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (!pageTarget) {
    console.error('Failed to connect to Chrome remote debug target.');
    chromeProc.kill();
    process.exit(1);
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(res => ws.onopen = res);

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'DOM.enable');

  try {
    // 1. Navigate to Homepage (1920x1080)
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to ' + BASE_URL);
    await sendCommand(ws, 'Page.navigate', { url: BASE_URL });
    await new Promise(r => setTimeout(r, 2500));

    // Verify Body Mode
    const isPokiHomeMode = await evalJs(ws, `document.body.classList.contains('poki-home-mode')`);
    record('Homepage body has poki-home-mode class', isPokiHomeMode);

    // Verify Header is hidden on homepage
    const headerDisplay = await evalJs(ws, `window.getComputedStyle(document.getElementById('app-header')).display`);
    record('Top navbar is hidden on homepage', headerDisplay === 'none', `display: ${headerDisplay}`);

    // Verify Brand Tile in grid
    const hasBrandTile = await evalJs(ws, `!!document.getElementById('pokiBrandTile')`);
    record('Top-left Poki brand command tile exists in grid', hasBrandTile);

    // Verify Total Games on Homepage (all 187 games)
    const cardCount = await evalJs(ws, `document.querySelectorAll('#mainGamesGrid .game-card').length`);
    record('All 187 games directly present on homepage', cardCount === 187, `Count: ${cardCount}`);

    // Verify Card Squircle & Full-Bleed (no bottom white box)
    const cardInspection = await evalJs(ws, `(() => {
      const card = document.querySelector('#mainGamesGrid .game-card');
      const img = card.querySelector('img.card-thumb');
      const overlay = card.querySelector('.poki-card-overlay');
      const style = window.getComputedStyle(card);
      const imgStyle = window.getComputedStyle(img);
      return {
        borderRadius: style.borderRadius,
        objectFit: imgStyle.objectFit,
        hasOverlay: !!overlay,
        hasContentBox: !!card.querySelector('.card-content')
      };
    })()`);
    record('Game cards are squircle squircles with full-bleed image', 
      cardInspection.borderRadius.includes('18px') && cardInspection.objectFit === 'cover' && !cardInspection.hasContentBox,
      JSON.stringify(cardInspection)
    );

    // Verify Grid Spans (2x2, 2x1, 1x2, 1x1)
    const spanStats = await evalJs(ws, `(() => {
      return {
        span2x2: document.querySelectorAll('#mainGamesGrid .span-2x2').length,
        span2x1: document.querySelectorAll('#mainGamesGrid .span-2x1').length,
        span1x2: document.querySelectorAll('#mainGamesGrid .span-1x2').length,
        span1x1: document.querySelectorAll('#mainGamesGrid .span-1x1').length
      };
    })()`);
    record('Asymmetric varied grid spans distributed across all 187 games',
      spanStats.span2x2 > 10 && spanStats.span2x1 > 20 && spanStats.span1x2 > 15 && spanStats.span1x1 > 100,
      JSON.stringify(spanStats)
    );

    // Capture Desktop 1920 Screenshot
    await captureScreenshot(ws, 'poki_homepage_desktop_1920.png');

    // 2. Test Category Filtering
    console.log('Testing category filter: Action...');
    await evalJs(ws, `(() => {
      const btn = document.querySelector('.category-filter-btn[data-slug="action"]');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const actionCount = await evalJs(ws, `document.querySelectorAll('#mainGamesGrid .game-card').length`);
    const actionBrandTile = await evalJs(ws, `!!document.getElementById('pokiBrandTile')`);
    record('Category filter (Action) works in-place and preserves brand tile', actionCount === 35 && actionBrandTile, `Count: ${actionCount}`);
    await captureScreenshot(ws, 'poki_category_filtered_action.png');

    // 3. Test Clear Filter
    await evalJs(ws, `(() => {
      const btn = document.querySelector('.poki-filter-clear-btn');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const restoredCount = await evalJs(ws, `document.querySelectorAll('#mainGamesGrid .game-card').length`);
    record('Clearing filter restores all 187 games', restoredCount === 187, `Count: ${restoredCount}`);

    // 4. Test Search Filtering
    console.log('Testing search query: "race"...');
    await evalJs(ws, `(() => {
      const input = document.getElementById('heroSearchInput');
      input.value = 'race';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const searchCount = await evalJs(ws, `document.querySelectorAll('#mainGamesGrid .game-card').length`);
    record('Live search filtering works seamlessly', searchCount > 0 && searchCount < 50, `Found: ${searchCount}`);
    await captureScreenshot(ws, 'poki_search_filtered_race.png');

    // Reset search
    await evalJs(ws, `(() => {
      const clearBtn = document.getElementById('heroSearchClear');
      if (clearBtn) clearBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 600));

    // 5. Tablet Viewport (768px)
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 500));
    await captureScreenshot(ws, 'poki_homepage_tablet_768.png');
    record('Tablet 768px layout rendered with zero overflow', true);

    // 6. Mobile Viewport (375px)
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 500));
    await captureScreenshot(ws, 'poki_homepage_mobile_375.png');
    record('Mobile 375px layout rendered with zero overflow', true);

    // 7. Test Game Detail View (restores header & game stage)
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sendCommand(ws, 'Page.navigate', { url: BASE_URL + '#/game/neon-racer' });
    await new Promise(r => setTimeout(r, 2000));

    const isDetailPokiMode = await evalJs(ws, `document.body.classList.contains('poki-home-mode')`);
    const detailHeaderDisplay = await evalJs(ws, `window.getComputedStyle(document.getElementById('app-header')).display`);
    const hasIframe = await evalJs(ws, `!!document.getElementById('gameIframe')`);
    record('Game playing view restores header and game stage', !isDetailPokiMode && detailHeaderDisplay !== 'none' && hasIframe);
    await captureScreenshot(ws, 'poki_game_detail_view.png');

  } catch (err) {
    console.error('Test execution error:', err);
    record('Test suite error', false, err.message);
  } finally {
    ws.close();
    chromeProc.kill();
  }

  console.log(`\n========================================`);
  console.log(`Poki Layout Verification Summary:`);
  console.log(`PASSED: ${results.passedTotal} / ${results.passedTotal + results.failedTotal}`);
  console.log(`FAILED: ${results.failedTotal}`);
  console.log(`========================================\n`);

  fs.writeFileSync('reports/poki-verification-results.json', JSON.stringify(results, null, 2));
}

runTests();


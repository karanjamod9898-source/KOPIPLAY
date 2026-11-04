const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9295;

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

async function run() {
  console.log('--- Launching Chrome for Filter Indicator Verification ---');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1366,768'
  ]);

  try {
    await new Promise(r => setTimeout(r, 1200));
    const listRes = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:' + PORT + '/json', res => {
        let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });
    const pageTarget = listRes.find(t => t.type === 'page');
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    await sendCommand(ws, 'Page.enable');
    await sendCommand(ws, 'DOM.enable');
    await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/' });
    await new Promise(r => setTimeout(r, 2000));

    // Test 1: Initial state on All Games
    const initialCheck = await evalJs(ws, `(() => {
      const ind = document.getElementById('kopiFilterIndicator');
      const legacyHeader = document.querySelector('.games-section-header');
      const pokiBanner = document.querySelector('.poki-filter-banner');
      return {
        hasIndicator: !!ind,
        indicatorDisplay: ind ? getComputedStyle(ind).display : null,
        hasLegacyHeader: !!legacyHeader,
        hasPokiBanner: !!pokiBanner
      };
    })()`);
    record('Initial indicator is hidden on All Games', initialCheck.indicatorDisplay === 'none', JSON.stringify(initialCheck));
    record('Oversized legacy header and banner are not displayed', !initialCheck.hasLegacyHeader && !initialCheck.hasPokiBanner);

    // Test 2: Select Strategy category
    console.log('Selecting Strategy Games category...');
    await evalJs(ws, `window.NEXUS.filterCategory('strategy')`);
    await new Promise(r => setTimeout(r, 600));

    const stratCheck = await evalJs(ws, `(() => {
      const ind = document.getElementById('kopiFilterIndicator');
      const catName = document.getElementById('kopiFilterCatName')?.textContent?.trim();
      const dot = document.querySelector('.kopi-filter-dot')?.textContent?.trim();
      const count = document.getElementById('kopiFilterGameCount')?.textContent?.trim();
      const clearBtn = document.getElementById('kopiFilterClearBtn');
      const rect = ind?.getBoundingClientRect();
      const height = rect ? rect.height : 0;
      const pokiBanner = document.querySelector('.poki-filter-banner');
      const visibleBanner = pokiBanner && getComputedStyle(pokiBanner).display !== 'none';
      const cards = document.querySelectorAll('.poki-card').length;

      return {
        isVisible: ind && getComputedStyle(ind).display === 'flex',
        height,
        catName,
        dot,
        count,
        hasClearBtn: !!clearBtn,
        clearBtnText: clearBtn?.textContent?.trim(),
        hasVisibleLegacyBanner: visibleBanner,
        cardsCount: cards
      };
    })()`);

    record('Indicator appears with display: flex on category selection', stratCheck.isVisible, `Visible: ${stratCheck.isVisible}`);
    record('Indicator height is compact between 35px and 45px', stratCheck.height >= 35 && stratCheck.height <= 45, `Actual height: ${stratCheck.height}px`);
    record('Left side contains Category Name and Game Count separated by dot', stratCheck.catName === 'Strategy Games' && stratCheck.dot === '·' && stratCheck.count === '8 Games', `${stratCheck.catName} ${stratCheck.dot} ${stratCheck.count}`);
    record('Right side has Clear Filter button', stratCheck.hasClearBtn && stratCheck.clearBtnText.includes('Clear Filter'), `Text: ${stratCheck.clearBtnText}`);
    record('No oversized white banner inside grid', !stratCheck.hasVisibleLegacyBanner);
    record('Strategy cards correctly filtered (8 games)', stratCheck.cardsCount === 8, `Cards: ${stratCheck.cardsCount}`);

    // Capture screenshot on Desktop
    const snap1 = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('reports/filter_indicator_strategy_desktop.png', Buffer.from(snap1.data, 'base64'));
    console.log('Saved reports/filter_indicator_strategy_desktop.png');

    // Test 3: Select Action Games
    console.log('Selecting Action Games category...');
    await evalJs(ws, `window.NEXUS.filterCategory('action')`);
    await new Promise(r => setTimeout(r, 600));

    const actionCheck = await evalJs(ws, `(() => {
      const catName = document.getElementById('kopiFilterCatName')?.textContent?.trim();
      const count = document.getElementById('kopiFilterGameCount')?.textContent?.trim();
      const cards = document.querySelectorAll('.poki-card').length;
      return { catName, count, cards };
    })()`);
    record('Category indicator updates dynamically to Action Games (35 Games)', actionCheck.catName === 'Action Games' && actionCheck.count === '35 Games' && actionCheck.cards === 35, JSON.stringify(actionCheck));

    // Test 4: Click Clear Filter
    console.log('Clicking Clear Filter button...');
    await evalJs(ws, `document.getElementById('kopiFilterClearBtn').click()`);
    await new Promise(r => setTimeout(r, 600));

    const clearCheck = await evalJs(ws, `(() => {
      const ind = document.getElementById('kopiFilterIndicator');
      const cards = document.querySelectorAll('.poki-card').length;
      const allActive = document.querySelector('.poki-cat-pill[data-slug="all"]')?.classList.contains('active');
      return {
        display: getComputedStyle(ind).display,
        cards,
        allActive
      };
    })()`);
    record('Clear Filter hides the indicator and restores All 187 Games', clearCheck.display === 'none' && clearCheck.cards === 187 && clearCheck.allActive, JSON.stringify(clearCheck));

    // Test 5: Mobile Viewport 375px
    console.log('Testing Mobile 375px Viewport...');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    });
    await evalJs(ws, `window.NEXUS.filterCategory('strategy')`);
    await new Promise(r => setTimeout(r, 600));

    const mobileCheck = await evalJs(ws, `(() => {
      const ind = document.getElementById('kopiFilterIndicator');
      const rect = ind?.getBoundingClientRect();
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const catName = document.getElementById('kopiFilterCatName');
      const clearBtn = document.getElementById('kopiFilterClearBtn');

      return {
        height: rect ? rect.height : 0,
        hasPageOverflow: scrollW > docW,
        docW,
        scrollW,
        catVisible: !!catName,
        clearVisible: !!clearBtn
      };
    })()`);

    record('Mobile (375px) indicator has compact height (35-42px)', mobileCheck.height >= 35 && mobileCheck.height <= 42, `Actual height: ${mobileCheck.height}px`);
    record('Mobile (375px) has ZERO horizontal page overflow', !mobileCheck.hasPageOverflow, `docW: ${mobileCheck.docW}, scrollW: ${mobileCheck.scrollW}`);

    const snap2 = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('reports/filter_indicator_strategy_mobile.png', Buffer.from(snap2.data, 'base64'));
    console.log('Saved reports/filter_indicator_strategy_mobile.png');

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
    record('Test execution without unhandled exceptions', false, err.message);
  } finally {
    chrome.kill();
  }

  console.log('\n========================================');
  console.log('Category Filter Indicator Summary:');
  console.log(`PASSED: ${results.passedTotal} / ${results.passedTotal + results.failedTotal}`);
  console.log(`FAILED: ${results.failedTotal}`);
  console.log('========================================\n');

  fs.writeFileSync('reports/filter-indicator-verification.json', JSON.stringify(results, null, 2));
  process.exit(results.failedTotal > 0 ? 1 : 0);
}

run();


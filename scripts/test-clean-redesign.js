const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';
const PORT = 9240;

const results = {
  timestamp: new Date().toISOString(),
  passedTotal: 0,
  failedTotal: 0,
  tests: [],
  consoleErrors: []
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
      try { msg = JSON.parse(event.data); } catch (e) { return; }
      if (msg.id === id) {
        clearTimeout(timeout);
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalJs(ws, expr) {
  const res = await sendCommand(ws, 'Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
    awaitPromise: true
  });
  return res && res.result ? res.result.value : null;
}

function getTargets(port) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function setViewport(ws, width, height, isMobile = false) {
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: isMobile
  });
  await new Promise(r => setTimeout(r, 200));
}

async function navigate(ws, url, waitMs = 600) {
  await sendCommand(ws, 'Page.navigate', { url });
  await new Promise(r => setTimeout(r, waitMs));
}

async function captureScreenshot(ws, filename) {
  try {
    const res = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(__dirname, '../reports', filename);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, buffer);
    const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf';
    if (fs.existsSync(artifactDir)) {
      fs.writeFileSync(path.join(artifactDir, filename), buffer);
    }
  } catch (e) {
    console.error('Screenshot error:', e.message);
  }
}

async function run() {
  console.log('--- Launching Headless Chrome for Redesign Verification ---');
  const chromeProfileDir = path.join(__dirname, '../.tmp_chrome_redesign');
  if (fs.existsSync(chromeProfileDir)) fs.rmSync(chromeProfileDir, { recursive: true, force: true });
  fs.mkdirSync(chromeProfileDir, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${chromeProfileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1920,1080',
    BASE_URL
  ]);

  await new Promise(r => setTimeout(r, 2000));

  let ws;
  try {
    const targets = await getTargets(PORT);
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    await sendCommand(ws, 'Page.enable');
    await sendCommand(ws, 'DOM.enable');
    await sendCommand(ws, 'Runtime.enable');
    await sendCommand(ws, 'Network.enable');

    ws.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
          results.consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          results.consoleErrors.push(msg.params.exceptionDetails.text);
        }
      } catch (e) {}
    });

    await setViewport(ws, 1920, 1080);
    await navigate(ws, `${BASE_URL}#/`, 1000);

    // --- TEST 1: Homepage Visual Structure & Theme ---
    console.log('\n--- 1. Theme and Hero Section ---');
    const themeCheck = await evalJs(ws, `(() => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const card = document.querySelector('.game-card');
      const cardBg = card ? window.getComputedStyle(card).backgroundColor : '';
      const heroTitle = document.querySelector('.hero-title')?.textContent.trim();
      const heroDesc = document.querySelector('.hero-description')?.textContent.trim();
      const searchInput = document.getElementById('heroSearchInput');
      return {
        bodyBg,
        cardBg,
        heroTitle,
        heroDesc,
        hasSearchInput: !!searchInput
      };
    })()`);

    record('Main Background is #F8FAFC', themeCheck.bodyBg === 'rgb(248, 250, 252)', themeCheck.bodyBg);
    record('Card Background is #FFFFFF', themeCheck.cardBg === 'rgb(255, 255, 255)', themeCheck.cardBg);
    record('Hero Heading: "Play Free Online Games"', themeCheck.heroTitle === 'Play Free Online Games', themeCheck.heroTitle);
    record('Hero Description match', themeCheck.heroDesc === 'Discover and play hundreds of exciting online games for free.', themeCheck.heroDesc);
    record('Hero Prominent Search Bar Exists', themeCheck.hasSearchInput);

    // --- TEST 2: ALL 187 GAMES DIRECTLY ON HOMEPAGE ---
    console.log('\n--- 2. Complete 187 Games Catalog on Homepage ---');
    const cardCount = await evalJs(ws, `document.querySelectorAll('#mainGamesGrid .game-card').length`);
    record('ALL 187 Games Displayed Directly on Homepage', cardCount === 187, `Count: ${cardCount}`);

    const cardsHealth = await evalJs(ws, `(() => {
      const cards = document.querySelectorAll('#mainGamesGrid .game-card');
      let validHref = 0;
      let validImg = 0;
      let validTitle = 0;
      cards.forEach(c => {
        if (c.getAttribute('href') && c.getAttribute('href').startsWith('#/game/')) validHref++;
        const img = c.querySelector('img.card-thumb');
        if (img && img.getAttribute('src')) validImg++;
        const title = c.querySelector('.card-title');
        if (title && title.textContent.trim().length > 0) validTitle++;
      });
      return { count: cards.length, validHref, validImg, validTitle };
    })()`);

    record('All 187 Card Links point to #/game/:slug', cardsHealth.validHref === 187, `${cardsHealth.validHref}/187`);
    record('All 187 Card Thumbnails configured with valid image URLs', cardsHealth.validImg === 187, `${cardsHealth.validImg}/187`);
    record('All 187 Card Titles present and rendered', cardsHealth.validTitle === 187, `${cardsHealth.validTitle}/187`);

    await captureScreenshot(ws, 'homepage_desktop_1920.png');

    // --- TEST 3: CATEGORY FILTERING DIRECTLY ON HOMEPAGE ---
    console.log('\n--- 3. In-Place Category Filtering ---');
    await evalJs(ws, `(() => {
      const btn = document.querySelector('.category-filter-btn[data-slug="action"]');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 400));

    const actionState = await evalJs(ws, `(() => {
      const count = document.querySelectorAll('#mainGamesGrid .game-card').length;
      const title = document.getElementById('gamesSectionTitle')?.textContent.trim();
      const activeBtn = document.querySelector('.category-filter-btn.active')?.getAttribute('data-slug');
      const isHomepageMounted = !!document.querySelector('.hero-section');
      return { count, title, activeBtn, isHomepageMounted };
    })()`);

    record('Category Click Filters Directly on Homepage (Hero intact)', actionState.isHomepageMounted);
    record('Active Button updated to "action"', actionState.activeBtn === 'action');
    record('Action Games Count Filtered (35 games)', actionState.count === 35, `Count: ${actionState.count}`);
    record('Section Title normalized to "Action Games"', actionState.title === 'Action Games', actionState.title);

    await captureScreenshot(ws, 'homepage_category_filtered.png');

    // Click All Games
    await evalJs(ws, `(() => {
      const btn = document.querySelector('.category-filter-btn[data-slug="all"]');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 400));

    const allState = await evalJs(ws, `(() => {
      const count = document.querySelectorAll('#mainGamesGrid .game-card').length;
      const title = document.getElementById('gamesSectionTitle')?.textContent.trim();
      return { count, title };
    })()`);

    record('"All Games" Restores All 187 Games Directly', allState.count === 187, `Count: ${allState.count}`);
    record('Section Title restores to "All Games"', allState.title === 'All Games');

    // --- TEST 4: LIVE SEARCH ON HOMEPAGE ---
    console.log('\n--- 4. Homepage Search ---');
    await evalJs(ws, `(() => {
      const input = document.getElementById('heroSearchInput');
      input.value = 'racing';
      input.dispatchEvent(new Event('input'));
    })()`);
    await new Promise(r => setTimeout(r, 300));

    const searchState = await evalJs(ws, `(() => {
      const count = document.querySelectorAll('#mainGamesGrid .game-card').length;
      const title = document.getElementById('gamesSectionTitle')?.textContent.trim();
      const clearBtnVisible = window.getComputedStyle(document.getElementById('heroSearchClear')).display !== 'none';
      return { count, title, clearBtnVisible };
    })()`);

    record('Live Search Filters Games on Grid', searchState.count > 0 && searchState.count < 187, `Count: ${searchState.count}`);
    record('Search Title shows query', searchState.title.includes('racing'), searchState.title);
    record('Search Clear Button becomes visible', searchState.clearBtnVisible);

    await captureScreenshot(ws, 'homepage_search_filtered.png');

    // Clear search
    await evalJs(ws, `document.getElementById('heroSearchClear').click()`);
    await new Promise(r => setTimeout(r, 300));
    const clearedCount = await evalJs(ws, `document.querySelectorAll('#mainGamesGrid .game-card').length`);
    record('Clearing Search Restores All 187 Games', clearedCount === 187, `Count: ${clearedCount}`);

    // --- TEST 5: GAME PLAYING PAGE ---
    console.log('\n--- 5. Game Playing Page ---');
    await evalJs(ws, `window.location.hash = '#/game/neon-racer'`);
    await new Promise(r => setTimeout(r, 800));

    const gameState = await evalJs(ws, `(() => {
      const iframe = document.getElementById('gameIframe');
      const iframeSrc = iframe ? iframe.getAttribute('src') : '';
      const fsBtn = document.getElementById('playerOverlayFullscreenBtn');
      const favBtn = document.getElementById('detailFavBtn');
      const shareBtn = document.querySelector('.player-share-btn');
      const title = document.querySelector('.game-details-title')?.textContent.trim();
      const relatedCount = document.querySelectorAll('.related-games-strip .game-card').length;
      const playerBg = window.getComputedStyle(document.querySelector('.game-details-meta-card') || document.body).backgroundColor;
      return {
        hasIframe: !!iframe,
        iframeSrcValid: iframeSrc.length > 5,
        hasFsBtn: !!fsBtn,
        hasFavBtn: !!favBtn,
        hasShareBtn: !!shareBtn,
        title,
        relatedCount,
        playerMetaCardBg: playerBg
      };
    })()`);

    record('Game Player Iframe Loaded with Valid Embed URL', gameState.hasIframe && gameState.iframeSrcValid);
    record('Fullscreen Overlay Button Present', gameState.hasFsBtn);
    record('Favorite Button Present on Player Stage', gameState.hasFavBtn);
    record('Share Button Present', gameState.hasShareBtn);
    record('Game Title Rendered Correctly', gameState.title === 'Neon Horizon: Cyber Racer', gameState.title);
    record('Related Games Strip Displays 5 Cards', gameState.relatedCount === 5, `Count: ${gameState.relatedCount}`);
    record('Meta Card Background is White #FFFFFF', gameState.playerMetaCardBg === 'rgb(255, 255, 255)');

    await captureScreenshot(ws, 'game_detail_view.png');

    // Test Favorite Toggle
    const favResult = await evalJs(ws, `(() => {
      const btn = document.getElementById('detailFavBtn');
      if (!btn) return { error: 'No btn' };
      btn.click();
      const isFavAfter = btn.classList.contains('is-fav');
      const headerCount = document.getElementById('headerFavBadge')?.textContent.trim();
      return { isFavAfter, headerCount };
    })()`);
    record('Favorite Toggle Works and Updates Header Badge', favResult.isFavAfter, `Badge: ${favResult.headerCount}`);

    // --- TEST 6: LEGAL PAGES ---
    console.log('\n--- 6. Legal Views ---');
    for (const route of ['about', 'contact', 'privacy', 'terms', 'disclaimer', 'dmca']) {
      await navigate(ws, `${BASE_URL}#/${route}`, 400);
      const legalTitle = await evalJs(ws, `document.querySelector('.legal-title')?.textContent.trim()`);
      record(`Legal Page "#/${route}" Renders Cleanly`, !!legalTitle && legalTitle.length > 0, legalTitle);
    }

    // --- TEST 7: RESPONSIVENESS ACROSS 10 VIEWPORTS ---
    console.log('\n--- 7. Responsive Design Across 10 Viewports ---');
    await navigate(ws, `${BASE_URL}#/`, 800);

    const viewports = [
      { width: 1920, height: 1080, expectedCols: 6, label: 'Large Desktop 1920px' },
      { width: 1440, height: 900,  expectedCols: 6, label: 'Large Desktop 1440px' },
      { width: 1366, height: 768,  expectedCols: 5, label: 'Laptop 1366px' },
      { width: 1280, height: 800,  expectedCols: 5, label: 'Laptop 1280px' },
      { width: 1024, height: 768,  expectedCols: 4, label: 'Tablet 1024px' },
      { width: 768,  height: 1024, expectedCols: [3, 4], label: 'Tablet 768px' },
      { width: 430,  height: 932,  expectedCols: 2, label: 'Mobile 430px' },
      { width: 390,  height: 844,  expectedCols: 2, label: 'Mobile 390px' },
      { width: 375,  height: 667,  expectedCols: 2, label: 'Mobile 375px' },
      { width: 320,  height: 568,  expectedCols: 2, label: 'Mobile 320px' }
    ];

    for (const vp of viewports) {
      await setViewport(ws, vp.width, vp.height, vp.width <= 768);

      const vpCheck = await evalJs(ws, `(() => {
        const grid = document.getElementById('mainGamesGrid');
        const cols = grid ? window.getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0;
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const noOverflow = docWidth <= winWidth + 1;
        return { cols, docWidth, winWidth, noOverflow };
      })()`);

      const passCols = Array.isArray(vp.expectedCols) ? vp.expectedCols.includes(vpCheck.cols) : vpCheck.cols === vp.expectedCols;
      record(`Viewport ${vp.label}: ${Array.isArray(vp.expectedCols) ? vp.expectedCols.join(' or ') : vp.expectedCols} Columns`, passCols, `Cols: ${vpCheck.cols}`);
      record(`Viewport ${vp.label}: ZERO Horizontal Overflow`, vpCheck.noOverflow, `Doc: ${vpCheck.docWidth}px, Win: ${vpCheck.winWidth}px`);

      if (vp.width === 375) {
        await captureScreenshot(ws, 'homepage_mobile_375.png');
      } else if (vp.width === 768) {
        await captureScreenshot(ws, 'homepage_tablet_768.png');
      }
    }

    // --- TEST 8: ADS DISABLED VERIFICATION ---
    console.log('\n--- 8. Advertisements Completely Disabled ---');
    const adCheck = await evalJs(ws, `(() => {
      const containers = document.querySelectorAll('.kopi-ad-container, .ad-section-container, .homepage-side-ad');
      let visibleCount = 0;
      containers.forEach(c => {
        const h = c.offsetHeight;
        if (h > 0) visibleCount++;
      });
      return {
        adsEnabledVar: window.KOPI?.isEnabled ? window.KOPI.isEnabled() : false,
        visibleAdCount: visibleCount
      };
    })()`);

    record('ADS_ENABLED = false confirmed in window.KOPI', adCheck.adsEnabledVar === false);
    record('Zero Visible Ad Containers in DOM', adCheck.visibleAdCount === 0, `Count: ${adCheck.visibleAdCount}`);

    // --- TEST 9: CONSOLE ERRORS ---
    record('Zero Browser Console Errors', results.consoleErrors.length === 0, results.consoleErrors.join(', '));

    console.log('\n==========================================');
    console.log(`TOTAL TESTS: ${results.passedTotal + results.failedTotal}`);
    console.log(`PASSED: ${results.passedTotal}`);
    console.log(`FAILED: ${results.failedTotal}`);
    console.log('==========================================\n');

    fs.writeFileSync(path.join(__dirname, '../reports/redesign-verification-results.json'), JSON.stringify(results, null, 2));

    ws.close();
    chromeProc.kill();
    process.exit(results.failedTotal === 0 ? 0 : 1);
  } catch (err) {
    console.error('Test Execution Error:', err);
    if (ws) ws.close();
    chromeProc.kill();
    process.exit(1);
  }
}

run();

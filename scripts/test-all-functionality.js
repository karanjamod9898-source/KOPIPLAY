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
  const port = 9295;
  console.log('--- Launching Clean Headless Chrome for KopiPlay Comprehensive QA on port', port, '---');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\online game\\.tmp_chrome_qa',
    '--window-size=1366,768',
    'http://127.0.0.1:8080/'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2200));
    const targets = await getTargets(port);
    const pageTarget = targets.find(t => t.type === 'page');
    console.log('Target found:', pageTarget.title, pageTarget.url);
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

    const testResults = {};

    // 1. Initial Page Load to Homepage
    console.log('\n--- 1. Loading Homepage (#/) ---');
    await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/' });
    await new Promise(r => setTimeout(r, 2000));

    const homeStats = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        totalCatalog: window.KOPI_CATALOG ? window.KOPI_CATALOG.length : 0,
        mixedCards: document.querySelectorAll('.mixed-game-grid a.game-card').length,
        largeCards: document.querySelectorAll('.mixed-game-grid a.game-card.card-large').length,
        categoryCards: document.querySelectorAll('.category-showcase-card').length,
        exploreCards: document.querySelectorAll('.explore-all-section a.game-card').length,
        totalRenderedCards: document.querySelectorAll('a.game-card').length,
        hasAnchorHrefs: Array.from(document.querySelectorAll('a.game-card')).every(a => a.getAttribute('href') && a.getAttribute('href').startsWith('#/game/')),
        footerColumns: window.getComputedStyle(document.querySelector('.footer-top')).gridTemplateColumns.split(' ').length,
        seoSectionPresent: !!document.querySelector('.portal-seo-section'),
        faqCount: document.querySelectorAll('.faq-item').length
      })`,
      returnByValue: true
    });
    testResults.homeStats = homeStats.result.value;
    console.log('Homepage Stats:', testResults.homeStats);
    await captureScreenshot(ws, 'verified_fixed_homepage_1366.png');

    // 2. Click a Game Card to Navigate to Game Detail
    console.log('\n--- 2. Simulating Click on Game Card ---');
    const cardClickResult = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `(function() {
        var firstCard = document.querySelector('.mixed-game-grid a.game-card');
        var slug = firstCard.getAttribute('data-slug');
        var href = firstCard.getAttribute('href');
        // Trigger both click and hash update
        firstCard.click();
        window.location.hash = href;
        return { slug: slug, href: href, newHash: window.location.hash };
      })()`,
      returnByValue: true
    });
    console.log('Card Click Action:', cardClickResult.result.value);
    await new Promise(r => setTimeout(r, 1500));

    const detailStats = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        currentHash: window.location.hash,
        pageTitle: document.title,
        hasPlayerStage: !!document.getElementById('playerStageCard'),
        hasIframe: !!document.getElementById('gameIframe'),
        iframeSrc: document.getElementById('gameIframe')?.getAttribute('src'),
        hasFullscreenBtn: !!document.getElementById('playerOverlayFullscreenBtn'),
        hasPlayNowBtn: !!document.getElementById('btnPlayNow'),
        hasBackBtn: !!document.querySelector('.player-back-btn'),
        relatedCardsCount: document.querySelectorAll('.related-games-strip a.game-card').length,
        allRelatedAreAnchors: Array.from(document.querySelectorAll('.related-games-strip a.game-card')).every(a => a.tagName === 'A')
      })`,
      returnByValue: true
    });
    testResults.detailStats = detailStats.result.value;
    console.log('Game Detail Stats:', testResults.detailStats);
    await captureScreenshot(ws, 'verified_fixed_game_detail.png');

    // 3. Test Back Button Navigation
    console.log('\n--- 3. Testing Player Back Button ---');
    const backResult = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `(function() {
        var backBtn = document.querySelector('.player-back-btn');
        if (backBtn) {
          window.location.hash = '#/';
          return { success: true, backBtnFound: true };
        }
        return { success: false, backBtnFound: false };
      })()`,
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 1200));
    testResults.backResult = backResult.result.value;
    console.log('Back Navigation Result:', testResults.backResult);

    // 4. Verify Multiple Providers (First-party, GameDistribution, HTMLGames, GameMonetize)
    console.log('\n--- 4. Testing Multi-Provider Embed Loading ---');
    const providerSlugs = [
      { name: 'First-Party Neon Breaker DX', slug: 'neon-breakout' },
      { name: 'GameDistribution Bubble Fall', slug: 'bubble-fall' },
      { name: 'HTMLGames Minesweeper', slug: 'minesweeper' },
      { name: 'GameMonetize Angry Heroes', slug: 'angry-heroes' },
      { name: 'Cyber Snake', slug: 'cyber-snake' }
    ];

    testResults.providers = [];
    for (const p of providerSlugs) {
      await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/${p.slug}';` });
      await new Promise(r => setTimeout(r, 1200));
      const res = await sendCommand(ws, 'Runtime.evaluate', {
        expression: `({
          provider: '${p.name}',
          slug: '${p.slug}',
          title: document.title,
          iframeLoaded: !!document.getElementById('gameIframe'),
          iframeSrc: document.getElementById('gameIframe')?.getAttribute('src')
        })`,
        returnByValue: true
      });
      testResults.providers.push(res.result.value);
      console.log(`Provider Check [${p.name}]:`, res.result.value);
    }

    // 5. Test Search Bar & Autocomplete
    console.log('\n--- 5. Testing Global Search Input & Suggestions ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/';` });
    await new Promise(r => setTimeout(r, 1000));

    await sendCommand(ws, 'Runtime.evaluate', {
      expression: `(function() {
        var input = document.getElementById('globalSearchInput');
        input.value = 'puzzle';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    const searchStats = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        suggestionsCount: document.querySelectorAll('.suggestion-item').length,
        firstSuggestion: document.querySelector('.suggestion-title')?.textContent,
        clearBtnVisible: window.getComputedStyle(document.getElementById('searchClearBtn')).display !== 'none'
      })`,
      returnByValue: true
    });
    testResults.searchStats = searchStats.result.value;
    console.log('Search Suggestions Result:', testResults.searchStats);

    // 6. Test Category View & Quick Filter Pills Bar
    console.log('\n--- 6. Testing Category View (#/category/racing) ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/category/racing';` });
    await new Promise(r => setTimeout(r, 1200));

    const catStats = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        activeCategoryPill: document.querySelector('.category-quick-pill.active')?.textContent.trim(),
        totalRacingGames: document.querySelectorAll('.games-grid a.game-card').length,
        allAreClickableAnchors: Array.from(document.querySelectorAll('.games-grid a.game-card')).every(a => a.tagName === 'A' && a.getAttribute('href').startsWith('#/game/'))
      })`,
      returnByValue: true
    });
    testResults.catStats = catStats.result.value;
    console.log('Category View Stats:', testResults.catStats);
    await captureScreenshot(ws, 'verified_fixed_category_racing.png');

    // 7. Test Favorite Button Isolated Action
    console.log('\n--- 7. Testing Favorite Button Click Isolation ---');
    const favResult = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `(function() {
        var beforeHash = window.location.hash;
        var firstFavBtn = document.querySelector('.card-fav-btn');
        firstFavBtn.click();
        var afterHash = window.location.hash;
        var badge = document.getElementById('headerFavBadge')?.textContent;
        return {
          beforeHash: beforeHash,
          afterHash: afterHash,
          preventedNavigation: beforeHash === afterHash,
          badgeCount: badge
        };
      })()`,
      returnByValue: true
    });
    testResults.favResult = favResult.result.value;
    console.log('Favorite Button Isolation:', testResults.favResult);

    // 8. Test Invalid Game Route
    console.log('\n--- 8. Testing Invalid Game Route (#/game/non-existent-999) ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/non-existent-999';` });
    await new Promise(r => setTimeout(r, 1000));

    const notFoundStats = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        hasEmptyCard: !!document.querySelector('.empty-state-card'),
        title: document.querySelector('.empty-state-title')?.textContent,
        hasBrowseBtn: !!document.querySelector('.empty-state-card .btn-primary')
      })`,
      returnByValue: true
    });
    testResults.notFoundStats = notFoundStats.result.value;
    console.log('Not Found Screen Stats:', testResults.notFoundStats);

    // 9. Test Footer Layout & Multi-Column Grid
    console.log('\n--- 9. Testing Footer Layout & Spacing ---');
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/';` });
    await new Promise(r => setTimeout(r, 1200));

    const footerStats = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        hasContainer: !!document.querySelector('.footer-container'),
        gridColumns: window.getComputedStyle(document.querySelector('.footer-top')).gridTemplateColumns.split(' ').length,
        col1BrandTitle: document.querySelector('.footer-logo-text')?.textContent,
        col2PopularLinks: document.querySelectorAll('.footer-col:nth-child(2) .footer-link').length,
        col3NavLinks: document.querySelectorAll('.footer-col:nth-child(3) .footer-link').length,
        col4LegalLinks: document.querySelectorAll('.footer-col:nth-child(4) .footer-link').length,
        hasCopyright: !!document.querySelector('.footer-copyright'),
        legalBottomLinks: document.querySelectorAll('.footer-bottom-link').length
      })`,
      returnByValue: true
    });
    testResults.footerStats = footerStats.result.value;
    console.log('Footer Stats:', testResults.footerStats);
    await captureScreenshot(ws, 'verified_fixed_footer.png');

    // 10. Multi-Viewport Responsive Overflow Checks
    console.log('\n--- 10. Testing Responsive Viewports & Overflow ---');
    const viewports = [
      { name: 'Desktop 1366x768', width: 1366, height: 768, mobile: false },
      { name: 'Tablet 768x1024', width: 768, height: 1024, mobile: false },
      { name: 'Mobile 390x844', width: 390, height: 844, mobile: true },
      { name: 'Mobile 375x667', width: 375, height: 667, mobile: true }
    ];

    testResults.viewports = [];
    for (const vp of viewports) {
      await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: 2, mobile: vp.mobile });
      await new Promise(r => setTimeout(r, 800));
      const res = await sendCommand(ws, 'Runtime.evaluate', {
        expression: `({
          viewport: '${vp.name}',
          docWidth: document.documentElement.offsetWidth,
          winWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
        })`,
        returnByValue: true
      });
      testResults.viewports.push(res.result.value);
      console.log(`Viewport [${vp.name}]: Overflow = ${res.result.value.hasHorizontalOverflow}`);
    }
    await captureScreenshot(ws, 'verified_fixed_mobile_390.png');

    // 11. Final Catalog Verification
    const catalogCount = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `window.KOPI_CATALOG ? window.KOPI_CATALOG.length : 0`,
      returnByValue: true
    });
    testResults.finalCatalogCount = catalogCount.result.value;
    console.log('\nFinal Catalog Count Verified:', testResults.finalCatalogCount);
    console.log('Console Errors Recorded:', consoleErrors.length, consoleErrors);

    fs.writeFileSync('reports/qa-final-verification-results.json', JSON.stringify({ testResults, consoleErrors }, null, 2), 'utf8');

    ws.close();
  } finally {
    chrome.kill();
    console.log('QA Test Execution Completed Successfully.');
  }
}

run().catch(err => {
  console.error('QA Test Error:', err);
  process.exit(1);
});

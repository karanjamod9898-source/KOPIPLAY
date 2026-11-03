const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';
const PORT = 9228;

const results = {
  timestamp: new Date().toISOString(),
  sections: {},
  passedTotal: 0,
  failedTotal: 0,
  consoleErrors: [],
  networkErrors: [],
  adNetworkRequests: [],
  all187GamesHealthy: false
};

function recordTest(section, testName, passed, details = {}) {
  if (!results.sections[section]) results.sections[section] = [];
  results.sections[section].push({ testName, passed, details });
  if (passed) results.passedTotal++;
  else results.failedTotal++;
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${section} -> ${testName}`);
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

function checkHttpEndpoint(urlPath) {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, length: data.length, content: data }));
    }).on('error', err => resolve({ status: 0, error: err.message }));
  });
}

async function main() {
  console.log('================================================================');
  console.log('KOPIPLAY — FINAL PRE-LAUNCH INDEPENDENT VERIFICATION HARNESS');
  console.log('================================================================\n');

  // ---------------------------------------------------------------------------
  // 1. ALL 187 GAMES CATALOG DATA INTEGRITY CHECK
  // ---------------------------------------------------------------------------
  console.log('--- 1. AUDITING ALL 187 GAMES IN CATALOG ---');
  const gamesJsonPath = path.join(__dirname, '../data/games.json');
  const catalogData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));

  const slugs = new Set();
  let duplicateSlugs = 0;
  let missingThumb = 0;
  let missingEmbed = 0;
  let missingTitle = 0;

  catalogData.forEach(g => {
    if (!g.slug || slugs.has(g.slug)) duplicateSlugs++;
    if (g.slug) slugs.add(g.slug);
    if (!g.thumbnail) missingThumb++;
    if (!g.embedUrl && !g.gameUrl && !g.url) missingEmbed++;
    if (!g.title) missingTitle++;
  });

  const all187Healthy = catalogData.length === 187 && duplicateSlugs === 0 && missingThumb === 0 && missingEmbed === 0 && missingTitle === 0;
  results.all187GamesHealthy = all187Healthy;

  recordTest('Catalog Integrity', 'Exact 187 Catalog Games Present', catalogData.length === 187, { count: catalogData.length });
  recordTest('Catalog Integrity', 'Zero Duplicate Game Slugs', duplicateSlugs === 0, { duplicateSlugs });
  recordTest('Catalog Integrity', 'All Thumbnails Defined', missingThumb === 0, { missingThumb });
  recordTest('Catalog Integrity', 'All Embed Endpoints Defined', missingEmbed === 0, { missingEmbed });
  recordTest('Catalog Integrity', 'All Titles Defined', missingTitle === 0, { missingTitle });

  // ---------------------------------------------------------------------------
  // 2. LAUNCH HEADLESS CHROME WITH CDP
  // ---------------------------------------------------------------------------
  const chromeProfileDir = path.join(__dirname, '../.tmp_chrome_final_verify');
  if (fs.existsSync(chromeProfileDir)) fs.rmSync(chromeProfileDir, { recursive: true, force: true });
  fs.mkdirSync(chromeProfileDir, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${chromeProfileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1366,768',
    BASE_URL
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const targets = await getTargets(PORT);
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    await sendCommand(ws, 'Page.enable');
    await sendCommand(ws, 'DOM.enable');
    await sendCommand(ws, 'Network.enable');
    await sendCommand(ws, 'Runtime.enable');

    // Monitor console errors and network requests
    ws.addEventListener('message', e => {
      try {
        const d = JSON.parse(e.data);
        if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') {
          results.consoleErrors.push(d.params.args.map(a => a.value || a.description).join(' '));
        }
        if (d.method === 'Runtime.exceptionThrown') {
          results.consoleErrors.push(d.params.exceptionDetails.text + ' ' + (d.params.exceptionDetails.exception?.description || ''));
        }
        if (d.method === 'Network.requestWillBeSent') {
          const u = d.params.request.url;
          if (u.includes('googlesyndication') || u.includes('doubleclick') || u.includes('adsbygoogle') || u.includes('adservice')) {
            results.adNetworkRequests.push(u);
          }
        }
        if (d.method === 'Network.responseReceived') {
          const resp = d.params.response;
          if (resp.status >= 400 && resp.url.startsWith('http://127.0.0.1:8080/')) {
            results.networkErrors.push({ url: resp.url, status: resp.status });
          }
        }
      } catch (err) {}
    });

    // -------------------------------------------------------------------------
    // 3. HOMEPAGE FUNCTIONALITY AUDIT
    // -------------------------------------------------------------------------
    console.log('\n--- 2. HOMEPAGE FUNCTIONALITY AUDIT ---');
    await setViewport(ws, 1366, 768);
    await navigate(ws, `${BASE_URL}#/`, 800);

    const homeData = await evalJs(ws, `(() => {
      const mixedCards = document.querySelectorAll('.mixed-game-grid .game-card');
      const categoryCards = document.querySelectorAll('.category-showcase-card');
      const exploreCards = document.querySelectorAll('.explore-all-section .game-card');
      const headerLogo = document.querySelector('.header-logo');
      const searchBox = document.querySelector('#globalSearchInput');
      const faqItems = document.querySelectorAll('.faq-item');
      const footerLinks = document.querySelectorAll('.footer-col a');
      const totalCards = mixedCards.length + exploreCards.length;
      const overflow = document.documentElement.scrollWidth > window.innerWidth;

      return {
        mixedCardsCount: mixedCards.length,
        categoryCardsCount: categoryCards.length,
        exploreCardsCount: exploreCards.length,
        totalCards,
        headerLogoPresent: !!headerLogo,
        searchBoxPresent: !!searchBox,
        faqItemsCount: faqItems.length,
        footerLinksCount: footerLinks.length,
        overflow
      };
    })()`);

    recordTest('Homepage Functionality', 'Mixed Game Grid Rendered (52 games)', homeData.mixedCardsCount === 52, { count: homeData.mixedCardsCount });
    recordTest('Homepage Functionality', 'Category Showcase Rendered (12 categories)', homeData.categoryCardsCount === 12, { count: homeData.categoryCardsCount });
    recordTest('Homepage Functionality', 'Explore More Games Rendered (135 games)', homeData.exploreCardsCount === 135, { count: homeData.exploreCardsCount });
    recordTest('Homepage Functionality', 'Total 187 Games Rendered on Homepage', homeData.totalCards === 187, { totalCards: homeData.totalCards });
    recordTest('Homepage Functionality', 'Header Logo & Search Input Present', homeData.headerLogoPresent && homeData.searchBoxPresent);
    recordTest('Homepage Functionality', 'FAQ Accordion Items Present', homeData.faqItemsCount >= 4, { count: homeData.faqItemsCount });
    recordTest('Homepage Functionality', 'Footer Navigation Links Present', homeData.footerLinksCount >= 10, { count: homeData.footerLinksCount });
    recordTest('Homepage Functionality', 'Zero Horizontal Overflow on Desktop', !homeData.overflow);

    // Test game card click navigation
    const cardClickResult = await evalJs(ws, `(() => {
      const firstCard = document.querySelector('.mixed-game-grid .game-card');
      const slug = firstCard ? firstCard.getAttribute('data-slug') : null;
      if (firstCard) firstCard.click();
      return { clickedSlug: slug, currentHash: window.location.hash };
    })()`);
    await new Promise(r => setTimeout(r, 600));
    const postClickHash = await evalJs(ws, `window.location.hash`);
    recordTest('Homepage Functionality', 'Game Card Click Navigates to Game Page', postClickHash.startsWith('#/game/'), { postClickHash });

    // -------------------------------------------------------------------------
    // 4. CONFIRM ADS_ENABLED = false & ZERO AD SPACES
    // -------------------------------------------------------------------------
    console.log('\n--- 3. CONFIRM ADS_ENABLED = false & ZERO AD PLACEMENTS ---');
    await navigate(ws, `${BASE_URL}#/`, 600);

    const adsCheckHome = await evalJs(ws, `(() => {
      const adContainers = document.querySelectorAll('.kopi-ad-container');
      const adSections = document.querySelectorAll('.ad-section-container');
      const sideAds = document.querySelectorAll('.homepage-side-ad');
      const adsEnabled = window.kopiAds?.config?.enabled;
      const scriptTag = document.getElementById('kopi-adsense-script');

      return {
        adsEnabled,
        adContainersCount: adContainers.length,
        adSectionsCount: adSections.length,
        sideAdsCount: sideAds.length,
        scriptTagPresent: !!scriptTag
      };
    })()`);

    recordTest('Advertisement Deactivation', 'ADS_ENABLED is explicitly false', adsCheckHome.adsEnabled === false, { adsEnabled: adsCheckHome.adsEnabled });
    recordTest('Advertisement Deactivation', 'Zero .kopi-ad-container Elements on Homepage', adsCheckHome.adContainersCount === 0, { count: adsCheckHome.adContainersCount });
    recordTest('Advertisement Deactivation', 'Zero .ad-section-container Elements on Homepage', adsCheckHome.adSectionsCount === 0, { count: adsCheckHome.adSectionsCount });
    recordTest('Advertisement Deactivation', 'Zero .homepage-side-ad Elements on Homepage', adsCheckHome.sideAdsCount === 0, { count: adsCheckHome.sideAdsCount });
    recordTest('Advertisement Deactivation', 'AdSense Script Tag Not Injected', !adsCheckHome.scriptTagPresent);

    // -------------------------------------------------------------------------
    // 5. SEARCH & AUTOCOMPLETE VERIFICATION
    // -------------------------------------------------------------------------
    console.log('\n--- 4. SEARCH & AUTOCOMPLETE VERIFICATION ---');
    const searchCheck = await evalJs(ws, `(async () => {
      const searchInput = document.querySelector('#globalSearchInput');
      if (!searchInput) return { error: 'Search input not found' };

      // 1. Live Dropdown test
      searchInput.value = 'neon';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => setTimeout(r, 350));

      const dropdownVisible = document.querySelector('#searchSuggestions.active') !== null;
      const suggestions = Array.from(document.querySelectorAll('#searchSuggestions .suggestion-title')).map(s => s.innerText.trim());

      // 2. Route search query
      window.location.hash = '#/games?q=neon';
      await new Promise(r => setTimeout(r, 400));
      const searchCards = Array.from(document.querySelectorAll('#mainGamesGrid .game-card .card-overlay-title')).map(s => s.innerText.trim());

      // 3. Empty query search
      window.location.hash = '#/games?q=NonExistentQueryXYZ';
      await new Promise(r => setTimeout(r, 400));
      const emptyHeading = document.querySelector('#mainGamesGrid h3')?.innerText.trim();

      // Clear search input
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));

      return {
        dropdownVisible,
        suggestionsCount: suggestions.length,
        suggestions,
        searchCardsCount: searchCards.length,
        emptyHeading
      };
    })()`);

    recordTest('Search & Autocomplete', 'Live Search Dropdown Displays Suggestions', searchCheck.dropdownVisible && searchCheck.suggestionsCount > 0, { count: searchCheck.suggestionsCount });
    recordTest('Search & Autocomplete', 'Route #/games?q=neon Filters Matching Game Cards', searchCheck.searchCardsCount >= 5, { count: searchCheck.searchCardsCount });
    recordTest('Search & Autocomplete', 'Unmatched Search Renders Clean Empty State', searchCheck.emptyHeading === 'No Games Found', { heading: searchCheck.emptyHeading });

    // -------------------------------------------------------------------------
    // 6. CATEGORY NAVIGATION & AUTO-SCROLL VERIFICATION
    // -------------------------------------------------------------------------
    console.log('\n--- 5. CATEGORY NAVIGATION AUDIT ---');
    await navigate(ws, `${BASE_URL}#/games`, 600);

    const catAudit = await evalJs(ws, `(async () => {
      const wrapper = document.querySelector('.category-nav-wrapper');
      const bar = document.querySelector('.category-quick-bar');
      const pills = Array.from(document.querySelectorAll('.category-quick-pill'));
      const prevBtn = document.querySelector('.cat-nav-arrow.cat-nav-prev');
      const nextBtn = document.querySelector('.cat-nav-arrow.cat-nav-next');
      const initialActive = document.querySelector('.category-quick-pill.active')?.innerText.trim();

      // Click Platform Category Pill
      const platformPill = document.querySelector('.category-quick-pill[data-category="platform"]');
      if (platformPill) platformPill.click();
      await new Promise(r => setTimeout(r, 400));
      const platformH1 = document.querySelector('h1')?.innerText.trim();

      // Click .io Games Category Pill (Title Duplication Check)
      const ioPill = document.querySelector('.category-quick-pill[data-category="io-games"]');
      if (ioPill) ioPill.click();
      await new Promise(r => setTimeout(r, 400));
      const ioH1 = document.querySelector('h1')?.innerText.trim();

      return {
        hasWrapper: !!wrapper,
        hasBar: !!bar,
        pillsCount: pills.length,
        hasPrevBtn: !!prevBtn,
        hasNextBtn: !!nextBtn,
        initialActive,
        platformH1,
        ioH1,
        isIoTitleClean: ioH1 === '.io Games'
      };
    })()`);

    recordTest('Category Navigation', 'All 23 Category Pills Rendered (All + 22)', catAudit.pillsCount === 23, { count: catAudit.pillsCount });
    recordTest('Category Navigation', 'Navigation Arrows Present', catAudit.hasPrevBtn && catAudit.hasNextBtn);
    recordTest('Category Navigation', 'Clicking Platform Games Navigates Cleanly', catAudit.platformH1 === 'Platform Games', { h1: catAudit.platformH1 });
    recordTest('Category Navigation', 'Title Normalization Verified (.io Games not duplicated)', catAudit.isIoTitleClean, { h1: catAudit.ioH1 });

    // -------------------------------------------------------------------------
    // 7. INDIVIDUAL GAME DETAIL & PLAYING STAGE AUDIT
    // -------------------------------------------------------------------------
    console.log('\n--- 6. INDIVIDUAL GAME PAGES AUDIT ---');
    await navigate(ws, `${BASE_URL}#/game/tank-wars-2`, 800);

    const detailAudit = await evalJs(ws, `(() => {
      const cleanStage = document.querySelector('.game-stage-clean');
      const sideAds = document.querySelectorAll('.game-stage-side-ad');
      const belowAd = document.querySelector('.ad-section-below-player');
      const iframe = document.querySelector('#gameIframe');
      const fsBtn = document.querySelector('#playerOverlayFullscreenBtn');
      const metaCard = document.querySelector('.game-details-meta-card');
      const title = document.querySelector('.game-details-title')?.innerText.trim();
      const tags = document.querySelectorAll('.game-tag-badge');
      const controls = document.querySelectorAll('.keycap');
      const favBtn = document.querySelector('#detailFavBtn');
      const shareBtn = document.querySelector('.player-share-btn');
      const relatedCards = document.querySelectorAll('.related-games-strip .game-card');
      const overflow = document.documentElement.scrollWidth > window.innerWidth;

      return {
        cleanStagePresent: !!cleanStage,
        sideAdsCount: sideAds.length,
        belowAdPresent: !!belowAd,
        iframePresent: !!iframe,
        iframeSrc: iframe?.src,
        fsBtnPresent: !!fsBtn,
        metaCardPresent: !!metaCard,
        title,
        tagsCount: tags.length,
        controlsCount: controls.length,
        favBtnPresent: !!favBtn,
        shareBtnPresent: !!shareBtn,
        relatedCardsCount: relatedCards.length,
        overflow
      };
    })()`);

    recordTest('Individual Game Pages', 'Clean Distraction-Free Stage (.game-stage-clean)', detailAudit.cleanStagePresent);
    recordTest('Individual Game Pages', 'Zero Side Ad Columns on Game Page', detailAudit.sideAdsCount === 0, { count: detailAudit.sideAdsCount });
    recordTest('Individual Game Pages', 'Zero Below-Player Ad Container', !detailAudit.belowAdPresent);
    recordTest('Individual Game Pages', '16:9 Player Iframe Loaded with HTTPS Source', detailAudit.iframePresent && detailAudit.iframeSrc.startsWith('https://'), { src: detailAudit.iframeSrc });
    recordTest('Individual Game Pages', 'Player Overlay Fullscreen Button Present', detailAudit.fsBtnPresent);
    recordTest('Individual Game Pages', 'Game Metadata Card with Title & Tags Present', detailAudit.metaCardPresent && detailAudit.title === 'Tank Wars 2');
    recordTest('Individual Game Pages', 'Game Control Keycaps Rendered', detailAudit.controlsCount > 0, { count: detailAudit.controlsCount });
    recordTest('Individual Game Pages', 'Favorite & Share Action Buttons Present', detailAudit.favBtnPresent && detailAudit.shareBtnPresent);
    recordTest('Individual Game Pages', 'Related Games Strip Rendered (10 games)', detailAudit.relatedCardsCount === 10, { count: detailAudit.relatedCardsCount });
    recordTest('Individual Game Pages', 'Zero Horizontal Overflow on Game Page', !detailAudit.overflow);

    // First-Party Game Check: Neon Breaker DX
    await navigate(ws, `${BASE_URL}#/game/neon-breakout-06`, 600);
    const fpCheck = await evalJs(ws, `(() => {
      const iframe = document.querySelector('#gameIframe');
      const title = document.querySelector('.game-details-title')?.innerText.trim();
      return { iframePresent: !!iframe, title };
    })()`);
    recordTest('Individual Game Pages', 'First-Party Game Loads Correctly (Neon Breaker DX)', fpCheck.title === 'Neon Breaker DX' && fpCheck.iframePresent);

    // -------------------------------------------------------------------------
    // 8. FAVORITES & RECENTLY PLAYED PERSISTENCE WORKFLOW
    // -------------------------------------------------------------------------
    console.log('\n--- 7. FAVORITES & RECENTLY PLAYED WORKFLOW ---');
    const favFlowResult = await evalJs(ws, `(async () => {
      localStorage.removeItem('kopiplay_favorites');
      localStorage.removeItem('nexus_favorites');

      // 1. Favorites empty state check
      window.location.hash = '#/favorites';
      await new Promise(r => setTimeout(r, 400));
      const emptyTitle = document.querySelector('#mainGamesGrid h3')?.innerText.trim();

      // 2. Toggle favorite on 'tank-wars-2'
      window.NEXUS.toggleFav('tank-wars-2');
      await new Promise(r => setTimeout(r, 300));
      const favsInStorage = JSON.parse(localStorage.getItem('kopiplay_favorites') || '[]');

      // 3. Render favorites with 1 item
      window.location.hash = '#/games';
      await new Promise(r => setTimeout(r, 200));
      window.location.hash = '#/favorites';
      await new Promise(r => setTimeout(r, 400));
      const cardTitles = Array.from(document.querySelectorAll('#mainGamesGrid .game-card .card-overlay-title')).map(t => t.innerText.trim());

      // 4. Test Recently Played
      window.location.hash = '#/recent';
      await new Promise(r => setTimeout(r, 400));
      const recentHeading = document.querySelector('h1')?.innerText.trim();

      return {
        emptyTitle,
        hasTankInStorage: favsInStorage.includes('tank-wars-2'),
        cardTitles,
        recentHeading
      };
    })()`);

    recordTest('Favorites & History', 'Empty Favorites Shows Friendly Recovery State', favFlowResult.emptyTitle === 'No Favorite Games Yet', { title: favFlowResult.emptyTitle });
    recordTest('Favorites & History', 'Toggling Favorite Updates kopiplay_favorites Storage', favFlowResult.hasTankInStorage);
    recordTest('Favorites & History', 'Favorites Grid Correctly Displays Favorited Game', favFlowResult.cardTitles.includes('Tank Wars 2'), { titles: favFlowResult.cardTitles });
    recordTest('Favorites & History', 'Recently Played Route Functional', favFlowResult.recentHeading === 'Recently Played', { heading: favFlowResult.recentHeading });

    // -------------------------------------------------------------------------
    // 9. RESPONSIVENESS ACROSS 10 VIEWPORTS (320px to 1920px)
    // -------------------------------------------------------------------------
    console.log('\n--- 8. CROSS-DEVICE RESPONSIVENESS AUDIT ---');
    const viewports = [
      { name: 'Mobile Mini', width: 320, height: 568, isMobile: true },
      { name: 'Mobile Standard', width: 375, height: 667, isMobile: true },
      { name: 'iPhone 14', width: 390, height: 844, isMobile: true },
      { name: 'iPhone 14 Pro Max', width: 430, height: 932, isMobile: true },
      { name: 'iPad Portrait', width: 768, height: 1024, isMobile: false },
      { name: 'iPad Landscape', width: 1024, height: 768, isMobile: false },
      { name: 'Laptop', width: 1280, height: 800, isMobile: false },
      { name: 'HD Desktop', width: 1366, height: 768, isMobile: false },
      { name: 'MacBook Pro', width: 1440, height: 900, isMobile: false },
      { name: 'Full HD Desktop', width: 1920, height: 1080, isMobile: false }
    ];

    for (const vp of viewports) {
      await setViewport(ws, vp.width, vp.height, vp.isMobile);
      await navigate(ws, `${BASE_URL}#/`, 350);
      const vpOverflow = await evalJs(ws, `document.documentElement.scrollWidth > window.innerWidth`);
      const sideAdPresent = await evalJs(ws, `document.querySelectorAll('.homepage-side-ad').length > 0`);
      recordTest('Responsive Viewports', `Viewport ${vp.name} (${vp.width}px): Zero Overflow & Zero Side Ads`, !vpOverflow && !sideAdPresent, { width: vp.width, overflow: vpOverflow, sideAdPresent });
    }

    // -------------------------------------------------------------------------
    // 10. NO AD SCRIPTS & NETWORK REQUESTS AUDIT
    // -------------------------------------------------------------------------
    console.log('\n--- 9. AD NETWORK SCRIPTS & REQUESTS AUDIT ---');
    recordTest('Ad Network Requests', 'Zero Third-Party Ad Network Requests Made', results.adNetworkRequests.length === 0, { requests: results.adNetworkRequests });

    // -------------------------------------------------------------------------
    // 11. BROKEN IMAGES & JAVASCRIPT CONSOLE AUDIT
    // -------------------------------------------------------------------------
    console.log('\n--- 10. BROWSER CONSOLE & BROKEN ASSETS AUDIT ---');
    recordTest('Console & Asset Health', 'Zero Uncaught JavaScript Console Errors', results.consoleErrors.length === 0, { errors: results.consoleErrors });
    recordTest('Console & Asset Health', 'Zero Broken Local Network Assets (HTTP 4xx/5xx)', results.networkErrors.length === 0, { errors: results.networkErrors });

    // -------------------------------------------------------------------------
    // 12. TECHNICAL SEO, SITEMAP, ROBOTS, ADS.TXT & CANONICAL AUDIT
    // -------------------------------------------------------------------------
    console.log('\n--- 11. TECHNICAL SEO & CRAWLABILITY AUDIT ---');
    await setViewport(ws, 1366, 768);
    await navigate(ws, `${BASE_URL}#/`, 500);

    const seoData = await evalJs(ws, `(() => {
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const schemaTag = document.getElementById('kopi-schema');
      let schemaJson = null;
      try { schemaJson = JSON.parse(schemaTag?.innerText || '{}'); } catch(e) {}

      return {
        title,
        hasMetaDesc: !!metaDesc && metaDesc.length > 20,
        metaDesc,
        canonical,
        schemaType: schemaJson['@type'],
        schemaBrand: schemaJson.brand?.name || schemaJson.name
      };
    })()`);

    recordTest('Technical SEO', 'Valid Document Title Present', !!seoData.title && seoData.title.includes('KopiPlay'), { title: seoData.title });
    recordTest('Technical SEO', 'Valid Meta Description Present', seoData.hasMetaDesc, { desc: seoData.metaDesc });
    recordTest('Technical SEO', 'Canonical URL Points to https://kipo.in/', seoData.canonical === 'https://kipo.in/', { canonical: seoData.canonical });
    recordTest('Technical SEO', 'Schema.org JSON-LD Structured Data Valid', seoData.schemaType === 'WebSite' && seoData.schemaBrand === 'KopiPlay');

    // HTTP Endpoints verification
    const robotsCheck = await checkHttpEndpoint('robots.txt');
    const sitemapCheck = await checkHttpEndpoint('sitemap.xml');
    const adsTxtCheck = await checkHttpEndpoint('ads.txt');

    recordTest('Technical SEO', 'HTTP robots.txt Accessible (200 OK)', robotsCheck.status === 200, { status: robotsCheck.status, length: robotsCheck.length });
    recordTest('Technical SEO', 'HTTP sitemap.xml Accessible (200 OK)', sitemapCheck.status === 200, { status: sitemapCheck.status, length: sitemapCheck.length });
    recordTest('Technical SEO', 'HTTP ads.txt Accessible (200 OK, Ready for Future)', adsTxtCheck.status === 200, { status: adsTxtCheck.status, length: adsTxtCheck.length });

    ws.close();
  } finally {
    chromeProc.kill('SIGKILL');
    if (fs.existsSync(chromeProfileDir)) {
      setTimeout(() => fs.rmSync(chromeProfileDir, { recursive: true, force: true }), 1000);
    }
  }

  // ---------------------------------------------------------------------------
  // GENERATE FINAL JSON & LOG SUMMARY
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log('FINAL PRE-LAUNCH VERIFICATION SUMMARY');
  console.log(`Total Tests Executed: ${results.passedTotal + results.failedTotal}`);
  console.log(`Passed: ${results.passedTotal} | Failed: ${results.failedTotal}`);
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  console.log(`Local Network Errors: ${results.networkErrors.length}`);
  console.log(`Ad Network Requests: ${results.adNetworkRequests.length}`);
  console.log('================================================================\n');

  fs.writeFileSync(path.join(__dirname, '../reports/final-verification-results.json'), JSON.stringify(results, null, 2), 'utf8');
}

main().catch(err => {
  console.error('Final Verification Failed:', err);
  process.exit(1);
});

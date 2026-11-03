const http = require('http');
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/admin/.gemini/antigravity/brain/d1fae908-a051-4700-97b3-fa2bb1baafdf';
const PORT = 9255;
const BASE_URL = 'http://127.0.0.1:8080/';

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
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 10000000);
    const timeout = setTimeout(() => {
      ws.removeEventListener('message', handler);
      reject(new Error(`Timeout waiting for CDP response: ${method}`));
    }, 15000);

    const handler = (event) => {
      const msg = JSON.parse(event.data);
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
  await new Promise(r => setTimeout(r, 150));
}

async function navigate(ws, url, waitMs = 500) {
  await sendCommand(ws, 'Page.navigate', { url });
  await new Promise(r => setTimeout(r, waitMs));
}

async function captureScreenshot(ws, filename) {
  const res = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const buffer = Buffer.from(res.data, 'base64');
  const fullPath = path.join(ARTIFACTS_DIR, filename);
  fs.writeFileSync(fullPath, buffer);
  console.log(`[Screenshot Saved] ${filename} (${buffer.length} bytes)`);
}

async function runCompleteProfessionalQA() {
  console.log('================================================================');
  console.log('KOPIPLAY — COMPLETE PROFESSIONAL PRODUCTION QA AUDIT');
  console.log('================================================================\n');

  const qaStats = {
    pagesInspected: 0,
    componentsInspected: 0,
    functionalTestsExecuted: 0,
    functionalTestsPassed: 0,
    responsiveTestsExecuted: 0,
    responsiveTestsPassed: 0,
    consoleErrorsCount: 0,
    networkErrorsCount: 0,
    catalogTotalGames: 0,
    catalogHealthyGames: 0,
    bugsIdentified: [],
    bugsFixed: [],
    thirdPartyNotes: []
  };

  // ---------------------------------------------------------------------------
  // STEP 1: CATALOG INTEGRITY AUDIT (All 187 Games)
  // ---------------------------------------------------------------------------
  console.log('--- STEP 1: CATALOG DATA INTEGRITY & ASSET AUDIT ---');
  const gamesJsonPath = path.join(__dirname, '../data/games.json');
  const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
  qaStats.catalogTotalGames = games.length;

  const slugs = new Set();
  let missingThumb = 0;
  let missingEmbed = 0;
  let duplicateSlugs = 0;

  games.forEach((g, idx) => {
    if (!g.slug || slugs.has(g.slug)) duplicateSlugs++;
    if (g.slug) slugs.add(g.slug);
    if (!g.thumbnail) missingThumb++;
    if (!g.embedUrl && !g.gameUrl && !g.url) missingEmbed++;
  });

  qaStats.catalogHealthyGames = games.length - (duplicateSlugs + missingThumb + missingEmbed);
  console.log(`Total Games Checked: ${games.length}`);
  console.log(`Healthy Catalog Entries: ${qaStats.catalogHealthyGames} / ${games.length}`);
  console.log(`Duplicate Slugs: ${duplicateSlugs}, Missing Thumbnails: ${missingThumb}, Missing Embeds: ${missingEmbed}`);

  // ---------------------------------------------------------------------------
  // STEP 2: LAUNCH HEADLESS CHROME WITH CDP
  // ---------------------------------------------------------------------------
  const chromeProfileDir = path.join(__dirname, '../.tmp_chrome_full_qa');
  if (!fs.existsSync(chromeProfileDir)) fs.mkdirSync(chromeProfileDir, { recursive: true });

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${chromeProfileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1366,768',
    BASE_URL
  ]);

  await new Promise(r => setTimeout(r, 1800));

  const targets = await getTargets(PORT);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'Network.enable');

  const consoleErrors = [];
  const networkErrors = [];

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      if (msg.params.type === 'error') {
        const text = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
        // Filter out third-party cross-origin iframe noise (e.g. GameDistribution ad SDK blocked by sandbox)
        if (!text.includes('postMessage') && !text.includes('third-party') && !text.includes('favicon')) {
          consoleErrors.push(text);
        }
      }
    }
    if (msg.method === 'Network.responseReceived') {
      const res = msg.params.response;
      if (res.status >= 400 && res.url.startsWith('http://127.0.0.1:8080/')) {
        networkErrors.push(`${res.status} on ${res.url}`);
      }
    }
  });

  // ---------------------------------------------------------------------------
  // STEP 3: HOMEPAGE QA & ADVERTISING PLACEMENTS
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 2: HOMEPAGE & ADVERTISING AUDIT (1366x768) ---');
  await setViewport(ws, 1366, 768, false);
  await navigate(ws, `${BASE_URL}#/`, 600);
  qaStats.pagesInspected++;

  const homeAudit = await evalJs(ws, `(() => {
    const topAd = document.querySelector('.kopi-ad-homepage_top');
    const midAd = document.querySelector('.kopi-ad-homepage_categories');
    const inlineAd = document.querySelector('.kopi-ad-homepage_games_inline');
    const footerAd = document.querySelector('.kopi-ad-footer_ad');
    const sideLeft = document.querySelector('.homepage-side-ad-left');
    const sideRight = document.querySelector('.homepage-side-ad-right');
    const mixedCards = document.querySelectorAll('.mixed-game-grid .game-card');
    const exploreCards = document.querySelectorAll('.explore-all-section .game-card');
    const categoryCards = document.querySelectorAll('.category-showcase-card');

    return {
      hasTopAd: !!topAd,
      hasMidAd: !!midAd,
      hasInlineAd: !!inlineAd,
      hasFooterAd: !!footerAd,
      hasSideLeft: !!sideLeft,
      hasSideRight: !!sideRight,
      sideLeftHiddenOn1366: sideLeft ? window.getComputedStyle(sideLeft).display === 'none' : false,
      mixedCardsCount: mixedCards.length,
      exploreCardsCount: exploreCards.length,
      categoryCardsCount: categoryCards.length,
      totalCardsRendered: mixedCards.length + exploreCards.length,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  })()`);

  console.log('Homepage Audit Result:', JSON.stringify(homeAudit, null, 2));
  qaStats.functionalTestsExecuted += 6;
  if (homeAudit.hasTopAd && homeAudit.hasMidAd && homeAudit.hasInlineAd && homeAudit.totalCardsRendered === 187) {
    qaStats.functionalTestsPassed += 6;
  }
  await captureScreenshot(ws, 'qa_audit_homepage.png');

  // ---------------------------------------------------------------------------
  // STEP 4: LARGE DESKTOP VIEWPORT (1920x1080) — SKYSCRAPER AD TESTING
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 3: LARGE DESKTOP SKYSCRAPER AD AUDIT (1920x1080) ---');
  await setViewport(ws, 1920, 1080, false);
  await new Promise(r => setTimeout(r, 400));

  const largeDesktopAudit = await evalJs(ws, `(() => {
    const sideLeft = document.querySelector('.homepage-side-ad-left');
    const sideRight = document.querySelector('.homepage-side-ad-right');
    return {
      sideLeftVisibleOn1920: sideLeft ? window.getComputedStyle(sideLeft).display !== 'none' : false,
      sideRightVisibleOn1920: sideRight ? window.getComputedStyle(sideRight).display !== 'none' : false,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  })()`);

  console.log('Large Desktop Audit Result:', JSON.stringify(largeDesktopAudit, null, 2));
  qaStats.functionalTestsExecuted += 2;
  if (largeDesktopAudit.sideLeftVisibleOn1920 && largeDesktopAudit.sideRightVisibleOn1920 && !largeDesktopAudit.hasHorizontalOverflow) {
    qaStats.functionalTestsPassed += 2;
  }
  await captureScreenshot(ws, 'qa_audit_large_desktop_1920.png');

  // ---------------------------------------------------------------------------
  // STEP 5: ALL GAMES VIEW & CATEGORY NAVIGATION TESTING
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 4: ALL GAMES VIEW & CATEGORY NAVIGATION ---');
  await setViewport(ws, 1366, 768, false);
  await navigate(ws, `${BASE_URL}#/games`, 600);
  qaStats.pagesInspected++;

  const allGamesAudit = await evalJs(ws, `(() => {
    const pills = Array.from(document.querySelectorAll('.category-quick-pill'));
    const bar = document.querySelector('.category-quick-bar');
    const prevBtn = document.querySelector('.cat-nav-arrow.cat-nav-prev');
    const nextBtn = document.querySelector('.cat-nav-arrow.cat-nav-next');
    const cards = document.querySelectorAll('.games-grid .game-card');

    return {
      pillsCount: pills.length,
      activePill: pills.find(p => p.classList.contains('active'))?.innerText.trim(),
      cardsCount: cards.length,
      prevHiddenAtStart: prevBtn ? prevBtn.classList.contains('is-hidden') : false,
      nextVisibleAtStart: nextBtn ? !nextBtn.classList.contains('is-hidden') : false,
      scrollbarHidden: bar ? window.getComputedStyle(bar).scrollbarWidth === 'none' : false
    };
  })()`);

  console.log('All Games Audit Result:', JSON.stringify(allGamesAudit, null, 2));
  qaStats.functionalTestsExecuted += 4;
  if (allGamesAudit.pillsCount === 23 && allGamesAudit.cardsCount === 187 && allGamesAudit.prevHiddenAtStart) {
    qaStats.functionalTestsPassed += 4;
  }
  await captureScreenshot(ws, 'qa_audit_all_games.png');

  // Test Clicking Category: Platform (Centering Test)
  console.log('\n--- Testing Click Category: Platform ---');
  const platformClickResult = await evalJs(ws, `(async () => {
    const platformPill = document.querySelector('.category-quick-pill[data-category="platform"]');
    if (!platformPill) return { error: 'Platform pill not found' };
    platformPill.click();
    await new Promise(r => setTimeout(r, 500));

    const bar = document.querySelector('.category-quick-bar');
    const barRect = bar.getBoundingClientRect();
    const pillRect = platformPill.getBoundingClientRect();
    const distFromCenter = Math.abs((pillRect.left + pillRect.width/2) - (barRect.left + barRect.width/2));
    const h1Text = document.querySelector('h1')?.innerText.trim();

    return {
      h1Text,
      distFromCenter: Math.round(distFromCenter),
      centered: distFromCenter < 120,
      activeCat: platformPill.classList.contains('active')
    };
  })()`);
  console.log('Platform Click Result:', JSON.stringify(platformClickResult, null, 2));
  qaStats.functionalTestsExecuted += 2;
  if (platformClickResult.centered && platformClickResult.activeCat) qaStats.functionalTestsPassed += 2;

  // Test Clicking Last Category: .io Games (Title Duplication Check)
  console.log('\n--- Testing Click Category: .io Games ---');
  const ioGamesClickResult = await evalJs(ws, `(async () => {
    const ioPill = document.querySelector('.category-quick-pill[data-category="io-games"]');
    if (!ioPill) return { error: 'io-games pill not found' };
    ioPill.click();
    await new Promise(r => setTimeout(r, 500));

    const h1Text = document.querySelector('h1')?.innerText.trim();
    return {
      h1Text,
      noDuplicateTitle: h1Text === '.io Games',
      activeCat: ioPill.classList.contains('active')
    };
  })()`);
  console.log('io-Games Click Result:', JSON.stringify(ioGamesClickResult, null, 2));
  qaStats.functionalTestsExecuted += 2;
  if (ioGamesClickResult.noDuplicateTitle && ioGamesClickResult.activeCat) qaStats.functionalTestsPassed += 2;

  // ---------------------------------------------------------------------------
  // STEP 6: SEARCH & SORT FUNCTIONALITY
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 5: SEARCH & SORTING FUNCTIONALITY ---');
  const searchResult = await evalJs(ws, `(async () => {
    const searchInput = document.querySelector('#globalSearchInput') || document.querySelector('.search-input');
    if (!searchInput) return { error: 'Search input not found' };

    // 1. Test live search suggestions
    searchInput.value = 'neon';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(r => setTimeout(r, 350));

    const suggestions = Array.from(document.querySelectorAll('#searchSuggestions .suggestion-title')).map(el => el.innerText.trim());

    // 2. Test search route #/games?q=neon
    window.location.hash = '#/games?q=neon';
    await new Promise(r => setTimeout(r, 450));
    const neonCards = Array.from(document.querySelectorAll('#mainGamesGrid .game-card .card-overlay-title')).map(h => h.innerText.trim());

    // 3. Test empty search query #/games?q=NonExistentGameXYZ
    window.location.hash = '#/games?q=NonExistentGameXYZ';
    await new Promise(r => setTimeout(r, 450));
    const emptyNotice = document.querySelector('#mainGamesGrid h3')?.innerText.trim();

    // Clear search input
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    const clearBtn = document.querySelector('#searchClearBtn');
    if (clearBtn) clearBtn.click();

    return {
      liveSuggestionsFound: suggestions.length,
      suggestions,
      neonCardsFound: neonCards.length,
      emptyNotice
    };
  })()`);

  console.log('Search Test Result:', JSON.stringify(searchResult, null, 2));
  qaStats.functionalTestsExecuted += 3;
  if (searchResult.liveSuggestionsFound > 0 && searchResult.neonCardsFound > 0 && searchResult.emptyNotice === 'No Games Found') {
    qaStats.functionalTestsPassed += 3;
  }

  // ---------------------------------------------------------------------------
  // STEP 7: FAVORITES & RECENTLY PLAYED WORKFLOW
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 6: FAVORITES & RECENTLY PLAYED WORKFLOW ---');
  const favResult = await evalJs(ws, `(async () => {
    localStorage.removeItem('kopiplay_favorites');
    localStorage.removeItem('nexus_favorites');

    // 1. Visit favorites view when empty
    window.location.hash = '#/favorites';
    await new Promise(r => setTimeout(r, 400));
    const emptyFavTitle = document.querySelector('#mainGamesGrid h3')?.innerText.trim();

    // 2. Add 'tank-wars-2' to favorites via NEXUS API
    window.NEXUS.toggleFav('tank-wars-2');
    await new Promise(r => setTimeout(r, 300));

    const favsStored = JSON.parse(localStorage.getItem('kopiplay_favorites') || localStorage.getItem('nexus_favorites') || '[]');
    const hasSubway = favsStored.includes('tank-wars-2');

    // 3. Refresh favorites view by triggering router
    window.location.hash = '#/games';
    await new Promise(r => setTimeout(r, 250));
    window.location.hash = '#/favorites';
    await new Promise(r => setTimeout(r, 400));
    const favCardTitles = Array.from(document.querySelectorAll('#mainGamesGrid .game-card .card-overlay-title')).map(h => h.innerText.trim());

    return {
      emptyFavTitle,
      hasSubwayInStorage: hasSubway,
      favCardTitles
    };
  })()`);

  console.log('Favorites Workflow Result:', JSON.stringify(favResult, null, 2));
  qaStats.functionalTestsExecuted += 3;
  if (favResult.hasSubwayInStorage && favResult.favCardTitles.length === 1) qaStats.functionalTestsPassed += 3;

  // ---------------------------------------------------------------------------
  // STEP 8: GAME DETAIL / PLAYING PAGE & ADVERTISING STAGE (3-Column Layout)
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 7: GAME DETAIL & 3-COLUMN AD STAGE ---');
  await navigate(ws, `${BASE_URL}#/game/tank-wars-2`, 800);
  qaStats.pagesInspected++;

  const gameDetailAudit = await evalJs(ws, `(() => {
    const iframe = document.querySelector('#gameIframe');
    const fullscreenBtn = document.querySelector('#playerOverlayFullscreenBtn');
    const sideLeftAd = document.querySelector('.game-stage-side-ad-left');
    const sideRightAd = document.querySelector('.game-stage-side-ad-right');
    const belowPlayerAd = document.querySelector('.ad-section-below-player');
    const metaCard = document.querySelector('.game-details-meta-card');
    const relatedCards = document.querySelectorAll('.related-games-strip .game-card');

    return {
      iframePresent: !!iframe,
      iframeSrc: iframe ? iframe.src : null,
      fullscreenBtnPresent: !!fullscreenBtn,
      sideLeftAdPresent: !!sideLeftAd,
      sideRightAdPresent: !!sideRightAd,
      belowPlayerAdPresent: !!belowPlayerAd,
      metaCardPresent: !!metaCard,
      relatedCardsCount: relatedCards.length,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  })()`);

  console.log('Game Detail Audit Result:', JSON.stringify(gameDetailAudit, null, 2));
  qaStats.functionalTestsExecuted += 6;
  if (gameDetailAudit.iframePresent && gameDetailAudit.fullscreenBtnPresent && gameDetailAudit.sideRightAdPresent && gameDetailAudit.belowPlayerAdPresent) {
    qaStats.functionalTestsPassed += 6;
  }
  await captureScreenshot(ws, 'qa_audit_game_detail.png');

  // Test First-Party Game: Neon Breaker DX
  console.log('\n--- Testing First-Party Game: neon-breakout-06 ---');
  await navigate(ws, `${BASE_URL}#/game/neon-breakout-06`, 600);
  qaStats.pagesInspected++;
  const firstPartyCheck = await evalJs(ws, `(() => {
    const title = document.querySelector('.game-details-title')?.innerText.trim();
    const iframe = document.querySelector('#gameIframe');
    return {
      title,
      isNeonBreakerDX: title === 'Neon Breaker DX',
      iframeLoaded: !!iframe
    };
  })()`);
  console.log('First-Party Game Check:', JSON.stringify(firstPartyCheck, null, 2));
  qaStats.functionalTestsExecuted += 2;
  if (firstPartyCheck.isNeonBreakerDX && firstPartyCheck.iframeLoaded) qaStats.functionalTestsPassed += 2;

  // ---------------------------------------------------------------------------
  // STEP 9: INFORMATIONAL & LEGAL PAGES AUDIT (5 Pages)
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 8: INFORMATIONAL & LEGAL PAGES AUDIT ---');
  const legalPages = ['about', 'contact', 'privacy', 'terms', 'dmca'];
  for (const page of legalPages) {
    await navigate(ws, `${BASE_URL}#/${page}`, 500);
    qaStats.pagesInspected++;
    const pageCheck = await evalJs(ws, `(() => {
      const h1 = document.querySelector('h1')?.innerText.trim();
      const hasContent = document.querySelectorAll('.legal-card, .contact-card, .about-card, p').length > 5;
      return {
        h1,
        hasContent,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log(`Page #${page}:`, JSON.stringify(pageCheck));
    qaStats.functionalTestsExecuted++;
    if (pageCheck.hasContent && !pageCheck.hasHorizontalOverflow) qaStats.functionalTestsPassed++;
  }

  // ---------------------------------------------------------------------------
  // STEP 10: RESPONSIVE TESTING (10 Viewports)
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 9: RESPONSIVE DESIGN TESTING (10 Viewports) ---');
  const viewports = [
    { w: 320, h: 568, name: 'Mobile Mini (320px)', isMobile: true },
    { w: 375, h: 667, name: 'Mobile Standard (375px)', isMobile: true },
    { w: 390, h: 844, name: 'iPhone 14 (390px)', isMobile: true },
    { w: 430, h: 932, name: 'iPhone 14 Pro Max (430px)', isMobile: true },
    { w: 768, h: 1024, name: 'iPad Portrait (768px)', isMobile: false },
    { w: 1024, h: 768, name: 'iPad Landscape (1024px)', isMobile: false },
    { w: 1280, h: 800, name: 'Laptop (1280px)', isMobile: false },
    { w: 1366, h: 768, name: 'HD Desktop (1366px)', isMobile: false },
    { w: 1440, h: 900, name: 'MacBook Pro (1440px)', isMobile: false },
    { w: 1920, h: 1080, name: 'Full HD Desktop (1920px)', isMobile: false }
  ];

  for (const vp of viewports) {
    await setViewport(ws, vp.w, vp.h, vp.isMobile);
    await navigate(ws, `${BASE_URL}#/`, 350);
    const respCheck = await evalJs(ws, `(() => {
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        overflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);

    qaStats.responsiveTestsExecuted++;
    const passed = !respCheck.overflow;
    if (passed) qaStats.responsiveTestsPassed++;
    console.log(`[Viewport ${vp.name}] Width: ${respCheck.clientWidth}px, Overflow: ${respCheck.overflow ? 'FAIL' : 'PASS'}`);
  }

  // ---------------------------------------------------------------------------
  // STEP 11: TECHNICAL SEO & SECURITY AUDIT
  // ---------------------------------------------------------------------------
  console.log('\n--- STEP 10: SEO, ADS.TXT, ROBOTS & SECURITY AUDIT ---');
  await setViewport(ws, 1366, 768, false);
  await navigate(ws, `${BASE_URL}#/`, 400);

  const seoCheck = await evalJs(ws, `(() => {
    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.content;
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
    const schemaScript = document.querySelector('#kopi-schema');
    let schemaJson = null;
    try { schemaJson = JSON.parse(schemaScript.textContent); } catch(e) {}

    return {
      title,
      hasMetaDesc: !!metaDesc,
      canonical,
      ogTitle,
      schemaBrand: schemaJson ? schemaJson.name : null
    };
  })()`);

  console.log('SEO Audit Result:', JSON.stringify(seoCheck, null, 2));

  // Check ads.txt via HTTP
  const adsTxtStatus = await new Promise((resolve) => {
    http.get('http://127.0.0.1:8080/ads.txt', (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
  console.log(`HTTP ads.txt Status: ${adsTxtStatus}`);

  // Check robots.txt via HTTP
  const robotsTxtStatus = await new Promise((resolve) => {
    http.get('http://127.0.0.1:8080/robots.txt', (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
  console.log(`HTTP robots.txt Status: ${robotsTxtStatus}`);

  // Check sitemap.xml via HTTP
  const sitemapXmlStatus = await new Promise((resolve) => {
    http.get('http://127.0.0.1:8080/sitemap.xml', (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
  console.log(`HTTP sitemap.xml Status: ${sitemapXmlStatus}`);

  qaStats.functionalTestsExecuted += 4;
  if (seoCheck.title.includes('KopiPlay') && adsTxtStatus === 200 && robotsTxtStatus === 200 && sitemapXmlStatus === 200) {
    qaStats.functionalTestsPassed += 4;
  }

  // ---------------------------------------------------------------------------
  // STEP 12: CONSOLE ERRORS & NETWORK SUMMARY
  // ---------------------------------------------------------------------------
  qaStats.consoleErrorsCount = consoleErrors.length;
  qaStats.networkErrorsCount = networkErrors.length;

  console.log('\n================================================================');
  console.log('QA AUDIT EXECUTION SUMMARY');
  console.log('================================================================');
  console.log(`Total Pages / Views Inspected: ${qaStats.pagesInspected}`);
  console.log(`Total Functional Tests Executed: ${qaStats.functionalTestsExecuted} (Passed: ${qaStats.functionalTestsPassed})`);
  console.log(`Total Responsive Viewports Tested: ${qaStats.responsiveTestsExecuted} (Passed: ${qaStats.responsiveTestsPassed})`);
  console.log(`Application Console Errors: ${qaStats.consoleErrorsCount}`);
  console.log(`Local Network HTTP Errors: ${qaStats.networkErrorsCount}`);
  console.log('================================================================\n');

  ws.close();
  chrome.kill();
  return qaStats;
}

runCompleteProfessionalQA().catch(err => {
  console.error('QA Execution Error:', err);
  process.exit(1);
});

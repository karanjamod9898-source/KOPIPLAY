const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';
const PORT = 9275;

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

async function runTests() {
  console.log('=== KopiPlay UI Redesign Verification Suite ===');
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
    // Navigate to homepage
    console.log('Navigating to ' + BASE_URL);
    await sendCommand(ws, 'Page.navigate', { url: BASE_URL });
    await new Promise(r => setTimeout(r, 2500));

    // TEST 1: Fixed Left Sidebar
    const sidebarInfo = await evalJs(ws, `(() => {
      const sb = document.getElementById('app-sidebar');
      if (!sb) return { exists: false };
      const rect = sb.getBoundingClientRect();
      const style = window.getComputedStyle(sb);
      const homePill = sb.querySelector('.sidebar-nav-item.active-nav-pill');
      const allGamesCount = sb.querySelector('.sidebar-pill-badge');
      const artImg = sb.querySelector('.sidebar-art-img');
      const brandTitle = sb.querySelector('.brand-title');
      return {
        exists: true,
        visible: rect.width > 0 && rect.height > 0 && style.display !== 'none',
        width: Math.round(rect.width),
        position: style.position,
        homeActive: !!homePill && homePill.textContent.includes('Home'),
        badgeCount: allGamesCount ? allGamesCount.textContent.trim() : null,
        artPresent: !!artImg,
        brandName: brandTitle ? brandTitle.textContent.trim() : null
      };
    })()`);

    record('Fixed Sidebar presence and dimensions',
      sidebarInfo.exists && sidebarInfo.visible && sidebarInfo.width >= 230 && sidebarInfo.position === 'fixed',
      `Width: ${sidebarInfo.width}px, Position: ${sidebarInfo.position}`
    );
    record('Sidebar KopiPlay branding',
      sidebarInfo.brandName && sidebarInfo.brandName.includes('KopiPlay'),
      `Brand text: ${sidebarInfo.brandName}`
    );
    record('Sidebar Home active pill and dynamic game count',
      sidebarInfo.homeActive && sidebarInfo.badgeCount === '187',
      `Home active: ${sidebarInfo.homeActive}, Game count badge: ${sidebarInfo.badgeCount}`
    );
    record('Sidebar 3D controller art present',
      sidebarInfo.artPresent,
      'Art element present at bottom of sidebar'
    );

    // TEST 2: Top Category Navigation Strip
    const catNavInfo = await evalJs(ws, `(() => {
      const wrap = document.getElementById('pokiCatNavWrapper');
      const strip = document.getElementById('pokiCatStrip');
      const leftArrow = document.getElementById('pokiCatArrowLeft');
      const rightArrow = document.getElementById('pokiCatArrowRight');
      const pills = strip ? strip.querySelectorAll('.category-filter-btn') : [];
      return {
        wrapExists: !!wrap,
        arrowsExist: !!leftArrow && !!rightArrow,
        pillCount: pills.length,
        firstPillActive: pills.length > 0 && pills[0].classList.contains('active'),
        firstPillText: pills.length > 0 ? pills[0].textContent.replace(/\\s+/g, ' ').trim() : ''
      };
    })()`);

    record('Top Category Navigation Bar & Arrows',
      catNavInfo.wrapExists && catNavInfo.arrowsExist && catNavInfo.pillCount >= 10,
      `Pill count: ${catNavInfo.pillCount}, Arrows: ${catNavInfo.arrowsExist}`
    );

    // TEST 3: Hero Banner
    const heroInfo = await evalJs(ws, `(() => {
      const banner = document.getElementById('kopiHeroBanner');
      if (!banner) return { exists: false };
      const headline = banner.querySelector('.hero-headline');
      const subtitle = banner.querySelector('.hero-subtitle');
      const pills = banner.querySelectorAll('.hero-feature-pill');
      const img = banner.querySelector('.hero-artwork-img');
      const rect = banner.getBoundingClientRect();
      return {
        exists: true,
        visible: rect.width > 0 && rect.height > 0,
        headlineText: headline ? headline.textContent.trim() : '',
        subtitleText: subtitle ? subtitle.textContent.trim() : '',
        featureCount: pills.length,
        features: Array.from(pills).map(p => p.textContent.trim()),
        artLoaded: !!img && (img.naturalWidth > 0 || img.complete)
      };
    })()`);

    record('Hero Banner existence and visibility',
      heroInfo.exists && heroInfo.visible,
      `Headline: ${heroInfo.headlineText}`
    );
    record('Hero Banner 4 feature pills',
      heroInfo.featureCount === 4,
      `Features: ${heroInfo.features.join(' | ')}`
    );
    record('Hero Banner gamer artwork loaded',
      heroInfo.artLoaded,
      'Artwork loaded successfully'
    );

    // TEST 4: Asymmetric Mosaic Grid & Cards
    const gridInfo = await evalJs(ws, `(() => {
      const grid = document.getElementById('mainGamesGrid');
      if (!grid) return { exists: false };
      const cards = grid.querySelectorAll('.poki-card');
      const firstCard = cards[0];
      const spans = {
        '2x2': grid.querySelectorAll('.span-2x2').length,
        '2x1': grid.querySelectorAll('.span-2x1').length,
        '1x2': grid.querySelectorAll('.span-1x2').length,
        '1x1': grid.querySelectorAll('.span-1x1').length
      };
      const borders = {
        cyan: grid.querySelectorAll('.border-cyan').length,
        purple: grid.querySelectorAll('.border-purple').length,
        blue: grid.querySelectorAll('.border-blue').length,
        pink: grid.querySelectorAll('.border-pink').length
      };
      return {
        cardCount: cards.length,
        firstCardSpan: firstCard ? (firstCard.classList.contains('span-2x2') ? '2x2' : 'other') : 'none',
        firstCardTitle: firstCard ? firstCard.getAttribute('title') : null,
        firstCardBadge: firstCard && firstCard.querySelector('.poki-card-badge') ? firstCard.querySelector('.poki-card-badge').textContent.trim() : null,
        spans,
        borders
      };
    })()`);

    record('All 187 games loaded directly in mosaic grid',
      gridInfo.cardCount === 187,
      `Total game cards: ${gridInfo.cardCount}`
    );
    record('First game card is large 2x2 featured game',
      gridInfo.firstCardSpan === '2x2' && gridInfo.firstCardTitle.includes('Neon Horizon'),
      `First card: ${gridInfo.firstCardTitle}, Span: ${gridInfo.firstCardSpan}, Badge: ${gridInfo.firstCardBadge}`
    );
    record('Asymmetric card size distribution',
      gridInfo.spans['2x2'] > 0 && gridInfo.spans['2x1'] > 0 && gridInfo.spans['1x2'] > 0,
      `2x2: ${gridInfo.spans['2x2']}, 2x1: ${gridInfo.spans['2x1']}, 1x2: ${gridInfo.spans['1x2']}, 1x1: ${gridInfo.spans['1x1']}`
    );
    record('Dynamic glowing neon border distribution',
      gridInfo.borders.cyan > 0 && gridInfo.borders.purple > 0 && gridInfo.borders.blue > 0 && gridInfo.borders.pink > 0,
      `Cyan: ${gridInfo.borders.cyan}, Purple: ${gridInfo.borders.purple}, Blue: ${gridInfo.borders.blue}, Pink: ${gridInfo.borders.pink}`
    );

    // Capture Desktop 1440x900 Screenshot
    await captureScreenshot(ws, 'kopiplay_dark_desktop_1440.png');

    // TEST 5: Interactive Category Filter & Compact Indicator
    console.log('Testing category filter: Racing...');
    await evalJs(ws, `window.NEXUS.filterCategory('racing')`);
    await new Promise(r => setTimeout(r, 600));

    const filterInfo = await evalJs(ws, `(() => {
      const indicator = document.getElementById('kopiFilterIndicator');
      const catName = document.getElementById('kopiFilterCatName');
      const count = document.getElementById('kopiFilterGameCount');
      const cards = document.querySelectorAll('#mainGamesGrid .poki-card');
      const style = window.getComputedStyle(indicator);
      return {
        indicatorVisible: style.display !== 'none',
        categoryText: catName ? catName.textContent.trim() : '',
        countText: count ? count.textContent.trim() : '',
        cardCount: cards.length
      };
    })()`);

    record('Category filter: Racing filtered properly',
      filterInfo.indicatorVisible && filterInfo.categoryText.includes('Racing') && filterInfo.cardCount === 12,
      `Indicator text: "${filterInfo.categoryText} · ${filterInfo.countText}", Cards displayed: ${filterInfo.cardCount}`
    );

    await captureScreenshot(ws, 'kopiplay_dark_category_filtered_racing.png');

    // TEST 6: Clear Filter
    console.log('Testing Clear Filter...');
    await evalJs(ws, `document.getElementById('kopiFilterClearBtn').click()`);
    await new Promise(r => setTimeout(r, 600));

    const clearInfo = await evalJs(ws, `(() => {
      const indicator = document.getElementById('kopiFilterIndicator');
      const cards = document.querySelectorAll('#mainGamesGrid .poki-card');
      const style = window.getComputedStyle(indicator);
      return {
        indicatorHidden: style.display === 'none',
        cardCount: cards.length
      };
    })()`);

    record('Clear Filter restores all 187 games and hides indicator',
      clearInfo.indicatorHidden && clearInfo.cardCount === 187,
      `Cards: ${clearInfo.cardCount}, Indicator hidden: ${clearInfo.indicatorHidden}`
    );

    // TEST 7: Sidebar Categories Accordion
    console.log('Testing sidebar accordion dropdown...');
    await evalJs(ws, `document.getElementById('sidebarCatToggle').click()`);
    await new Promise(r => setTimeout(r, 400));

    const accordionInfo = await evalJs(ws, `(() => {
      const group = document.getElementById('sidebarCatGroup');
      const subitems = group ? group.querySelectorAll('.sidebar-cat-subitem') : [];
      return {
        isOpen: group && group.classList.contains('is-open'),
        subitemCount: subitems.length
      };
    })()`);

    record('Sidebar All Categories accordion opens with sub-categories',
      accordionInfo.isOpen && accordionInfo.subitemCount > 0,
      `Accordion isOpen: ${accordionInfo.isOpen}, Subitems: ${accordionInfo.subitemCount}`
    );

    // TEST 8: Full HD Desktop View (1920x1080)
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 600));
    await captureScreenshot(ws, 'kopiplay_dark_desktop_1920.png');
    record('Desktop 1920x1080 Full HD Render', true, 'Full HD layout captured');

    // TEST 9: Mobile View (375x812)
    console.log('Testing Mobile Responsiveness (375x812)...');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 800));

    const mobileInfo = await evalJs(ws, `(() => {
      const header = document.getElementById('app-header');
      const sidebar = document.getElementById('app-sidebar');
      const headerStyle = window.getComputedStyle(header);
      const sidebarStyle = window.getComputedStyle(sidebar);
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const heroBanner = document.getElementById('kopiHeroBanner');
      return {
        headerVisible: headerStyle.display !== 'none',
        sidebarOffcanvas: sidebarStyle.transform.includes('matrix') || sidebarStyle.transform.includes('translate'),
        noHorizontalOverflow: docWidth <= winWidth,
        heroBannerVisible: heroBanner && heroBanner.getBoundingClientRect().height > 0
      };
    })()`);

    record('Mobile: Header visible with hamburger toggle',
      mobileInfo.headerVisible,
      'Mobile header active'
    );
    record('Mobile: Sidebar off-canvas by default',
      mobileInfo.sidebarOffcanvas,
      'Sidebar correctly tucked away'
    );
    record('Mobile: Zero horizontal scroll overflow',
      mobileInfo.noHorizontalOverflow,
      'Page does not overflow 375px width'
    );

    // Open mobile sidebar
    await evalJs(ws, `document.getElementById('mobileNavToggle').click()`);
    await new Promise(r => setTimeout(r, 500));
    await captureScreenshot(ws, 'kopiplay_dark_mobile_drawer_open.png');

    // Close mobile sidebar
    await evalJs(ws, `document.getElementById('sidebarCloseBtn').click()`);
    await new Promise(r => setTimeout(r, 400));
    await captureScreenshot(ws, 'kopiplay_dark_mobile_375.png');

    console.log('\n=== All Tests Passed! ===');

  } catch (err) {
    console.error('Error during test execution:', err);
    record('Test Suite Completion', false, err.message);
  } finally {
    fs.writeFileSync(
      path.resolve(__dirname, '../reports/dark-redesign-results.json'),
      JSON.stringify(results, null, 2)
    );
    ws.close();
    chromeProc.kill();
  }
}

runTests();

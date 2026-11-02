const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

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

async function runBrowserQA() {
  const port = 9230;
  console.log('Launching headless Chrome on port', port);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--window-size=1366,768',
    'http://127.0.0.1:8080/'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise(r => ws.addEventListener('open', r));
  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');

  const consoleErrors = [];
  const networkErrors = [];

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      if (msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
      }
    }
    if (msg.method === 'Network.responseReceived') {
      if (msg.params.response.status >= 400) {
        networkErrors.push({ url: msg.params.response.url, status: msg.params.response.status });
      }
    }
  });

  await sendCommand(ws, 'Network.enable');

  const report = {};

  // --- TEST 1: DESKTOP HOMEPAGE ---
  console.log('Testing Desktop Homepage (1366x768)...');
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false });
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/' });
  await new Promise(r => setTimeout(r, 1200));

  const homeData = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      brandInLogo: document.querySelector('.brand-logo') ? document.querySelector('.brand-logo').innerText : '',
      logoImgSrc: document.querySelector('.logo-img') ? document.querySelector('.logo-img').src : '',
      totalCards: document.querySelectorAll('.game-card').length,
      featuredHeroTitle: document.querySelector('.hero-title') ? document.querySelector('.hero-title').innerText : '',
      categoriesInNav: document.querySelectorAll('.sidebar-nav-item, .cat-pill').length,
      footerBrand: document.querySelector('.footer-brand, .footer-col') ? document.querySelector('.footer-brand, .footer-col').innerText : '',
      catalogLength: window.KOPI_CATALOG ? window.KOPI_CATALOG.length : 0
    })`,
    returnByValue: true
  });
  report.homepage = homeData.result.value;
  console.log('Homepage test result:', report.homepage);

  // --- TEST 2: ALL 22 CATEGORIES NAVIGATION ---
  console.log('Testing 22 Categories Navigation...');
  const categorySlugs = [
    'shooting', 'action', 'adventure', 'racing', 'car', 'driving', 'sports',
    'football', 'puzzle', 'strategy', 'platform', 'multiplayer', 'arcade',
    'simulation', 'casual', 'kids-games', 'beauty', 'pool', 'board-games',
    'card-games', 'clicker', 'io-games'
  ];
  const catResults = [];
  for (const slug of categorySlugs) {
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/category/${slug}';` });
    await new Promise(r => setTimeout(r, 200));
    const catCheck = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        slug: '${slug}',
        title: document.title,
        cards: document.querySelectorAll('#mainGamesGrid .game-card').length,
        hasKopiPlay: document.title.includes('KopiPlay')
      })`,
      returnByValue: true
    });
    catResults.push(catCheck.result.value);
  }
  report.categories = {
    totalChecked: catResults.length,
    allHaveCards: catResults.every(c => c.cards > 0),
    allHaveKopiPlay: catResults.every(c => c.hasKopiPlay),
    sample: catResults.slice(0, 3)
  };
  console.log('Categories test:', report.categories);

  // --- TEST 3: SEARCH FUNCTIONALITY ---
  console.log('Testing Search functionality...');
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/games?q=racer';" });
  await new Promise(r => setTimeout(r, 400));
  const searchResult = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      queryCards: document.querySelectorAll('#mainGamesGrid .game-card').length,
      firstCardTitle: document.querySelector('#mainGamesGrid .game-card-title') ? document.querySelector('#mainGamesGrid .game-card-title').innerText : ''
    })`,
    returnByValue: true
  });
  report.search = searchResult.result.value;
  console.log('Search test result:', report.search);

  // --- TEST 4: FAVORITES & RECENTLY PLAYED STORAGE ---
  console.log('Testing Favorites & Recently Played...');
  const favResult = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(function() {
      // Add neon-racer-02 to favorites
      const favKey = 'kopiplay_favorites';
      localStorage.setItem(favKey, JSON.stringify(['neon-racer-02', 'pulse-2048-04']));
      // Add recently played
      const recKey = 'kopiplay_recent';
      localStorage.setItem(recKey, JSON.stringify(['space-def-03']));
      return {
        favStorage: JSON.parse(localStorage.getItem(favKey)),
        recStorage: JSON.parse(localStorage.getItem(recKey))
      };
    })()`,
    returnByValue: true
  });

  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/favorites';" });
  await new Promise(r => setTimeout(r, 400));
  const favPageCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      favCards: document.querySelectorAll('#mainGamesGrid .game-card').length
    })`,
    returnByValue: true
  });
  report.favorites = { ...favResult.result.value, ...favPageCheck.result.value };
  console.log('Favorites test result:', report.favorites);

  // --- TEST 5: GAME DETAIL PAGE, IFRAME LOADING & BACK NAVIGATION ---
  console.log('Testing Game Detail page, iframe & back navigation...');
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/game/neon-racer-02';" });
  await new Promise(r => setTimeout(r, 1200));

  const gameDetailCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      hasFrame: !!document.querySelector('.game-frame, iframe'),
      iframeSrc: document.querySelector('.game-frame, iframe') ? document.querySelector('.game-frame, iframe').src : '',
      gameTitle: document.querySelector('.game-player-title, .game-title') ? document.querySelector('.game-player-title, .game-title').innerText : '',
      hasBreadcrumbs: !!document.querySelector('.breadcrumb, .breadcrumbs'),
      hasFullscreenBtn: !!document.querySelector('[data-action="fullscreen"], .btn-fullscreen, .fullscreen-btn')
    })`,
    returnByValue: true
  });
  report.gameDetail = gameDetailCheck.result.value;
  console.log('Game Detail test result:', report.gameDetail);

  // Test back navigation
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.history.back();" });
  await new Promise(r => setTimeout(r, 500));
  const backNavCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({ hash: window.location.hash, title: document.title })`,
    returnByValue: true
  });
  report.backNav = backNavCheck.result.value;
  console.log('Back Nav test result:', report.backNav);

  // --- TEST 6: 404 PAGE & INVALID GAME ROUTE ---
  console.log('Testing 404 page & invalid game URLs...');
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/game/invalid-non-existent-game-xyz';" });
  await new Promise(r => setTimeout(r, 500));
  const notFoundCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      notFoundHeading: document.querySelector('#app-main h2') ? document.querySelector('#app-main h2').innerText : '',
      hasBackToHome: document.body.innerText.includes('Browse Catalog') || document.body.innerText.includes('Return to Home') || document.body.innerText.includes('Game Not Found')
    })`,
    returnByValue: true
  });
  report.notFound = notFoundCheck.result.value;
  console.log('Not Found test result:', report.notFound);

  // --- TEST 7: RESPONSIVENESS (MOBILE 375x667 & TABLET 768x1024) ---
  console.log('Testing Mobile (375x667)...');
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', { width: 375, height: 667, deviceScaleFactor: 2, mobile: true });
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:8080/#/' });
  await new Promise(r => setTimeout(r, 800));

  const mobileCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      viewportWidth: window.innerWidth,
      headerVisible: !!document.querySelector('.app-header, header'),
      cardsRendered: document.querySelectorAll('.game-card').length,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    })`,
    returnByValue: true
  });
  report.mobile = mobileCheck.result.value;
  console.log('Mobile test result:', report.mobile);

  console.log('Testing Tablet (768x1024)...');
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 2, mobile: true });
  await new Promise(r => setTimeout(r, 800));

  const tabletCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      viewportWidth: window.innerWidth,
      cardsRendered: document.querySelectorAll('.game-card').length,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    })`,
    returnByValue: true
  });
  report.tablet = tabletCheck.result.value;
  console.log('Tablet test result:', report.tablet);

  // --- TEST 8: CONSOLE & NETWORK ERROR SUMMARY ---
  report.consoleErrors = consoleErrors;
  report.networkErrors = networkErrors;
  console.log('Console Errors:', consoleErrors.length);
  console.log('Network 4xx/5xx Errors:', networkErrors.length);

  fs.writeFileSync('scripts/qa-browser-report.json', JSON.stringify(report, null, 2));
  console.log('Saved to scripts/qa-browser-report.json');

  chrome.kill();
  process.exit(0);
}

runBrowserQA().catch(err => {
  console.error(err);
  process.exit(1);
});


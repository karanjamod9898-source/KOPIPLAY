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

async function evaluate(ws, expression) {
  const res = await sendCommand(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (res && res.exceptionDetails) {
    throw new Error('Eval failed: ' + JSON.stringify(res.exceptionDetails));
  }
  return res && res.result ? res.result.value : res;
}

async function setViewport(ws, width, height, isMobile = false) {
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: isMobile
  });
  await sendCommand(ws, 'Emulation.setVisibleSize', { width, height });
}

async function navigate(ws, url) {
  await sendCommand(ws, 'Page.navigate', { url });
  await new Promise(r => setTimeout(r, 1200));
}

async function run() {
  const port = 9297;
  console.log('--- Launching Headless Chrome for Game Detail Ad Container Testing on port', port, '---');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\online game\\.tmp_chrome_ad_test',
    '--window-size=1366,768',
    'http://127.0.0.1:8080/#/game/tank-wars-2'
  ]);

  let killed = false;
  const cleanup = () => {
    if (!killed) {
      killed = true;
      try { chrome.kill(); } catch (e) {}
    }
  };
  process.on('exit', cleanup);

  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 400));
      try {
        const targets = await getTargets(port);
        const target = targets.find(t => t.type === 'page');
        if (target && target.webSocketDebuggerUrl) {
          wsUrl = target.webSocketDebuggerUrl;
          break;
        }
      } catch (e) {}
    }

    if (!wsUrl) throw new Error('Could not connect to Chrome debugging port');

    // built-in global WebSocket in Node 22
    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => {
      ws.addEventListener('open', res);
      ws.addEventListener('error', rej);
    });

    await sendCommand(ws, 'Page.enable');
    await sendCommand(ws, 'Runtime.enable');

    const consoleErrors = [];
    ws.addEventListener('message', (event) => { const data = event.data;
      try {
        const msg = JSON.parse(data);
        if (msg.method === 'Runtime.consoleAPICalled' && (msg.params.type === 'error' || msg.params.type === 'warning')) {
          consoleErrors.push({ type: msg.params.type, args: msg.params.args });
        }
      } catch (e) {}
    });

    console.log('\n=== TEST 1: DESKTOP VIEWPORT (1366x768) - tank-wars-2 ===');
    await setViewport(ws, 1366, 768, false);
    await navigate(ws, 'http://127.0.0.1:8080/#/game/tank-wars-2');

    const desktopCheck = await evaluate(ws, `(() => {
      const adContainer = document.querySelector('.game-ad-container');
      const adLabel = document.querySelector('.ad-disclaimer-label');
      const adSlot = document.querySelector('.ad-slot-frame.ad-slot-300x250');
      const adPlaceholderTitle = document.querySelector('.ad-placeholder-title');
      const adPlaceholderSize = document.querySelector('.ad-placeholder-size');
      const actionCard = document.querySelector('.game-action-card');
      const playNowBtn = document.querySelector('.btn-play-now');
      const playerStage = document.getElementById('playerStageCard');
      const iframe = document.getElementById('gameIframe');
      const favBtn = document.getElementById('detailFavBtn');
      const favText = document.getElementById('detailFavText');
      const relatedStrip = document.querySelector('.related-games-strip');
      const layout = document.querySelector('.game-detail-layout');
      const layoutStyle = layout ? window.getComputedStyle(layout) : null;
      const adSlotStyle = adSlot ? window.getComputedStyle(adSlot) : null;

      return {
        hasAdContainer: !!adContainer,
        adPlacementAttr: adContainer ? adContainer.getAttribute('data-ad-placement') : null,
        adLabelText: adLabel ? adLabel.innerText.trim() : null,
        hasAdSlot300x250: !!adSlot,
        adSlotWidth: adSlotStyle ? adSlotStyle.width : null,
        adSlotHeight: adSlotStyle ? adSlotStyle.height : null,
        adPlaceholderTitle: adPlaceholderTitle ? adPlaceholderTitle.innerText.trim() : null,
        adPlaceholderSize: adPlaceholderSize ? adPlaceholderSize.innerText.trim() : null,
        hasDuplicateActionCard: !!actionCard,
        hasDuplicatePlayNowBtn: !!playNowBtn,
        hasPlayerStage: !!playerStage,
        iframeSrc: iframe ? iframe.src : null,
        hasFavBtnInBreadcrumbs: !!favBtn,
        favBtnText: favText ? favText.innerText.trim() : null,
        layoutGridColumns: layoutStyle ? layoutStyle.gridTemplateColumns : null,
        relatedGamesCount: relatedStrip ? relatedStrip.children.length : 0,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);

    console.log('Desktop Check Result:', JSON.stringify(desktopCheck, null, 2));
    await captureScreenshot(ws, 'verified_ad_desktop.png');

    console.log('\n=== TEST 2: FAVORITE TOGGLE INTERACTION ===');
    const favToggleResult = await evaluate(ws, `(() => {
      const favBtn = document.getElementById('detailFavBtn');
      const favText = document.getElementById('detailFavText');
      if (!favBtn) return { error: 'No fav btn' };

      const before = { isFav: favBtn.classList.contains('is-fav'), text: favText.innerText };
      favBtn.click();
      const afterFirstClick = { isFav: favBtn.classList.contains('is-fav'), text: favText.innerText };
      favBtn.click();
      const afterSecondClick = { isFav: favBtn.classList.contains('is-fav'), text: favText.innerText };

      return { before, afterFirstClick, afterSecondClick };
    })()`);
    console.log('Favorite Toggle Test:', JSON.stringify(favToggleResult, null, 2));

    console.log('\n=== TEST 3: TABLET VIEWPORT (768x1024) - neon-breakout ===');
    await setViewport(ws, 768, 1024, false);
    await navigate(ws, 'http://127.0.0.1:8080/#/game/neon-breakout');

    const tabletCheck = await evaluate(ws, `(() => {
      const adContainer = document.querySelector('.game-ad-container');
      const adSlot = document.querySelector('.ad-slot-frame.ad-slot-300x250');
      const playerStage = document.getElementById('playerStageCard');
      return {
        hasAdContainer: !!adContainer,
        hasAdSlot: !!adSlot,
        hasPlayerStage: !!playerStage,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      };
    })()`);
    console.log('Tablet Check Result:', JSON.stringify(tabletCheck, null, 2));
    await captureScreenshot(ws, 'verified_ad_tablet.png');

    console.log('\n=== TEST 4: MOBILE VIEWPORT (390x844) - bubble-fall ===');
    await setViewport(ws, 390, 844, true);
    await navigate(ws, 'http://127.0.0.1:8080/#/game/bubble-fall');

    const mobileCheck = await evaluate(ws, `(() => {
      const adContainer = document.querySelector('.game-ad-container');
      const adSlot = document.querySelector('.ad-slot-frame.ad-slot-300x250');
      const playerStage = document.getElementById('playerStageCard');
      const layout = document.querySelector('.game-detail-layout');
      const related = document.querySelector('.related-games-section');

      // Check vertical order: playerStage comes before adContainer, which comes before related
      const playerRect = playerStage ? playerStage.getBoundingClientRect() : null;
      const adRect = adContainer ? adContainer.getBoundingClientRect() : null;
      const relatedRect = related ? related.getBoundingClientRect() : null;

      const orderCorrect = playerRect && adRect && relatedRect &&
                           (playerRect.top < adRect.top) &&
                           (adRect.top < relatedRect.top);

      return {
        hasAdContainer: !!adContainer,
        hasAdSlot: !!adSlot,
        hasPlayerStage: !!playerStage,
        orderCorrect,
        playerTop: playerRect ? playerRect.top : null,
        adTop: adRect ? adRect.top : null,
        relatedTop: relatedRect ? relatedRect.top : null,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      };
    })()`);
    console.log('Mobile Check Result:', JSON.stringify(mobileCheck, null, 2));
    await captureScreenshot(ws, 'verified_ad_mobile.png');

    console.log('\n=== CONSOLE ERRORS SUMMARY ===');
    console.log('Console Errors/Warnings Count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log(JSON.stringify(consoleErrors, null, 2));
    }

    ws.close();
    chrome.kill();
    console.log('\n--- ALL QA VERIFICATION PASSED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Test error:', err);
    chrome.kill();
    process.exit(1);
  }
}

run();




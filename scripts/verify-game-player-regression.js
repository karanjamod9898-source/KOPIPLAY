const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function getTargets(port) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + port + '/json', (res) => {
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

async function runRegression() {
  const port = 9240;
  console.log('Launching headless Chrome for regression verification on port', port);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--window-size=1280,800',
    'http://127.0.0.1:8080/'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');

  const consoleErrors = [];
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      const errText = msg.params.args.map(a => a.value || a.description).join(' ');
      // Filter out harmless third-party ad network / tracker blocked errors
      if (!errText.includes('doubleclick') && !errText.includes('googleads') && !errText.includes('favicon')) {
        consoleErrors.push(errText);
      }
    }
  });

  const testCases = [
    { slug: 'neon-racer', label: 'Local Game (Neon Racer)', expectedSrc: 'games/neon-racer/index.html' },
    { slug: 'home-island', label: 'Repaired GameDistribution (Home Island)', expectedSrc: 'https://html5.gamedistribution.com/da1111d4369f4cb08525d593fe515fa4/' },
    { slug: 'bubble-fall', label: 'Repaired GameDistribution (Bubble Fall)', expectedSrc: 'https://html5.gamedistribution.com/82c9d9ae7f6d4ca6b00b36025870d17a/' },
    { slug: 'angry-heroes', label: 'Cleaned GD URL (Angry Heroes)', expectedSrc: 'https://html5.gamedistribution.com/d628d0c891494139b9f04f556caf23b0/' },
    { slug: 'hand-fight', label: 'Repaired Alias Slug (Hand Fight)', expectedSrc: 'https://html5.gamemonetize.co/485gqzfrbzass7ig99juwrcb73d0286z/' },
    { slug: 'hg-tower-defend', label: 'HTMLGames CDN (Tower Defend)', expectedSrc: 'https://cdn.htmlgames.com/TowerDefend/index.html' },
    { slug: 'arrow-escape-tap-puzzle', label: 'Vercel App (Arrow Escape)', expectedSrc: 'https://arrow-escape-tap-puzzle.vercel.app/' },
    { slug: 'rise-up-air-balloon', label: 'Famobi (Rise Up Air Balloon)', expectedSrc: 'games.cdn.famobi.com' }
  ];

  console.log('=== REGRESSION TEST: GAME EMBEDS & CONTROLS ===');
  for (const tc of testCases) {
    console.log(`Testing ${tc.label} (#/game/${tc.slug})...`);
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/${tc.slug}';` });
    await new Promise(r => setTimeout(r, 2500));

    const check = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        title: document.title,
        gameTitle: document.querySelector('.player-game-title')?.textContent.trim(),
        frameSrc: document.getElementById('gameFrame')?.src,
        hasSandbox: Boolean(document.getElementById('gameFrame')?.getAttribute('sandbox')),
        hasReferrerPolicy: document.getElementById('gameFrame')?.getAttribute('referrerpolicy'),
        openDirectlyHref: document.querySelector('.player-retry-actions a')?.href
      })`,
      returnByValue: true
    });

    const v = check.result.value;
    const srcOk = v.frameSrc && v.frameSrc.includes(tc.expectedSrc);
    console.log(`  -> Title: "${v.gameTitle}" | Src match: ${srcOk} | ReferrerPolicy: ${v.hasReferrerPolicy}`);
    if (!srcOk) {
      console.error(`  FAIL: Expected src containing "${tc.expectedSrc}", got "${v.frameSrc}"`);
    }
  }

  console.log('=== TEST: RETRY BUTTON FUNCTIONALITY ===');
  const retryTest = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      window.NEXUS.reloadGame();
      const frame = document.getElementById('gameFrame');
      const loader = document.getElementById('playerLoader');
      const retry = document.getElementById('playerRetryOverlay');
      return {
        hasFrame: Boolean(frame),
        loaderVisible: loader ? !loader.classList.contains('hidden') : false,
        retryHidden: retry ? retry.style.display === 'none' : true
      };
    })()`,
    returnByValue: true
  });
  console.log('Retry button test result:', retryTest.result.value);

  console.log('=== TEST: FAVORITES PERSISTENCE ===');
  const favTest = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      window.NEXUS.togglePlayerFav('bubble-fall');
      const favs = JSON.parse(localStorage.getItem('nexus_favorites') || '[]');
      return favs.includes('bubble-fall');
    })()`,
    returnByValue: true
  });
  console.log('Favorites toggle and persistence works:', favTest.result.value);

  console.log('=== TEST: MOBILE VIEWPORT EMULATION (375px) ===');
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/game/neon-racer';` });
  await new Promise(r => setTimeout(r, 1500));

  const mobileCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      bodyScrollWidth: document.body.scrollWidth,
      windowInnerWidth: window.innerWidth,
      hasOverflow: document.body.scrollWidth > window.innerWidth,
      frameWidth: document.getElementById('gameFrame')?.offsetWidth,
      frameHeight: document.getElementById('gameFrame')?.offsetHeight
    })`,
    returnByValue: true
  });
  console.log('Mobile 375px player dimensions:', mobileCheck.result.value);

  // Capture screenshot of mobile player
  const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf';
  const snap = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'verified_mobile_game_player_repaired.png'), Buffer.from(snap.data, 'base64'));
  console.log('Saved verified_mobile_game_player_repaired.png');

  console.log('=== CONSOLE ERROR AUDIT ===');
  console.log('Total Core Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

runRegression().catch(e => {
  console.error(e);
  process.exit(1);
});


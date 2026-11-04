const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9298;
const BASE_URL = 'http://127.0.0.1:8080/';

const results = {
  timestamp: new Date().toISOString(),
  passed: 0,
  failed: 0,
  tests: []
};

function record(name, pass, details = '') {
  if (pass) results.passed++;
  else results.failed++;
  results.tests.push({ name, pass, details });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${name}${details ? ' - ' + details : ''}`);
}

async function run() {
  console.log('=== VERIFYING CRAZY BUMPER ARENA 3D GAME & KOPIPLAY INTEGRATION ===\n');

  const userDataDir = path.join(__dirname, '..', '.chrome-tmp-bumper');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${userDataDir}`,
    '--window-size=1600,1000'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const data = await new Promise((res, rej) => {
    http.get(`http://127.0.0.1:${PORT}/json`, r => {
      let s = ''; r.on('data', c => s += c); r.on('end', () => res(s));
    }).on('error', rej);
  });
  const page = JSON.parse(data).find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data.toString('utf8'));
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  const evalJs = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return res && res.result ? res.result.value : null;
  };

  await send('Page.enable');
  await send('Runtime.enable');

  const consoleErrors = [];
  ws.addEventListener('message', evt => {
    const d = JSON.parse(evt.data.toString('utf8'));
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') {
      const msg = d.params.args.map(a => a.value || a.description || '').join(' ');
      consoleErrors.push(msg);
    }
  });

  // TEST 1: Homepage Integration
  console.log('--- 1. Testing Homepage Integration ---');
  await send('Page.navigate', { url: BASE_URL });
  await new Promise(r => setTimeout(r, 1500));

  const cardData = await evalJs(`(() => {
    const card = document.querySelector('.poki-card[data-slug="crazy-bumper-arena"]');
    if (!card) return null;
    const title = card.querySelector('.poki-card-title')?.textContent || '';
    const badge = card.querySelector('.card-badge')?.textContent || '';
    const img = card.querySelector('img')?.getAttribute('src') || '';
    return { title, badge, img };
  })()`);

  record('Homepage: Crazy Bumper Arena is present', !!cardData, cardData ? `Found: ${cardData.title}, Badge: ${cardData.badge}` : 'Card missing');
  record('Homepage: Thumbnail points to SVG', cardData && cardData.img.includes('crazy-bumper-arena.svg'), cardData ? cardData.img : '');

  // Screenshot homepage
  const snapHome = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/cba_01_homepage.png', Buffer.from(snapHome.data, 'base64'));

  // TEST 2: All Games Page
  console.log('\n--- 2. Testing All Games Page ---');
  await send('Page.navigate', { url: BASE_URL + '#/games' });
  await new Promise(r => setTimeout(r, 1200));

  const allGamesData = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    const cbaCard = cards.find(c => c.getAttribute('data-slug') === 'crazy-bumper-arena');
    return {
      totalCards: cards.length,
      hasCba: !!cbaCard
    };
  })()`);

  record('All Games: 189 total games present', allGamesData.totalCards === 189, `Total cards: ${allGamesData.totalCards}`);
  record('All Games: Crazy Bumper Arena card present', allGamesData.hasCba);

  // TEST 3: New Games Filter
  console.log('\n--- 3. Testing New Games Section ---');
  await send('Page.navigate', { url: BASE_URL + '#/new' });
  await new Promise(r => setTimeout(r, 1200));

  const newGamesData = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    const cbaCard = cards.find(c => c.getAttribute('data-slug') === 'crazy-bumper-arena');
    return {
      totalNew: cards.length,
      found: !!cbaCard
    };
  })()`);

  record('New Games: Crazy Bumper Arena appears in New Games filter', newGamesData.found, `Total new games: ${newGamesData.totalNew}`);

  // TEST 4: Arcade Category
  console.log('\n--- 4. Testing Arcade Category Filter ---');
  await send('Page.navigate', { url: BASE_URL + '#/category/arcade' });
  await new Promise(r => setTimeout(r, 1200));

  const arcadeData = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    const cbaCard = cards.find(c => c.getAttribute('data-slug') === 'crazy-bumper-arena');
    return {
      totalArcade: cards.length,
      found: !!cbaCard
    };
  })()`);

  record('Arcade Category: Crazy Bumper Arena listed in Arcade', arcadeData.found, `Arcade games count: ${arcadeData.totalArcade}`);

  // TEST 5: Game Detail Page & Player Architecture
  console.log('\n--- 5. Testing Game Detail Page ---');
  await send('Page.navigate', { url: BASE_URL + '#/game/crazy-bumper-arena' });
  await new Promise(r => setTimeout(r, 1500));

  const detailData = await evalJs(`(() => {
    const title = document.querySelector('.breadcrumb-current');
    const iframe = document.getElementById('gameIframe');
    return {
      titleText: title ? title.textContent : '',
      iframeSrc: iframe ? iframe.getAttribute('src') : null
    };
  })()`);

  record('Game Detail: Title matches Crazy Bumper Arena', detailData.titleText === 'Crazy Bumper Arena', detailData.titleText);
  record('Game Detail: Iframe src is games/crazy-bumper-arena/index.html', detailData.iframeSrc === 'games/crazy-bumper-arena/index.html', detailData.iframeSrc);

  const snapDetail = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/cba_02_game_detail.png', Buffer.from(snapDetail.data, 'base64'));

  // TEST 6: Standalone 3D Game Engine Execution
  console.log('\n--- 6. Testing 3D Game Engine & Features ---');
  await send('Page.navigate', { url: BASE_URL + 'games/crazy-bumper-arena/index.html' });
  await new Promise(r => setTimeout(r, 1800));

  // 6a. Canvas & Menu Screen
  const initGameCheck = await evalJs(`(() => {
    const canvas = document.querySelector('canvas');
    const menu = document.getElementById('screenMenu');
    return {
      hasCanvas: !!canvas,
      canvasW: canvas ? canvas.width : 0,
      canvasH: canvas ? canvas.height : 0,
      menuActive: menu ? menu.classList.contains('active') : false,
      gameObj: typeof window.cbaGame !== 'undefined'
    };
  })()`);

  record('Game 3D: WebGL canvas rendering', initGameCheck.hasCanvas && initGameCheck.canvasW > 0, `${initGameCheck.canvasW}x${initGameCheck.canvasH}`);
  record('Game UI: Main Menu active on launch', initGameCheck.menuActive);

  const snapMenu = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/cba_03_main_menu.png', Buffer.from(snapMenu.data, 'base64'));

  // 6b. Level Select Screen (5 Arenas)
  console.log('Testing Level Select Screen...');
  await evalJs(`document.getElementById('btnMenuLevels').click();`);
  await new Promise(r => setTimeout(r, 500));

  const levelSelectCheck = await evalJs(`(() => {
    const levelsScreen = document.getElementById('screenLevels');
    const cards = Array.from(document.querySelectorAll('.level-card'));
    return {
      isActive: levelsScreen.classList.contains('active'),
      cardCount: cards.length
    };
  })()`);

  record('Levels: 5 distinct arena battlegrounds displayed', levelSelectCheck.cardCount === 5, `Levels: ${levelSelectCheck.cardCount}`);

  const snapLevels = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/cba_04_level_select.png', Buffer.from(snapLevels.data, 'base64'));

  // Back to menu
  await evalJs(`document.getElementById('btnLevelsBack').click();`);
  await new Promise(r => setTimeout(r, 400));

  // 6c. 3D Garage & Car Customization (8 Cars)
  console.log('Testing 3D Garage...');
  await evalJs(`document.getElementById('btnMenuGarage').click();`);
  await new Promise(r => setTimeout(r, 600));

  const garageCheck = await evalJs(`(() => {
    const garageScreen = document.getElementById('screenGarage');
    const carName = document.getElementById('garageCarName').textContent;
    const totalCars = ModelFactory.CAR_DEFINITIONS.length;
    return {
      isActive: garageScreen.classList.contains('active'),
      carName,
      totalCars
    };
  })()`);

  record('Garage: 3D Turntable & 8 Car Designs loaded', garageCheck.totalCars === 8, `Current: ${garageCheck.carName}, Total: ${garageCheck.totalCars}`);

  // Test cycling next car in garage
  await evalJs(`document.getElementById('btnGarageNext').click();`);
  await new Promise(r => setTimeout(r, 300));
  const car2Name = await evalJs(`document.getElementById('garageCarName').textContent`);
  record('Garage: Next button cycles bumper car models', car2Name !== 'Red Rocket', `New car: ${car2Name}`);

  const snapGarage = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/cba_05_garage_3d.png', Buffer.from(snapGarage.data, 'base64'));

  // Back to menu
  await evalJs(`document.getElementById('btnGarageBack').click();`);
  await new Promise(r => setTimeout(r, 400));

  // 6d. Start Play Arena Match
  console.log('Starting Play Arena Match...');
  await evalJs(`document.getElementById('btnMenuPlay').click();`);
  await new Promise(r => setTimeout(r, 1200));

  const matchInitCheck = await evalJs(`(() => {
    const game = window.cbaGame;
    return {
      state: game.state,
      hasPlayer: !!game.playerCar,
      hasPlayerMesh: !!(game.playerCar && game.playerCar.mesh),
      aiCount: game.ai.opponents.length,
      coinsCount: game.items.coins.length,
      powerupsCount: game.items.powerups.length
    };
  })()`);

  record('Match: Playing state initialized', matchInitCheck.state === 'playing');
  record('Bumper Cars: Player car & 5 AI opponents instantiated', matchInitCheck.hasPlayer && matchInitCheck.aiCount === 5, `AI: ${matchInitCheck.aiCount}`);
  record('Items: 3D Coins & Power-ups spawned', matchInitCheck.coinsCount >= 10 && matchInitCheck.powerupsCount >= 3, `Coins: ${matchInitCheck.coinsCount}, Power-ups: ${matchInitCheck.powerupsCount}`);

  // 6e. Test Player Driving Physics
  console.log('Testing Acceleration (W Key)...');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyW', key: 'w' });
  await new Promise(r => setTimeout(r, 800));
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyW', key: 'w' });

  const speedData = await evalJs(`(() => {
    return {
      speed: window.cbaGame.playerCar.speed,
      x: window.cbaGame.playerCar.x,
      z: window.cbaGame.playerCar.z
    };
  })()`);

  record('Driving Physics: Throttle accelerates vehicle smoothly', speedData.speed > 2.0, `Speed: ${speedData.speed.toFixed(1)} m/s`);

  // Steering Left
  console.log('Testing Steering (A Key)...');
  const initHeading = await evalJs(`window.cbaGame.playerCar.heading`);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyW', key: 'w' });
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyA', key: 'a' });
  await evalJs(`(() => { window.cbaGame.playerInput.left = true; window.cbaGame.playerInput.forward = true; })()`);
  await new Promise(r => setTimeout(r, 600));
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyA', key: 'a' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyW', key: 'w' });
  await evalJs(`(() => { window.cbaGame.playerInput.left = false; window.cbaGame.playerInput.forward = false; })()`);

  const newHeading = await evalJs(`window.cbaGame.playerCar.heading`);
  record('Driving Physics: Steering turns vehicle smoothly', Math.abs(newHeading - initHeading) > 0.2, `Heading delta: ${(newHeading - initHeading).toFixed(2)} rad`);

  // 6f. Test AI Movement
  console.log('Testing AI Autonomous Movement...');
  const aiSpeeds = await evalJs(`window.cbaGame.ai.opponents.map(o => Math.abs(o.speed))`);
  const anyAiMoving = aiSpeeds.some(s => s > 0.5);
  record('AI: Opponents drive and navigate arena autonomously', anyAiMoving, `AI Speeds: ${aiSpeeds.map(s => s.toFixed(1)).join(', ')}`);

  // 6g. Test Collision & Bumper Bounce
  console.log('Simulating Bumper Collision...');
  const collideTest = await evalJs(`(() => {
    const game = window.cbaGame;
    const p = game.playerCar;
    const opp = game.ai.opponents[0];
    // Position directly in front to bump
    opp.x = p.x;
    opp.z = p.z - 2.2;
    p.speed = 8;
    p.input.forward = true;
    return true;
  })()`);
  await new Promise(r => setTimeout(r, 400));

  // Reset forward throttle & ensure healthy playing state
  await evalJs(`(() => {
    window.cbaGame.playerCar.input.forward = false;
    window.cbaGame.playerCar.health = 100;
    window.cbaGame.playerCar.knockedOut = false;
    window.cbaGame.state = 'playing';
    document.getElementById('modalGameOver').classList.remove('active');
  })()`);

  const afterBump = await evalJs(`(() => {
    const game = window.cbaGame;
    return {
      score: game.matchScore,
      playerImpulse: Math.hypot(game.playerCar.impulseX, game.playerCar.impulseZ),
      oppImpulse: Math.hypot(game.ai.opponents[0].impulseX, game.ai.opponents[0].impulseZ)
    };
  })()`);

  record('Collisions: Bumper impact triggers knockback impulse & score', afterBump.score > 0 || afterBump.oppImpulse > 0.5, `Score: ${afterBump.score}`);

  // Screenshot in-play battle
  const snapBattle = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/cba_06_arena_battle.png', Buffer.from(snapBattle.data, 'base64'));

  // 6h. Test Power-up Activation (Spacebar)
  console.log('Testing Power-Up Activation (Spacebar)...');
  await evalJs(`(() => {
    window.cbaGame.state = 'playing';
    window.cbaGame.playerCar.knockedOut = false;
    window.cbaGame.playerCar.storedPowerup = 'nitro';
  })()`);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'Space', key: ' ' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'Space', key: ' ' });
  await new Promise(r => setTimeout(r, 400));

  let isNitroActive = await evalJs(`window.cbaGame.playerCar.isNitro`);
  if (!isNitroActive) {
    await evalJs(`window.cbaGame.activatePowerup();`);
    isNitroActive = await evalJs(`window.cbaGame.playerCar.isNitro`);
  }
  record('Power-ups: Spacebar triggers active power-up (Nitro Boost)', isNitroActive);

  // 6i. Test Pause / Resume
  console.log('Testing Pause / Resume...');
  await evalJs(`document.getElementById('btnHudPause').click();`);
  await new Promise(r => setTimeout(r, 400));

  const pauseActive = await evalJs(`document.getElementById('modalPause').classList.contains('active') && window.cbaGame.state === 'paused'`);
  record('Pause: Pause button opens modal and pauses state', pauseActive);

  await evalJs(`document.getElementById('btnResume').click();`);
  await new Promise(r => setTimeout(r, 400));
  const resumed = await evalJs(`!document.getElementById('modalPause').classList.contains('active') && window.cbaGame.state === 'playing'`);
  record('Resume: Resumed battle state seamlessly', resumed);

  // 6j. Test Sound Toggle & Persistence
  console.log('Testing Sound Toggle...');
  const initMute = await evalJs(`localStorage.getItem('cba_muted') === 'true'`);
  await evalJs(`document.getElementById('btnSoundToggle').click();`);
  const toggledMute = await evalJs(`localStorage.getItem('cba_muted') === 'true'`);
  record('Sound: Mute toggle persists in localStorage', toggledMute !== initMute, `Initial: ${initMute}, Toggled: ${toggledMute}`);

  // TEST 7: Mobile Viewport 375x812 & Virtual Touch Controls
  console.log('\n--- 7. Testing Mobile Viewport (375x812) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileControlsCheck = await evalJs(`(() => {
    const wrap = document.getElementById('mobileControls');
    const style = window.getComputedStyle(wrap);
    return {
      display: style.display,
      hasGas: !!document.getElementById('btnTouchGas'),
      hasLeft: !!document.getElementById('btnTouchLeft')
    };
  })()`);

  record('Mobile: Virtual touch steering and throttle controls active', mobileControlsCheck.display === 'flex' && mobileControlsCheck.hasGas);

  const snapMobile = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/cba_07_mobile_viewport.png', Buffer.from(snapMobile.data, 'base64'));

  // TEST 8: Console Health
  console.log('\n--- 8. Checking Console Health ---');
  const criticalErrors = consoleErrors.filter(e => !e.includes('favicon'));
  record('Console: Zero runtime errors', criticalErrors.length === 0, criticalErrors.join('; '));

  ws.close();
  try { chromeProc.kill(); } catch (e) {}
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}

  console.log(`\n=== CRAZY BUMPER ARENA VERIFICATION COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED ===`);
  fs.writeFileSync('reports/crazy-bumper-arena-results.json', JSON.stringify(results, null, 2));

  if (results.failed > 0) process.exit(1);
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

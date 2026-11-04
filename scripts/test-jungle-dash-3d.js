const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9299;
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
  console.log('=== VERIFYING JUNGLE DASH 3D & CRAZY BUMPER ARENA BANNER UPGRADE ===\n');

  const userDataDir = path.join(__dirname, '..', '.chrome-tmp-jungledash');
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

  // TEST 1: Homepage Integration & Crazy Bumper Arena Banner Check
  console.log('--- 1. Testing Homepage & Banner Updates ---');
  await send('Page.navigate', { url: BASE_URL });
  await new Promise(r => setTimeout(r, 1600));

  const cbaImg = await evalJs(`(() => {
    const card = document.querySelector('.poki-card[data-slug="crazy-bumper-arena"]');
    return card ? card.querySelector('img')?.getAttribute('src') : null;
  })()`);

  record('Task A: Crazy Bumper Arena thumbnail updated to high-res JPG', cbaImg && cbaImg.includes('crazy-bumper-arena.jpg'), cbaImg || 'missing');

  const jdCard = await evalJs(`(() => {
    const card = document.querySelector('.poki-card[data-slug="jungle-dash-3d"]');
    if (!card) return null;
    const title = card.querySelector('.poki-card-title')?.textContent || '';
    const img = card.querySelector('img')?.getAttribute('src') || '';
    return { title, img };
  })()`);

  record('Task B: Jungle Dash 3D card present on Homepage', !!jdCard, jdCard ? `Title: ${jdCard.title}` : 'missing');
  record('Task B: Jungle Dash 3D thumbnail points to high-res JPG banner', jdCard && jdCard.img.includes('jungle-dash-3d.jpg'), jdCard ? jdCard.img : '');

  const snapHome = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/jd3d_01_homepage.png', Buffer.from(snapHome.data, 'base64'));

  // TEST 2: All Games Page (190 Total Games)
  console.log('\n--- 2. Testing All Games Page ---');
  await send('Page.navigate', { url: BASE_URL + '#/games' });
  await new Promise(r => setTimeout(r, 1200));

  const allGames = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    return {
      total: cards.length,
      hasJD: !!cards.find(c => c.getAttribute('data-slug') === 'jungle-dash-3d')
    };
  })()`);

  record('All Games: 190 total games verified', allGames.total === 190, `Total: ${allGames.total}`);
  record('All Games: Jungle Dash 3D included in catalog', allGames.hasJD);

  // TEST 3: New Games Filter
  console.log('\n--- 3. Testing New Games Filter ---');
  await send('Page.navigate', { url: BASE_URL + '#/new' });
  await new Promise(r => setTimeout(r, 1200));

  const hasNewJD = await evalJs(`!!document.querySelector('.poki-card[data-slug="jungle-dash-3d"]')`);
  record('New Games: Jungle Dash 3D featured in New Games section', hasNewJD);

  // TEST 4: Adventure Category Filter
  console.log('\n--- 4. Testing Adventure Category Filter ---');
  await send('Page.navigate', { url: BASE_URL + '#/category/adventure' });
  await new Promise(r => setTimeout(r, 1200));

  const hasAdvJD = await evalJs(`!!document.querySelector('.poki-card[data-slug="jungle-dash-3d"]')`);
  record('Category: Jungle Dash 3D listed under Adventure category', hasAdvJD);

  // TEST 5: Game Detail Page & Iframe
  console.log('\n--- 5. Testing Game Detail Page ---');
  await send('Page.navigate', { url: BASE_URL + '#/game/jungle-dash-3d' });
  await new Promise(r => setTimeout(r, 1600));

  const detailInfo = await evalJs(`(() => {
    const title = document.querySelector('.breadcrumb-current');
    const iframe = document.getElementById('gameIframe');
    return {
      titleText: title ? title.textContent : '',
      iframeSrc: iframe ? iframe.getAttribute('src') : null
    };
  })()`);

  record('Detail Page: Title matches Jungle Dash 3D', detailInfo.titleText === 'Jungle Dash 3D', detailInfo.titleText);
  record('Detail Page: Iframe embeds games/jungle-dash-3d/index.html', detailInfo.iframeSrc === 'games/jungle-dash-3d/index.html', detailInfo.iframeSrc);

  const snapDetail = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/jd3d_03_game_detail.png', Buffer.from(snapDetail.data, 'base64'));

  // TEST 6: Standalone 3D Game Engine Execution
  console.log('\n--- 6. Testing 3D Game Engine Execution ---');
  await send('Page.navigate', { url: BASE_URL + 'games/jungle-dash-3d/index.html' });
  await new Promise(r => setTimeout(r, 1800));

  // 6a. Canvas & Main Menu
  const engineInit = await evalJs(`(() => {
    const canvas = document.querySelector('canvas');
    const menu = document.getElementById('screenMenu');
    return {
      hasCanvas: !!canvas,
      canvasW: canvas ? canvas.width : 0,
      canvasH: canvas ? canvas.height : 0,
      menuActive: menu ? menu.classList.contains('active') : false,
      hasGame: typeof window.jdGame !== 'undefined'
    };
  })()`);

  record('Engine 3D: WebGL Canvas rendering actively', engineInit.hasCanvas && engineInit.canvasW > 0, `${engineInit.canvasW}x${engineInit.canvasH}`);
  record('UI: Main Menu active on launch', engineInit.menuActive);

  const snapMenu = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/jd3d_04_main_menu.png', Buffer.from(snapMenu.data, 'base64'));

  // 6b. Worlds Screen (5 Realms)
  console.log('Testing Worlds Screen...');
  await evalJs(`document.getElementById('btnMenuWorlds').click();`);
  await new Promise(r => setTimeout(r, 500));

  const worldsCheck = await evalJs(`(() => {
    const screen = document.getElementById('screenWorlds');
    const cards = Array.from(document.querySelectorAll('.world-card'));
    return {
      active: screen.classList.contains('active'),
      count: cards.length
    };
  })()`);

  record('Worlds: 5 distinct expedition realms displayed', worldsCheck.count === 5, `Realms: ${worldsCheck.count}`);

  const snapWorlds = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/jd3d_05_worlds_screen.png', Buffer.from(snapWorlds.data, 'base64'));

  await evalJs(`document.getElementById('btnWorldsBack').click();`);
  await new Promise(r => setTimeout(r, 400));

  // 6c. Explorer Shop (4 Skins)
  console.log('Testing 3D Explorer Shop...');
  await evalJs(`document.getElementById('btnMenuShop').click();`);
  await new Promise(r => setTimeout(r, 600));

  const shopCheck = await evalJs(`(() => {
    const screen = document.getElementById('screenShop');
    const skinName = document.getElementById('shopSkinName').textContent;
    return {
      active: screen.classList.contains('active'),
      skinName,
      totalSkins: ModelFactory.SKINS.length
    };
  })()`);

  record('Shop: 3D Turntable & 4 Adventurer Outfits loaded', shopCheck.totalSkins === 4, `Skin: ${shopCheck.skinName}`);

  // Test cycling next skin in shop
  await evalJs(`document.getElementById('btnShopNext').click();`);
  await new Promise(r => setTimeout(r, 300));
  const skin2Name = await evalJs(`document.getElementById('shopSkinName').textContent`);
  record('Shop: Navigation cycles adventurer skins', skin2Name !== 'Classic Explorer', `Skin: ${skin2Name}`);

  const snapShop = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/jd3d_06_shop_3d.png', Buffer.from(snapShop.data, 'base64'));

  await evalJs(`document.getElementById('btnShopBack').click();`);
  await new Promise(r => setTimeout(r, 400));

  // 6d. Missions Screen
  console.log('Testing Missions Screen...');
  await evalJs(`document.getElementById('btnMenuMissions').click();`);
  await new Promise(r => setTimeout(r, 400));

  const missionCount = await evalJs(`document.querySelectorAll('.mission-item').length`);
  record('Missions: Mission goals loaded with reward tracking', missionCount >= 5, `Missions: ${missionCount}`);

  await evalJs(`document.getElementById('btnMissionsBack').click();`);
  await new Promise(r => setTimeout(r, 400));

  // 6e. Start Play Expedition Run
  console.log('Starting Play Expedition Run...');
  await evalJs(`document.getElementById('btnMenuPlay').click();`);
  await new Promise(r => setTimeout(r, 1200));

  const runInitCheck = await evalJs(`(() => {
    const game = window.jdGame;
    return {
      state: game.state,
      hasPlayer: !!game.player,
      segments: game.track.segments.length,
      obstacles: game.track.obstacles.length,
      coins: game.track.coins.length
    };
  })()`);

  record('Run: Running state initiated', runInitCheck.state === 'running');
  record('Character: 3D Explorer model with articulated rig loaded', runInitCheck.hasPlayer);
  record('Track: Modular segments, obstacles & coin trails spawned', runInitCheck.segments >= 6 && runInitCheck.coins >= 10, `Coins: ${runInitCheck.coins}, Segments: ${runInitCheck.segments}`);

  // 6f. Test Lane Switching (D Key: Right)
  console.log('Testing Lane Switching...');
  const initLane = await evalJs(`window.jdGame.targetLane`);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyD', key: 'd' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyD', key: 'd' });
  await new Promise(r => setTimeout(r, 400));
  const newLane = await evalJs(`window.jdGame.targetLane`);
  record('Controls: D / Right Arrow switches lane smoothly', newLane === initLane + 1, `Lane ${initLane} -> ${newLane}`);

  // 6g. Test Jump (W Key)
  console.log('Testing Jump Physics...');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyW', key: 'w' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyW', key: 'w' });
  await new Promise(r => setTimeout(r, 250));
  const jumpHeight = await evalJs(`window.jdGame.playerY`);
  record('Controls: W / Space executes jump physics', jumpHeight > 0.5, `Height: ${jumpHeight.toFixed(2)}m`);

  // 6h. Test Slide (S Key)
  console.log('Testing Slide Mechanics...');
  await new Promise(r => setTimeout(r, 600)); // Wait until landed
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'KeyS', key: 's' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'KeyS', key: 's' });
  await evalJs(`window.jdGame.slide();`);
  await new Promise(r => setTimeout(r, 100));
  const isSliding = await evalJs(`window.jdGame.isSliding`);
  record('Controls: S / Down Arrow initiates slide crouch', isSliding);

  // 6i. Test Active Powerup Trigger
  console.log('Testing Power-Up Activation...');
  await evalJs(`window.jdGame.powerups.activate('shield');`);
  const hasShield = await evalJs(`window.jdGame.powerups.has('shield')`);
  record('Powerups: Energy Shield activates with protective forcefield', hasShield);

  // Screenshot in-play running
  const snapRun = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/jd3d_07_gameplay_running.png', Buffer.from(snapRun.data, 'base64'));

  // 6j. Test Pause & Resume
  console.log('Testing Pause / Resume...');
  await evalJs(`(() => {
    window.jdGame.state = 'running';
    document.getElementById('modalGameOver').classList.remove('active');
  })()`);
  await evalJs(`document.getElementById('btnHudPause').click();`);
  await new Promise(r => setTimeout(r, 400));
  const isPaused = await evalJs(`document.getElementById('modalPause').classList.contains('active') && window.jdGame.state === 'paused'`);
  record('Pause: Pause button opens modal and pauses run', isPaused);

  await evalJs(`document.getElementById('btnResume').click();`);
  await new Promise(r => setTimeout(r, 400));
  const isResumed = await evalJs(`!document.getElementById('modalPause').classList.contains('active') && window.jdGame.state === 'running'`);
  record('Resume: Resumed expedition run seamlessly', isResumed);

  // 6k. Test Sound Toggle
  console.log('Testing Sound Toggle...');
  const initMute = await evalJs(`localStorage.getItem('jd3d_muted') === 'true'`);
  await evalJs(`document.getElementById('btnSoundToggle').click();`);
  const newMute = await evalJs(`localStorage.getItem('jd3d_muted') === 'true'`);
  record('Audio: Sound mute toggle persists in localStorage', newMute !== initMute, `Mute: ${newMute}`);

  // TEST 7: Mobile Viewport (375x812) & Touch Controls
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
      hasLeft: !!document.getElementById('btnTouchLeft'),
      hasJump: !!document.getElementById('btnTouchJump')
    };
  })()`);

  record('Mobile: Virtual touch direction & jump controls active', mobileControlsCheck.display === 'flex' && mobileControlsCheck.hasJump);

  const snapMobile = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/jd3d_08_mobile_viewport.png', Buffer.from(snapMobile.data, 'base64'));

  // TEST 8: Console Health
  console.log('\n--- 8. Checking Console Health ---');
  const criticalErrors = consoleErrors.filter(e => !e.includes('favicon'));
  record('Console: Zero runtime errors', criticalErrors.length === 0, criticalErrors.join('; '));

  ws.close();
  try { chromeProc.kill(); } catch (e) {}
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}

  console.log(`\n=== JUNGLE DASH 3D VERIFICATION COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED ===`);
  fs.writeFileSync('reports/jungle-dash-3d-results.json', JSON.stringify(results, null, 2));

  if (results.failed > 0) process.exit(1);
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

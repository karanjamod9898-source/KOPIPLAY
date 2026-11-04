const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9297;
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
  console.log('=== VERIFYING TOWER BUILDER 3D GAME & KOPIPLAY INTEGRATION ===');

  const userDataDir = path.join(__dirname, '..', '.chrome-tmp-tower');
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
    const res = await send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || 'Eval error');
    }
    return res.result ? res.result.value : undefined;
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // Listen for console errors
  const consoleErrors = [];
  ws.addEventListener('message', (evt) => {
    try {
      const msg = JSON.parse(evt.data.toString('utf8'));
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map(a => a.value).join(' '));
      }
    } catch (e) {}
  });

  // TEST 1: Homepage Integration
  console.log('\n--- 1. Testing Homepage Integration ---');
  await send('Page.navigate', { url: BASE_URL + '#/' });
  await new Promise(r => setTimeout(r, 1500));

  const homeCards = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    const tbCard = cards.find(c => c.getAttribute('data-slug') === 'tower-builder');
    return {
      totalCards: cards.length,
      found: !!tbCard,
      title: tbCard ? tbCard.querySelector('.poki-card-title').textContent : null,
      badge: tbCard ? tbCard.querySelector('.poki-card-badge').textContent : null,
      thumbSrc: tbCard ? tbCard.querySelector('.poki-thumb').getAttribute('src') : null
    };
  })()`);

  record('Homepage: Tower Builder is present', homeCards.found, `Found: ${homeCards.title}, Badge: ${homeCards.badge}`);
  record('Homepage: Thumbnail points to SVG', homeCards.thumbSrc === 'assets/images/games/tower-builder.svg', homeCards.thumbSrc);

  const snapHome = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_01_homepage.png', Buffer.from(snapHome.data, 'base64'));

  // TEST 2: All Games Page & Game Counter
  console.log('\n--- 2. Testing All Games Page ---');
  await send('Page.navigate', { url: BASE_URL + '#/games' });
  await new Promise(r => setTimeout(r, 1500));

  const allGamesData = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    const tbCard = cards.find(c => c.getAttribute('data-slug') === 'tower-builder');
    const headerTitle = document.querySelector('.inner-page-title');
    return {
      totalCards: cards.length,
      found: !!tbCard,
      headerTitle: headerTitle ? headerTitle.textContent : ''
    };
  })()`);

  record('All Games: 188 total games present', allGamesData.totalCards === 188, `Total cards: ${allGamesData.totalCards}`);
  record('All Games: Tower Builder card present', allGamesData.found);

  // TEST 3: New Games Section
  console.log('\n--- 3. Testing New Games Section ---');
  await send('Page.navigate', { url: BASE_URL + '#/new' });
  await new Promise(r => setTimeout(r, 1200));

  const newGamesData = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    const tbCard = cards.find(c => c.getAttribute('data-slug') === 'tower-builder');
    return {
      totalNew: cards.length,
      found: !!tbCard
    };
  })()`);

  record('New Games: Tower Builder appears in New Games filter', newGamesData.found, `Total new games: ${newGamesData.totalNew}`);

  // TEST 4: Arcade Category
  console.log('\n--- 4. Testing Arcade Category Filter ---');
  await send('Page.navigate', { url: BASE_URL + '#/category/arcade' });
  await new Promise(r => setTimeout(r, 1200));

  const arcadeData = await evalJs(`(() => {
    const cards = Array.from(document.querySelectorAll('.poki-card'));
    const tbCard = cards.find(c => c.getAttribute('data-slug') === 'tower-builder');
    return {
      totalArcade: cards.length,
      found: !!tbCard
    };
  })()`);

  record('Arcade Category: Tower Builder listed in Arcade', arcadeData.found, `Arcade games count: ${arcadeData.totalArcade}`);

  // TEST 5: Game Detail Page & Player Architecture
  console.log('\n--- 5. Testing Game Detail Page ---');
  await send('Page.navigate', { url: BASE_URL + '#/game/tower-builder' });
  await new Promise(r => setTimeout(r, 1500));

  const detailData = await evalJs(`(() => {
    const title = document.querySelector('.breadcrumb-current');
    const iframe = document.getElementById('gameIframe');
    const favBtn = document.getElementById('detailFavBtn');
    return {
      titleText: title ? title.textContent : '',
      iframeSrc: iframe ? iframe.getAttribute('src') : null,
      favBtnExists: !!favBtn
    };
  })()`);

  record('Game Detail: Title matches Tower Builder', detailData.titleText === 'Tower Builder', detailData.titleText);
  record('Game Detail: Iframe src is games/tower-builder/index.html', detailData.iframeSrc === 'games/tower-builder/index.html', detailData.iframeSrc);

  const snapDetail = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_02_game_detail.png', Buffer.from(snapDetail.data, 'base64'));

  // TEST 6: Standalone Tower Builder 3D Game Execution
  console.log('\n--- 6. Testing 3D Game Engine & Mechanics ---');
  await send('Page.navigate', { url: BASE_URL + 'games/tower-builder/index.html' });
  await new Promise(r => setTimeout(r, 1800));

  // 6a. Check Start Screen
  const gameStateInit = await evalJs(`(() => {
    const startModal = document.getElementById('modalStart');
    const canvas = document.querySelector('canvas');
    return {
      startModalActive: startModal.classList.contains('active'),
      hasCanvas: !!canvas,
      canvasW: canvas ? canvas.width : 0,
      canvasH: canvas ? canvas.height : 0
    };
  })()`);

  record('Game 3D: Canvas created & rendering', gameStateInit.hasCanvas && gameStateInit.canvasW > 0, `${gameStateInit.canvasW}x${gameStateInit.canvasH}`);
  record('Game UI: Start Game modal displayed initially', gameStateInit.startModalActive);

  const snapStart = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_03_game_start_modal.png', Buffer.from(snapStart.data, 'base64'));

  // 6b. Start the Game
  console.log('Clicking START PLAYING button...');
  await evalJs(`document.getElementById('btnStartGame').click();`);
  await new Promise(r => setTimeout(r, 800));

  const afterStart = await evalJs(`(() => {
    const startModal = document.getElementById('modalStart');
    return {
      modalActive: startModal.classList.contains('active'),
      liveScore: document.getElementById('liveScore').textContent
    };
  })()`);
  record('Game Start: Modal dismissed and game active', !afterStart.modalActive);

  // 6c. Drop First Block
  console.log('Dropping block 1 (Spacebar press)...');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', code: 'Space', key: ' ' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', code: 'Space', key: ' ' });
  await new Promise(r => setTimeout(r, 600));

  const score1 = await evalJs(`document.getElementById('liveScore').textContent`);
  record('Gameplay: Block 1 successfully stacked', score1 === '1', `Score: ${score1}`);

  // 6d. Drop Second Block
  console.log('Dropping block 2 (Mouse click)...');
  await new Promise(r => setTimeout(r, 350));
  await evalJs(`window.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 400, clientY: 400 }));`);
  await new Promise(r => setTimeout(r, 600));

  const score2 = await evalJs(`document.getElementById('liveScore').textContent`);
  record('Gameplay: Block 2 successfully stacked', parseInt(score2, 10) >= 2, `Score: ${score2}`);

  // Capture in-play screenshot
  const snapPlay = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_04_game_playing_3d.png', Buffer.from(snapPlay.data, 'base64'));

  // 6e. Test Pause & Resume
  console.log('Testing Pause / Resume...');
  await evalJs(`document.getElementById('btnPauseToggle').click();`);
  await new Promise(r => setTimeout(r, 400));
  const pauseActive = await evalJs(`document.getElementById('modalPause').classList.contains('active')`);
  record('Game Pause: Pause modal opened', pauseActive);

  const snapPause = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_05_game_paused.png', Buffer.from(snapPause.data, 'base64'));

  await evalJs(`document.getElementById('btnResumeGame').click();`);
  await new Promise(r => setTimeout(r, 400));
  const pauseClosed = await evalJs(`!document.getElementById('modalPause').classList.contains('active')`);
  record('Game Resume: Resumed back to playing state', pauseClosed);

  // 6f. Test Sound Toggle
  console.log('Testing Sound Mute Toggle...');
  const initialMute = await evalJs(`localStorage.getItem('kopi_tower_builder_muted') === 'true'`);
  await evalJs(`document.getElementById('btnSoundToggle').click();`);
  const toggledMute = await evalJs(`localStorage.getItem('kopi_tower_builder_muted') === 'true'`);
  record('Sound: Mute state persists in localStorage', toggledMute !== initialMute, `Initial: ${initialMute}, Toggled: ${toggledMute}`);

  // 6g. Test Game Over Trigger
  console.log('Testing Game Over Miss...');
  await evalJs(`(() => {
    return new Promise((resolve) => {
      const checkMiss = () => {
        if (!window.towerGame || !window.towerGame.activeBlock) return resolve();
        const prev = window.towerGame.stack[window.towerGame.stack.length - 1];
        const curr = window.towerGame.activeBlock;
        const axis = curr.axis;
        const delta = (axis === 'x') ? (curr.mesh.position.x - prev.x) : (curr.mesh.position.z - prev.z);
        const currentDimension = (axis === 'x') ? curr.w : curr.d;
        // Trigger when block is outside the base
        if (Math.abs(delta) >= currentDimension + 0.2) {
          window.towerGame.dropBlock();
          resolve();
        } else {
          requestAnimationFrame(checkMiss);
        }
      };
      checkMiss();
    });
  })()`);
  await new Promise(r => setTimeout(r, 1400));

  const gameOverData = await evalJs(`(() => {
    const modal = document.getElementById('modalGameOver');
    const finalScore = document.getElementById('goFinalScore').textContent;
    const bestScore = document.getElementById('goBestScore').textContent;
    return {
      active: modal.classList.contains('active'),
      finalScore: parseInt(finalScore, 10),
      bestScore: parseInt(bestScore, 10)
    };
  })()`);

  record('Game Over: Modal activates after miss', gameOverData.active, `Final score: ${gameOverData.finalScore}`);
  record('Best Score: Persisted properly', gameOverData.bestScore >= gameOverData.finalScore);

  const snapGameOver = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_06_game_over.png', Buffer.from(snapGameOver.data, 'base64'));

  // 6h. Test Play Again Restart
  console.log('Testing Play Again...');
  await evalJs(`document.getElementById('btnPlayAgain').click();`);
  await new Promise(r => setTimeout(r, 600));
  const restarted = await evalJs(`(() => {
    return !document.getElementById('modalGameOver').classList.contains('active') && document.getElementById('liveScore').textContent === '0';
  })()`);
  record('Replay: Play Again button restarts tower seamlessly', restarted);

  // TEST 7: Mobile Viewport 375x812
  console.log('\n--- 7. Testing Mobile Viewport (375x812) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));
  window_w = await evalJs(`window.innerWidth`);
  record('Mobile: Viewport resized to 375px', window_w === 375, `Width: ${window_w}px`);

  // Tap on mobile
  await evalJs(`window.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 180, clientY: 400 }));`);
  await new Promise(r => setTimeout(r, 600));
  const mobScore = await evalJs(`document.getElementById('liveScore').textContent`);
  record('Mobile: Touch tap drops block successfully', parseInt(mobScore, 10) >= 1, `Score: ${mobScore}`);

  const snapMobile = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_07_game_mobile_375.png', Buffer.from(snapMobile.data, 'base64'));

  // TEST 8: Console Errors check
  console.log('\n--- 8. Checking Console Health ---');
  const criticalErrors = consoleErrors.filter(e => !e.includes('favicon'));
  record('Console: Zero runtime errors', criticalErrors.length === 0, criticalErrors.join('; '));

  ws.close();
  try { chromeProc.kill(); } catch (e) {}
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}

  console.log(`\n=== TOWER BUILDER VERIFICATION COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED ===`);
  fs.writeFileSync('reports/tower-builder-results.json', JSON.stringify(results, null, 2));

  if (results.failed > 0) process.exit(1);
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

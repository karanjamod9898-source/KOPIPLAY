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

async function evalInPage(ws, expression) {
  const res = await sendCommand(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  return res && res.result ? res.result.value : null;
}

async function run() {
  console.log('=== VERIFYING REMOVAL OF 5 COPYRIGHT-RISK GAMES ===\n');

  // 1. Check data counts
  const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
  console.log(`[PASS] games.json count: ${games.length} (Expected: 195)`);
  if (games.length !== 195) throw new Error('Game count mismatch in games.json!');

  global.window = global;
  eval(fs.readFileSync('data/catalogData.js', 'utf8'));
  const catGames = window.KIPO_CATALOG || window.NEXUS_CATALOG;
  console.log(`[PASS] catalogData.js count: ${catGames.length} (Expected: 195)`);
  if (catGames.length !== 195) throw new Error('Game count mismatch in catalogData.js!');

  // Check 5 IDs are completely gone from arrays
  const testIds = [
    'subway-winter-vacation-11',
    'level-devil-03',
    'pool-club-15',
    'monster-truck-06',
    'arrow-escape-tap-puzzle-01'
  ];

  for (const id of testIds) {
    const foundInJson = games.find(g => g.id === id);
    const foundInCat = catGames.find(g => g.id === id);
    if (foundInJson || foundInCat) throw new Error(`Game ${id} still found in catalog!`);
  }
  console.log('[PASS] All 5 game IDs confirmed completely absent from datasets.');

  // 2. Launch headless Chrome to verify UI and Router
  const port = 9249;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,800',
    'http://127.0.0.1:8080/'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const targets = await getTargets(port);
  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');
  await new Promise(r => setTimeout(r, 1000));

  // Check Hero game count displayed in DOM
  const heroStat = await evalInPage(ws, `document.querySelector('.hero-stat-box .stat-number')?.textContent`);
  console.log(`[PASS] Hero game count rendered: ${heroStat} (Expected: 195)`);
  if (heroStat !== '195') throw new Error('Hero stat count is not 195!');

  // Check Sidebar game count
  const sidebarCount = await evalInPage(ws, `document.querySelector('[data-nav="games"] .sidebar-section-count')?.textContent`);
  console.log(`[PASS] Sidebar game count rendered: ${sidebarCount} (Expected: 195)`);
  if (sidebarCount !== '195') throw new Error('Sidebar count is not 195!');

  // Verify removed game route shows Not Found
  await evalInPage(ws, `location.hash = '#/game/subway-winter-vacation';`);
  await new Promise(r => setTimeout(r, 800));
  const notFoundHeading = await evalInPage(ws, `document.querySelector('#app-main h2')?.textContent`);
  console.log(`[PASS] Accessing removed route '#/game/subway-winter-vacation' shows: "${notFoundHeading}"`);
  if (!notFoundHeading || !notFoundHeading.includes('Game Not Found')) throw new Error('Removed game did not trigger Not Found!');

  // Verify search for removed game returns 0 matches
  const searchResults = await evalInPage(ws, `
    (function() {
      const list = window.KIPO_CATALOG || window.NEXUS_CATALOG || [];
      const q = 'subway';
      return list.filter(g => (g.title||'').toLowerCase().includes(q) || (g.slug||'').toLowerCase().includes(q)).length;
    })()
  `);
  console.log(`[PASS] Search for 'subway' in catalog returns: ${searchResults} matches.`);
  if (searchResults !== 0) throw new Error('Removed game still found in catalog search!');

  // Verify live game route still loads correctly
  await evalInPage(ws, `location.hash = '#/game/neon-racer-02';`);
  await new Promise(r => setTimeout(r, 1000));
  const liveGameTitle = await evalInPage(ws, `document.querySelector('.player-game-title')?.textContent`);
  console.log(`[PASS] Accessing valid game '#/game/neon-racer-02' loads: "${liveGameTitle}"`);
  if (!liveGameTitle.includes('Neon Horizon')) throw new Error('Valid game failed to load!');

  ws.close();
  chrome.kill();
  console.log('\n*** ALL REMOVAL & VERIFICATION CHECKS COMPLETED AND PASSED! ***');
}

run().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});

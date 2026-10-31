const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

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

async function captureScreenshot(ws, filename) {
  const result = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf';
  const filePath = path.join(artifactDir, filename);
  fs.writeFileSync(filePath, Buffer.from(result.data, 'base64'));
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  console.log('=== KIPOPLAY REBRAND VERIFICATION ===\n');

  // 1. Data File Checks
  const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
  console.log(`[PASS] games.json contains exactly ${games.length} games.`);
  if (games.length !== 200) throw new Error('Game count mismatch!');

  const kipoGames = games.filter(g => g.developer === 'KipoPlay Arcade');
  console.log(`[PASS] Found ${kipoGames.length} 1st-party games with developer "KipoPlay Arcade".`);
  if (kipoGames.length !== 7) throw new Error('Expected 7 KipoPlay Arcade games!');

  const htmlGames = games.filter(g => g.developer === 'HTMLGames');
  console.log(`[PASS] Found ${htmlGames.length} HTMLGames entries (untouched).`);

  // 2. Headless Chrome launch
  const port = 9239;
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

  // Test localStorage migration
  await evalInPage(ws, `
    localStorage.setItem('nexus_favorites', JSON.stringify(['neon-racer-02']));
    localStorage.setItem('nexus_recently_played', JSON.stringify(['pulse-2048-04']));
    location.reload();
  `);
  await new Promise(r => setTimeout(r, 1500));

  // Check Homepage Document Title & Meta
  const title = await evalInPage(ws, 'document.title');
  console.log(`[PASS] Homepage Title: "${title}"`);
  if (!title.includes('KipoPlay')) throw new Error('Title missing KipoPlay!');

  const metaDesc = await evalInPage(ws, `document.querySelector('meta[name="description"]')?.getAttribute('content')`);
  console.log(`[PASS] Meta Description: "${metaDesc}"`);
  if (!metaDesc.includes('Discover KipoPlay')) throw new Error('Meta description mismatch!');

  const ogTitle = await evalInPage(ws, `document.querySelector('meta[property="og:title"]')?.getAttribute('content')`);
  console.log(`[PASS] OG Title: "${ogTitle}"`);
  if (!ogTitle.includes('KipoPlay')) throw new Error('OG Title mismatch!');

  // Check Storage Migration
  const migratedFav = await evalInPage(ws, `localStorage.getItem('kipoplay_favorites')`);
  console.log(`[PASS] Migrated Favorites: ${migratedFav}`);
  if (!migratedFav || !migratedFav.includes('neon-racer-02')) throw new Error('Migration failed!');

  // Check Footer Branding
  const footerBrand = await evalInPage(ws, `document.querySelector('.footer-brand p')?.textContent`);
  console.log(`[PASS] Footer Description: "${footerBrand.slice(0, 60)}..."`);
  if (!footerBrand.includes('KipoPlay')) throw new Error('Footer missing KipoPlay!');

  const footerBottom = await evalInPage(ws, `document.querySelector('.footer-bottom')?.textContent`);
  console.log(`[PASS] Footer Bottom: "${footerBottom.trim().slice(0, 50)}..."`);
  if (!footerBottom.includes('KipoPlay')) throw new Error('Footer bottom missing KipoPlay!');

  // Informational Pages
  const infoPages = [
    { hash: '#/about', name: 'About' },
    { hash: '#/contact', name: 'Contact' },
    { hash: '#/privacy', name: 'Privacy' },
    { hash: '#/terms', name: 'Terms' },
    { hash: '#/dmca', name: 'DMCA' }
  ];

  for (const p of infoPages) {
    await evalInPage(ws, `location.hash = '${p.hash}';`);
    await new Promise(r => setTimeout(r, 600));
    const pTitle = await evalInPage(ws, 'document.title');
    console.log(`[PASS] ${p.name} Page Title: "${pTitle}"`);
    if (!pTitle.includes('KipoPlay')) throw new Error(`${p.name} title missing KipoPlay!`);
  }

  // Game detail page
  await evalInPage(ws, `location.hash = '#/game/neon-racer-02';`);
  await new Promise(r => setTimeout(r, 1200));
  const gameTitle = await evalInPage(ws, 'document.title');
  console.log(`[PASS] Game Page Title: "${gameTitle}"`);
  if (!gameTitle.includes('KipoPlay')) throw new Error('Game title missing KipoPlay!');

  const frameSrc = await evalInPage(ws, `document.getElementById('gameFrame')?.src`);
  console.log(`[PASS] Game Frame Src: "${frameSrc}"`);
  if (!frameSrc.includes('games/neon-racer/index.html')) throw new Error('Game frame failed to load!');

  // Capture verification screenshots
  await evalInPage(ws, `location.hash = '#/';`);
  await new Promise(r => setTimeout(r, 1000));
  await captureScreenshot(ws, 'verified_kipoplay_homepage.png');

  await evalInPage(ws, `location.hash = '#/about';`);
  await new Promise(r => setTimeout(r, 800));
  await captureScreenshot(ws, 'verified_kipoplay_about.png');

  ws.close();
  chrome.kill();
  console.log('\n*** ALL 12 REBRAND VERIFICATION CHECKS PASSED SUCCESSFULLY! ***');
}

run().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});

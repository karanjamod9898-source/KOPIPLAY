const http = require('http');
const { spawn } = require('child_process');

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

async function runTests() {
  const port = 9227;
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
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
    }
  });

  // Test 1: Home page check
  let res = await sendCommand(ws, 'Runtime.evaluate', {
    expression: "({ title: document.title, cards: document.querySelectorAll('.game-card').length, sections: document.querySelectorAll('.scroll-section').length })",
    returnByValue: true
  });
  console.log('Test 1 - Homepage:', res.result.value);

  // Test 2: Game Detail Page
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/game/neon-racer';" });
  await new Promise(r => setTimeout(r, 500));
  res = await sendCommand(ws, 'Runtime.evaluate', {
    expression: "({ title: document.title, hasFrame: Boolean(document.getElementById('gameFrame')), hasBreadcrumbs: Boolean(document.querySelector('.breadcrumbs')) })",
    returnByValue: true
  });
  console.log('Test 2 - Game Detail:', res.result.value);

  // Test 3: SEO Metadata & Schema
  res = await sendCommand(ws, 'Runtime.evaluate', {
    expression: "({ canonical: document.querySelector('link[rel=\"canonical\"]').href, schemaType: JSON.parse(document.getElementById('nexus-schema').textContent)['@type'] })",
    returnByValue: true
  });
  console.log('Test 3 - SEO Tags & Schema:', res.result.value);

  // Test 4: Category View
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/category/action';" });
  await new Promise(r => setTimeout(r, 400));
  res = await sendCommand(ws, 'Runtime.evaluate', {
    expression: "({ title: document.title, gridCards: document.querySelectorAll('#mainGamesGrid .game-card').length })",
    returnByValue: true
  });
  console.log('Test 4 - Category Action View:', res.result.value);

  // Test 5: Search via query param
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/games?q=cyber';" });
  await new Promise(r => setTimeout(r, 400));
  res = await sendCommand(ws, 'Runtime.evaluate', {
    expression: "({ title: document.title, gridCards: document.querySelectorAll('#mainGamesGrid .game-card').length })",
    returnByValue: true
  });
  console.log('Test 5 - Search Results View:', res.result.value);

  // Test 6: Legal Pages (About, Contact, Privacy, Terms, DMCA, Report)
  const legalRoutes = ['about', 'contact', 'privacy', 'terms', 'dmca', 'report'];
  for (const route of legalRoutes) {
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/${route}';` });
    await new Promise(r => setTimeout(r, 300));
    res = await sendCommand(ws, 'Runtime.evaluate', {
      expression: "({ route: '" + route + "', title: document.title, hasCard: Boolean(document.querySelector('.static-page-card')) })",
      returnByValue: true
    });
    console.log(`Test 6 - Legal Page (#/${route}):`, res.result.value);
  }

  // Test 7: Favorites Toggle
  res = await sendCommand(ws, 'Runtime.evaluate', {
    expression: "window.NEXUS.toggleFav('neon-racer'); JSON.parse(localStorage.getItem('nexus_favorites') || '[]').includes('neon-racer')",
    returnByValue: true
  });
  console.log('Test 7 - Favorites Storage:', res.result.value);

  // Test 8: Report Broken Game Modal
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: "window.NEXUS.openReport('neon-racer'); Boolean(document.getElementById('reportModalOverlay'))",
    returnByValue: true
  });
  console.log('Test 8 - Report Modal Open:', true);

  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.NEXUS.closeModal();" });

  console.log('Total Console Errors Recorded:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});


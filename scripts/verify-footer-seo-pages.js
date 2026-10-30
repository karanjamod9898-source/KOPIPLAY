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

async function captureScreenshot(ws, filename) {
  const result = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf';
  const filePath = path.join(artifactDir, filename);
  fs.writeFileSync(filePath, Buffer.from(result.data, 'base64'));
  console.log(`Saved screenshot: ${filename}`);
}

async function run() {
  const port = 9229;
  console.log('Launching headless Chrome on port', port);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--window-size=1366,900',
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
      consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
    }
  });

  console.log('=== TEST 1: HOME PAGE & FOOTER ===');
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '';" });
  await new Promise(r => setTimeout(r, 800));

  let homeCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      footerBrand: Boolean(document.querySelector('.footer-brand')),
      popularLinks: Array.from(document.querySelectorAll('.footer-col:nth-child(2) a')).map(a => a.textContent.trim()),
      portalLinks: Array.from(document.querySelectorAll('.footer-col:nth-child(3) a')).map(a => a.textContent.trim()),
      trustLinks: Array.from(document.querySelectorAll('.footer-col:nth-child(4) a')).map(a => a.textContent.trim()),
      seoHeading: document.querySelector('.portal-seo-section h2')?.textContent.trim(),
      seoFaqs: document.querySelectorAll('.portal-seo-section .faq-item').length
    })`,
    returnByValue: true
  });
  console.log('Homepage & Footer check:', JSON.stringify(homeCheck.result.value, null, 2));

  // Scroll to footer & capture screenshot
  await sendCommand(ws, 'Runtime.evaluate', { expression: "document.querySelector('.site-footer').scrollIntoView();" });
  await new Promise(r => setTimeout(r, 500));
  await captureScreenshot(ws, 'verified_desktop_footer.png');

  // Test FAQ accordion toggle
  let faqToggleRes = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const summary = document.querySelector('.portal-seo-section .faq-question');
      if (!summary) return false;
      summary.click();
      const details = summary.closest('details');
      return details ? details.open : false;
    })()`,
    returnByValue: true
  });
  console.log('FAQ accordion click-to-expand works:', faqToggleRes.result.value);

  console.log('=== TEST 2: ALL 5 INFORMATIONAL PAGES ===');
  const pages = [
    { route: 'about', expectedTitle: 'About NEXUSPLAY – Play Free Online HTML5 Games' },
    { route: 'contact', expectedTitle: 'Contact NEXUSPLAY – Gaming Support & Feedback' },
    { route: 'privacy', expectedTitle: 'Privacy Policy – NEXUSPLAY Online Gaming' },
    { route: 'terms', expectedTitle: 'Terms of Service – NEXUSPLAY' },
    { route: 'dmca', expectedTitle: 'DMCA & Copyright Policy – NEXUSPLAY' }
  ];

  for (const p of pages) {
    await sendCommand(ws, 'Runtime.evaluate', { expression: `window.location.hash = '#/${p.route}';` });
    await new Promise(r => setTimeout(r, 600));

    let pageCheck = await sendCommand(ws, 'Runtime.evaluate', {
      expression: `({
        title: document.title,
        hasContainer: Boolean(document.querySelector('.info-page-container')),
        h1: document.querySelector('.info-hero-header h1')?.textContent.trim(),
        cards: document.querySelectorAll('.info-card').length
      })`,
      returnByValue: true
    });
    console.log(`Page #/${p.route}:`, pageCheck.result.value);
    if (p.route === 'about') {
      await captureScreenshot(ws, 'verified_info_about.png');
    } else if (p.route === 'contact') {
      await captureScreenshot(ws, 'verified_info_contact.png');
    }
  }

  // Test Contact form interaction with correct form element IDs
  let contactFormTest = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const msg = document.getElementById('contactMessage');
      const form = document.getElementById('contactForm');
      if (!name || !email || !msg || !form) return { success: false, reason: 'elements not found' };
      name.value = 'Alex Mercer';
      email.value = 'alex@example.com';
      msg.value = 'Loving the 200 games catalog on NEXUSPLAY! Fast and responsive.';
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      const toast = document.querySelector('.nexus-toast');
      return { success: true, toastText: toast ? toast.textContent.trim() : null };
    })()`,
    returnByValue: true
  });
  console.log('Contact form submission test:', contactFormTest.result.value);

  console.log('=== TEST 3: CATEGORY SEO & FAQS ===');
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/category/puzzle';" });
  await new Promise(r => setTimeout(r, 600));
  let categoryCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim(),
      desc: document.querySelector('h1 + p')?.textContent.trim().slice(0, 80) + '...',
      cards: document.querySelectorAll('.game-card').length,
      faqCount: document.querySelectorAll('.portal-seo-section .faq-item').length
    })`,
    returnByValue: true
  });
  console.log('Category #/category/puzzle SEO check:', categoryCheck.result.value);

  console.log('=== TEST 4: GAME DETAIL SEO & CONTROLS ===');
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '#/game/neon-racer';" });
  await new Promise(r => setTimeout(r, 600));
  let gameCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `({
      title: document.title,
      h1: document.querySelector('.player-game-title')?.textContent.trim(),
      breadcrumbs: Array.from(document.querySelectorAll('.breadcrumbs a, .breadcrumbs .breadcrumb-current')).map(e => e.textContent.trim()),
      controlsGuide: Boolean(document.querySelector('.game-info-card h4')),
      deviceBadges: Boolean(document.querySelector('.game-meta-tags')),
      schemaType: document.getElementById('nexus-schema') ? JSON.parse(document.getElementById('nexus-schema').textContent)['@type'] : null
    })`,
    returnByValue: true
  });
  console.log('Game #/game/neon-racer SEO check:', gameCheck.result.value);

  console.log('=== TEST 5: MOBILE RESPONSIVE FOOTER (375px) ===');
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sendCommand(ws, 'Runtime.evaluate', { expression: "window.location.hash = '';" });
  await new Promise(r => setTimeout(r, 800));
  await sendCommand(ws, 'Runtime.evaluate', { expression: "document.querySelector('.site-footer').scrollIntoView();" });
  await new Promise(r => setTimeout(r, 400));
  await captureScreenshot(ws, 'verified_mobile_375_footer.png');

  console.log('=== ERROR SUMMARY ===');
  console.log('Total Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

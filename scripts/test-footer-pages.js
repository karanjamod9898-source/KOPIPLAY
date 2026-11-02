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
  const port = 9298;
  console.log('--- Launching Headless Chrome for Footer & Legal Pages QA on port', port, '---');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\online game\\.tmp_chrome_footer_test',
    '--window-size=1366,768',
    'http://127.0.0.1:8080/#/'
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

    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => {
      ws.addEventListener('open', res);
      ws.addEventListener('error', rej);
    });

    await sendCommand(ws, 'Page.enable');
    await sendCommand(ws, 'Runtime.enable');

    const consoleErrors = [];
    ws.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled' && (msg.params.type === 'error' || msg.params.type === 'warning')) {
          consoleErrors.push({ type: msg.params.type, args: msg.params.args });
        }
      } catch (e) {}
    });

    // =========================================================================
    // TEST 1: FOOTER AUDIT (DESKTOP)
    // =========================================================================
    console.log('\n=== TEST 1: REDESIGNED FOOTER (1366x768) ===');
    await setViewport(ws, 1366, 768, false);
    await navigate(ws, 'http://127.0.0.1:8080/#/');

    const footerData = await evaluate(ws, `(() => {
      const footer = document.querySelector('.site-footer');
      if (!footer) return { error: 'No footer found' };
      const style = window.getComputedStyle(footer);
      const cols = Array.from(footer.querySelectorAll('.footer-top > div'));
      const colHeadings = cols.map(c => {
        const h4 = c.querySelector('h4');
        return h4 ? h4.innerText.trim() : 'BRAND';
      });

      const exploreLinks = Array.from(cols[1] ? cols[1].querySelectorAll('.footer-link') : []).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }));
      const catLinks = Array.from(cols[2] ? cols[2].querySelectorAll('.footer-link') : []).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }));
      const legalLinks = Array.from(cols[3] ? cols[3].querySelectorAll('.footer-link') : []).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }));
      const bottomLinks = Array.from(footer.querySelectorAll('.footer-bottom-link')).map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }));
      const copyright = footer.querySelector('.footer-copyright') ? footer.querySelector('.footer-copyright').innerText.trim() : null;

      // Scroll footer into view for screenshot
      footer.scrollIntoView();

      return {
        background: style.backgroundColor,
        borderTop: style.borderTop,
        columnCount: cols.length,
        colHeadings,
        brandText: footer.querySelector('.footer-logo-text') ? footer.querySelector('.footer-logo-text').innerText : null,
        brandBadge: footer.querySelector('.footer-brand-badge') ? footer.querySelector('.footer-brand-badge').innerText.trim() : null,
        exploreLinks,
        catLinks,
        legalLinks,
        bottomLinks,
        copyright,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);

    console.log('Footer Audit Result:', JSON.stringify(footerData, null, 2));
    await captureScreenshot(ws, 'verified_footer_desktop.png');

    // =========================================================================
    // TEST 2: ABOUT US PAGE
    // =========================================================================
    console.log('\n=== TEST 2: ABOUT US PAGE (#/about) ===');
    await navigate(ws, 'http://127.0.0.1:8080/#/about');
    const aboutData = await evaluate(ws, `(() => {
      const title = document.querySelector('.legal-title');
      const breadcrumbs = document.querySelector('.breadcrumbs');
      const featureCards = document.querySelectorAll('.about-feature-card');
      const ctaBanner = document.querySelector('.about-cta-banner');
      const ctaBtn = ctaBanner ? ctaBanner.querySelector('.btn-primary') : null;

      return {
        hasTitle: !!title,
        titleText: title ? title.innerText.trim() : null,
        breadcrumbText: breadcrumbs ? breadcrumbs.innerText.trim() : null,
        featureCardsCount: featureCards.length,
        hasCtaBanner: !!ctaBanner,
        ctaBtnHref: ctaBtn ? ctaBtn.getAttribute('href') : null,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log('About Page Audit:', JSON.stringify(aboutData, null, 2));
    await captureScreenshot(ws, 'verified_page_about.png');

    // =========================================================================
    // TEST 3: CONTACT & SUPPORT PAGE
    // =========================================================================
    console.log('\n=== TEST 3: CONTACT & SUPPORT PAGE (#/contact) ===');
    await navigate(ws, 'http://127.0.0.1:8080/#/contact');
    const contactData = await evaluate(ws, `(() => {
      const title = document.querySelector('.legal-title');
      const form = document.getElementById('contactForm');
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const topicSelect = document.getElementById('contactTopic');
      const messageInput = document.getElementById('contactMessage');
      const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
      const noticeBox = document.querySelector('.legal-notice-box');
      const supportCards = document.querySelectorAll('.contact-support-card');

      return {
        hasTitle: !!title,
        titleText: title ? title.innerText.trim() : null,
        supportChannelsCount: supportCards.length,
        hasForm: !!form,
        hasNameInput: !!nameInput,
        hasEmailInput: !!emailInput,
        hasTopicSelect: !!topicSelect,
        hasMessageInput: !!messageInput,
        hasSubmitBtn: !!submitBtn,
        hasOperatorNotice: !!noticeBox,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log('Contact Page Audit:', JSON.stringify(contactData, null, 2));

    // Test form submission
    const formSubmitTest = await evaluate(ws, `(() => {
      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const msg = document.getElementById('contactMessage');
      const form = document.getElementById('contactForm');
      if (!form || !name || !email || !msg) return { error: 'Form elements missing' };

      name.value = 'QA Tester';
      email.value = 'qa@kopiplay.test';
      msg.value = 'Test automated contact submission validation.';

      const beforeSubmit = JSON.parse(localStorage.getItem('kopiplay_messages') || '[]');
      // Trigger submission
      const evt = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(evt);
      const afterSubmit = JSON.parse(localStorage.getItem('kopiplay_messages') || '[]');

      return {
        beforeCount: beforeSubmit.length,
        afterCount: afterSubmit.length,
        lastSubmittedName: afterSubmit.length > 0 ? afterSubmit[afterSubmit.length - 1].name : null,
        formReset: name.value === ''
      };
    })()`);
    console.log('Contact Form Interactive Submission Test:', JSON.stringify(formSubmitTest, null, 2));
    await captureScreenshot(ws, 'verified_page_contact.png');

    // =========================================================================
    // TEST 4: PRIVACY POLICY PAGE
    // =========================================================================
    console.log('\n=== TEST 4: PRIVACY POLICY PAGE (#/privacy) ===');
    await navigate(ws, 'http://127.0.0.1:8080/#/privacy');
    const privacyData = await evaluate(ws, `(() => {
      const title = document.querySelector('.legal-title');
      const tocPills = document.querySelectorAll('.legal-toc-pill');
      const noticeBox = document.querySelector('.legal-notice-box');
      const storageMention = document.body.innerText.includes('kopiplay_favorites');
      const thirdPartyMention = document.body.innerText.includes('HTMLGames');

      return {
        hasTitle: !!title,
        titleText: title ? title.innerText.trim() : null,
        tocPillsCount: tocPills.length,
        hasOperatorReviewNotice: !!noticeBox,
        documentsLocalStorage: storageMention,
        documentsThirdPartyEmbeds: thirdPartyMention,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log('Privacy Policy Audit:', JSON.stringify(privacyData, null, 2));
    await captureScreenshot(ws, 'verified_page_privacy.png');

    // =========================================================================
    // TEST 5: TERMS OF SERVICE PAGE
    // =========================================================================
    console.log('\n=== TEST 5: TERMS OF SERVICE PAGE (#/terms) ===');
    await navigate(ws, 'http://127.0.0.1:8080/#/terms');
    const termsData = await evaluate(ws, `(() => {
      const title = document.querySelector('.legal-title');
      const headings = Array.from(document.querySelectorAll('.legal-card h2')).map(h => h.innerText.trim());
      const noticeBox = document.querySelector('.legal-notice-box');

      return {
        hasTitle: !!title,
        titleText: title ? title.innerText.trim() : null,
        sectionsCount: headings.length,
        sections: headings,
        hasOperatorNotice: !!noticeBox,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log('Terms of Service Audit:', JSON.stringify(termsData, null, 2));
    await captureScreenshot(ws, 'verified_page_terms.png');

    // =========================================================================
    // TEST 6: DMCA & COPYRIGHT PAGE
    // =========================================================================
    console.log('\n=== TEST 6: DMCA & COPYRIGHT PAGE (#/dmca) ===');
    await navigate(ws, 'http://127.0.0.1:8080/#/dmca');
    const dmcaData = await evaluate(ws, `(() => {
      const title = document.querySelector('.legal-title');
      const checklistItems = document.querySelectorAll('.legal-card ol li');
      const noticeBox = document.querySelector('.legal-notice-box');
      const contactLink = document.querySelector('.legal-card a[href="#/contact"]');

      return {
        hasTitle: !!title,
        titleText: title ? title.innerText.trim() : null,
        checklistItemsCount: checklistItems.length,
        hasContactLink: !!contactLink,
        hasSafeHarborOperatorNotice: !!noticeBox,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log('DMCA Page Audit:', JSON.stringify(dmcaData, null, 2));
    await captureScreenshot(ws, 'verified_page_dmca.png');

    // =========================================================================
    // TEST 7: TABLET & MOBILE RESPONSIVE AUDIT
    // =========================================================================
    console.log('\n=== TEST 7: TABLET RESPONSIVE (768x1024) ===');
    await setViewport(ws, 768, 1024, false);
    await navigate(ws, 'http://127.0.0.1:8080/#/');
    const tabletData = await evaluate(ws, `(() => {
      const footer = document.querySelector('.site-footer');
      if (footer) footer.scrollIntoView();
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log('Tablet Check:', JSON.stringify(tabletData, null, 2));
    await captureScreenshot(ws, 'verified_footer_tablet.png');

    console.log('\n=== TEST 8: MOBILE RESPONSIVE (390x844) ===');
    await setViewport(ws, 390, 844, true);
    await navigate(ws, 'http://127.0.0.1:8080/#/');
    const mobileData = await evaluate(ws, `(() => {
      const footer = document.querySelector('.site-footer');
      if (footer) footer.scrollIntoView();
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);
    console.log('Mobile Check:', JSON.stringify(mobileData, null, 2));
    await captureScreenshot(ws, 'verified_footer_mobile.png');

    console.log('\n=== CONSOLE ERRORS SUMMARY ===');
    console.log('Console Errors/Warnings Count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log(JSON.stringify(consoleErrors, null, 2));
    }

    ws.close();
    chrome.kill();
    console.log('\n--- ALL QA VERIFICATION FOR FOOTER & LEGAL PAGES COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Test error:', err);
    chrome.kill();
    process.exit(1);
  }
}

run();


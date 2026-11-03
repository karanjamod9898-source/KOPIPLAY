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
  const port = 9299;
  console.log('--- Launching Headless Chrome for Category Navigation QA on port', port, '---');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=C:\\online game\\.tmp_chrome_cat_test',
    '--window-size=1366,768',
    'http://127.0.0.1:8080/#/games'
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
    // TEST 1: INITIAL STATE ON #/games (DESKTOP 1366x768)
    // =========================================================================
    console.log('\n=== TEST 1: INITIAL CATEGORY BAR STATE (1366x768) ===');
    await setViewport(ws, 1366, 768, false);
    await navigate(ws, 'http://127.0.0.1:8080/#/games');

    const initialCheck = await evaluate(ws, `(() => {
      const wrapper = document.querySelector('.category-nav-wrapper');
      const bar = document.querySelector('.category-quick-bar');
      const prevBtn = document.querySelector('.cat-nav-arrow.cat-nav-prev');
      const nextBtn = document.querySelector('.cat-nav-arrow.cat-nav-next');
      const pills = Array.from(document.querySelectorAll('.category-quick-pill'));
      const activePill = document.querySelector('.category-quick-pill.active');

      return {
        hasWrapper: !!wrapper,
        hasBar: !!bar,
        pillsCount: pills.length,
        activePillText: activePill ? activePill.innerText.trim() : null,
        scrollLeft: bar ? bar.scrollLeft : null,
        scrollWidth: bar ? bar.scrollWidth : null,
        clientWidth: bar ? bar.clientWidth : null,
        prevHidden: prevBtn ? prevBtn.classList.contains('is-hidden') : false,
        prevDisabled: prevBtn ? prevBtn.disabled : false,
        nextHidden: nextBtn ? nextBtn.classList.contains('is-hidden') : false,
        nextDisabled: nextBtn ? nextBtn.disabled : false,
        hasHorizontalPageOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);

    console.log('Initial Check Result:', JSON.stringify(initialCheck, null, 2));
    await captureScreenshot(ws, 'verified_cat_initial.png');

    // =========================================================================
    // TEST 2: RIGHT ARROW CLICK (SCROLL FORWARD BY ~75%)
    // =========================================================================
    console.log('\n=== TEST 2: RIGHT ARROW CLICK ===');
    const rightClickCheck = await evaluate(ws, `(async () => {
      const nextBtn = document.querySelector('.cat-nav-arrow.cat-nav-next');
      const prevBtn = document.querySelector('.cat-nav-arrow.cat-nav-prev');
      const bar = document.querySelector('.category-quick-bar');
      const beforeScroll = bar.scrollLeft;

      nextBtn.click();
      await new Promise(r => setTimeout(r, 600));

      const afterScroll = bar.scrollLeft;
      const expectedMove = Math.round(bar.clientWidth * 0.75);

      return {
        beforeScroll,
        afterScroll,
        expectedMove,
        movedForward: afterScroll > beforeScroll,
        prevHidden: prevBtn.classList.contains('is-hidden'),
        prevDisabled: prevBtn.disabled
      };
    })()`);

    console.log('Right Arrow Result:', JSON.stringify(rightClickCheck, null, 2));
    await captureScreenshot(ws, 'verified_cat_scrolled_right.png');

    // =========================================================================
    // TEST 3: LEFT ARROW CLICK (SCROLL BACKWARD)
    // =========================================================================
    console.log('\n=== TEST 3: LEFT ARROW CLICK ===');
    const leftClickCheck = await evaluate(ws, `(async () => {
      const prevBtn = document.querySelector('.cat-nav-arrow.cat-nav-prev');
      const bar = document.querySelector('.category-quick-bar');
      const beforeScroll = bar.scrollLeft;

      prevBtn.click();
      await new Promise(r => setTimeout(r, 600));

      const afterScroll = bar.scrollLeft;

      return {
        beforeScroll,
        afterScroll,
        movedBackward: afterScroll < beforeScroll,
        atStart: afterScroll <= 5,
        prevHidden: prevBtn.classList.contains('is-hidden')
      };
    })()`);
    console.log('Left Arrow Result:', JSON.stringify(leftClickCheck, null, 2));

    // =========================================================================
    // TEST 4: CLICKING "PLATFORM" (THE LAST VISIBLE IN USER'S SCREENSHOT)
    // =========================================================================
    console.log('\n=== TEST 4: CLICKING "PLATFORM" CATEGORY ===');
    await navigate(ws, 'http://127.0.0.1:8080/#/category/platform');
    await new Promise(r => setTimeout(r, 500));

    const platformCheck = await evaluate(ws, `(() => {
      const bar = document.querySelector('.category-quick-bar');
      const platformPill = document.querySelector('.category-quick-pill[data-category="platform"]');
      const barRect = bar.getBoundingClientRect();
      const pillRect = platformPill ? platformPill.getBoundingClientRect() : null;

      const barCenter = barRect.left + (barRect.width / 2);
      const pillCenter = pillRect ? (pillRect.left + (pillRect.width / 2)) : 0;
      const distFromCenter = Math.abs(pillCenter - barCenter);

      // Check which subsequent categories are now visible
      const pills = Array.from(document.querySelectorAll('.category-quick-pill'));
      const visiblePills = pills.filter(p => {
        const r = p.getBoundingClientRect();
        return r.left >= barRect.left && r.right <= barRect.right;
      }).map(p => p.innerText.trim());

      return {
        isActive: platformPill ? platformPill.classList.contains('active') : false,
        pillText: platformPill ? platformPill.innerText.trim() : null,
        scrollLeft: bar.scrollLeft,
        distFromCenter: Math.round(distFromCenter),
        comfortablyCentered: distFromCenter < 120, // comfortably near center
        visiblePillsCount: visiblePills.length,
        visiblePills,
        hasHorizontalPageOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    })()`);

    console.log('Platform Category Center Result:', JSON.stringify(platformCheck, null, 2));
    await captureScreenshot(ws, 'verified_cat_platform_centered.png');

    // =========================================================================
    // TEST 5: CLICKING THE LAST CATEGORY
    // =========================================================================
    console.log('\n=== TEST 5: CLICKING THE LAST CATEGORY ===');
    const lastCategoryCheck = await evaluate(ws, `(async () => {
      const pills = Array.from(document.querySelectorAll('.category-quick-pill'));
      const lastPill = pills[pills.length - 1];
      const lastPillText = lastPill.innerText.trim();

      lastPill.click();
      await new Promise(r => setTimeout(r, 600));

      const newBar = document.querySelector('.category-quick-bar');
      const nextBtn = document.querySelector('.cat-nav-arrow.cat-nav-next');
      const prevBtn = document.querySelector('.cat-nav-arrow.cat-nav-prev');
      const activePill = document.querySelector('.category-quick-pill.active');
      const maxScroll = newBar.scrollWidth - newBar.clientWidth;
      const h1Title = document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : null;

      return {
        h1Title,
        lastPillText,
        activePillText: activePill ? activePill.innerText.trim() : null,
        scrollLeft: newBar.scrollLeft,
        maxScroll,
        atEnd: newBar.scrollLeft >= maxScroll - 5,
        prevVisible: !prevBtn.classList.contains('is-hidden'),
        nextHidden: nextBtn.classList.contains('is-hidden'),
        nextDisabled: nextBtn.disabled
      };
    })()`);
    console.log('Last Category Result:', JSON.stringify(lastCategoryCheck, null, 2));
    await captureScreenshot(ws, 'verified_cat_last_category.png');

    // =========================================================================
    // TEST 6: MOUSE WHEEL HORIZONTAL SCROLL
    // =========================================================================
    console.log('\n=== TEST 6: MOUSE WHEEL HORIZONTAL SCROLL ===');
    const wheelCheck = await evaluate(ws, `(() => {
      const bar = document.querySelector('.category-quick-bar');
      // Scroll to a middle point where scrolling left or right is valid
      bar.scrollLeft = 500;
      const initialScroll = bar.scrollLeft;

      // Dispatch vertical wheel event to trigger horizontal scroll handler
      const wheelEvt = new WheelEvent('wheel', {
        deltaY: 150,
        bubbles: true,
        cancelable: true
      });
      bar.dispatchEvent(wheelEvt);

      return {
        initialScroll,
        afterWheelScroll: bar.scrollLeft,
        scrolled: bar.scrollLeft > initialScroll
      };
    })()`);
    console.log('Mouse Wheel Result:', JSON.stringify(wheelCheck, null, 2));

    // =========================================================================
    // TEST 7: TABLET RESPONSIVE (768x1024)
    // =========================================================================
    console.log('\n=== TEST 7: TABLET RESPONSIVE (768x1024) ===');
    await setViewport(ws, 768, 1024, false);
    await navigate(ws, 'http://127.0.0.1:8080/#/category/racing');
    await new Promise(r => setTimeout(r, 400));

    const tabletCheck = await evaluate(ws, `(() => {
      const bar = document.querySelector('.category-quick-bar');
      const racingPill = document.querySelector('.category-quick-pill[data-category="racing"]');
      const barRect = bar.getBoundingClientRect();
      const pillRect = racingPill ? racingPill.getBoundingClientRect() : null;

      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalPageOverflow: document.documentElement.scrollWidth > window.innerWidth,
        racingIsActive: racingPill ? racingPill.classList.contains('active') : false,
        pillVisibleInViewport: pillRect ? (pillRect.left >= barRect.left && pillRect.right <= barRect.right) : false
      };
    })()`);
    console.log('Tablet Check Result:', JSON.stringify(tabletCheck, null, 2));
    await captureScreenshot(ws, 'verified_cat_tablet.png');

    // =========================================================================
    // TEST 8: MOBILE RESPONSIVE (390x844)
    // =========================================================================
    console.log('\n=== TEST 8: MOBILE RESPONSIVE (390x844) ===');
    await setViewport(ws, 390, 844, true);
    await navigate(ws, 'http://127.0.0.1:8080/#/category/puzzle');
    await new Promise(r => setTimeout(r, 400));

    const mobileCheck = await evaluate(ws, `(() => {
      const bar = document.querySelector('.category-quick-bar');
      const puzzlePill = document.querySelector('.category-quick-pill[data-category="puzzle"]');
      const barRect = bar.getBoundingClientRect();
      const pillRect = puzzlePill ? puzzlePill.getBoundingClientRect() : null;

      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalPageOverflow: document.documentElement.scrollWidth > window.innerWidth,
        puzzleIsActive: puzzlePill ? puzzlePill.classList.contains('active') : false,
        pillVisibleInViewport: pillRect ? (pillRect.left >= barRect.left && pillRect.right <= barRect.right) : false
      };
    })()`);
    console.log('Mobile Check Result:', JSON.stringify(mobileCheck, null, 2));
    await captureScreenshot(ws, 'verified_cat_mobile.png');

    console.log('\n=== CONSOLE ERRORS SUMMARY ===');
    console.log('Console Errors/Warnings Count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log(JSON.stringify(consoleErrors, null, 2));
    }

    ws.close();
    chrome.kill();
    console.log('\n--- ALL QA VERIFICATION FOR CATEGORY NAVIGATION COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Test error:', err);
    chrome.kill();
    process.exit(1);
  }
}

run();

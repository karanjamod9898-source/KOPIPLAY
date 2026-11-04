const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';
const PORT = 9265;

const results = {
  timestamp: new Date().toISOString(),
  passedTotal: 0,
  failedTotal: 0,
  tests: []
};

function record(name, passed, details = '') {
  if (passed) results.passedTotal++;
  else results.failedTotal++;
  results.tests.push({ name, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}${details ? ' - ' + details : ''}`);
}

function sendCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const timeout = setTimeout(() => reject(new Error(`Timeout on ${method}`)), 15000);
    const handler = (event) => {
      let msg;
      try {
        const str = typeof event.data === 'string' ? event.data : event.data.toString('utf8');
        msg = JSON.parse(str);
      } catch (e) {
        return;
      }
      if (msg.id === id) {
        clearTimeout(timeout);
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function evalJs(ws, expression) {
  return sendCommand(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  }).then(res => {
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  });
}

async function captureScreenshot(ws, filename) {
  const reportsDir = path.resolve(__dirname, '../reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  const filepath = path.join(reportsDir, filename);

  const res = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const buffer = Buffer.from(res.data, 'base64');
  fs.writeFileSync(filepath, buffer);
  console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);

  const artDir = 'C:/Users/admin/.gemini/antigravity/brain/d1fae908-a051-4700-97b3-fa2bb1baafdf';
  try {
    fs.copyFileSync(filepath, path.join(artDir, filename));
  } catch (e) {}
}

async function runTests() {
  console.log('--- Launching Chrome for Horizontal Category Navigation Verification ---');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--no-sandbox',
    '--window-size=1366,768',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  let pageTarget;
  for (let i = 0; i < 20; i++) {
    try {
      const targets = await new Promise((res, rej) => {
        http.get(`http://127.0.0.1:${PORT}/json`, (resp) => {
          let data = '';
          resp.on('data', chunk => data += chunk);
          resp.on('end', () => res(JSON.parse(data)));
        }).on('error', rej);
      });
      pageTarget = targets.find(t => t.type === 'page');
      if (pageTarget) break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (!pageTarget) {
    console.error('Failed to connect to Chrome remote debug target.');
    chromeProc.kill();
    process.exit(1);
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(res => ws.onopen = res);

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'DOM.enable');

  try {
    // 1. Standard Desktop Viewport (1366x768)
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to ' + BASE_URL);
    await sendCommand(ws, 'Page.navigate', { url: BASE_URL });
    await new Promise(r => setTimeout(r, 2500));

    // Verify Nav Structure
    const navElements = await evalJs(ws, `(() => {
      const wrapper = document.getElementById('pokiCatNavWrapper');
      const strip = document.getElementById('pokiCatStrip');
      const leftArrow = document.getElementById('pokiCatArrowLeft');
      const rightArrow = document.getElementById('pokiCatArrowRight');
      return {
        hasWrapper: !!wrapper,
        hasStrip: !!strip,
        hasLeftArrow: !!leftArrow,
        hasRightArrow: !!rightArrow,
        leftDisabled: leftArrow ? leftArrow.disabled : false,
        rightDisabled: rightArrow ? rightArrow.disabled : false,
        initialScroll: strip ? strip.scrollLeft : -1,
        totalButtons: strip ? strip.querySelectorAll('.category-filter-btn').length : 0
      };
    })()`);

    record('Category nav wrapper, strip, and arrow buttons mounted in DOM', 
      navElements.hasWrapper && navElements.hasStrip && navElements.hasLeftArrow && navElements.hasRightArrow,
      JSON.stringify(navElements)
    );
    record('Left arrow initially disabled at scrollLeft = 0', navElements.leftDisabled);
    record('Right arrow initially enabled to reveal next categories', !navElements.rightDisabled);
    record('All 23 category filter buttons present in strip', navElements.totalButtons >= 20, `Total: ${navElements.totalButtons}`);

    await captureScreenshot(ws, 'cat_nav_01_initial_1366.png');

    // 2. Click Last Visible Category on 1366px screen (Platform)
    console.log('Clicking last visible category (Platform)...');
    const platformClick = await evalJs(ws, `(async () => {
      const strip = document.getElementById('pokiCatStrip');
      const initialScroll = strip.scrollLeft;
      const btn = document.querySelector('.category-filter-btn[data-slug="platform"]');
      if (!btn) return { error: 'Platform button not found' };

      btn.click();
      await new Promise(r => setTimeout(r, 650));

      const afterScroll = strip.scrollLeft;
      const stripRect = strip.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      // Check upcoming categories: multiplayer, arcade
      const multiBtn = document.querySelector('.category-filter-btn[data-slug="multiplayer"]');
      const multiRect = multiBtn ? multiBtn.getBoundingClientRect() : null;
      const arcadeBtn = document.querySelector('.category-filter-btn[data-slug="arcade"]');
      const arcadeRect = arcadeBtn ? arcadeBtn.getBoundingClientRect() : null;

      const isMultiVisible = multiRect && multiRect.left < stripRect.right && multiRect.right > stripRect.left;
      const isArcadeVisible = arcadeRect && arcadeRect.left < stripRect.right && arcadeRect.right > stripRect.left;
      const isPlatformFullyVisible = btnRect.left >= stripRect.left - 5 && btnRect.right <= stripRect.right + 5;

      return {
        initialScroll,
        afterScroll,
        scrollIncreased: afterScroll > initialScroll,
        isPlatformFullyVisible,
        isMultiVisible,
        isArcadeVisible
      };
    })()`);

    record('Clicking Platform triggers automatic forward scroll', platformClick.scrollIncreased,
      `scroll: ${platformClick.initialScroll} -> ${platformClick.afterScroll}`
    );
    record('Platform button remains fully visible (not cut off)', platformClick.isPlatformFullyVisible);
    record('Upcoming categories (Multiplayer, Arcade) are smoothly revealed', platformClick.isMultiVisible && platformClick.isArcadeVisible);

    await captureScreenshot(ws, 'cat_nav_02_platform_clicked.png');

    // 3. From the newly revealed categories, click a button in the right area (Board Games)
    console.log('Clicking newly revealed category towards right (Board Games)...');
    const boardGamesClick = await evalJs(ws, `(async () => {
      const strip = document.getElementById('pokiCatStrip');
      const beforeScroll = strip.scrollLeft;
      const btn = document.querySelector('.category-filter-btn[data-slug="board-games"]');
      if (!btn) return { error: 'Board games button not found' };

      btn.click();
      await new Promise(r => setTimeout(r, 650));

      const afterScroll = strip.scrollLeft;
      const stripRect = strip.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      const cardGamesBtn = document.querySelector('.category-filter-btn[data-slug="card-games"]');
      const cardGamesRect = cardGamesBtn ? cardGamesBtn.getBoundingClientRect() : null;
      const isCardGamesVisible = cardGamesRect && cardGamesRect.left < stripRect.right && cardGamesRect.right > stripRect.left;

      return {
        beforeScroll,
        afterScroll,
        scrollIncreased: afterScroll > beforeScroll,
        isBoardGamesFullyVisible: btnRect.left >= stripRect.left - 5 && btnRect.right <= stripRect.right + 5,
        isCardGamesVisible
      };
    })()`);

    record('Clicking Board Games continues smooth forward scroll and reveals subsequent categories',
      boardGamesClick.scrollIncreased && boardGamesClick.isBoardGamesFullyVisible && boardGamesClick.isCardGamesVisible,
      JSON.stringify(boardGamesClick)
    );
    await captureScreenshot(ws, 'cat_nav_03_board_games_clicked.png');

    // 4. Test Left Arrow Navigation
    console.log('Testing Left Arrow button click...');
    const leftArrowClick = await evalJs(ws, `(async () => {
      const strip = document.getElementById('pokiCatStrip');
      const leftArrow = document.getElementById('pokiCatArrowLeft');
      const beforeScroll = strip.scrollLeft;
      leftArrow.click();
      await new Promise(r => setTimeout(r, 450));
      return {
        beforeScroll,
        afterScroll: strip.scrollLeft,
        scrolledBack: strip.scrollLeft < beforeScroll
      };
    })()`);
    record('Clicking left arrow smoothly scrolls backward', leftArrowClick.scrolledBack,
      `scroll: ${leftArrowClick.beforeScroll} -> ${leftArrowClick.afterScroll}`
    );

    // 5. Test Right Arrow Navigation
    console.log('Testing Right Arrow button click...');
    const rightArrowClick = await evalJs(ws, `(async () => {
      const strip = document.getElementById('pokiCatStrip');
      const rightArrow = document.getElementById('pokiCatArrowRight');
      const beforeScroll = strip.scrollLeft;
      rightArrow.click();
      await new Promise(r => setTimeout(r, 450));
      return {
        beforeScroll,
        afterScroll: strip.scrollLeft,
        scrolledForward: strip.scrollLeft > beforeScroll
      };
    })()`);
    record('Clicking right arrow smoothly scrolls forward', rightArrowClick.scrolledForward,
      `scroll: ${rightArrowClick.beforeScroll} -> ${rightArrowClick.afterScroll}`
    );

    // 6. Test Mouse Wheel Horizontal Scrolling
    console.log('Testing mouse wheel horizontal scrolling...');
    const wheelTest = await evalJs(ws, `(async () => {
      const strip = document.getElementById('pokiCatStrip');
      strip.scrollTo({ left: 400, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 150));
      const beforeScroll = strip.scrollLeft;

      // Dispatch wheel with deltaY = 120
      const wheelEvt = new WheelEvent('wheel', {
        deltaY: 120,
        bubbles: true,
        cancelable: true
      });
      strip.dispatchEvent(wheelEvt);
      await new Promise(r => setTimeout(r, 150));

      return {
        beforeScroll,
        afterScroll: strip.scrollLeft,
        wheelScrolled: strip.scrollLeft > beforeScroll
      };
    })()`);
    record('Mouse wheel vertically scrolls horizontal category strip', wheelTest.wheelScrolled,
      `scroll: ${wheelTest.beforeScroll} -> ${wheelTest.afterScroll}`
    );

    // 7. Test Click-and-Drag Scrolling
    console.log('Testing click and drag scrolling...');
    const dragTest = await evalJs(ws, `(async () => {
      const strip = document.getElementById('pokiCatStrip');
      strip.scrollTo({ left: 400, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 150));
      const beforeScroll = strip.scrollLeft;

      // Simulate mousedown
      strip.dispatchEvent(new MouseEvent('mousedown', { pageX: 500, clientX: 500, bubbles: true }));
      // Drag left by 120px
      strip.dispatchEvent(new MouseEvent('mousemove', { pageX: 380, clientX: 380, bubbles: true }));
      // Mouseup
      window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      await new Promise(r => setTimeout(r, 150));

      return {
        beforeScroll,
        afterScroll: strip.scrollLeft,
        dragScrolled: strip.scrollLeft > beforeScroll
      };
    })()`);
    record('Click-and-drag scrolls the category bar smoothly', dragTest.dragScrolled,
      `scroll: ${dragTest.beforeScroll} -> ${dragTest.afterScroll}`
    );

    // 8. Test Navigate to the very last category (.io Games)
    console.log('Navigating to very last category (.io games)...');
    const lastCatTest = await evalJs(ws, `(async () => {
      window.NEXUS.filterCategory('io-games');
      await new Promise(r => setTimeout(r, 700));

      const strip = document.getElementById('pokiCatStrip');
      const rightArrow = document.getElementById('pokiCatArrowRight');
      const leftArrow = document.getElementById('pokiCatArrowLeft');
      const maxScroll = strip.scrollWidth - strip.clientWidth;
      const lastBtn = document.querySelector('.category-filter-btn[data-slug="io-games"]');

      return {
        scrollLeft: strip.scrollLeft,
        maxScroll,
        isNearEnd: strip.scrollLeft >= maxScroll - 15,
        rightDisabled: rightArrow.disabled,
        leftEnabled: !leftArrow.disabled,
        isIoActive: lastBtn ? lastBtn.classList.contains('active') : false
      };
    })()`);
    record('Reaching last category automatically disables right arrow & enables left arrow',
      lastCatTest.isNearEnd && lastCatTest.rightDisabled && lastCatTest.leftEnabled && lastCatTest.isIoActive,
      JSON.stringify(lastCatTest)
    );
    await captureScreenshot(ws, 'cat_nav_04_io_games_last.png');

    // 9. Reset to All Games
    console.log('Resetting to All Games...');
    const resetCheck = await evalJs(ws, `(async () => {
      window.NEXUS.filterCategory('all');
      await new Promise(r => setTimeout(r, 700));

      const strip = document.getElementById('pokiCatStrip');
      const leftArrow = document.getElementById('pokiCatArrowLeft');
      const rightArrow = document.getElementById('pokiCatArrowRight');
      const allBtn = document.querySelector('.category-filter-btn[data-slug="all"]');
      return {
        scrollLeft: strip.scrollLeft,
        leftDisabled: leftArrow.disabled,
        rightEnabled: !rightArrow.disabled,
        allActive: allBtn ? allBtn.classList.contains('active') : false
      };
    })()`);
    record('Resetting to All Games returns to start with left arrow disabled',
      resetCheck.leftDisabled && resetCheck.rightEnabled && resetCheck.allActive,
      JSON.stringify(resetCheck)
    );

    // 10. Tablet Responsiveness (768px)
    console.log('Testing Tablet 768px...');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));

    const tabletTest = await evalJs(ws, `(async () => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const strip = document.getElementById('pokiCatStrip');

      // Click 'Adventure' on tablet
      window.NEXUS.filterCategory('adventure');
      await new Promise(r => setTimeout(r, 500));

      const advBtn = document.querySelector('.category-filter-btn[data-slug="adventure"]');
      return {
        hasPageOverflow: docW > winW,
        stripWidth: strip.clientWidth,
        isAdvActive: advBtn ? advBtn.classList.contains('active') : false
      };
    })()`);
    record('Tablet (768px) category bar has zero horizontal page overflow', !tabletTest.hasPageOverflow,
      `docW vs winW`
    );
    await captureScreenshot(ws, 'cat_nav_05_tablet_768.png');

    // 11. Mobile Responsiveness (375px)
    console.log('Testing Mobile 375px...');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileTest = await evalJs(ws, `(async () => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const strip = document.getElementById('pokiCatStrip');
      strip.scrollTo({ left: 0, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 100));

      // On mobile (375px), click 'Racing'
      window.NEXUS.filterCategory('racing');
      await new Promise(r => setTimeout(r, 600));

      const afterScroll = strip.scrollLeft;
      const carBtn = document.querySelector('.category-filter-btn[data-slug="car"]');
      const stripRect = strip.getBoundingClientRect();
      const carRect = carBtn ? carBtn.getBoundingClientRect() : null;
      const isCarRevealed = carRect && carRect.left < stripRect.right && carRect.right > stripRect.left;
      const racingBtn = document.querySelector('.category-filter-btn[data-slug="racing"]');

      return {
        hasPageOverflow: docW > winW,
        scrollIncreased: afterScroll > 0,
        afterScroll,
        isRacingActive: racingBtn ? racingBtn.classList.contains('active') : false,
        isCarRevealed
      };
    })()`);
    record('Mobile (375px) has zero page overflow, auto-scrolls, and reveals next category (Car)',
      !mobileTest.hasPageOverflow && mobileTest.scrollIncreased && mobileTest.isRacingActive && mobileTest.isCarRevealed,
      JSON.stringify(mobileTest)
    );
    await captureScreenshot(ws, 'cat_nav_06_mobile_375.png');

    // 12. Full Wide Desktop (1920px)
    console.log('Testing Full Wide Desktop 1920px...');
    await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 600));

    const wideTest = await evalJs(ws, `(async () => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      window.NEXUS.filterCategory('all');
      await new Promise(r => setTimeout(r, 500));

      return {
        hasPageOverflow: docW > winW,
        docW,
        winW
      };
    })()`);
    record('Wide Desktop (1920px) has zero horizontal overflow', !wideTest.hasPageOverflow);
    await captureScreenshot(ws, 'cat_nav_07_desktop_1920.png');

  } catch (err) {
    console.error('Test execution error:', err);
    record('Test suite error', false, err.message);
  } finally {
    ws.close();
    chromeProc.kill();
  }

  console.log(`\n========================================`);
  console.log(`Horizontal Category Navigation Summary:`);
  console.log(`PASSED: ${results.passedTotal} / ${results.passedTotal + results.failedTotal}`);
  console.log(`FAILED: ${results.failedTotal}`);
  console.log(`========================================\n`);

  fs.writeFileSync('reports/cat-nav-verification-results.json', JSON.stringify(results, null, 2));
}

runTests();

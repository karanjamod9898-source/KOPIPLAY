const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:8080/';

async function run() {
  console.log('=== VERIFYING TOWER BUILDER BLOCK COLOR SYSTEM ===\n');

  const userDataDir = path.join(process.cwd(), '.chrome-tmp-color-test');
  const chromeProc = spawn(CHROME_PATH, [
    '--remote-debugging-port=9223',
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,900'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const jsonTargets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9223/json', res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = jsonTargets.find(t => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  let reqId = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = reqId++;
    const handler = evt => {
      const resp = JSON.parse(evt.data.toString('utf8'));
      if (resp.id === id) {
        ws.removeEventListener('message', handler);
        if (resp.error) reject(new Error(resp.error.message));
        else resolve(resp.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const evalJs = async expr => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return res && res.result ? res.result.value : null;
  };

  const results = { passed: 0, failed: 0, tests: [] };
  const record = (name, ok, details = '') => {
    if (ok) {
      results.passed++;
      console.log(`[PASS] ${name}${details ? ` - ${details}` : ''}`);
    } else {
      results.failed++;
      console.error(`[FAIL] ${name}${details ? ` - ${details}` : ''}`);
    }
    results.tests.push({ name, ok, details });
  };

  await send('Page.enable');
  await send('Runtime.enable');

  const consoleErrors = [];
  ws.addEventListener('message', evt => {
    const data = JSON.parse(evt.data.toString('utf8'));
    if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
      const text = data.params.args.map(a => a.value || a.description).join(' ');
      consoleErrors.push(text);
    }
  });

  // Navigate to Tower Builder
  console.log('Loading Tower Builder game...');
  await send('Page.navigate', { url: BASE_URL + 'games/tower-builder/index.html' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Verify VIBRANT_PALETTE is loaded
  const paletteCheck = await evalJs(`(() => {
    return {
      hasPalette: typeof VIBRANT_PALETTE !== 'undefined',
      length: typeof VIBRANT_PALETTE !== 'undefined' ? VIBRANT_PALETTE.length : 0,
      names: typeof VIBRANT_PALETTE !== 'undefined' ? VIBRANT_PALETTE.map(p => p.name) : []
    };
  })()`);

  record('Palette: VIBRANT_PALETTE defined with vibrant colors', paletteCheck.hasPalette && paletteCheck.length >= 10, `Found ${paletteCheck.length} colors: ${paletteCheck.names.slice(0, 5).join(', ')}...`);

  // 2. Start Game
  console.log('\nStarting game...');
  await evalJs(`document.getElementById('btnStartGame').click();`);
  await new Promise(r => setTimeout(r, 600));

  // 3. Inspect Base Block (Layer 0) and Face Shading
  const baseBlockData = await evalJs(`(() => {
    const game = window.towerGame;
    if (!game || !game.stack[0]) return null;
    const baseMesh = game.stack[0].mesh;
    const mats = baseMesh.material;
    const isArray = Array.isArray(mats);
    
    let topHex = '', frontHex = '', rightHex = '';
    let topLight = 0, frontLight = 0, rightLight = 0;
    
    if (isArray && mats.length === 6) {
      // 0: right (+X), 2: top (+Y), 4: front (+Z)
      rightHex = '#' + mats[0].color.getHexString();
      topHex = '#' + mats[2].color.getHexString();
      frontHex = '#' + mats[4].color.getHexString();
      
      const hslTop = {}; mats[2].color.getHSL(hslTop); topLight = hslTop.l;
      const hslFront = {}; mats[4].color.getHSL(hslFront); frontLight = hslFront.l;
      const hslRight = {}; mats[0].color.getHSL(hslRight); rightLight = hslRight.l;
    }
    
    return {
      isArray,
      count: isArray ? mats.length : 1,
      topHex,
      frontHex,
      rightHex,
      topLight,
      frontLight,
      rightLight,
      topIsLighter: topLight > frontLight,
      rightIsDarker: rightLight < frontLight
    };
  })()`);

  record('Face Shading: Box uses 6 independent materials for faces', baseBlockData && baseBlockData.isArray && baseBlockData.count === 6);
  record('Face Shading: Top face (+Y) is illuminated lighter than front', baseBlockData && baseBlockData.topIsLighter, `Top L: ${baseBlockData.topLight.toFixed(2)}, Front L: ${baseBlockData.frontLight.toFixed(2)}`);
  record('Face Shading: Right face (+X) is shaded darker for 3D depth', baseBlockData && baseBlockData.rightIsDarker, `Right L: ${baseBlockData.rightLight.toFixed(2)}, Front L: ${baseBlockData.frontLight.toFixed(2)}`);

  // 4. Inspect Active Moving Block (Layer 1) BEFORE drop
  const activeBlockData1 = await evalJs(`(() => {
    const game = window.towerGame;
    if (!game || !game.activeBlock) return null;
    const baseColor = '#' + game.stack[0].color.getHexString();
    const activeColor = '#' + game.activeBlock.color.getHexString();
    return {
      baseColor,
      activeColor,
      areDifferent: baseColor !== activeColor
    };
  })()`);

  record('Spawn: Moving block 1 has a different color from base block 0', activeBlockData1 && activeBlockData1.areDifferent, `Base: ${activeBlockData1.baseColor}, Moving: ${activeBlockData1.activeColor}`);

  // 5. Stack Multiple Blocks and Track Historical Colors
  console.log('\n--- Stacking consecutive blocks and tracking color persistence ---');
  const historyColors = [];

  for (let step = 1; step <= 8; step++) {
    // Wait until block is near center (alignment)
    await evalJs(`(() => {
      return new Promise(resolve => {
        const checkAlign = () => {
          const game = window.towerGame;
          if (!game || !game.activeBlock) return resolve();
          const prev = game.stack[game.stack.length - 1];
          const curr = game.activeBlock;
          const axis = curr.axis;
          const delta = (axis === 'x') ? (curr.mesh.position.x - prev.x) : (curr.mesh.position.z - prev.z);
          // Drop when fairly well aligned (< 0.4)
          if (Math.abs(delta) < 0.4) {
            game.dropBlock();
            resolve();
          } else {
            requestAnimationFrame(checkAlign);
          }
        };
        checkAlign();
      });
    })()`);

    await new Promise(r => setTimeout(r, 600));

    // Check stack state
    const currentStack = await evalJs(`(() => {
      const game = window.towerGame;
      return game.stack.map((b, i) => ({
        layer: i,
        colorHex: '#' + b.color.getHexString(),
        frontHex: '#' + (Array.isArray(b.mesh.material) ? b.mesh.material[4].color.getHexString() : b.mesh.material.color.getHexString())
      }));
    })()`);

    historyColors.push(currentStack);

    const latestPlaced = currentStack[currentStack.length - 1];
    const prevPlaced = currentStack[currentStack.length - 2];
    record(`Stack Layer ${step}: Placed block has vibrant color`, latestPlaced.colorHex !== prevPlaced.colorHex, `Color: ${latestPlaced.colorHex} (previous: ${prevPlaced.colorHex})`);

    // Verify all prior blocks in stack retained their colors
    let priorUnchanged = true;
    if (step > 1) {
      const priorSnapshot = historyColors[step - 2];
      for (let j = 0; j < priorSnapshot.length; j++) {
        if (priorSnapshot[j].colorHex !== currentStack[j].colorHex) {
          priorUnchanged = false;
          break;
        }
      }
    }
    record(`Persistence Layer ${step}: All previous blocks retain original colors permanently`, priorUnchanged);
  }

  // 6. Verify full color variety across stacked tower
  const finalTowerAnalysis = await evalJs(`(() => {
    const game = window.towerGame;
    const colors = game.stack.map(b => '#' + b.color.getHexString());
    const uniqueColors = new Set(colors);
    return {
      totalBlocks: colors.length,
      uniqueCount: uniqueColors.size,
      colors
    };
  })()`);

  record('Variety: Tower contains high diversity of vibrant colors', finalTowerAnalysis.uniqueCount >= 7, `${finalTowerAnalysis.uniqueCount} unique colors across ${finalTowerAnalysis.totalBlocks} blocks`);

  // 7. Capture screenshot of multi-colored tower
  const snapTower = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('reports/tb_vibrant_colors_tower.png', Buffer.from(snapTower.data, 'base64'));
  console.log('Saved screenshot to reports/tb_vibrant_colors_tower.png');

  // Copy to brain artifacts folder
  const brainDest = path.join('C:\\Users\\admin\\.gemini\\antigravity\\brain\\d1fae908-a051-4700-97b3-fa2bb1baafdf', 'tb_vibrant_colors_tower.png');
  fs.writeFileSync(brainDest, Buffer.from(snapTower.data, 'base64'));

  // 8. Console Error check
  const critical = consoleErrors.filter(e => !e.includes('favicon'));
  record('Console: Zero runtime errors', critical.length === 0, critical.join('; '));

  ws.close();
  try { chromeProc.kill(); } catch (e) {}
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}

  console.log(`\n=== TEST SUMMARY: ${results.passed} PASSED, ${results.failed} FAILED ===`);
  if (results.failed > 0) process.exit(1);
}

run().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});

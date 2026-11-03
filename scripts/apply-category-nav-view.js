const fs = require('fs');
const path = require('path');

const builderPath = path.join(__dirname, 'build-complete-bundle.js');
let builder = fs.readFileSync(builderPath, 'utf8').replace(/\r\n/g, '\n');

function prepareForBuilder(snippet) {
  return snippet
    .replace(/\r\n/g, '\n')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

const catNavRaw = fs.readFileSync(path.join(__dirname, 'snippets/category-nav-view.txt'), 'utf8');
const catNavPrepared = prepareForBuilder(catNavRaw);

const oldTargetStart = '    const html = \\`\n      <div style="margin-bottom: 24px;">\n        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">';
const oldTargetEnd = '  // --- Monetization & Reusable Ad Slot Component ---';

const startIdx = builder.indexOf(oldTargetStart);
const endIdx = builder.indexOf(oldTargetEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: Could not find target chunk', startIdx, endIdx);
  process.exit(1);
}

builder = builder.substring(0, startIdx) + catNavPrepared + '\n\n  ' + builder.substring(endIdx);

fs.writeFileSync(builderPath, builder, 'utf8');
console.log('Successfully updated builder with category nav view & engine!');


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

// 1. Ads Engine Snippet
const adsEngineRaw = fs.readFileSync(path.join(__dirname, 'snippets/ads-engine.txt'), 'utf8');
const adsEnginePrepared = prepareForBuilder(adsEngineRaw);

const oldAdsStart = '// --- Google AdSense Engine (Prepared, Inactive by Default) ---';
const oldAdsEnd = '// --- Analytics Engine (Configurable, Zero Tracking when Disabled) ---';

const startAdsIdx = builder.indexOf(oldAdsStart);
const endAdsIdx = builder.indexOf(oldAdsEnd);

if (startAdsIdx === -1 || endAdsIdx === -1) {
  console.error('ERROR: Could not find old ads chunk');
  process.exit(1);
}

builder = builder.substring(0, startAdsIdx) + adsEnginePrepared + '\n\n  ' + builder.substring(endAdsIdx);
console.log('1. Ads engine applied successfully!');

// 2. Homepage Ads Snippet
const homeAdsRaw = fs.readFileSync(path.join(__dirname, 'snippets/home-ads.txt'), 'utf8');
const homeAdsPrepared = prepareForBuilder(homeAdsRaw);

const oldHomeStart = '    // Remaining Explore Games: Complete catalog coverage';
const oldHomeEnd = '    main.innerHTML = html;\n    window.scrollTo({ top: 0, behavior: \'instant\' });\n  }';

const startHomeIdx = builder.indexOf(oldHomeStart);
const endHomeIdx = builder.indexOf(oldHomeEnd);

if (startHomeIdx === -1 || endHomeIdx === -1) {
  console.error('ERROR: Could not find homepage chunk');
  process.exit(1);
}

builder = builder.substring(0, startHomeIdx) + homeAdsPrepared + '\n\n' + builder.substring(endHomeIdx);
console.log('2. Homepage ads applied successfully!');

// 3. Game Detail 3-Column Ads Snippet
const detailAdsRaw = fs.readFileSync(path.join(__dirname, 'snippets/detail-ads.txt'), 'utf8');
const detailAdsPrepared = prepareForBuilder(detailAdsRaw);

const oldDetailStart = '      <!-- Main Game Detail Layout: 16:9 Cinematic Player on Left, Professional Ad Container on Right -->';
const oldDetailEnd = '      <!-- Related Games Strip (Matches Bottom of Reference Player Panel) -->';

const startDetailIdx = builder.indexOf(oldDetailStart);
const endDetailIdx = builder.indexOf(oldDetailEnd);

if (startDetailIdx === -1 || endDetailIdx === -1) {
  console.error('ERROR: Could not find game detail chunk');
  process.exit(1);
}

builder = builder.substring(0, startDetailIdx) + detailAdsPrepared + '\n\n' + builder.substring(endDetailIdx);
console.log('3. Game detail 3-column ads applied successfully!');

// 4. Update window exports
builder = builder.replace(
  'window.NEXUS = {',
  'window.kopiAds = kopiAds;\n  window.NEXUS = {\n    ads: kopiAds,\n    configureAds: kopiAds.configure,'
);

// 5. Save updated builder
fs.writeFileSync(builderPath, builder, 'utf8');
console.log('Successfully written updated build-complete-bundle.js');

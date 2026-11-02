const fs = require('fs');

let bundleScript = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// Replace KipoPlay with KopiPlay (preserving domain references like https://kipo.in)
// Let's replace KipoPlay with KopiPlay
bundleScript = bundleScript.replace(/KipoPlay/g, 'KopiPlay');
bundleScript = bundleScript.replace(/kipoplay/g, 'kopiplay');

// Update global window exports to include KOPI
bundleScript = bundleScript.replace(/window\.KIPO\s*=\s*window\.NEXUS/g, 'window.KOPI = window.KIPO = window.NEXUS');
bundleScript = bundleScript.replace(/window\.KIPO_CATALOG\s*\|\|\s*window\.NEXUS_CATALOG/g, 'window.KOPI_CATALOG || window.KIPO_CATALOG || window.NEXUS_CATALOG');
bundleScript = bundleScript.replace(/window\.KIPO_CATEGORIES\s*\|\|\s*window\.NEXUS_CATEGORIES/g, 'window.KOPI_CATEGORIES || window.KIPO_CATEGORIES || window.NEXUS_CATEGORIES');

// Modal root support
bundleScript = bundleScript.replace(/'kipo-modal-root'/g, "'kopi-modal-root'");

fs.writeFileSync('scripts/build-complete-bundle.js', bundleScript, 'utf8');
console.log('scripts/build-complete-bundle.js updated successfully.');


const fs = require('fs');
let code = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

const target = `    }};
      if (label) label.textContent = displayMap[next];
    },`;

if (code.includes(target)) {
  code = code.replace(target, `    },`);
  fs.writeFileSync('scripts/build-complete-bundle.js', code, 'utf8');
  console.log('Fixed target in build-complete-bundle.js');
} else {
  console.log('Target not found, checking with looser match...');
  const idx = code.indexOf('if (label) label.textContent = displayMap[next];');
  if (idx !== -1) {
    const s = code.lastIndexOf('}};', idx);
    const e = code.indexOf('goBack: function', idx);
    console.log('Replacing from', s, 'to', e);
    code = code.slice(0, s) + `    },\n\n    ` + code.slice(e);
    fs.writeFileSync('scripts/build-complete-bundle.js', code, 'utf8');
    console.log('Successfully cleaned up leftover code');
  }
}


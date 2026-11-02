const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

const faulty = `    return \`
      <div class="category-quick-bar" aria-label="Quick Category Filter">
        \${quickCategories.map(c => \`
          <a href="\${c.href}" class="category-quick-pill \${activeSlug === c.slug ? 'active' : ''}">
            <span>\${c.icon}</span>
            <span>\${c.name}</span>
          </a>
        \`).join('')}
      </div>
    \`;`;

const fixed = `    return \\\`
      <div class="category-quick-bar" aria-label="Quick Category Filter">
        \\\${quickCategories.map(c => \\\`
          <a href="\\\${c.href}" class="category-quick-pill \\\${activeSlug === c.slug ? 'active' : ''}">
            <span>\\\${c.icon}</span>
            <span>\\\${c.name}</span>
          </a>
        \\\`).join('')}
      </div>
    \\\`;`;

content = content.replace(faulty, fixed);
fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
console.log('Fixed escaped backticks in renderCategoryQuickBar');


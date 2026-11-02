const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\online game';
const skipDirs = ['node_modules', '.git', '.system_generated', 'tmp', '.gemini', 'reports', 'scripts'];

function walk(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (skipDirs.includes(item)) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = walk(projectDir);

const brandMatches = [];

for (const file of allFiles) {
  const rel = path.relative(projectDir, file).replace(/\\/g, '/');
  const ext = path.extname(file).toLowerCase();
  if (!['.html', '.js', '.json', '.xml', '.txt', '.css', '.md', '.svg', '.webmanifest'].includes(ext)) continue;

  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((l, idx) => {
    // Check for KipoPlay / KIPO / NEXUSPLAY (ignoring domain kipo.in and backward compatibility alias like NEXUS_CATALOG)
    const lineWithoutDomain = l.replace(/kipo\.in/gi, '');
    const m = lineWithoutDomain.match(/\b(nexusplay|nexus\s*play|kipoplay|kipo\s*play)\b/gi);
    if (m) {
      brandMatches.push({
        file: rel,
        line: idx + 1,
        match: m[0],
        snippet: l.trim().slice(0, 120)
      });
    }
  });
}

console.log('Total outdated brand matches found:', brandMatches.length);
brandMatches.forEach(b => console.log(`${b.file}:${b.line} [${b.match}] -> ${b.snippet}`));


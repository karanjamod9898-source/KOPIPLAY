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

const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
const pubRegex = /(ca-pub-[0-9]+|G-[A-Z0-9]+|UA-[0-9]+-[0-9]+)/gi;
const phoneRegex = /(\+?[0-9]{1,3}[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g;

const findings = {
  emails: [],
  adAndAnalyticsIds: [],
  phones: []
};

for (const file of allFiles) {
  const rel = path.relative(projectDir, file).replace(/\\/g, '/');
  let content = '';
  try { content = fs.readFileSync(file, 'utf8'); } catch(e) { continue; }

  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    let m;
    while ((m = emailRegex.exec(l)) !== null) {
      findings.emails.push({ file: rel, line: idx + 1, email: m[0], snippet: l.trim().slice(0, 100) });
    }
    while ((m = pubRegex.exec(l)) !== null) {
      findings.adAndAnalyticsIds.push({ file: rel, line: idx + 1, id: m[0], snippet: l.trim().slice(0, 100) });
    }
  });
}

console.log('--- EMAILS FOUND ---');
findings.emails.forEach(e => console.log(e.file + ':' + e.line + ' -> ' + e.email));

console.log('\n--- AD / ANALYTICS IDS ---');
findings.adAndAnalyticsIds.forEach(a => console.log(a.file + ':' + a.line + ' -> ' + a.id));


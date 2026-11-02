const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\online game';

const skipDirs = ['node_modules', '.git', '.system_generated', 'tmp', '.gemini'];

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
console.log('Total files found to scan:', allFiles.length);

const results = {
  brandNames: [],
  domains: [],
  seoAndMeta: [],
  potentialSecrets: [],
  deploymentSettings: []
};

// Patterns
const brandPattern = /\b(nexusplay|nexus\s*play|kipoplay|kipo\s*play|kipo)\b/gi;
const domainPattern = /(https?:\/\/[^\s"'`<>]+|kipo\.in[^\s"'`<>]*|[a-zA-Z0-9-]+\.github\.io[^\s"'`<>]*)/gi;
const secretPattern = /(api_key|apikey|secret|password|passwd|private_key|auth_token|bearer|token)["']?\s*[:=]\s*["']([^"']{8,})["']/gi;

for (const file of allFiles) {
  const relPath = path.relative(projectDir, file).replace(/\\/g, '/');
  
  // Skip report files from scanning themselves if they are generated reports
  if (relPath.startsWith('reports/')) continue;
  if (relPath.startsWith('scripts/')) continue; // Scan codebase, not inspection scripts

  const ext = path.extname(file).toLowerCase();
  if (!['.html', '.js', '.json', '.xml', '.txt', '.css', '.md', '.svg', '.webmanifest'].includes(ext)) {
    continue;
  }

  let content = '';
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch(e) {
    continue;
  }

  const lines = content.split('\n');

  // 1. Brand scanning
  let fileBrandMatches = [];
  lines.forEach((line, idx) => {
    let m;
    while ((m = brandPattern.exec(line)) !== null) {
      fileBrandMatches.push({
        line: idx + 1,
        match: m[0],
        snippet: line.trim().slice(0, 120)
      });
    }
  });
  if (fileBrandMatches.length > 0) {
    results.brandNames.push({ file: relPath, count: fileBrandMatches.length, samples: fileBrandMatches.slice(0, 10) });
  }

  // 2. Domain scanning
  let fileDomainMatches = [];
  lines.forEach((line, idx) => {
    let m;
    while ((m = domainPattern.exec(line)) !== null) {
      const matchStr = m[0];
      if (matchStr.includes('kipo.in') || matchStr.includes('github.io') || matchStr.includes('nexusplay')) {
        fileDomainMatches.push({
          line: idx + 1,
          domain: matchStr,
          snippet: line.trim().slice(0, 120)
        });
      }
    }
  });
  if (fileDomainMatches.length > 0) {
    results.domains.push({ file: relPath, count: fileDomainMatches.length, samples: fileDomainMatches.slice(0, 10) });
  }

  // 3. Secrets scanning
  lines.forEach((line, idx) => {
    let m;
    while ((m = secretPattern.exec(line)) !== null) {
      results.potentialSecrets.push({
        file: relPath,
        line: idx + 1,
        key: m[1],
        snippet: line.trim().slice(0, 100)
      });
    }
  });
}

fs.writeFileSync('scripts/handover-scan-results.json', JSON.stringify(results, null, 2));
console.log('Scan complete. Summary:');
console.log('Files with old brand names:', results.brandNames.length);
console.log('Files with hardcoded domains (kipo.in / github.io):', results.domains.length);
console.log('Potential secrets found:', results.potentialSecrets.length);


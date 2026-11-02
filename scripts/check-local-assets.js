const fs = require('fs');

const dirs = ['cyber-snake', 'dungeon-quest', 'neon-breakout', 'neon-racer', 'pulse-2048', 'slam-dunk', 'space-defender'];
dirs.forEach(d => {
  const content = fs.readFileSync(`games/${d}/index.html`, 'utf8');
  const httpMatches = content.match(/https?:\/\/[^\s"'<>]+/gi) || [];
  console.log(`${d}: external URLs count = ${httpMatches.length}`, httpMatches);
  const audioMatches = content.match(/AudioContext|webkitAudioContext|createOscillator/g) || [];
  console.log(`  Audio API calls: ${audioMatches.length}`);
});


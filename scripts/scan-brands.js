const fs = require('fs');
const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

const brands = [
  'temple run', 'angry bird', 'subway', 'mario', 'sonic', 'pokemon', 'flappy',
  'tetris', 'tetrix', 'minecraft', 'pacman', 'pac-man', 'gta', 'grand theft',
  'urus', 'charger', 'bmw', 'mercedes', 'ferrari', 'lamborghini', 'porsche',
  'audi', 'ford', 'mustang', 'bugatti', 'nissan', 'toyota', 'honda', 'corvette',
  'fifa', 'nba', 'nfl', 'disney', 'marvel', 'spiderman', 'spider-man', 'batman',
  'superman', 'barbie', 'frozen', 'elsa', 'minion', 'roblox', 'among us',
  'geometry dash', 'candy crush', 'clash of clans', 'pubg', 'call of duty',
  'counter strike', 'zelda', 'assassin'
];

const matches = [];

games.forEach(g => {
  const fullText = (g.title + ' ' + g.slug + ' ' + g.description + ' ' + (g.tags || []).join(' ')).toLowerCase();
  brands.forEach(b => {
    if (fullText.includes(b)) {
      matches.push({
        brand: b,
        id: g.id,
        title: g.title,
        dev: g.developer,
        url: g.gameUrl
      });
    }
  });
});

console.log(`Total brand/IP matches found: ${matches.length}`);
matches.forEach(m => {
  console.log(`- [${m.brand.toUpperCase()}] ${m.id} | "${m.title}" | Dev: ${m.dev} | URL: ${m.url}`);
});


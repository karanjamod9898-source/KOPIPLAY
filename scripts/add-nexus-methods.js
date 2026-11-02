const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

const anchor = '  window.KIPO = window.NEXUS = {';
const replacement = `  window.KOPI = window.KIPO = window.NEXUS = {
    playRandomGame: function () {
      if (!catalog || catalog.length === 0) return;
      const randomIndex = Math.floor(Math.random() * catalog.length);
      const randomGame = catalog[randomIndex];
      showToast('Launching ' + randomGame.title + '...', '🎲');
      window.location.hash = '#/game/' + randomGame.slug;
    },

    shareGame: function (slug, title) {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Game link copied to clipboard!', '🔗');
        }).catch(() => {
          showToast('Game URL: ' + url, '🔗');
        });
      } else {
        showToast('Game URL: ' + url, '🔗');
      }
    },`;

if (content.includes(anchor)) {
  content = content.replace(anchor, replacement);
  fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
  console.log('Successfully added playRandomGame and shareGame to window.NEXUS');
} else {
  console.error('Could not find anchor: ' + anchor);
}


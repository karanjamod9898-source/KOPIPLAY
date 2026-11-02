const fs = require('fs');
let code = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// Update window.NEXUS methods
const nexusPos = code.indexOf('window.NEXUS = {');
const nexusEnd = code.indexOf('};', nexusPos);

const updatedNexusMethods = `window.NEXUS = {
    playRandomGame: function () {
      if (!catalog || catalog.length === 0) return;
      const randomIndex = Math.floor(Math.random() * catalog.length);
      const randomGame = catalog[randomIndex];
      showToast('Launching ' + randomGame.title + '...', '🎲');
      window.location.hash = '#/game/' + randomGame.slug;
    },

    focusGame: function () {
      const stage = document.getElementById('playerStageCard') || document.getElementById('playerContainer');
      if (stage) {
        stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const iframe = stage.querySelector('iframe');
        if (iframe) {
          setTimeout(() => { iframe.focus(); }, 350);
        }
      }
    },

    toggleFullscreen: function () {
      const container = document.getElementById('playerStageCard') || document.getElementById('playerContainer');
      if (!container) return;

      const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      if (!isFs) {
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
        else if (container.mozRequestFullScreen) container.mozRequestFullScreen();
        else if (container.msRequestFullscreen) container.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      }
    },

    toggleFav: function (slug, event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const isFav = toggleFavorite(slug);
      const btn = event ? event.currentTarget : null;
      if (btn) {
        btn.classList.toggle('is-fav', isFav);
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
      }
      const detailBtn = document.getElementById('detailFavBtn');
      if (detailBtn) {
        detailBtn.classList.toggle('is-fav', isFav);
        const svg = detailBtn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
        const txt = document.getElementById('detailFavText');
        if (txt) txt.textContent = isFav ? 'Favorited' : 'Add to Favorites';
      }
      const headerBadge = document.getElementById('headerFavBadge');
      if (headerBadge) {
        headerBadge.textContent = favorites.length;
        headerBadge.style.display = favorites.length > 0 ? '' : 'none';
      }
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
    }`;

code = code.slice(0, nexusPos) + updatedNexusMethods + code.slice(nexusEnd);
fs.writeFileSync('scripts/build-complete-bundle.js', code, 'utf8');
console.log('Updated window.NEXUS methods in builder');


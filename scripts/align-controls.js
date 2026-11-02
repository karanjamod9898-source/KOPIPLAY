const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');
content = content.replace(/\r\n/g, '\n');

const targetControls = `          <!-- Controls Bar -->
          <div class="player-controls-bar">
            <div class="player-controls-left">
              <img class="player-bar-thumb" src="\\\${game.thumbnail}" alt="\\\${escapeHtml(game.title)}" width="38" height="38" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="player-bar-info">
                <h1 class="player-game-title">\\\${escapeHtml(game.title)}</h1>
                <span class="player-bar-cat">\\\${escapeHtml(game.category || 'Arcade')}</span>
              </div>
              <button class="ctrl-btn \\\${isFav ? 'is-fav' : ''}" id="playerFavBtn" onclick="window.NEXUS.togglePlayerFav('\\\${game.slug}')" title="Favorite" aria-label="Favorite">
                <span class="ctrl-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="\\\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </span>
                <span class="ctrl-btn-text" id="playerFavLabel">\\\${isFav ? 'Favorited' : 'Favorite'}</span>
              </button>
            </div>

            <div class="player-controls-right">
              <button class="ctrl-btn" onclick="window.NEXUS.shareGame('\\\${game.slug}', '\\\${escapeHtml(game.title)}')" title="Share game link" aria-label="Share">`;

const cleanControls = `          <!-- Controls Bar -->
          <div class="player-controls-bar">
            <div class="player-controls-left">
              <img class="player-bar-thumb" src="\\\${game.thumbnail}" alt="\\\${escapeHtml(game.title)}" width="44" height="32" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="player-bar-info">
                <h1 class="player-game-title">\\\${escapeHtml(game.title)}</h1>
                <span class="player-bar-cat">\\\${escapeHtml(game.category || 'Arcade')}</span>
              </div>
            </div>

            <div class="player-controls-right">
              <button class="ctrl-btn \\\${isFav ? 'is-fav' : ''}" id="playerFavBtn" onclick="window.NEXUS.togglePlayerFav('\\\${game.slug}')" title="Favorite" aria-label="Favorite">
                <span class="ctrl-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="\\\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </span>
                <span class="ctrl-btn-text" id="playerFavLabel">\\\${isFav ? 'Favorited' : 'Favorite'}</span>
              </button>
              <button class="ctrl-btn" onclick="window.NEXUS.shareGame('\\\${game.slug}', '\\\${escapeHtml(game.title)}')" title="Share game link" aria-label="Share">`;

if (content.includes(targetControls)) {
  content = content.replace(targetControls, cleanControls);
  fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
  console.log('Successfully aligned controls bar');
} else {
  console.error('Target controls string not found');
}

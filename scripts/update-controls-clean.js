const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');
content = content.replace(/\r\n/g, '\n');

const oldBlock = `          <!-- Controls Bar -->
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
              <button class="ctrl-btn" onclick="window.NEXUS.shareGame('\\\${game.slug}', '\\\${escapeHtml(game.title)}')" title="Share game link" aria-label="Share">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></span>
                <span class="ctrl-btn-text">Share</span>
              </button>
              <button class="ctrl-btn" onclick="window.NEXUS.reloadGame()" title="Reload game" aria-label="Reload">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></span>
                <span class="ctrl-btn-text">Reload</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.cycleAspectRatio()" title="Aspect Ratio" aria-label="Aspect Ratio">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></span>
                <span class="ctrl-btn-text" id="ratioLabel">\\\${initialRatioLabel}</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.toggleTheater()" title="Theater mode" aria-label="Theater Mode">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
                <span class="ctrl-btn-text">Theater</span>
              </button>

              <button class="ctrl-btn btn-fullscreen" id="fullscreenBtn" onclick="window.NEXUS.toggleFullscreen()" title="Fullscreen" aria-label="Fullscreen">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span>
                <span class="ctrl-btn-text">Fullscreen</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.openReport('\\\${game.slug}')" title="Report issue with this game" aria-label="Report">
                <span class="ctrl-btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>
                <span class="ctrl-btn-text">Report</span>
              </button>
            </div>
          </div>`;

const newBlock = `          <!-- Controls Bar -->
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

              <button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.shareGame('\\\${game.slug}', '\\\${escapeHtml(game.title)}')" title="Share game link" aria-label="Share">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></span>
                <span class="ctrl-btn-text">Share</span>
              </button>

              <button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.reloadGame()" title="Reload game" aria-label="Reload">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></span>
                <span class="ctrl-btn-text">Reload</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.cycleAspectRatio()" title="Aspect Ratio" aria-label="Aspect Ratio">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></span>
                <span class="ctrl-btn-text" id="ratioLabel">\\\${initialRatioLabel}</span>
              </button>

              <button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.toggleTheater()" title="Theater mode" aria-label="Theater Mode">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
                <span class="ctrl-btn-text">Theater</span>
              </button>

              <button class="ctrl-btn btn-fullscreen" id="fullscreenBtn" onclick="window.NEXUS.toggleFullscreen()" title="Fullscreen" aria-label="Fullscreen">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span>
                <span class="ctrl-btn-text">Fullscreen</span>
              </button>

              <button class="ctrl-btn ctrl-icon-only" onclick="window.NEXUS.openReport('\\\${game.slug}')" title="Report issue with this game" aria-label="Report">
                <span class="ctrl-btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>
                <span class="ctrl-btn-text">Report</span>
              </button>
            </div>
          </div>`;

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
  console.log('Successfully updated player-controls-bar');
} else {
  console.error('Failed to locate oldBlock');
}


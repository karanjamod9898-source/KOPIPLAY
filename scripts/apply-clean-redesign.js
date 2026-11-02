const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');
content = content.replace(/\r\n/g, '\n');

// 1. Add formatControlsKeycaps and renderCategoryQuickBar
const showToastEnd = "setTimeout(() => toast.remove(), 300);\n    }, 3200);\n  }";

const helperFunctions = `setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Tactile 3D Keycap Formatter & Category Quick Bar ---
  function formatControlsKeycaps(text) {
    if (!text) return '';
    return escapeHtml(text)
      .replace(/\\bWASD\\b/g, '<kbd class="keycap">W</kbd><kbd class="keycap">A</kbd><kbd class="keycap">S</kbd><kbd class="keycap">D</kbd>')
      .replace(/\\bArrow Keys\\b/gi, '<kbd class="keycap">↑</kbd><kbd class="keycap">↓</kbd><kbd class="keycap">←</kbd><kbd class="keycap">→</kbd>')
      .replace(/\\bSpacebar\\b/gi, '<kbd class="keycap">Space</kbd>')
      .replace(/\\bSpace\\b/g, '<kbd class="keycap">Space</kbd>')
      .replace(/\\bMouse\\b/gi, '<kbd class="keycap">Mouse</kbd>')
      .replace(/\\bEnter\\b/gi, '<kbd class="keycap">Enter</kbd>')
      .replace(/\\bShift\\b/gi, '<kbd class="keycap">Shift</kbd>');
  }

  function renderCategoryQuickBar(activeSlug = null) {
    const quickCategories = [
      { slug: 'popular', name: 'Popular', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg>', href: '#/popular' },
      { slug: 'shooting', name: 'Shooting', icon: SVG_ICONS['shooting'] || '', href: '#/category/shooting' },
      { slug: 'racing', name: 'Racing', icon: SVG_ICONS['racing'] || '', href: '#/category/racing' },
      { slug: 'puzzle', name: 'Puzzle', icon: SVG_ICONS['puzzle'] || '', href: '#/category/puzzle' },
      { slug: 'action', name: 'Action', icon: SVG_ICONS['action'] || '', href: '#/category/action' },
      { slug: 'sports', name: 'Sports', icon: SVG_ICONS['sports'] || '', href: '#/category/sports' },
      { slug: 'multiplayer', name: 'Multiplayer', icon: SVG_ICONS['multiplayer'] || '', href: '#/category/multiplayer' },
      { slug: 'arcade', name: 'Arcade', icon: SVG_ICONS['arcade'] || '', href: '#/category/arcade' },
      { slug: 'car', name: 'Cars', icon: SVG_ICONS['car'] || '', href: '#/category/car' },
      { slug: 'adventure', name: 'Adventure', icon: SVG_ICONS['adventure'] || '', href: '#/category/adventure' }
    ];

    return \\\`
      <div class="category-quick-bar" aria-label="Quick Category Filter">
        \\\${quickCategories.map(c => \\\`
          <a href="\\\${c.href}" class="category-quick-pill \\\${activeSlug === c.slug ? 'active' : ''}">
            <span>\\\${c.icon}</span>
            <span>\\\${c.name}</span>
          </a>
        \\\`).join('')}
      </div>
    \\\`;
  }`;

if (content.includes(showToastEnd)) {
  content = content.replace(showToastEnd, helperFunctions);
  console.log('1. Added formatControlsKeycaps and renderCategoryQuickBar');
} else {
  console.error('Failed to locate showToastEnd');
}

// 2. Add Surprise Me button to renderHeader
const oldHeaderRight = `        <div class="header-right">\n          <a href="#/favorites" class="btn-header-fav"`;

const newHeaderRight = `        <div class="header-right">
          <button class="btn-header-random" onclick="window.NEXUS.playRandomGame()" title="Play Random Game" aria-label="Random Game">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>
            <span>Surprise Me</span>
          </button>
          <a href="#/favorites" class="btn-header-fav"`;

if (content.includes(oldHeaderRight)) {
  content = content.replace(oldHeaderRight, newHeaderRight);
  console.log('2. Added Surprise Me button to renderHeader');
} else {
  console.error('Failed to locate oldHeaderRight');
}

// 3. Add search-kbd to header search input
const oldSearchInput = `<input type="text" class="search-input" id="globalSearchInput" placeholder="Search games..." autocomplete="off" aria-label="Search games catalog">`;
const newSearchInput = `<input type="text" class="search-input" id="globalSearchInput" placeholder="Search games by title, genre, tags..." autocomplete="off" aria-label="Search games catalog">
              <kbd class="search-kbd" title="Press / to focus search">/</kbd>`;

if (content.includes(oldSearchInput)) {
  content = content.replace(oldSearchInput, newSearchInput);
  console.log('3. Added search-kbd to header search input');
} else {
  console.error('Failed to locate oldSearchInput');
}

// 4. Add keyboard shortcut '/' to initSearchEvents
const oldInitSearchClose = `    document.addEventListener('click', (e) => {\n      if (!e.target.closest('.search-wrapper')) {\n        suggestions.classList.remove('active');\n      }\n    });`;

const newInitSearchClose = `    // Global keyboard shortcut '/' to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        suggestions.classList.remove('active');
      }
    });`;

if (content.includes(oldInitSearchClose)) {
  content = content.replace(oldInitSearchClose, newInitSearchClose);
  console.log('4. Added keyboard shortcut / to initSearchEvents');
} else {
  console.error('Failed to locate oldInitSearchClose');
}

// 5. Update window.NEXUS with playRandomGame and shareGame
const nexusAnchor = 'window.KOPI = window.KIPO = window.NEXUS = {';
const nexusMethods = `window.KOPI = window.KIPO = window.NEXUS = {
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
    },
`;

if (content.includes(nexusAnchor)) {
  content = content.replace(nexusAnchor, nexusMethods);
  console.log('5. Added playRandomGame & shareGame to window.NEXUS');
} else {
  console.error('Failed to locate nexusAnchor');
}

// 6. Update Homepage Hero Buttons & add Category Quick Bar
const oldHeroBtns = `          <div class="hero-buttons">
            <a href="#/games" class="btn btn-primary">Explore All Games</a>
            <a href="#/category/shooting" class="btn btn-secondary">Shooting Action</a>
          </div>`;

const newHeroBtns = `          <div class="hero-buttons">
            <a href="#/games" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
              <span>Explore All Games (\\\${catalog.length})</span>
            </a>
            <button onclick="window.NEXUS.playRandomGame()" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>
              <span>Surprise Me</span>
            </button>
          </div>`;

if (content.includes(oldHeroBtns)) {
  content = content.replace(oldHeroBtns, newHeroBtns);
  console.log('6. Upgraded hero buttons');
} else {
  console.error('Failed to locate oldHeroBtns');
}

const oldHeroEnd = `      </section>\n\n      \\\${nexusAds.renderSlot('homeLeaderboard')}`;

const newHeroEnd = `      </section>

      <!-- Category Quick Filter Bar -->
      \\\${renderCategoryQuickBar()}

      \\\${nexusAds.renderSlot('homeLeaderboard')}`;

if (content.includes(oldHeroEnd)) {
  content = content.replace(oldHeroEnd, newHeroEnd);
  console.log('7. Added renderCategoryQuickBar to homepage');
} else {
  console.error('Failed to locate oldHeroEnd');
}

// 7. Update Game Detail Controls Bar with Share Button
const oldControlsReload = `            <div class="player-controls-right">\n              <button class="ctrl-btn" onclick="window.NEXUS.reloadGame()"`;

const newControlsReload = `            <div class="player-controls-right">
              <button class="ctrl-btn" onclick="window.NEXUS.shareGame('\\\${game.slug}', '\\\${escapeHtml(game.title)}')" title="Share game link" aria-label="Share">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></span>
                <span class="ctrl-btn-text">Share</span>
              </button>
              <button class="ctrl-btn" onclick="window.NEXUS.reloadGame()"`;

if (content.includes(oldControlsReload)) {
  content = content.replace(oldControlsReload, newControlsReload);
  console.log('8. Added Share button to game player controls');
} else {
  console.error('Failed to locate oldControlsReload');
}

// 8. Update Game Controls text to use formatControlsKeycaps
const oldControlsGuide = `<p style="color:var(--text-muted); font-size:0.88rem; line-height:1.6; margin:0;">\\\${escapeHtml(controlsGuide)}</p>`;
const newControlsGuide = `<p style="color:var(--text-muted); font-size:0.88rem; line-height:1.8; margin:0;">\\\${formatControlsKeycaps(controlsGuide)}</p>`;

if (content.includes(oldControlsGuide)) {
  content = content.replace(oldControlsGuide, newControlsGuide);
  console.log('9. Updated controls to tactile keycaps');
} else {
  console.error('Failed to locate oldControlsGuide');
}

// 9. Add Related Games Shelf below game player
const oldGameFooterAd = `          \\\${nexusAds.renderSlot('gameFooter')}`;
const newGameFooterAd = `          <!-- More Like This Shelf -->
          \\\${renderShelf('More Games You May Like', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>', '#/category/' + catSlug, related, 'row-related-bottom')}

          \\\${nexusAds.renderSlot('gameFooter')}`;

if (content.includes(oldGameFooterAd)) {
  content = content.replace(oldGameFooterAd, newGameFooterAd);
  console.log('10. Added Related Games Shelf beneath player');
} else {
  console.error('Failed to locate oldGameFooterAd');
}

// 10. Update renderAllGamesView category shortcuts to modern pills
const oldCatShortcuts = `        <!-- Category Shortcuts Bar -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 12px; scrollbar-width: none;">
          <a href="#/games" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid \\\${!activeCatSlug ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: \\\${!activeCatSlug ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: \\\${!activeCatSlug ? '#38BDF8' : 'var(--text-secondary)'};">
            All (\\\${catalog.length})
          </a>
          \\\${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = activeCatSlug === c.slug;
            return \\\`
              <a href="#/category/\\\${c.slug}" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid \\\${isActive ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: \\\${isActive ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: \\\${isActive ? '#38BDF8' : 'var(--text-secondary)'};">
                \\\${c.name} (\\\${count})
              </a>
            \\\`;
          }).join('')}
        </div>`;

const newCatShortcuts = `        <!-- Category Shortcuts Bar -->
        <div class="category-quick-bar" style="margin-bottom: 20px;">
          <a href="#/games" class="category-quick-pill \\\${!activeCatSlug ? 'active' : ''}">
            <span>All (\\\${catalog.length})</span>
          </a>
          \\\${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = activeCatSlug === c.slug;
            return \\\`
              <a href="#/category/\\\${c.slug}" class="category-quick-pill \\\${isActive ? 'active' : ''}">
                <span>\\\${getCategoryIcon(c.slug)}</span>
                <span>\\\${c.name} (\\\${count})</span>
              </a>
            \\\`;
          }).join('')}
        </div>`;

if (content.includes(oldCatShortcuts)) {
  content = content.replace(oldCatShortcuts, newCatShortcuts);
  console.log('11. Updated All Games view category shortcuts bar');
} else {
  console.error('Failed to locate oldCatShortcuts');
}

// 11. Update empty state in renderAllGamesView
const oldEmptyGrid = `    const cardsHtml = sorted.length > 0
      ? sorted.map(renderCard).join('')
      : \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="width: 54px; height: 54px; margin: 0 auto 16px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); margin-bottom:8px;">No Games Found</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:18px;">We couldn't find games matching your criteria. Try another category or search term!</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      \\\`;`;

const newEmptyGrid = `    let emptyStateHtml = '';
    if (title === 'My Favorites') {
      emptyStateHtml = \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 600px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(255, 71, 87, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-coral); box-shadow: 0 0 24px var(--accent-coral-glow);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Favorite Games Yet</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">Click the heart icon on any game card to add it to your personal favorites for instant 1-click access!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Browse Complete Catalog</a>
        </div>
      \\\`;
    } else if (title === 'Recently Played') {
      emptyStateHtml = \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 600px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(0, 210, 255, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-primary); box-shadow: 0 0 24px rgba(0, 210, 255, 0.25);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Recently Played Games</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">Games you play will automatically appear here so you can easily jump straight back into the action!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Discover Games</a>
        </div>
      \\\`;
    } else {
      emptyStateHtml = \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 600px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Games Found</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">We couldn't find any games matching this view or search term. Try another category or explore all games!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Browse All Games</a>
        </div>
      \\\`;
    }

    const cardsHtml = sorted.length > 0 ? sorted.map(renderCard).join('') : emptyStateHtml;`;

if (content.includes(oldEmptyGrid)) {
  content = content.replace(oldEmptyGrid, newEmptyGrid);
  console.log('12. Updated empty grid to dedicated views');
} else {
  console.error('Failed to locate oldEmptyGrid');
}

fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
console.log('Finished updating scripts/build-complete-bundle.js');

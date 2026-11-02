const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// 1. Add formatControlsKeycaps and renderCategoryQuickBar helpers
const helperCode = `
  // --- Modern Gaming Keycaps & Quick Navigation Helpers ---
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

    return \`
      <div class="category-quick-bar" aria-label="Quick Category Filter">
        \${quickCategories.map(c => \`
          <a href="\${c.href}" class="category-quick-pill \${activeSlug === c.slug ? 'active' : ''}">
            <span>\${c.icon}</span>
            <span>\${c.name}</span>
          </a>
        \`).join('')}
      </div>
    \`;
  }
`;

// Insert helperCode right after showToast function
if (!content.includes('function formatControlsKeycaps')) {
  const showToastAnchor = 'function showToast(message, icon = \'✓\') {';
  const lastToastBrace = content.indexOf('setTimeout(() => toast.remove(), 300);\n    }, 3200);\n  }');
  if (lastToastBrace !== -1) {
    const insertPos = lastToastBrace + 'setTimeout(() => toast.remove(), 300);\n    }, 3200);\n  }'.length;
    content = content.substring(0, insertPos) + '\n' + helperCode + content.substring(insertPos);
    console.log('Inserted formatControlsKeycaps & renderCategoryQuickBar helpers');
  }
}

// 2. Upgrade renderHeader with search kbd and random game button
const oldHeaderRegex = /function renderHeader\(\) \{[\s\S]*?initMobileNavEvents\(\);\s*\}/;
const newHeaderCode = `function renderHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    header.innerHTML = \`
      <div class="header-inner">
        <div class="header-left">
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open Navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="search-wrapper">
            <div class="search-input-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" class="search-input" id="globalSearchInput" placeholder="Search games by title, genre, tags..." autocomplete="off" aria-label="Search games catalog">
              <kbd class="search-kbd" title="Press / to focus search">/</kbd>
              <button class="search-clear-btn" id="searchClearBtn" aria-label="Clear Search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="search-suggestions" id="searchSuggestions" role="listbox"></div>
          </div>
        </div>
        <div class="header-right">
          <button class="btn-header-random" onclick="window.NEXUS.playRandomGame()" title="Play Random Game" aria-label="Random Game">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>
            <span>Surprise Me</span>
          </button>
          <a href="#/favorites" class="btn-header-fav" id="headerFavLink" title="View Favorites" aria-label="Favorites">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="header-fav-text">Favorites</span>
            <span class="header-fav-count" id="headerFavCount">\${favorites.length}</span>
          </a>
        </div>
      </div>
    \`;

    initSearchEvents();
    initMobileNavEvents();
  }`;

if (oldHeaderRegex.test(content)) {
  content = content.replace(oldHeaderRegex, newHeaderCode);
  console.log('Replaced renderHeader successfully');
}

// 3. Update initSearchEvents to support keyboard shortcut '/' and Esc
const oldInitSearchRegex = /function initSearchEvents\(\) \{[\s\S]*?document\.addEventListener\('click', \(e\) => \{[\s\S]*?\}\);\s*\}/;
const newInitSearchCode = `function initSearchEvents() {
    const input = document.getElementById('globalSearchInput');
    const suggestions = document.getElementById('searchSuggestions');
    const clearBtn = document.getElementById('searchClearBtn');
    if (!input || !suggestions) return;

    let debounceTimer = null;

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

      clearTimeout(debounceTimer);
      if (!q) {
        suggestions.classList.remove('active');
        suggestions.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        const matches = catalog.filter(g => {
          return (g.title || '').toLowerCase().includes(q) ||
                 (g.category || '').toLowerCase().includes(q) ||
                 (g.tags || []).some(t => t.toLowerCase().includes(q));
        }).slice(0, 8);

        if (matches.length === 0) {
          suggestions.innerHTML = '<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:0.88rem;">No games found for "' + escapeHtml(q) + '"</div>';
        } else {
          suggestions.innerHTML = matches.map(g => \`
            <a href="#/game/\${g.slug}" class="suggestion-item" onclick="document.getElementById('searchSuggestions').classList.remove('active')">
              <img class="suggestion-thumb" src="\${g.thumbnail}" alt="\${escapeHtml(g.title)}" width="48" height="32" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="suggestion-info">
                <div class="suggestion-title">\${escapeHtml(g.title)}</div>
                <div class="suggestion-meta-row">
                  <span class="suggestion-cat">\${escapeHtml(g.category || 'Arcade')}</span>
                  <span class="suggestion-rating">★ \${(g.rating || 4.5).toFixed(1)}</span>
                </div>
              </div>
              <span style="font-size:0.75rem; font-weight:800; color:var(--accent-primary); padding:3px 8px; border-radius:4px; background:rgba(0,210,255,0.1);">PLAY</span>
            </a>
          \`).join('');
        }
        suggestions.classList.add('active');
      }, 120);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        suggestions.classList.remove('active');
        input.focus();
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (q) {
          suggestions.classList.remove('active');
          window.location.hash = '#/games?q=' + encodeURIComponent(q);
          nexusAnalytics.track('search_used', { query: q });
        }
      } else if (e.key === 'Escape') {
        suggestions.classList.remove('active');
        input.blur();
      }
    });

    // Global keyboard shortcut '/' to focus search
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
    });
  }`;

if (oldInitSearchRegex.test(content)) {
  content = content.replace(oldInitSearchRegex, newInitSearchCode);
  console.log('Replaced initSearchEvents successfully');
}

// 4. Update window.NEXUS methods to add playRandomGame and shareGame
if (!content.includes('playRandomGame:')) {
  const nexusAnchor = 'window.KOPI = window.KIPO = window.NEXUS = {';
  const newNexusMethods = `window.KOPI = window.KIPO = window.NEXUS = {
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
  content = content.replace(nexusAnchor, newNexusMethods);
  console.log('Added playRandomGame & shareGame to window.NEXUS');
}

// 5. Upgrade Homepage Hero and add Category Quick Bar
const oldHeroRegex = /<!-- Hero Banner -->[\s\S]*?<\/section>\s*\\?\$\{\s*nexusAds\.renderSlot\('homeLeaderboard'\)\s*\}/;
const newHeroCode = `<!-- Hero Banner -->
      <section class="portal-hero">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="live-dot"></span> \${catalog.length} Free Games Live • Instant Play
          </div>
          <h1 class="hero-title">
            Play The Best Free Games <span>Online</span>
          </h1>
          <p class="hero-subtitle">
            Play More. Discover More. Enjoy high-performance action, racing, puzzle, adventure, shooting and sports games directly in your browser with zero downloads.
          </p>
          <div class="hero-buttons">
            <a href="#/games" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
              <span>Explore All Games (\${catalog.length})</span>
            </a>
            <button onclick="window.NEXUS.playRandomGame()" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>
              <span>Surprise Me</span>
            </button>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat-box">
            <div class="stat-number">\${catalog.length}</div>
            <div class="stat-label">Games</div>
          </div>
          <div class="hero-stat-box">
            <div class="stat-number">22</div>
            <div class="stat-label">Categories</div>
          </div>
          <div class="hero-stat-box">
            <div class="stat-number">100%</div>
            <div class="stat-label">Free</div>
          </div>
        </div>
      </section>

      <!-- Category Quick Filter Bar -->
      \${renderCategoryQuickBar()}

      \${nexusAds.renderSlot('homeLeaderboard')}`;

if (oldHeroRegex.test(content)) {
  content = content.replace(oldHeroRegex, newHeroCode);
  console.log('Upgraded Homepage Hero & added renderCategoryQuickBar');
}

// 6. Upgrade Game Detail Controls Bar & Keycaps
const oldControlsBarRegex = /<!-- Controls Bar -->[\s\S]*?<!-- Metadata & SEO Description Card -->/;
const newControlsBarCode = `<!-- Controls Bar -->
          <div class="player-controls-bar">
            <div class="player-controls-left">
              <img class="player-bar-thumb" src="\${game.thumbnail}" alt="\${escapeHtml(game.title)}" width="44" height="32" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="player-bar-info">
                <h1 class="player-game-title">\${escapeHtml(game.title)}</h1>
                <span class="player-bar-cat">\${escapeHtml(game.category || 'Arcade')}</span>
              </div>
              <button class="ctrl-btn \${isFav ? 'is-fav' : ''}" id="playerFavBtn" onclick="window.NEXUS.togglePlayerFav('\${game.slug}')" title="Favorite" aria-label="Favorite">
                <span class="ctrl-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </span>
                <span class="ctrl-btn-text" id="playerFavLabel">\${isFav ? 'Favorited' : 'Favorite'}</span>
              </button>
            </div>

            <div class="player-controls-right">
              <button class="ctrl-btn" onclick="window.NEXUS.shareGame('\${game.slug}', '\${escapeHtml(game.title)}')" title="Share game link" aria-label="Share">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></span>
                <span class="ctrl-btn-text">Share</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.reloadGame()" title="Reload game" aria-label="Reload">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></span>
                <span class="ctrl-btn-text">Reload</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.cycleAspectRatio()" title="Aspect Ratio" aria-label="Aspect Ratio">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></span>
                <span class="ctrl-btn-text" id="ratioLabel">\${initialRatioLabel}</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.toggleTheater()" title="Theater mode" aria-label="Theater Mode">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
                <span class="ctrl-btn-text">Theater</span>
              </button>

              <button class="ctrl-btn btn-fullscreen" id="fullscreenBtn" onclick="window.NEXUS.toggleFullscreen()" title="Fullscreen" aria-label="Fullscreen">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span>
                <span class="ctrl-btn-text">Fullscreen</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.openReport('\${game.slug}')" title="Report issue with this game" aria-label="Report">
                <span class="ctrl-btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>
                <span class="ctrl-btn-text">Report</span>
              </button>
            </div>
          </div>

          <!-- Metadata & SEO Description Card -->`;

if (oldControlsBarRegex.test(content)) {
  content = content.replace(oldControlsBarRegex, newControlsBarCode);
  console.log('Upgraded Player Controls Bar with Share button');
}

// 7. Keycaps in game detail info card
content = content.replace(
  '<p style="color:var(--text-muted); font-size:0.88rem; line-height:1.6; margin:0;">${escapeHtml(controlsGuide)}</p>',
  '<p style="color:var(--text-muted); font-size:0.88rem; line-height:1.8; margin:0;">${formatControlsKeycaps(controlsGuide)}</p>'
);

// Save upgraded build-complete-bundle.js
fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
console.log('Successfully updated scripts/build-complete-bundle.js');


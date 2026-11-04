const fs = require('fs');

let src = fs.readFileSync('scripts/rebuild-clean-light-portal.js', 'utf8');

// 1. Locate renderCard
const idxRenderCard = src.indexOf('function renderCard(game) {');
const idxSeoSection = src.indexOf('// --- Homepage SEO Rich Content Section ---');

if (idxRenderCard === -1 || idxSeoSection === -1) {
  console.error('Could not locate renderCard bounds:', idxRenderCard, idxSeoSection);
  process.exit(1);
}

const pokiCardAndBrand = `getPokiSpan(index) {
    const span2x2 = new Set([0, 7, 14, 21, 28, 38, 49, 61, 74, 88, 102, 118, 134, 150, 166, 180]);
    const span2x1 = new Set([1, 4, 9, 12, 17, 23, 26, 32, 36, 42, 46, 53, 58, 65, 71, 78, 84, 92, 97, 105, 112, 122, 127, 138, 145, 154, 161, 172]);
    const span1x2 = new Set([3, 8, 15, 20, 27, 34, 41, 48, 56, 64, 73, 81, 90, 99, 109, 120, 131, 142, 153, 164]);
    if (span2x2.has(index)) return 'span-2x2';
    if (span2x1.has(index)) return 'span-2x1';
    if (span1x2.has(index)) return 'span-1x2';
    return 'span-1x1';
  }

  function renderCard(game, index = 0) {
    const isFav = favorites.includes(game.slug);
    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge poki-card-badge poki-badge-top">★ ' + game.rating + '</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge poki-card-badge poki-badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge poki-card-badge poki-badge-hot">HOT</span>';
    }

    const spanClass = getPokiSpan(index);

    return \`
      <a href="#/game/\${game.slug}" class="game-card poki-card \${spanClass}" data-slug="\${game.slug}" title="\${escapeHtml(game.title)}" aria-label="Play \${escapeHtml(game.title)}">
        <img class="card-thumb poki-thumb"
             src="\${game.thumbnail}"
             alt="\${escapeHtml(game.title)}"
             loading="lazy"
             decoding="async"
             onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
        \${badgeHtml}
        <button class="card-fav-btn poki-card-fav \${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('\${game.slug}', event)" title="Favorite" aria-label="Favorite" type="button">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="poki-card-overlay">
          <h3 class="card-title poki-card-title">\${escapeHtml(game.title)}</h3>
          <div class="card-category poki-card-category">\${escapeHtml(game.category || 'Arcade')}</div>
        </div>
      </a>
    \`;
  }

  function renderBrandTile(activeCat = 'all', searchQuery = '') {
    const catObj = categoryList.find(c => c.slug === activeCat);
    const catLabel = catObj ? catObj.name : (activeCat === 'all' ? ('All Categories (' + catalog.length + ')') : activeCat);

    return \`
      <div class="poki-brand-tile" id="pokiBrandTile">
        <div class="poki-brand-top">
          <a href="#/" class="poki-brand-logo" aria-label="KopiPlay Home">
            <svg class="poki-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="6" y1="12" x2="10" y2="12"></line>
              <line x1="8" y1="10" x2="8" y2="14"></line>
              <line x1="15" y1="13" x2="15.01" y2="13"></line>
              <line x1="18" y1="11" x2="18.01" y2="11"></line>
              <rect x="2" y="6" width="20" height="12" rx="6"></rect>
            </svg>
            <span class="poki-logo-name">Kopi<span>Play</span></span>
          </a>
          <div class="poki-brand-actions">
            <a href="#/favorites" class="poki-brand-btn" title="Favorites" aria-label="Favorites">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span class="poki-brand-badge" id="pokiFavBadge" style="\${favorites.length > 0 ? '' : 'display:none;'}">\${favorites.length}</span>
            </a>
            <a href="#/recent" class="poki-brand-btn" title="Recently Played" aria-label="Recent Games">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </a>
          </div>
        </div>

        <div class="poki-search-box">
          <svg class="poki-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text"
                 id="heroSearchInput"
                 class="poki-search-input hero-search-input"
                 placeholder="Search 187+ games..."
                 value="\${escapeHtml(searchQuery)}"
                 autocomplete="off"
                 aria-label="Search games directly">
          <button id="heroSearchClear" class="poki-search-clear hero-search-clear" type="button" aria-label="Clear Search" style="\${searchQuery ? 'display:flex;' : 'display:none;'}">✕</button>
        </div>

        <div class="poki-brand-bottom">
          <button type="button" class="poki-cat-dropdown-btn" id="pokiCatTrigger" aria-expanded="false" onclick="document.getElementById('pokiCatMenu').classList.toggle('show')">
            <span id="pokiActiveCatLabel">\${escapeHtml(catLabel)}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="poki-category-menu" id="pokiCatMenu">
            <a class="poki-cat-item \${activeCat === 'all' ? 'active' : ''}" onclick="window.NEXUS.filterCategory('all'); document.getElementById('pokiCatMenu').classList.remove('show');">
              <div class="poki-cat-item-left">\${getCategoryIcon('all')} <span>All Games</span></div>
              <span class="poki-cat-count">\${catalog.length}</span>
            </a>
            \${categoryList.map(c => {
              const count = categoryCounts[c.slug] || 0;
              if (count === 0) return '';
              return \`
                <a class="poki-cat-item \${activeCat === c.slug ? 'active' : ''}" onclick="window.NEXUS.filterCategory('\${c.slug}'); document.getElementById('pokiCatMenu').classList.remove('show');">
                  <div class="poki-cat-item-left">\${getCategoryIcon(c.slug)} <span>\${c.name}</span></div>
                  <span class="poki-cat-count">\${count}</span>
                </a>
              \`;
            }).join('')}
          </div>
        </div>
      </div>
    \`;
  }

  `;

src = src.slice(0, idxRenderCard) + pokiCardAndBrand + src.slice(idxSeoSection);
console.log('Step 1 complete: renderCard and renderBrandTile inserted.');

// 2. Locate initHeroSearch & renderHomepage
const idxInitSearch = src.indexOf('function initHeroSearch() {');
const idxAllGamesView = src.indexOf('function renderAllGamesView');

if (idxInitSearch === -1 || idxAllGamesView === -1) {
  console.error('Could not locate initHeroSearch / renderAllGamesView bounds:', idxInitSearch, idxAllGamesView);
  process.exit(1);
}

const pokiSearchAndHomepage = `function initHeroSearch() {
    const heroInput = document.getElementById('heroSearchInput');
    const heroClear = document.getElementById('heroSearchClear');
    if (!heroInput) return;

    heroInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (heroClear) heroClear.style.display = q ? 'flex' : 'none';

      let filtered = catalog;
      if (q) {
        filtered = catalog.filter(g => {
          return (g.title || '').toLowerCase().includes(q) ||
                 (g.category || '').toLowerCase().includes(q) ||
                 (g.tags || []).some(t => t.toLowerCase().includes(q));
        });
      }

      const grid = document.getElementById('mainGamesGrid');
      const titleEl = document.getElementById('gamesSectionTitle');
      const countEl = document.getElementById('gamesSectionCount');

      if (titleEl) titleEl.textContent = q ? ('Search: "' + q + '"') : 'All Games';
      if (countEl) countEl.textContent = filtered.length + ' Games';

      if (grid) {
        const brandTileHtml = renderBrandTile('all', q);
        const filterBannerHtml = q ? \`
          <div class="poki-filter-banner">
            <span>Search Results for: "<strong>\${escapeHtml(q)}</strong>" (\${filtered.length} Games)</span>
            <button type="button" class="poki-filter-clear-btn" onclick="document.getElementById('heroSearchInput').value=''; window.NEXUS.filterCategory('all');">✕ Clear Search</button>
          </div>
        \` : '';
        const gamesHtml = filtered.length > 0 ? filtered.map((g, idx) => renderCard(g, idx)).join('') : \`
          <div class="poki-empty-card">
            <div class="empty-state-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <h3 class="empty-state-title" style="margin-top:10px; color:#172033; font-weight:800;">No Games Found</h3>
            <p class="empty-state-text" style="color:#64748B; margin:8px 0 16px;">We couldn't find any games matching "\${escapeHtml(q)}".</p>
            <button class="btn btn-primary" onclick="document.getElementById('heroSearchInput').value=''; window.NEXUS.filterCategory('all');" type="button">View All \${catalog.length} Games</button>
          </div>
        \`;
        grid.innerHTML = brandTileHtml + filterBannerHtml + gamesHtml;
        initHeroSearch();
        const newInput = document.getElementById('heroSearchInput');
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(q.length, q.length);
        }
      }
    });

    if (heroClear) {
      heroClear.addEventListener('click', () => {
        heroInput.value = '';
        heroClear.style.display = 'none';
        window.NEXUS.filterCategory('all');
        heroInput.focus();
      });
    }
  }

  // --- POKI-STYLE HOMEPAGE RENDERER (ALL 187 GAMES DIRECTLY IN ASYMMETRIC MASONRY GRID) ---
  function renderHomepage(selectedCat = 'all', searchQuery = '') {
    const main = document.getElementById('app-main');
    if (!main) return;

    // Set body mode for Poki full-screen grid
    document.body.classList.add('poki-home-mode');

    updateSeo({
      title: 'KopiPlay – Play Free Online Games',
      description: 'Discover and play ' + catalog.length + ' exciting online games for free on KopiPlay. Instant browser play on PC, tablet, and mobile with zero downloads.',
      canonical: 'https://kipo.in/',
      ogType: 'website',
      ogImage: 'assets/images/logo.svg',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "KopiPlay",
        "alternateName": "KopiPlay Online Games",
        "url": "https://kipo.in/",
        "description": "KopiPlay is an online gaming platform where players can discover and enjoy free browser-based games across multiple categories."
      }
    });

    // In-place SPA update if homepage structure is already mounted
    const existingGrid = document.getElementById('mainGamesGrid');
    if (existingGrid && existingGrid.classList.contains('poki-grid')) {
      window.NEXUS.filterCategory(selectedCat);
      return;
    }

    const currentSort = (localStorage.getItem(STORAGE_KEYS.sortPref) || localStorage.getItem(STORAGE_KEYS.legacySort) || 'featured');
    let displayGames = [...catalog];

    if (selectedCat && selectedCat !== 'all') {
      if (selectedCat === 'favorites') {
        displayGames = displayGames.filter(g => favorites.includes(g.slug));
      } else if (selectedCat === 'recent') {
        displayGames = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
      } else if (selectedCat === 'popular') {
        displayGames = displayGames.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7));
      } else if (selectedCat === 'new') {
        displayGames = displayGames.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01'));
      } else {
        displayGames = displayGames.filter(g => g._categories && g._categories.includes(selectedCat));
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      displayGames = displayGames.filter(g => {
        return (g.title || '').toLowerCase().includes(q) ||
               (g.category || '').toLowerCase().includes(q) ||
               (g.tags || []).some(t => t.toLowerCase().includes(q));
      });
    }

    if (currentSort === 'rating') {
      displayGames.sort((a,b) => (b.rating || 0) - (a.rating || 0));
    } else if (currentSort === 'plays') {
      displayGames.sort((a,b) => (b.plays || 0) - (a.plays || 0));
    } else if (currentSort === 'newest') {
      displayGames.sort((a,b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
    } else if (currentSort === 'az') {
      displayGames.sort((a,b) => a.title.localeCompare(b.title));
    } else if (currentSort === 'za') {
      displayGames.sort((a,b) => b.title.localeCompare(a.title));
    }

    const catObj = categoryList.find(c => c.slug === selectedCat);
    const catName = catObj ? catObj.name : (selectedCat === 'all' ? 'All Games' : selectedCat.replace('-', ' '));
    const sectionTitle = selectedCat === 'all' ? 'All Games' : (catName.toLowerCase().endsWith('games') ? catName : (catName + ' Games'));

    const html = \`
      <div class="poki-grid-wrapper">
        <!-- Sleek Horizontal Category Navigation Bar -->
        <div class="poki-cat-strip" aria-label="Category Filters">
          <button type="button"
                  class="category-filter-btn poki-cat-pill \${selectedCat === 'all' ? 'active' : ''}"
                  data-slug="all"
                  onclick="window.NEXUS.filterCategory('all')">
            \${getCategoryIcon('all')}
            <span>All Games</span>
            <span class="category-btn-count">\${catalog.length}</span>
          </button>
          \${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = selectedCat === c.slug;
            return \`
              <button type="button"
                      class="category-filter-btn poki-cat-pill \${isActive ? 'active' : ''}"
                      data-slug="\${c.slug}"
                      onclick="window.NEXUS.filterCategory('\${c.slug}')">
                \${getCategoryIcon(c.slug)}
                <span>\${c.name}</span>
                <span class="category-btn-count">\${count}</span>
              </button>
            \`;
          }).join('')}
        </div>

        <!-- Filter Status Banner (if filtered) -->
        <div class="games-section-header" style="\${(selectedCat === 'all' && !searchQuery) ? 'display:none;' : 'display:flex; margin-bottom:12px;'}">
          <div class="games-section-title-wrap">
            <h2 class="games-section-title" id="gamesSectionTitle">\${escapeHtml(sectionTitle)}</h2>
            <span class="games-section-count" id="gamesSectionCount">\${displayGames.length} Games</span>
          </div>
          <button type="button" class="poki-filter-clear-btn" onclick="window.NEXUS.filterCategory('all')">✕ View All \${catalog.length} Games</button>
        </div>

        <!-- Full-Screen Asymmetric Poki Grid (Zero White Footer, 100% Bleed Squircles) -->
        <div class="games-grid poki-grid" id="mainGamesGrid">
          <!-- Item 0: Brand & Search Command Tile -->
          \${renderBrandTile(selectedCat, searchQuery)}

          <!-- All 187 Games Directly on Homepage -->
          \${displayGames.length > 0 ? displayGames.map((g, idx) => renderCard(g, idx)).join('') : \`
            <div class="poki-empty-card">
              <div class="empty-state-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </div>
              <h3 class="empty-state-title" style="margin-top:10px; color:#172033; font-weight:800;">No Games Found</h3>
              <p class="empty-state-text" style="color:#64748B; margin:8px 0 16px;">No games found for this category or filter.</p>
              <button class="btn btn-primary" onclick="window.NEXUS.filterCategory('all')" type="button">View All \${catalog.length} Games</button>
            </div>
          \`}
        </div>

        <!-- Rich Homepage SEO & FAQ Section -->
        <div style="margin-top: 40px; background: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
          \${renderHomepageSeoSection()}
        </div>
      </div>
    \`;

    main.innerHTML = html;
    initHeroSearch();
  }

  `;

src = src.slice(0, idxInitSearch) + pokiSearchAndHomepage + src.slice(idxAllGamesView);
console.log('Step 2 complete: initHeroSearch & renderHomepage replaced.');

// 3. Locate filterCategory
const idxFilterCat = src.indexOf('filterCategory: function (catSlug) {');
const idxSortView = src.indexOf('sortView: function (sortBy) {');

if (idxFilterCat === -1 || idxSortView === -1) {
  console.error('Could not locate filterCategory / sortView bounds:', idxFilterCat, idxSortView);
  process.exit(1);
}

const pokiFilterCategory = `filterCategory: function (catSlug) {
      document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-slug') === catSlug);
      });

      const catObj = categoryList.find(c => c.slug === catSlug);
      const catName = catObj ? catObj.name : (catSlug === 'all' ? 'All Games' : catSlug.replace('-', ' '));
      const sectionTitle = catSlug === 'all' ? 'All Games' : (catName.toLowerCase().endsWith('games') ? catName : (catName + ' Games'));

      let filtered = [...catalog];
      if (catSlug && catSlug !== 'all') {
        if (catSlug === 'favorites') {
          filtered = filtered.filter(g => favorites.includes(g.slug));
        } else if (catSlug === 'recent') {
          filtered = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
        } else if (catSlug === 'popular') {
          filtered = filtered.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7));
        } else if (catSlug === 'new') {
          filtered = filtered.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01'));
        } else {
          filtered = filtered.filter(g => g._categories && g._categories.includes(catSlug));
        }
      }

      const titleEl = document.getElementById('gamesSectionTitle');
      const countEl = document.getElementById('gamesSectionCount');
      if (titleEl) titleEl.textContent = sectionTitle;
      if (countEl) countEl.textContent = filtered.length + ' Games';

      const grid = document.getElementById('mainGamesGrid');
      if (grid) {
        const brandTileHtml = renderBrandTile(catSlug, '');
        const filterBannerHtml = catSlug !== 'all' ? \`
          <div class="poki-filter-banner">
            <span>Filtered by: <strong>\${escapeHtml(sectionTitle)}</strong> (\${filtered.length} Games)</span>
            <button type="button" class="poki-filter-clear-btn" onclick="window.NEXUS.filterCategory('all')">✕ Clear Filter</button>
          </div>
        \` : '';
        const gamesHtml = filtered.length > 0 ? filtered.map((g, idx) => renderCard(g, idx)).join('') : \`
          <div class="poki-empty-card">
            <div class="empty-state-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <h3 class="empty-state-title" style="margin-top:10px; color:#172033; font-weight:800;">No Games Found</h3>
            <p class="empty-state-text" style="color:#64748B; margin:8px 0 16px;">No games found in this category.</p>
            <button class="btn btn-primary" onclick="window.NEXUS.filterCategory('all')" type="button">View All \${catalog.length} Games</button>
          </div>
        \`;
        grid.innerHTML = brandTileHtml + filterBannerHtml + gamesHtml;
        initHeroSearch();
      }

      try {
        const targetHash = catSlug === 'all' ? '#/' : '#/category/' + catSlug;
        if (window.location.hash !== targetHash) {
          history.replaceState(null, null, targetHash);
        }
      } catch (e) {}
    },

    `;

src = src.slice(0, idxFilterCat) + pokiFilterCategory + src.slice(idxSortView);
console.log('Step 3 complete: filterCategory updated.');

fs.writeFileSync('scripts/rebuild-clean-light-portal.js', src, 'utf8');
console.log('Successfully saved scripts/rebuild-clean-light-portal.js!');

// Now run rebuild-clean-light-portal to generate js/bundle.js
require('../rebuild-clean-light-portal.js');
console.log('Successfully rebuilt js/bundle.js!');


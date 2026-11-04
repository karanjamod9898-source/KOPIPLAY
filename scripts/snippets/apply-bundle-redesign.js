const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', '..', 'js', 'bundle.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. Replace renderSidebar()
const sidebarRegex = /\/\/ --- Render Sidebar[\s\S]*?function renderSidebar\(\)[\s\S]*?\n  \}\n/m;

const newRenderSidebar = `  // --- Render Sidebar (Fixed Dark Gaming Sidebar Matching Reference Image) ---
  function renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    const rawHash = window.location.hash || '#/';
    const currentHash = rawHash.split('?')[0];

    sidebar.innerHTML = \`
      <div class="sidebar-wrapper">
        <div class="sidebar-top-section">
          <!-- Sidebar Brand Header -->
          <div class="sidebar-brand-wrap">
            <a href="#/" class="sidebar-brand" aria-label="KopiPlay Home">
              <div class="sidebar-logo-icon">
                <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
                  <rect x="2" y="2" width="40" height="40" rx="12" fill="url(#sblg-bg)"/>
                  <path d="M12 22C12 17.5 15.5 14 20 14H24C28.5 14 32 17.5 32 22C32 26.5 28.5 30 24 30C22.5 30 21.5 29 20 29C18.5 29 17.5 30 16 30C13.5 30 12 28 12 25.5V22Z" fill="#7C3AED" stroke="#C084FC" stroke-width="1.5"/>
                  <path d="M17 19V25M14 22H20" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="26" cy="20" r="1.5" fill="#22D3EE"/>
                  <circle cx="29" cy="23" r="1.5" fill="#F43F5E"/>
                  <defs>
                    <linearGradient id="sblg-bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1E1B4B"/>
                      <stop offset="1" stop-color="#0F172A"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="sidebar-brand-text">
                <span class="brand-title">Kopi<span class="brand-title-accent">Play</span></span>
                <span class="brand-tagline">Play Free Online Games</span>
              </div>
            </a>
            <button class="sidebar-close-btn" id="sidebarCloseBtn" aria-label="Close Menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="sidebar-nav" aria-label="Main Navigation">
            <a href="#/" class="sidebar-nav-item \${currentHash === '#/' || currentHash === '' ? 'active-nav-pill' : ''}" data-nav="home">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>Home</span>
              </span>
            </a>

            <a href="#/games" class="sidebar-nav-item \${currentHash === '#/games' ? 'active-nav-pill' : ''}" data-nav="games">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>All Games</span>
              </span>
              <span class="sidebar-pill-badge">\${catalog.length}</span>
            </a>

            <a href="#/favorites" class="sidebar-nav-item \${currentHash === '#/favorites' ? 'active-nav-pill' : ''}" data-nav="favorites">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span>My Favorites</span>
              </span>
              <span class="sidebar-pill-badge" id="sidebarFavBadge">\${favorites.length}</span>
            </a>

            <a href="#/recent" class="sidebar-nav-item \${currentHash === '#/recent' ? 'active-nav-pill' : ''}" data-nav="recent">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Recently Played</span>
              </span>
            </a>

            <a href="#/popular" class="sidebar-nav-item \${currentHash === '#/popular' ? 'active-nav-pill' : ''}" data-nav="popular">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                <span>Popular Games</span>
              </span>
            </a>

            <a href="#/new" class="sidebar-nav-item \${currentHash === '#/new' ? 'active-nav-pill' : ''}" data-nav="new">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>New Games</span>
              </span>
              <span class="sidebar-new-badge">NEW</span>
            </a>

            <!-- All Categories Dropdown Accordion -->
            <div class="sidebar-dropdown-group \${currentHash.startsWith('#/category/') ? 'is-open' : ''}" id="sidebarCatGroup">
              <button type="button" class="sidebar-nav-item sidebar-dropdown-toggle" id="sidebarCatToggle" aria-expanded="\${currentHash.startsWith('#/category/') ? 'true' : 'false'}">
                <span class="nav-item-content">
                  <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  <span>All Categories</span>
                </span>
                <svg class="dropdown-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="sidebar-categories-collapse" id="sidebarCatList">
                \${categoryList.map(c => {
                  const count = categoryCounts[c.slug] || 0;
                  if (count === 0) return '';
                  const isActive = currentHash === '#/category/' + c.slug;
                  return \`
                    <a href="#/category/\${c.slug}" class="sidebar-cat-subitem \${isActive ? 'active' : ''}">
                      <span class="cat-subitem-icon">\${getCategoryIcon(c.slug)}</span>
                      <span class="cat-subitem-name">\${c.name}</span>
                      <span class="cat-subitem-count">\${count}</span>
                    </a>
                  \`;
                }).join('')}
              </div>
            </div>
          </nav>
        </div>

        <!-- Bottom Decorative 3D Gamepad Art -->
        <div class="sidebar-decorative-art">
          <img src="assets/images/sidebar-controller-3d.jpg"
               alt="KopiPlay 3D Controller"
               class="sidebar-art-img"
               onerror="this.onerror=null;this.src='assets/images/sidebar-controller-art.svg'">
        </div>
      </div>
    \`;

    const closeBtn = document.getElementById('sidebarCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.body.classList.remove('mobile-sidebar-open');
      });
    }

    const catToggle = document.getElementById('sidebarCatToggle');
    if (catToggle) {
      catToggle.addEventListener('click', () => {
        const group = document.getElementById('sidebarCatGroup');
        if (group) {
          const isOpen = group.classList.toggle('is-open');
          catToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
      });
    }
  }
`;

bundle = bundle.replace(sidebarRegex, newRenderSidebar);

// 2. Replace getPokiSpan and renderCard
const cardRegex = /\/\/ --- Poki Squircle Card Renderer[\s\S]*?function renderCard[\s\S]*?\n  \}\n/m;

const newCardRenderer = `  // --- Poki Squircle Card Renderer (Image Covers 100%, Category Badge, Favorite Heart, Hover Overlay) ---
  function getPokiSpan(index) {
    // 16 premier featured games -> Large 2x2
    const span2x2 = new Set([0, 6, 12, 18, 26, 36, 48, 60, 74, 88, 102, 118, 134, 150, 166, 180]);
    // 28 high-action/driving games -> Wide 2x1
    const span2x1 = new Set([4, 9, 15, 21, 29, 39, 52, 65, 78, 92, 107, 122, 138, 154, 170]);
    // 20 vertical runner games -> Tall 1x2
    const span1x2 = new Set([3, 7, 14, 20, 28, 41, 55, 68, 82, 97, 112, 128, 144, 160, 175]);

    if (span2x2.has(index)) return 'span-2x2';
    if (span2x1.has(index)) return 'span-2x1';
    if (span1x2.has(index)) return 'span-1x2';
    return 'span-1x1';
  }

  function getBorderThemeClass(index) {
    const themes = ['border-cyan', 'border-purple', 'border-blue', 'border-pink'];
    return themes[index % themes.length];
  }

  function renderCard(game, index = 0) {
    const isFav = favorites.includes(game.slug);
    const catLabel = (game.category || 'Game').toUpperCase();
    const spanClass = getPokiSpan(index);
    const borderClass = getBorderThemeClass(index);

    return \`
      <a href="#/game/\${game.slug}" class="game-card poki-card \${spanClass} \${borderClass}" data-slug="\${game.slug}" title="\${escapeHtml(game.title)}" aria-label="Play \${escapeHtml(game.title)}">
        <img class="card-thumb poki-thumb"
             src="\${game.thumbnail}"
             alt="\${escapeHtml(game.title)}"
             loading="lazy"
             decoding="async"
             onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
        <span class="poki-card-badge">\${escapeHtml(catLabel)}</span>
        <button class="card-fav-btn poki-card-fav \${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('\${game.slug}', event)" title="Favorite" aria-label="Favorite" type="button">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="poki-card-overlay">
          <h3 class="card-title poki-card-title">\${escapeHtml(game.title)}</h3>
          <div class="card-category poki-card-category">\${escapeHtml(game.category || 'Arcade')}</div>
        </div>
      </a>
    \`;
  }
`;

bundle = bundle.replace(cardRegex, newCardRenderer);

// 3. Replace renderHomepage()
const homepageRegex = /function renderHomepage\([\s\S]*?\n  function renderAllGamesView/m;

const newHomepage = `function renderHomepage(selectedCat = 'all', searchQuery = '') {
    const main = document.getElementById('app-main');
    if (!main) return;

    // Set body mode for Dark Gaming Canvas & Layout
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
        <!-- Sleek Horizontal Category Navigation Bar with Smooth Auto-Scroll & Arrows -->
        <div class="poki-cat-nav-wrapper" id="pokiCatNavWrapper">
          <button type="button" class="poki-cat-arrow poki-cat-arrow-left" id="pokiCatArrowLeft" aria-label="Previous categories" title="Previous categories" disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="poki-cat-strip" id="pokiCatStrip" aria-label="Category Filters">
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

          <button type="button" class="poki-cat-arrow poki-cat-arrow-right" id="pokiCatArrowRight" aria-label="Next categories" title="Next categories">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- Hero Gaming Banner (Recreated Directly from Reference Image) -->
        <div class="kopi-hero-banner" id="kopiHeroBanner">
          <div class="hero-content-col">
            <h1 class="hero-headline">Play <span class="hero-gold-count">\${catalog.length}+</span> Free Online Games</h1>
            <p class="hero-subtitle">Action, Adventure, Puzzle, Racing and more – Play instantly in your browser!</p>
            <div class="hero-features-row">
              <span class="hero-feature-pill">
                <svg class="feat-icon-yellow" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span>No Download</span>
              </span>
              <span class="hero-feature-pill">
                <svg class="feat-icon-cyan" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                <span>Play Instantly</span>
              </span>
              <span class="hero-feature-pill">
                <svg class="feat-icon-yellow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="6" width="20" height="12" rx="6"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/></svg>
                <span>100% Free</span>
              </span>
              <span class="hero-feature-pill">
                <svg class="feat-icon-cyan" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Safe & Secure</span>
              </span>
            </div>
          </div>
          <div class="hero-artwork-col">
            <img src="assets/images/hero-gamer-boy.jpg"
                 alt="KopiPlay Gamer"
                 class="hero-artwork-img"
                 onerror="this.onerror=null;this.src='assets/images/hero-gamer-illustration.svg'">
          </div>
        </div>

        <!-- Compact Category Filter Indicator (Clean, subtle, 40-45px height) -->
        <div class="kopi-filter-indicator" id="kopiFilterIndicator" style="\${(selectedCat === 'all' && !searchQuery) ? 'display:none;' : 'display:flex;'}">
          <div class="kopi-filter-info">
            <span class="kopi-filter-category" id="kopiFilterCatName">\${escapeHtml(sectionTitle)}</span>
            <span class="kopi-filter-dot" aria-hidden="true">·</span>
            <span class="kopi-filter-count" id="kopiFilterGameCount">\${displayGames.length} Games</span>
          </div>
          <button type="button" class="kopi-filter-clear-btn" id="kopiFilterClearBtn" onclick="window.NEXUS.filterCategory('all')" title="Clear filter and view all games">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Clear Filter</span>
          </button>
          <span id="gamesSectionTitle" style="display:none;">\${escapeHtml(sectionTitle)}</span>
          <span id="gamesSectionCount" style="display:none;">\${displayGames.length} Games</span>
        </div>

        <!-- Full-Screen Asymmetric Game Grid (Starts directly with games, 100% Bleed Squircles) -->
        <div class="games-grid poki-grid" id="mainGamesGrid">
          \${displayGames.length > 0 ? displayGames.map((g, idx) => renderCard(g, idx)).join('') : \`
            <div class="poki-empty-card" style="grid-column: 1 / -1; padding: 48px; text-align: center; background: rgba(15,23,42,0.6); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
              <div class="empty-state-icon" style="margin-bottom: 12px; color: #94A3B8;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </div>
              <h3 class="empty-state-title" style="margin-top:10px; color:#F1F5F9; font-weight:800; font-size: 1.3rem;">No Games Found</h3>
              <p class="empty-state-text" style="color:#94A3B8; margin:8px 0 20px;">No games found for this category or filter.</p>
              <button class="btn btn-primary" onclick="window.NEXUS.filterCategory('all')" type="button" style="padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #7C3AED, #9333EA); color: #FFF; border: none; font-weight: 700; cursor: pointer;">View All \${catalog.length} Games</button>
            </div>
          \`}
        </div>

        <!-- Rich Homepage SEO & FAQ Section -->
        <div class="homepage-seo-wrap" style="margin-top: 48px; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.45); color: #E2E8F0; padding: 28px;">
          \${renderHomepageSeoSection()}
        </div>
      </div>
    \`;

    main.innerHTML = html;
    initCategoryNavigation();
    if (selectedCat && selectedCat !== 'all') {
      const activeBtn = document.querySelector(\`.category-filter-btn[data-slug="\${selectedCat}"]\`);
      if (activeBtn) {
        setTimeout(() => scrollCategoryIntoView(activeBtn), 150);
      }
    }
  }

  function renderAllGamesView`;

bundle = bundle.replace(homepageRegex, newHomepage);

// 4. Update window.NEXUS.filterCategory
const filterCatRegex = /filterCategory: function \(catSlug\) \{[\s\S]*?try \{\s*const targetHash = catSlug === 'all'[\s\S]*?\}\s*\},/m;

const newFilterCat = `filterCategory: function (catSlug) {
      document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-slug') === catSlug);
      });

      const activeBtn = document.querySelector(\`.category-filter-btn[data-slug="\${catSlug}"]\`);
      if (activeBtn) {
        scrollCategoryIntoView(activeBtn);
      }

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
      const filterIndicator = document.getElementById('kopiFilterIndicator');
      const filterCatName = document.getElementById('kopiFilterCatName');
      const filterGameCount = document.getElementById('kopiFilterGameCount');

      if (titleEl) titleEl.textContent = sectionTitle;
      if (countEl) countEl.textContent = filtered.length + ' Games';

      if (filterIndicator) {
        if (catSlug !== 'all') {
          filterIndicator.style.display = 'flex';
          if (filterCatName) filterCatName.textContent = sectionTitle;
          if (filterGameCount) filterGameCount.textContent = filtered.length + ' Games';
        } else {
          filterIndicator.style.display = 'none';
        }
      }

      const grid = document.getElementById('mainGamesGrid');
      if (grid) {
        const gamesHtml = filtered.length > 0 ? filtered.map((g, idx) => renderCard(g, idx)).join('') : \`
          <div class="poki-empty-card" style="grid-column: 1 / -1; padding: 48px; text-align: center; background: rgba(15,23,42,0.6); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
            <div class="empty-state-icon" style="margin-bottom: 12px; color: #94A3B8;">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <h3 class="empty-state-title" style="margin-top:10px; color:#F1F5F9; font-weight:800; font-size: 1.3rem;">No Games Found</h3>
            <p class="empty-state-text" style="color:#94A3B8; margin:8px 0 20px;">No games found in this category.</p>
            <button class="btn btn-primary" onclick="window.NEXUS.filterCategory('all')" type="button" style="padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #7C3AED, #9333EA); color: #FFF; border: none; font-weight: 700; cursor: pointer;">View All \${catalog.length} Games</button>
          </div>
        \`;
        grid.innerHTML = gamesHtml;
      }

      // Update sidebar nav active items
      document.querySelectorAll('.sidebar-nav-item').forEach(el => {
        const navType = el.getAttribute('data-nav');
        if (catSlug === 'all') {
          el.classList.toggle('active-nav-pill', navType === 'home' || navType === 'games');
        } else if (catSlug === 'popular') {
          el.classList.toggle('active-nav-pill', navType === 'popular');
        } else if (catSlug === 'new') {
          el.classList.toggle('active-nav-pill', navType === 'new');
        } else {
          el.classList.remove('active-nav-pill');
        }
      });

      document.querySelectorAll('.sidebar-cat-subitem').forEach(el => {
        const href = el.getAttribute('href');
        el.classList.toggle('active', href === '#/category/' + catSlug);
      });

      try {
        const targetHash = catSlug === 'all' ? '#/' : '#/category/' + catSlug;
        if (window.location.hash !== targetHash) {
          history.replaceState(null, null, targetHash);
        }
      } catch (e) {}
    },`;

bundle = bundle.replace(filterCatRegex, newFilterCat);

// 5. Update updateActiveNavClasses
const navClassesRegex = /function updateActiveNavClasses\(hash\) \{[\s\S]*?\n  \}/m;

const newNavClasses = `function updateActiveNavClasses(hash) {
    document.querySelectorAll('.nav-pill').forEach(el => {
      const href = el.getAttribute('href');
      el.classList.toggle('active', href === hash);
    });

    document.querySelectorAll('.sidebar-nav-item').forEach(el => {
      const href = el.getAttribute('href');
      if (href) {
        el.classList.toggle('active-nav-pill', href === hash || (hash === '' && href === '#/'));
      }
    });

    document.querySelectorAll('.sidebar-cat-subitem').forEach(el => {
      const href = el.getAttribute('href');
      el.classList.toggle('active', href === hash);
    });

    const favBadge = document.getElementById('sidebarFavBadge');
    if (favBadge) favBadge.textContent = favorites.length;
  }`;

bundle = bundle.replace(navClassesRegex, newNavClasses);

fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log('Successfully updated js/bundle.js for Dark Gaming UI!');


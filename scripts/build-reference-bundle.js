const fs = require('fs');
const path = require('path');

const builderPath = path.join(__dirname, 'build-complete-bundle.js');
let code = fs.readFileSync(builderPath, 'utf8');

console.log('Original build-complete-bundle.js size:', code.length);

// 1. REWRITE renderHeader()
const sHeader = code.indexOf('function renderHeader() {');
const eHeader = code.indexOf('function renderFooter() {', sHeader);

if (sHeader === -1 || eHeader === -1) {
  console.error('Could not find renderHeader bounds!');
  process.exit(1);
}

const newRenderHeader = `function renderHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    header.innerHTML = \\\`
      <div class="header-inner">
        <div class="header-left">
          <a href="#/" class="header-logo" aria-label="KopiPlay Home">
            <svg class="header-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="6" y1="12" x2="10" y2="12"></line>
              <line x1="8" y1="10" x2="8" y2="14"></line>
              <line x1="15" y1="13" x2="15.01" y2="13"></line>
              <line x1="18" y1="11" x2="18.01" y2="11"></line>
              <rect x="2" y="6" width="20" height="12" rx="6"></rect>
            </svg>
            <span class="header-logo-text">KopiPlay</span>
          </a>
          <nav class="header-nav" aria-label="Primary Navigation">
            <a href="#/" class="nav-pill active" id="navHomePill">Home</a>
            <a href="#/games" class="nav-link">All Games</a>
            <div class="header-dropdown">
              <a href="#/games" class="nav-link">
                Categories
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="dropdown-menu">
                <a href="#/category/action" class="dropdown-item">Action</a>
                <a href="#/category/racing" class="dropdown-item">Racing</a>
                <a href="#/category/puzzle" class="dropdown-item">Puzzle</a>
                <a href="#/category/shooting" class="dropdown-item">Shooting</a>
                <a href="#/category/sports" class="dropdown-item">Sports</a>
                <a href="#/category/arcade" class="dropdown-item">Arcade</a>
                <a href="#/category/adventure" class="dropdown-item">Adventure</a>
              </div>
            </div>
          </nav>
        </div>

        <div class="header-search">
          <div class="search-input-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="search-input" id="globalSearchInput" placeholder="Search games..." autocomplete="off" aria-label="Search games">
            <button class="search-clear-btn" id="searchClearBtn" aria-label="Clear Search"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <div class="search-suggestions" id="searchSuggestions"></div>
        </div>

        <div class="header-right">
          <button class="mobile-search-toggle" id="mobileSearchToggle" aria-label="Open Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <a href="#/favorites" class="header-action-btn" title="Favorites">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="action-text">Favorites</span>
            <span class="header-badge" id="headerFavBadge" style="\\\${favorites.length > 0 ? '' : 'display:none;'}">\\\${favorites.length}</span>
          </a>
          <a href="#/recent" class="header-action-btn" title="Recent Games">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span class="action-text">Recent</span>
          </a>
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open Navigation Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    \\\`;

    initSearchInput();
  }

  `;

code = code.slice(0, sHeader) + newRenderHeader + code.slice(eHeader);
console.log('Replaced renderHeader successfully');


// 2. REWRITE renderSidebar()
const sSidebar = code.indexOf('function renderSidebar() {');
const eSidebar = code.indexOf('function renderHeader() {', sSidebar);

if (sSidebar === -1 || eSidebar === -1) {
  console.error('Could not find renderSidebar bounds!');
  process.exit(1);
}

const newRenderSidebar = `function renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = \\\`
      <div class="sidebar-header">
        <a href="#/" class="sidebar-brand" aria-label="KopiPlay Home">
          <svg class="gamepad-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="12" x2="10" y2="12"></line>
            <line x1="8" y1="10" x2="8" y2="14"></line>
            <line x1="15" y1="13" x2="15.01" y2="13"></line>
            <line x1="18" y1="11" x2="18.01" y2="11"></line>
            <rect x="2" y="6" width="20" height="12" rx="6"></rect>
          </svg>
          <span class="brand-text">KopiPlay</span>
        </a>
        <button class="sidebar-close-btn" id="sidebarCloseBtn" aria-label="Close Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="sidebar-content">
        <a href="#/" class="drawer-nav-item active-pill" data-route="home">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Home</span>
          </div>
        </a>

        <a href="#/games" class="drawer-nav-item" data-route="games">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>All Games</span>
          </div>
          <span class="category-nav-count">\\\${catalog.length}</span>
        </a>

        <a href="#/games" class="drawer-nav-item" data-route="categories">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            <span>Categories</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>

        <a href="#/favorites" class="drawer-nav-item" data-route="favorites">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>Favorites</span>
          </div>
          <span class="category-nav-count">\\\${favorites.length}</span>
        </a>

        <a href="#/recent" class="drawer-nav-item" data-route="recent">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Recently Played</span>
          </div>
        </a>

        <hr class="drawer-divider">

        <a href="#/about" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>About Us</span>
          </div>
        </a>

        <a href="#/contact" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>Contact</span>
          </div>
        </a>

        <a href="#/privacy" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Privacy Policy</span>
          </div>
        </a>

        <a href="#/terms" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Terms of Use</span>
          </div>
        </a>
      </div>
    \\\`;

    const closeBtn = document.getElementById('sidebarCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.body.classList.remove('mobile-sidebar-open');
      });
    }
  }

  `;

code = code.slice(0, sSidebar) + newRenderSidebar + code.slice(eSidebar);
console.log('Replaced renderSidebar successfully');


// 3. ADD renderCategoryShowcase() and renderMixedGridCard()
const sCard = code.indexOf('function renderCard(game) {');
const eCard = code.indexOf('function renderShelf(', sCard);

if (sCard === -1 || eCard === -1) {
  console.error('Could not find renderCard bounds!');
  process.exit(1);
}

const newRenderCards = `function renderCard(game) {
    const isFav = favorites.includes(game.slug);
    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge badge-top">TOP</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge badge-hot">HOT</span>';
    }

    return \\\`
      <div class="game-card card-normal" data-slug="\\\${game.slug}">
        <div class="card-media">
          <img class="card-thumb"
               src="\\\${game.thumbnail}"
               alt="\\\${escapeHtml(game.title)}"
               loading="lazy"
               decoding="async"
               onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
          \\\${badgeHtml}
          <button class="card-fav-btn \\\${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('\\\\\\$\\\${game.slug}', event)" title="Favorite" aria-label="Favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="\\\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <div class="card-overlay-info">
            <span class="card-overlay-title">\\\${escapeHtml(game.title)}</span>
          </div>
        </div>
      </div>
    \\\`;
  }

  function renderMixedGridCard(game, sizeClass = 'card-normal') {
    const isFav = favorites.includes(game.slug);
    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge badge-top">TOP</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge badge-hot">HOT</span>';
    }

    return \\\`
      <div class="game-card \\\${sizeClass}" data-slug="\\\${game.slug}">
        <div class="card-media">
          <img class="card-thumb"
               src="\\\${game.thumbnail}"
               alt="\\\${escapeHtml(game.title)}"
               loading="lazy"
               decoding="async"
               onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
          \\\${badgeHtml}
          <button class="card-fav-btn \\\${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('\\\\\\$\\\${game.slug}', event)" title="Favorite" aria-label="Favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="\\\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <div class="card-overlay-info">
            <span class="card-overlay-title">\\\${escapeHtml(game.title)}</span>
          </div>
        </div>
      </div>
    \\\`;
  }

  function renderCategoryShowcase() {
    const categories = [
      { name: 'Action', slug: 'action', iconClass: 'cat-icon-action', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
      { name: 'Racing', slug: 'racing', iconClass: 'cat-icon-racing', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>' },
      { name: 'Puzzle', slug: 'puzzle', iconClass: 'cat-icon-puzzle', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v4a2 2 0 0 0 4 0V3"/><path d="M17 3v4a2 2 0 0 0 4 0V3"/></svg>' },
      { name: 'Arcade', slug: 'arcade', iconClass: 'cat-icon-arcade', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 3 18 3 21 21 3 21 6 3"/><circle cx="12" cy="12" r="3"/></svg>' },
      { name: 'Sports', slug: 'sports', iconClass: 'cat-icon-sports', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>' },
      { name: 'Shooting', slug: 'shooting', iconClass: 'cat-icon-shooting', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>' },
      { name: 'Adventure', slug: 'adventure', iconClass: 'cat-icon-adventure', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>' },
      { name: '.io Games', slug: 'multiplayer', iconClass: 'cat-icon-io', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
      { name: 'Girls', slug: 'casual', iconClass: 'cat-icon-girls', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5z"/></svg>' },
      { name: 'Cooking', slug: 'casual', iconClass: 'cat-icon-cooking', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>' },
      { name: 'Multiplayer', slug: 'multiplayer', iconClass: 'cat-icon-multiplayer', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { name: 'More', slug: 'all', iconClass: 'cat-icon-more', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' }
    ];

    return \\\`
      <section class="game-categories-section">
        <div class="section-header-clean">
          <h2 class="section-title-clean">Game Categories</h2>
        </div>
        <div class="category-showcase-grid">
          \\\${categories.map(cat => \\\`
            <a href="\\\${cat.slug === 'all' ? '#/games' : '#/category/' + cat.slug}" class="category-showcase-card" data-cat="\\\${cat.slug}">
              <div class="cat-card-icon \\\${cat.iconClass}">\\\${cat.icon}</div>
              <span class="cat-card-label">\\\${cat.name}</span>
            </a>
          \\\`).join('')}
        </div>
      </section>
    \\\`;
  }

  `;

code = code.slice(0, sCard) + newRenderCards + code.slice(eCard);
console.log('Replaced renderCard & added renderCategoryShowcase successfully');


// 4. REWRITE renderHomepage()
const sHome = code.indexOf('function renderHomepage() {');
const eHome = code.indexOf('function renderAllGamesView(', sHome);

if (sHome === -1 || eHome === -1) {
  console.error('Could not find renderHomepage bounds!');
  process.exit(1);
}

const newRenderHomepage = `function renderHomepage() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'KopiPlay – Play Free Online Games',
      description: 'Discover KopiPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.',
      canonical: 'https://kipo.in/',
      ogType: 'website',
      ogImage: 'assets/images/logo.svg',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "KopiPlay",
        "alternateName": "KopiPlay Online Games",
        "url": "https://kipo.in/",
        "description": "KopiPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports."
      }
    });

    // Curate Mixed Grid Spans (Matching Reference Image Layout)
    const featured2x2 = ['neon-racer', 'subway-winter-vacation', 'bubble-fall', 'cyber-snake', 'magic-block-puzzle', 'merge-haven', 'neon-breakout', 'tank-wars-2'];
    const wide2x1 = ['space-defender', 'slam-dunk', 'helicopter-battle', 'angry-heroes', 'dream-restaurant-3d'];
    const tall1x2 = ['hand-feight', 'wood-screw-puzzle', 'home-island', 'pulse-2048'];

    // Homepage Dense Mixed-Size Grid: First 52 games arranged densely
    const mixedGames = catalog.slice(0, 52);
    const mixedGridHtml = mixedGames.map(game => {
      let size = 'card-normal';
      if (featured2x2.includes(game.slug)) size = 'card-large';
      else if (wide2x1.includes(game.slug)) size = 'card-wide';
      else if (tall1x2.includes(game.slug)) size = 'card-tall';
      return renderMixedGridCard(game, size);
    }).join('');

    // Remaining Explore Games: Complete catalog coverage
    const exploreGames = catalog.slice(52);

    const html = \\\`
      <!-- Dense Image-First Mixed-Size Game Grid (Matches Left Panel of Reference) -->
      <section class="mixed-game-grid" aria-label="Featured Free Online Games">
        \\\${mixedGridHtml}
      </section>

      <!-- Game Categories Showcase Section (Matches Middle-Right Panel of Reference) -->
      \\\${renderCategoryShowcase()}

      <!-- Complete Explore Games Library -->
      <section class="explore-all-section" style="margin-top: 20px; margin-bottom: 40px;">
        <div class="section-header-clean">
          <h2 class="section-title-clean">Explore More Games (\\\${catalog.length})</h2>
          <a href="#/games" class="related-view-all">View All (\\\${catalog.length})</a>
        </div>
        <div class="games-grid">
          \\\${exploreGames.map(renderCard).join('')}
        </div>
      </section>

      <!-- Rich Homepage SEO Content Section -->
      \\\${renderHomepageSeoSection()}
    \\\`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  `;

code = code.slice(0, sHome) + newRenderHomepage + code.slice(eHome);
console.log('Replaced renderHomepage successfully');


// 5. REWRITE renderGameDetail()
const sDetail = code.indexOf('function renderGameDetail(slug) {');
const eDetail = code.indexOf('// --- PHASE 2: Redesigned Five Informational Pages', sDetail);

if (sDetail === -1 || eDetail === -1) {
  console.error('Could not find renderGameDetail bounds!');
  process.exit(1);
}

const newRenderGameDetail = `function renderGameDetail(slug) {
    const main = document.getElementById('app-main');
    if (!main) return;

    const game = catalog.find(g =>
      g.slug === slug ||
      g.id === slug ||
      (g.aliases && g.aliases.includes(slug)) ||
      (g.slug && g.slug.toLowerCase() === slug.toLowerCase()) ||
      (g.id && g.id.toLowerCase() === slug.toLowerCase())
    );
    if (!game) {
      main.innerHTML = \\\`
        <div class="empty-state-card">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 class="empty-state-title">Game Not Found</h2>
          <p class="empty-state-text">We couldn't locate the game "\\\${escapeHtml(slug)}". It may have been renamed or moved.</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      \\\`;
      return;
    }

    addRecentlyPlayed(game.slug);
    nexusAnalytics.track('game_viewed', { slug: game.slug, title: game.title, category: game.category });

    const isFav = favorites.includes(game.slug);
    let rawEmbedUrl = game.embedUrl || game.gameUrl || game.url || '';
    if (rawEmbedUrl.includes('html5.gamedistribution.com') && !rawEmbedUrl.includes('gd_sdk_referrer_url=')) {
      const sep = rawEmbedUrl.includes('?') ? '&' : '?';
      rawEmbedUrl = rawEmbedUrl + sep + 'gd_sdk_referrer_url=' + encodeURIComponent(window.location.href);
    }
    const embedUrl = sanitizeUrl(rawEmbedUrl);
    const catSlug = (game.category || 'arcade').toLowerCase();

    // Related Games: 10 games from same category or random
    const related = catalog.filter(g => g.slug !== game.slug && (g.category === game.category || (g._categories && g._categories.includes(catSlug)))).slice(0, 10);
    const relatedGames = related.length >= 6 ? related : catalog.filter(g => g.slug !== game.slug).slice(0, 10);

    // Controls Parser
    const controlsHtml = (function() {
      const desc = (game.instructions || game.description || 'Mouse, Arrow Keys, WASD, Space').toUpperCase();
      const keys = [];
      if (desc.includes('WASD')) keys.push('WASD');
      if (desc.includes('ARROW') || desc.includes('KEYS')) keys.push('Arrow Keys');
      if (desc.includes('SPACE')) keys.push('Space');
      if (desc.includes('MOUSE') || desc.includes('CLICK')) keys.push('Mouse');
      if (desc.includes('TOUCH')) keys.push('Touch');
      if (keys.length === 0) keys.push('Mouse', 'Arrow Keys');
      return keys.map(k => \\\`<span class="keycap">\\\${k}</span>\\\`).join('');
    })();

    updateSeo({
      title: \\\`Play \\\${game.title} Online Free – KopiPlay\\\`,
      description: game.description || \\\`Play \\\${game.title} instantly in your browser on KopiPlay. Free online game with zero downloads.\\\`,
      canonical: 'https://kipo.in/#/game/' + game.slug,
      ogType: 'game',
      ogImage: game.thumbnail,
      schema: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game.title,
        "description": game.description,
        "genre": [game.category || 'Arcade'],
        "playMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any"
      }
    });

    const html = \\\`
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-sep">&gt;</span>
        <a href="#/category/\\\${catSlug}" class="breadcrumb-link">\\\${escapeHtml(game.category || 'Action')}</a>
        <span class="breadcrumb-sep">&gt;</span>
        <span class="breadcrumb-current">\\\${escapeHtml(game.title)}</span>
      </nav>

      <!-- Main Game Detail Layout (Matches Top-Right Panel of Reference) -->
      <div class="game-detail-layout">
        <!-- 16:9 Cinematic Player Container -->
        <div class="player-stage-card" id="playerStageCard">
          <iframe id="gameIframe"
                  src="\\\${embedUrl}"
                  title="\\\${escapeHtml(game.title)}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowfullscreen
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals">
          </iframe>
          <button class="player-overlay-fullscreen-btn" id="playerOverlayFullscreenBtn" title="Toggle Fullscreen" aria-label="Toggle Fullscreen" onclick="window.NEXUS.toggleFullscreen()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>
        </div>

        <!-- Right Action Card (Matches Reference Image Sidebar Card) -->
        <div class="game-action-card">
          <div class="action-card-header">
            <img class="action-card-thumb" src="\\\${game.thumbnail}" alt="\\\${escapeHtml(game.title)}" onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
            <div class="action-card-info">
              <h1 class="action-card-title">\\\${escapeHtml(game.title)}</h1>
              <div class="action-card-tags">
                <a href="#/category/\\\${catSlug}" class="tag-pill">\\\${escapeHtml(game.category || 'Action')}</a>
                <span class="tag-pill">Instant Play</span>
              </div>
            </div>
          </div>

          <!-- Big Purple Play Now Button -->
          <button class="btn-play-now" id="btnPlayNow" onclick="window.NEXUS.focusGame()">
            <span>Play Now</span>
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 19 12 6 20 6 4"/></svg>
          </button>

          <!-- Secondary Favorites Button -->
          <button class="btn-fav-action \\\${isFav ? 'is-fav' : ''}" id="detailFavBtn" onclick="window.NEXUS.toggleFav('\\\\\\$\\\${game.slug}', event)">
            <svg viewBox="0 0 24 24" fill="\\\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span id="detailFavText">\\\${isFav ? 'Favorited' : 'Add to Favorites'}</span>
          </button>

          <!-- Game Description -->
          <div class="action-card-description">
            \\\${escapeHtml(game.description || 'Enjoy this fast-paced free online browser game on KopiPlay with instant loading and smooth cross-device controls.')}
          </div>

          <!-- Controls Keycaps -->
          <div class="game-controls-info">
            <span class="controls-label">Controls</span>
            <div class="controls-keys">
              \\\${controlsHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Related Games Strip (Matches Bottom of Reference Player Panel) -->
      <section class="related-games-section">
        <div class="related-games-header">
          <h3>Related Games</h3>
          <a href="#/games" class="related-view-all">View All</a>
        </div>
        <div class="related-games-strip">
          \\\${relatedGames.map(renderCard).join('')}
        </div>
      </section>
    \\\`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  `;

code = code.slice(0, sDetail) + newRenderGameDetail + code.slice(eDetail);
console.log('Replaced renderGameDetail successfully');

// Save the updated builder script
fs.writeFileSync(builderPath, code, 'utf8');
console.log('Successfully saved updated scripts/build-complete-bundle.js');


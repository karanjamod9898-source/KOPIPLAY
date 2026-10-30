/**
 * NEXUSPLAY - Complete Modern Gaming Portal Bundle
 * Dark gaming aesthetic inspired by CrazyGames layout
 * Fully static, zero external backend dependencies
 */

(function () {
  'use strict';

  // --- SVG Icons Map for Categories and Navigation ---
  const SVG_ICONS = {
    'shooting': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>',
    'action': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'adventure': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>',
    'racing': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    'car': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    'driving': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>',
    'sports': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"/></svg>',
    'football': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6l3.5 2.5-1.3 4h-4.4l-1.3-4zM12 2v4M12 22v-4M2 12h4M22 12h-4"/></svg>',
    'puzzle': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c0-1.571-1.274-2.85-2.846-2.85s-2.846 1.279-2.846 2.85H9.5c0-1.571-1.274-2.85-2.846-2.85S3.808 6.279 3.808 7.85V11c1.571 0 2.846 1.274 2.846 2.846s-1.275 2.846-2.846 2.846v3.15c0 1.571 1.274 2.85 2.846 2.85H9.5c0-1.571 1.274-2.85 2.846-2.85s2.846 1.279 2.846 2.85h4.247c1.572 0 2.846-1.279 2.846-2.85V16.7c-1.572 0-2.846-1.274-2.846-2.846s1.274-2.846 2.846-2.846V7.85z"/></svg>',
    'strategy': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    'platform': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="16" width="18" height="4" rx="1"/><rect x="6" y="8" width="12" height="4" rx="1"/><circle cx="12" cy="4" r="2"/></svg>',
    'multiplayer': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'arcade': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="12" width="12" height="8" rx="2"/><circle cx="12" cy="8" r="3"/><line x1="12" y1="11" x2="12" y2="12"/><path d="M6 12H4a2 2 0 0 0-2 2v6h20v-6a2 2 0 0 0-2-2h-2"/></svg>',
    'simulation': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    'casual': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
    'kids-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5z"/></svg>',
    'beauty': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    'pool': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 10v4"/></svg>',
    'board-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
    'card-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="12" height="16" rx="2"/><rect x="8" y="6" width="12" height="16" rx="2"/></svg>',
    'clicker': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 15l6 6M9 9l6 6M12 3v6M3 12h6M6 6l3 3M18 6l-3 3M6 18l3-3"/></svg>',
    'io-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'default': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="7" cy="12" r="1.5"/><circle cx="17" cy="12" r="1.5"/><path d="M12 8v8"/></svg>'
  };

  function getCategoryIcon(slug) {
    return SVG_ICONS[slug] || SVG_ICONS['default'];
  }

  // --- Category Classifier ---
  function matchCategories(game) {
    const text = ((game.title || '') + ' ' + (game.category || '') + ' ' + (game.description || '') + ' ' + ((game.tags || []).join(' '))).toLowerCase();
    const matched = [];

    if (/shoot|gun|sniper|cannon|fps|bullet|target|tank|space shooter|galaxy|missile|strike|invader|alien|zombie/i.test(text)) matched.push('shooting');
    if (/action|fight|combat|ninja|warrior|brawler|battle|smash|brawl|attack|survival|defense/i.test(text)) matched.push('action');
    if (/adventure|quest|escape|journey|explore|dungeon|tomb|odyssey|hero/i.test(text)) matched.push('adventure');
    if (/rac(e|ing)|speed|track|kart|moto|bike|rally|grand prix|lap|drift|formula/i.test(text)) matched.push('racing');
    if (/car|vehicle|auto|truck|bus|driver|drift|parking|supercar/i.test(text)) matched.push('car');
    if (/driv(e|ing)|pilot|fly|flight|traffic|road|steer|parking/i.test(text)) matched.push('driving');
    if (/sport|ball|soccer|football|basketball|tennis|cricket|golf|hockey|bowling|baseball|penalty/i.test(text)) matched.push('sports');
    if (/soccer|football|penalty|goal|fifa|kick|striker|premier/i.test(text)) matched.push('football');
    if (/puzzle|match|brain|connect|block|logic|sudoku|tile|mahjong|jewel|bubble|jigsaw|maze|2048|physics puzzle|word/i.test(text)) matched.push('puzzle');
    if (/strategy|tower|defense|chess|tactic|conquer|empire|commander|rts|clash|war/i.test(text)) matched.push('strategy');
    if (/platform|jump|hop|run|runner|parkour|climb|dash|fly|leap|frog/i.test(text)) matched.push('platform');
    if (/multiplayer|2 player|two player|online|pvp|co-op|versus|vs/i.test(text) || (game.features && game.features.includes('multiplayer'))) matched.push('multiplayer');
    if (/arcade|retro|classic|score|endless|pac|pinball|breakout|brick|pong|snake|flappy/i.test(text)) matched.push('arcade');
    if (/simulat(ion|or)|tycoon|virtual|manage|farm|build|city|craft|life/i.test(text)) matched.push('simulation');
    if (/casual|relax|easy|tap|pop|fun|simple|hypercasual|idle/i.test(text)) matched.push('casual');
    if (/kid|child|cute|coloring|draw|baby|animal|pet|puppy|kitty|farm/i.test(text)) matched.push('kids-games');
    if (/beauty|dress|makeup|fashion|salon|style|outfit|princess|hair|spa/i.test(text)) matched.push('beauty');
    if (/pool|billiard|snooker|8-ball|8 ball/i.test(text)) matched.push('pool');
    if (/board|chess|checkers|domino|backgammon|ludo|scrabble/i.test(text)) matched.push('board-games');
    if (/card|solitaire|poker|blackjack|spades|hearts|klondike|uno/i.test(text)) matched.push('card-games');
    if (/clicker|idle|tap|tapper|tycoon|incremental|upgrade/i.test(text)) matched.push('clicker');
    if (/\.io\b|io game|worm|slither|agar|arena/i.test(text)) matched.push('io-games');

    if (matched.length === 0) {
      const cat = (game.category || '').toLowerCase();
      if (cat.includes('shoot')) matched.push('shooting');
      else if (cat.includes('rac')) matched.push('racing');
      else if (cat.includes('action')) matched.push('action');
      else if (cat.includes('puzz')) matched.push('puzzle');
      else if (cat.includes('sport')) matched.push('sports');
      else if (cat.includes('arc')) matched.push('arcade');
      else matched.push('casual');
    }
    return [...new Set(matched)];
  }

  // --- Application State ---
  let catalog = [];
  let categoryList = [];
  let categoryCounts = {};
  let favorites = [];
  let recentlyPlayed = [];

  function loadLocalState() {
    try {
      favorites = JSON.parse(localStorage.getItem('nexus_favorites') || '[]');
      recentlyPlayed = JSON.parse(localStorage.getItem('nexus_recently_played') || '[]');
    } catch (e) {
      favorites = [];
      recentlyPlayed = [];
    }
  }

  function toggleFavorite(slug) {
    const idx = favorites.indexOf(slug);
    if (idx > -1) {
      favorites.splice(idx, 1);
    } else {
      favorites.push(slug);
    }
    try {
      localStorage.setItem('nexus_favorites', JSON.stringify(favorites));
    } catch (e) {}
    updateHeaderAndSidebarBadges();
    return favorites.includes(slug);
  }

  function addRecentlyPlayed(slug) {
    recentlyPlayed = recentlyPlayed.filter(s => s !== slug);
    recentlyPlayed.unshift(slug);
    if (recentlyPlayed.length > 25) recentlyPlayed.pop();
    try {
      localStorage.setItem('nexus_recently_played', JSON.stringify(recentlyPlayed));
    } catch (e) {}
    updateHeaderAndSidebarBadges();
  }

  function updateHeaderAndSidebarBadges() {
    const favCountEl = document.getElementById('favBadgeCount');
    if (favCountEl) favCountEl.textContent = favorites.length;

    const recentCountEl = document.getElementById('recentBadgeCount');
    if (recentCountEl) recentCountEl.textContent = recentlyPlayed.length;

    const headerFavCount = document.getElementById('headerFavCount');
    if (headerFavCount) headerFavCount.textContent = favorites.length;
  }

  function computeCategoryCounts() {
    categoryCounts = {};
    categoryList.forEach(c => { categoryCounts[c.slug] = 0; });

    catalog.forEach(game => {
      const cats = matchCategories(game);
      game._categories = cats;
      cats.forEach(c => {
        categoryCounts[c] = (categoryCounts[c] || 0) + 1;
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- Render Sidebar ---
  function renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    let catListHtml = '';
    let visibleCategoryCount = 0;

    categoryList.forEach(cat => {
      const count = categoryCounts[cat.slug] || 0;
      if (count === 0) return; // Only show when matching games exist
      visibleCategoryCount++;

      const iconSvg = getCategoryIcon(cat.slug);
      catListHtml += `
        <a href="#/category/${cat.slug}" class="category-nav-item" data-category="${cat.slug}">
          <div class="category-nav-left">
            <span class="category-nav-icon">${iconSvg}</span>
            <span class="category-nav-name">${cat.name}</span>
          </div>
          <span class="category-nav-count">${count}</span>
        </a>
      `;
    });

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <a href="#/" class="sidebar-brand" aria-label="NexusPlay Home">
          <img class="brand-full" src="assets/images/logo.svg" alt="NexusPlay">
          <img class="brand-icon" src="assets/images/favicon.svg" alt="NexusPlay">
        </a>
        <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" aria-label="Toggle Sidebar" title="Collapse sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-nav-group">
          <a href="#/" class="nav-pill" data-nav="home">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
            <span class="nav-pill-label">Home</span>
          </a>
          <a href="#/popular" class="nav-pill" data-nav="popular">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg></span>
            <span class="nav-pill-label">Popular Games</span>
          </a>
          <a href="#/new" class="nav-pill" data-nav="new">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg></span>
            <span class="nav-pill-label">New Games</span>
          </a>
          <a href="#/recent" class="nav-pill" data-nav="recent">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <span class="nav-pill-label">Recently Played</span>
            <span class="sidebar-section-count" id="recentBadgeCount">${recentlyPlayed.length}</span>
          </a>
          <a href="#/favorites" class="nav-pill" data-nav="favorites">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
            <span class="nav-pill-label">My Favorites</span>
            <span class="sidebar-section-count" id="favBadgeCount">${favorites.length}</span>
          </a>
          <a href="#/games" class="nav-pill" data-nav="games">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
            <span class="nav-pill-label">All 200 Games</span>
            <span class="sidebar-section-count">${catalog.length}</span>
          </a>
        </div>

        <div class="sidebar-section-header">
          <span>Categories</span>
          <span class="sidebar-section-count" id="sidebarCategoryCount">${visibleCategoryCount}</span>
        </div>

        <div class="category-nav-list" id="categoryNavList">
          ${catListHtml}
        </div>
      </div>
    `;

    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-collapsed');
      });
    }

    const brandIcon = sidebar.querySelector('.brand-icon');
    if (brandIcon) {
      brandIcon.addEventListener('click', (e) => {
        if (document.body.classList.contains('sidebar-collapsed')) {
          e.preventDefault();
          document.body.classList.remove('sidebar-collapsed');
        }
      });
    }
  }

  // --- Render Header ---
  function renderHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    header.innerHTML = `
      <div class="header-inner">
        <div class="header-left">
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open Navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="search-wrapper">
            <div class="search-input-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" class="search-input" id="globalSearchInput" placeholder="Search 200+ games by title, genre, tag..." autocomplete="off">
              <button class="search-clear-btn" id="searchClearBtn" aria-label="Clear Search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="search-suggestions" id="searchSuggestions"></div>
          </div>
        </div>
        <div class="header-right">
          <a href="#/favorites" class="btn-header-fav" id="headerFavLink" title="View Favorites">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>Favorites</span>
            <span class="header-fav-count" id="headerFavCount">${favorites.length}</span>
          </a>
        </div>
      </div>
    `;

    initSearchEvents();
    initMobileNavEvents();
  }

  // --- Render Footer ---
  function renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="#/" class="footer-logo">
              <img src="assets/images/logo.svg" alt="NexusPlay" height="34">
            </a>
            <p>NEXUSPLAY is the premier dark gaming portal offering 200 free, instant-play HTML5 games across 22 categories with zero downloads or installs.</p>
          </div>
          <div class="footer-col">
            <h4>Popular Categories</h4>
            <ul class="footer-links">
              <li><a href="#/category/shooting">Shooting Games</a></li>
              <li><a href="#/category/racing">Racing & Cars</a></li>
              <li><a href="#/category/action">Action & Adventure</a></li>
              <li><a href="#/category/puzzle">Puzzle & Brain</a></li>
              <li><a href="#/category/sports">Sports & Football</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Portal Navigation</h4>
            <ul class="footer-links">
              <li><a href="#/">Home</a></li>
              <li><a href="#/games">All 200 Games</a></li>
              <li><a href="#/popular">Popular Games</a></li>
              <li><a href="#/new">New Additions</a></li>
              <li><a href="#/favorites">My Favorites</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Platform Details</h4>
            <ul class="footer-links">
              <li><span style="color:var(--text-muted)">100% Client-Side Static</span></li>
              <li><span style="color:var(--text-muted)">Compatible with GitHub Pages</span></li>
              <li><span style="color:var(--text-muted)">Mobile & Desktop Optimized</span></li>
              <li><span style="color:var(--text-muted)">Instant HTML5 Execution</span></li>
            </ul>
          </div>
        </div>
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 0.82rem; color: var(--text-muted);">
          <div>&copy; 2026 NEXUSPLAY. All rights reserved. Free HTML5 Gaming Portal.</div>
          <div>Dark Gaming Aesthetic &bull; 200 Verified Games &bull; 22 Categories</div>
        </div>
      </div>
    `;
  }

  // --- Search & Drawer Listeners ---
  function initSearchEvents() {
    const input = document.getElementById('globalSearchInput');
    const suggestions = document.getElementById('searchSuggestions');
    const clearBtn = document.getElementById('searchClearBtn');
    if (!input || !suggestions) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

      if (!q) {
        suggestions.classList.remove('active');
        suggestions.innerHTML = '';
        return;
      }

      const matches = catalog.filter(g => {
        return (g.title || '').toLowerCase().includes(q) ||
               (g.category || '').toLowerCase().includes(q) ||
               (g.tags || []).some(t => t.toLowerCase().includes(q));
      }).slice(0, 8);

      if (matches.length === 0) {
        suggestions.innerHTML = '<div style="padding:14px; text-align:center; color:var(--text-muted); font-size:0.86rem;">No games found for "' + escapeHtml(q) + '"</div>';
      } else {
        suggestions.innerHTML = matches.map(g => `
          <a href="#/game/${g.slug}" class="suggestion-item" onclick="document.getElementById('searchSuggestions').classList.remove('active')">
            <img class="suggestion-thumb" src="${g.thumbnail}" alt="${escapeHtml(g.title)}" onerror="this.onerror=null;this.src='assets/images/logo.svg'">
            <div class="suggestion-info">
              <div class="suggestion-title">${escapeHtml(g.title)}</div>
              <div class="suggestion-cat">${escapeHtml(g.category || 'Arcade')}</div>
            </div>
            <span style="font-size:0.75rem; font-weight:700; color:#38BDF8; padding:3px 8px; border-radius:4px; background:rgba(56,189,248,0.1);">PLAY</span>
          </a>
        `).join('');
      }
      suggestions.classList.add('active');
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        suggestions.classList.remove('active');
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = input.value.trim().toLowerCase();
        if (q) {
          suggestions.classList.remove('active');
          const matches = catalog.filter(g => {
            return (g.title || '').toLowerCase().includes(q) ||
                   (g.category || '').toLowerCase().includes(q) ||
                   (g.tags || []).some(t => t.toLowerCase().includes(q));
          });
          renderAllGamesView('Search: "' + q + '"', matches);
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        suggestions.classList.remove('active');
      }
    });
  }

  function initMobileNavEvents() {
    const toggle = document.getElementById('mobileNavToggle');
    const overlay = document.getElementById('mobile-drawer-overlay');

    if (toggle) {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('mobile-sidebar-open');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        document.body.classList.remove('mobile-sidebar-open');
      });
    }

    // Close mobile drawer when clicking any sidebar link
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) {
      sidebar.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          document.body.classList.remove('mobile-sidebar-open');
        }
      });
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // --- Game Card Renderer ---
  function renderCard(game) {
    const isFav = favorites.includes(game.slug);
    const catName = game.category || 'Arcade';
    const rating = game.rating ? game.rating.toFixed(1) : '4.5';

    // Optional badge
    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge badge-top">TOP</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge badge-hot">HOT</span>';
    }

    return `
      <div class="game-card" data-slug="${game.slug}">
        <div class="card-media">
          <img class="card-thumb" src="${game.thumbnail}" alt="${escapeHtml(game.title)}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'><rect fill=\'%23121620\' width=\'300\' height=\'200\'/><text fill=\'%236B7280\' font-family=\'sans-serif\' font-size=\'14\' x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\'>Game</text></svg>'">
          ${badgeHtml}
          <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('${game.slug}', event)" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <a href="#/game/${game.slug}" class="card-play-overlay">
            <div class="card-play-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
            </div>
          </a>
        </div>
        <div class="card-details">
          <a href="#/game/${game.slug}" class="card-title" title="${escapeHtml(game.title)}">${escapeHtml(game.title)}</a>
          <div class="card-meta-row">
            <span class="card-category-pill">${escapeHtml(catName)}</span>
            <span class="card-rating-pill" style="display:inline-flex; align-items:center; gap:3px; color:#F59E0B; font-weight:700;">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${rating}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // --- Scroll Row Shelf ---
  function renderShelf(title, iconSvg, seeAllHref, games, rowId) {
    if (!games || games.length === 0) return '';
    const cardsHtml = games.map(renderCard).join('');

    return `
      <section class="scroll-section" id="sec-${rowId}">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon">${iconSvg}</span>
            <h2 class="section-shelf-title">${title}</h2>
            <span class="sidebar-section-count">${games.length}</span>
          </div>
          <div class="section-actions">
            ${seeAllHref ? `<a href="${seeAllHref}" class="see-all-link">See All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a>` : ''}
            <div class="scroll-controls">
              <button class="scroll-arrow-btn prev" onclick="window.NEXUS.scrollRow('${rowId}', -1)" aria-label="Scroll left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="scroll-arrow-btn next" onclick="window.NEXUS.scrollRow('${rowId}', 1)" aria-label="Scroll right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-row-wrapper">
          <div class="scroll-row" id="${rowId}">
            ${cardsHtml}
          </div>
        </div>
      </section>
    `;
  }

  // --- View: Homepage (All 11 Sections) ---
  function renderHomepage() {
    const main = document.getElementById('app-main');
    if (!main) return;

    // Filter games for 11 requested sections:
    // 1. Top Picks for You (top rating)
    const topPicks = [...catalog].sort((a,b) => (b.rating || 4.5) - (a.rating || 4.5)).slice(0, 16);

    // 2. Featured Games
    const featured = catalog.filter(g => g.featured || (g.tags && g.tags.includes('featured'))).slice(0, 16);
    const featuredList = featured.length >= 8 ? featured : catalog.slice(0, 16);

    // 3. Popular Games
    const popular = catalog.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7)).slice(0, 16);

    // 4. Shooting Games
    const shooting = catalog.filter(g => g._categories && g._categories.includes('shooting')).slice(0, 16);

    // 5. Racing Games
    const racing = catalog.filter(g => g._categories && (g._categories.includes('racing') || g._categories.includes('car'))).slice(0, 16);

    // 6. Action & Adventure
    const actionAdv = catalog.filter(g => g._categories && (g._categories.includes('action') || g._categories.includes('adventure'))).slice(0, 16);

    // 7. Puzzle & Brain Games
    const puzzle = catalog.filter(g => g._categories && g._categories.includes('puzzle')).slice(0, 16);

    // 8. Sports Games
    const sports = catalog.filter(g => g._categories && (g._categories.includes('sports') || g._categories.includes('football'))).slice(0, 16);

    // 9. Multiplayer Games (only where supported)
    const multiplayer = catalog.filter(g => g._categories && (g._categories.includes('multiplayer') || (g.features && g.features.includes('multiplayer')))).slice(0, 16);

    // 10. New Games
    const newGames = catalog.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01')).slice(0, 16);

    // 11. Explore All Games (Responsive Grid)
    const exploreGames = catalog.slice(0, 48);

    const html = `
      <!-- Hero Banner -->
      <section class="portal-hero" style="margin-bottom: 30px; padding: 36px 32px; background: linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(139,92,246,0.18) 50%, rgba(10,13,20,0.85) 100%), var(--bg-surface); border: 1px solid var(--border-card); border-radius: var(--radius-lg); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 280px; z-index: 2;">
          <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: var(--radius-full); background: rgba(37,99,235,0.2); border: 1px solid rgba(56,189,248,0.3); font-size: 0.78rem; font-weight: 700; color: #38BDF8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981;"></span>
            200 Free Games Live
          </div>
          <h1 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 900; line-height: 1.15; color: #FFF; margin-bottom: 12px; letter-spacing: -0.5px;">
            Play The Best Free Games <span style="background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Online</span>
          </h1>
          <p style="color: var(--text-secondary); font-size: 0.96rem; max-width: 560px; line-height: 1.6; margin-bottom: 22px;">
            Instant browser gaming with dark aesthetics. No downloads, no plugins. Play shooting, racing, puzzle, and arcade games anytime.
          </p>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <a href="#/games" class="btn btn-primary" style="padding: 10px 22px; font-weight: 700; border-radius: var(--radius-md);">
              Explore All 200 Games
            </a>
            <a href="#/category/shooting" class="btn btn-secondary" style="padding: 10px 18px; font-weight: 600; border-radius: var(--radius-md);">
              Shooting Action
            </a>
          </div>
        </div>
        <div style="display: flex; gap: 16px; z-index: 2;">
          <div style="text-align: center; padding: 16px 20px; background: rgba(10,13,20,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); min-width: 100px;">
            <div style="font-size: 1.8rem; font-weight: 900; color: #38BDF8; font-family: var(--font-heading);">200</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Games</div>
          </div>
          <div style="text-align: center; padding: 16px 20px; background: rgba(10,13,20,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); min-width: 100px;">
            <div style="font-size: 1.8rem; font-weight: 900; color: #A78BFA; font-family: var(--font-heading);">22</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Categories</div>
          </div>
          <div style="text-align: center; padding: 16px 20px; background: rgba(10,13,20,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); min-width: 100px;">
            <div style="font-size: 1.8rem; font-weight: 900; color: #34D399; font-family: var(--font-heading);">100%</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Free</div>
          </div>
        </div>
      </section>

      <!-- 1. Top Picks for You -->
      ${renderShelf('Top Picks for You', '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', '#/popular', topPicks, 'row-top-picks')}

      <!-- 2. Featured Games -->
      ${renderShelf('Featured Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>', '#/games', featuredList, 'row-featured')}

      <!-- 3. Popular Games -->
      ${renderShelf('Popular Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg>', '#/popular', popular, 'row-popular')}

      <!-- 4. Shooting Games -->
      ${renderShelf('Shooting Games', getCategoryIcon('shooting'), '#/category/shooting', shooting, 'row-shooting')}

      <!-- 5. Racing Games -->
      ${renderShelf('Racing & Car Games', getCategoryIcon('racing'), '#/category/racing', racing, 'row-racing')}

      <!-- 6. Action & Adventure -->
      ${renderShelf('Action & Adventure', getCategoryIcon('action'), '#/category/action', actionAdv, 'row-action')}

      <!-- 7. Puzzle & Brain Games -->
      ${renderShelf('Puzzle & Brain Games', getCategoryIcon('puzzle'), '#/category/puzzle', puzzle, 'row-puzzle')}

      <!-- 8. Sports Games -->
      ${renderShelf('Sports & Football', getCategoryIcon('sports'), '#/category/sports', sports, 'row-sports')}

      <!-- 9. Multiplayer Games (only where supported) -->
      ${multiplayer.length > 0 ? renderShelf('Multiplayer Games', getCategoryIcon('multiplayer'), '#/category/multiplayer', multiplayer, 'row-multiplayer') : ''}

      <!-- 10. New Games -->
      ${renderShelf('New Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>', '#/new', newGames, 'row-new')}

      <!-- 11. Explore All Games (Responsive Grid) -->
      <section class="explore-all-section" style="margin-top: 10px; margin-bottom: 30px;">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
            <h2 class="section-shelf-title">Explore All Games</h2>
            <span class="sidebar-section-count">${catalog.length}</span>
          </div>
          <a href="#/games" class="see-all-link">View Full Library (${catalog.length})</a>
        </div>
        <div class="games-grid">
          ${exploreGames.map(renderCard).join('')}
        </div>
        <div style="margin-top: 24px; text-align: center;">
          <a href="#/games" class="btn btn-primary" style="padding: 12px 30px; font-weight: 700; border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 8px;">
            <span>Browse Complete Library (${catalog.length} Games)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </section>
    `;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- View: All Games / Category / Filtered View ---
  function renderAllGamesView(title = 'All Games', games = catalog, activeCatSlug = null) {
    const main = document.getElementById('app-main');
    if (!main) return;

    let desc = `Showing ${games.length} games in our collection.`;
    if (activeCatSlug) {
      const catObj = categoryList.find(c => c.slug === activeCatSlug);
      if (catObj && catObj.description) desc = catObj.description;
    }

    const cardsHtml = games.length > 0
      ? games.map(renderCard).join('')
      : `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="width: 54px; height: 54px; margin: 0 auto 16px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); margin-bottom:8px;">No Games Found</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:18px;">We couldn't find games matching your criteria. Try another category!</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      `;

    const iconSvg = activeCatSlug ? getCategoryIcon(activeCatSlug) : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';

    const html = `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="section-badge-icon" style="width: 36px; height: 36px;">${iconSvg}</span>
            <div>
              <h1 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF; margin: 0;">${escapeHtml(title)}</h1>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 4px 0 0 0;">${escapeHtml(desc)}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="sidebar-section-count" style="font-size: 0.82rem; padding: 4px 12px;">${games.length} ${games.length === 1 ? 'Game' : 'Games'}</span>
            <select id="sortSelect" onchange="window.NEXUS.sortView(this.value)" style="background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.85rem; outline: none;">
              <option value="featured">Sort: Featured</option>
              <option value="rating">Top Rated</option>
              <option value="az">Title: A to Z</option>
              <option value="za">Title: Z to A</option>
            </select>
          </div>
        </div>

        <!-- Category Shortcuts Bar -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 12px; scrollbar-width: none;">
          <a href="#/games" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid ${!activeCatSlug ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: ${!activeCatSlug ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: ${!activeCatSlug ? '#38BDF8' : 'var(--text-secondary)'};">
            All (${catalog.length})
          </a>
          ${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = activeCatSlug === c.slug;
            return `
              <a href="#/category/${c.slug}" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: ${isActive ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: ${isActive ? '#38BDF8' : 'var(--text-secondary)'};">
                ${c.name} (${count})
              </a>
            `;
          }).join('')}
        </div>
      </div>

      <div class="games-grid" id="mainGamesGrid">
        ${cardsHtml}
      </div>
    `;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- View: Game Detail & Play Page ---
  function renderGameDetail(slug) {
    const main = document.getElementById('app-main');
    if (!main) return;

    const game = catalog.find(g => g.slug === slug);
    if (!game) {
      main.innerHTML = `
        <div style="text-align: center; padding: 80px 20px;">
          <h2 style="color: #FFF; font-family: var(--font-heading); margin-bottom: 12px;">Game Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">We couldn't locate the game you requested.</p>
          <a href="#/" class="btn btn-primary">Return to Homepage</a>
        </div>
      `;
      return;
    }

    addRecentlyPlayed(slug);

    const isFav = favorites.includes(slug);
    const related = catalog.filter(g => g.slug !== slug && (g._categories.some(c => game._categories.includes(c)) || g.category === game.category)).slice(0, 10);
    const embedUrl = game.embedUrl || game.gameUrl || game.url;
    const catSlug = (game._categories && game._categories[0]) || 'arcade';

    const html = `
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <a href="#/category/${catSlug}" class="breadcrumb-link">${escapeHtml(game.category || 'Arcade')}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${escapeHtml(game.title)}</span>
      </nav>

      <div class="game-detail-layout" id="gameDetailLayout">
        <!-- Main Column -->
        <div class="game-main-content">
          <div class="player-container" id="playerContainer">
            <iframe
              id="gameFrame"
              class="game-iframe"
              src="${embedUrl}"
              title="${escapeHtml(game.title)}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowfullscreen
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-pointer-lock"
              loading="eager"
            ></iframe>
            <div class="player-loader" id="playerLoader">
              <div class="spinner"></div>
              <div class="loader-text">Loading ${escapeHtml(game.title)}...</div>
            </div>
          </div>

          <!-- Controls Bar -->
          <div class="player-controls-bar">
            <div style="display:flex; align-items:center; gap:12px; min-width:0;">
              <img src="${game.thumbnail}" alt="${escapeHtml(game.title)}" style="width:38px; height:28px; border-radius:4px; object-fit:cover;">
              <div style="min-width:0;">
                <h1 class="player-game-title" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(game.title)}</h1>
                <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(game.category || 'Arcade')}</span>
              </div>
            </div>

            <div class="player-controls-right">
              <button class="ctrl-btn ${isFav ? 'is-fav' : ''}" id="playerFavBtn" onclick="window.NEXUS.togglePlayerFav('${game.slug}')" title="Favorite">
                <span class="ctrl-btn-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </span>
                <span id="playerFavLabel">${isFav ? 'Favorited' : 'Favorite'}</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.reloadGame()" title="Reload game">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></span>
                <span>Reload</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.toggleTheater()" title="Theater mode">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
                <span>Theater</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.toggleFullscreen()" style="background:var(--accent-gradient); color:#FFF; border-color:transparent;" title="Fullscreen">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span>
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          <!-- Metadata & Description -->
          <div class="game-info-card">
            <h2>About ${escapeHtml(game.title)}</h2>
            <div class="game-meta-tags">
              <span class="card-badge badge-popular" style="position:static;">${escapeHtml(game.category || 'Arcade')}</span>
              ${game.tags ? game.tags.slice(0, 5).map(t => `<span style="background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:4px; font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(t)}</span>`).join('') : ''}
            </div>
            <p style="color:var(--text-secondary); line-height:1.7; font-size:0.94rem; margin-bottom:18px;">
              ${escapeHtml(game.description || 'Play ' + game.title + ' instantly online on NEXUSPLAY. No download required. Free browser gameplay.')}
            </p>

            ${game.instructions ? `
              <div style="background:rgba(255,255,255,0.03); border-left:3px solid var(--accent-primary); padding:14px 18px; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                <h4 style="color:#FFF; font-size:0.92rem; font-family:var(--font-heading); margin-bottom:6px;">Instructions & Controls</h4>
                <p style="color:var(--text-muted); font-size:0.88rem; line-height:1.6; margin:0;">${escapeHtml(game.instructions)}</p>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Related Games Sidebar Column -->
        <div class="game-sidebar">
          <h3 style="font-family:var(--font-heading); font-size:1.05rem; font-weight:800; color:#FFF; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            Related Games
          </h3>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${related.map(r => `
              <a href="#/game/${r.slug}" style="display:flex; align-items:center; gap:12px; padding:8px 10px; border-radius:var(--radius-md); background:var(--bg-surface); border:1px solid var(--border-subtle); text-decoration:none; transition:all var(--transition-fast);" onmouseover="this.style.background='var(--bg-surface-hover)'" onmouseout="this.style.background='var(--bg-surface)'">
                <img src="${r.thumbnail}" alt="${escapeHtml(r.title)}" style="width:52px; height:36px; border-radius:4px; object-fit:cover;" loading="lazy">
                <div style="min-width:0; flex:1;">
                  <div style="font-size:0.86rem; font-weight:700; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(r.title)}</div>
                  <div style="font-size:0.72rem; color:var(--text-muted);">${escapeHtml(r.category || 'Arcade')}</div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Iframe load listener
    const frame = document.getElementById('gameFrame');
    const loader = document.getElementById('playerLoader');
    if (frame && loader) {
      frame.onload = () => {
        loader.classList.add('hidden');
      };
      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
      }, 3500);
    }
  }

  // --- Router ---
  function handleRoute() {
    const hash = window.location.hash || '#/';
    updateActiveNavClasses(hash);

    if (hash === '#/' || hash === '' || hash === '#') {
      renderHomepage();
    } else if (hash === '#/games') {
      renderAllGamesView('All 200 Games', catalog);
    } else if (hash === '#/popular') {
      const pop = catalog.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7));
      renderAllGamesView('Popular Games', pop.length ? pop : catalog.slice(0, 50));
    } else if (hash === '#/new') {
      const nw = catalog.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01'));
      renderAllGamesView('New Games', nw.length ? nw : catalog.slice(0, 50));
    } else if (hash === '#/favorites') {
      const favGames = catalog.filter(g => favorites.includes(g.slug));
      renderAllGamesView('My Favorites', favGames);
    } else if (hash === '#/recent') {
      const recentGames = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
      renderAllGamesView('Recently Played', recentGames);
    } else if (hash.startsWith('#/category/')) {
      const catSlug = hash.replace('#/category/', '');
      const catObj = categoryList.find(c => c.slug === catSlug);
      const catName = catObj ? catObj.name : catSlug.replace('-', ' ');
      const filtered = catalog.filter(g => g._categories && g._categories.includes(catSlug));
      renderAllGamesView(catName + ' Games', filtered, catSlug);
    } else if (hash.startsWith('#/game/')) {
      const slug = hash.replace('#/game/', '');
      renderGameDetail(slug);
    } else {
      renderHomepage();
    }
  }

  function updateActiveNavClasses(hash) {
    document.querySelectorAll('.nav-pill').forEach(el => {
      const href = el.getAttribute('href');
      if (href === hash) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    document.querySelectorAll('.category-nav-item').forEach(el => {
      const cat = el.getAttribute('data-category');
      if (hash === `#/category/${cat}`) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // --- Global Window NEXUS Namespace ---
  window.NEXUS = {
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
    },

    togglePlayerFav: function (slug) {
      const isFav = toggleFavorite(slug);
      const btn = document.getElementById('playerFavBtn');
      const label = document.getElementById('playerFavLabel');
      if (btn) {
        btn.classList.toggle('is-fav', isFav);
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
      }
      if (label) {
        label.textContent = isFav ? 'Favorited' : 'Favorite';
      }
    },

    reloadGame: function () {
      const frame = document.getElementById('gameFrame');
      const loader = document.getElementById('playerLoader');
      if (frame) {
        if (loader) loader.classList.remove('hidden');
        frame.src = frame.src;
      }
    },

    toggleFullscreen: function () {
      const container = document.getElementById('playerContainer');
      if (!container) return;

      if (!document.fullscreenElement) {
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
        else if (container.msRequestFullscreen) container.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    },

    toggleTheater: function () {
      const layout = document.getElementById('gameDetailLayout');
      if (layout) {
        layout.classList.toggle('theater-mode');
      }
    },

    scrollRow: function (rowId, direction) {
      const row = document.getElementById(rowId);
      if (!row) return;
      const scrollAmount = row.clientWidth * 0.75 * direction;
      row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    },

    sortView: function (sortBy) {
      const hash = window.location.hash || '#/';
      let list = [...catalog];

      if (hash.startsWith('#/category/')) {
        const catSlug = hash.replace('#/category/', '');
        list = list.filter(g => g._categories && g._categories.includes(catSlug));
      } else if (hash === '#/favorites') {
        list = list.filter(g => favorites.includes(g.slug));
      } else if (hash === '#/recent') {
        list = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
      }

      if (sortBy === 'rating') {
        list.sort((a,b) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === 'az') {
        list.sort((a,b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'za') {
        list.sort((a,b) => b.title.localeCompare(a.title));
      }

      const grid = document.getElementById('mainGamesGrid');
      if (grid) {
        grid.innerHTML = list.map(renderCard).join('');
      }
    }
  };

  // --- Application Bootstrap ---
  async function init() {
    loadLocalState();

    // Use embedded fallback if available
    if (window.NEXUS_CATALOG && Array.isArray(window.NEXUS_CATALOG) && window.NEXUS_CATALOG.length > 0) {
      catalog = window.NEXUS_CATALOG;
    }
    if (window.NEXUS_CATEGORIES && Array.isArray(window.NEXUS_CATEGORIES) && window.NEXUS_CATEGORIES.length > 0) {
      categoryList = window.NEXUS_CATEGORIES;
    }

    // Try fetching external JSON data if not already populated
    try {
      if (catalog.length === 0) {
        const gRes = await fetch('data/games.json');
        catalog = await gRes.json();
      }
      if (categoryList.length === 0) {
        const cRes = await fetch('data/categories.json');
        categoryList = await cRes.json();
      }
    } catch (e) {
      // Offline or file protocol fallback already loaded
    }

    console.log(`[NEXUSPLAY] Initialized with ${catalog.length} games across ${categoryList.length} categories.`);

    computeCategoryCounts();
    renderSidebar();
    renderHeader();
    renderFooter();

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

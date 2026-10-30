const fs = require('fs');
const path = require('path');

// Let's create the comprehensive, production-ready bundle.js
const bundleContent = `/**
 * NEXUSPLAY - Complete Modern Gaming Portal Bundle (Production Ready)
 * Dark gaming aesthetic inspired by CrazyGames layout
 * Fully static, zero external backend dependencies, GitHub Pages compatible
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
    if (/\\.io\\b|io game|worm|slither|agar|arena/i.test(text)) matched.push('io-games');

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
    const added = idx === -1;
    if (added) {
      favorites.push(slug);
      nexusAnalytics.track('favorite_added', { slug });
      showToast('Added to My Favorites!', '♥');
    } else {
      favorites.splice(idx, 1);
      showToast('Removed from Favorites', '♡');
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
    if (recentlyPlayed.length > 30) recentlyPlayed.pop();
    try {
      localStorage.setItem('nexus_recently_played', JSON.stringify(recentlyPlayed));
    } catch (e) {}
    updateHeaderAndSidebarBadges();
  }

  function updateHeaderAndSidebarBadges() {
    const favHeader = document.getElementById('headerFavCount');
    if (favHeader) favHeader.textContent = favorites.length;

    const favSidebar = document.getElementById('favBadgeCount');
    if (favSidebar) favSidebar.textContent = favorites.length;

    const recentSidebar = document.getElementById('recentBadgeCount');
    if (recentSidebar) recentSidebar.textContent = recentlyPlayed.length;
  }

  function computeCategoryCounts() {
    categoryCounts = {};
    categoryList.forEach(c => categoryCounts[c.slug] = 0);

    catalog.forEach(game => {
      const cats = matchCategories(game);
      game._categories = cats;
      cats.forEach(slug => {
        categoryCounts[slug] = (categoryCounts[slug] || 0) + 1;
      });
    });
  }

  // --- Utility Functions ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeUrl(url) {
    if (!url) return '';
    const trimmed = String(url).trim();
    // Allow relative local paths or HTTPS external URLs only
    if (trimmed.startsWith('games/') || trimmed.startsWith('./games/') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return '';
  }

  function showToast(message, icon = '✓') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = \`<span style="font-size:1.1rem; color:#38BDF8;">\${icon}</span><span>\${escapeHtml(message)}</span>\`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Google AdSense Engine (Configurable, Inactive by Default) ---
  const ADS_CONFIG = {
    enabled: false,
    client: '',
    slots: {
      homeLeaderboard: '',
      gameSidebar: '',
      gameFooter: ''
    }
  };

  const nexusAds = {
    init: function (config) {
      if (config && typeof config === 'object') {
        Object.assign(ADS_CONFIG, config);
      }
    },
    renderSlot: function (slotName) {
      if (!ADS_CONFIG.enabled || !ADS_CONFIG.client || !ADS_CONFIG.slots[slotName]) {
        return '';
      }
      return \`
        <div class="nexus-ad-slot-wrap" data-slot="\${escapeHtml(slotName)}" style="margin: 20px 0; text-align: center;">
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="\${escapeHtml(ADS_CONFIG.client)}"
               data-ad-slot="\${escapeHtml(ADS_CONFIG.slots[slotName])}"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      \`;
    }
  };

  // --- Analytics Engine (Configurable, Zero Tracking when Disabled) ---
  const ANALYTICS_CONFIG = {
    enabled: false,
    measurementId: ''
  };

  const nexusAnalytics = {
    init: function (config) {
      if (config && typeof config === 'object') {
        Object.assign(ANALYTICS_CONFIG, config);
      }
    },
    track: function (eventName, params = {}) {
      if (!ANALYTICS_CONFIG.enabled) return;
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }
    }
  };

  // --- Dynamic SEO Metadata & Schema Manager ---
  function updateSeo({ title, description, canonical, ogType, ogImage, schema }) {
    if (title) {
      document.title = title;
      const metaTitle = document.querySelector('meta[name="title"]');
      if (metaTitle) metaTitle.setAttribute('content', title);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      const twTitle = document.querySelector('meta[property="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', title);
    }
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
      const twDesc = document.querySelector('meta[property="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', description);
    }
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', canonical);
      const twUrl = document.querySelector('meta[property="twitter:url"]');
      if (twUrl) twUrl.setAttribute('content', canonical);
    }
    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', ogImage);
      const twImg = document.querySelector('meta[property="twitter:image"]');
      if (twImg) twImg.setAttribute('content', ogImage);
    }
    if (ogType) {
      const ogT = document.querySelector('meta[property="og:type"]');
      if (ogT) ogT.setAttribute('content', ogType);
    }
    if (schema) {
      const schemaScript = document.getElementById('nexus-schema');
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schema, null, 2);
      }
    }
  }

  // --- Render Sidebar ---
  function renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    let catListHtml = '';
    let visibleCategoryCount = 0;

    categoryList.forEach(cat => {
      const count = categoryCounts[cat.slug] || 0;
      if (count === 0) return;
      visibleCategoryCount++;

      const iconSvg = getCategoryIcon(cat.slug);
      catListHtml += \`
        <a href="#/category/\${cat.slug}" class="category-nav-item" data-category="\${cat.slug}" data-tooltip="\${cat.name}" title="\${cat.name}">
          <div class="category-nav-left">
            <span class="category-nav-icon">\${iconSvg}</span>
            <span class="category-nav-name">\${cat.name}</span>
          </div>
          <span class="category-nav-count">\${count}</span>
        </a>
      \`;
    });

    sidebar.innerHTML = \`
      <div class="sidebar-header">
        <a href="#/" class="sidebar-brand" aria-label="NexusPlay Home" data-tooltip="NexusPlay Home">
          <img class="brand-full" src="assets/images/logo.svg" alt="NexusPlay">
          <img class="brand-icon" src="assets/images/favicon.svg" alt="NexusPlay" title="Click to expand sidebar">
        </a>
        <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" aria-label="Toggle Sidebar" title="Collapse sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-nav-group">
          <a href="#/" class="nav-pill" data-nav="home" data-tooltip="Home" title="Home">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
            <span class="nav-pill-label">Home</span>
          </a>
          <a href="#/popular" class="nav-pill" data-nav="popular" data-tooltip="Popular Games" title="Popular Games">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg></span>
            <span class="nav-pill-label">Popular Games</span>
          </a>
          <a href="#/new" class="nav-pill" data-nav="new" data-tooltip="New Games" title="New Games">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg></span>
            <span class="nav-pill-label">New Games</span>
          </a>
          <a href="#/recent" class="nav-pill" data-nav="recent" data-tooltip="Recently Played" title="Recently Played">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <span class="nav-pill-label">Recently Played</span>
            <span class="sidebar-section-count" id="recentBadgeCount">\${recentlyPlayed.length}</span>
          </a>
          <a href="#/favorites" class="nav-pill" data-nav="favorites" data-tooltip="My Favorites" title="My Favorites">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
            <span class="nav-pill-label">My Favorites</span>
            <span class="sidebar-section-count" id="favBadgeCount">\${favorites.length}</span>
          </a>
          <a href="#/games" class="nav-pill" data-nav="games" data-tooltip="All 200 Games" title="All 200 Games">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
            <span class="nav-pill-label">All 200 Games</span>
            <span class="sidebar-section-count">\${catalog.length}</span>
          </a>
        </div>

        <div class="sidebar-section-header">
          <span>Categories</span>
          <span class="sidebar-section-count" id="sidebarCategoryCount">\${visibleCategoryCount}</span>
        </div>

        <div class="category-nav-list" id="categoryNavList">
          \${catListHtml}
        </div>
      </div>
    \`;

    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          document.body.classList.remove('mobile-sidebar-open');
        } else {
          const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
          try {
            localStorage.setItem('nexus_sidebar_collapsed', isCollapsed ? '1' : '0');
          } catch (e) {}
        }
      });
    }

    const brandIcon = sidebar.querySelector('.brand-icon');
    if (brandIcon) {
      brandIcon.addEventListener('click', (e) => {
        if (document.body.classList.contains('sidebar-collapsed')) {
          e.preventDefault();
          document.body.classList.remove('sidebar-collapsed');
          try {
            localStorage.setItem('nexus_sidebar_collapsed', '0');
          } catch (err) {}
        }
      });
    }
  }

  function initSidebarTooltips() {
    let tooltipEl = document.getElementById('sidebar-floating-tooltip');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'sidebar-floating-tooltip';
      tooltipEl.className = 'sidebar-floating-tooltip';
      document.body.appendChild(tooltipEl);
    }

    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    sidebar.addEventListener('mouseover', (e) => {
      if (!document.body.classList.contains('sidebar-collapsed') || window.innerWidth <= 1024) {
        tooltipEl.classList.remove('visible');
        return;
      }
      const item = e.target.closest('.nav-pill, .category-nav-item, .sidebar-brand');
      if (!item) {
        tooltipEl.classList.remove('visible');
        return;
      }
      const text = item.getAttribute('data-tooltip') || (item.classList.contains('sidebar-brand') ? 'NexusPlay (Click to expand)' : '');
      if (!text) {
        tooltipEl.classList.remove('visible');
        return;
      }
      const rect = item.getBoundingClientRect();
      tooltipEl.textContent = text;
      tooltipEl.style.top = \`\${rect.top + rect.height / 2}px\`;
      tooltipEl.style.left = \`\${rect.right + 10}px\`;
      tooltipEl.classList.add('visible');
    });

    sidebar.addEventListener('mouseleave', () => {
      tooltipEl.classList.remove('visible');
    });

    window.addEventListener('scroll', () => {
      tooltipEl.classList.remove('visible');
    }, { passive: true });
  }

  // --- Render Header ---
  function renderHeader() {
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
              <input type="text" class="search-input" id="globalSearchInput" placeholder="Search games..." autocomplete="off" aria-label="Search games catalog">
              <button class="search-clear-btn" id="searchClearBtn" aria-label="Clear Search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="search-suggestions" id="searchSuggestions" role="listbox"></div>
          </div>
        </div>
        <div class="header-right">
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
  }

  // --- Render Footer ---
  function renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;

    footer.innerHTML = \`
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
              <li><a href="#/category/shooting" class="footer-link">Shooting Games</a></li>
              <li><a href="#/category/racing" class="footer-link">Racing & Cars</a></li>
              <li><a href="#/category/action" class="footer-link">Action & Adventure</a></li>
              <li><a href="#/category/puzzle" class="footer-link">Puzzle & Brain</a></li>
              <li><a href="#/category/sports" class="footer-link">Sports & Football</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Portal Navigation</h4>
            <ul class="footer-links">
              <li><a href="#/" class="footer-link">Home</a></li>
              <li><a href="#/games" class="footer-link">All 200 Games</a></li>
              <li><a href="#/popular" class="footer-link">Popular Games</a></li>
              <li><a href="#/new" class="footer-link">New Additions</a></li>
              <li><a href="#/favorites" class="footer-link">My Favorites</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Trust & Legal</h4>
            <ul class="footer-links">
              <li><a href="#/about" class="footer-link">About Us</a></li>
              <li><a href="#/contact" class="footer-link">Contact & Support</a></li>
              <li><a href="#/privacy" class="footer-link">Privacy Policy</a></li>
              <li><a href="#/terms" class="footer-link">Terms of Service</a></li>
              <li><a href="#/dmca" class="footer-link">DMCA & Copyright</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 0.82rem; color: var(--text-muted);">
          <div>&copy; 2026 NEXUSPLAY. All rights reserved. Free HTML5 Gaming Portal.</div>
          <div>
            <a href="#/privacy" style="color:var(--text-muted); text-decoration:none; margin-right:14px;">Privacy Policy</a>
            <a href="#/terms" style="color:var(--text-muted); text-decoration:none; margin-right:14px;">Terms of Use</a>
            <a href="#/dmca" style="color:var(--text-muted); text-decoration:none;">DMCA Notice</a>
          </div>
        </div>
      </div>
    \`;
  }

  // --- Search & Drawer Listeners ---
  function initSearchEvents() {
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
          suggestions.innerHTML = '<div style="padding:14px; text-align:center; color:var(--text-muted); font-size:0.86rem;">No games found for "' + escapeHtml(q) + '"</div>';
        } else {
          suggestions.innerHTML = matches.map(g => \`
            <a href="#/game/\${g.slug}" class="suggestion-item" onclick="document.getElementById('searchSuggestions').classList.remove('active')">
              <img class="suggestion-thumb" src="\${g.thumbnail}" alt="\${escapeHtml(g.title)}" width="48" height="32" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="suggestion-info">
                <div class="suggestion-title">\${escapeHtml(g.title)}</div>
                <div class="suggestion-cat">\${escapeHtml(g.category || 'Arcade')}</div>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:#38BDF8; padding:3px 8px; border-radius:4px; background:rgba(56,189,248,0.1);">PLAY</span>
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
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('mobile-sidebar-open');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        document.body.classList.remove('mobile-sidebar-open');
      });
    }

    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) {
      sidebar.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          document.body.classList.remove('mobile-sidebar-open');
        }
      });
    }

    window.addEventListener('hashchange', () => {
      document.body.classList.remove('mobile-sidebar-open');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        document.body.classList.remove('mobile-sidebar-open');
      }
    });

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTop.classList.add('is-visible');
        } else {
          backToTop.classList.remove('is-visible');
        }
      }, { passive: true });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // --- Game Card Renderer (CLS Optimized with width/height & decoding) ---
  function renderCard(game) {
    const isFav = favorites.includes(game.slug);
    const catName = game.category || 'Arcade';
    const rating = game.rating ? game.rating.toFixed(1) : '4.5';

    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge badge-top">TOP</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge badge-hot">HOT</span>';
    }

    return \`
      <div class="game-card" data-slug="\${game.slug}">
        <div class="card-media">
          <img class="card-thumb"
               src="\${game.thumbnail}"
               alt="\${escapeHtml(game.title)} free HTML5 game"
               loading="lazy"
               decoding="async"
               width="280"
               height="158"
               onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
          \${badgeHtml}
          <button class="card-fav-btn \${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('\${game.slug}', event)" title="\${isFav ? 'Remove from favorites' : 'Add to favorites'}" aria-label="Toggle favorite">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <a href="#/game/\${game.slug}" class="card-play-overlay" aria-label="Play \${escapeHtml(game.title)}">
            <div class="card-play-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
            </div>
          </a>
        </div>
        <div class="card-details">
          <a href="#/game/\${game.slug}" class="card-title" title="\${escapeHtml(game.title)}">\${escapeHtml(game.title)}</a>
          <div class="card-meta-row">
            <span class="card-category-pill">\${escapeHtml(catName)}</span>
            <span class="card-rating-pill" style="display:inline-flex; align-items:center; gap:3px; color:#F59E0B; font-weight:700;">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              \${rating}
            </span>
          </div>
        </div>
      </div>
    \`;
  }

  // --- Scroll Row Shelf ---
  function renderShelf(title, iconSvg, seeAllHref, games, rowId) {
    if (!games || games.length === 0) return '';
    const cardsHtml = games.map(renderCard).join('');

    return \`
      <section class="scroll-section" id="sec-\${rowId}">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon">\${iconSvg}</span>
            <h2 class="section-shelf-title">\${title}</h2>
            <span class="sidebar-section-count">\${games.length}</span>
          </div>
          <div class="section-actions">
            \${seeAllHref ? \`<a href="\${seeAllHref}" class="see-all-link">See All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a>\` : ''}
            <div class="scroll-controls">
              <button class="scroll-arrow-btn prev" onclick="window.NEXUS.scrollRow('\${rowId}', -1)" aria-label="Scroll left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="scroll-arrow-btn next" onclick="window.NEXUS.scrollRow('\${rowId}', 1)" aria-label="Scroll right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-row-wrapper">
          <div class="scroll-row" id="\${rowId}">
            \${cardsHtml}
          </div>
        </div>
      </section>
    \`;
  }

  // --- View: Homepage (All 11 Sections) ---
  function renderHomepage() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'NexusPlay - Play Free HTML5 Games Online | Instant Play',
      description: 'Play 200+ free online games on NexusPlay. Enjoy popular racing, action, puzzle, casual, and arcade games with a clean, instant-play experience and no downloads.',
      canonical: 'https://nexusplay.example.com/',
      ogType: 'website',
      ogImage: 'assets/images/logo.svg',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "NexusPlay",
        "url": "https://nexusplay.example.com/",
        "description": "Play 200+ free online HTML5 games on NexusPlay with zero downloads or installs."
      }
    });

    const topPicks = [...catalog].sort((a,b) => (b.rating || 4.5) - (a.rating || 4.5)).slice(0, 16);
    const featured = catalog.filter(g => g.featured || (g.tags && g.tags.includes('featured'))).slice(0, 16);
    const featuredList = featured.length >= 8 ? featured : catalog.slice(0, 16);
    const popular = catalog.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7)).slice(0, 16);
    const shooting = catalog.filter(g => g._categories && g._categories.includes('shooting')).slice(0, 16);
    const racing = catalog.filter(g => g._categories && (g._categories.includes('racing') || g._categories.includes('car'))).slice(0, 16);
    const actionAdv = catalog.filter(g => g._categories && (g._categories.includes('action') || g._categories.includes('adventure'))).slice(0, 16);
    const puzzle = catalog.filter(g => g._categories && g._categories.includes('puzzle')).slice(0, 16);
    const sports = catalog.filter(g => g._categories && (g._categories.includes('sports') || g._categories.includes('football'))).slice(0, 16);
    const multiplayer = catalog.filter(g => g._categories && (g._categories.includes('multiplayer') || (g.features && g.features.includes('multiplayer')))).slice(0, 16);
    const newGames = catalog.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01')).slice(0, 16);
    const exploreGames = catalog.slice(0, 48);

    const html = \`
      <!-- Hero Banner -->
      <section class="portal-hero">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="live-dot"></span> 200 Free Games Live
          </div>
          <h1 class="hero-title">
            Play The Best Free Games <span>Online</span>
          </h1>
          <p class="hero-subtitle">
            Instant browser gaming with dark aesthetics. No downloads, no plugins. Play shooting, racing, puzzle, and arcade games anytime.
          </p>
          <div class="hero-buttons">
            <a href="#/games" class="btn btn-primary">Explore All 200 Games</a>
            <a href="#/category/shooting" class="btn btn-secondary">Shooting Action</a>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat-box">
            <div class="stat-number">200</div>
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

      \${nexusAds.renderSlot('homeLeaderboard')}

      <!-- 1. Top Picks for You -->
      \${renderShelf('Top Picks for You', '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', '#/popular', topPicks, 'row-top-picks')}

      <!-- 2. Featured Games -->
      \${renderShelf('Featured Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>', '#/games', featuredList, 'row-featured')}

      <!-- 3. Popular Games -->
      \${renderShelf('Popular Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg>', '#/popular', popular, 'row-popular')}

      <!-- 4. Shooting Games -->
      \${renderShelf('Shooting Games', getCategoryIcon('shooting'), '#/category/shooting', shooting, 'row-shooting')}

      <!-- 5. Racing Games -->
      \${renderShelf('Racing & Car Games', getCategoryIcon('racing'), '#/category/racing', racing, 'row-racing')}

      <!-- 6. Action & Adventure -->
      \${renderShelf('Action & Adventure', getCategoryIcon('action'), '#/category/action', actionAdv, 'row-action')}

      <!-- 7. Puzzle & Brain Games -->
      \${renderShelf('Puzzle & Brain Games', getCategoryIcon('puzzle'), '#/category/puzzle', puzzle, 'row-puzzle')}

      <!-- 8. Sports Games -->
      \${renderShelf('Sports & Football', getCategoryIcon('sports'), '#/category/sports', sports, 'row-sports')}

      <!-- 9. Multiplayer Games -->
      \${multiplayer.length > 0 ? renderShelf('Multiplayer Games', getCategoryIcon('multiplayer'), '#/category/multiplayer', multiplayer, 'row-multiplayer') : ''}

      <!-- 10. New Games -->
      \${renderShelf('New Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>', '#/new', newGames, 'row-new')}

      <!-- 11. Explore All Games -->
      <section class="explore-all-section" style="margin-top: 10px; margin-bottom: 30px;">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
            <h2 class="section-shelf-title">Explore All Games</h2>
            <span class="sidebar-section-count">\${catalog.length}</span>
          </div>
          <a href="#/games" class="see-all-link">View Full Library (\${catalog.length})</a>
        </div>
        <div class="games-grid">
          \${exploreGames.map(renderCard).join('')}
        </div>
        <div style="margin-top: 24px; text-align: center;">
          <a href="#/games" class="btn btn-primary" style="padding: 12px 30px; font-weight: 700; border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 8px;">
            <span>Browse Complete Library (\${catalog.length} Games)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </section>
    \`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- View: All Games / Category / Filtered View ---
  function renderAllGamesView(title = 'All Games', games = catalog, activeCatSlug = null) {
    const main = document.getElementById('app-main');
    if (!main) return;

    let desc = \`Showing \${games.length} games in our collection.\`;
    if (activeCatSlug) {
      const catObj = categoryList.find(c => c.slug === activeCatSlug);
      if (catObj && catObj.description) desc = catObj.description;
    }

    const currentSort = localStorage.getItem('nexus_sort_pref') || 'featured';
    let sorted = [...games];
    if (currentSort === 'rating') {
      sorted.sort((a,b) => (b.rating || 0) - (a.rating || 0));
    } else if (currentSort === 'plays') {
      sorted.sort((a,b) => (b.plays || 0) - (a.plays || 0));
    } else if (currentSort === 'newest') {
      sorted.sort((a,b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
    } else if (currentSort === 'az') {
      sorted.sort((a,b) => a.title.localeCompare(b.title));
    } else if (currentSort === 'za') {
      sorted.sort((a,b) => b.title.localeCompare(a.title));
    }

    updateSeo({
      title: \`\${title} - NexusPlay | Free Browser Games\`,
      description: desc,
      canonical: activeCatSlug ? \`https://nexusplay.example.com/#/category/\${activeCatSlug}\` : 'https://nexusplay.example.com/#/games',
      ogType: 'website'
    });

    const cardsHtml = sorted.length > 0
      ? sorted.map(renderCard).join('')
      : \`
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="width: 54px; height: 54px; margin: 0 auto 16px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); margin-bottom:8px;">No Games Found</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:18px;">We couldn't find games matching your criteria. Try another category or search term!</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      \`;

    const iconSvg = activeCatSlug ? getCategoryIcon(activeCatSlug) : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';

    const html = \`
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="section-badge-icon" style="width: 36px; height: 36px;">\${iconSvg}</span>
            <div>
              <h1 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF; margin: 0;">\${escapeHtml(title)}</h1>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 4px 0 0 0;">\${escapeHtml(desc)}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="sidebar-section-count" style="font-size: 0.82rem; padding: 4px 12px;">\${games.length} \${games.length === 1 ? 'Game' : 'Games'}</span>
            <select id="sortSelect" onchange="window.NEXUS.sortView(this.value)" style="background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.85rem; outline: none; cursor: pointer;">
              <option value="featured" \${currentSort==='featured'?'selected':''}>Sort: Featured</option>
              <option value="rating" \${currentSort==='rating'?'selected':''}>Top Rated</option>
              <option value="plays" \${currentSort==='plays'?'selected':''}>Most Played</option>
              <option value="newest" \${currentSort==='newest'?'selected':''}>Newest First</option>
              <option value="az" \${currentSort==='az'?'selected':''}>Title: A to Z</option>
              <option value="za" \${currentSort==='za'?'selected':''}>Title: Z to A</option>
            </select>
          </div>
        </div>

        <!-- Category Shortcuts Bar -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 12px; scrollbar-width: none;">
          <a href="#/games" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid \${!activeCatSlug ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: \${!activeCatSlug ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: \${!activeCatSlug ? '#38BDF8' : 'var(--text-secondary)'};">
            All (\${catalog.length})
          </a>
          \${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = activeCatSlug === c.slug;
            return \`
              <a href="#/category/\${c.slug}" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid \${isActive ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: \${isActive ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: \${isActive ? '#38BDF8' : 'var(--text-secondary)'};">
                \${c.name} (\${count})
              </a>
            \`;
          }).join('')}
        </div>
      </div>

      <div class="games-grid" id="mainGamesGrid">
        \${cardsHtml}
      </div>
    \`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- View: Game Detail & High-Performance Player ---
  function renderGameDetail(slug) {
    const main = document.getElementById('app-main');
    if (!main) return;

    const game = catalog.find(g => g.slug === slug || (g.aliases && g.aliases.includes(slug)));
    if (!game) {
      main.innerHTML = \`
        <div class="static-page-container" style="text-align: center; padding: 80px 20px;">
          <h2 style="color: #FFF; font-family: var(--font-heading); margin-bottom: 12px;">Game Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">We couldn't locate the game "\${escapeHtml(slug)}". It may have been renamed or moved.</p>
          <a href="#/games" class="btn btn-primary">Browse All 200 Games</a>
        </div>
      \`;
      return;
    }

    addRecentlyPlayed(game.slug);
    nexusAnalytics.track('game_viewed', { slug: game.slug, title: game.title, category: game.category });

    const isFav = favorites.includes(game.slug);
    const rawEmbedUrl = game.embedUrl || game.gameUrl || game.url;
    const embedUrl = sanitizeUrl(rawEmbedUrl);
    const catSlug = (game._categories && game._categories[0]) || 'arcade';
    const related = catalog.filter(g => g.slug !== game.slug && (g._categories.some(c => game._categories.includes(c)) || g.category === game.category)).slice(0, 10);

    const metaStr = ((game.category || '') + ' ' + (game.tags || []).join(' ') + ' ' + (game.slug || '')).toLowerCase();
    let initialRatioClass = 'ratio-16-9';
    let initialRatioLabel = '16:9';
    if (/puzzle|2048|snake|block|mahjong|board|card|connect|logic|sudoku|bubble|chess|idle|tapper/i.test(metaStr)) {
      initialRatioClass = 'ratio-4-3';
      initialRatioLabel = '4:3';
    }

    // Dynamic SEO Metadata for Game Page
    updateSeo({
      title: \`\${game.title} - Play Free Online on NexusPlay\`,
      description: game.description || \`Play \${game.title} free in your browser. Instant HTML5 gameplay with no downloads on NexusPlay.\`,
      canonical: \`https://nexusplay.example.com/#/game/\${game.slug}\`,
      ogType: 'game',
      ogImage: game.thumbnail,
      schema: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game.title,
        "description": game.description || \`Play \${game.title} instantly in your browser.\`,
        "image": game.thumbnail,
        "genre": game.category || "Arcade",
        "playMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any modern web browser",
        "inLanguage": "en",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": (game.rating || 4.5).toFixed(1),
          "ratingCount": game.plays ? Math.floor(game.plays / 10) : 150,
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    });

    const html = \`
      <!-- Breadcrumbs & Back Navigation with Microdata Schema -->
      <nav class="breadcrumbs" aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        <button onclick="window.NEXUS.goBack()" class="player-back-btn" aria-label="Back to previous page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Back</span>
        </button>
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="#/" class="breadcrumb-link" itemprop="item"><span itemprop="name">Home</span></a>
          <meta itemprop="position" content="1" />
        </span>
        <span class="breadcrumb-separator">/</span>
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="#/category/\${catSlug}" class="breadcrumb-link" itemprop="item"><span itemprop="name">\${escapeHtml(game.category || 'Arcade')}</span></a>
          <meta itemprop="position" content="2" />
        </span>
        <span class="breadcrumb-separator">/</span>
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <span class="breadcrumb-current" itemprop="name">\${escapeHtml(game.title)}</span>
          <meta itemprop="position" content="3" />
        </span>
      </nav>

      <div class="game-detail-layout" id="gameDetailLayout">
        <!-- Main Column -->
        <div class="game-main-content">
          <div class="player-container \${initialRatioClass}" id="playerContainer">
            <iframe
              id="gameFrame"
              class="game-iframe"
              src="\${embedUrl}"
              title="\${escapeHtml(game.title)} - Free HTML5 Game"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowfullscreen
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-pointer-lock"
              loading="eager"
            ></iframe>
            <div class="player-loader" id="playerLoader">
              <div class="spinner"></div>
              <div class="loader-text">Connecting to \${escapeHtml(game.title)}...</div>
            </div>
            <!-- Player Timeout & Retry Overlay -->
            <div class="player-retry-overlay" id="playerRetryOverlay" style="display:none;">
              <div class="player-retry-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div class="player-retry-title">Game Loading Stalled</div>
              <div class="player-retry-desc">The game is taking longer than usual to connect. You can retry loading or launch it in a clean window.</div>
              <div class="player-retry-actions">
                <button class="btn btn-primary" onclick="window.NEXUS.reloadGame()">Retry Loading</button>
                <a href="\${embedUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Open Directly</a>
              </div>
            </div>
          </div>

          <!-- Controls Bar -->
          <div class="player-controls-bar">
            <div class="player-controls-left">
              <img class="player-bar-thumb" src="\${game.thumbnail}" alt="\${escapeHtml(game.title)}" width="38" height="38" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
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

          <!-- Metadata & Description -->
          <div class="game-info-card">
            <h2>About \${escapeHtml(game.title)}</h2>
            <div class="game-meta-tags">
              <span class="card-badge badge-popular" style="position:static;">\${escapeHtml(game.category || 'Arcade')}</span>
              \${game.tags ? game.tags.slice(0, 5).map(t => \`<span style="background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:4px; font-size:0.75rem; color:var(--text-secondary);">\${escapeHtml(t)}</span>\`).join('') : ''}
            </div>
            <p style="color:var(--text-secondary); line-height:1.7; font-size:0.94rem; margin-bottom:18px;">
              \${escapeHtml(game.description || 'Play ' + game.title + ' instantly online on NEXUSPLAY. No download required. Free browser gameplay.')}
            </p>

            \${game.instructions ? \`
              <div style="background:rgba(255,255,255,0.03); border-left:3px solid var(--accent-primary); padding:14px 18px; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                <h4 style="color:#FFF; font-size:0.92rem; font-family:var(--font-heading); margin-bottom:6px;">Instructions & Controls</h4>
                <p style="color:var(--text-muted); font-size:0.88rem; line-height:1.6; margin:0;">\${escapeHtml(game.instructions)}</p>
              </div>
            \` : ''}
          </div>

          \${nexusAds.renderSlot('gameFooter')}
        </div>

        <!-- Related Games Sidebar Column -->
        <div class="game-sidebar">
          <h3 style="font-family:var(--font-heading); font-size:1.05rem; font-weight:800; color:#FFF; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            Related Games
          </h3>
          <div style="display:flex; flex-direction:column; gap:10px;">
            \${related.map(r => \`
              <a href="#/game/\${r.slug}" style="display:flex; align-items:center; gap:12px; padding:8px 10px; border-radius:var(--radius-md); background:var(--bg-surface); border:1px solid var(--border-subtle); text-decoration:none; transition:all var(--transition-fast);" onmouseover="this.style.background='var(--bg-surface-hover)'" onmouseout="this.style.background='var(--bg-surface)'">
                <img src="\${r.thumbnail}" alt="\${escapeHtml(r.title)}" width="52" height="36" style="width:52px; height:36px; border-radius:4px; object-fit:cover;" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
                <div style="min-width:0; flex:1;">
                  <div style="font-size:0.86rem; font-weight:700; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">\${escapeHtml(r.title)}</div>
                  <div style="font-size:0.72rem; color:var(--text-muted);">\${escapeHtml(r.category || 'Arcade')}</div>
                </div>
              </a>
            \`).join('')}
          </div>
          \${nexusAds.renderSlot('gameSidebar')}
        </div>
      </div>
    \`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Iframe load listener with 8s timeout detection
    const frame = document.getElementById('gameFrame');
    const loader = document.getElementById('playerLoader');
    let loadTimeout = null;

    if (frame && loader) {
      frame.onload = () => {
        if (loadTimeout) clearTimeout(loadTimeout);
        loader.classList.add('hidden');
        nexusAnalytics.track('game_started', { slug: game.slug, title: game.title });
      };

      loadTimeout = setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
          loader.classList.add('hidden');
          const retry = document.getElementById('playerRetryOverlay');
          if (retry) retry.style.display = 'flex';
        }
      }, 8000);
    }
  }

  // --- Legal and Trust Views ---
  function renderAboutView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'About NexusPlay - Modern Browser Gaming Platform',
      description: 'Learn about NexusPlay mission to bring high quality, instant-play HTML5 games to web players worldwide with zero downloads and full client-side privacy.',
      canonical: 'https://nexusplay.example.com/#/about',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="static-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">About Us</span>
        </nav>

        <div class="static-page-card">
          <h1 class="static-page-title">About NexusPlay</h1>
          <p class="static-page-lead">
            NexusPlay is a modern, lightweight, high-performance HTML5 browser gaming platform. Our mission is to make high quality casual, action, racing, and arcade games instantly accessible to anyone, anywhere in the world—with zero downloads, zero account requirements, and zero friction.
          </p>

          <div class="static-features-grid">
            <div class="static-feature-card">
              <h3>🚀 Instant Execution</h3>
              <p>Built exclusively on modern lightweight web standards (HTML5 Canvas, WebGL, Web Audio), games load in seconds on desktop, tablet, and mobile devices.</p>
            </div>
            <div class="static-feature-card">
              <h3>🔒 Privacy First</h3>
              <p>Play immediately without compulsory registration. Your favorites and gameplay history are saved safely in your own browser's local storage.</p>
            </div>
            <div class="static-feature-card">
              <h3>🎮 200 Handpicked Games</h3>
              <p>From adrenaline-pumping racing to mind-bending puzzles, our 22 categories are curated to deliver immediate fun without bloat.</p>
            </div>
          </div>

          <div class="static-page-section">
            <h2>Game Developer Licensing & Submissions</h2>
            <p>
              Are you an HTML5 game developer or publisher? We welcome original web games, open-source projects, and licensed titles. Contact our publishing team to showcase your games on NexusPlay.
            </p>
            <div style="margin-top: 18px;">
              <a href="#/contact" class="btn btn-primary">Contact Publishing Team</a>
            </div>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderContactView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Contact & Support - NexusPlay',
      description: 'Get in touch with the NexusPlay team for game submissions, developer partnerships, bug reports, or general support.',
      canonical: 'https://nexusplay.example.com/#/contact',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="static-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Contact & Support</span>
        </nav>

        <div class="static-page-card">
          <h1 class="static-page-title">Contact & Support</h1>
          <p class="static-page-lead">
            Have questions, feedback, or want to submit an HTML5 game to NexusPlay? Fill out the form below and our team will get back to you promptly.
          </p>

          <form id="contactForm" onsubmit="window.NEXUS.submitContact(event)">
            <div class="form-group">
              <label class="form-label" for="contactName">Your Name</label>
              <input type="text" class="form-control" id="contactName" required placeholder="Alex Mercer" autocomplete="name">
            </div>

            <div class="form-group">
              <label class="form-label" for="contactEmail">Email Address</label>
              <input type="email" class="form-control" id="contactEmail" required placeholder="alex@example.com" autocomplete="email">
            </div>

            <div class="form-group">
              <label class="form-label" for="contactTopic">Topic</label>
              <select class="form-control" id="contactTopic" style="cursor: pointer;">
                <option value="general">General Inquiry & Feedback</option>
                <option value="submit-game">Submit an HTML5 Game</option>
                <option value="bug-report">Report a Website Bug</option>
                <option value="licensing">Advertising & Partnerships</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="contactMessage">Your Message</label>
              <textarea class="form-control form-textarea" id="contactMessage" rows="5" required placeholder="Write your message or game submission details here..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 8px;">
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderPrivacyView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Privacy Policy - NexusPlay',
      description: 'NexusPlay privacy policy detailing client-side storage, cookie usage, third-party embeds, and data protection practices.',
      canonical: 'https://nexusplay.example.com/#/privacy',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="static-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Privacy Policy</span>
        </nav>

        <div class="static-page-card">
          <h1 class="static-page-title">Privacy Policy</h1>
          <p class="static-page-lead">Last updated: October 2026</p>

          <div class="static-page-section">
            <h2>1. Overview & Commitment</h2>
            <p>
              NexusPlay ("we", "our", or "us") respects your privacy. We operate as a client-side gaming portal designed to allow instant gameplay without compulsory account registration, profiling, or intrusive tracking.
            </p>
          </div>

          <div class="static-page-section">
            <h2>2. Information Stored Locally</h2>
            <p>
              NexusPlay uses your web browser's standard <code>localStorage</code> API solely to store your preferences locally on your device:
            </p>
            <ul>
              <li><strong>Favorites:</strong> Your starred games (<code>nexus_favorites</code>).</li>
              <li><strong>Recently Played:</strong> Your recent gameplay history (<code>nexus_recently_played</code>).</li>
              <li><strong>UI Preferences:</strong> Sidebar state and preferred sort order (<code>nexus_sidebar_collapsed</code>, <code>nexus_sort_pref</code>).</li>
            </ul>
            <p>This data never leaves your browser and is not transmitted to our servers.</p>
          </div>

          <div class="static-page-section">
            <h2>3. Third-Party Game Embeds</h2>
            <p>
              Certain games hosted on NexusPlay are embedded from authorized third-party HTML5 game developers (such as HTMLGames CDN). When you load these games, the game provider may process standard technical information (e.g. IP address, browser type) required to deliver the game assets in accordance with their respective privacy policies.
            </p>
          </div>

          <div class="static-page-section">
            <h2>4. Advertising & Monetization</h2>
            <p>
              NexusPlay may display advertising through vetted advertising partners such as Google AdSense. Advertising partners adhere to industry-standard privacy frameworks, cookie policies, and GDPR / CCPA consent guidelines.
            </p>
          </div>

          <div class="static-page-section">
            <h2>5. Contacting Us</h2>
            <p>If you have any questions regarding this Privacy Policy, please reach out via our <a href="#/contact" style="color:#38BDF8;">Contact Form</a>.</p>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderTermsView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Terms of Service - NexusPlay',
      description: 'NexusPlay terms of use covering permissible usage, intellectual property, and service conditions.',
      canonical: 'https://nexusplay.example.com/#/terms',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="static-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Terms of Service</span>
        </nav>

        <div class="static-page-card">
          <h1 class="static-page-title">Terms of Service</h1>
          <p class="static-page-lead">Effective Date: October 2026</p>

          <div class="static-page-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or playing games on NexusPlay, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </div>

          <div class="static-page-section">
            <h2>2. Permitted Use</h2>
            <p>NexusPlay is provided free of charge for personal, non-commercial entertainment. You agree not to disrupt website operations, circumvent sandbox restrictions, reverse-engineer platform scripts, or use automated scraping tools.</p>
          </div>

          <div class="static-page-section">
            <h2>3. Intellectual Property Rights</h2>
            <p>The NexusPlay portal design, branding, logo, code, and interface are the proprietary property of NexusPlay. Third-party games featured on the site remain the intellectual property of their respective creators and authorized distributors.</p>
          </div>

          <div class="static-page-section">
            <h2>4. Disclaimer of Warranties</h2>
            <p>NexusPlay and all games are provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied.</p>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderDmcaView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'DMCA & Copyright Policy - NexusPlay',
      description: 'NexusPlay Digital Millennium Copyright Act (DMCA) policy and notice procedure for copyright owners.',
      canonical: 'https://nexusplay.example.com/#/dmca',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="static-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">DMCA & Copyright Policy</span>
        </nav>

        <div class="static-page-card">
          <h1 class="static-page-title">DMCA & Copyright Policy</h1>
          <p class="static-page-lead">
            NexusPlay respects the intellectual property rights of others and adheres strictly to the Digital Millennium Copyright Act (17 U.S.C. § 512).
          </p>

          <div class="static-page-section">
            <h2>Notice & Takedown Procedure</h2>
            <p>
              If you are a copyright owner or an authorized agent and believe that any game or material on NexusPlay infringes upon your copyright, please submit a written notification containing:
            </p>
            <ul>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material to be removed, including the direct NexusPlay game URL.</li>
              <li>Your contact information (name, address, telephone number, and email).</li>
              <li>A statement that you have a good-faith belief that use of the material is not authorized by the copyright owner.</li>
              <li>A statement made under penalty of perjury that the information in the notification is accurate.</li>
            </ul>
            <p>
              Send your takedown request via our <a href="#/contact" style="color:#38BDF8;">Contact Form</a> with the subject line <strong>"DMCA Takedown Request"</strong>. Verified requests are acted upon promptly.
            </p>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderReportView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Report a Game - NexusPlay',
      description: 'Report a broken or non-functioning game on NexusPlay so our technical team can review and fix it.',
      canonical: 'https://nexusplay.example.com/#/report',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="static-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Report a Broken Game</span>
        </nav>

        <div class="static-page-card">
          <h1 class="static-page-title">Report a Broken Game</h1>
          <p class="static-page-lead">
            Encountered a game that won't load, has broken controls, or displays a black screen? Let us know so we can fix it!
          </p>

          <form id="standaloneReportForm" onsubmit="window.NEXUS.submitStandaloneReport(event)">
            <div class="form-group">
              <label class="form-label" for="reportGameSelect">Select Game</label>
              <select class="form-control" id="reportGameSelect" required style="cursor: pointer;">
                <option value="">-- Choose a Game (\${catalog.length} available) --</option>
                \${catalog.map(g => \`<option value="\${g.slug}">\${escapeHtml(g.title)} (\${escapeHtml(g.category || 'Arcade')})</option>\`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="standaloneReportReason">Issue Description</label>
              <select class="form-control" id="standaloneReportReason" required style="cursor: pointer;">
                <option value="not-loading">Game does not load / black screen</option>
                <option value="controls-broken">Controls or keyboard/touch not working</option>
                <option value="audio-glitch">Audio or sound glitch</option>
                <option value="broken-display">Visual display or aspect ratio error</option>
                <option value="other">Other problem</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="standaloneReportDetails">Additional Details (Optional)</label>
              <textarea class="form-control form-textarea" id="standaloneReportDetails" rows="4" placeholder="Device, browser, or any helpful context..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 8px;">
              <span>Submit Report</span>
            </button>
          </form>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- Router ---
  function handleRoute() {
    const rawHash = window.location.hash || '#/';
    const hash = rawHash.split('?')[0];
    updateActiveNavClasses(hash);

    if (hash === '#/' || hash === '' || hash === '#') {
      renderHomepage();
    } else if (hash === '#/games') {
      const urlParams = new URLSearchParams(rawHash.includes('?') ? rawHash.split('?')[1] : '');
      const query = urlParams.get('q');
      if (query) {
        const matches = catalog.filter(g => {
          return (g.title || '').toLowerCase().includes(query.toLowerCase()) ||
                 (g.category || '').toLowerCase().includes(query.toLowerCase()) ||
                 (g.tags || []).some(t => t.toLowerCase().includes(query.toLowerCase()));
        });
        renderAllGamesView('Search: "' + query + '"', matches);
      } else {
        renderAllGamesView('All 200 Games', catalog);
      }
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
    } else if (hash === '#/about') {
      renderAboutView();
    } else if (hash === '#/contact') {
      renderContactView();
    } else if (hash === '#/privacy') {
      renderPrivacyView();
    } else if (hash === '#/terms') {
      renderTermsView();
    } else if (hash === '#/dmca') {
      renderDmcaView();
    } else if (hash === '#/report') {
      renderReportView();
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
      if (hash === \`#/category/\${cat}\`) {
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
      const retry = document.getElementById('playerRetryOverlay');
      if (retry) retry.style.display = 'none';
      if (frame) {
        if (loader) loader.classList.remove('hidden');
        frame.src = frame.src;
      }
    },

    toggleFullscreen: function () {
      const container = document.getElementById('playerContainer');
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

    toggleTheater: function () {
      const layout = document.getElementById('gameDetailLayout');
      if (layout) {
        layout.classList.toggle('theater-mode');
      }
    },

    cycleAspectRatio: function () {
      const container = document.getElementById('playerContainer');
      const label = document.getElementById('ratioLabel');
      if (!container) return;

      const ratios = ['16-9', '4-3', '1-1', 'fit'];
      let current = ratios.find(r => container.classList.contains('ratio-' + r)) || '16-9';
      let nextIdx = (ratios.indexOf(current) + 1) % ratios.length;
      let next = ratios[nextIdx];

      ratios.forEach(r => container.classList.remove('ratio-' + r));
      container.classList.add('ratio-' + next);

      const displayMap = {
        '16-9': '16:9',
        '4-3': '4:3',
        '1-1': '1:1',
        'fit': 'Fit'
      };
      if (label) label.textContent = displayMap[next];
    },

    goBack: function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = '#/';
      }
    },

    scrollRow: function (rowId, direction) {
      const row = document.getElementById(rowId);
      if (!row) return;
      const scrollAmount = row.clientWidth * 0.75 * direction;
      row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    },

    sortView: function (sortBy) {
      try {
        localStorage.setItem('nexus_sort_pref', sortBy);
      } catch (e) {}

      const rawHash = window.location.hash || '#/';
      const hash = rawHash.split('?')[0];
      let list = [...catalog];

      if (hash.startsWith('#/category/')) {
        const catSlug = hash.replace('#/category/', '');
        list = list.filter(g => g._categories && g._categories.includes(catSlug));
      } else if (hash === '#/favorites') {
        list = list.filter(g => favorites.includes(g.slug));
      } else if (hash === '#/recent') {
        list = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
      } else if (hash === '#/popular') {
        list = list.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7));
      } else if (hash === '#/new') {
        list = list.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01'));
      }

      if (sortBy === 'rating') {
        list.sort((a,b) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === 'plays') {
        list.sort((a,b) => (b.plays || 0) - (a.plays || 0));
      } else if (sortBy === 'newest') {
        list.sort((a,b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
      } else if (sortBy === 'az') {
        list.sort((a,b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'za') {
        list.sort((a,b) => b.title.localeCompare(a.title));
      }

      const grid = document.getElementById('mainGamesGrid');
      if (grid) {
        grid.innerHTML = list.map(renderCard).join('');
      }
    },

    openReport: function (gameSlug) {
      const modalRoot = document.getElementById('nexus-modal-root');
      if (!modalRoot) return;
      const game = catalog.find(g => g.slug === gameSlug);
      const gameTitle = game ? game.title : 'this game';

      modalRoot.innerHTML = \`
        <div class="nexus-modal-overlay is-open" id="reportModalOverlay" onclick="if(event.target===this) window.NEXUS.closeModal()">
          <div class="nexus-modal" role="dialog" aria-modal="true" aria-labelledby="reportModalTitle">
            <div class="nexus-modal-header">
              <h3 class="nexus-modal-title" id="reportModalTitle">Report Issue: \${escapeHtml(gameTitle)}</h3>
              <button class="nexus-modal-close" onclick="window.NEXUS.closeModal()" aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form id="reportGameForm" onsubmit="window.NEXUS.submitReport(event, '\${escapeHtml(gameSlug)}')">
              <div class="form-group">
                <label class="form-label" for="reportReason">Issue Type</label>
                <select class="form-control" id="reportReason" required style="cursor: pointer;">
                  <option value="not-loading">Game does not load / black screen</option>
                  <option value="controls-broken">Controls or keyboard/touch not working</option>
                  <option value="audio-glitch">Audio or sound glitch</option>
                  <option value="broken-display">Visual display or aspect ratio error</option>
                  <option value="other">Other problem</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="reportDetails">Details (Optional)</label>
                <textarea class="form-control form-textarea" id="reportDetails" rows="3" placeholder="Briefly describe what happened or what device you are using..."></textarea>
              </div>
              <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
                <button type="button" class="btn btn-secondary" onclick="window.NEXUS.closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      \`;
    },

    closeModal: function () {
      const modalRoot = document.getElementById('nexus-modal-root');
      if (modalRoot) modalRoot.innerHTML = '';
    },

    submitReport: function (event, slug) {
      event.preventDefault();
      const reason = document.getElementById('reportReason').value;
      const details = document.getElementById('reportDetails').value;

      try {
        const reports = JSON.parse(localStorage.getItem('nexus_game_reports') || '[]');
        reports.push({
          slug,
          reason,
          details,
          date: new Date().toISOString()
        });
        localStorage.setItem('nexus_game_reports', JSON.stringify(reports));
      } catch (e) {}

      nexusAnalytics.track('report_submitted', { slug, reason });
      window.NEXUS.closeModal();
      showToast('Thank you! Your report has been submitted.', '✓');
    },

    submitStandaloneReport: function (event) {
      event.preventDefault();
      const slug = document.getElementById('reportGameSelect').value;
      const reason = document.getElementById('standaloneReportReason').value;
      const details = document.getElementById('standaloneReportDetails').value;

      try {
        const reports = JSON.parse(localStorage.getItem('nexus_game_reports') || '[]');
        reports.push({
          slug,
          reason,
          details,
          date: new Date().toISOString()
        });
        localStorage.setItem('nexus_game_reports', JSON.stringify(reports));
      } catch (e) {}

      nexusAnalytics.track('report_submitted', { slug, reason });
      showToast('Thank you! Your report has been submitted.', '✓');
      const form = document.getElementById('standaloneReportForm');
      if (form) form.reset();
    },

    submitContact: function (event) {
      event.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const topic = document.getElementById('contactTopic').value;
      const message = document.getElementById('contactMessage').value;

      try {
        const messages = JSON.parse(localStorage.getItem('nexus_contact_messages') || '[]');
        messages.push({
          name,
          email,
          topic,
          message,
          date: new Date().toISOString()
        });
        localStorage.setItem('nexus_contact_messages', JSON.stringify(messages));
      } catch (e) {}

      nexusAnalytics.track('contact_submitted', { topic });
      showToast(\`Thank you, \${name}! Your message has been sent.\`, '✓');
      const form = document.getElementById('contactForm');
      if (form) form.reset();
    },

    // Ads and Analytics initialization hooks
    configureAds: function (config) {
      nexusAds.init(config);
    },

    configureAnalytics: function (config) {
      nexusAnalytics.init(config);
    }
  };

  // Fullscreen event listener to sync button UI
  document.addEventListener('fullscreenchange', syncFullscreenButton);
  document.addEventListener('webkitfullscreenchange', syncFullscreenButton);
  document.addEventListener('mozfullscreenchange', syncFullscreenButton);
  document.addEventListener('MSFullscreenChange', syncFullscreenButton);

  function syncFullscreenButton() {
    const btn = document.getElementById('fullscreenBtn');
    if (!btn) return;
    const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    const label = btn.querySelector('.ctrl-btn-text');
    if (label) label.textContent = isFs ? 'Exit' : 'Fullscreen';
  }

  // Global Error Boundary
  window.addEventListener('error', (e) => {
    console.warn('[NexusPlay Runtime Guard]', e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.warn('[NexusPlay Promise Guard]', e.reason);
  });

  // --- Application Bootstrap ---
  async function init() {
    loadLocalState();

    if (window.NEXUS_CATALOG && Array.isArray(window.NEXUS_CATALOG) && window.NEXUS_CATALOG.length > 0) {
      catalog = window.NEXUS_CATALOG;
    }
    if (window.NEXUS_CATEGORIES && Array.isArray(window.NEXUS_CATEGORIES) && window.NEXUS_CATEGORIES.length > 0) {
      categoryList = window.NEXUS_CATEGORIES;
    }

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

    console.log(\`[NEXUSPLAY] Initialized with \${catalog.length} games across \${categoryList.length} categories.\`);

    computeCategoryCounts();
    renderSidebar();
    renderHeader();
    renderFooter();

    try {
      if (window.innerWidth > 1024 && localStorage.getItem('nexus_sidebar_collapsed') === '1') {
        document.body.classList.add('sidebar-collapsed');
      }
    } catch (e) {}

    initSidebarTooltips();

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`;

fs.writeFileSync(path.join(__dirname, '../js/bundle.js'), bundleContent, 'utf8');
console.log('Successfully wrote upgraded js/bundle.js');


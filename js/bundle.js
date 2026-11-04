/**
 * KopiPlay - Clean Modern Gaming Portal Bundle (Production Ready)
 * Poki & CrazyGames Inspired Light Gaming Theme
 * Color System: #F8FAFC Background, #FFFFFF Cards, #0F766E & #14B8A6 Accents
 * Zero Purple - Pure Modern Light Theme
 */

(function () {
  'use strict';

  // --- Strict Ad-Free Configuration ---
  const ADS_ENABLED = false;

  const kopiAds = {
    isEnabled: function () {
      return ADS_ENABLED;
    },
    render: function (placementId, options) {
      if (!ADS_ENABLED) return '';
      const opts = options || {};
      const size = opts.size || '728x90';
      const label = opts.label || 'ADVERTISEMENT';
      return '<div class="kopi-ad-container kopi-ad-' + size + '" data-placement="' + placementId + '"><div class="ad-disclaimer-label"><span class="ad-badge">SPONSORED</span><span>' + label + '</span></div><div class="ad-slot-frame ad-slot-' + size + '"><div class="ad-placeholder-content"><div class="ad-placeholder-title">Reserved Ad Slot</div><div class="ad-placeholder-size">' + size + '</div></div></div></div>';
    },
    configure: function () {},
    refresh: function () {},
    destroy: function () {}
  };

  // --- Storage & Analytics ---
  const STORAGE_KEYS = {
    favorites: 'kopiplay_favorites',
    recentlyPlayed: 'kopiplay_recently_played',
    sortPref: 'kopiplay_sort_pref',
    legacyFavorites: 'kipo_favorites',
    legacyFavoritesAlt: 'nexus_favorites',
    legacyRecent: 'kipo_recent_games',
    legacyRecentAlt: 'nexus_recently_played',
    legacySort: 'nexus_game_sort',
    sidebarCollapsed: 'kopiplay_sidebar_collapsed',
    legacySidebar: 'nexus_sidebar_collapsed'
  };

  function migrateStorage() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.favorites)) {
        const leg = localStorage.getItem(STORAGE_KEYS.legacyFavorites) || localStorage.getItem(STORAGE_KEYS.legacyFavoritesAlt);
        if (leg) localStorage.setItem(STORAGE_KEYS.favorites, leg);
      }
      if (!localStorage.getItem(STORAGE_KEYS.recentlyPlayed)) {
        const leg = localStorage.getItem(STORAGE_KEYS.legacyRecent) || localStorage.getItem(STORAGE_KEYS.legacyRecentAlt);
        if (leg) localStorage.setItem(STORAGE_KEYS.recentlyPlayed, leg);
      }
      if (!localStorage.getItem(STORAGE_KEYS.sortPref)) {
        const leg = localStorage.getItem(STORAGE_KEYS.legacySort);
        if (leg) localStorage.setItem(STORAGE_KEYS.sortPref, leg);
      }
    } catch (e) {}
  }

  const nexusAnalytics = {
    track: function (eventName, data) {
      try {
        const events = JSON.parse(sessionStorage.getItem('kopiplay_events') || '[]');
        events.push({ event: eventName, data: data, timestamp: new Date().toISOString() });
        sessionStorage.setItem('kopiplay_events', JSON.stringify(events.slice(-50)));
      } catch (e) {}
    }
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function sanitizeUrl(url) {
    if (!url) return '';
    const clean = String(url).trim();
    if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('/') || clean.startsWith('./') || clean.startsWith('games/')) {
      return clean;
    }
    return '';
  }

  // --- SVG Icons Map for Categories ---
  const SVG_ICONS = {
    'all': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    'shooting': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>',
    'action': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'adventure': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>',
    'racing': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    'car': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    'driving': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>',
    'sports': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"/></svg>',
    'football': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6l3.5 2.5-1.3 4h-4.4l-1.3-4zM12 2v4M12 22v-4M2 12h4M22 12h-4"/></svg>',
    'puzzle': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c0-1.571-1.274-2.85-2.846-2.85s-2.846 1.279-2.846 2.85H9.5c0-1.571-1.274-2.85-2.846-2.85S3.808 6.279 3.808 7.85V11c1.571 0 2.846 1.274 2.846 2.846s-1.275 2.846-2.846 2.846v3.15c0 1.571 1.274 2.85 2.846 2.85H9.5c0-1.571 1.274-2.85 2.846-2.85s2.846 1.279 2.846 2.85h4.247c1.572 0 2.846-1.279 2.846-2.85V16.7c-1.572 0-2.846-1.274-2.846-2.846s1.274-2.846 2.846-2.846V7.85z"/></svg>',
    'strategy': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    'platform': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="16" width="18" height="4" rx="1"/><rect x="6" y="8" width="12" height="4" rx="1"/><circle cx="12" cy="4" r="2"/></svg>',
    'multiplayer': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'arcade': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="12" width="12" height="8" rx="2"/><circle cx="12" cy="8" r="3"/><line x1="12" y1="11" x2="12" y2="12"/><path d="M6 12H4a2 2 0 0 0-2 2v6h20v-6a2 2 0 0 0-2-2h-2"/></svg>',
    'simulation': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    'casual': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
    'kids-games': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5z"/></svg>',
    'beauty': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    'pool': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 10v4"/></svg>',
    'board-games': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
    'card-games': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="12" height="16" rx="2"/><rect x="8" y="6" width="12" height="16" rx="2"/></svg>',
    'clicker': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 15l6 6M9 9l6 6M12 3v6M3 12h6M6 6l3 3M18 6l-3 3M6 18l3-3"/></svg>',
    'io-games': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'default': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="7" cy="12" r="1.5"/><circle cx="17" cy="12" r="1.5"/><path d="M12 8v8"/></svg>'
  };

  function getCategoryIcon(slug) {
    return SVG_ICONS[slug] || SVG_ICONS['default'];
  }

  // --- Category Classifier ---
  function matchCategories(game) {
    const text = ((game.title || '') + ' ' + (game.category || '') + ' ' + (game.description || '') + ' ' + ((game.tags || []).join(' '))).toLowerCase();
    const matched = [];
    if (/shoot|gun|sniper|bullet|fps|target|war|cannon|tank|missile|combat|zombie/i.test(text)) matched.push('shooting');
    if (/race|speed|drift|nitro|kart|track|moto|rally|grand prix/i.test(text)) matched.push('racing');
    if (/car |cars|truck|bus|vehicle|taxi|parking|ambulance/i.test(text)) matched.push('car');
    if (/drive|driving|traffic|wheel|road|highway/i.test(text)) matched.push('driving');
    if (/puzzle|match|block|logic|brain|connect|physics|slide|jigsaw|maze|word|trivia/i.test(text)) matched.push('puzzle');
    if (/action|fight|battle|ninja|brawl|hero|warrior|punch|slash/i.test(text)) matched.push('action');
    if (/sport|soccer|football|basket|golf|tennis|cricket|baseball|skate|ski|bowling/i.test(text)) matched.push('sports');
    if (/soccer|penalty|fifa|goal|kick|free kick|world cup|striker|premier/i.test(text)) matched.push('football');
    if (/arcade|retro|classic|pinball|breakout|brick|pac|space invader/i.test(text)) matched.push('arcade');
    if (/strategy|tower|defense|chess|tactic|conquer|empire|commander|fort/i.test(text)) matched.push('strategy');
    if (/adventure|quest|explore|journey|dungeon|tomb|treasure|lost/i.test(text)) matched.push('adventure');
    if (/platform|jump|hop|run|runner|dash|leap|climb/i.test(text)) matched.push('platform');
    if (/multiplayer|2 player|pvp|co-op|versus|arena/i.test(text)) matched.push('multiplayer');
    if (/simulate|simulator|tycoon|manage|farm|cooking|kitchen|doctor|flight/i.test(text)) matched.push('simulation');
    if (/casual|relax|idle|click|easy|simple|hyper|tap|pop|fun/i.test(text)) matched.push('casual');
    if (/kid|baby|cute|pet|puppy|cat|animal|coloring|preschool|math/i.test(text)) matched.push('kids-games');
    if (/beauty|dress|makeup|fashion|salon|princess|makeover|nail|hair/i.test(text)) matched.push('beauty');
    if (/pool|billiard|snooker|8 ball|cue|table/i.test(text)) matched.push('pool');
    if (/board|ludo|domino|mahjong|backgammon|checkers|yahtzee|monopoly/i.test(text)) matched.push('board-games');
    if (/card|solitaire|poker|blackjack|spades|hearts|klondike|uno/i.test(text)) matched.push('card-games');
    if (/clicker|idle|tap|tapper|tycoon|incremental|upgrade/i.test(text)) matched.push('clicker');
    if (/.io |io game|worm|slither|agar|arena/i.test(text)) matched.push('io-games');

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

  // --- Category SEO Data Dictionary ---
  const CATEGORY_SEO_DATA = {
    'shooting': {
      title: 'Free Shooting Games – Action Shootouts & Target Combat',
      description: 'Lock, aim, and fire in high-octane shooting games on KopiPlay. Instant browser combat, target ranges, and space battles with zero downloads.',
      intro: 'Experience thrilling target combat and tactical shootouts in KopiPlay Shooting Games.',
      faqs: [{ q: 'Do shooting games run on mobile devices?', a: 'Yes! All shooting titles support intuitive virtual touch controls and mouse aiming across all devices.' }]
    },
    'action': {
      title: 'Free Action Games – Martial Arts, Brawlers & Reflex Missions',
      description: 'Test your reflexes and combat prowess with free browser action games on KopiPlay. Fast, responsive, and completely free.',
      intro: 'Dive into intense action missions, ninja combat, and fast-paced reflexes in KopiPlay Action Games.',
      faqs: [{ q: 'Are action games free to play?', a: 'Yes, 100% free with no downloads or mandatory accounts.' }]
    },
    'racing': {
      title: 'Free Racing Games – Drift Tracks & High-Speed Circuits',
      description: 'Burn rubber and conquer hairpin curves in free racing games on KopiPlay.',
      intro: 'Strap in for high-speed competition across super-car circuits and mega-ramp stunt arenas.',
      faqs: [{ q: 'Can I play racing games with a keyboard?', a: 'Yes, keyboard arrow keys and WASD are fully supported.' }]
    },
    'puzzle': {
      title: 'Free Puzzle Games – Logic Brain Teasers & Match Puzzles',
      description: 'Challenge your mind with free brain-training logic puzzles and relaxing match-3 games on KopiPlay.',
      intro: 'Solve clever logic challenges, spatial blocks, and relaxing puzzles.',
      faqs: [{ q: 'Is progress saved in puzzle games?', a: 'Yes, level progression is saved locally in your browser storage.' }]
    }
  };

  // --- Global State ---
  let catalog = [];
  let categoryList = [];
  let categoryCounts = {};
  let favorites = [];
  let recentlyPlayed = [];

  function loadLocalState() {
    migrateStorage();
    try {
      const rawFav = localStorage.getItem(STORAGE_KEYS.favorites) || '[]';
      favorites = JSON.parse(rawFav);
      const rawRec = localStorage.getItem(STORAGE_KEYS.recentlyPlayed) || '[]';
      recentlyPlayed = JSON.parse(rawRec);
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
      showToast('Added to your favorites!', '❤️');
    } else {
      favorites.splice(idx, 1);
      showToast('Removed from favorites', '🤍');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    } catch (e) {}

    const headerBadge = document.getElementById('headerFavBadge');
    if (headerBadge) {
      headerBadge.textContent = favorites.length;
      headerBadge.style.display = favorites.length > 0 ? '' : 'none';
    }
    return added;
  }

  function addRecentlyPlayed(slug) {
    const idx = recentlyPlayed.indexOf(slug);
    if (idx !== -1) recentlyPlayed.splice(idx, 1);
    recentlyPlayed.unshift(slug);
    if (recentlyPlayed.length > 30) recentlyPlayed.pop();
    try {
      localStorage.setItem(STORAGE_KEYS.recentlyPlayed, JSON.stringify(recentlyPlayed));
    } catch (e) {}
  }

  function showToast(message, icon) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'kopi-toast';
    toast.innerHTML = (icon ? ('<span>' + icon + '</span> ') : '') + '<span>' + escapeHtml(message) + '</span>';
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 220);
    }, 2800);
  }

  function computeCategoryCounts() {
    categoryCounts = {};
    categoryList.forEach(c => categoryCounts[c.slug] = 0);
    catalog.forEach(g => {
      g._categories = matchCategories(g);
      g._categories.forEach(slug => {
        categoryCounts[slug] = (categoryCounts[slug] || 0) + 1;
      });
    });
  }

  function updateSeo(options) {
    const opts = options || {};
    const title = opts.title || 'KopiPlay – Play Free Online Games';
    const description = opts.description || 'Discover and play hundreds of exciting online games for free on KopiPlay.';
    const canonical = opts.canonical || 'https://kipo.in/';
    const ogImage = opts.ogImage || 'assets/images/logo.svg';
    const ogType = opts.ogType || 'website';
    const schema = opts.schema || null;

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', title);

    const ogT = document.querySelector('meta[property="og:title"]');
    if (ogT) ogT.setAttribute('content', title);
    const ogD = document.querySelector('meta[property="og:description"]');
    if (ogD) ogD.setAttribute('content', description);

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
    }
    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', ogImage);
    }
    if (ogType) {
      const ogTypeEl = document.querySelector('meta[property="og:type"]');
      if (ogTypeEl) ogTypeEl.setAttribute('content', ogType);
    }
    if (schema) {
      const schemaScript = document.getElementById('kopi-schema');
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schema, null, 2);
      }
    }
  }

    // --- Render Sidebar (Fixed Dark Gaming Sidebar Matching Reference Image) ---
  function renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    const rawHash = window.location.hash || '#/';
    const currentHash = rawHash.split('?')[0];

    sidebar.innerHTML = `
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
            <a href="#/" class="sidebar-nav-item ${currentHash === '#/' || currentHash === '' ? 'active-nav-pill' : ''}" data-nav="home">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>Home</span>
              </span>
            </a>

            <a href="#/games" class="sidebar-nav-item ${currentHash === '#/games' ? 'active-nav-pill' : ''}" data-nav="games">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>All Games</span>
              </span>
              <span class="sidebar-pill-badge">${catalog.length}</span>
            </a>

            <a href="#/favorites" class="sidebar-nav-item ${currentHash === '#/favorites' ? 'active-nav-pill' : ''}" data-nav="favorites">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span>My Favorites</span>
              </span>
              <span class="sidebar-pill-badge" id="sidebarFavBadge">${favorites.length}</span>
            </a>

            <a href="#/recent" class="sidebar-nav-item ${currentHash === '#/recent' ? 'active-nav-pill' : ''}" data-nav="recent">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Recently Played</span>
              </span>
            </a>

            <a href="#/popular" class="sidebar-nav-item ${currentHash === '#/popular' ? 'active-nav-pill' : ''}" data-nav="popular">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                <span>Popular Games</span>
              </span>
            </a>

            <a href="#/new" class="sidebar-nav-item ${currentHash === '#/new' ? 'active-nav-pill' : ''}" data-nav="new">
              <span class="nav-item-content">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>New Games</span>
              </span>
              <span class="sidebar-new-badge">NEW</span>
            </a>

            <!-- All Categories Dropdown Accordion -->
            <div class="sidebar-dropdown-group ${currentHash.startsWith('#/category/') ? 'is-open' : ''}" id="sidebarCatGroup">
              <button type="button" class="sidebar-nav-item sidebar-dropdown-toggle" id="sidebarCatToggle" aria-expanded="${currentHash.startsWith('#/category/') ? 'true' : 'false'}">
                <span class="nav-item-content">
                  <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  <span>All Categories</span>
                </span>
                <svg class="dropdown-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="sidebar-categories-collapse" id="sidebarCatList">
                ${categoryList.map(c => {
                  const count = categoryCounts[c.slug] || 0;
                  if (count === 0) return '';
                  const isActive = currentHash === '#/category/' + c.slug;
                  return `
                    <a href="#/category/${c.slug}" class="sidebar-cat-subitem ${isActive ? 'active' : ''}">
                      <span class="cat-subitem-icon">${getCategoryIcon(c.slug)}</span>
                      <span class="cat-subitem-name">${c.name}</span>
                      <span class="cat-subitem-count">${count}</span>
                    </a>
                  `;
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
    `;

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

  // --- Render Header (Modern, Responsive, Clean Light Navbar) ---
  function renderHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    header.innerHTML = `
      <div class="header-inner">
        <div class="header-left">
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open Navigation Menu" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <a href="#/" class="header-logo" aria-label="KopiPlay Home">
            <svg class="header-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="6" y1="12" x2="10" y2="12"></line>
              <line x1="8" y1="10" x2="8" y2="14"></line>
              <line x1="15" y1="13" x2="15.01" y2="13"></line>
              <line x1="18" y1="11" x2="18.01" y2="11"></line>
              <rect x="2" y="6" width="20" height="12" rx="6"></rect>
            </svg>
            <span class="header-logo-text">Kopi<span>Play</span></span>
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
            <input type="text" class="search-input" id="globalSearchInput" placeholder="Search 189+ free games..." autocomplete="off" aria-label="Search games">
            <button class="search-clear-btn" id="searchClearBtn" aria-label="Clear Search" type="button"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <div class="search-suggestions" id="searchSuggestions"></div>
        </div>

        <div class="header-right">
          <button class="mobile-search-toggle" id="mobileSearchToggle" aria-label="Open Search" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <a href="#/favorites" class="header-action-btn" title="Favorites">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="action-text">Favorites</span>
            <span class="header-badge" id="headerFavBadge" style="${favorites.length > 0 ? '' : 'display:none;'}">${favorites.length}</span>
          </a>
          <a href="#/recent" class="header-action-btn" title="Recently Played">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span class="action-text">Recent</span>
          </a>
        </div>
      </div>
    `;

    initSearchEvents();
    initMobileNavEvents();
  }

  // --- Render Footer (Clean Modern Light Footer) ---
  function renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-container">
        <div class="footer-top">
          <!-- Column 1: KopiPlay Brand -->
          <div class="footer-brand">
            <a href="#/" class="footer-logo" aria-label="KopiPlay Home">
              <svg class="footer-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="6" y1="12" x2="10" y2="12"></line>
                <line x1="8" y1="10" x2="8" y2="14"></line>
                <line x1="15" y1="13" x2="15.01" y2="13"></line>
                <line x1="18" y1="11" x2="18.01" y2="11"></line>
                <rect x="2" y="6" width="20" height="12" rx="6"></rect>
              </svg>
              <span class="footer-logo-text">Kopi<span>Play</span></span>
            </a>
            <p>KopiPlay is a modern online gaming portal where players discover and enjoy free browser games. Instant play on PC, tablet, and mobile with zero downloads.</p>
            <div class="footer-brand-badge">
              <span class="pulse-dot"></span>
              <span>${catalog.length} Free Games &bull; Instant Play</span>
            </div>
          </div>

          <!-- Column 2: Explore Games -->
          <div class="footer-col">
            <h4>Explore Games</h4>
            <ul class="footer-links">
              <li><a href="#/games" class="footer-link">All Games (${catalog.length})</a></li>
              <li><a href="#/popular" class="footer-link">Popular Games</a></li>
              <li><a href="#/new" class="footer-link">New Releases</a></li>
              <li><a href="#/recent" class="footer-link">Recently Played</a></li>
              <li><a href="#/favorites" class="footer-link">Favorites</a></li>
            </ul>
          </div>

          <!-- Column 3: Popular Categories -->
          <div class="footer-col">
            <h4>Popular Categories</h4>
            <ul class="footer-links">
              <li><a href="#/category/shooting" class="footer-link">Shooting Games</a></li>
              <li><a href="#/category/action" class="footer-link">Action Games</a></li>
              <li><a href="#/category/adventure" class="footer-link">Adventure Games</a></li>
              <li><a href="#/category/racing" class="footer-link">Racing Games</a></li>
              <li><a href="#/category/puzzle" class="footer-link">Puzzle Games</a></li>
              <li><a href="#/category/sports" class="footer-link">Sports Games</a></li>
              <li><a href="#/category/arcade" class="footer-link">Arcade Games</a></li>
            </ul>
          </div>

          <!-- Column 4: Trust & Legal -->
          <div class="footer-col">
            <h4>Trust & Legal</h4>
            <ul class="footer-links">
              <li><a href="#/about" class="footer-link">About Us</a></li>
              <li><a href="#/contact" class="footer-link">Contact & Support</a></li>
              <li><a href="#/privacy" class="footer-link">Privacy Policy</a></li>
              <li><a href="#/terms" class="footer-link">Terms & Conditions</a></li>
              <li><a href="#/disclaimer" class="footer-link">Disclaimer</a></li>
              <li><a href="#/dmca" class="footer-link">DMCA & Copyright</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            &copy; 2026 KopiPlay. All rights reserved. Free Browser Gaming Platform.
          </div>
          <div class="footer-legal-links">
            <a href="#/about" class="footer-bottom-link">About Us</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/privacy" class="footer-bottom-link">Privacy Policy</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/terms" class="footer-bottom-link">Terms & Conditions</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/disclaimer" class="footer-bottom-link">Disclaimer</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/dmca" class="footer-bottom-link">DMCA</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/contact" class="footer-bottom-link">Contact</a>
          </div>
        </div>
      </div>
    `;
  }

  // --- Search Wiring (Global Navbar Search & Mobile Search Toggle) ---
  function initSearchEvents() {
    const input = document.getElementById('globalSearchInput');
    const suggestions = document.getElementById('searchSuggestions');
    const clearBtn = document.getElementById('searchClearBtn');
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    if (!input || !suggestions) return;

    if (mobileSearchToggle) {
      mobileSearchToggle.addEventListener('click', () => {
        const headerSearch = document.querySelector('.header-search');
        if (headerSearch) {
          const isShown = headerSearch.style.display === 'flex';
          headerSearch.style.display = isShown ? 'none' : 'flex';
          if (!isShown) input.focus();
        }
      });
    }

    let debounceTimer = null;

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';

      clearTimeout(debounceTimer);
      if (!q) {
        suggestions.style.display = 'none';
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
          suggestions.innerHTML = '<div style="padding:14px; text-align:center; color:var(--text-secondary); font-size:0.86rem;">No games found for "' + escapeHtml(q) + '"</div>';
        } else {
          suggestions.innerHTML = matches.map(g => `
            <a href="#/game/${g.slug}" class="suggestion-item" onclick="document.getElementById('searchSuggestions').style.display='none'">
              <img class="suggestion-thumb" src="${g.thumbnail}" alt="${escapeHtml(g.title)}" width="44" height="33" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
              <div class="suggestion-info">
                <div class="suggestion-title">${escapeHtml(g.title)}</div>
                <div class="suggestion-cat">${escapeHtml(g.category || 'Arcade')}</div>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--accent-primary); padding:3px 8px; border-radius:4px; background:var(--accent-primary-light);">PLAY</span>
            </a>
          `).join('');
        }
        suggestions.style.display = 'block';
      }, 120);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        suggestions.style.display = 'none';
        input.focus();
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (q) {
          suggestions.style.display = 'none';
          const heroInput = document.getElementById('heroSearchInput');
          if (heroInput) {
            heroInput.value = q;
            heroInput.dispatchEvent(new Event('input'));
          } else {
            window.location.hash = '#/games?q=' + encodeURIComponent(q);
          }
        }
      } else if (e.key === 'Escape') {
        suggestions.style.display = 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search')) {
        suggestions.style.display = 'none';
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
  }

  // --- Game Card Renderer (Modern Clean Poki Style) ---
  // --- Poki Grid Span Distribution Algorithm ---
  // Uses 1:1 square tiles for both 1x1 and 2x2 to preserve 100% of game thumbnails without cropping
  function getPokiSpan(index) {
    // Premier featured games spaced rhythmically across the grid
    const span2x2 = new Set([0, 9, 20, 31, 44, 57, 72, 87, 102, 119, 136, 153, 170]);
    if (span2x2.has(index)) return 'span-2x2';
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
    const catSlug = (game.category || 'arcade').toLowerCase();

    return `
      <a href="#/game/${game.slug}" class="game-card poki-card ${spanClass} ${borderClass}" data-slug="${game.slug}" data-category="${escapeHtml(catSlug)}" title="${escapeHtml(game.title)}" aria-label="Play ${escapeHtml(game.title)}">
        <img class="card-thumb poki-thumb"
             src="${game.thumbnail}"
             alt="${escapeHtml(game.title)}"
             loading="lazy"
             decoding="async"
             onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
        <span class="poki-card-badge">${escapeHtml(catLabel)}</span>
        <button class="card-fav-btn poki-card-fav ${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('${game.slug}', event)" title="Favorite" aria-label="Favorite" type="button">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="poki-card-overlay">
          <h3 class="card-title poki-card-title">${escapeHtml(game.title)}</h3>
        </div>
      </a>
    `;
  }

  // --- Top-Left Poki Brand & Search Tile ---
  function renderBrandTile(activeCat = 'all', searchQuery = '') {
    const catObj = categoryList.find(c => c.slug === activeCat);
    const catLabel = catObj ? catObj.name : (activeCat === 'all' ? ('All Categories (' + catalog.length + ')') : activeCat);

    return `
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
              <span class="poki-brand-badge" id="pokiFavBadge" style="${favorites.length > 0 ? '' : 'display:none;'}">${favorites.length}</span>
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
                 placeholder="Search 189+ games..."
                 value="${escapeHtml(searchQuery)}"
                 autocomplete="off"
                 aria-label="Search games directly">
          <button id="heroSearchClear" class="poki-search-clear hero-search-clear" type="button" aria-label="Clear Search" style="${searchQuery ? 'display:flex;' : 'display:none;'}">✕</button>
        </div>

        <div class="poki-brand-bottom">
          <button type="button" class="poki-cat-dropdown-btn" id="pokiCatTrigger" aria-expanded="false" onclick="document.getElementById('pokiCatMenu').classList.toggle('show')">
            <span id="pokiActiveCatLabel">${escapeHtml(catLabel)}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="poki-category-menu" id="pokiCatMenu">
            <a class="poki-cat-item ${activeCat === 'all' ? 'active' : ''}" onclick="window.NEXUS.filterCategory('all'); document.getElementById('pokiCatMenu').classList.remove('show');">
              <div class="poki-cat-item-left">${getCategoryIcon('all')} <span>All Games</span></div>
              <span class="poki-cat-count">${catalog.length}</span>
            </a>
            ${categoryList.map(c => {
              const count = categoryCounts[c.slug] || 0;
              if (count === 0) return '';
              return `
                <a class="poki-cat-item ${activeCat === c.slug ? 'active' : ''}" onclick="window.NEXUS.filterCategory('${c.slug}'); document.getElementById('pokiCatMenu').classList.remove('show');">
                  <div class="poki-cat-item-left">${getCategoryIcon(c.slug)} <span>${c.name}</span></div>
                  <span class="poki-cat-count">${count}</span>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // --- Homepage SEO Rich Content Section ---
  function renderHomepageSeoSection() {
    return `
      <section class="portal-seo-section" aria-label="About KopiPlay Free Online Games">
        <h2>Play Free Online Games on KopiPlay</h2>
        <p>KopiPlay is an online gaming platform where players can discover and enjoy hundreds of free browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting, and Sports. Play directly in your web browser with instant execution, zero downloads, and smooth responsive controls on PC, tablet, and mobile.</p>

        <div class="seo-highlight-grid">
          <div class="seo-highlight-item">
            <h4>Explore Free Online Games</h4>
            <p>From quick 2-minute casual puzzles to high-speed 3D racing simulators, every game runs smoothly in modern desktop and mobile browsers.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Popular Gaming Categories</h4>
            <p>Master target precision in Shooting Games, solve logic puzzles in Puzzle & Brain, or accelerate down tracks in Racing & Car games.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Discover New Browser Games</h4>
            <p>Our complete library of ${catalog.length} games is carefully curated with handpicked HTML5 creations from verified studios worldwide.</p>
          </div>
        </div>

        <h3 class="faq-section-title">Frequently Asked Questions</h3>
        <div class="faq-accordion">
          <details class="faq-item" open>
            <summary class="faq-question">Are all games on KopiPlay really free? <span>&#9660;</span></summary>
            <div class="faq-answer">Yes, 100%. Every single game in our catalog of ${catalog.length} games is completely free to play directly in your web browser with no paywalls or subscription requirements.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Do I need to download or install any plugins? <span>&#9660;</span></summary>
            <div class="faq-answer">No downloads or installations are required. All games run natively via modern HTML5, WebGL, and JavaScript technologies in any standard web browser.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Can I play KopiPlay games on my phone or tablet? <span>&#9660;</span></summary>
            <div class="faq-answer">Yes! KopiPlay is designed mobile-first. The user interface, touch controls, and responsive layouts adapt seamlessly to iPhone, iPad, Android, and tablets.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">How are my favorites and game history saved? <span>&#9660;</span></summary>
            <div class="faq-answer">Your favorites and recently played titles are saved locally in your own browser's storage so you can easily access them whenever you return.</div>
          </details>
        </div>
      </section>
    `;
  }

  // --- Hero Search Initialization ---
  function initHeroSearch() {
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
      const filterIndicator = document.getElementById('kopiFilterIndicator');
      const filterCatName = document.getElementById('kopiFilterCatName');
      const filterGameCount = document.getElementById('kopiFilterGameCount');

      if (titleEl) titleEl.textContent = q ? ('Search: "' + q + '"') : 'All Games';
      if (countEl) countEl.textContent = filtered.length + ' Games';

      if (filterIndicator) {
        if (q) {
          filterIndicator.style.display = 'flex';
          if (filterCatName) filterCatName.textContent = 'Search: "' + q + '"';
          if (filterGameCount) filterGameCount.textContent = filtered.length + ' Games';
        } else {
          filterIndicator.style.display = 'none';
        }
      }

      if (grid) {
        const brandTileHtml = renderBrandTile('all', q);
        const gamesHtml = filtered.length > 0 ? filtered.map((g, idx) => renderCard(g, idx)).join('') : `
          <div class="poki-empty-card">
            <div class="empty-state-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <h3 class="empty-state-title" style="margin-top:10px; color:#172033; font-weight:800;">No Games Found</h3>
            <p class="empty-state-text" style="color:#64748B; margin:8px 0 16px;">We couldn't find any games matching "${escapeHtml(q)}".</p>
            <button class="btn btn-primary" onclick="document.getElementById('heroSearchInput').value=''; window.NEXUS.filterCategory('all');" type="button">View All ${catalog.length} Games</button>
          </div>
        `;
        grid.innerHTML = brandTileHtml + gamesHtml;
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

  
  // --- Category Navigation & Smart Auto-Scroll Controller ---
  function scrollCategoryIntoView(btn) {
    const strip = document.getElementById('pokiCatStrip');
    if (!strip || !btn) return;

    const stripRect = strip.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const visibleWidth = strip.clientWidth;
    const maxScroll = strip.scrollWidth - visibleWidth;
    if (maxScroll <= 0) return;

    // Exact content coordinate relative to strip scroll
    const btnContentLeft = strip.scrollLeft + (btnRect.left - stripRect.left);
    const btnWidth = btnRect.width;

    // Smoothly center the clicked category button in the visible strip
    // This naturally reveals upcoming categories on the right and previous categories on the left
    const targetScroll = Math.max(0, Math.min(maxScroll, Math.round(btnContentLeft - (visibleWidth / 2) + (btnWidth / 2))));

    if (Math.abs(targetScroll - strip.scrollLeft) > 2) {
      strip.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }

    setTimeout(updateCatArrows, 320);
  }

  function updateCatArrows() {
    const strip = document.getElementById('pokiCatStrip');
    const leftArrow = document.getElementById('pokiCatArrowLeft');
    const rightArrow = document.getElementById('pokiCatArrowRight');
    if (!strip || !leftArrow || !rightArrow) return;

    const maxScroll = strip.scrollWidth - strip.clientWidth;
    if (maxScroll <= 8) {
      leftArrow.disabled = true;
      leftArrow.classList.add('is-disabled');
      rightArrow.disabled = true;
      rightArrow.classList.add('is-disabled');
      return;
    }

    const scrollLeft = strip.scrollLeft;

    if (scrollLeft <= 20) {
      leftArrow.disabled = true;
      leftArrow.classList.add('is-disabled');
    } else {
      leftArrow.disabled = false;
      leftArrow.classList.remove('is-disabled');
    }

    if (scrollLeft >= maxScroll - 20) {
      rightArrow.disabled = true;
      rightArrow.classList.add('is-disabled');
    } else {
      rightArrow.disabled = false;
      rightArrow.classList.remove('is-disabled');
    }
  }

  function initCategoryNavigation() {
    const strip = document.getElementById('pokiCatStrip');
    const leftArrow = document.getElementById('pokiCatArrowLeft');
    const rightArrow = document.getElementById('pokiCatArrowRight');
    if (!strip) return;

    // Left Arrow Click (smooth backward navigation)
    if (leftArrow) {
      leftArrow.onclick = () => {
        const step = Math.max(200, strip.clientWidth * 0.7);
        strip.scrollBy({ left: -step, behavior: 'smooth' });
        setTimeout(updateCatArrows, 320);
      };
    }

    // Right Arrow Click (smooth forward navigation)
    if (rightArrow) {
      rightArrow.onclick = () => {
        const step = Math.max(200, strip.clientWidth * 0.7);
        strip.scrollBy({ left: step, behavior: 'smooth' });
        setTimeout(updateCatArrows, 320);
      };
    }

    // Scroll listener to update arrow states
    strip.addEventListener('scroll', updateCatArrows, { passive: true });

    // Mouse wheel horizontal scrolling
    strip.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0 || e.deltaX !== 0) {
        e.preventDefault();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        strip.scrollLeft += delta * 0.85;
        updateCatArrows();
      }
    }, { passive: false });

    // Click & Drag Horizontal Scrolling
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    strip.addEventListener('mousedown', (e) => {
      isDown = true;
      hasDragged = false;
      strip.classList.add('is-dragging');
      startX = e.pageX - strip.offsetLeft;
      scrollStart = strip.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        strip.classList.remove('is-dragging');
        if (hasDragged) {
          setTimeout(() => { hasDragged = false; }, 50);
        }
      }
    });

    strip.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        strip.classList.remove('is-dragging');
      }
    });

    strip.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - strip.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 4) {
        hasDragged = true;
      }
      strip.scrollLeft = scrollStart - walk;
      updateCatArrows();
    });

    // Suppress accidental click when user dragged
    strip.addEventListener('click', (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        hasDragged = false;
      }
    }, true);

    // Initial arrow state
    updateCatArrows();
    window.addEventListener('resize', updateCatArrows);
  }

  // --- POKI-STYLE HOMEPAGE RENDERER (ALL 187 GAMES DIRECTLY IN ASYMMETRIC MASONRY GRID) ---
  function renderHomepage(selectedCat = 'all', searchQuery = '') {
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
        displayGames = displayGames.filter(g => g.popular === true || g.featured === true || g.badge === 'HOT' || g.badge === 'POPULAR' || g.badge === 'TOP');
      } else if (selectedCat === 'new') {
        displayGames = displayGames.filter(g => g.badge === 'NEW' || (g.releaseDate && g.releaseDate >= '2026-06-01'));
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

    const html = `
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
                    class="category-filter-btn poki-cat-pill ${selectedCat === 'all' ? 'active' : ''}"
                    data-slug="all"
                    onclick="window.NEXUS.filterCategory('all')">
              ${getCategoryIcon('all')}
              <span>All Games</span>
              <span class="category-btn-count">${catalog.length}</span>
            </button>
            ${categoryList.map(c => {
              const count = categoryCounts[c.slug] || 0;
              if (count === 0) return '';
              const isActive = selectedCat === c.slug;
              return `
                <button type="button"
                        class="category-filter-btn poki-cat-pill ${isActive ? 'active' : ''}"
                        data-slug="${c.slug}"
                        onclick="window.NEXUS.filterCategory('${c.slug}')">
                  ${getCategoryIcon(c.slug)}
                  <span>${c.name}</span>
                  <span class="category-btn-count">${count}</span>
                </button>
              `;
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
            <h1 class="hero-headline">Play <span class="hero-gold-count">${catalog.length}+</span> Free Online Games</h1>
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
        <div class="kopi-filter-indicator" id="kopiFilterIndicator" style="${(selectedCat === 'all' && !searchQuery) ? 'display:none;' : 'display:flex;'}">
          <div class="kopi-filter-info">
            <span class="kopi-filter-category" id="kopiFilterCatName">${escapeHtml(sectionTitle)}</span>
            <span class="kopi-filter-dot" aria-hidden="true">·</span>
            <span class="kopi-filter-count" id="kopiFilterGameCount">${displayGames.length} Games</span>
          </div>
          <button type="button" class="kopi-filter-clear-btn" id="kopiFilterClearBtn" onclick="window.NEXUS.filterCategory('all')" title="Clear filter and view all games">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Clear Filter</span>
          </button>
          <span id="gamesSectionTitle" style="display:none;">${escapeHtml(sectionTitle)}</span>
          <span id="gamesSectionCount" style="display:none;">${displayGames.length} Games</span>
        </div>

        <!-- Full-Screen Asymmetric Game Grid (Starts directly with games, 100% Bleed Squircles) -->
        <div class="games-grid poki-grid" id="mainGamesGrid">
          ${displayGames.length > 0 ? displayGames.map((g, idx) => renderCard(g, idx)).join('') : `
            <div class="poki-empty-card" style="grid-column: 1 / -1; padding: 48px; text-align: center; background: rgba(15,23,42,0.6); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
              <div class="empty-state-icon" style="margin-bottom: 12px; color: #94A3B8;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </div>
              <h3 class="empty-state-title" style="margin-top:10px; color:#F1F5F9; font-weight:800; font-size: 1.3rem;">No Games Found</h3>
              <p class="empty-state-text" style="color:#94A3B8; margin:8px 0 20px;">No games found for this category or filter.</p>
              <button class="btn btn-primary" onclick="window.NEXUS.filterCategory('all')" type="button" style="padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #7C3AED, #9333EA); color: #FFF; border: none; font-weight: 700; cursor: pointer;">View All ${catalog.length} Games</button>
            </div>
          `}
        </div>

        <!-- Rich Homepage SEO & FAQ Section -->
        <div class="homepage-seo-wrap" style="margin-top: 48px; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.45); color: #E2E8F0; padding: 28px;">
          ${renderHomepageSeoSection()}
        </div>
      </div>
    `;

    main.innerHTML = html;
    initCategoryNavigation();
    if (selectedCat && selectedCat !== 'all') {
      const activeBtn = document.querySelector(`.category-filter-btn[data-slug="${selectedCat}"]`);
      if (activeBtn) {
        setTimeout(() => scrollCategoryIntoView(activeBtn), 150);
      }
    }
  }

    // --- FAVORITES PAGE VIEW ---
  function renderFavoritesView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'My Favorite Games (' + favorites.length + ') – KopiPlay',
      description: 'Your saved favorite games on KopiPlay. Instant access to your top bookmarked titles with zero downloads.',
      canonical: 'https://kipo.in/#/favorites',
      ogType: 'website'
    });

    const favGames = favorites.map(slug => catalog.find(g => g.slug === slug || g.id === slug)).filter(Boolean);
    const recommendedGames = catalog.filter(g => g.popular === true && !favorites.includes(g.slug)).slice(0, 14);

    let contentHtml = '';

    if (favGames.length > 0) {
      contentHtml = `
        <div class="inner-page-header">
          <div class="inner-header-left">
            <h1 class="inner-page-title">My Favorite Games</h1>
            <p class="inner-page-subtitle">Your personal collection of saved games. Stored locally in your browser for instant replay.</p>
          </div>
          <div class="inner-header-actions">
            <button class="btn-clear-action" id="clearFavoritesBtn" onclick="window.NEXUS.clearAllFavorites()" type="button">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Clear All Favorites</span>
            </button>
          </div>
        </div>

        <div class="kopi-filter-indicator" style="display:flex; margin-bottom: 20px;">
          <div class="kopi-filter-info">
            <span class="kopi-filter-category">Saved Favorites</span>
            <span class="kopi-filter-dot">·</span>
            <span class="kopi-filter-count">${favGames.length} ${favGames.length === 1 ? 'Game' : 'Games'}</span>
          </div>
        </div>

        <div class="games-grid poki-grid" id="favoritesGrid">
          ${favGames.map((g, idx) => renderCard(g, idx)).join('')}
        </div>
      `;
    } else {
      contentHtml = `
        <div class="inner-page-header">
          <div class="inner-header-left">
            <h1 class="inner-page-title">My Favorite Games</h1>
            <p class="inner-page-subtitle">Your personal collection of saved games.</p>
          </div>
        </div>

        <!-- Premium Dark Gaming Empty State -->
        <div class="dark-empty-state-card">
          <div class="empty-state-glow"></div>
          <div class="empty-state-icon-wrap">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h2 class="empty-state-title">No Favorite Games Saved Yet</h2>
          <p class="empty-state-desc">
            You haven't bookmarked any games yet. Click the heart icon on any game card while browsing to save it here for instant access anytime!
          </p>
          <a href="#/games" class="btn-gradient-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Explore All ${catalog.length}+ Games</span>
          </a>
        </div>

        <!-- Recommended Games Section so the page never feels empty -->
        <div class="empty-recommendations-section">
          <div class="recommendations-header">
            <div class="rec-title-wrap">
              <span class="rec-badge">RECOMMENDED FOR YOU</span>
              <h3 class="rec-title">Popular Games You Might Enjoy</h3>
            </div>
            <a href="#/popular" class="rec-view-all">View All Popular &rarr;</a>
          </div>
          <div class="games-grid poki-grid">
            ${recommendedGames.map((g, idx) => renderCard(g, idx)).join('')}
          </div>
        </div>
      `;
    }

    main.innerHTML = `
      <div class="inner-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Favorites (${favorites.length})</span>
        </nav>

        ${contentHtml}
      </div>
    `;

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- RECENTLY PLAYED PAGE VIEW ---
  function renderRecentView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Recently Played Games (' + recentlyPlayed.length + ') – KopiPlay',
      description: 'Your recently played games on KopiPlay. Quickly pick up where you left off with zero downloads.',
      canonical: 'https://kipo.in/#/recent',
      ogType: 'website'
    });

    const recentGames = recentlyPlayed.map(slug => catalog.find(g => g.slug === slug || g.id === slug)).filter(Boolean);
    const recommendedGames = catalog.filter(g => g.featured === true && !recentlyPlayed.includes(g.slug)).slice(0, 14);

    let contentHtml = '';

    if (recentGames.length > 0) {
      contentHtml = `
        <div class="inner-page-header">
          <div class="inner-header-left">
            <h1 class="inner-page-title">Recently Played Games</h1>
            <p class="inner-page-subtitle">Games you have played recently. Jump straight back into the action!</p>
          </div>
          <div class="inner-header-actions">
            <button class="btn-clear-action" id="clearRecentBtn" onclick="window.NEXUS.clearPlayHistory()" type="button">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Clear History</span>
            </button>
          </div>
        </div>

        <div class="kopi-filter-indicator" style="display:flex; margin-bottom: 20px;">
          <div class="kopi-filter-info">
            <span class="kopi-filter-category">Play History</span>
            <span class="kopi-filter-dot">·</span>
            <span class="kopi-filter-count">${recentGames.length} ${recentGames.length === 1 ? 'Game' : 'Games'}</span>
          </div>
        </div>

        <div class="games-grid poki-grid" id="recentGrid">
          ${recentGames.map((g, idx) => renderCard(g, idx)).join('')}
        </div>
      `;
    } else {
      contentHtml = `
        <div class="inner-page-header">
          <div class="inner-header-left">
            <h1 class="inner-page-title">Recently Played Games</h1>
            <p class="inner-page-subtitle">Your recently played games will appear here.</p>
          </div>
        </div>

        <!-- Premium Dark Gaming Empty State -->
        <div class="dark-empty-state-card">
          <div class="empty-state-glow"></div>
          <div class="empty-state-icon-wrap">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h2 class="empty-state-title">No Games Played Recently</h2>
          <p class="empty-state-desc">
            You haven't played any games yet in this session. Choose any game from our library and your play history will be saved here automatically!
          </p>
          <a href="#/games" class="btn-gradient-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Play a Game Now</span>
          </a>
        </div>

        <!-- Featured Games Section -->
        <div class="empty-recommendations-section">
          <div class="recommendations-header">
            <div class="rec-title-wrap">
              <span class="rec-badge" style="color: #22D3EE; border-color: rgba(34,211,238,0.35);">FEATURED HITS</span>
              <h3 class="rec-title">Recommended Games to Start Playing</h3>
            </div>
            <a href="#/games" class="rec-view-all">Browse All ${catalog.length}+ Games &rarr;</a>
          </div>
          <div class="games-grid poki-grid">
            ${recommendedGames.map((g, idx) => renderCard(g, idx)).join('')}
          </div>
        </div>
      `;
    }

    main.innerHTML = `
      <div class="inner-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Recently Played (${recentlyPlayed.length})</span>
        </nav>

        ${contentHtml}
      </div>
    `;

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- ALL GAMES PAGE VIEW ---
  function renderAllGamesView(title = 'All Games', games = catalog, activeCatSlug = null) {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'All Free Online Games (' + catalog.length + ' Games) – KopiPlay',
      description: 'Browse the complete catalog of ' + catalog.length + ' verified free online HTML5 games on KopiPlay. Instant browser play with zero downloads.',
      canonical: 'https://kipo.in/#/games',
      ogType: 'website'
    });

    const currentSort = (localStorage.getItem(STORAGE_KEYS.sortPref) || localStorage.getItem(STORAGE_KEYS.legacySort) || 'featured');
    let displayGames = [...games];

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

    main.innerHTML = `
      <div class="inner-page-container">
        <!-- Sleek Horizontal Category Navigation Bar with Smooth Auto-Scroll & Arrows -->
        <div class="poki-cat-nav-wrapper" id="pokiCatNavWrapper">
          <button type="button" class="poki-cat-arrow poki-cat-arrow-left" id="pokiCatArrowLeft" aria-label="Previous categories" title="Previous categories" disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="poki-cat-strip" id="pokiCatStrip" aria-label="Category Filters">
            <button type="button"
                    class="category-filter-btn poki-cat-pill ${(!activeCatSlug || activeCatSlug === 'all') ? 'active' : ''}"
                    data-slug="all"
                    onclick="window.NEXUS.filterCategory('all')">
              ${getCategoryIcon('all')}
              <span>All Games</span>
              <span class="category-btn-count">${catalog.length}</span>
            </button>
            ${categoryList.map(c => {
              const count = categoryCounts[c.slug] || 0;
              if (count === 0) return '';
              const isActive = activeCatSlug === c.slug;
              return `
                <button type="button"
                        class="category-filter-btn poki-cat-pill ${isActive ? 'active' : ''}"
                        data-slug="${c.slug}"
                        onclick="window.NEXUS.filterCategory('${c.slug}')">
                  ${getCategoryIcon(c.slug)}
                  <span>${c.name}</span>
                  <span class="category-btn-count">${count}</span>
                </button>
              `;
            }).join('')}
          </div>

          <button type="button" class="poki-cat-arrow poki-cat-arrow-right" id="pokiCatArrowRight" aria-label="Next categories" title="Next categories">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="inner-page-header">
          <div class="inner-header-left">
            <h1 class="inner-page-title">${escapeHtml(title)}</h1>
            <p class="inner-page-subtitle">Explore ${displayGames.length} free browser games. Instant play with zero downloads.</p>
          </div>
          <div class="inner-header-actions">
            <div class="sort-selector-wrap">
              <label for="gamesSortSelect" class="sort-label">Sort by:</label>
              <select id="gamesSortSelect" class="games-sort-select" onchange="window.NEXUS.sortView(this.value)">
                <option value="featured" ${currentSort === 'featured' ? 'selected' : ''}>Featured</option>
                <option value="newest" ${currentSort === 'newest' ? 'selected' : ''}>Newest</option>
                <option value="az" ${currentSort === 'az' ? 'selected' : ''}>Name A-Z</option>
                <option value="za" ${currentSort === 'za' ? 'selected' : ''}>Name Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <div class="games-grid poki-grid" id="mainGamesGrid">
          ${displayGames.map((g, idx) => renderCard(g, idx)).join('')}
        </div>
      </div>
    `;

    initCategoryNavigation();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderGameDetail(slug) {
    const main = document.getElementById('app-main');
    if (!main) return;
    document.body.classList.remove('poki-home-mode');

    const game = catalog.find(g =>
      g.slug === slug ||
      g.id === slug ||
      (g.aliases && g.aliases.includes(slug)) ||
      (g.slug && g.slug.toLowerCase() === slug.toLowerCase()) ||
      (g.id && g.id.toLowerCase() === slug.toLowerCase())
    );

    if (!game) {
      main.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 class="empty-state-title">Game Not Found</h2>
          <p class="empty-state-text">We couldn't locate the game "${escapeHtml(slug)}". It may have been renamed or moved.</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      `;
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

    // Related Games: 5 games from same category or general catalog
    const related = catalog.filter(g => g.slug !== game.slug && (g.category === game.category || (g._categories && g._categories.includes(catSlug)))).slice(0, 5);
    const relatedGames = related.length >= 5 ? related : catalog.filter(g => g.slug !== game.slug).slice(0, 5);

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
      return keys.map(k => '<span class="keycap">' + k + '</span>').join('');
    })();

    updateSeo({
      title: 'Play ' + game.title + ' Online Free – KopiPlay',
      description: game.description || ('Play ' + game.title + ' instantly in your browser on KopiPlay. Free online game with zero downloads.'),
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

    const html = `
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Back</span>
        </button>
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-sep">&gt;</span>
        <a href="#/category/${catSlug}" class="breadcrumb-link">${escapeHtml(game.category || 'Action')}</a>
        <span class="breadcrumb-sep">&gt;</span>
        <span class="breadcrumb-current">${escapeHtml(game.title)}</span>

        <button class="player-fav-btn ${isFav ? 'is-fav' : ''}" id="detailFavBtn" onclick="window.NEXUS.toggleFav('${game.slug}', event)" title="Favorite" aria-label="Favorite" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span id="detailFavText">${isFav ? 'Favorited' : 'Favorite'}</span>
        </button>
      </nav>

      <!-- Clean Centered Player Layout -->
      <div class="game-stage-clean">
        <!-- 16:9 Cinematic Player Container -->
        <div class="player-stage-card" id="playerStageCard">
          <iframe id="gameIframe"
                  src="${embedUrl}"
                  title="${escapeHtml(game.title)}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowfullscreen
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals">
          </iframe>
          <button class="player-overlay-fullscreen-btn" id="playerOverlayFullscreenBtn" title="Toggle Fullscreen" aria-label="Toggle Fullscreen" onclick="window.NEXUS.toggleFullscreen()" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>
        </div>

        <!-- Game Details & Meta Card -->
        <div class="game-details-meta-card">
          <div class="game-details-header">
            <div class="game-details-title-wrap">
              <h1 class="game-details-title">${escapeHtml(game.title)}</h1>
              <div class="game-details-tags">
                <span class="game-tag-badge">${escapeHtml(game.category || 'Arcade')}</span>
                <span class="game-tag-badge">Free Instant Play</span>
                ${game.rating ? ('<span class="game-tag-rating">★ ' + escapeHtml(String(game.rating)) + '</span>') : ''}
                ${game.plays ? ('<span class="game-tag-plays">▶ ' + Number(game.plays).toLocaleString() + ' Plays</span>') : ''}
              </div>
            </div>
            <div class="game-details-actions">
              <button class="player-share-btn" onclick="window.NEXUS.shareGame('${game.slug}', '${escapeHtml(game.title)}')" title="Share Game" type="button">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                <span>Share</span>
              </button>
            </div>
          </div>

          <div class="game-details-body">
            <div class="game-details-desc">
              <h4>About ${escapeHtml(game.title)}</h4>
              <p>${escapeHtml(game.description || ('Play ' + game.title + ' instantly in your browser on KopiPlay. Free online game with zero downloads.'))}</p>
            </div>
            <div class="game-details-controls">
              <h4>Game Controls</h4>
              <div class="game-controls-keys">${controlsHtml}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Games Strip -->
      <section class="related-games-section">
        <div class="related-games-header">
          <h3>Related Games</h3>
          <a href="#/games" class="related-view-all">View All Games</a>
        </div>
        <div class="related-games-strip">
          ${relatedGames.map(renderCard).join('')}
        </div>
      </section>
    `;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- REDESIGNED LEGAL & INFORMATIONAL PAGES ---

  // 1. ABOUT US
  function renderAboutView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'About KopiPlay – Free Online Gaming Portal',
      description: 'Discover KopiPlay, your home for verified HTML5 browser games. Instant play on PC, tablet, and mobile with zero downloads.',
      canonical: 'https://kipo.in/#/about',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">About Us</span>
        </nav>

        <header class="legal-header-card">
          <div class="legal-header-badge">About KopiPlay</div>
          <h1 class="legal-title">Play Instantly. Discover More.</h1>
          <p class="legal-subtitle">
            KopiPlay is an independent online gaming portal built to deliver verified, high-performance browser games directly to your screen—no software downloads, no paywalls, and zero friction.
          </p>
        </header>

        <div class="seo-highlight-grid" style="margin-bottom: 24px;">
          <div class="seo-highlight-item">
            <h4>Instant Execution</h4>
            <p>Built purely on HTML5 Canvas, WebGL, and modern web standards. Games load in seconds in your browser tab without native client installs.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Privacy First</h4>
            <p>Zero mandatory accounts or invasive tracking. Your favorite titles and gameplay history are saved locally in your own browser.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Handpicked Library</h4>
            <p>A catalog of ${catalog.length} verified titles across 22 categories, from high-speed 3D racers and tactical shooters to relaxing puzzles.</p>
          </div>
        </div>

        <div class="legal-card">
          <h3>The KopiPlay Mission</h3>
          <p>
            We believe digital entertainment should be straightforward and enjoyable. Too many gaming sites burden players with mandatory user registrations, excessive loading screens, and heavy background downloads. KopiPlay strips away those barriers by curating legitimate HTML5 titles from verified game studios worldwide and presenting them in a fast, organized, modern portal.
          </p>
          <p>
            Whether you have two minutes for a quick casual puzzle on your mobile commute or an hour for a 3D driving simulator on your PC, KopiPlay delivers instant fun directly inside any modern web browser.
          </p>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 2. CONTACT US
  function renderContactView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Contact & Support – KopiPlay Gaming Portal',
      description: 'Get in touch with the KopiPlay team for game feedback, developer submissions, partnership inquiries, and technical support.',
      canonical: 'https://kipo.in/#/contact',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Contact & Support</span>
        </nav>

        <header class="legal-header-card">
          <div class="legal-header-badge">Get in Touch</div>
          <h1 class="legal-title">We'd Love to Hear From You</h1>
          <p class="legal-subtitle">
            Have a game suggestion, technical issue, copyright inquiry, or developer partnership proposal? Send us a message and our support team will respond within 24–48 business hours.
          </p>
        </header>

        <div class="contact-form-card">
          <form id="contactPageForm" onsubmit="window.NEXUS.submitContact(event)">
            <div class="contact-form-group">
              <label class="contact-form-label" for="contactName">Your Name</label>
              <input type="text" id="contactName" class="contact-input" placeholder="e.g. Alex Morgan" required>
            </div>
            <div class="contact-form-group">
              <label class="contact-form-label" for="contactEmail">Your Email Address</label>
              <input type="email" id="contactEmail" class="contact-input" placeholder="name@example.com" required>
            </div>
            <div class="contact-form-group">
              <label class="contact-form-label" for="contactSubject">Inquiry Topic</label>
              <select id="contactSubject" class="contact-input" required style="cursor: pointer;">
                <option value="general">General Feedback / Question</option>
                <option value="broken-game">Broken Game or Bug Report</option>
                <option value="developer">Developer Game Submission</option>
                <option value="dmca">Copyright / DMCA Notice</option>
                <option value="partnership">Business & Advertising Inquiries</option>
              </select>
            </div>
            <div class="contact-form-group">
              <label class="contact-form-label" for="contactMessage">Your Message</label>
              <textarea id="contactMessage" class="contact-textarea" placeholder="Provide details about your question, suggestion, or issue..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Send Message</button>
          </form>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 3. PRIVACY POLICY
  function renderPrivacyView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Privacy Policy – KopiPlay Online Gaming',
      description: 'Review the KopiPlay Privacy Policy to learn how we protect your information, use local browser storage, and safeguard player privacy.',
      canonical: 'https://kipo.in/#/privacy',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Privacy Policy</span>
        </nav>

        <header class="legal-header-card">
          <div class="legal-header-badge">Privacy Commitment</div>
          <h1 class="legal-title">Privacy Policy</h1>
          <p class="legal-subtitle">Last Updated: November 2026 &bull; Effective Immediately</p>
        </header>

        <div class="legal-card">
          <h3>1. Privacy Principles & Information Collection</h3>
          <p>
            At KopiPlay, we believe player privacy should be simple and respected. We do not require personal accounts, passwords, phone numbers, or credit cards to browse or play our ${catalog.length} free games.
          </p>
          <p>
            When you use KopiPlay, standard anonymous web technical data may be processed automatically, such as browser type, operating system version, screen resolution, referring URL, and approximate country.
          </p>
        </div>

        <div class="legal-card">
          <h3>2. Local Storage & Client Cookies</h3>
          <p>
            KopiPlay utilizes standard HTML5 LocalStorage to maintain your personal favorites list and recently played titles. This data is stored entirely on your local device and is never uploaded to remote servers.
          </p>
        </div>

        <div class="legal-card">
          <h3>3. Third-Party Game Embeds</h3>
          <p>
            Games hosted via third-party iframe embeds may load assets and store gameplay data according to their own privacy policies. We review our providers to ensure safe, family-friendly browser entertainment.
          </p>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 4. TERMS OF SERVICE
  function renderTermsView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Terms & Conditions – KopiPlay',
      description: 'Terms of Service governing the use of KopiPlay free browser games portal and digital content.',
      canonical: 'https://kipo.in/#/terms',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Terms & Conditions</span>
        </nav>

        <header class="legal-header-card">
          <div class="legal-header-badge">User Agreement</div>
          <h1 class="legal-title">Terms & Conditions</h1>
          <p class="legal-subtitle">Last Updated: November 2026 &bull; Effective Immediately</p>
        </header>

        <div class="legal-card">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or playing games on KopiPlay, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please discontinue using the service.
          </p>
        </div>

        <div class="legal-card">
          <h3>2. Permitted Use</h3>
          <p>
            KopiPlay provides free, instant-play browser games for personal, non-commercial entertainment. You agree not to attempt to circumvent site security, overload servers, or exploit platform infrastructure.
          </p>
        </div>

        <div class="legal-card">
          <h3>3. Intellectual Property</h3>
          <p>
            All game titles, trademarks, and associated media belong to their respective creators and licensors. KopiPlay branding and interface designs are protected by applicable copyright laws.
          </p>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 5. DMCA & COPYRIGHT
  function renderDmcaView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'DMCA & Copyright Policy – KopiPlay',
      description: 'Official Digital Millennium Copyright Act policy, copyright infringement notification procedure, and contact information for KopiPlay.',
      canonical: 'https://kipo.in/#/dmca',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">DMCA & Copyright</span>
        </nav>

        <header class="legal-header-card">
          <div class="legal-header-badge">Copyright Protection</div>
          <h1 class="legal-title">DMCA & Copyright Policy</h1>
          <p class="legal-subtitle">Compliance with the Digital Millennium Copyright Act (17 U.S.C. &sect; 512)</p>
        </header>

        <div class="legal-card">
          <h3>Respect for Intellectual Property</h3>
          <p>
            KopiPlay respects intellectual property rights and expects its users and partners to do the same. If you believe your copyrighted work has been copied or hosted without authorization, we will promptly investigate and take down infringing content upon receiving a valid DMCA notice.
          </p>
          <div class="legal-notice-box">
            Please submit copyright notices via our <a href="#/contact" style="color:var(--accent-primary); font-weight:700;">Contact Form</a> with the subject "Copyright / DMCA Notice". Valid notices are investigated within 24 to 48 business hours.
          </div>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 6. DISCLAIMER
  function renderDisclaimerView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Disclaimer – KopiPlay Free Online Games',
      description: 'Read the official KopiPlay website disclaimer, content liability terms, and third-party game notices.',
      canonical: 'https://kipo.in/#/disclaimer',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Disclaimer</span>
        </nav>

        <header class="legal-header-card">
          <div class="legal-header-badge">Legal Notice</div>
          <h1 class="legal-title">Website Disclaimer</h1>
          <p class="legal-subtitle">Please read this disclaimer carefully before using the KopiPlay website.</p>
        </header>

        <div class="legal-card">
          <h3>General Entertainment Purposes Only</h3>
          <p>
            The games, materials, and information available on KopiPlay are provided on an "as is" and "as available" basis for personal entertainment and amusement only. KopiPlay makes no warranties regarding game performance or third-party server uptime.
          </p>
        </div>

        <div class="legal-card">
          <h3>Third-Party Content Notice</h3>
          <p>
            Certain browser-based games embedded on KopiPlay are provided by independent third-party developers. KopiPlay does not develop all titles directly and is not liable for third-party in-game links or mechanics.
          </p>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- ROUTER & NAVIGATION ---
  function handleRoute() {
    const rawHash = window.location.hash || '#/';
    const hash = rawHash.split('?')[0];

    updateActiveNavClasses(hash);

    if (hash === '#/' || hash === '' || hash === '#') {
      renderHomepage('all');
    } else if (hash === '#/games') {
      const urlParams = new URLSearchParams(rawHash.includes('?') ? rawHash.split('?')[1] : '');
      const query = urlParams.get('q');
      if (query) {
        renderHomepage('all', query);
      } else {
        renderAllGamesView('All Games (' + catalog.length + ')', catalog, 'all');
      }
    } else if (hash === '#/popular') {
      renderHomepage('popular');
    } else if (hash === '#/new') {
      renderHomepage('new');
    } else if (hash === '#/favorites') {
      renderFavoritesView();
    } else if (hash === '#/recent') {
      renderRecentView();
    } else if (hash.startsWith('#/category/')) {
      const catSlug = hash.replace('#/category/', '');
      renderHomepage(catSlug);
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
    } else if (hash === '#/disclaimer') {
      renderDisclaimerView();
    } else {
      renderHomepage('all');
    }
  }

  function updateActiveNavClasses(hash) {
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
  }

  // --- Global Window NEXUS Namespace ---
  window.KOPI = window.KIPO = window.kopiAds = kopiAds;
  window.NEXUS = {
    ads: kopiAds,
    clearAllFavorites: function () {
      if (confirm('Are you sure you want to clear all your saved favorite games?')) {
        favorites = [];
        saveFavorites();
        const badge = document.getElementById('sidebarFavBadge');
        if (badge) badge.textContent = '0';
        showToast('All favorites cleared', '🗑️');
        renderFavoritesView();
      }
    },

    clearPlayHistory: function () {
      if (confirm('Are you sure you want to clear your recently played history?')) {
        recentlyPlayed = [];
        saveRecentlyPlayed();
        showToast('Play history cleared', '🗑️');
        renderRecentView();
      }
    },

    goBack: function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = '#/';
      }
    },

    filterCategory: function (catSlug) {
      document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-slug') === catSlug);
      });

      const activeBtn = document.querySelector(`.category-filter-btn[data-slug="${catSlug}"]`);
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
          filtered = filtered.filter(g => g.popular === true || g.featured === true || g.badge === 'HOT' || g.badge === 'POPULAR' || g.badge === 'TOP');
        } else if (catSlug === 'new') {
          filtered = filtered.filter(g => g.badge === 'NEW' || (g.releaseDate && g.releaseDate >= '2026-06-01'));
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
        const gamesHtml = filtered.length > 0 ? filtered.map((g, idx) => renderCard(g, idx)).join('') : `
          <div class="poki-empty-card" style="grid-column: 1 / -1; padding: 48px; text-align: center; background: rgba(15,23,42,0.6); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
            <div class="empty-state-icon" style="margin-bottom: 12px; color: #94A3B8;">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <h3 class="empty-state-title" style="margin-top:10px; color:#F1F5F9; font-weight:800; font-size: 1.3rem;">No Games Found</h3>
            <p class="empty-state-text" style="color:#94A3B8; margin:8px 0 20px;">No games found in this category.</p>
            <button class="btn btn-primary" onclick="window.NEXUS.filterCategory('all')" type="button" style="padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #7C3AED, #9333EA); color: #FFF; border: none; font-weight: 700; cursor: pointer;">View All ${catalog.length} Games</button>
          </div>
        `;
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
    },

    sortView: function (sortBy) {
      try {
        localStorage.setItem(STORAGE_KEYS.sortPref, sortBy);
        localStorage.setItem(STORAGE_KEYS.legacySort, sortBy);
      } catch (e) {}

      const activeBtn = document.querySelector('.category-filter-btn.active');
      const catSlug = activeBtn ? activeBtn.getAttribute('data-slug') : 'all';

      let list = [...catalog];
      if (catSlug && catSlug !== 'all') {
        if (catSlug === 'favorites') {
          list = list.filter(g => favorites.includes(g.slug));
        } else if (catSlug === 'recent') {
          list = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
        } else if (catSlug === 'popular') {
          list = list.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7));
        } else if (catSlug === 'new') {
          list = list.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01'));
        } else {
          list = list.filter(g => g._categories && g._categories.includes(catSlug));
        }
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

    toggleFullscreen: function () {
      const container = document.getElementById('playerStageCard');
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
        if (txt) txt.textContent = isFav ? 'Favorited' : 'Favorite';
      }
    },

    shareGame: function (slug, title) {
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({ title: title || 'Play on KopiPlay', url: url }).catch(() => {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Game link copied to clipboard!', '🔗');
        }).catch(() => {
          showToast('Game URL: ' + url, '🔗');
        });
      } else {
        showToast('Game URL: ' + url, '🔗');
      }
    },

    goBack: function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = '#/';
      }
    },

    submitContact: function (e) {
      e.preventDefault();
      showToast('Thank you! Your message has been received.', '✉️');
      const form = document.getElementById('contactPageForm');
      if (form) form.reset();
    }
  };

  // --- INITIALIZATION ---
  async function init() {
    loadLocalState();

    const rawCatalog = window.KIPO_CATALOG || window.NEXUS_CATALOG;
    if (rawCatalog && Array.isArray(rawCatalog) && rawCatalog.length > 0) {
      catalog = rawCatalog;
    }
    const rawCategories = window.KIPO_CATEGORIES || window.NEXUS_CATEGORIES;
    if (rawCategories && Array.isArray(rawCategories) && rawCategories.length > 0) {
      categoryList = rawCategories;
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
      // Offline fallback already loaded via catalogData.js
    }

    console.log('[KopiPlay] Initialized with ' + catalog.length + ' games across ' + categoryList.length + ' categories.');

    computeCategoryCounts();
    renderSidebar();
    renderHeader();
    renderFooter();

    // Back to top button listener
    const btt = document.getElementById('back-to-top');
    if (btt) {
      window.addEventListener('scroll', () => {
        btt.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });
      btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

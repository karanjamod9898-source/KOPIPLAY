const fs = require('fs');
const path = require('path');

let script = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// 1. Header comments
script = script.replace('NEXUSPLAY - Complete Modern Gaming Portal Bundle', 'KipoPlay - Complete Modern Gaming Portal Bundle');

// 2. Add Centralized Site Configuration & Storage Keys before Application State
const configAndStorageSnippet = `
  // --- Centralized Site Configuration ---
  const SITE_CONFIG = {
    brandName: 'KipoPlay',
    tagline: 'Play More. Discover More.',
    category: 'Free Online Games',
    description: 'KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports.',
    homepageTitle: 'KipoPlay – Play Free Online Games',
    homepageDescription: 'Discover KipoPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.',
    productionDomain: 'https://kipo.in'
  };

  const STORAGE_KEYS = {
    favorites: 'kipoplay_favorites',
    recentlyPlayed: 'kipoplay_recent',
    sortPref: 'kipoplay_sort_pref',
    sidebarCollapsed: 'kipoplay_sidebar_collapsed',
    reports: 'kipoplay_game_reports',
    messages: 'kipoplay_contact_messages',
    // Legacy keys for safe migration and backward compatibility
    legacyFavorites: 'nexus_favorites',
    legacyFavoritesAlt: 'nexusplay_favorites',
    legacyRecent: 'nexus_recently_played',
    legacyRecentAlt: 'nexusplay_recent',
    legacySort: 'nexus_sort_pref',
    legacySidebar: 'nexus_sidebar_collapsed',
    legacyReports: 'nexus_game_reports',
    legacyMessages: 'nexus_contact_messages'
  };

  function migrateStorage() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.favorites)) {
        const oldFav = localStorage.getItem(STORAGE_KEYS.legacyFavorites) || localStorage.getItem(STORAGE_KEYS.legacyFavoritesAlt);
        if (oldFav) localStorage.setItem(STORAGE_KEYS.favorites, oldFav);
      }
      if (!localStorage.getItem(STORAGE_KEYS.recentlyPlayed)) {
        const oldRec = localStorage.getItem(STORAGE_KEYS.legacyRecent) || localStorage.getItem(STORAGE_KEYS.legacyRecentAlt);
        if (oldRec) localStorage.setItem(STORAGE_KEYS.recentlyPlayed, oldRec);
      }
      if (!localStorage.getItem(STORAGE_KEYS.sortPref)) {
        const oldSort = localStorage.getItem(STORAGE_KEYS.legacySort);
        if (oldSort) localStorage.setItem(STORAGE_KEYS.sortPref, oldSort);
      }
      if (!localStorage.getItem(STORAGE_KEYS.sidebarCollapsed)) {
        const oldSb = localStorage.getItem(STORAGE_KEYS.legacySidebar);
        if (oldSb) localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, oldSb);
      }
    } catch (e) {}
  }
`;

script = script.replace('  // --- Application State ---', configAndStorageSnippet + '\n  // --- Application State ---');

// 3. Update loadLocalState, toggleFavorite, addRecentlyPlayed
const oldLoadLocalState = `  function loadLocalState() {
    try {
      favorites = JSON.parse(localStorage.getItem('nexus_favorites') || '[]');
      recentlyPlayed = JSON.parse(localStorage.getItem('nexus_recently_played') || '[]');
    } catch (e) {
      favorites = [];
      recentlyPlayed = [];
    }
  }`;

const newLoadLocalState = `  function loadLocalState() {
    migrateStorage();
    try {
      const rawFav = localStorage.getItem(STORAGE_KEYS.favorites) || 
                     localStorage.getItem(STORAGE_KEYS.legacyFavorites) || 
                     localStorage.getItem(STORAGE_KEYS.legacyFavoritesAlt) || '[]';
      favorites = JSON.parse(rawFav);
      const rawRec = localStorage.getItem(STORAGE_KEYS.recentlyPlayed) || 
                     localStorage.getItem(STORAGE_KEYS.legacyRecent) || 
                     localStorage.getItem(STORAGE_KEYS.legacyRecentAlt) || '[]';
      recentlyPlayed = JSON.parse(rawRec);
    } catch (e) {
      favorites = [];
      recentlyPlayed = [];
    }
  }`;

script = script.replace(oldLoadLocalState, newLoadLocalState);

// Replace favorite saving
script = script.replace(
  "localStorage.setItem('nexus_favorites', JSON.stringify(favorites));",
  "localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));\n      localStorage.setItem(STORAGE_KEYS.legacyFavorites, JSON.stringify(favorites));\n      localStorage.setItem(STORAGE_KEYS.legacyFavoritesAlt, JSON.stringify(favorites));"
);

// Replace recently played saving
script = script.replace(
  "localStorage.setItem('nexus_recently_played', JSON.stringify(recentlyPlayed));",
  "localStorage.setItem(STORAGE_KEYS.recentlyPlayed, JSON.stringify(recentlyPlayed));\n      localStorage.setItem(STORAGE_KEYS.legacyRecent, JSON.stringify(recentlyPlayed));\n      localStorage.setItem(STORAGE_KEYS.legacyRecentAlt, JSON.stringify(recentlyPlayed));"
);

// 4. Update Schema Script and Modal lookups
script = script.replace(
  "const schemaScript = document.getElementById('nexus-schema');",
  "const schemaScript = document.getElementById('kipo-schema') || document.getElementById('nexus-schema');"
);

script = script.replaceAll(
  "document.getElementById('nexus-modal-root')",
  "(document.getElementById('kipo-modal-root') || document.getElementById('nexus-modal-root'))"
);

// 5. Replace Category SEO text: NEXUSPLAY -> KipoPlay
script = script.replaceAll('- NEXUSPLAY', '- KipoPlay');
script = script.replaceAll('on NEXUSPLAY', 'on KipoPlay');
script = script.replaceAll('with NEXUSPLAY', 'with KipoPlay');
script = script.replaceAll('NEXUSPLAY Shooting Games', 'KipoPlay Shooting Games');
script = script.replaceAll('NEXUSPLAY Action Games', 'KipoPlay Action Games');
script = script.replaceAll('NEXUSPLAY Adventure Games', 'KipoPlay Adventure Games');
script = script.replaceAll('NEXUSPLAY Racing Games', 'KipoPlay Racing Games');
script = script.replaceAll('NEXUSPLAY Car Games', 'KipoPlay Car Games');
script = script.replaceAll('NEXUSPLAY Driving Games', 'KipoPlay Driving Games');
script = script.replaceAll('NEXUSPLAY Sports Games', 'KipoPlay Sports Games');
script = script.replaceAll('NEXUSPLAY Football Games', 'KipoPlay Football Games');
script = script.replaceAll('NEXUSPLAY Puzzle Games', 'KipoPlay Puzzle Games');
script = script.replaceAll('NEXUSPLAY Strategy Games', 'KipoPlay Strategy Games');
script = script.replaceAll('NEXUSPLAY Platform Games', 'KipoPlay Platform Games');
script = script.replaceAll('NEXUSPLAY Multiplayer Games', 'KipoPlay Multiplayer Games');
script = script.replaceAll('NEXUSPLAY Arcade Games', 'KipoPlay Arcade Games');
script = script.replaceAll('NEXUSPLAY Simulation Games', 'KipoPlay Simulation Games');
script = script.replaceAll('NEXUSPLAY Casual Games', 'KipoPlay Casual Games');
script = script.replaceAll('NEXUSPLAY Kids Games', 'KipoPlay Kids Games');
script = script.replaceAll('NEXUSPLAY Beauty Games', 'KipoPlay Beauty Games');
script = script.replaceAll('NEXUSPLAY Pool Games', 'KipoPlay Pool Games');
script = script.replaceAll('NEXUSPLAY Board Games', 'KipoPlay Board Games');
script = script.replaceAll('NEXUSPLAY Card Games', 'KipoPlay Card Games');
script = script.replaceAll('NEXUSPLAY Clicker Games', 'KipoPlay Clicker Games');
script = script.replaceAll('NEXUSPLAY .io Games', 'KipoPlay .io Games');

// 6. Sidebar & Header Branding
script = script.replaceAll('NexusPlay Home', 'KipoPlay Home');
script = script.replaceAll('alt="NexusPlay"', 'alt="KipoPlay"');
script = script.replaceAll('alt="NEXUSPLAY"', 'alt="KipoPlay"');
script = script.replaceAll("'NexusPlay (Click to expand)'", "'KipoPlay (Click to expand)'");
script = script.replaceAll("localStorage.setItem('nexus_sidebar_collapsed'", "localStorage.setItem(STORAGE_KEYS.sidebarCollapsed");
script = script.replaceAll("localStorage.getItem('nexus_sidebar_collapsed')", "(localStorage.getItem(STORAGE_KEYS.sidebarCollapsed) || localStorage.getItem(STORAGE_KEYS.legacySidebar))");

// 7. Footer Branding
const oldFooterBrand = `<div class="footer-brand">
            <a href="#/" class="footer-logo" aria-label="NEXUSPLAY Home">
              <img src="assets/images/logo.svg" alt="NEXUSPLAY" height="38">
            </a>
            <p>NEXUSPLAY is a premier dark gaming portal delivering 200 free, instant-play HTML5 and WebGL games across 22 curated categories. Play seamlessly inside your browser on desktop, tablet, and mobile with zero downloads or installations.</p>
            <div class="footer-experience-badge">
              <span class="pulse-dot"></span>
              <span>Instant HTML5 Play • Zero Downloads • Desktop & Mobile</span>
            </div>
          </div>`;

const newFooterBrand = `<div class="footer-brand">
            <a href="#/" class="footer-logo" aria-label="KipoPlay Home">
              <img src="assets/images/logo.svg" alt="KipoPlay" height="38">
            </a>
            <p>KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports. Enjoy seamless instant play on desktop and mobile.</p>
            <div class="footer-experience-badge">
              <span class="pulse-dot"></span>
              <span>Play More. Discover More. • Free Online Games</span>
            </div>
          </div>`;

script = script.replace(oldFooterBrand, newFooterBrand);

script = script.replace(
  '<div>&copy; 2026 NEXUSPLAY. All rights reserved. Free HTML5 Gaming Portal.</div>',
  '<div>&copy; 2026 KipoPlay. All rights reserved. Play More. Discover More.</div>'
);

// 8. Homepage SEO section & Hero
script = script.replaceAll('aria-label="About NEXUSPLAY Online Gaming"', 'aria-label="About KipoPlay Free Online Games"');
script = script.replaceAll('<h2>Play Free Online Games on NEXUSPLAY</h2>', '<h2>Play Free Online Games on KipoPlay</h2>');
script = script.replaceAll(
  '<p>NEXUSPLAY is your ultimate destination for high-performance, free browser games. We curate over 200 high-quality HTML5 and WebGL games across 22 diverse categories, delivering seamless entertainment with zero downloads, zero installs, and zero account barriers.</p>',
  '<p>KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports. Play directly in your browser with instant execution and zero downloads.</p>'
);
script = script.replaceAll('Are all games on NEXUSPLAY really free?', 'Are all games on KipoPlay really free?');
script = script.replaceAll('Can I play NEXUSPLAY games on my phone or tablet?', 'Can I play KipoPlay games on my phone or tablet?');
script = script.replaceAll('Yes! NEXUSPLAY is fully responsive.', 'Yes! KipoPlay is fully responsive.');

// Homepage SEO updateSeo call
const oldHomeSeo = `    updateSeo({
      title: 'NEXUSPLAY - Play Free Online HTML5 Games | Instant Browser Gaming',
      description: 'Play 200+ free online HTML5 games on NEXUSPLAY. Enjoy shooting, action, racing, car, puzzle, sports, and arcade games with instant play and no downloads.',
      canonical: 'https://nexusplay.example.com/',
      ogType: 'website',
      ogImage: 'assets/images/logo.svg',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "NEXUSPLAY",
        "url": "https://nexusplay.example.com/",
        "description": "Play 200+ free online HTML5 games on NEXUSPLAY with zero downloads or installs."
      }
    });`;

const newHomeSeo = `    updateSeo({
      title: 'KipoPlay – Play Free Online Games',
      description: 'Discover KipoPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.',
      canonical: 'https://kipo.in/',
      ogType: 'website',
      ogImage: 'assets/images/logo.svg',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "KipoPlay",
        "alternateName": "KipoPlay Online Games",
        "url": "https://kipo.in/",
        "description": "KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports."
      }
    });`;

script = script.replace(oldHomeSeo, newHomeSeo);

script = script.replace(
  'Instant browser gaming with dark aesthetics. No downloads, no plugins. Play shooting, racing, puzzle, and arcade games anytime.',
  'Play More. Discover More. Enjoy browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile with instant play.'
);

// 9. Informational Pages
script = script.replaceAll('About NEXUSPLAY – Play Free Online HTML5 Games', 'About KipoPlay – Play Free Online Games');
script = script.replaceAll('Discover NEXUSPLAY, the premier modern browser gaming portal', 'Discover KipoPlay, your destination for free online games');
script = script.replaceAll('https://nexusplay.example.com/#/about', 'https://kipo.in/#/about');
script = script.replaceAll('https://nexusplay.example.com/#/contact', 'https://kipo.in/#/contact');
script = script.replaceAll('https://nexusplay.example.com/#/privacy', 'https://kipo.in/#/privacy');
script = script.replaceAll('https://nexusplay.example.com/#/terms', 'https://kipo.in/#/terms');
script = script.replaceAll('https://nexusplay.example.com/#/dmca', 'https://kipo.in/#/dmca');
script = script.replaceAll('https://nexusplay.example.com/#/game/', 'https://kipo.in/#/game/');
script = script.replaceAll('https://nexusplay.example.com/', 'https://kipo.in/');

script = script.replaceAll('About <span>NEXUSPLAY</span>', 'About <span>KipoPlay</span>');
script = script.replaceAll('What is NEXUSPLAY?', 'What is KipoPlay?');
script = script.replaceAll('Reasons to Explore NEXUSPLAY', 'Reasons to Explore KipoPlay');
script = script.replaceAll('Contact NEXUSPLAY – Gaming Support & Feedback', 'Contact KipoPlay – Gaming Support & Feedback');
script = script.replaceAll('Contact the NEXUSPLAY team', 'Contact the KipoPlay team');
script = script.replaceAll('submit an HTML5 game to NEXUSPLAY?', 'submit an HTML5 game to KipoPlay?');
script = script.replaceAll('Privacy Policy – NEXUSPLAY Online Gaming', 'Privacy Policy – KipoPlay Online Gaming');
script = script.replaceAll('privacy policy for NEXUSPLAY', 'privacy policy for KipoPlay');
script = script.replaceAll('Terms of Service – NEXUSPLAY', 'Terms of Service – KipoPlay');
script = script.replaceAll('Terms of Service for NEXUSPLAY', 'Terms of Service for KipoPlay');
script = script.replaceAll('DMCA & Copyright Policy – NEXUSPLAY', 'DMCA & Copyright Policy – KipoPlay');
script = script.replaceAll('Copyright notice for NEXUSPLAY', 'Copyright notice for KipoPlay');
script = script.replaceAll('NEXUSPLAY respects the intellectual property rights', 'KipoPlay respects the intellectual property rights');
script = script.replaceAll('accessible on NEXUSPLAY', 'accessible on KipoPlay');
script = script.replaceAll('NEXUSPLAY grants you a personal', 'KipoPlay grants you a personal');
script = script.replaceAll('embedded on NEXUSPLAY', 'embedded on KipoPlay');
script = script.replaceAll('user of NEXUSPLAY', 'user of KipoPlay');
script = script.replaceAll('playing games on NEXUSPLAY', 'playing games on KipoPlay');
script = script.replaceAll('rebrand NEXUSPLAY portal', 'rebrand KipoPlay portal');
script = script.replaceAll('NEXUSPLAY reserves the right', 'KipoPlay reserves the right');
script = script.replaceAll('NEXUSPLAY is provided', 'KipoPlay is provided');
script = script.replaceAll('usage of NEXUSPLAY', 'usage of KipoPlay');
script = script.replaceAll('NEXUSPLAY is committed', 'KipoPlay is committed');
script = script.replaceAll('NEXUSPLAY is operated', 'KipoPlay is operated');
script = script.replaceAll('NEXUSPLAY utilizes your browser', 'KipoPlay utilizes your browser');
script = script.replaceAll('NEXUSPLAY portal does not set', 'KipoPlay portal does not set');
script = script.replaceAll('games on NEXUSPLAY are delivered', 'games on KipoPlay are delivered');
script = script.replaceAll('NEXUSPLAY has prepared', 'KipoPlay has prepared');
script = script.replaceAll('NEXUSPLAY delivers console-inspired', 'KipoPlay delivers console-inspired');
script = script.replaceAll('NEXUSPLAY is a dedicated', 'KipoPlay is a dedicated');
script = script.replaceAll('NEXUSPLAY is a modern', 'KipoPlay is a modern');

// 10. Global Namespace & Window Aliases
script = script.replace('window.NEXUS = {', 'window.KIPO = window.NEXUS = {');

// 11. Reports & Messages storage keys
script = script.replaceAll("localStorage.getItem('nexus_game_reports')", "(localStorage.getItem(STORAGE_KEYS.reports) || localStorage.getItem(STORAGE_KEYS.legacyReports))");
script = script.replaceAll("localStorage.setItem('nexus_game_reports', JSON.stringify(reports));", "localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));\n        localStorage.setItem(STORAGE_KEYS.legacyReports, JSON.stringify(reports));");

script = script.replaceAll("localStorage.getItem('nexus_contact_messages')", "(localStorage.getItem(STORAGE_KEYS.messages) || localStorage.getItem(STORAGE_KEYS.legacyMessages))");
script = script.replaceAll("localStorage.setItem('nexus_contact_messages', JSON.stringify(messages));", "localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));\n        localStorage.setItem(STORAGE_KEYS.legacyMessages, JSON.stringify(messages));");

script = script.replaceAll("localStorage.setItem('nexus_sort_pref', sortBy);", "localStorage.setItem(STORAGE_KEYS.sortPref, sortBy);\n        localStorage.setItem(STORAGE_KEYS.legacySort, sortBy);");

// 12. Runtime Guards & Bootstrap Log
script = script.replaceAll('[NEXUSPLAY Runtime Guard]', '[KipoPlay Runtime Guard]');
script = script.replaceAll('[NEXUSPLAY Promise Guard]', '[KipoPlay Promise Guard]');
script = script.replaceAll('[NEXUSPLAY] Initialized with', '[KipoPlay] Initialized with');

// 13. Catalog resolution
script = script.replace(
  'if (window.NEXUS_CATALOG && Array.isArray(window.NEXUS_CATALOG) && window.NEXUS_CATALOG.length > 0) {\n      catalog = window.NEXUS_CATALOG;\n    }',
  'const rawCatalog = window.KIPO_CATALOG || window.NEXUS_CATALOG;\n    if (rawCatalog && Array.isArray(rawCatalog) && rawCatalog.length > 0) {\n      catalog = rawCatalog;\n    }'
);

script = script.replace(
  'if (window.NEXUS_CATEGORIES && Array.isArray(window.NEXUS_CATEGORIES) && window.NEXUS_CATEGORIES.length > 0) {\n      categoryList = window.NEXUS_CATEGORIES;\n    }',
  'const rawCategories = window.KIPO_CATEGORIES || window.NEXUS_CATEGORIES;\n    if (rawCategories && Array.isArray(rawCategories) && rawCategories.length > 0) {\n      categoryList = rawCategories;\n    }'
);

fs.writeFileSync('scripts/build-complete-bundle.js', script, 'utf8');
console.log('scripts/build-complete-bundle.js successfully updated.');


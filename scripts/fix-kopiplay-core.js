const fs = require('fs');
const path = require('path');

console.log('=== Step 1: Upgrading scripts/build-complete-bundle.js ===');

const builderPath = path.join(__dirname, 'build-complete-bundle.js');
let code = fs.readFileSync(builderPath, 'utf8');

// 1. REWRITE renderFooter()
const sFooter = code.indexOf('function renderFooter() {');
const eFooter = code.indexOf('function initSearchEvents() {', sFooter);

if (sFooter === -1 || eFooter === -1) {
  console.error('Could not find renderFooter bounds!');
  process.exit(1);
}

const newRenderFooter = `function renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;

    footer.innerHTML = \\\`
      <div class="footer-container">
        <div class="footer-top">
          <!-- Column 1: Brand -->
          <div class="footer-brand">
            <a href="#/" class="footer-logo" aria-label="KopiPlay Home">
              <svg class="footer-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="6" y1="12" x2="10" y2="12"></line>
                <line x1="8" y1="10" x2="8" y2="14"></line>
                <line x1="15" y1="13" x2="15.01" y2="13"></line>
                <line x1="18" y1="11" x2="18.01" y2="11"></line>
                <rect x="2" y="6" width="20" height="12" rx="6"></rect>
              </svg>
              <span class="footer-logo-text">KopiPlay</span>
            </a>
            <p>KopiPlay is an online gaming platform where players can discover and enjoy free browser-based games across multiple categories. Enjoy seamless instant play on desktop, tablet, and mobile with zero downloads.</p>
            <div class="footer-experience-badge">
              <span class="pulse-dot"></span>
              <span>\\\${catalog.length} Free Games Live • Instant Play</span>
            </div>
          </div>

          <!-- Column 2: Popular Categories -->
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

          <!-- Column 3: Portal Navigation -->
          <div class="footer-col">
            <h4>Portal Navigation</h4>
            <ul class="footer-links">
              <li><a href="#/" class="footer-link">Home</a></li>
              <li><a href="#/games" class="footer-link">All Games (\\\${catalog.length})</a></li>
              <li><a href="#/popular" class="footer-link">Popular Games</a></li>
              <li><a href="#/new" class="footer-link">New Releases</a></li>
              <li><a href="#/favorites" class="footer-link">Favorites</a></li>
              <li><a href="#/recent" class="footer-link">Recently Played</a></li>
            </ul>
          </div>

          <!-- Column 4: Trust & Legal -->
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

        <div class="footer-bottom">
          <div class="footer-copyright">
            &copy; 2026 KopiPlay. All rights reserved. Play More. Discover More.
          </div>
          <div class="footer-legal-links">
            <a href="#/privacy" class="footer-bottom-link">Privacy</a>
            <a href="#/terms" class="footer-bottom-link">Terms</a>
            <a href="#/dmca" class="footer-bottom-link">DMCA</a>
            <a href="#/contact" class="footer-bottom-link">Support</a>
          </div>
        </div>
      </div>
    \\\`;
  }

  `;

code = code.slice(0, sFooter) + newRenderFooter + code.slice(eFooter);
console.log('Replaced renderFooter');


// 2. REWRITE renderCard() & renderMixedGridCard() to use anchor tags <a>
const sCard = code.indexOf('function renderCard(game) {');
const eCard = code.indexOf('function renderCategoryShowcase() {', sCard);

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
      <a href="#/game/\\\${game.slug}" class="game-card card-normal" data-slug="\\\${game.slug}" aria-label="Play \\\${escapeHtml(game.title)}">
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
      </a>
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
      <a href="#/game/\\\${game.slug}" class="game-card \\\${sizeClass}" data-slug="\\\${game.slug}" aria-label="Play \\\${escapeHtml(game.title)}">
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
      </a>
    \\\`;
  }

  `;

code = code.slice(0, sCard) + newRenderCards + code.slice(eCard);
console.log('Replaced renderCard and renderMixedGridCard with clickable anchor tags');


// 3. REWRITE renderHomepageSeoSection()
const sSeo = code.indexOf('function renderHomepageSeoSection() {');
const eSeo = code.indexOf('function renderHomepage() {', sSeo);

if (sSeo === -1 || eSeo === -1) {
  console.error('Could not find renderHomepageSeoSection bounds!');
  process.exit(1);
}

const newRenderSeo = `function renderHomepageSeoSection() {
    return \\\`
      <section class="portal-seo-section" aria-label="About KopiPlay Free Online Games">
        <h2>Play Free Online Games on KopiPlay</h2>
        <p>KopiPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting, and Sports. Play directly in your browser with instant execution, zero downloads, and smooth responsive controls.</p>

        <div class="seo-highlight-grid">
          <div class="seo-highlight-item">
            <h4>Explore Free Online Games</h4>
            <p>From quick 2-minute casual puzzles to immersive 3D racing simulators, every game runs smoothly in modern desktop and mobile web browsers.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Popular Gaming Categories</h4>
            <p>Master target acquisition in Shooting Games, solve logic challenges in Puzzle & Brain, or accelerate down neon tracks in Racing & Car games.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Discover New Browser Games</h4>
            <p>Our library of \\\${catalog.length} games is regularly curated with handpicked HTML5 creations from verified providers and original developers worldwide.</p>
          </div>
        </div>

        <h3 class="faq-section-title">Frequently Asked Questions</h3>
        <div class="faq-accordion">
          <details class="faq-item" open>
            <summary class="faq-question">Are all games on KopiPlay really free? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">Yes, 100%. Every single game in our catalog is completely free to play directly in your web browser with no hidden paywalls or subscription requirements.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Do I need to download or install any plugins? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">No downloads or installations are required. All games run natively via modern HTML5, WebGL, and JavaScript technologies in any standard browser.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Can I play KopiPlay games on my phone or tablet? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">Yes! KopiPlay is designed mobile-first. The user interface, touch controls, and responsive layouts adapt seamlessly to iPhone, iPad, Android, and tablets.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">How are my favorites and game history saved? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">Your favorites and recently played titles are saved locally in your browser storage so you can easily access them whenever you return.</div>
          </details>
        </div>
      </section>
    \\\`;
  }

  `;

code = code.slice(0, sSeo) + newRenderSeo + code.slice(eSeo);
console.log('Replaced renderHomepageSeoSection');


// 4. ADD GLOBAL CARD CLICK DELEGATION IN init()
const initPos = code.indexOf('window.addEventListener(\'hashchange\', handleRoute);');
if (initPos !== -1) {
  const delegationCode = `// Delegated Card Click Handler (Guarantees card clicks always open games)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.card-fav-btn') || e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;
      const card = e.target.closest('.game-card');
      if (card) {
        const slug = card.getAttribute('data-slug');
        if (slug) {
          window.location.hash = '#/game/' + slug;
        }
      }
    });

    `;
  if (!code.includes('Delegated Card Click Handler')) {
    code = code.slice(0, initPos) + delegationCode + code.slice(initPos);
    console.log('Added delegated card click handler in init()');
  }
}

// 5. UPDATE renderGameDetail() to include back button in breadcrumbs
const breadcrumbPos = code.indexOf('<nav class="breadcrumbs" aria-label="Breadcrumb">');
if (breadcrumbPos !== -1 && !code.includes('player-back-btn')) {
  const breadcrumbReplacement = `<nav class="breadcrumbs" aria-label="Breadcrumb">
        <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back to catalog">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Back</span>
        </button>`;
  code = code.replace('<nav class="breadcrumbs" aria-label="Breadcrumb">', breadcrumbReplacement);
  console.log('Added player-back-btn in renderGameDetail');
}

// Fix toggleFav literal escapes
code = code.replace(/window\.NEXUS\.toggleFav\(\'\\\\\$(\\\$\{game\.slug\})\'/g, "window.NEXUS.toggleFav('$1'");
code = code.replace(/window\.NEXUS\.toggleFav\(\'\\\$(\\\$\{game\.slug\})\'/g, "window.NEXUS.toggleFav('$1'");

fs.writeFileSync(builderPath, code, 'utf8');
console.log('Saved updated scripts/build-complete-bundle.js');


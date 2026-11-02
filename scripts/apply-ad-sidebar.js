const fs = require('fs');
const path = require('path');

// 1. Update css/player.css
const playerCss = `/* ==========================================================================
   KopiPlay - Game Detail & Player Styles (Matches Reference Layout)
   16:9 Cinematic Container, Fullscreen Toggle, Ad Container, Related Games Strip
   ========================================================================== */

/* Breadcrumbs & Navigation Bar */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: #A7B0C0;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.player-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: #1B2435;
  border: 1px solid #2B3548;
  color: #F8FAFC;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  margin-right: 6px;
  transition: all 0.18s ease;
}

.player-back-btn:hover {
  background: #222E44;
  border-color: #3B82F6;
  transform: translateX(-2px);
}

.player-back-btn svg {
  width: 14px;
  height: 14px;
}

.breadcrumb-link {
  color: #A7B0C0;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s ease;
}

.breadcrumb-link:hover {
  color: #F8FAFC;
}

.breadcrumb-sep {
  color: #7A869E;
  font-size: 0.8rem;
}

.breadcrumb-current {
  color: #F8FAFC;
  font-weight: 700;
}

/* Breadcrumb Favorite Toggle Button (Relocated from duplicate sidebar card) */
.player-fav-btn {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: #1B2435;
  border: 1px solid #2B3548;
  color: #F8FAFC;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.player-fav-btn:hover {
  background: #222E44;
  border-color: #FF4757;
  color: #FF4757;
  transform: translateY(-1px);
}

.player-fav-btn.is-fav {
  border-color: #FF4757;
  color: #FF4757;
  background: rgba(255, 71, 87, 0.12);
}

.player-fav-btn svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.player-fav-btn:active svg {
  transform: scale(1.2);
}

/* Two-Column Detail Layout: 1fr player on left, 340px ad container on right */
.game-detail-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  margin-bottom: 40px;
  width: 100%;
  align-items: start;
}

/* 16:9 Cinematic Player Container (Unchanged) */
.player-stage-card {
  position: relative;
  background: #0B0E14;
  border: 1.5px solid #2B3548;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
  aspect-ratio: 16 / 9;
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-stage-card iframe,
.player-stage-card .game-canvas {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Overlay Fullscreen Toggle in Top-Right Corner of Player */
.player-overlay-fullscreen-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  background: rgba(27, 36, 53, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid #2B3548;
  border-radius: 10px;
  color: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.player-overlay-fullscreen-btn:hover {
  background: #3B82F6;
  border-color: #60A5FA;
  transform: scale(1.08);
  box-shadow: 0 0 14px rgba(59, 130, 246, 0.5);
}

.player-overlay-fullscreen-btn svg {
  width: 18px;
  height: 18px;
}

/* ==========================================================================
   Professional Advertisement Container (Placement: game-detail-sidebar)
   300x250 Standard Display Slot, Dark Theme, Reserved Monetization Space
   ========================================================================== */

.game-ad-container {
  background: #1B2435;
  border: 1.5px solid #2B3548;
  border-radius: 18px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  width: 100%;
  box-sizing: border-box;
}

/* Discreet Uppercase ADVERTISEMENT Label */
.ad-disclaimer-label {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  color: #7A869E;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  user-select: none;
}

/* 300x250 Display Ad Slot Frame */
.ad-slot-frame {
  position: relative;
  border-radius: 12px;
  background: #151D2C;
  border: 1.5px dashed #2B3548;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.ad-slot-frame.ad-slot-300x250 {
  width: 300px;
  height: 250px;
  max-width: 100%;
}

/* Neutral, Unclickable Placeholder when no active ad script is loaded */
.ad-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  padding: 16px;
  user-select: none;
  cursor: default;
  pointer-events: none;
}

.ad-placeholder-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #1B2435;
  border: 1px solid #2B3548;
  color: #3B82F6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.ad-placeholder-icon svg {
  width: 22px;
  height: 22px;
}

.ad-placeholder-title {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 700;
  color: #A7B0C0;
  letter-spacing: 0.3px;
}

.ad-placeholder-size {
  font-size: 0.75rem;
  font-weight: 600;
  color: #7A869E;
  background: #1B2435;
  border: 1px solid #2B3548;
  padding: 2px 10px;
  border-radius: 9999px;
  letter-spacing: 0.4px;
}

/* Related Games Section & Strip (Matches Reference Bottom of Detail) */
.related-games-section {
  margin-top: 36px;
}

.related-games-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.related-games-header h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: #F8FAFC;
}

.related-view-all {
  color: #A855F7;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.related-view-all:hover {
  color: #C084FC;
}

.related-games-strip {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 14px;
}

.related-games-strip .game-card {
  position: relative;
  background: #1B2435;
  border: 2px solid #2B3548;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  transition: transform 0.22s ease, border-color 0.2s ease;
}

.related-games-strip .game-card:hover {
  transform: scale(1.05);
  border-color: #8B5CF6;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(139, 92, 246, 0.35);
}

.related-games-strip .card-media {
  width: 100%;
  height: 100%;
}

.related-games-strip .card-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;

fs.writeFileSync('css/player.css', playerCss, 'utf8');
console.log('Updated css/player.css');

// 2. Update css/responsive.css
const responsiveCss = `/* ==========================================================================
   KopiPlay - Responsive Breakpoint System
   Breakpoints: Mobile (375px, 390px), Tablet (768px), Desktop (1024px, 1366px+)
   ========================================================================== */

@media (max-width: 1024px) {
  .site-header {
    padding: 0 20px;
  }
  .category-showcase-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .game-detail-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .game-ad-container {
    max-width: 380px;
    margin: 0 auto;
    width: 100%;
  }
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
}

@media (max-width: 768px) {
  .site-header {
    padding: 0 16px;
  }
  .header-nav {
    display: none;
  }
  .header-search {
    display: none;
  }
  .header-action-btn .action-text {
    display: none;
  }
  .mobile-search-toggle {
    display: flex;
  }

  /* Mobile Homepage (Phone 1 Mockup in Reference): 2-Column Mixed Grid */
  .mixed-game-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }

  /* In 2-column mobile grid, large cards span both columns */
  .mixed-game-grid .game-card.card-large {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }

  .mixed-game-grid .game-card.card-wide {
    grid-column: span 2 !important;
    grid-row: span 1 !important;
  }

  .mixed-game-grid .game-card.card-tall {
    grid-column: span 1 !important;
    grid-row: span 2 !important;
  }

  /* Mobile Category Grid: 3 columns */
  .category-showcase-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .category-showcase-card {
    padding: 16px 10px;
  }

  /* Mobile Player: Stacked, Player First, Ad Slot Below, Related Games Below */
  .game-detail-layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .player-stage-card {
    min-height: 220px;
    border-radius: 14px;
    width: 100%;
  }

  .game-ad-container {
    max-width: 340px;
    margin: 0 auto;
    width: 100%;
    padding: 16px 12px;
    border-radius: 14px;
  }

  .ad-slot-frame.ad-slot-300x250 {
    width: 300px;
    height: 250px;
    max-width: 100%;
  }

  .portal-seo-section {
    padding: 24px 20px;
  }

  .seo-highlight-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .category-showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cat-card-label {
    font-size: 0.88rem;
  }
  .main-content {
    padding: 16px 14px 40px;
  }
}
`;

fs.writeFileSync('css/responsive.css', responsiveCss, 'utf8');
console.log('Updated css/responsive.css');

// 3. Update js/components/adSlot.js
const adSlotJs = `/**
 * KopiPlay - Reusable Advertisement Slot Component
 * Clean, compliant ad container for authorized ad networks (e.g. Google AdSense, GAM, Playwire)
 */

export function renderAdSlot(placementId = 'game-detail-sidebar', options = {}) {
  const size = options.size || '300x250';
  const label = options.label || 'ADVERTISEMENT';
  const is300x250 = size === '300x250';

  return \`
    <!-- Advertisement Container (\${placementId}) -->
    <aside class="game-ad-container" data-ad-placement="\${placementId}" aria-label="Advertisement">
      <div class="ad-disclaimer-label">\${label}</div>
      <div class="ad-slot-frame \${is300x250 ? 'ad-slot-300x250' : 'ad-slot-responsive'}" id="ad-unit-\${placementId}">
        <!-- ========================================================================= -->
        <!-- AUTHORIZED AD PROVIDER CODE INJECTION POINT (e.g. AdSense / GAM / Playwire) -->
        <!-- When active ad provider is configured, inject provider ad tag here.       -->
        <!-- ========================================================================= -->
        <div class="ad-placeholder-content" unselectable="on" aria-hidden="true">
          <div class="ad-placeholder-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div class="ad-placeholder-title">Advertisement Space</div>
          <div class="ad-placeholder-size">300 &times; 250 px</div>
        </div>
        <!-- END AD INJECTION POINT -->
      </div>
    </aside>
  \`;
}
`;

fs.writeFileSync('js/components/adSlot.js', adSlotJs, 'utf8');
console.log('Updated js/components/adSlot.js');

// 4. Update scripts/build-complete-bundle.js
let bundleBuilder = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// Insert renderAdSlot component if not present
const adSlotFunctionDef = `
  // --- Monetization & Reusable Ad Slot Component ---
  /**
   * Reusable Ad Slot Component
   * Renders a reserved, compliant advertisement container for authorized ad networks.
   *
   * @param {string} placementId - Unique ad slot placement identifier (e.g. 'game-detail-sidebar')
   * @param {Object} options - Configuration options { size: '300x250', label: 'ADVERTISEMENT' }
   * @returns {string} HTML markup string
   *
   * TO INTEGRATE AN AUTHORIZED AD PROVIDER (Google AdSense, Google Ad Manager, Playwire, etc.):
   * 1. Replace the inner .ad-slot-frame placeholder markup with your provider's tag:
   *    e.g. For Google AdSense:
   *      <ins class="adsbygoogle"
   *           style="display:inline-block;width:300px;height:250px"
   *           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
   *           data-ad-slot="XXXXXXXXXX"></ins>
   *      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   * 2. Or initialize via window.googletag / provider API targeting placementId.
   */
  function renderAdSlot(placementId = 'game-detail-sidebar', options = {}) {
    const size = options.size || '300x250';
    const label = options.label || 'ADVERTISEMENT';
    const is300x250 = size === '300x250';

    return \\\`
      <!-- Advertisement Container (\\\${placementId}) -->
      <aside class="game-ad-container" data-ad-placement="\\\${placementId}" aria-label="Advertisement">
        <div class="ad-disclaimer-label">\\\${label}</div>
        <div class="ad-slot-frame \\\${is300x250 ? 'ad-slot-300x250' : 'ad-slot-responsive'}" id="ad-unit-\\\${placementId}">
          <!-- ========================================================================= -->
          <!-- AUTHORIZED AD PROVIDER CODE INJECTION POINT (e.g. AdSense / GAM / Playwire) -->
          <!-- When active ad provider is configured, inject provider ad tag here.       -->
          <!-- ========================================================================= -->
          <div class="ad-placeholder-content" unselectable="on" aria-hidden="true">
            <div class="ad-placeholder-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <div class="ad-placeholder-title">Advertisement Space</div>
            <div class="ad-placeholder-size">300 &times; 250 px</div>
          </div>
          <!-- END AD INJECTION POINT -->
        </div>
      </aside>
    \\\`;
  }
`;

if (!bundleBuilder.includes('function renderAdSlot(')) {
  bundleBuilder = bundleBuilder.replace(
    '// --- PHASE 5: Individual Game SEO & Detail Player ---',
    adSlotFunctionDef + '\n  // --- PHASE 5: Individual Game SEO & Detail Player ---'
  );
  console.log('Inserted renderAdSlot into build-complete-bundle.js');
}

// Replace the breadcrumbs & game-detail-layout inside renderGameDetail
const oldDetailLayoutRegex = /<!-- Breadcrumbs -->[\s\S]*?<!-- Related Games Strip \(Matches Bottom of Reference Player Panel\) -->/;

const newDetailLayout = `<!-- Breadcrumbs & Navigation Bar -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back to catalog">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Back</span>
        </button>
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-sep">&gt;</span>
        <a href="#/category/\\\${catSlug}" class="breadcrumb-link">\\\${escapeHtml(game.category || 'Action')}</a>
        <span class="breadcrumb-sep">&gt;</span>
        <span class="breadcrumb-current">\\\${escapeHtml(game.title)}</span>

        <!-- Relocated Favorite Button (Preserves user favorites functionality) -->
        <button class="player-fav-btn \\\${isFav ? 'is-fav' : ''}" id="detailFavBtn" onclick="window.NEXUS.toggleFav('\\\\\\$\\\${game.slug}', event)" title="Favorite" aria-label="Favorite">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="\\\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span id="detailFavText">\\\${isFav ? 'Favorited' : 'Favorite'}</span>
        </button>
      </nav>

      <!-- Main Game Detail Layout: 16:9 Cinematic Player on Left, Professional Ad Container on Right -->
      <div class="game-detail-layout">
        <!-- 16:9 Cinematic Player Container (Unchanged) -->
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

        <!-- Right Advertisement Container (Replaces duplicate game info card) -->
        \\\${renderAdSlot('game-detail-sidebar')}
      </div>

      <!-- Related Games Strip (Matches Bottom of Reference Player Panel) -->`;

if (oldDetailLayoutRegex.test(bundleBuilder)) {
  bundleBuilder = bundleBuilder.replace(oldDetailLayoutRegex, newDetailLayout);
  console.log('Replaced game-detail-layout with ad container in build-complete-bundle.js');
} else {
  console.log('WARNING: oldDetailLayoutRegex did not match in build-complete-bundle.js');
}

// Update toggleFav fallback text from 'Add to Favorites' to 'Favorite'
bundleBuilder = bundleBuilder.replace(
  "txt.textContent = isFav ? 'Favorited' : 'Add to Favorites';",
  "txt.textContent = isFav ? 'Favorited' : 'Favorite';"
);

fs.writeFileSync('scripts/build-complete-bundle.js', bundleBuilder, 'utf8');
console.log('Wrote updated scripts/build-complete-bundle.js');

// 5. Build bundle.js
require('./build-complete-bundle.js');
console.log('Re-built js/bundle.js successfully');

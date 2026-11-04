const fs = require('fs');
const path = require('path');

const componentsCssPath = path.join(__dirname, '..', '..', 'css', 'components.css');
const playerCssPath = path.join(__dirname, '..', '..', 'css', 'player.css');
const bundleJsPath = path.join(__dirname, '..', '..', 'js', 'bundle.js');

let compCss = fs.readFileSync(componentsCssPath, 'utf8');
let playerCss = fs.readFileSync(playerCssPath, 'utf8');
let bundleJs = fs.readFileSync(bundleJsPath, 'utf8');

// =========================================================================
// 1. UPDATE CSS/COMPONENTS.CSS
// =========================================================================

// A. Update site-header to dark gaming glass
compCss = compCss.replace(
  /\.site-header\s*\{[\s\S]*?border-bottom: 1px solid var\(--border-subtle\);/m,
  `.site-header {
  position: sticky;
  top: 0;
  height: var(--header-height, 60px);
  background: rgba(9, 13, 28, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);`
);

// B. Global Desktop Layout (Remove poki-home-mode restriction for sidebar & main wrapper)
const layoutOldRegex = /\/\* Sidebar behavior on desktop: Fixed left 240px \*\/[\s\S]*?body\.poki-home-mode \.main-content \{[\s\S]*?\}\s*\}\s*@media \(max-width: 1023px\) \{[\s\S]*?body\.poki-home-mode \.main-content \{[\s\S]*?\}\s*\}/m;

const layoutNewCss = `/* Sidebar behavior on desktop: Fixed left 240px across the ENTIRE platform */
@media (min-width: 1024px) {
  .site-header {
    display: none !important;
  }
  .site-sidebar {
    display: flex !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    width: var(--sidebar-width, 240px) !important;
    height: 100vh !important;
    transform: none !important;
    z-index: 100 !important;
  }
  .app-main-wrapper {
    margin-left: var(--sidebar-width, 240px) !important;
    width: calc(100% - var(--sidebar-width, 240px)) !important;
    max-width: calc(100% - var(--sidebar-width, 240px)) !important;
    padding: 0 !important;
  }
  .main-content {
    padding: 16px 20px 48px !important;
    max-width: 100% !important;
    width: 100% !important;
  }
}

@media (max-width: 1023px) {
  .site-header {
    display: flex !important;
  }
  .site-sidebar {
    position: fixed !important;
    transform: translateX(-100%);
    width: 270px !important;
  }
  body.mobile-sidebar-open .site-sidebar {
    transform: translateX(0) !important;
  }
  .app-main-wrapper {
    margin-left: 0 !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  .main-content {
    padding: 12px 10px 40px !important;
  }
}`;

compCss = compCss.replace(layoutOldRegex, layoutNewCss);

// C. Dark Glass SEO Section, Footer, Legal & Inner Pages Styles
const darkInnerPagesCss = `
/* ==========================================================================
   Inner Pages, Favorites, Recent & Dark Polish System
   ========================================================================== */
.inner-page-container {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.inner-page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin: 12px 0 20px 0;
  flex-wrap: wrap;
}

.inner-header-left {
  flex: 1;
  min-width: 220px;
}

.inner-page-title {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: -0.3px;
  margin: 0 0 6px 0;
  line-height: 1.2;
}

.inner-page-subtitle {
  color: #94A3B8;
  font-size: 0.94rem;
  margin: 0;
  line-height: 1.5;
}

.inner-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.btn-clear-action {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: 9999px;
  background: rgba(244, 63, 94, 0.12);
  border: 1px solid rgba(244, 63, 94, 0.35);
  color: #FDA4AF;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
  outline: none;
}

.btn-clear-action:hover {
  background: rgba(244, 63, 94, 0.25);
  border-color: #F43F5E;
  color: #FFFFFF;
  transform: translateY(-1px);
}

/* Dark Gaming Empty State Card */
.dark-empty-state-card {
  position: relative;
  background: linear-gradient(135deg, rgba(30, 15, 55, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%);
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-radius: 20px;
  padding: 44px 24px;
  text-align: center;
  margin: 16px 0 32px 0;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
}

.empty-state-glow {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 120px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%);
  filter: blur(28px);
  pointer-events: none;
}

.empty-state-icon-wrap {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.9);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
}

.empty-state-title {
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 8px 0;
}

.empty-state-desc {
  color: #94A3B8;
  font-size: 0.92rem;
  max-width: 480px;
  margin: 0 auto 22px auto;
  line-height: 1.55;
}

.btn-gradient-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #A855F7 100%);
  color: #FFFFFF !important;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 18px rgba(124, 58, 237, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
}

.btn-gradient-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.6);
  color: #FFFFFF;
}

/* Empty State Recommendations Row */
.empty-recommendations-section {
  margin-top: 28px;
}

.recommendations-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.rec-badge {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 800;
  color: #F43F5E;
  letter-spacing: 0.8px;
  border: 1px solid rgba(244, 63, 94, 0.35);
  padding: 2px 8px;
  border-radius: 9999px;
  margin-bottom: 4px;
}

.rec-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
}

.rec-view-all {
  color: #22D3EE;
  font-weight: 700;
  font-size: 0.86rem;
  text-decoration: none;
  transition: color 0.15s ease;
}

.rec-view-all:hover {
  color: #38BDF8;
}

/* Sort Selector */
.sort-selector-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  padding: 4px 14px;
}

.sort-label {
  font-size: 0.8rem;
  color: #94A3B8;
  font-weight: 600;
}

.games-sort-select {
  background: transparent;
  border: none;
  color: #22D3EE;
  font-family: var(--font-heading);
  font-size: 0.84rem;
  font-weight: 700;
  outline: none;
  cursor: pointer;
}

.games-sort-select option {
  background: #0F172A;
  color: #FFFFFF;
}

/* Dark Theme Overrides for SEO Section, Footer, Legal & Contact */
.portal-seo-section {
  background: rgba(15, 23, 42, 0.75) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 20px !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45) !important;
  color: #CBD5E1 !important;
}

.portal-seo-section h2,
.faq-section-title {
  color: #FFFFFF !important;
}

.portal-seo-section p {
  color: #94A3B8 !important;
}

.seo-highlight-item {
  background: rgba(7, 10, 20, 0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 12px !important;
}

.seo-highlight-item h4 {
  color: #22D3EE !important;
}

.seo-highlight-item p {
  color: #CBD5E1 !important;
}

.faq-item {
  background: rgba(7, 10, 20, 0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 10px !important;
}

.faq-question {
  color: #F1F5F9 !important;
}

.faq-answer {
  color: #94A3B8 !important;
}

/* Dark Footer */
.site-footer {
  background: #050811 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  color: #94A3B8 !important;
}

.footer-logo-text {
  color: #FFFFFF !important;
}

.footer-top {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.footer-col h4 {
  color: #FFFFFF !important;
}

.footer-link {
  color: #94A3B8 !important;
}

.footer-link:hover {
  color: #22D3EE !important;
}

.footer-bottom {
  color: #64748B !important;
}

/* Dark Legal & Contact Pages */
.legal-page-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.legal-header-card,
.legal-card,
.contact-form-card {
  background: rgba(15, 23, 42, 0.75) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4) !important;
  color: #CBD5E1 !important;
  border-radius: 20px !important;
}

.legal-title {
  color: #FFFFFF !important;
}

.legal-subtitle {
  color: #94A3B8 !important;
}

.legal-card h3 {
  color: #22D3EE !important;
}

.legal-card p,
.legal-card ul {
  color: #94A3B8 !important;
}

.legal-header-badge {
  background: rgba(124, 58, 237, 0.25) !important;
  color: #C084FC !important;
  border: 1px solid rgba(168, 85, 247, 0.4) !important;
}

.contact-form-label {
  color: #E2E8F0 !important;
}

.contact-input,
.contact-textarea {
  background: rgba(7, 10, 20, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #FFFFFF !important;
}

.contact-input:focus,
.contact-textarea:focus {
  background: rgba(15, 23, 42, 0.95) !important;
  border-color: #7C3AED !important;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.25) !important;
}
`;

compCss += '\n' + darkInnerPagesCss;
fs.writeFileSync(componentsCssPath, compCss, 'utf8');
console.log('Updated css/components.css successfully!');

// =========================================================================
// 2. UPDATE CSS/PLAYER.CSS FOR DARK GAMING THEME
// =========================================================================
const playerDarkCss = `
/* Dark Gaming Theme Overrides for Game Player Page */
.player-back-btn {
  background: rgba(15, 23, 42, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #FFFFFF !important;
}
.player-back-btn:hover {
  background: rgba(124, 58, 237, 0.25) !important;
  border-color: #A855F7 !important;
  color: #C084FC !important;
}
.player-fav-btn {
  background: rgba(15, 23, 42, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #CBD5E1 !important;
}
.player-fav-btn:hover,
.player-fav-btn.is-fav {
  background: rgba(244, 63, 94, 0.2) !important;
  border-color: #F43F5E !important;
  color: #FB7185 !important;
}
.player-share-btn {
  background: rgba(15, 23, 42, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #FFFFFF !important;
}
.player-share-btn:hover {
  background: rgba(6, 182, 212, 0.2) !important;
  border-color: #22D3EE !important;
  color: #38BDF8 !important;
}
.player-stage-card {
  background: #0B0F1C !important;
  border: 1.5px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.6) !important;
}
.player-overlay-fullscreen-btn {
  background: rgba(15, 23, 42, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  color: #FFFFFF !important;
}
.player-overlay-fullscreen-btn:hover {
  background: #7C3AED !important;
  border-color: #A855F7 !important;
  box-shadow: 0 0 16px rgba(124, 58, 237, 0.5) !important;
}
.game-details-meta-card {
  background: rgba(15, 23, 42, 0.75) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45) !important;
  color: #CBD5E1 !important;
}
.game-details-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}
.game-details-title {
  color: #FFFFFF !important;
}
.game-tag-badge {
  background: rgba(124, 58, 237, 0.2) !important;
  color: #C084FC !important;
  border: 1px solid rgba(168, 85, 247, 0.4) !important;
}
.game-tag-rating {
  background: rgba(245, 158, 11, 0.2) !important;
  color: #FBBF24 !important;
  border: 1px solid rgba(251, 191, 36, 0.4) !important;
}
.game-tag-plays {
  background: rgba(255, 255, 255, 0.06) !important;
  color: #94A3B8 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.game-details-desc h4,
.game-details-controls h4 {
  color: #FFFFFF !important;
  margin-bottom: 8px !important;
  font-weight: 700 !important;
}
.game-details-desc p {
  color: #94A3B8 !important;
  line-height: 1.6 !important;
}
.keycap {
  background: rgba(15, 23, 42, 0.9) !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  border-bottom: 2.5px solid rgba(124, 58, 237, 0.7) !important;
  color: #22D3EE !important;
}
.related-games-header h3 {
  color: #FFFFFF !important;
}
.related-view-all {
  color: #22D3EE !important;
}
`;

playerCss += '\n' + playerDarkCss;
fs.writeFileSync(playerCssPath, playerCss, 'utf8');
console.log('Updated css/player.css successfully!');

// =========================================================================
// 3. UPDATE JS/BUNDLE.JS
// =========================================================================

// A. Fix popular and new filter criteria in filterCategory and renderHomepage
bundleJs = bundleJs.replace(
  /displayGames\.filter\(g => \(g\.plays && g\.plays > 10000\) \|\| \(g\.rating && g\.rating >= 4\.7\)\)/g,
  `displayGames.filter(g => g.popular === true || g.featured === true || g.badge === 'HOT' || g.badge === 'POPULAR' || g.badge === 'TOP')`
);

bundleJs = bundleJs.replace(
  /displayGames\.filter\(g => g\.isNew \|\| \(g\.dateAdded && g\.dateAdded >= '2024-03-01'\)\)/g,
  `displayGames.filter(g => g.badge === 'NEW' || (g.releaseDate && g.releaseDate >= '2026-06-01'))`
);

bundleJs = bundleJs.replace(
  /filtered\.filter\(g => \(g\.plays && g\.plays > 10000\) \|\| \(g\.rating && g\.rating >= 4\.7\)\)/g,
  `filtered.filter(g => g.popular === true || g.featured === true || g.badge === 'HOT' || g.badge === 'POPULAR' || g.badge === 'TOP')`
);

bundleJs = bundleJs.replace(
  /filtered\.filter\(g => g\.isNew \|\| \(g\.dateAdded && g\.dateAdded >= '2024-03-01'\)\)/g,
  `filtered.filter(g => g.badge === 'NEW' || (g.releaseDate && g.releaseDate >= '2026-06-01'))`
);

// B. Define renderFavoritesView, renderRecentView, renderAllGamesView before renderGameDetail
const viewsReplacement = `  // --- FAVORITES PAGE VIEW ---
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
      contentHtml = \`
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
            <span class="kopi-filter-count">\${favGames.length} \${favGames.length === 1 ? 'Game' : 'Games'}</span>
          </div>
        </div>

        <div class="games-grid poki-grid" id="favoritesGrid">
          \${favGames.map((g, idx) => renderCard(g, idx)).join('')}
        </div>
      \`;
    } else {
      contentHtml = \`
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
            <span>Explore All \${catalog.length}+ Games</span>
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
            \${recommendedGames.map((g, idx) => renderCard(g, idx)).join('')}
          </div>
        </div>
      \`;
    }

    main.innerHTML = \`
      <div class="inner-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Favorites (\${favorites.length})</span>
        </nav>

        \${contentHtml}
      </div>
    \`;

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
      contentHtml = \`
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
            <span class="kopi-filter-count">\${recentGames.length} \${recentGames.length === 1 ? 'Game' : 'Games'}</span>
          </div>
        </div>

        <div class="games-grid poki-grid" id="recentGrid">
          \${recentGames.map((g, idx) => renderCard(g, idx)).join('')}
        </div>
      \`;
    } else {
      contentHtml = \`
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
            <a href="#/games" class="rec-view-all">Browse All \${catalog.length}+ Games &rarr;</a>
          </div>
          <div class="games-grid poki-grid">
            \${recommendedGames.map((g, idx) => renderCard(g, idx)).join('')}
          </div>
        </div>
      \`;
    }

    main.innerHTML = \`
      <div class="inner-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="window.NEXUS.goBack()" aria-label="Back" type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Recently Played (\${recentlyPlayed.length})</span>
        </nav>

        \${contentHtml}
      </div>
    \`;

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

    main.innerHTML = \`
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
                    class="category-filter-btn poki-cat-pill \${(!activeCatSlug || activeCatSlug === 'all') ? 'active' : ''}"
                    data-slug="all"
                    onclick="window.NEXUS.filterCategory('all')">
              \${getCategoryIcon('all')}
              <span>All Games</span>
              <span class="category-btn-count">\${catalog.length}</span>
            </button>
            \${categoryList.map(c => {
              const count = categoryCounts[c.slug] || 0;
              if (count === 0) return '';
              const isActive = activeCatSlug === c.slug;
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

        <div class="inner-page-header">
          <div class="inner-header-left">
            <h1 class="inner-page-title">\${escapeHtml(title)}</h1>
            <p class="inner-page-subtitle">Explore \${displayGames.length} free browser games. Instant play with zero downloads.</p>
          </div>
          <div class="inner-header-actions">
            <div class="sort-selector-wrap">
              <label for="gamesSortSelect" class="sort-label">Sort by:</label>
              <select id="gamesSortSelect" class="games-sort-select" onchange="window.NEXUS.sortView(this.value)">
                <option value="featured" \${currentSort === 'featured' ? 'selected' : ''}>Featured</option>
                <option value="newest" \${currentSort === 'newest' ? 'selected' : ''}>Newest</option>
                <option value="az" \${currentSort === 'az' ? 'selected' : ''}>Name A-Z</option>
                <option value="za" \${currentSort === 'za' ? 'selected' : ''}>Name Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <div class="games-grid poki-grid" id="mainGamesGrid">
          \${displayGames.map((g, idx) => renderCard(g, idx)).join('')}
        </div>
      </div>
    \`;

    initCategoryNavigation();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
`;

bundleJs = bundleJs.replace(
  /function renderAllGamesView[\s\S]*?function renderGameDetail/m,
  viewsReplacement + '\n  function renderGameDetail'
);

// C. Update handleRoute so that poki-home-mode is NEVER removed (dark gaming portal everywhere)
const oldHandleRouteRegex = /function handleRoute\(\) \{[\s\S]*?\n  \}/m;

const newHandleRoute = `function handleRoute() {
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
  }`;

bundleJs = bundleJs.replace(oldHandleRouteRegex, newHandleRoute);

// D. Add clearAllFavorites and clearPlayHistory to window.NEXUS
const nexusMethods = `    clearAllFavorites: function () {
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
    },`;

bundleJs = bundleJs.replace(
  /window\.NEXUS = \{[\s\n]*ads: kopiAds,/m,
  `window.NEXUS = {\n    ads: kopiAds,\n${nexusMethods}`
);

// E. Ensure toggleFav updates favorites view if currently on #/favorites
bundleJs = bundleJs.replace(
  /showToast\('Added to Favorites', '❤️'\);[\s\S]*?\} else \{/m,
  `showToast('Added to Favorites', '❤️');
      } else {
        favorites = favorites.filter(s => s !== slug);
        isFav = false;
        showToast('Removed from Favorites', '💔');
        if ((window.location.hash || '').startsWith('#/favorites')) {
          renderFavoritesView();
        }
      }`
);

fs.writeFileSync(bundleJsPath, bundleJs, 'utf8');
console.log('Updated js/bundle.js successfully!');


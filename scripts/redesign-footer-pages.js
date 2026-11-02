const fs = require('fs');
const path = require('path');

console.log('--- Redesigning KopiPlay Footer & All Footer-Linked Pages ---');

// ==========================================================================
// 1. UPDATE css/components.css
// ==========================================================================
let componentsCss = fs.readFileSync('css/components.css', 'utf8');

const splitMarker = '/* --------------------------------------------------------------------------\n   10. Static Legal & Trust Pages';
const altSplitMarker = '/* --------------------------------------------------------------------------\r\n   10. Static Legal & Trust Pages';

let baseCss = componentsCss;
if (componentsCss.includes(splitMarker)) {
  baseCss = componentsCss.split(splitMarker)[0];
} else if (componentsCss.includes(altSplitMarker)) {
  baseCss = componentsCss.split(altSplitMarker)[0];
}

const newFooterAndLegalCss = `/* --------------------------------------------------------------------------
   10. Redesigned Legal & Trust Pages (About, Contact, Privacy, Terms, DMCA)
   Cards: #151D2E, Border: #293449, Accents: #8B5CF6 & #3B82F6
   -------------------------------------------------------------------------- */

.legal-page-wrapper {
  max-width: 980px;
  margin: 0 auto 60px;
  width: 100%;
  box-sizing: border-box;
}

.legal-page-header {
  margin-bottom: 28px;
}

.legal-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 9999px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.35);
  color: #A855F7;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.legal-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  color: #F8FAFC;
  line-height: 1.2;
  margin: 0 0 10px 0;
}

.gradient-text {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.legal-lead {
  color: #A7B0C0;
  font-size: 1rem;
  line-height: 1.65;
  margin: 0;
  max-width: 820px;
}

/* Legal Card Component */
.legal-card {
  background: #151D2E;
  border: 1.5px solid #293449;
  border-radius: 18px;
  padding: 32px 36px;
  margin-bottom: 24px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
}

.legal-card h2 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.legal-card h3 {
  font-family: var(--font-heading);
  font-size: 1.08rem;
  font-weight: 700;
  color: #F8FAFC;
  margin: 22px 0 10px 0;
}

.legal-card p {
  color: #A7B0C0;
  font-size: 0.92rem;
  line-height: 1.7;
  margin: 0 0 16px 0;
}

.legal-card p:last-child {
  margin-bottom: 0;
}

.legal-card ul, .legal-card ol {
  color: #A7B0C0;
  font-size: 0.92rem;
  line-height: 1.7;
  padding-left: 22px;
  margin: 0 0 16px 0;
}

.legal-card li {
  margin-bottom: 8px;
}

.legal-card code {
  background: #0B1020;
  border: 1px solid #293449;
  color: #A855F7;
  padding: 2px 7px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
}

/* Notice & Warning Box for Operators/Users */
.legal-notice-box {
  background: rgba(59, 130, 246, 0.08);
  border: 1.5px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 16px 20px;
  margin: 20px 0;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.legal-notice-box.notice-warning {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.3);
}

.legal-notice-box.notice-purple {
  background: rgba(139, 92, 246, 0.08);
  border-color: rgba(139, 92, 246, 0.3);
}

.legal-notice-icon {
  flex-shrink: 0;
  color: #3B82F6;
  margin-top: 2px;
}

.notice-warning .legal-notice-icon {
  color: #F59E0B;
}

.notice-purple .legal-notice-icon {
  color: #8B5CF6;
}

.legal-notice-content {
  font-size: 0.88rem;
  line-height: 1.6;
  color: #E2E8F0;
}

.legal-notice-content strong {
  color: #F8FAFC;
}

/* Quick Jump Pills / Table of Contents */
.legal-toc-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding: 14px 18px;
  background: #151D2E;
  border: 1.5px solid #293449;
  border-radius: 14px;
}

.legal-toc-title {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  color: #7A869E;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-right: 6px;
}

.legal-toc-pill {
  font-size: 0.8rem;
  font-weight: 600;
  color: #A7B0C0;
  background: #0B1020;
  border: 1px solid #293449;
  padding: 4px 12px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.18s ease;
}

.legal-toc-pill:hover {
  border-color: #8B5CF6;
  color: #F8FAFC;
  transform: translateY(-1px);
}

/* Feature Grid (for About Page) */
.about-feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin: 24px 0;
}

.about-feature-card {
  background: #0B1020;
  border: 1.5px solid #293449;
  border-radius: 14px;
  padding: 22px 20px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.about-feature-card:hover {
  border-color: #8B5CF6;
  transform: translateY(-2px);
}

.about-feature-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #151D2E;
  border: 1px solid #293449;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.about-feature-card h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0 0 8px 0;
}

.about-feature-card p {
  font-size: 0.88rem;
  color: #A7B0C0;
  line-height: 1.6;
  margin: 0;
}

/* CTA Banner (for About Page) */
.about-cta-banner {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%);
  border: 1.5px solid rgba(139, 92, 246, 0.35);
  border-radius: 18px;
  padding: 32px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.about-cta-content h3 {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0 0 6px 0;
}

.about-cta-content p {
  color: #A7B0C0;
  font-size: 0.92rem;
  margin: 0;
}

.about-cta-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Support Grid (for Contact Page) */
.contact-support-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.contact-support-card {
  background: #151D2E;
  border: 1.5px solid #293449;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  transition: border-color 0.2s ease;
}

.contact-support-card:hover {
  border-color: #3B82F6;
}

.contact-support-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #0B1020;
  border: 1px solid #293449;
  color: #3B82F6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-support-info h4 {
  font-family: var(--font-heading);
  font-size: 0.98rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 0 0 4px 0;
}

.contact-support-info p {
  font-size: 0.85rem;
  color: #A7B0C0;
  line-height: 1.55;
  margin: 0;
}

/* Contact Form Styles */
.contact-form-layout {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-label {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  color: #F8FAFC;
  letter-spacing: 0.2px;
}

.form-control {
  background: #0B1020;
  border: 1.5px solid #293449;
  border-radius: 10px;
  padding: 12px 14px;
  color: #F8FAFC;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  outline: none;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #8B5CF6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

.form-control::placeholder {
  color: #5A667E;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit-contact {
  background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 800;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
}

.btn-submit-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
}

/* --------------------------------------------------------------------------
   11. Redesigned Premium Gaming Footer
   Dark Navy #0B1020, Accents #8B5CF6 & #3B82F6, Border #293449
   -------------------------------------------------------------------------- */

.site-footer {
  background: #0B1020;
  border-top: 1.5px solid #293449;
  padding: 56px 28px 28px;
  margin-top: 64px;
  width: 100%;
  box-sizing: border-box;
}

.footer-container {
  max-width: 1320px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.1fr 1.1fr;
  gap: 40px;
  margin-bottom: 40px;
  width: 100%;
  box-sizing: border-box;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  width: fit-content;
}

.footer-logo-icon {
  width: 28px;
  height: 28px;
  color: #8B5CF6;
  transition: transform 0.2s ease;
}

.footer-logo:hover .footer-logo-icon {
  transform: scale(1.08);
}

.footer-logo-text {
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 900;
  color: #F8FAFC;
  letter-spacing: -0.5px;
}

.footer-brand p {
  color: #A7B0C0;
  font-size: 0.88rem;
  line-height: 1.65;
  max-width: 360px;
  margin: 0;
}

.footer-brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: #151D2E;
  border: 1px solid #293449;
  color: #F8FAFC;
  font-size: 0.78rem;
  font-weight: 700;
  width: fit-content;
}

.footer-brand-badge .pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
}

.footer-col {
  display: flex;
  flex-direction: column;
}

.footer-col h4 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 800;
  color: #F8FAFC;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin: 0 0 18px 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.footer-link {
  color: #A7B0C0;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
}

.footer-link:hover {
  color: #8B5CF6;
  transform: translateX(3px);
}

.footer-bottom {
  border-top: 1px solid #293449;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #7A869E;
  font-size: 0.82rem;
  flex-wrap: wrap;
  gap: 14px;
}

.footer-copyright {
  color: #7A869E;
  font-size: 0.82rem;
}

.footer-legal-links {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-bottom-link {
  color: #7A869E;
  text-decoration: none;
  transition: color 0.18s ease;
}

.footer-bottom-link:hover {
  color: #F8FAFC;
}

.footer-bottom-sep {
  color: #43526E;
  font-size: 0.75rem;
}
`;

fs.writeFileSync('css/components.css', baseCss.trim() + '\n\n' + newFooterAndLegalCss, 'utf8');
console.log('Successfully updated css/components.css');

// ==========================================================================
// 2. UPDATE css/responsive.css
// ==========================================================================
const updatedResponsiveCss = `/* ==========================================================================
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
    gap: 32px;
  }
  .about-cta-banner {
    flex-direction: column;
    align-items: flex-start;
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

  /* Legal & Information Pages Mobile Adjustments */
  .legal-page-wrapper {
    margin-bottom: 40px;
  }
  .legal-card {
    padding: 22px 18px;
    border-radius: 14px;
  }
  .legal-title {
    font-size: 1.65rem;
  }
  .about-feature-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .about-cta-banner {
    padding: 22px 18px;
    border-radius: 14px;
  }
  .contact-support-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .form-row {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  /* Mobile Footer: Clean Single Column Stack with no overflow */
  .site-footer {
    padding: 40px 18px 24px;
    margin-top: 48px;
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

fs.writeFileSync('css/responsive.css', updatedResponsiveCss, 'utf8');
console.log('Successfully updated css/responsive.css');

// ==========================================================================
// 3. UPDATE scripts/build-complete-bundle.js
// ==========================================================================
let builder = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// Replace renderFooter
const newFooterCode = `  function renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;

    footer.innerHTML = \\\`
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
              <span class="footer-logo-text">KopiPlay</span>
            </a>
            <p>KopiPlay is an online gaming portal where players discover and enjoy free, high-performance browser-based games. Instant play on desktop, tablet, and mobile with zero downloads.</p>
            <div class="footer-brand-badge">
              <span class="pulse-dot"></span>
              <span>\\\${catalog.length} Free Games &bull; Instant Play</span>
            </div>
          </div>

          <!-- Column 2: Explore Games -->
          <div class="footer-col">
            <h4>Explore Games</h4>
            <ul class="footer-links">
              <li><a href="#/games" class="footer-link">All Games (\\\${catalog.length})</a></li>
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
              <li><a href="#/terms" class="footer-link">Terms of Service</a></li>
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
            <a href="#/terms" class="footer-bottom-link">Terms of Service</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/dmca" class="footer-bottom-link">DMCA</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/contact" class="footer-bottom-link">Contact</a>
          </div>
        </div>
      </div>
    \\\`;
  }`;

// Replace renderFooter using regex
builder = builder.replace(/function renderFooter\(\) \{[\s\S]*?function initSearchEvents/, newFooterCode + '\n\n  function initSearchEvents');

// Replace all 5 views (About, Contact, Privacy, Terms, DMCA)
const newViewsCode = `  // --- PHASE 2: Redesigned Five Informational & Legal Pages ---

  // 1. ABOUT US VIEW
  function renderAboutView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'About KopiPlay - Free Online Gaming Platform',
      description: 'Discover KopiPlay, your home for verified HTML5 browser games. Instant play on PC, tablet, and mobile with zero downloads.',
      canonical: 'https://kipo.in/#/about',
      ogType: 'website'
    });

    main.innerHTML = \\\`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">About Us</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">About KopiPlay</div>
          <h1 class="legal-title">Play Instantly. <span class="gradient-text">Discover More.</span></h1>
          <p class="legal-lead">
            KopiPlay is an independent online gaming portal built to deliver verified, high-performance browser games directly to your screen—no software downloads, no paywalls, and zero friction.
          </p>
        </header>

        <!-- Feature Grid (4 Visual Highlights) -->
        <div class="about-feature-grid">
          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #8B5CF6;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h4>Instant Execution</h4>
            <p>Built purely on HTML5 Canvas, WebGL, and Web Audio web standards. Games load in seconds in your browser tab without native client installs.</p>
          </div>

          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #3B82F6;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h4>Privacy First</h4>
            <p>Zero mandatory accounts or intrusive tracking. Your favorite titles and gameplay history are stored safely in your own browser's local storage.</p>
          </div>

          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #10B981;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6"/><circle cx="8" cy="12" r="2"/><line x1="14" y1="12" x2="18" y2="12"/><line x1="16" y1="10" x2="16" y2="14"/></svg>
            </div>
            <h4>Handpicked Library</h4>
            <p>A catalog of \\\${catalog.length} verified titles across 22 categories, from high-speed 3D racers and tactical shooters to relaxing puzzles.</p>
          </div>

          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #F59E0B;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </div>
            <h4>Cross-Device Freedom</h4>
            <p>Responsive dark gaming interface engineered to run smoothly across high-end desktop rigs, laptops, Chromebooks, iPads, and smartphones.</p>
          </div>
        </div>

        <!-- Story & Purpose Card -->
        <div class="legal-card">
          <h2>The KopiPlay Experience</h2>
          <p>
            We believe digital entertainment should be straightforward and enjoyable. Too many gaming sites burden players with mandatory user registrations, excessive loading screens, and heavy background downloads. KopiPlay strips away those barriers by curating legitimate HTML5 titles from verified game studios worldwide and presenting them in a fast, organized, dark-themed portal.
          </p>
          <p>
            Whether you have two minutes for a quick casual puzzle on your mobile commute or an hour for a 3D driving simulator on your PC, KopiPlay delivers instant fun directly inside any modern web browser.
          </p>
        </div>

        <!-- Call to Action Banner -->
        <div class="about-cta-banner">
          <div class="about-cta-content">
            <h3>Ready to Jump Into the Action?</h3>
            <p>Explore all \\\${catalog.length} free games with zero downloads or account requirements.</p>
          </div>
          <div class="about-cta-actions">
            <a href="#/games" class="btn btn-primary">Browse All Games</a>
            <a href="#/contact" class="btn btn-secondary">Contact Our Team</a>
          </div>
        </div>
      </div>
    \\\`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 2. CONTACT & SUPPORT VIEW
  function renderContactView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Contact & Support - KopiPlay Gaming Portal',
      description: 'Contact KopiPlay support for assistance with games, bug reports, publisher inquiries, or general feedback.',
      canonical: 'https://kipo.in/#/contact',
      ogType: 'website'
    });

    main.innerHTML = \\\`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Contact & Support</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">Help & Enquiries</div>
          <h1 class="legal-title">Contact & <span class="gradient-text">Support</span></h1>
          <p class="legal-lead">
            Have questions about a game, experienced a technical glitch, or have an HTML5 game you would like to showcase? Reach out to us below.
          </p>
        </header>

        <!-- 4 Quick Support Channels -->
        <div class="contact-support-grid">
          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>General Inquiries</h4>
              <p>Platform questions, portal suggestions, or general gameplay feedback.</p>
            </div>
          </div>

          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>Technical Glitches</h4>
              <p>Black screens, audio issues, or games that fail to load in your browser.</p>
            </div>
          </div>

          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>Game Submissions</h4>
              <p>Are you an HTML5 developer? Submit your playable web game to our catalog.</p>
            </div>
          </div>

          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>DMCA & Copyright</h4>
              <p>Submit formal copyright notifications and intellectual property inquiries.</p>
            </div>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="legal-card">
          <h2>Send Us a Message</h2>
          <p>Fill out the fields below and we will log your inquiry directly into the portal records.</p>

          <form id="contactForm" class="contact-form-layout" onsubmit="window.NEXUS.submitContact(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="contactName">Your Name *</label>
                <input type="text" class="form-control" id="contactName" required placeholder="Alex Mercer" autocomplete="name">
              </div>

              <div class="form-group">
                <label class="form-label" for="contactEmail">Email Address *</label>
                <input type="email" class="form-control" id="contactEmail" required placeholder="alex@example.com" autocomplete="email">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="contactTopic">Inquiry Topic</label>
              <select class="form-control" id="contactTopic" style="cursor: pointer;">
                <option value="general">General Inquiry & Feedback</option>
                <option value="bug-report">Report a Broken Game or Glitch</option>
                <option value="submit-game">Submit an HTML5 Game Creation</option>
                <option value="licensing">Business & Monetization Inquiries</option>
                <option value="copyright">Copyright / DMCA Notice</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="contactMessage">Message Details *</label>
              <textarea class="form-control form-textarea" id="contactMessage" rows="5" required placeholder="Describe your inquiry, game feedback, or technical issue..."></textarea>
            </div>

            <button type="submit" class="btn-submit-contact">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              <span>Send Message</span>
            </button>
          </form>

          <!-- Form Architecture Notice for Website Operator -->
          <div class="legal-notice-box notice-purple" style="margin-top: 24px;">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Technical Implementation Notice:</strong> This client-side form currently stores submitted inquiries in your browser's local storage (<code>kopiplay_messages</code>). To route inquiries to a live email inbox or ticketing system upon domain handover, configure a form endpoint (e.g. Formspree, EmailJS, or an API backend).
            </div>
          </div>
        </div>
      </div>
    \\\`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 3. PRIVACY POLICY VIEW
  function renderPrivacyView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Privacy Policy - KopiPlay Online Gaming',
      description: 'Accurate and transparent privacy policy for KopiPlay detailing client-side storage, cookie usage, third-party embeds, and data protection practices.',
      canonical: 'https://kipo.in/#/privacy',
      ogType: 'website'
    });

    main.innerHTML = \\\`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Privacy Policy</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">Legal & Compliance</div>
          <h1 class="legal-title">Privacy <span class="gradient-text">Policy</span></h1>
          <p class="legal-lead">Effective Date: October 2026 &bull; Last updated: October 2026</p>
        </header>

        <!-- Quick Navigation Bar -->
        <div class="legal-toc-bar">
          <span class="legal-toc-title">Jump to:</span>
          <a href="#/privacy#sec-collection" class="legal-toc-pill">1. Data Collection</a>
          <a href="#/privacy#sec-storage" class="legal-toc-pill">2. Local Storage</a>
          <a href="#/privacy#sec-cookies" class="legal-toc-pill">3. Cookies</a>
          <a href="#/privacy#sec-embeds" class="legal-toc-pill">4. Third-Party Embeds</a>
          <a href="#/privacy#sec-ads" class="legal-toc-pill">5. Advertising</a>
          <a href="#/privacy#sec-rights" class="legal-toc-pill">6. Your Rights</a>
        </div>

        <div class="legal-card" id="sec-collection">
          <h2>1. Information We Collect</h2>
          <p>
            KopiPlay operates as a client-side static web gaming portal. We do not require users to create personal accounts, register with an email address, or provide identity verification to play games. We collect zero personally identifiable information (PII) during your standard gaming sessions.
          </p>

          <h2 id="sec-storage">2. Browser Local Storage</h2>
          <p>
            To deliver an enjoyable, personalized gaming experience without maintaining server-side user databases, KopiPlay utilizes your browser's client-side <code>localStorage</code> API. The following keys are stored exclusively on your own device:
          </p>
          <ul>
            <li><code>kopiplay_favorites</code>: An array of game identifiers you have favorited.</li>
            <li><code>kopiplay_recent</code>: An array of game identifiers you have launched recently.</li>
            <li><code>kopiplay_sort_pref</code>: Your chosen sort ordering in the game library (e.g. Featured, Rating, Newest).</li>
            <li><code>kopiplay_messages</code>: Inquiries you submit through the contact form, stored locally for demonstration.</li>
          </ul>
          <p>You can clear this data at any time by clearing your browser cache and local storage.</p>

          <h2 id="sec-cookies">3. Cookies & Tracking Technologies</h2>
          <p>
            The core KopiPlay portal does not set proprietary tracking cookies. Temporary session identifiers may be created by your browser to maintain active tab states.
          </p>

          <h2 id="sec-embeds">4. Third-Party Embedded Games & CDNs</h2>
          <p>
            Games on KopiPlay are delivered via authorized embedding mechanisms from legitimate third-party game distribution networks (such as HTMLGames, GameDistribution, and GameMonetize). When you load an external game iframe, the provider's servers may process standard HTTP request headers (including IP address and browser user-agent) solely to transmit the game files. These third-party services operate under their own independent privacy policies.
          </p>

          <h2 id="sec-ads">5. Future Advertising & Monetization</h2>
          <p>
            KopiPlay includes reserved advertisement containers (such as the 300 &times; 250 px sidebar on game detail pages) for future integration with authorized ad networks such as Google AdSense. <strong>Please note:</strong> Live third-party ad network scripts are not currently active. When an ad provider is configured, advertising will comply with applicable privacy regulations (including GDPR, CCPA, and COPPA frameworks).
          </p>

          <h2 id="sec-rights">6. Your Data Rights & Contact</h2>
          <p>
            Because we do not maintain personal user accounts or server databases, you have full direct control over your data directly within your web browser. If you have questions about our privacy practices, contact us via the <a href="#/contact" style="color:#8B5CF6; font-weight:600;">Contact Form</a>.
          </p>

          <!-- Operator Review Box -->
          <div class="legal-notice-box notice-warning">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Website Owner Review Required:</strong> Prior to publishing under a production domain, review this privacy policy with your legal counsel and insert your registered business entity name, legal jurisdiction, and cookie consent management setup.
            </div>
          </div>
        </div>
      </div>
    \\\`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 4. TERMS OF SERVICE VIEW
  function renderTermsView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Terms of Service - KopiPlay',
      description: 'Official Terms of Service for KopiPlay covering website usage, third-party games, intellectual property, user responsibilities, and service conditions.',
      canonical: 'https://kipo.in/#/terms',
      ogType: 'website'
    });

    main.innerHTML = \\\`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Terms of Service</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">User Agreement</div>
          <h1 class="legal-title">Terms of <span class="gradient-text">Service</span></h1>
          <p class="legal-lead">Effective Date: October 2026 &bull; Governs your access to KopiPlay</p>
        </header>

        <div class="legal-card">
          <h2>1. Agreement to Terms</h2>
          <p>
            By visiting, accessing, or playing games on KopiPlay ("the Website"), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please discontinue using the portal.
          </p>

          <h2>2. Permitted Website Usage & Entertainment License</h2>
          <p>
            KopiPlay grants you a personal, non-exclusive, non-transferable, revocable license to access and play HTML5 games through our portal interface strictly for personal, non-commercial entertainment.
          </p>

          <h2>3. Third-Party Game Ownership & Attribution</h2>
          <p>
            Games hosted or embedded on KopiPlay remain the intellectual property of their respective creators, developers, or authorized distribution networks. KopiPlay embeds games in accordance with permitted distribution terms, preserving all original developer credits, branding, and links.
          </p>

          <h2>4. User Responsibilities & Prohibited Conduct</h2>
          <p>As a user of KopiPlay, you agree not to:</p>
          <ul>
            <li>Circumvent, disable, or tamper with security measures or iframe sandbox restrictions on the portal.</li>
            <li>Use automated scrapers, bots, or data-mining scripts to extract content without authorization.</li>
            <li>Transmit malicious code, viruses, or disruptive scripts through forms or feedback mechanisms.</li>
            <li>Attempt to reverse-engineer or redistribute the KopiPlay portal software without permission.</li>
          </ul>

          <h2>5. Game Availability & Catalog Management</h2>
          <p>
            We strive to keep games playable around the clock. However, third-party developers and distribution partners may update, modify, or withdraw titles at their discretion. KopiPlay reserves the right to modify, replace, or discontinue games or portal features without prior notice for maintenance or performance enhancements.
          </p>

          <h2>6. Disclaimer of Warranties & Limitation of Liability</h2>
          <p>
            KopiPlay is provided on an "as-is" and "as-available" basis without warranties of any kind. In no event shall KopiPlay be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the platform.
          </p>

          <h2>7. Updates to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Service at any time. Continued usage of KopiPlay following revisions constitutes full acceptance of the updated terms.
          </p>

          <!-- Operator Review Box -->
          <div class="legal-notice-box notice-warning">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Website Owner Review Required:</strong> When transferring this site to your new domain, review Section 6 and Section 7 with your legal advisor to insert your governing jurisdiction and dispute resolution location.
            </div>
          </div>
        </div>
      </div>
    \\\`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 5. DMCA & COPYRIGHT POLICY VIEW
  function renderDmcaView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'DMCA & Copyright Policy - KopiPlay',
      description: 'Official DMCA and Copyright notice for KopiPlay detailing intellectual property protection, infringement notification procedures, and counter-claims.',
      canonical: 'https://kipo.in/#/dmca',
      ogType: 'website'
    });

    main.innerHTML = \\\`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">DMCA & Copyright</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">Intellectual Property</div>
          <h1 class="legal-title">DMCA & <span class="gradient-text">Copyright Policy</span></h1>
          <p class="legal-lead">
            KopiPlay respects creator intellectual property rights and adheres to the provisions of the Digital Millennium Copyright Act (17 U.S.C. § 512).
          </p>
        </header>

        <div class="legal-card">
          <h2>1. Third-Party Game Ownership & Attribution</h2>
          <p>
            All third-party video games, game characters, audio assets, trademarks, and associated intellectual property featured on KopiPlay remain the sole property of their respective copyright holders. We host and embed games through authorized embedding licenses and developer distribution catalogs (such as HTMLGames, GameDistribution, and GameMonetize), preserving required developer branding and credits.
          </p>

          <h2>2. Copyright Infringement Notification Procedure</h2>
          <p>
            If you are a copyright owner or an authorized representative and believe that any game or content accessible on KopiPlay infringes upon your copyright, you may submit a formal notification containing the following:
          </p>
          <ol>
            <li>A physical or electronic signature of the copyright owner or person authorized to act on their behalf.</li>
            <li>Specific identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact URL (e.g., <code>https://kipo.in/#/game/[game-slug]</code>) where the allegedly infringing material is located on KopiPlay.</li>
            <li>Your contact information, including your full legal name, mailing address, telephone number, and verifiable email address.</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement made under penalty of perjury that the information in the notification is accurate and that you are authorized to act on behalf of the owner.</li>
          </ol>

          <h2>3. Submission Method</h2>
          <p>
            Please deliver your copyright notification via our official <a href="#/contact" style="color:#8B5CF6; font-weight:600;">Contact & Support Form</a> by choosing the topic <strong>"Copyright / DMCA Notice"</strong>. Verified infringement claims are investigated and processed within 24 to 48 business hours.
          </p>

          <h2>4. Counter-Notification Procedure</h2>
          <p>
            If a game developer believes their material was removed or disabled by mistake or misidentification, a counter-notification may be submitted containing their identity, explanation, and consent to legal jurisdiction under 17 U.S.C. § 512(g).
          </p>

          <!-- Action Required by Website Owner -->
          <div class="legal-notice-box notice-warning">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Website Owner Action Required:</strong> To qualify for DMCA statutory Safe Harbor protections under 17 U.S.C. § 512(c)(2), register a Designated Agent with the U.S. Copyright Office Directory of Service Provider Agents and update this page with your agent's full legal name, physical postal address, telephone, and designated DMCA email.
            </div>
          </div>
        </div>
      </div>
    \\\`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }`;

// Replace views in builder
const viewsRegex = /\/\/ --- PHASE 2: Redesigned Five Informational Pages[\s\S]*?\/\/ --- Router ---/;
if (viewsRegex.test(builder)) {
  builder = builder.replace(viewsRegex, newViewsCode + '\n\n  // --- Router ---');
  console.log('Replaced views in build-complete-bundle.js');
} else {
  console.log('WARNING: viewsRegex did not match in build-complete-bundle.js');
}

fs.writeFileSync('scripts/build-complete-bundle.js', builder, 'utf8');
console.log('Wrote updated scripts/build-complete-bundle.js');

// 4. Build bundle.js
require('./build-complete-bundle.js');
console.log('Successfully compiled js/bundle.js');


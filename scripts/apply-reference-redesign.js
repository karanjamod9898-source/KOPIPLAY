const fs = require('fs');
const path = require('path');

console.log('--- Applying KopiPlay Reference-Matched Redesign ---');

// 1. UPDATE CSS/COMPONENTS.CSS
const componentsPath = path.join(__dirname, '../css/components.css');
let componentsCss = fs.readFileSync(componentsPath, 'utf8');

const referenceComponentsCss = `
/* ==========================================================================
   KopiPlay - UI Components System (Reference Image Matched)
   Exact Colors: #101522 BG, #1B2435 Panels, #3B82F6 & #A855F7 Accents, #2B3548 Borders
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. Off-Canvas Drawer Navigation Sidebar (Matches Phone 3 in Reference)
   -------------------------------------------------------------------------- */
.site-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 290px;
  background: #151D2C;
  border-right: 1.5px solid #2B3548;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 12px 0 40px rgba(0, 0, 0, 0.75);
}

body.mobile-sidebar-open .site-sidebar {
  transform: translateX(0);
}

.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 21, 34, 0.75);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

body.mobile-sidebar-open .mobile-drawer-overlay {
  opacity: 1;
  pointer-events: auto;
}

.sidebar-header {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid #2B3548;
  background: #111723;
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #F8FAFC;
}

.sidebar-brand .gamepad-icon {
  width: 26px;
  height: 26px;
  color: #A855F7;
}

.sidebar-brand .brand-text {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 900;
  color: #F8FAFC;
  letter-spacing: -0.5px;
}

.sidebar-close-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #1B2435;
  border: 1px solid #2B3548;
  color: #A7B0C0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-close-btn:hover {
  background: #222E44;
  color: #F8FAFC;
  border-color: #3B82F6;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.drawer-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 12px;
  color: #A7B0C0;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.drawer-nav-item.active-pill {
  background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
}

.drawer-nav-item:not(.active-pill):hover {
  background: #1B2435;
  color: #F8FAFC;
}

.drawer-nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-nav-left svg {
  width: 18px;
  height: 18px;
}

.drawer-divider {
  border: none;
  border-top: 1px solid #2B3548;
  margin: 10px 0;
}

/* --------------------------------------------------------------------------
   2. Top Header Navigation (Matches Top Panel in Reference)
   -------------------------------------------------------------------------- */
.site-header {
  height: 64px;
  background: #101522;
  border-bottom: 1.5px solid #2B3548;
  position: sticky;
  top: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  padding: 0 28px;
  box-sizing: border-box;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 22px;
  flex-shrink: 0;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.header-logo-icon {
  width: 28px;
  height: 28px;
  color: #A855F7;
  filter: drop-shadow(0 2px 6px rgba(168, 85, 247, 0.4));
}

.header-logo-text {
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 900;
  color: #F8FAFC;
  letter-spacing: -0.5px;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-pill {
  display: inline-flex;
  align-items: center;
  padding: 7px 18px;
  border-radius: 9999px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-pill.active {
  background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
}

.nav-pill:not(.active) {
  color: #A7B0C0;
}

.nav-pill:not(.active):hover {
  color: #F8FAFC;
  background: #1B2435;
}

.nav-link {
  color: #A7B0C0;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #F8FAFC;
}

/* Header Dropdown */
.header-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 200px;
  background: #151D2C;
  border: 1.5px solid #2B3548;
  border-radius: 14px;
  padding: 8px;
  display: none;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  z-index: 100;
}

.header-dropdown:hover .dropdown-menu {
  display: flex;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  color: #A7B0C0;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.15s ease;
}

.dropdown-item:hover {
  background: #1B2435;
  color: #F8FAFC;
}

/* Header Search */
.header-search {
  flex: 1;
  max-width: 440px;
  position: relative;
}

.search-input-box {
  display: flex;
  align-items: center;
  background: #151D2C;
  border: 1.5px solid #2B3548;
  border-radius: 9999px;
  padding: 0 16px;
  height: 40px;
  transition: all 0.2s ease;
}

.search-input-box:focus-within {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  background: #1A2436;
}

.search-icon {
  width: 17px;
  height: 17px;
  color: #7A869E;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #F8FAFC;
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 0 10px;
  outline: none;
}

.search-input::placeholder {
  color: #7A869E;
}

.search-clear-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #2B3548;
  border: none;
  color: #F8FAFC;
  cursor: pointer;
  padding: 0;
}

.search-clear-btn.visible {
  display: flex;
}

/* Autocomplete Suggestions */
.search-suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #151D2C;
  border: 1.5px solid #2B3548;
  border-radius: 14px;
  max-height: 380px;
  overflow-y: auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
  display: none;
  z-index: 100;
  padding: 6px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 10px;
  text-decoration: none;
  color: #F8FAFC;
  transition: background 0.15s ease;
}

.suggestion-item:hover {
  background: #1B2435;
}

.suggestion-thumb {
  width: 44px;
  height: 30px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid #2B3548;
}

.suggestion-title {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 700;
  color: #F8FAFC;
}

.suggestion-category {
  font-size: 0.75rem;
  color: #A7B0C0;
}

/* Header Right Actions */
.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.header-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #A7B0C0;
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 7px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.header-action-btn:hover {
  color: #F8FAFC;
  background: #1B2435;
}

.header-action-btn svg {
  width: 17px;
  height: 17px;
}

.header-badge {
  background: #FF4757;
  color: #FFF;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 9999px;
  margin-left: 2px;
}

.mobile-search-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #1B2435;
  border: 1.5px solid #2B3548;
  color: #F8FAFC;
  cursor: pointer;
}

.mobile-nav-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #1B2435;
  border: 1.5px solid #2B3548;
  color: #F8FAFC;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-nav-toggle:hover {
  border-color: #8B5CF6;
  background: #222E44;
}

/* --------------------------------------------------------------------------
   3. Mixed-Size Bento Game Grid (Matches Left Panel in Reference)
   Dense, Image-First, Squircle Cards with 18px-22px Radius
   -------------------------------------------------------------------------- */
.mixed-game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-auto-flow: dense;
  gap: 14px;
  width: 100%;
  margin-bottom: 48px;
}

.mixed-game-grid .game-card {
  position: relative;
  background: #1B2435;
  border: 2px solid #2B3548;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.24s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
  user-select: none;
}

.mixed-game-grid .game-card.card-large {
  grid-column: span 2;
  grid-row: span 2;
  border-radius: 22px;
}

.mixed-game-grid .game-card.card-wide {
  grid-column: span 2;
  grid-row: span 1;
  aspect-ratio: 2 / 1;
}

.mixed-game-grid .game-card.card-tall {
  grid-column: span 1;
  grid-row: span 2;
  aspect-ratio: 1 / 2;
}

.mixed-game-grid .game-card:hover {
  transform: scale(1.04);
  border-color: #8B5CF6;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.65), 0 0 20px rgba(139, 92, 246, 0.35);
  z-index: 5;
}

.mixed-game-grid .card-media {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: inherit;
  background: #101522;
}

.mixed-game-grid .card-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.26s ease;
}

.mixed-game-grid .game-card:hover .card-thumb {
  transform: scale(1.06);
}

.mixed-game-grid .card-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.badge-top {
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: #FFFFFF;
}

.badge-hot {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  color: #FFFFFF;
}

.badge-new {
  background: linear-gradient(135deg, #06B6D4, #0891B2);
  color: #FFFFFF;
}

.mixed-game-grid .card-fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(16, 21, 34, 0.7);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 3;
}

.mixed-game-grid .game-card:hover .card-fav-btn,
.mixed-game-grid .card-fav-btn.is-fav {
  opacity: 1;
}

.mixed-game-grid .card-fav-btn:hover,
.mixed-game-grid .card-fav-btn.is-fav {
  background: #FF4757;
  border-color: #FF4757;
  color: #FFFFFF;
  transform: scale(1.12);
}

.mixed-game-grid .card-overlay-info {
  position: absolute;
  inset: auto 0 0 0;
  padding: 12px;
  background: linear-gradient(180deg, transparent 0%, rgba(16, 21, 34, 0.94) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 2;
}

.mixed-game-grid .game-card:hover .card-overlay-info,
.mixed-game-grid .game-card.card-large .card-overlay-info {
  opacity: 1;
}

.mixed-game-grid .card-overlay-title {
  color: #F8FAFC;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.85rem;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

.mixed-game-grid .game-card.card-large .card-overlay-title {
  font-size: 1.1rem;
}

/* --------------------------------------------------------------------------
   4. Game Categories Showcase (Matches Middle-Right Panel in Reference)
   2 Rows of 6 Cards with Centered Vector Icons and Bold Labels
   -------------------------------------------------------------------------- */
.game-categories-section {
  margin: 36px 0 54px;
}

.section-header-clean {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title-clean {
  font-family: var(--font-heading);
  font-size: 1.45rem;
  font-weight: 800;
  color: #F8FAFC;
  letter-spacing: -0.3px;
}

.category-showcase-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}

.category-showcase-card {
  background: #1B2435;
  border: 1.5px solid #2B3548;
  border-radius: 16px;
  padding: 22px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.category-showcase-card:hover {
  background: #222E44;
  border-color: #3B82F6;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.28);
}

.cat-card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.category-showcase-card:hover .cat-card-icon {
  transform: scale(1.15);
}

.cat-card-icon svg {
  width: 26px;
  height: 26px;
}

.cat-card-label {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  color: #F8FAFC;
  text-align: center;
}

/* Category Colors */
.cat-icon-action { color: #A855F7; }
.cat-icon-racing { color: #38BDF8; }
.cat-icon-puzzle { color: #EC4899; }
.cat-icon-arcade { color: #F59E0B; }
.cat-icon-sports { color: #10B981; }
.cat-icon-shooting { color: #EF4444; }
.cat-icon-adventure { color: #14B8A6; }
.cat-icon-io { color: #8B5CF6; }
.cat-icon-girls { color: #F43F5E; }
.cat-icon-cooking { color: #FB923C; }
.cat-icon-multiplayer { color: #3B82F6; }
.cat-icon-more { color: #94A3B8; }

/* --------------------------------------------------------------------------
   5. Standard Games Grid (Explore All Games / Category Views)
   -------------------------------------------------------------------------- */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.games-grid .game-card {
  position: relative;
  background: #1B2435;
  border: 1.5px solid #2B3548;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 16 / 10;
  transition: all 0.22s ease;
}

.games-grid .game-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: #8B5CF6;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(139, 92, 246, 0.3);
}

.games-grid .card-media {
  width: 100%;
  height: 100%;
  position: relative;
}

.games-grid .card-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* --------------------------------------------------------------------------
   6. Dedicated Empty States (Favorites, Recent, 404)
   -------------------------------------------------------------------------- */
.empty-state-card {
  background: #1B2435;
  border: 1.5px solid #2B3548;
  border-radius: 20px;
  padding: 56px 24px;
  text-align: center;
  max-width: 580px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
}

.empty-state-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.12);
  border: 1.5px solid rgba(139, 92, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #A855F7;
  margin-bottom: 4px;
}

.empty-state-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  color: #F8FAFC;
}

.empty-state-text {
  font-size: 0.95rem;
  color: #A7B0C0;
  line-height: 1.6;
  max-width: 440px;
}

/* --------------------------------------------------------------------------
   7. Static Legal & Trust Pages (About, Contact, Privacy, Terms)
   -------------------------------------------------------------------------- */
.info-page-container {
  max-width: 900px;
  margin: 0 auto;
  background: #1B2435;
  border: 1.5px solid #2B3548;
  border-radius: 20px;
  padding: 36px 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.info-header {
  border-bottom: 1.5px solid #2B3548;
  padding-bottom: 20px;
  margin-bottom: 28px;
}

.info-title {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 900;
  color: #F8FAFC;
  margin-bottom: 8px;
}

.info-subtitle {
  color: #A7B0C0;
  font-size: 0.95rem;
}

.info-body {
  color: #E2E8F0;
  font-size: 0.95rem;
  line-height: 1.7;
}

.info-body h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: #F8FAFC;
  margin: 28px 0 12px;
}

.info-body p {
  margin-bottom: 16px;
  color: #A7B0C0;
}

.info-body ul {
  padding-left: 20px;
  margin-bottom: 18px;
}

.info-body li {
  margin-bottom: 8px;
  color: #A7B0C0;
}

/* --------------------------------------------------------------------------
   8. Footer Design
   -------------------------------------------------------------------------- */
.site-footer {
  background: #111723;
  border-top: 1.5px solid #2B3548;
  padding: 48px 28px 24px;
  margin-top: 60px;
}

.footer-inner {
  max-width: var(--max-content-width);
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 36px;
  margin-bottom: 40px;
}

.footer-brand-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 900;
  color: #F8FAFC;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-brand-desc {
  color: #A7B0C0;
  font-size: 0.88rem;
  line-height: 1.6;
  max-width: 320px;
}

.footer-heading {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 800;
  color: #F8FAFC;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: #A7B0C0;
  text-decoration: none;
  font-size: 0.88rem;
  transition: color 0.15s ease;
}

.footer-links a:hover {
  color: #3B82F6;
}

.footer-bottom {
  border-top: 1px solid #2B3548;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #7A869E;
  font-size: 0.82rem;
  flex-wrap: wrap;
  gap: 12px;
}
`;

fs.writeFileSync(componentsPath, referenceComponentsCss, 'utf8');
console.log('Successfully updated css/components.css');


// 2. UPDATE CSS/PLAYER.CSS
const playerPath = path.join(__dirname, '../css/player.css');
const referencePlayerCss = `
/* ==========================================================================
   KopiPlay - Game Detail & Player Styles (Matches Top-Right Panel in Reference)
   16:9 Cinematic Container, Fullscreen Toggle, Action Card, Related Games Strip
   ========================================================================== */

/* Breadcrumbs */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: #A7B0C0;
  margin-bottom: 20px;
  flex-wrap: wrap;
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

/* Two-Column Detail Layout */
.game-detail-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  margin-bottom: 40px;
  width: 100%;
}

/* 16:9 Cinematic Player Container */
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

/* Right Action Card (Matches Reference Sidebar Card) */
.game-action-card {
  background: #1B2435;
  border: 1.5px solid #2B3548;
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  height: fit-content;
}

.action-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-card-thumb {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  object-fit: cover;
  border: 1.5px solid #2B3548;
  flex-shrink: 0;
}

.action-card-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.action-card-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #F8FAFC;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag-pill {
  background: #151D2C;
  border: 1px solid #2B3548;
  color: #A7B0C0;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.tag-pill:hover {
  border-color: #8B5CF6;
  color: #F8FAFC;
}

/* Big Purple Play Now CTA Button (Matches Reference) */
.btn-play-now {
  background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.05rem;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.45);
  transition: all 0.2s ease;
  width: 100%;
}

.btn-play-now:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(139, 92, 246, 0.6);
  background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%);
}

.btn-play-now svg {
  width: 18px;
  height: 18px;
}

/* Secondary Favorites Button */
.btn-fav-action {
  background: #151D2C;
  border: 1.5px solid #2B3548;
  color: #F8FAFC;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.92rem;
  padding: 11px 18px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-fav-action:hover {
  border-color: #FF4757;
  color: #FF4757;
  background: rgba(255, 71, 87, 0.08);
}

.btn-fav-action.is-fav {
  border-color: #FF4757;
  color: #FF4757;
  background: rgba(255, 71, 87, 0.12);
}

.btn-fav-action svg {
  width: 16px;
  height: 16px;
}

/* Game Description */
.action-card-description {
  font-size: 0.88rem;
  color: #A7B0C0;
  line-height: 1.55;
  border-top: 1px solid #2B3548;
  padding-top: 14px;
}

/* Keycap Controls */
.game-controls-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #2B3548;
  padding-top: 14px;
}

.controls-label {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  color: #A7B0C0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.controls-keys {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.keycap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background: #151D2C;
  border: 1px solid #2B3548;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: #F8FAFC;
  box-shadow: 0 2px 0 #1A2436;
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

fs.writeFileSync(playerPath, referencePlayerCss, 'utf8');
console.log('Successfully updated css/player.css');


// 3. UPDATE CSS/RESPONSIVE.CSS
const responsivePath = path.join(__dirname, '../css/responsive.css');
const referenceResponsiveCss = `
/* ==========================================================================
   KopiPlay - Responsive Styles (Matches Mobile Mockups in Reference)
   ========================================================================== */

/* Tablet & Mobile Breakpoints */
@media (max-width: 1024px) {
  .site-header {
    padding: 0 20px;
  }
  .category-showcase-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .game-detail-layout {
    grid-template-columns: 1fr;
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

  /* Mobile Player (Phone 2 Mockup in Reference): Stacked Full-Width CTA */
  .player-stage-card {
    min-height: 240px;
    border-radius: 14px;
  }

  .game-action-card {
    padding: 18px;
    border-radius: 14px;
  }

  .btn-play-now {
    padding: 14px;
    font-size: 1rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
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

fs.writeFileSync(responsivePath, referenceResponsiveCss, 'utf8');
console.log('Successfully updated css/responsive.css');


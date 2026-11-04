const fs = require('fs');
const path = require('path');

// 1. Update css/components.css with Poki Layout Styles
let componentsCss = fs.readFileSync('css/components.css', 'utf8');

if (!componentsCss.includes('.poki-grid')) {
  const pokiStyles = `

/* ==========================================================================
   POKI-STYLE FULL-SCREEN ASYMMETRIC MASONRY GRID SYSTEM
   Exact Reference: Poki.com layout (Image 2)
   ========================================================================== */

/* Poki Homepage Body Mode */
body.poki-home-mode {
  background-color: #14B8A6 !important; /* Vibrant Poki Teal canvas */
  min-height: 100vh;
}

body.poki-home-mode .site-header {
  display: none !important;
}

body.poki-home-mode .site-sidebar {
  display: none !important;
}

body.poki-home-mode .app-main-wrapper {
  margin-left: 0 !important;
  width: 100% !important;
  max-width: 100vw !important;
  padding: 0 !important;
}

body.poki-home-mode .main-content {
  padding: 12px 14px 40px !important;
  max-width: 100% !important;
  width: 100% !important;
}

/* Category Filter Bar (Poki Style Floating / Top Strip) */
.poki-cat-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 2px 14px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
}
.poki-cat-strip::-webkit-scrollbar {
  display: none;
}

.poki-cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 9999px;
  color: #0F766E;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}

.poki-cat-pill:hover,
.poki-cat-pill.active {
  background: #0F766E;
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);
}

.poki-cat-pill.active svg,
.poki-cat-pill:hover svg {
  color: #FFFFFF;
}

/* The Core Asymmetric Grid */
.poki-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: 105px;
  grid-auto-flow: dense;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

/* Card Spans */
.poki-card.span-2x2 {
  grid-column: span 2;
  grid-row: span 2;
}

.poki-card.span-2x1 {
  grid-column: span 2;
  grid-row: span 1;
}

.poki-card.span-1x2 {
  grid-column: span 1;
  grid-row: span 2;
}

.poki-card.span-1x1 {
  grid-column: span 1;
  grid-row: span 1;
}

/* Top-Left Poki Brand & Search Tile */
.poki-brand-tile {
  grid-column: span 2;
  grid-row: span 2;
  background: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  z-index: 20;
  position: relative;
  overflow: visible;
  box-sizing: border-box;
}

.poki-brand-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.poki-brand-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.poki-logo-icon {
  width: 34px;
  height: 34px;
  background: #0F766E;
  color: #FFFFFF;
  border-radius: 10px;
  padding: 6px;
  flex-shrink: 0;
}

.poki-logo-name {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 1.35rem;
  color: #172033;
  letter-spacing: -0.5px;
}

.poki-logo-name span {
  color: #0F766E;
}

.poki-brand-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.poki-brand-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #F1F5F9;
  color: #0F766E;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  text-decoration: none;
}

.poki-brand-btn:hover {
  background: #CCFBF1;
  transform: scale(1.08);
}

.poki-brand-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  background: #EF4444;
  color: #FFFFFF;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 9999px;
}

/* Search input inside brand tile */
.poki-search-box {
  position: relative;
  width: 100%;
}

.poki-search-input {
  width: 100%;
  height: 38px;
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  padding: 0 32px 0 34px;
  font-size: 0.84rem;
  font-family: var(--font-body);
  color: #172033;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.poki-search-input:focus {
  background: #FFFFFF;
  border-color: #0F766E;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
}

.poki-search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #64748B;
  pointer-events: none;
}

.poki-search-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E2E8F0;
  color: #64748B;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 11px;
  border: none;
}

.poki-search-clear:hover {
  background: #CBD5E1;
  color: #172033;
}

/* Quick Category selector inside brand tile */
.poki-brand-bottom {
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
}

.poki-cat-dropdown-btn {
  width: 100%;
  height: 34px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: #172033;
  cursor: pointer;
  transition: all 0.15s ease;
}

.poki-cat-dropdown-btn:hover {
  background: #E2E8F0;
  border-color: #0F766E;
}

/* Poki Category Drawer Dropdown */
.poki-category-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 6px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
  border: 1px solid #E2E8F0;
  padding: 8px;
  max-height: 320px;
  overflow-y: auto;
  z-index: 100;
  display: none;
}

.poki-category-menu.show {
  display: block;
}

.poki-cat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  color: #172033;
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.12s ease;
}

.poki-cat-item:hover,
.poki-cat-item.active {
  background: #F0FDFA;
  color: #0F766E;
  font-weight: 700;
}

.poki-cat-item-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.poki-cat-count {
  font-size: 0.72rem;
  background: #F1F5F9;
  color: #64748B;
  padding: 2px 6px;
  border-radius: 9999px;
}

/* Poki Game Card (Squircle, Full Bleed Image, Zero White Footer) */
.poki-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px !important;
  background: #0F172A;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
  cursor: pointer;
  display: block;
  text-decoration: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  height: 100%;
  border: none !important;
}

.poki-card:hover {
  transform: scale(1.05);
  z-index: 10;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
}

.poki-card img.poki-thumb,
.poki-card img.card-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 18px;
  transition: transform 0.3s ease;
}

.poki-card:hover img.poki-thumb,
.poki-card:hover img.card-thumb {
  transform: scale(1.04);
}

/* Hover Title Overlay */
.poki-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0) 30%, rgba(15, 23, 42, 0.9) 100%);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 8px 10px;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.poki-card:hover .poki-card-overlay {
  opacity: 1;
}

.poki-card-title,
.poki-card .card-title {
  color: #FFFFFF !important;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.82rem;
  line-height: 1.2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.poki-card-category {
  color: #2DD4BF;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* Card Badges (Top-Left) */
.poki-card-badge {
  position: absolute;
  top: 7px;
  left: 7px;
  font-size: 0.64rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 6px;
  letter-spacing: 0.4px;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
}

.poki-badge-top { background: #0F766E; color: #FFFFFF; }
.poki-badge-hot { background: #EA580C; color: #FFFFFF; }
.poki-badge-new { background: #14B8A6; color: #FFFFFF; }

/* Favorite Pin (Top-Right on hover or active) */
.poki-card-fav {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  opacity: 0;
  transition: all 0.15s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.poki-card:hover .poki-card-fav,
.poki-card-fav.is-fav {
  opacity: 1;
}

.poki-card-fav.is-fav {
  color: #EF4444;
  background: #FFFFFF;
}

.poki-card-fav:hover {
  transform: scale(1.15);
  color: #EF4444;
}

/* Filter Status Banner */
.poki-filter-banner {
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 14px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-heading);
  font-size: 0.92rem;
  font-weight: 700;
  color: #0F766E;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.poki-filter-clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 9999px;
  background: #F1F5F9;
  color: #172033;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.poki-filter-clear-btn:hover {
  background: #EF4444;
  color: #FFFFFF;
}

/* Empty State Card */
.poki-empty-card {
  grid-column: 1 / -1;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 40px 24px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
`;
  fs.appendFileSync('css/components.css', pokiStyles);
  console.log('Successfully appended Poki styles to css/components.css');
}

// 2. Update css/responsive.css with Poki responsive grid
let responsiveCss = fs.readFileSync('css/responsive.css', 'utf8');

if (!responsiveCss.includes('.poki-grid')) {
  const pokiResponsiveStyles = `

/* ==========================================================================
   POKI GRID RESPONSIVE BREAKPOINTS
   Breakpoints: 1920px (12 col), 1440px (10 col), 1024px (8 col), 768px (6 col), 430px (4 col)
   ========================================================================== */

@media (min-width: 1600px) {
  .poki-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
    grid-auto-rows: 105px !important;
    gap: 12px !important;
  }
  .poki-brand-tile {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }
}

@media (max-width: 1599px) and (min-width: 1280px) {
  .poki-grid {
    grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
    grid-auto-rows: 100px !important;
    gap: 10px !important;
  }
  .poki-brand-tile {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }
}

@media (max-width: 1279px) and (min-width: 1024px) {
  .poki-grid {
    grid-template-columns: repeat(8, minmax(0, 1fr)) !important;
    grid-auto-rows: 95px !important;
    gap: 10px !important;
  }
  .poki-brand-tile {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }
}

@media (max-width: 1023px) and (min-width: 768px) {
  .poki-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
    grid-auto-rows: 90px !important;
    gap: 9px !important;
  }
  .poki-brand-tile {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }
}

@media (max-width: 767px) and (min-width: 480px) {
  .poki-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    grid-auto-rows: 85px !important;
    gap: 8px !important;
  }
  .poki-brand-tile {
    grid-column: span 4 !important;
    grid-row: span 2 !important;
  }
}

@media (max-width: 479px) {
  .poki-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    grid-auto-rows: 74px !important;
    gap: 6px !important;
  }
  .poki-brand-tile {
    grid-column: span 4 !important;
    grid-row: span 2 !important;
    padding: 10px 12px !important;
  }
  .poki-logo-name {
    font-size: 1.15rem !important;
  }
  .poki-card.span-2x2 {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }
  .poki-card.span-2x1 {
    grid-column: span 2 !important;
    grid-row: span 1 !important;
  }
  .poki-card.span-1x2 {
    grid-column: span 1 !important;
    grid-row: span 2 !important;
  }
  .poki-card.span-1x1 {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
}
`;
  fs.appendFileSync('css/responsive.css', pokiResponsiveStyles);
  console.log('Successfully appended Poki responsive styles to css/responsive.css');
}


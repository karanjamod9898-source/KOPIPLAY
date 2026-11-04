const fs = require('fs');

let css = fs.readFileSync('css/components.css', 'utf8');
const targetIdx = css.indexOf('/* Poki Homepage Body Mode */');
if (targetIdx === -1) {
  console.error('Target not found!');
  process.exit(1);
}

const before = css.substring(0, targetIdx);

const replacement = `/* Dark Gaming Canvas Body Mode */
body.poki-home-mode {
  background-color: var(--bg-page, #070A14) !important;
  color: #FFFFFF !important;
  min-height: 100vh;
}

/* Sidebar behavior on desktop: Fixed left 240px */
@media (min-width: 1024px) {
  body.poki-home-mode .site-header {
    display: none !important;
  }
  body.poki-home-mode .site-sidebar {
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
  body.poki-home-mode .app-main-wrapper {
    margin-left: var(--sidebar-width, 240px) !important;
    width: calc(100% - var(--sidebar-width, 240px)) !important;
    max-width: calc(100% - var(--sidebar-width, 240px)) !important;
    padding: 0 !important;
  }
  body.poki-home-mode .main-content {
    padding: 16px 20px 48px !important;
    max-width: 100% !important;
    width: 100% !important;
  }
}

@media (max-width: 1023px) {
  body.poki-home-mode .site-header {
    display: flex !important;
  }
  body.poki-home-mode .site-sidebar {
    position: fixed !important;
    transform: translateX(-100%);
    width: 270px !important;
  }
  body.mobile-sidebar-open.poki-home-mode .site-sidebar {
    transform: translateX(0) !important;
  }
  body.poki-home-mode .app-main-wrapper {
    margin-left: 0 !important;
    width: 100% !important;
    max-width: 100vw !important;
  }
  body.poki-home-mode .main-content {
    padding: 12px 10px 40px !important;
  }
}

/* Top Category Navigation Bar (Matching Reference Image) */
.poki-cat-nav-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  margin: 0 0 16px 0;
  box-sizing: border-box;
}

.poki-cat-strip {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 4px 2px 8px 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
  user-select: none;
  box-sizing: border-box;
  width: 100%;
}

.poki-cat-strip.is-dragging {
  cursor: grabbing;
  scroll-behavior: auto;
}

.poki-cat-strip::-webkit-scrollbar {
  display: none;
}

/* Category Navigation Left & Right Arrows */
.poki-cat-arrow {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.85);
  color: #22D3EE;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  z-index: 10;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
  outline: none;
}

.poki-cat-arrow:hover:not(:disabled) {
  background: #7C3AED;
  color: #FFFFFF;
  border-color: #A855F7;
  transform: scale(1.08);
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.45);
}

.poki-cat-arrow:active:not(:disabled) {
  transform: scale(0.96);
}

.poki-cat-arrow:disabled,
.poki-cat-arrow.is-disabled {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.85);
  visibility: hidden;
}

.poki-cat-arrow svg {
  width: 18px;
  height: 18px;
  pointer-events: none;
}

@media (max-width: 480px) {
  .poki-cat-arrow {
    width: 32px;
    height: 32px;
  }
  .poki-cat-arrow svg {
    width: 16px;
    height: 16px;
  }
  .poki-cat-nav-wrapper {
    gap: 4px;
    margin-bottom: 10px;
  }
}

/* Category Pill Buttons */
.poki-cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 38px;
  padding: 0 14px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 9999px;
  color: #CBD5E1;
  font-family: var(--font-heading);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
  outline: none;
}

.poki-cat-pill svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.poki-cat-pill:hover:not(.active) {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(34, 211, 238, 0.4);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);
}

/* Active Category Pill: Purple Gradient with Glow */
.poki-cat-pill.active {
  background: linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #A855F7 100%) !important;
  border-color: rgba(216, 180, 254, 0.6) !important;
  color: #FFFFFF !important;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.45);
}

.poki-cat-pill.active svg {
  color: #FFFFFF;
}

.poki-cat-pill .category-btn-count {
  background: rgba(255, 255, 255, 0.15);
  color: #E2E8F0;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 9999px;
}

.poki-cat-pill.active .category-btn-count {
  background: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
}

/* ==========================================================================
   Hero Gaming Banner (Exact Reference Image Recreation)
   ========================================================================== */
.kopi-hero-banner {
  position: relative;
  width: 100%;
  min-height: 160px;
  margin: 0 0 16px 0;
  border-radius: 20px;
  background: linear-gradient(135deg, #240740 0%, #3B0E63 26%, #1D184E 60%, #090E1D 100%);
  border: 1px solid rgba(168, 85, 247, 0.35);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  box-sizing: border-box;
  overflow: hidden;
}

.kopi-hero-banner::before {
  content: '';
  position: absolute;
  top: -40px;
  right: 15%;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(20px);
}

.kopi-hero-banner::after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: 10%;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
  pointer-events: none;
  filter: blur(25px);
}

.hero-content-col {
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: 65%;
}

.hero-headline {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 900;
  color: #FFFFFF;
  margin: 0 0 6px 0;
  line-height: 1.18;
  letter-spacing: -0.4px;
}

.hero-gold-count {
  color: #FACC15;
  text-shadow: 0 0 20px rgba(250, 204, 21, 0.55);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 0.94rem;
  font-weight: 500;
  color: #CBD5E1;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.hero-features-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.hero-feature-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  padding: 5px 12px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #F1F5F9;
  letter-spacing: 0.2px;
}

.feat-icon-yellow {
  color: #FACC15;
}
.feat-icon-cyan {
  color: #22D3EE;
}
.feat-icon-pink {
  color: #F43F5E;
}

.hero-artwork-col {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  width: 320px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.hero-artwork-img {
  height: 160px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4));
  border-radius: 12px;
}

/* ==========================================================================
   Compact Category Filter Indicator (Dark Glass Theme)
   ========================================================================== */
.kopi-filter-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 16px;
  margin: 0 0 14px 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 100%;
  animation: kopiFilterFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes kopiFilterFade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.kopi-filter-info {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
}

.kopi-filter-category {
  font-family: var(--font-heading, 'Outfit', sans-serif);
  font-size: 0.94rem;
  font-weight: 800;
  color: #22D3EE;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.kopi-filter-dot {
  color: #94A3B8;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1;
}

.kopi-filter-count {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.82rem;
  font-weight: 600;
  color: #CBD5E1;
  flex-shrink: 0;
}

.kopi-filter-clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 12px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #E2E8F0;
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.18s ease;
  line-height: 1;
  outline: none;
}

.kopi-filter-clear-btn svg {
  flex-shrink: 0;
  transition: transform 0.18s ease;
}

.kopi-filter-clear-btn:hover {
  background: rgba(244, 63, 94, 0.25);
  border-color: #F43F5E;
  color: #FFFFFF;
}

.kopi-filter-clear-btn:hover svg {
  transform: rotate(90deg);
}

.kopi-filter-clear-btn:active {
  transform: scale(0.96);
}

@media (max-width: 640px) {
  .kopi-filter-indicator {
    height: 38px;
    padding: 0 12px;
    margin-bottom: 10px;
  }
  .kopi-filter-category {
    font-size: 0.86rem;
    max-width: 140px;
  }
}

/* ==========================================================================
   Asymmetric Mosaic Game Grid (Exact Reference Image Recreation)
   ========================================================================== */
.poki-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-auto-rows: 110px;
  grid-auto-flow: dense;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 1400px) {
  .poki-grid {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    grid-auto-rows: 120px;
  }
}

@media (min-width: 1100px) and (max-width: 1399px) {
  .poki-grid {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-auto-rows: 115px;
  }
}

@media (min-width: 800px) and (max-width: 1099px) {
  .poki-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-auto-rows: 110px;
  }
}

@media (max-width: 799px) {
  .poki-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: 95px;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .poki-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: 95px;
    gap: 8px;
  }
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

/* Game Card Visuals */
.poki-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #0D1322;
  border: 1.5px solid rgba(6, 182, 212, 0.3);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
  text-decoration: none;
  display: block;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.22s ease;
  cursor: pointer;
}

/* Alternating Border Accent (Cyan & Purple) */
.poki-card:nth-child(even) {
  border-color: rgba(168, 85, 247, 0.3);
}

.poki-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Card Hover Elevation & Neon Glow */
.poki-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: var(--accent-cyan, #22D3EE);
  box-shadow: 0 10px 28px rgba(6, 182, 212, 0.38);
  z-index: 10;
}

.poki-card:nth-child(even):hover {
  border-color: var(--accent-fuchsia, #C084FC);
  box-shadow: 0 10px 28px rgba(168, 85, 247, 0.42);
}

.poki-card:hover .poki-thumb {
  transform: scale(1.06);
}

/* Category Badge (Top-Left) */
.poki-card-badge {
  position: absolute;
  top: 7px;
  left: 7px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #22D3EE;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 9999px;
  letter-spacing: 0.5px;
  z-index: 3;
  pointer-events: none;
}

.poki-card:nth-child(even) .poki-card-badge {
  color: #C084FC;
}

/* Favorite Heart (Top-Right) */
.poki-card-fav {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94A3B8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
  transition: all 0.15s ease;
  outline: none;
  padding: 0;
}

.poki-card-fav:hover {
  transform: scale(1.15);
  color: #F43F5E;
  background: rgba(15, 23, 42, 0.95);
}

.poki-card-fav.is-fav {
  color: #F43F5E;
}

/* Title Overlay (Bottom) */
.poki-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 8px 6px;
  background: linear-gradient(180deg, transparent 0%, rgba(7, 10, 20, 0.85) 70%, rgba(7, 10, 20, 0.98) 100%);
  display: flex;
  flex-direction: column;
  z-index: 2;
  pointer-events: none;
}

.poki-card-title {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.2px;
}

.poki-card-category {
  font-size: 0.65rem;
  font-weight: 600;
  color: #94A3B8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Empty State Card */
.poki-empty-card {
  grid-column: 1 / -1;
  background: #0D1322;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 24px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

/* Backward compatibility */
.poki-filter-banner {
  display: none !important;
}

.poki-filter-clear-btn {
  display: none !important;
}
`;

fs.writeFileSync('css/components.css', before + replacement, 'utf8');
console.log('Successfully updated css/components.css with Dark Gaming Theme!');


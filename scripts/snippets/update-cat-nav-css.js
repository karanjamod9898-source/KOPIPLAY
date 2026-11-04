const fs = require('fs');

let css = fs.readFileSync('css/components.css', 'utf8');

const targetStyle = `/* Category Filter Bar (Poki Style Floating / Top Strip) */
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
}`;

const replacementStyle = `/* Category Filter Navigation Bar & Arrows (KopiPlay Theme) */
.poki-cat-nav-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  margin: 0 0 12px 0;
  box-sizing: border-box;
}

.poki-cat-strip {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 4px 4px 12px 4px;
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
  background: #FFFFFF;
  color: #0F766E;
  border: 1.5px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
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
  background: #0F766E;
  color: #FFFFFF;
  border-color: #0F766E;
  transform: scale(1.08);
  box-shadow: 0 6px 16px rgba(15, 118, 110, 0.3);
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
    margin-bottom: 8px;
  }
}`;

if (css.includes(targetStyle)) {
  css = css.replace(targetStyle, replacementStyle);
  fs.writeFileSync('css/components.css', css, 'utf8');
  console.log('Successfully updated css/components.css with poki-cat-nav-wrapper styles');
} else {
  console.log('targetStyle not found, appending replacementStyle');
  css += '\n' + replacementStyle;
  fs.writeFileSync('css/components.css', css, 'utf8');
}


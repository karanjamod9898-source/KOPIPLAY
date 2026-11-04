const fs = require('fs');

let bundle = fs.readFileSync('js/bundle.js', 'utf8');

const startMarker = '  // --- Category Navigation & Smart Auto-Scroll Controller ---';
const endMarker = '  // --- POKI-STYLE HOMEPAGE RENDERER';

const idxStart = bundle.indexOf(startMarker);
const idxEnd = bundle.indexOf(endMarker);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Markers not found in bundle.js:', idxStart, idxEnd);
  process.exit(1);
}

const refinedController = `  // --- Category Navigation & Smart Auto-Scroll Controller ---
  function scrollCategoryIntoView(btn) {
    const strip = document.getElementById('pokiCatStrip');
    if (!strip || !btn) return;

    const stripRect = strip.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const visibleWidth = strip.clientWidth;
    const maxScroll = strip.scrollWidth - visibleWidth;
    if (maxScroll <= 0) return;

    // Exact content coordinates relative to strip
    const btnContentLeft = strip.scrollLeft + (btnRect.left - stripRect.left);
    const btnWidth = btnRect.width;
    const btnContentRight = btnContentLeft + btnWidth;

    const visibleLeft = strip.scrollLeft;
    const visibleRight = strip.scrollLeft + visibleWidth;

    // Buffer space to always reveal upcoming categories to the right
    const forwardMargin = Math.min(280, Math.max(160, visibleWidth * 0.25));
    const backMargin = Math.min(60, Math.max(30, visibleWidth * 0.08));

    let targetScroll = strip.scrollLeft;

    // If button is in the right area or near/past right edge (upcoming categories hidden)
    if (btnContentRight + forwardMargin > visibleRight) {
      targetScroll = btnContentLeft - backMargin;
    }
    // If button is near or past left edge
    else if (btnContentLeft - backMargin < visibleLeft) {
      targetScroll = btnContentLeft - backMargin;
    }

    targetScroll = Math.max(0, Math.min(maxScroll, Math.round(targetScroll)));

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

    if (scrollLeft <= 10) {
      leftArrow.disabled = true;
      leftArrow.classList.add('is-disabled');
    } else {
      leftArrow.disabled = false;
      leftArrow.classList.remove('is-disabled');
    }

    if (scrollLeft >= maxScroll - 10) {
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

`;

bundle = bundle.slice(0, idxStart) + refinedController + bundle.slice(idxEnd);
fs.writeFileSync('js/bundle.js', bundle, 'utf8');
console.log('Successfully written refined category controller to js/bundle.js');


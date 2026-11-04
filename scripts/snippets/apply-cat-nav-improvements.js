const fs = require('fs');

let bundle = fs.readFileSync('js/bundle.js', 'utf8');

// 1. Add scrollCategoryIntoView, updateCatArrows, and initCategoryNavigation before renderHomepage
const catControllerCode = `
  // --- Category Navigation & Smart Auto-Scroll Controller ---
  function scrollCategoryIntoView(btn) {
    const strip = document.getElementById('pokiCatStrip');
    if (!strip || !btn) return;

    const visibleWidth = strip.clientWidth;
    const maxScroll = strip.scrollWidth - visibleWidth;
    if (maxScroll <= 0) return;

    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const btnRight = btnLeft + btnWidth;
    const currentScroll = strip.scrollLeft;
    const visibleRight = currentScroll + visibleWidth;

    // Buffer space to always reveal upcoming category buttons to the right
    const forwardMargin = Math.min(320, Math.max(200, visibleWidth * 0.35));
    const backMargin = 40;

    let targetScroll = currentScroll;

    // If button is in the right area or near the right edge (upcoming categories hidden)
    if (btnRight + forwardMargin > visibleRight) {
      // Scroll forward to place button comfortably on the left, revealing all upcoming buttons!
      targetScroll = btnLeft - backMargin;
    } 
    // If button is near or behind the left edge
    else if (btnLeft - backMargin < currentScroll) {
      targetScroll = btnLeft - backMargin;
    }

    targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));

    if (Math.abs(targetScroll - currentScroll) > 3) {
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
    if (maxScroll <= 5) {
      leftArrow.disabled = true;
      leftArrow.classList.add('is-disabled');
      rightArrow.disabled = true;
      rightArrow.classList.add('is-disabled');
      return;
    }

    const scrollLeft = strip.scrollLeft;

    if (scrollLeft <= 5) {
      leftArrow.disabled = true;
      leftArrow.classList.add('is-disabled');
    } else {
      leftArrow.disabled = false;
      leftArrow.classList.remove('is-disabled');
    }

    if (scrollLeft >= maxScroll - 5) {
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
        const step = Math.max(220, strip.clientWidth * 0.75);
        strip.scrollBy({ left: -step, behavior: 'smooth' });
        setTimeout(updateCatArrows, 320);
      };
    }

    // Right Arrow Click (smooth forward navigation)
    if (rightArrow) {
      rightArrow.onclick = () => {
        const step = Math.max(220, strip.clientWidth * 0.75);
        strip.scrollBy({ left: step, behavior: 'smooth' });
        setTimeout(updateCatArrows, 320);
      };
    }

    // Scroll listener to update arrow states
    strip.onscroll = () => {
      updateCatArrows();
    };

    // Mouse wheel horizontal scrolling
    strip.onwheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        strip.scrollLeft += e.deltaY * 0.85;
        updateCatArrows();
      }
    };

    // Click & Drag Horizontal Scrolling
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    strip.onmousedown = (e) => {
      // Don't drag if clicking buttons directly with left click unless moving
      isDown = true;
      hasDragged = false;
      strip.classList.add('is-dragging');
      startX = e.pageX - strip.offsetLeft;
      scrollStart = strip.scrollLeft;
    };

    strip.onmouseleave = () => {
      if (isDown) {
        isDown = false;
        strip.classList.remove('is-dragging');
      }
    };

    strip.onmouseup = () => {
      if (isDown) {
        isDown = false;
        strip.classList.remove('is-dragging');
      }
    };

    strip.onmousemove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 4) {
        hasDragged = true;
      }
      strip.scrollLeft = scrollStart - walk;
      updateCatArrows();
    };

    // Suppress accidental click when user dragged
    strip.onclick = (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
        hasDragged = false;
      }
    };

    // Initial arrow state
    updateCatArrows();
    window.addEventListener('resize', updateCatArrows);
  }
`;

// Insert catControllerCode right above function renderHomepage
const renderHomepageTarget = '// --- POKI-STYLE HOMEPAGE RENDERER (ALL 187 GAMES DIRECTLY IN ASYMMETRIC MASONRY GRID) ---';
if (bundle.includes(renderHomepageTarget)) {
  bundle = bundle.replace(renderHomepageTarget, catControllerCode + '\n  ' + renderHomepageTarget);
  console.log('Added category navigation controller functions to bundle.js');
} else {
  console.error('Target renderHomepageTarget not found in bundle.js');
  process.exit(1);
}

// 2. Replace the old poki-cat-strip markup with poki-cat-nav-wrapper with left and right arrow buttons
const oldCatStripMarkup = `        <!-- Sleek Horizontal Category Navigation Bar -->
        <div class="poki-cat-strip" aria-label="Category Filters">
          <button type="button"
                  class="category-filter-btn poki-cat-pill \${selectedCat === 'all' ? 'active' : ''}"
                  data-slug="all"
                  onclick="window.NEXUS.filterCategory('all')">
            \${getCategoryIcon('all')}
            <span>All Games</span>
            <span class="category-btn-count">\${catalog.length}</span>
          </button>
          \${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = selectedCat === c.slug;
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
        </div>`;

const newCatStripMarkup = `        <!-- Sleek Horizontal Category Navigation Bar with Smooth Auto-Scroll & Arrows -->
        <div class="poki-cat-nav-wrapper" id="pokiCatNavWrapper">
          <button type="button" class="poki-cat-arrow poki-cat-arrow-left" id="pokiCatArrowLeft" aria-label="Previous categories" title="Previous categories" disabled>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="poki-cat-strip" id="pokiCatStrip" aria-label="Category Filters">
            <button type="button"
                    class="category-filter-btn poki-cat-pill \${selectedCat === 'all' ? 'active' : ''}"
                    data-slug="all"
                    onclick="window.NEXUS.filterCategory('all')">
              \${getCategoryIcon('all')}
              <span>All Games</span>
              <span class="category-btn-count">\${catalog.length}</span>
            </button>
            \${categoryList.map(c => {
              const count = categoryCounts[c.slug] || 0;
              if (count === 0) return '';
              const isActive = selectedCat === c.slug;
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
        </div>`;

if (bundle.includes(oldCatStripMarkup)) {
  bundle = bundle.replace(oldCatStripMarkup, newCatStripMarkup);
  console.log('Replaced category strip markup with wrapper and arrows.');
} else {
  console.error('Target oldCatStripMarkup not found in bundle.js');
  process.exit(1);
}

// 3. Initialize category navigation inside renderHomepage
const oldRenderHomepageEnd = `    main.innerHTML = html;
    initHeroSearch();
  }`;

const newRenderHomepageEnd = `    main.innerHTML = html;
    initHeroSearch();
    initCategoryNavigation();
    if (selectedCat && selectedCat !== 'all') {
      const activeBtn = document.querySelector(\`.category-filter-btn[data-slug="\${selectedCat}"]\`);
      if (activeBtn) {
        setTimeout(() => scrollCategoryIntoView(activeBtn), 150);
      }
    }
  }`;

if (bundle.includes(oldRenderHomepageEnd)) {
  bundle = bundle.replace(oldRenderHomepageEnd, newRenderHomepageEnd);
  console.log('Added initCategoryNavigation & auto-scroll call to renderHomepage.');
} else {
  console.error('Target oldRenderHomepageEnd not found in bundle.js');
  process.exit(1);
}

// 4. Update window.NEXUS.filterCategory to trigger scrollCategoryIntoView
const oldFilterCategoryActive = `      document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-slug') === catSlug);
      });`;

const newFilterCategoryActive = `      document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-slug') === catSlug);
      });

      const activeBtn = document.querySelector(\`.category-filter-btn[data-slug="\${catSlug}"]\`);
      if (activeBtn) {
        scrollCategoryIntoView(activeBtn);
      }`;

if (bundle.includes(oldFilterCategoryActive)) {
  bundle = bundle.replace(oldFilterCategoryActive, newFilterCategoryActive);
  console.log('Updated window.NEXUS.filterCategory to auto-scroll active button.');
} else {
  console.error('Target oldFilterCategoryActive not found in bundle.js');
  process.exit(1);
}

fs.writeFileSync('js/bundle.js', bundle, 'utf8');
console.log('Successfully updated js/bundle.js with all horizontal category navigation features!');


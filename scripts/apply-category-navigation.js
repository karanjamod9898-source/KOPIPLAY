const fs = require('fs');

let builder = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

// Replace using regex that matches both \r\n and \n
const oldBarRegex = /<!-- Category Shortcuts Bar -->\r?\n\s*<div class="category-quick-bar" style="margin-bottom: 20px;">\r?\n[\s\S]*?<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>/;

// Let's verify what matches
const startIdx = builder.indexOf('<!-- Category Shortcuts Bar -->');
const endIdx = builder.indexOf('${nexusAds.renderSlot(\'categoryBanner\')}', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const oldChunk = builder.substring(startIdx, endIdx);
  console.log('Found chunk of length:', oldChunk.length);

  const newChunk = `<!-- Horizontal Category Navigation Bar with Smooth Scroll & Edge Arrows -->
        <div class="category-nav-wrapper" aria-label="Category Navigation">
          <!-- Left Navigation Arrow & Subtle Edge Fade -->
          <div class="cat-nav-fade cat-nav-fade-left is-hidden" aria-hidden="true"></div>
          <button class="cat-nav-arrow cat-nav-prev is-hidden" aria-label="Previous categories" title="Scroll left" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- Horizontal Scroll Track -->
          <div class="category-quick-bar" id="categoryQuickBar">
            <a href="#/games" class="category-quick-pill \\\${!activeCatSlug ? 'active' : ''}" data-category="all">
              <span>All (\\\${catalog.length})</span>
            </a>
            \\\${categoryList.map(c => {
              const count = categoryCounts[c.slug] || 0;
              if (count === 0) return '';
              const isActive = activeCatSlug === c.slug;
              return \\\`
                <a href="#/category/\\\${c.slug}" class="category-quick-pill \\\${isActive ? 'active' : ''}" data-category="\\\${c.slug}">
                  <span>\\\${getCategoryIcon(c.slug)}</span>
                  <span>\\\${c.name} (\\\${count})</span>
                </a>
              \\\`;
            }).join('')}
          </div>

          <!-- Right Navigation Arrow & Subtle Edge Fade -->
          <div class="cat-nav-fade cat-nav-fade-right" aria-hidden="true"></div>
          <button class="cat-nav-arrow cat-nav-next" aria-label="Next categories" title="Scroll right" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      `;

  builder = builder.substring(0, startIdx) + newChunk + builder.substring(endIdx);
  console.log('Replaced chunk cleanly!');
} else {
  console.log('ERROR: indexes not found', startIdx, endIdx);
  process.exit(1);
}

// Now replace end of renderAllGamesView
const targetEnd = `main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  
  // --- Monetization & Reusable Ad Slot Component ---`;

// Normalize \r\n for matching
const normalizedBuilder = builder.replace(/\r\n/g, '\n');
const normalizedTargetEnd = targetEnd.replace(/\r\n/g, '\n');

if (normalizedBuilder.includes(normalizedTargetEnd)) {
  const initNavCode = `    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
    initCategoryNav(activeCatSlug);
  }

  // --- Category Navigation Bar Engine (Smooth Auto-Scroll & Edge Arrow System) ---
  function initCategoryNav(activeCatSlug) {
    const wrapper = document.querySelector('.category-nav-wrapper');
    if (!wrapper) return;
    const bar = wrapper.querySelector('.category-quick-bar');
    const prevBtn = wrapper.querySelector('.cat-nav-arrow.cat-nav-prev');
    const nextBtn = wrapper.querySelector('.cat-nav-arrow.cat-nav-next');
    const fadeLeft = wrapper.querySelector('.cat-nav-fade-left');
    const fadeRight = wrapper.querySelector('.cat-nav-fade-right');
    if (!bar) return;

    function updateArrows() {
      const maxScroll = Math.max(0, bar.scrollWidth - bar.clientWidth);
      const atStart = bar.scrollLeft <= 5;
      const atEnd = bar.scrollLeft >= maxScroll - 5;

      if (maxScroll <= 5) {
        if (prevBtn) { prevBtn.classList.add('is-hidden'); prevBtn.disabled = true; }
        if (nextBtn) { nextBtn.classList.add('is-hidden'); nextBtn.disabled = true; }
        if (fadeLeft) fadeLeft.classList.add('is-hidden');
        if (fadeRight) fadeRight.classList.add('is-hidden');
      } else {
        if (prevBtn) {
          prevBtn.classList.toggle('is-hidden', atStart);
          prevBtn.disabled = atStart;
        }
        if (nextBtn) {
          nextBtn.classList.toggle('is-hidden', atEnd);
          nextBtn.disabled = atEnd;
        }
        if (fadeLeft) fadeLeft.classList.toggle('is-hidden', atStart);
        if (fadeRight) fadeRight.classList.toggle('is-hidden', atEnd);
      }
    }

    function scrollToActivePill(smooth = true) {
      const activePill = bar.querySelector('.category-quick-pill.active');
      if (activePill) {
        const pillRect = activePill.getBoundingClientRect();
        const barRect = bar.getBoundingClientRect();
        const relativeLeft = pillRect.left - barRect.left + bar.scrollLeft;
        const targetScroll = relativeLeft - (bar.clientWidth / 2) + (activePill.offsetWidth / 2);
        bar.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: smooth ? 'smooth' : 'auto'
        });
      }
    }

    // Left and Right Arrow Navigation: moves 75% of visible container width
    if (prevBtn) {
      prevBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const scrollAmount = Math.round(bar.clientWidth * 0.75);
        bar.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      };
    }

    if (nextBtn) {
      nextBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const scrollAmount = Math.round(bar.clientWidth * 0.75);
        bar.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      };
    }

    // Auto-scroll when clicking category buttons so selected category is centered & reveals adjacent ones
    bar.querySelectorAll('.category-quick-pill').forEach(pill => {
      pill.addEventListener('click', function () {
        bar.querySelectorAll('.category-quick-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const pillRect = pill.getBoundingClientRect();
        const barRect = bar.getBoundingClientRect();
        const relativeLeft = pillRect.left - barRect.left + bar.scrollLeft;
        const targetScroll = relativeLeft - (bar.clientWidth / 2) + (pill.offsetWidth / 2);
        bar.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
      });
    });

    // Horizontal mouse wheel support
    bar.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.ctrlKey) {
        const maxScroll = bar.scrollWidth - bar.clientWidth;
        const canScrollLeft = e.deltaY < 0 && bar.scrollLeft > 0;
        const canScrollRight = e.deltaY > 0 && bar.scrollLeft < maxScroll;
        if (canScrollLeft || canScrollRight) {
          e.preventDefault();
          bar.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });

    bar.addEventListener('scroll', updateArrows, { passive: true });

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(function () {
        updateArrows();
      });
      ro.observe(bar);
    } else {
      window.addEventListener('resize', updateArrows, { passive: true });
    }

    // Initial positioning
    updateArrows();
    requestAnimationFrame(function () {
      scrollToActivePill(true);
      updateArrows();
    });
    setTimeout(function () {
      scrollToActivePill(true);
      updateArrows();
    }, 120);
  }

  // --- Monetization & Reusable Ad Slot Component ---`;

  const newNormalizedBuilder = normalizedBuilder.replace(normalizedTargetEnd, initNavCode);
  fs.writeFileSync('scripts/build-complete-bundle.js', newNormalizedBuilder, 'utf8');
  console.log('Successfully updated scripts/build-complete-bundle.js');
} else {
  console.log('ERROR: normalizedTargetEnd not found');
  process.exit(1);
}

require('./scripts/build-complete-bundle.js');
console.log('Rebuilt js/bundle.js successfully!');

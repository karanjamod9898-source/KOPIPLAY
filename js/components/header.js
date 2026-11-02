/**
 * KopiPlay - Header Navigation & Global Search Component
 */

import { getCategories, searchGames } from '../api.js';
import { getFavorites, subscribeState } from '../state.js';

export async function renderHeader() {
  const categories = await getCategories();
  const favCount = getFavorites().length;

  const categoriesHtml = categories.map(c => `
    <a href="#/category/${c.slug}" class="category-dropdown-item">
      <span class="category-icon">${c.icon}</span>
      <span>${c.name}</span>
    </a>
  `).join('');

  const mobileCategoriesHtml = categories.map(c => `
    <a href="#/category/${c.slug}" class="drawer-link drawer-category-link">
      <span>${c.icon}</span>
      <span>${c.name}</span>
    </a>
  `).join('');

  return `
    <header class="site-header">
      <div class="container header-inner">
        <div class="header-left">
          <a href="#/" class="brand-logo" aria-label="KopiPlay Home">
            <img src="assets/images/logo.svg" alt="KopiPlay" />
          </a>

          <nav class="nav-links" aria-label="Main Navigation">
            <div class="nav-item">
              <a href="#/" class="nav-link" id="nav-home">Home</a>
            </div>
            <div class="nav-item">
              <a href="#/games" class="nav-link" id="nav-all">All Games</a>
            </div>
            <div class="nav-item">
              <button class="nav-link" id="categories-trigger" aria-haspopup="true">
                <span>Categories</span>
                <span style="font-size: 0.7rem;">▼</span>
              </button>
              <div class="categories-dropdown" id="categories-dropdown">
                ${categoriesHtml}
              </div>
            </div>
            <div class="nav-item">
              <a href="#/games?filter=popular" class="nav-link">Popular</a>
            </div>
            <div class="nav-item">
              <a href="#/games?filter=new" class="nav-link">Recently Added</a>
            </div>
          </nav>
        </div>

        <div class="header-right">
          <!-- Search Bar -->
          <div class="search-wrapper">
            <div class="search-input-box">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                id="header-search-input" 
                class="search-input" 
                placeholder="Search games..." 
                autocomplete="off"
                aria-label="Search games"
              />
              <button class="search-clear-btn" id="search-clear-btn" style="display: none;">✕</button>
            </div>
            <div class="search-suggestions" id="search-suggestions"></div>
          </div>

          <!-- Favorites Link -->
          <a href="#/favorites" class="btn btn-secondary favorites-nav-btn" title="View Favorites">
            <span>❤️</span>
            <span class="fav-counter-badge" id="header-fav-count">${favCount}</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Open mobile menu">
            ☰
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <div class="mobile-drawer-overlay" id="mobile-drawer-overlay">
      <div class="mobile-drawer">
        <div class="drawer-header">
          <img src="assets/images/logo.svg" alt="KopiPlay" style="height: 32px;" />
          <button class="drawer-close-btn" id="drawer-close-btn">✕</button>
        </div>

        <ul class="drawer-links">
          <li><a href="#/" class="drawer-link">🏠 Home</a></li>
          <li><a href="#/games" class="drawer-link">🎮 All Games</a></li>
          <li><a href="#/games?filter=popular" class="drawer-link">🔥 Popular Games</a></li>
          <li><a href="#/games?filter=new" class="drawer-link">✨ Recently Added</a></li>
          <li><a href="#/favorites" class="drawer-link">❤️ My Favorites</a></li>
        </ul>

        <div class="drawer-categories-title">Categories</div>
        <div class="drawer-links">
          ${mobileCategoriesHtml}
        </div>
      </div>
    </div>
  `;
}

export function initHeaderEvents() {
  const searchInput = document.getElementById('header-search-input');
  const searchClear = document.getElementById('search-clear-btn');
  const suggestionsBox = document.getElementById('search-suggestions');
  const favCounter = document.getElementById('header-fav-count');

  // Update favorites counter on state change
  subscribeState(() => {
    if (favCounter) {
      favCounter.textContent = getFavorites().length;
    }
  });

  // Mobile Drawer Toggle
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerOpenBtn = document.getElementById('mobile-nav-toggle');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  if (drawerOpenBtn && drawerOverlay) {
    drawerOpenBtn.addEventListener('click', () => {
      drawerOverlay.classList.add('active');
    });
  }

  if (drawerCloseBtn && drawerOverlay) {
    drawerCloseBtn.addEventListener('click', () => {
      drawerOverlay.classList.remove('active');
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', e => {
      if (e.target === drawerOverlay) {
        drawerOverlay.classList.remove('active');
      }
    });

    // Close on navigation link click
    drawerOverlay.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        drawerOverlay.classList.remove('active');
      });
    });
  }

  // Live Search Autocomplete
  let debounceTimer = null;
  if (searchInput && suggestionsBox) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      searchClear.style.display = query ? 'block' : 'none';

      clearTimeout(debounceTimer);
      if (!query) {
        suggestionsBox.classList.remove('active');
        suggestionsBox.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(async () => {
        const matches = await searchGames(query);
        if (matches.length === 0) {
          suggestionsBox.innerHTML = `
            <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
              No games found for "<strong>${escapeHtml(query)}</strong>"
            </div>
          `;
        } else {
          suggestionsBox.innerHTML = matches.slice(0, 5).map(g => `
            <a href="#/game/${g.slug}" class="suggestion-item">
              <img src="${g.thumbnail || 'assets/images/games/default-game.svg'}" class="suggestion-thumb" alt="${g.title}" />
              <div class="suggestion-info">
                <div class="suggestion-title">${g.title}</div>
                <div class="suggestion-meta">${g.category} • ★ ${g.rating}</div>
              </div>
            </a>
          `).join('') + `
            <a href="#/search?q=${encodeURIComponent(query)}" class="suggestion-item" style="justify-content: center; color: var(--accent-cyan); font-weight: 700; font-size: 0.85rem;">
              View all results for "${escapeHtml(query)}" →
            </a>
          `;
        }
        suggestionsBox.classList.add('active');
      }, 200);
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          suggestionsBox.classList.remove('active');
          window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
        }
      } else if (e.key === 'Escape') {
        suggestionsBox.classList.remove('active');
      }
    });

    // Clear search
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        suggestionsBox.classList.remove('active');
        searchInput.focus();
      });
    }

    // Close suggestions on outside click
    document.addEventListener('click', e => {
      if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.remove('active');
      }
    });
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

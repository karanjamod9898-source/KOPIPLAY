/**
 * NEXUSPLAY - All Games View
 * Comprehensive catalog with multi-category filter and sorting
 */

import { getAllGames, getCategories } from '../api.js';
import { renderGameCard } from '../components/gameCard.js';
import { renderAdSlot } from '../components/adSlot.js';

export async function renderAllGamesView(filter = 'all', sort = 'popular', category = 'all') {
  const [allGames, categories] = await Promise.all([
    getAllGames(),
    getCategories()
  ]);

  let games = [...allGames];

  // Category filter
  if (category !== 'all') {
    games = games.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }

  // Type filter
  if (filter === 'popular') {
    games = games.filter(g => g.popular);
  } else if (filter === 'trending') {
    games = games.filter(g => g.badge === 'TRENDING' || g.badge === 'HOT');
  } else if (filter === 'new') {
    games = games.filter(g => g.badge === 'NEW' || (g.releaseDate && new Date(g.releaseDate) >= new Date('2026-10-01')));
    games.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));
  }

  // Sorting
  if (sort === 'rating') {
    games.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'newest') {
    games.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (sort === 'title') {
    games.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Category chips
  const categoryChips = categories.map(c => `
    <button 
      class="category-chip ${category.toLowerCase() === c.slug.toLowerCase() ? 'active' : ''}" 
      data-cat="${c.slug}"
    >
      <span>${c.icon}</span>
      <span>${c.name}</span>
    </button>
  `).join('');

  return `
    <div class="container">
      <div style="margin-bottom: 28px;">
        <h1 style="font-size: 2.4rem; margin-bottom: 8px;">Explore All Games</h1>
        <p style="color: var(--text-secondary); max-width: 600px;">
          Discover our entire library of free HTML5 browser games. Filter by genre, popularity, or rating and jump in instantly.
        </p>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-filter-bar" id="all-games-cats">
        <button class="category-chip ${category === 'all' ? 'active' : ''}" data-cat="all">
          <span>🎮</span>
          <span>All (${allGames.length})</span>
        </button>
        ${categoryChips}
      </div>

      <!-- Controls Row: Filter Tags & Sorting -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="filter-tabs">
          <button class="category-chip ${filter === 'all' ? 'active' : ''}" data-filter="all">All Games</button>
          <button class="category-chip ${filter === 'popular' ? 'active' : ''}" data-filter="popular">🔥 Most Popular</button>
          <button class="category-chip ${filter === 'trending' ? 'active' : ''}" data-filter="trending">⚡ Trending</button>
          <button class="category-chip ${filter === 'new' ? 'active' : ''}" data-filter="new">✨ New Releases</button>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <label for="all-sort" style="font-size: 0.85rem; color: var(--text-muted);">Sort By:</label>
          <select id="all-sort" style="padding: 6px 12px; font-size: 0.88rem; background: var(--bg-secondary);">
            <option value="popular" ${sort === 'popular' ? 'selected' : ''}>Most Popular</option>
            <option value="rating" ${sort === 'rating' ? 'selected' : ''}>Highest Rated</option>
            <option value="newest" ${sort === 'newest' ? 'selected' : ''}>Newest First</option>
            <option value="title" ${sort === 'title' ? 'selected' : ''}>Title (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Games Grid -->
      ${games.length > 0 ? `
        <div class="games-grid">
          ${games.map(renderGameCard).join('')}
        </div>
      ` : `
        <div class="glass-panel" style="padding: 48px; text-align: center;">
          <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
          <h3>No Games Found</h3>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Try clearing your filters to see more results.</p>
          <a href="#/games" class="btn btn-primary">Reset Filters</a>
        </div>
      `}

      <!-- Ad Slot -->
      ${renderAdSlot('leaderboard')}
    </div>
  `;
}

export function initAllGamesEvents(currentFilter, currentSort, currentCategory) {
  // Category tabs
  const catBar = document.getElementById('all-games-cats');
  if (catBar) {
    catBar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        updateQuery({ category: cat });
      });
    });
  }

  // Filter tabs
  const filterTabs = document.getElementById('filter-tabs');
  if (filterTabs) {
    filterTabs.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        updateQuery({ filter: f });
      });
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('all-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      updateQuery({ sort: e.target.value });
    });
  }

  function updateQuery(newParams) {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    if (newParams.category !== undefined) {
      if (newParams.category === 'all') params.delete('category');
      else params.set('category', newParams.category);
    }
    if (newParams.filter !== undefined) {
      if (newParams.filter === 'all') params.delete('filter');
      else params.set('filter', newParams.filter);
    }
    if (newParams.sort !== undefined) {
      if (newParams.sort === 'popular') params.delete('sort');
      else params.set('sort', newParams.sort);
    }
    const qs = params.toString();
    window.location.hash = qs ? `#/games?${qs}` : `#/games`;
  }
}

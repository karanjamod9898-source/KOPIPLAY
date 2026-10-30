/**
 * NEXUSPLAY - Category Page View
 * Shows games filtered by category with sorting, sub-filters, and metadata
 */

import { getCategoryBySlug, getGamesByCategory, getCategories } from '../api.js';
import { renderGameCard } from '../components/gameCard.js';
import { renderAdSlot } from '../components/adSlot.js';

export async function renderCategoryView(slug, currentFilter = 'all', sortBy = 'popular') {
  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories()
  ]);

  if (!category) {
    return `
      <div class="container" style="text-align: center; padding: 60px 20px;">
        <h1 style="font-size: 2.2rem; margin-bottom: 16px;">Category Not Found</h1>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">The selected category does not exist.</p>
        <a href="#/games" class="btn btn-primary">Browse All Games</a>
      </div>
    `;
  }

  let games = await getGamesByCategory(category.name);

  // Sub filtering
  if (currentFilter === 'trending') {
    games = games.filter(g => g.badge === 'TRENDING' || g.badge === 'HOT');
  } else if (currentFilter === 'popular') {
    games = games.filter(g => g.popular);
  } else if (currentFilter === 'new') {
    games = games.filter(g => g.badge === 'NEW');
  }

  // Sorting
  if (sortBy === 'rating') {
    games.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'newest') {
    games.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (sortBy === 'title') {
    games.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Other categories chips
  const otherCats = categories.filter(c => c.slug !== category.slug);

  return `
    <div class="container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <a href="#/games" class="breadcrumb-link">Categories</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${category.name}</span>
      </nav>

      <!-- Category Hero Banner -->
      <div class="glass-panel" style="padding: 32px; margin-bottom: 32px; border-left: 4px solid ${category.color || '#00f0ff'};">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
          <span style="font-size: 2.6rem;">${category.icon}</span>
          <div>
            <h1 style="font-size: 2.2rem; margin-bottom: 4px;">${category.name} Games</h1>
            <p style="color: var(--text-secondary); font-size: 1rem; max-width: 650px;">
              ${category.description}
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px;">
          <span class="badge badge-top">${games.length} Games Available</span>
          <span class="badge badge-hot">Instant Browser Play</span>
        </div>
      </div>

      <!-- Controls Row: Filters and Sorter -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="#/category/${slug}" class="category-chip ${currentFilter === 'all' ? 'active' : ''}">All</a>
          <a href="#/category/${slug}?filter=popular" class="category-chip ${currentFilter === 'popular' ? 'active' : ''}">Popular</a>
          <a href="#/category/${slug}?filter=trending" class="category-chip ${currentFilter === 'trending' ? 'active' : ''}">Trending</a>
          <a href="#/category/${slug}?filter=new" class="category-chip ${currentFilter === 'new' ? 'active' : ''}">New</a>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <label for="category-sort" style="font-size: 0.85rem; color: var(--text-muted);">Sort By:</label>
          <select id="category-sort" style="padding: 6px 12px; font-size: 0.88rem; background: var(--bg-secondary);">
            <option value="popular" ${sortBy === 'popular' ? 'selected' : ''}>Most Popular</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
            <option value="newest" ${sortBy === 'newest' ? 'selected' : ''}>Newest First</option>
            <option value="title" ${sortBy === 'title' ? 'selected' : ''}>Title (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Games Grid or Empty State -->
      ${games.length > 0 ? `
        <div class="games-grid">
          ${games.map(renderGameCard).join('')}
        </div>
      ` : `
        <div class="glass-panel" style="padding: 48px 24px; text-align: center; margin-bottom: 40px;">
          <div style="font-size: 40px; margin-bottom: 12px;">🕹️</div>
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No games match this filter</h3>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Try switching to 'All' to view all available ${category.name} games.</p>
          <a href="#/category/${slug}" class="btn btn-secondary">Reset Filters</a>
        </div>
      `}

      <!-- Ad Slot -->
      ${renderAdSlot('leaderboard')}

      <!-- Explore Other Categories -->
      <section style="margin-top: 40px;">
        <h3 style="font-size: 1.2rem; margin-bottom: 16px;">Explore Other Genres</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${otherCats.map(c => `
            <a href="#/category/${c.slug}" class="category-chip">
              <span>${c.icon}</span>
              <span>${c.name}</span>
            </a>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

export function initCategoryEvents(slug, currentFilter) {
  const sortSelect = document.getElementById('category-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      const newSort = e.target.value;
      const filterPart = currentFilter !== 'all' ? `?filter=${currentFilter}&sort=${newSort}` : `?sort=${newSort}`;
      window.location.hash = `#/category/${slug}${filterPart}`;
    });
  }
}

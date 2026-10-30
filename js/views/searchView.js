/**
 * NEXUSPLAY - Search Results View
 * Dedicated search results page with filter pills and query refinement
 */

import { searchGames, getCategories } from '../api.js';
import { renderGameCard } from '../components/gameCard.js';
import { renderAdSlot } from '../components/adSlot.js';

export async function renderSearchView(query = '', category = '') {
  const [results, categories] = await Promise.all([
    searchGames(query, category),
    getCategories()
  ]);

  const catChips = categories.map(c => `
    <a 
      href="#/search?q=${encodeURIComponent(query)}&category=${c.slug}" 
      class="category-chip ${category.toLowerCase() === c.slug.toLowerCase() ? 'active' : ''}"
    >
      <span>${c.icon}</span>
      <span>${c.name}</span>
    </a>
  `).join('');

  return `
    <div class="container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Search Results</span>
      </nav>

      <div style="margin-bottom: 28px;">
        <h1 style="font-size: 2.2rem; margin-bottom: 8px;">
          Search Results ${query ? `for "<span class="gradient-text">${escapeHtml(query)}</span>"` : ''}
        </h1>
        <p style="color: var(--text-secondary);">
          Found <strong>${results.length}</strong> matching game${results.length === 1 ? '' : 's'}.
        </p>
      </div>

      <!-- Refine Search Input -->
      <div class="glass-panel" style="padding: 18px 24px; margin-bottom: 28px;">
        <form id="refine-search-form" style="display: flex; gap: 12px; align-items: center; max-width: 600px;">
          <input 
            type="text" 
            id="refine-search-input" 
            value="${escapeHtml(query)}" 
            placeholder="Search by title, tag, or genre..." 
            style="flex: 1;"
          />
          <button type="submit" class="btn btn-primary">Search</button>
          ${query ? `<a href="#/search" class="btn btn-secondary">Clear</a>` : ''}
        </form>

        <!-- Category filter row -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px;">
          <a href="#/search?q=${encodeURIComponent(query)}" class="category-chip ${!category ? 'active' : ''}">
            All Genres
          </a>
          ${catChips}
        </div>
      </div>

      <!-- Results Grid or Empty State -->
      ${results.length > 0 ? `
        <div class="games-grid">
          ${results.map(renderGameCard).join('')}
        </div>
      ` : `
        <div class="glass-panel" style="padding: 60px 24px; text-align: center; margin-bottom: 40px;">
          <div style="font-size: 52px; margin-bottom: 16px;">🔎</div>
          <h2 style="font-size: 1.6rem; margin-bottom: 8px;">No Games Found</h2>
          <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 24px auto;">
            We couldn't find any games matching "${escapeHtml(query)}". Try searching for "racing", "snake", "space", or "2048".
          </p>
          <a href="#/games" class="btn btn-primary">View All Games</a>
        </div>
      `}

      <!-- Ad Slot -->
      ${renderAdSlot('leaderboard')}
    </div>
  `;
}

export function initSearchEvents() {
  const form = document.getElementById('refine-search-form');
  const input = document.getElementById('refine-search-input');

  if (form && input) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = input.value.trim();
      window.location.hash = q ? `#/search?q=${encodeURIComponent(q)}` : `#/search`;
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

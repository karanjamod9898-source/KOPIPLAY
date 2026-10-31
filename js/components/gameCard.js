/**
 * KipoPlay - Game Card Component
 * Renders an attractive, responsive game card with fallback image and favorite toggle
 */

import { isFavorite, toggleFavorite } from '../state.js';
import { showToast } from './toast.js';

export function renderGameCard(game) {
  const isFav = isFavorite(game.id);
  const badgeClass = game.badge ? `badge-${game.badge.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : '';
  const fallbackThumb = game.fallbackThumbnail || 'assets/images/games/default-game.svg';
  const primaryThumb = game.thumbnail || fallbackThumb;

  return `
    <article class="game-card" data-id="${game.id}">
      <div class="card-media">
        <img 
          src="${primaryThumb}" 
          alt="${game.title}" 
          class="card-thumb" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${fallbackThumb}';"
        />
        ${game.badge ? `<span class="badge ${badgeClass} card-badge">${game.badge}</span>` : ''}
        <button 
          class="card-fav-btn ${isFav ? 'is-fav' : ''}" 
          aria-label="Save ${game.title} to favorites"
          data-fav-id="${game.id}"
          title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
        >
          ${isFav ? '❤️' : '🤍'}
        </button>
        <a href="#/game/${game.slug}" class="card-play-overlay" aria-label="Play ${game.title}">
          <div class="card-play-btn">▶</div>
        </a>
      </div>
      <div class="card-details">
        <a href="#/game/${game.slug}">
          <h3 class="card-title" title="${game.title}">${game.title}</h3>
        </a>
        <div class="card-meta-row">
          <span class="card-category-tag">${game.category}</span>
          <span class="card-tech-tag">${game.technology || 'HTML5'}</span>
        </div>
        <a href="#/game/${game.slug}" class="card-play-now-btn" aria-label="Play ${game.title} now">
          <span>Play Now</span>
          <span class="play-arrow">▶</span>
        </a>
      </div>
    </article>
  `;
}

// Global click delegation for game card favorites
export function initGameCardEvents() {
  document.addEventListener('click', e => {
    const favBtn = e.target.closest('.card-fav-btn');
    if (!favBtn) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const gameId = favBtn.dataset.favId;
    if (gameId) {
      const added = toggleFavorite(gameId);
      favBtn.classList.toggle('is-fav', added);
      favBtn.innerHTML = added ? '❤️' : '🤍';
      favBtn.title = added ? 'Remove from favorites' : 'Add to favorites';
      showToast(added ? 'Saved to Favorites!' : 'Removed from Favorites', added ? '❤️' : '💔');
    }
  });
}

/**
 * NEXUSPLAY - Hero Section Component
 * Displays the main featured game with genuine technical specs, controls, and play CTA
 */

import { isFavorite, toggleFavorite } from '../state.js';
import { showToast } from './toast.js';

export function renderHero(featuredGame) {
  if (!featuredGame) return '';

  const isFav = isFavorite(featuredGame.id);
  const fallbackThumb = featuredGame.fallbackThumbnail || 'assets/images/games/default-game.svg';
  const primaryThumb = featuredGame.thumbnail || fallbackThumb;

  return `
    <section class="hero-section">
      <div 
        class="hero-backdrop" 
        style="background-image: url('${primaryThumb}');"
      ></div>
      <div class="hero-overlay-grad"></div>
      
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-tagline">
            <span>🔥</span>
            <span>Featured Title</span>
            <span class="badge badge-hot">${featuredGame.badge || 'VERIFIED PLAYABLE'}</span>
          </div>
          
          <h1 class="hero-title">${featuredGame.title}</h1>
          <p class="hero-description">${featuredGame.description}</p>
          
          <div class="hero-meta">
            <div class="hero-meta-item">
              <span>🎮</span>
              <span>${featuredGame.category}</span>
            </div>
            <div class="hero-meta-item">
              <span>⚡</span>
              <span><strong>${featuredGame.technology || 'HTML5'}</strong></span>
            </div>
            <div class="hero-meta-item">
              <span>🕹️</span>
              <span>${featuredGame.controlsType || 'Keyboard & Touch'}</span>
            </div>
            <div class="hero-meta-item">
              <span>🏢</span>
              <span>${featuredGame.developer || 'Mirra Games'}</span>
            </div>
          </div>
          
          <div class="hero-actions">
            <a href="#/game/${featuredGame.slug}" class="btn btn-primary" id="hero-play-btn">
              <span>▶</span>
              <span>PLAY NOW</span>
            </a>
            <button 
              class="btn btn-secondary" 
              id="hero-fav-btn" 
              data-hero-fav-id="${featuredGame.id}"
            >
              <span>${isFav ? '❤️' : '🤍'}</span>
              <span>${isFav ? 'In Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>
        </div>
        
        <div class="hero-preview-box">
          <img 
            src="${primaryThumb}" 
            alt="${featuredGame.title}" 
            loading="eager"
            onerror="this.onerror=null; this.src='${fallbackThumb}';"
          />
          <a href="#/game/${featuredGame.slug}" class="hero-play-icon" aria-label="Play ${featuredGame.title}">
            <div class="play-circle">▶</div>
          </a>
        </div>
      </div>
    </section>
  `;
}

export function initHeroEvents() {
  document.addEventListener('click', e => {
    const heroFavBtn = e.target.closest('#hero-fav-btn');
    if (!heroFavBtn) return;

    const gameId = heroFavBtn.dataset.heroFavId;
    if (gameId) {
      const added = toggleFavorite(gameId);
      heroFavBtn.innerHTML = `
        <span>${added ? '❤️' : '🤍'}</span>
        <span>${added ? 'In Favorites' : 'Add to Favorites'}</span>
      `;
      showToast(added ? 'Saved to Favorites!' : 'Removed from Favorites', added ? '❤️' : '💔');
    }
  });
}

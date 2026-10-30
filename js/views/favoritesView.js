/**
 * NEXUSPLAY - Favorites Page View
 * Shows saved bookmarked games from localStorage
 */

import { getAllGames } from '../api.js';
import { getFavorites, clearFavorites } from '../state.js';
import { renderGameCard } from '../components/gameCard.js';
import { renderAdSlot } from '../components/adSlot.js';
import { showToast } from '../components/toast.js';

export async function renderFavoritesView() {
  const [allGames] = await Promise.all([getAllGames()]);
  const favIds = getFavorites();
  const favGames = favIds.map(id => allGames.find(g => g.id === id)).filter(Boolean);

  return `
    <div class="container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Favorites</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 28px;">
        <div>
          <h1 style="font-size: 2.2rem; margin-bottom: 6px;">Your Favorite Games</h1>
          <p style="color: var(--text-secondary);">
            Saved locally on your browser. Jump back in anytime without signing in!
          </p>
        </div>

        ${favGames.length > 0 ? `
          <button class="btn btn-secondary" id="clear-favs-btn">
            <span>🗑️</span>
            <span>Clear All Favorites</span>
          </button>
        ` : ''}
      </div>

      ${favGames.length > 0 ? `
        <div class="games-grid">
          ${favGames.map(renderGameCard).join('')}
        </div>
      ` : `
        <div class="glass-panel" style="padding: 60px 24px; text-align: center; margin-bottom: 40px;">
          <div style="font-size: 52px; margin-bottom: 16px;">💔</div>
          <h2 style="font-size: 1.6rem; margin-bottom: 8px;">No Favorites Saved Yet</h2>
          <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 24px auto;">
            Click the heart icon on any game card to bookmark it here for quick access later!
          </p>
          <a href="#/games" class="btn btn-primary">Browse Top Games</a>
        </div>
      `}

      <!-- Ad Slot -->
      ${renderAdSlot('leaderboard')}
    </div>
  `;
}

export function initFavoritesEvents() {
  const clearBtn = document.getElementById('clear-favs-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all your saved favorite games?')) {
        clearFavorites();
        showToast('All favorites cleared', '🗑️');
        window.location.reload();
      }
    });
  }
}

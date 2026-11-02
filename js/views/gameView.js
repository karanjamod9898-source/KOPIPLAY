/**
 * KopiPlay - Individual Game Page View & Player Controller
 * Handles iframe embedding, loading spinner, error fallback, fullscreen, theater mode,
 * controls guide, metadata, and related games
 */

import { getGameBySlug, getRelatedGames } from '../api.js';
import { isFavorite, toggleFavorite, addRecentlyPlayed } from '../state.js';
import { renderGameCard } from '../components/gameCard.js';
import { renderAdSlot } from '../components/adSlot.js';
import { showToast } from '../components/toast.js';

export async function renderGameView(slug) {
  const game = await getGameBySlug(slug);

  if (!game) {
    return `
      <div class="container" style="text-align: center; padding: 60px 20px;">
        <h1 style="font-size: 2.5rem; margin-bottom: 16px;">Game Not Found</h1>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">The game you are searching for does not exist or has been moved.</p>
        <a href="#/games" class="btn btn-primary">Browse All Games</a>
      </div>
    `;
  }

  // Record this game in recently played
  addRecentlyPlayed(game.id);

  const relatedGames = await getRelatedGames(game, 4);
  const isFav = isFavorite(game.id);

  // Generate interactive keycaps from controls description
  const keyMatches = game.controls.match(/\b(WASD|W|A|S|D|Arrow Keys|Left|Right|Up|Down|Space|Spacebar|Left Click|Click|Touch|Enter|Shift|P)\b/gi) || [];
  const uniqueKeys = [...new Set(keyMatches.map(k => k.toUpperCase()))];
  const keycapsHtml = uniqueKeys.map(k => `<span class="keycap">${k}</span>`).join(' ');

  // Demo status checking
  const isDemo = !game.embedAllowed || !game.gameUrl;

  return `
    <div class="container" id="game-page-container">
      <!-- Breadcrumbs -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <a href="#/category/${game.category.toLowerCase()}" class="breadcrumb-link">${game.category}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${game.title}</span>
      </nav>

      <!-- Demo Notification if embed is not configured -->
      ${isDemo ? `
        <div class="demo-game-banner">
          <span class="demo-banner-icon">ℹ️</span>
          <div>
            <div class="demo-banner-title">Demo Catalog Entry • Embedding Not Configured</div>
            <div class="demo-banner-text">
              ${game.instructions || 'This game is currently in preview mode. To enable browser gameplay, configure an authorized embedUrl or bundle in games.json.'}
            </div>
          </div>
        </div>
      ` : ''}

      <div class="game-detail-layout" id="game-layout">
        <!-- Main Column: Player, Controls, and Description -->
        <div class="game-main-col">
          <!-- Game Player Container -->
          <div class="player-container" id="player-container">
            <!-- Loading Indicator -->
            <div class="player-loader" id="player-loader">
              <div class="loader-spinner"></div>
              <div class="loader-text">INITIALIZING ${game.title.toUpperCase()}...</div>
            </div>

            <!-- Error State Container -->
            <div class="player-error" id="player-error">
              <div class="error-icon">⚠️</div>
              <h2 class="error-title">Unable to Load Game</h2>
              <p class="error-desc">
                The game player encountered an issue or the remote host restricted frame embedding. You can retry loading or play directly in a new browser window.
              </p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                <button class="btn btn-primary" id="player-retry-btn">
                  <span>🔄</span>
                  <span>Retry Game</span>
                </button>
                ${game.gameUrl ? `
                  <a href="${game.gameUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" id="player-open-tab-btn">
                    <span>↗</span>
                    <span>Open Game in New Tab</span>
                  </a>
                ` : ''}
              </div>
            </div>

            <!-- Game Iframe or Demo Screen -->
            ${!isDemo ? `
              <iframe 
                src="${game.gameUrl}" 
                id="game-iframe"
                class="game-iframe" 
                title="${game.title}"
                allow="fullscreen; autoplay; gamepad; keyboard"
                allowfullscreen
                loading="eager"
              ></iframe>
            ` : `
              <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0c101d; padding: 24px; text-align: center;">
                <img src="${game.thumbnail || 'assets/images/games/default-game.svg'}" style="width: 140px; height: 90px; border-radius: 8px; margin-bottom: 16px; object-fit: cover;" alt="${game.title}" />
                <h3 style="margin-bottom: 8px;">${game.title} (Catalog Preview)</h3>
                <p style="color: var(--text-muted); max-width: 420px; font-size: 0.9rem; margin-bottom: 18px;">
                  This game record is saved in our catalog with full controls and metadata, but embedding is restricted.
                </p>
                <a href="#/games" class="btn btn-secondary">Explore Other Playable Games</a>
              </div>
            `}
          </div>

          <!-- Player Controls Toolbar -->
          <div class="player-controls-bar">
            <div class="player-controls-left">
              <a href="#/games" class="control-btn" title="Back to Games catalog">
                <span>◀</span>
                <span>Back to Games</span>
              </a>
              <button class="control-btn" id="ctrl-reload-btn" title="Reload game">
                <span>🔄</span>
                <span>Restart</span>
              </button>
              <button class="control-btn" id="ctrl-theater-btn" title="Toggle Theater Mode">
                <span>⛶</span>
                <span>Theater</span>
              </button>
            </div>

            <div class="player-controls-right">
              <button class="control-btn fav-btn ${isFav ? 'is-fav' : ''}" id="ctrl-fav-btn" data-game-id="${game.id}">
                <span>${isFav ? '❤️' : '🤍'}</span>
                <span>${isFav ? 'Favorited' : 'Favorite'}</span>
              </button>
              <button class="control-btn" id="ctrl-share-btn" title="Share game link">
                <span>🔗</span>
                <span>Share</span>
              </button>
              ${game.gameUrl ? `
                <a href="${game.gameUrl}" target="_blank" rel="noopener noreferrer" class="control-btn" id="ctrl-open-tab-btn" title="Open game in new window">
                  <span>↗</span>
                  <span>New Tab</span>
                </a>
              ` : ''}
              <button class="control-btn btn-primary" id="ctrl-fullscreen-btn" title="Enter Fullscreen Mode">
                <span>⛶</span>
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          <!-- Game Metadata & Information -->
          <article class="game-info-card">
            <div class="game-header-row">
              <div class="game-title-group">
                <h1>${game.title}</h1>
                  <a href="#/category/${game.category.toLowerCase()}" class="badge badge-top">${game.category}</a>
                  ${game.badge ? `<span class="badge badge-hot">${game.badge}</span>` : ''}
                  <span class="badge badge-new">VERIFIED PLAYABLE</span>
                  <span class="badge badge-trending">${game.technology || 'HTML5'}</span>
                  <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 6px;">Provider: <strong>${game.developer}</strong></span>
                </div>
              </div>
            </div>

            <!-- Controls Visual Keycaps Box -->
            <div class="game-controls-box">
              <div class="controls-heading">
                <span>⌨️</span>
                <span>Verified Game Controls (${game.controlsType || 'Keyboard & Touch'})</span>
              </div>
              <div class="controls-content">
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${keycapsHtml}
                </div>
                <div class="controls-text">${game.controls}</div>
              </div>
            </div>

            <!-- Description & Instructions -->
            <h3 style="font-size: 1.15rem; margin-bottom: 10px;">About This Game</h3>
            <p class="game-description-text">${game.description}</p>

            ${game.instructions ? `
              <h4 style="font-size: 0.98rem; margin-bottom: 8px; color: var(--accent-cyan);">How to Play & Objectives</h4>
              <div class="game-instructions-box">
                ${game.instructions}
              </div>
            ` : ''}

            <!-- Provider & Compliance Notice -->
            <div style="background: rgba(14, 20, 35, 0.7); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px 16px; margin-top: 16px; font-size: 0.82rem; color: var(--text-muted);">
              <strong>Publisher & Licensing Notice:</strong> 
              ${game.id === 'epic-racing-01' ? 
                'Officially distributed via authorized GameDistribution HTML5 WebGL integration. Developed by Mirra Games. All advertising, game distribution SDK behaviors, and original copyrights are preserved in accordance with provider licensing.' : 
                'Self-hosted native HTML5 game application developed for the KopiPlay portal platform.'}
            </div>

            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 14px;">
              Developer: <strong>${game.developer || 'Kipo Certified Developer'}</strong>
            </div>

            <!-- Tag Chips -->
            ${game.tags ? `
              <div class="game-tags-list">
                ${game.tags.map(tag => `<span class="game-tag-chip">#${tag}</span>`).join('')}
              </div>
            ` : ''}
          </article>

          <!-- Monetization Banner -->
          ${renderAdSlot('leaderboard')}
        </div>

        <!-- Sidebar: Ad Slot and Recommended Games -->
        <aside class="game-sidebar">
          ${renderAdSlot('rectangle')}

          <div class="glass-panel" style="padding: 20px;">
            <h3 style="font-size: 1.1rem; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
              <span>🔥</span>
              <span>More in ${game.category}</span>
            </h3>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              ${relatedGames.map(g => `
                <a href="#/game/${g.slug}" style="display: flex; gap: 12px; align-items: center; padding: 6px; border-radius: 8px; transition: background 0.2s;" class="hover-item">
                  <img src="${g.thumbnail || 'assets/images/games/default-game.svg'}" style="width: 70px; height: 48px; border-radius: 6px; object-fit: cover;" alt="${g.title}" />
                  <div>
                    <div style="font-weight: 700; font-size: 0.88rem; color: #fff;">${g.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">★ ${g.rating} • ${g.plays}</div>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        </aside>
      </div>

      <!-- Related Games Section Below -->
      <section class="section-wrapper" style="margin-top: 20px;">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🎮</span>
            <h2 class="section-title">You Might Also Like</h2>
          </div>
          <a href="#/category/${game.category.toLowerCase()}" class="view-all-link">Browse ${game.category} →</a>
        </div>
        <div class="games-grid">
          ${relatedGames.map(renderGameCard).join('')}
        </div>
      </section>
    </div>
  `;
}

export function initGamePlayerEvents() {
  const iframe = document.getElementById('game-iframe');
  const loader = document.getElementById('player-loader');
  const errorScreen = document.getElementById('player-error');
  const retryBtn = document.getElementById('player-retry-btn');
  const reloadBtn = document.getElementById('ctrl-reload-btn');
  const fullscreenBtn = document.getElementById('ctrl-fullscreen-btn');
  const theaterBtn = document.getElementById('ctrl-theater-btn');
  const shareBtn = document.getElementById('ctrl-share-btn');
  const favBtn = document.getElementById('ctrl-fav-btn');
  const playerContainer = document.getElementById('player-container');
  const gameLayout = document.getElementById('game-layout');

  // If there's an iframe, handle load and error states
  if (iframe && loader) {
    // Hide loader once iframe completes loading
    iframe.addEventListener('load', () => {
      loader.classList.add('hidden');
    });

    // Timeout safety fallback in case iframe fails or blocks
    const loadTimeout = setTimeout(() => {
      if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
      }
    }, 4000);

    iframe.addEventListener('error', () => {
      clearTimeout(loadTimeout);
      loader.classList.add('hidden');
      if (errorScreen) errorScreen.classList.add('active');
    });
  } else if (loader) {
    loader.classList.add('hidden');
  }

  // Retry Button
  if (retryBtn && iframe) {
    retryBtn.addEventListener('click', () => {
      if (errorScreen) errorScreen.classList.remove('active');
      if (loader) loader.classList.remove('hidden');
      const currentSrc = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    });
  }

  // Reload / Restart Button
  if (reloadBtn && iframe) {
    reloadBtn.addEventListener('click', () => {
      if (loader) loader.classList.remove('hidden');
      const currentSrc = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    });
  }

  // Fullscreen Mode API
  if (fullscreenBtn && playerContainer) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (playerContainer.requestFullscreen) {
          playerContainer.requestFullscreen();
        } else if (playerContainer.webkitRequestFullscreen) {
          playerContainer.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });

    document.addEventListener('fullscreenchange', () => {
      const isFull = !!document.fullscreenElement;
      playerContainer.classList.toggle('is-fullscreen', isFull);
      fullscreenBtn.innerHTML = isFull ? '<span>✕</span><span>Exit Fullscreen</span>' : '<span>⛶</span><span>Fullscreen</span>';
    });
  }

  // Theater Mode Toggle
  if (theaterBtn && gameLayout) {
    theaterBtn.addEventListener('click', () => {
      gameLayout.classList.toggle('theater-mode');
      const isTheater = gameLayout.classList.contains('theater-mode');
      theaterBtn.classList.toggle('active', isTheater);
      theaterBtn.innerHTML = isTheater ? '<span>⏹</span><span>Default View</span>' : '<span>⛶</span><span>Theater</span>';
    });
  }

  // Favorite Button
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const gameId = favBtn.dataset.gameId;
      if (gameId) {
        const added = toggleFavorite(gameId);
        favBtn.classList.toggle('is-fav', added);
        favBtn.innerHTML = `
          <span>${added ? '❤️' : '🤍'}</span>
          <span>${added ? 'Favorited' : 'Favorite'}</span>
        `;
        showToast(added ? 'Saved to Favorites!' : 'Removed from Favorites', added ? '❤️' : '💔');
      }
    });
  }

  // Share Button
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Game link copied to clipboard!', '📋');
      } catch (err) {
        // Fallback prompt
        prompt('Copy game URL:', window.location.href);
      }
    });
  }
}

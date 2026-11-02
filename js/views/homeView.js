/**
 * KopiPlay - Homepage View
 * Main landing portal with Hero, Category Pills, Trending, Popular, and Genre sections
 */

import { 
  getAllGames, 
  getFeaturedGames, 
  getTrendingGames, 
  getPopularGames, 
  getNewGames, 
  getGamesByCategory, 
  getCategories 
} from '../api.js';
import { getFavorites, getRecentlyPlayed } from '../state.js';
import { renderHero } from '../components/hero.js';
import { renderGameCard } from '../components/gameCard.js';
import { renderAdSlot } from '../components/adSlot.js';

export async function renderHomeView() {
  const [games, categories, featured, trending, popular, newGames] = await Promise.all([
    getAllGames(),
    getCategories(),
    getFeaturedGames(),
    getTrendingGames(),
    getPopularGames(),
    getNewGames()
  ]);

  const featuredGame = featured[0] || games[0];
  const heroHtml = renderHero(featuredGame);

  // Category filter chips
  const categoryChipsHtml = categories.map(c => `
    <a href="#/category/${c.slug}" class="category-chip">
      <span>${c.icon}</span>
      <span>${c.name}</span>
    </a>
  `).join('');

  // Favorites & Recently played
  const favIds = getFavorites();
  const recentIds = getRecentlyPlayed();

  const favGames = games.filter(g => favIds.includes(g.id));
  const recentGames = recentIds.map(id => games.find(g => g.id === id)).filter(Boolean);

  let userSectionsHtml = '';

  if (recentGames.length > 0) {
    userSectionsHtml += `
      <section class="section-wrapper" style="margin-bottom: 32px;">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🕒</span>
            <h2 class="section-title">Jump Back In (Recently Played)</h2>
          </div>
        </div>
        <div class="games-grid">
          ${recentGames.slice(0, 4).map(renderGameCard).join('')}
        </div>
      </section>
    `;
  }

  if (favGames.length > 0) {
    userSectionsHtml += `
      <section class="section-wrapper" style="margin-bottom: 32px;">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">❤️</span>
            <h2 class="section-title">Your Favorite Games</h2>
          </div>
          <a href="#/favorites" class="view-all-link">View All Favorites →</a>
        </div>
        <div class="games-grid">
          ${favGames.slice(0, 4).map(renderGameCard).join('')}
        </div>
      </section>
    `;
  }

  // Genre specific games
  const racingGames = await getGamesByCategory('Racing');
  const actionGames = await getGamesByCategory('Action');
  const puzzleGames = await getGamesByCategory('Puzzle');
  const arcadeGames = await getGamesByCategory('Arcade');
  const sportsGames = await getGamesByCategory('Sports');
  const adventureGames = await getGamesByCategory('Adventure');

  return `
    <div class="container">
      ${heroHtml}

      <!-- Category Filter Pills Bar -->
      <div class="category-filter-bar">
        <a href="#/games" class="category-chip active">
          <span>🎮</span>
          <span>All Games (${games.length})</span>
        </a>
        ${categoryChipsHtml}
      </div>

      <!-- User's Personal Sections (if active) -->
      ${userSectionsHtml}

      <!-- Featured & Trending Section -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🔥</span>
            <h2 class="section-title">Trending & Featured</h2>
          </div>
          <a href="#/games?filter=trending" class="view-all-link">View All →</a>
        </div>
        <div class="games-grid">
          ${trending.slice(0, 4).map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Recently Added Games -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">✨</span>
            <h2 class="section-title">Recently Added Games</h2>
          </div>
          <a href="#/games?filter=new" class="view-all-link">View All New →</a>
        </div>
        <div class="games-grid">
          ${newGames.slice(0, 4).map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Monetization Leaderboard Slot -->
      ${renderAdSlot('leaderboard')}

      <!-- Racing & Driving Section (Featuring Epic Racing: Descent on Cars) -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🏎️</span>
            <h2 class="section-title">Racing & 3D Car Games</h2>
          </div>
          <a href="#/category/racing" class="view-all-link">View Racing →</a>
        </div>
        <div class="games-grid">
          ${racingGames.map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Action & Shooter Games -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">⚔️</span>
            <h2 class="section-title">Action & Combat</h2>
          </div>
          <a href="#/category/action" class="view-all-link">View Action →</a>
        </div>
        <div class="games-grid">
          ${actionGames.map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Arcade Classics -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🕹️</span>
            <h2 class="section-title">Arcade & Casual</h2>
          </div>
          <a href="#/category/arcade" class="view-all-link">View Arcade →</a>
        </div>
        <div class="games-grid">
          ${arcadeGames.map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Puzzles & Brain Teasers -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🧩</span>
            <h2 class="section-title">Puzzle & Logic</h2>
          </div>
          <a href="#/category/puzzle" class="view-all-link">View Puzzle →</a>
        </div>
        <div class="games-grid">
          ${puzzleGames.map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Sports & Skill -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🏀</span>
            <h2 class="section-title">Sports & Physics</h2>
          </div>
          <a href="#/category/sports" class="view-all-link">View Sports →</a>
        </div>
        <div class="games-grid">
          ${sportsGames.map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Adventure & Quests -->
      <section class="section-wrapper">
        <div class="section-header">
          <div class="section-title-wrap">
            <span class="section-icon">🗺️</span>
            <h2 class="section-title">Adventure & Quests</h2>
          </div>
          <a href="#/category/adventure" class="view-all-link">View Adventure →</a>
        </div>
        <div class="games-grid">
          ${adventureGames.map(renderGameCard).join('')}
        </div>
      </section>

      <!-- Secondary Ad Slot -->
      ${renderAdSlot('leaderboard')}
    </div>
  `;
}

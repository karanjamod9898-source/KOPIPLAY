/**
 * KopiPlay - Data API Layer
 * Loads games catalog and categories from JSON and provides query helpers
 */

let gamesCache = null;
let categoriesCache = null;

export async function loadCatalog() {
  if (gamesCache && categoriesCache) {
    return { games: gamesCache, categories: categoriesCache };
  }

  try {
    const [gamesRes, catsRes] = await Promise.all([
      fetch('data/games.json'),
      fetch('data/categories.json')
    ]);

    if (gamesRes.ok && catsRes.ok) {
      gamesCache = await gamesRes.json();
      categoriesCache = await catsRes.json();
      return { games: gamesCache, categories: categoriesCache };
    }
  } catch (error) {
    console.warn('Network fetch failed (likely file:/// CORS restriction). Falling back to embedded catalog:', error);
  }

  // Seamless fallback for local file:/// execution
  try {
    const fallback = await import('../data/catalogData.js');
    gamesCache = fallback.gamesData;
    categoriesCache = fallback.categoriesData;
    return { games: gamesCache, categories: categoriesCache };
  } catch (e) {
    console.error('Fallback catalog failed:', e);
    return { games: [], categories: [] };
  }
}

export async function getAllGames() {
  const { games } = await loadCatalog();
  return games;
}

export async function getGameBySlug(slug) {
  const { games } = await loadCatalog();
  if (!slug) return null;
  const clean = slug.toLowerCase().trim();
  return games.find(g => 
    g.slug.toLowerCase() === clean || 
    g.id.toLowerCase() === clean ||
    (g.aliases && g.aliases.some(a => a.toLowerCase() === clean))
  ) || null;
}

export async function getGameById(id) {
  const { games } = await loadCatalog();
  if (!id) return null;
  const clean = id.toLowerCase().trim();
  return games.find(g => g.id.toLowerCase() === clean || (g.aliases && g.aliases.some(a => a.toLowerCase() === clean))) || null;
}

export async function getCategories() {
  const { categories } = await loadCatalog();
  return categories;
}

export async function getCategoryBySlug(slug) {
  const { categories } = await loadCatalog();
  return categories.find(c => c.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getFeaturedGames() {
  const games = await getAllGames();
  return games.filter(g => g.featured);
}

export async function getTrendingGames() {
  const games = await getAllGames();
  return games.filter(g => g.badge === 'TRENDING' || g.badge === 'HOT');
}

export async function getPopularGames() {
  const games = await getAllGames();
  return games.filter(g => g.popular);
}

export async function getNewGames() {
  const games = await getAllGames();
  return [...games].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
}

export async function getGamesByCategory(categoryName) {
  const games = await getAllGames();
  return games.filter(g => g.category.toLowerCase() === categoryName.toLowerCase());
}

export async function getRelatedGames(currentGame, limit = 4) {
  const games = await getAllGames();
  return games
    .filter(g => g.id !== currentGame.id && (g.category === currentGame.category || g.tags?.some(t => currentGame.tags?.includes(t))))
    .slice(0, limit);
}

export async function searchGames(query = '', category = '') {
  const games = await getAllGames();
  const q = query.trim().toLowerCase();

  return games.filter(g => {
    const matchesQuery = !q || 
      g.title.toLowerCase().includes(q) || 
      g.description.toLowerCase().includes(q) ||
      (g.tags && g.tags.some(t => t.toLowerCase().includes(q)));

    const matchesCategory = !category || 
      g.category.toLowerCase() === category.toLowerCase();

    return matchesQuery && matchesCategory;
  });
}

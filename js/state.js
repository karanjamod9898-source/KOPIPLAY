/**
 * NEXUSPLAY - State & Storage Management
 * Handles Favorites and Recently Played via localStorage
 */

const STORAGE_KEYS = {
  FAVORITES: 'nexusplay_favorites',
  RECENTLY_PLAYED: 'nexusplay_recent'
};

const listeners = [];

export function subscribeState(callback) {
  listeners.push(callback);
}

function notifyState() {
  listeners.forEach(fn => fn());
}

// Favorites API
export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read favorites from localStorage', e);
    return [];
  }
}

export function isFavorite(gameId) {
  const favs = getFavorites();
  return favs.includes(gameId);
}

export function toggleFavorite(gameId) {
  let favs = getFavorites();
  const exists = favs.includes(gameId);
  if (exists) {
    favs = favs.filter(id => id !== gameId);
  } else {
    favs.unshift(gameId);
  }
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    notifyState();
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
  return !exists;
}

export function clearFavorites() {
  localStorage.removeItem(STORAGE_KEYS.FAVORITES);
  notifyState();
}

// Recently Played API
export function getRecentlyPlayed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read recently played from localStorage', e);
    return [];
  }
}

export function addRecentlyPlayed(gameId) {
  let list = getRecentlyPlayed();
  list = list.filter(id => id !== gameId);
  list.unshift(gameId);
  // Keep max 12 recent games
  if (list.length > 12) list = list.slice(0, 12);
  try {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(list));
    notifyState();
  } catch (e) {
    console.error('Failed to save recently played', e);
  }
}

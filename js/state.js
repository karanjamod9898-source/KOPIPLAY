/**
 * KopiPlay - State & Storage Management
 * Handles Favorites and Recently Played via localStorage with safe migration
 */

const STORAGE_KEYS = {
  FAVORITES: 'kopiplay_favorites',
  RECENTLY_PLAYED: 'kopiplay_recent',
  SORT_PREF: 'kopiplay_sort_pref',
  SIDEBAR_COLLAPSED: 'kopiplay_sidebar_collapsed',
  GAME_REPORTS: 'kopiplay_game_reports',
  CONTACT_MESSAGES: 'kopiplay_contact_messages',
  // Legacy backward-compatibility keys
  LEGACY_FAVORITES: 'nexusplay_favorites',
  LEGACY_FAVORITES_ALT: 'nexus_favorites',
  LEGACY_RECENT: 'nexusplay_recent',
  LEGACY_RECENT_ALT: 'nexus_recently_played',
  LEGACY_SORT: 'nexus_sort_pref',
  LEGACY_SIDEBAR: 'nexus_sidebar_collapsed'
};

// Automatic safe migration from legacy keys
function migrateLegacyStorage() {
  try {
    if (typeof localStorage === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      const old = localStorage.getItem(STORAGE_KEYS.LEGACY_FAVORITES) || localStorage.getItem(STORAGE_KEYS.LEGACY_FAVORITES_ALT);
      if (old) localStorage.setItem(STORAGE_KEYS.FAVORITES, old);
    }
    if (!localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED)) {
      const old = localStorage.getItem(STORAGE_KEYS.LEGACY_RECENT) || localStorage.getItem(STORAGE_KEYS.LEGACY_RECENT_ALT);
      if (old) localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, old);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SORT_PREF)) {
      const old = localStorage.getItem(STORAGE_KEYS.LEGACY_SORT);
      if (old) localStorage.setItem(STORAGE_KEYS.SORT_PREF, old);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED)) {
      const old = localStorage.getItem(STORAGE_KEYS.LEGACY_SIDEBAR);
      if (old) localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, old);
    }
  } catch (e) {
    console.warn('Storage migration notice:', e);
  }
}
migrateLegacyStorage();

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
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES) || 
                localStorage.getItem(STORAGE_KEYS.LEGACY_FAVORITES) || 
                localStorage.getItem(STORAGE_KEYS.LEGACY_FAVORITES_ALT);
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
    const json = JSON.stringify(favs);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, json);
    localStorage.setItem(STORAGE_KEYS.LEGACY_FAVORITES, json);
    localStorage.setItem(STORAGE_KEYS.LEGACY_FAVORITES_ALT, json);
    notifyState();
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
  return !exists;
}

export function clearFavorites() {
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_FAVORITES_ALT);
  } catch (e) {}
  notifyState();
}

// Recently Played API
export function getRecentlyPlayed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED) || 
                localStorage.getItem(STORAGE_KEYS.LEGACY_RECENT) || 
                localStorage.getItem(STORAGE_KEYS.LEGACY_RECENT_ALT);
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
    const json = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, json);
    localStorage.setItem(STORAGE_KEYS.LEGACY_RECENT, json);
    localStorage.setItem(STORAGE_KEYS.LEGACY_RECENT_ALT, json);
    notifyState();
  } catch (e) {
    console.error('Failed to save recently played', e);
  }
}

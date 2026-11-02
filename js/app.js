/**
 * KopiPlay - Main Application Bootstrap & Client-Side Router
 */

import { loadCatalog, getGameBySlug, getCategoryBySlug } from './api.js';
import { renderHeader, initHeaderEvents } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initGameCardEvents } from './components/gameCard.js';
import { initHeroEvents } from './components/hero.js';

// Views
import { renderHomeView } from './views/homeView.js';
import { renderGameView, initGamePlayerEvents } from './views/gameView.js';
import { renderCategoryView, initCategoryEvents } from './views/categoryView.js';
import { renderAllGamesView, initAllGamesEvents } from './views/allGamesView.js';
import { renderFavoritesView, initFavoritesEvents } from './views/favoritesView.js';
import { renderSearchView, initSearchEvents } from './views/searchView.js';
import { 
  renderAboutView, 
  renderContactView, 
  initContactEvents, 
  renderPrivacyView, 
  renderTermsView 
} from './views/staticViews.js';
import { renderNotFoundView } from './views/notFoundView.js';

const appHeader = document.getElementById('app-header');
const appMain = document.getElementById('app-main');
const appFooter = document.getElementById('app-footer');

// Router state
async function router() {
  const hash = window.location.hash || '#/';
  const [routePart, queryPart] = hash.split('?');
  const params = new URLSearchParams(queryPart || '');

  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Route: Home
  if (routePart === '#/' || routePart === '#') {
    setMeta('KopiPlay – Play Free Online Games', 'Discover KopiPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.');
    appMain.innerHTML = await renderHomeView();
    return;
  }

  // Route: All Games
  if (routePart === '#/games') {
    const filter = params.get('filter') || 'all';
    const sort = params.get('sort') || 'popular';
    const category = params.get('category') || 'all';
    setMeta('All Games - KopiPlay Catalog', 'Browse our complete catalog of free browser action, racing, puzzle, and adventure games.');
    appMain.innerHTML = await renderAllGamesView(filter, sort, category);
    initAllGamesEvents(filter, sort, category);
    return;
  }

  // Route: Game Detail (#/game/:slug)
  if (routePart.startsWith('#/game/')) {
    const slug = routePart.replace('#/game/', '').trim();
    const game = await getGameBySlug(slug);
    if (game) {
      setMeta(`${game.title} - Play Free Online on KopiPlay`, game.description);
    } else {
      setMeta('Game Not Found - KopiPlay', 'The requested game could not be found.');
    }
    appMain.innerHTML = await renderGameView(slug);
    initGamePlayerEvents();
    return;
  }

  // Route: Category (#/category/:slug)
  if (routePart.startsWith('#/category/')) {
    const slug = routePart.replace('#/category/', '').trim();
    const filter = params.get('filter') || 'all';
    const sort = params.get('sort') || 'popular';
    const cat = await getCategoryBySlug(slug);
    if (cat) {
      setMeta(`${cat.name} Games - Play Free on KopiPlay`, cat.description);
    }
    appMain.innerHTML = await renderCategoryView(slug, filter, sort);
    initCategoryEvents(slug, filter);
    return;
  }

  // Route: Favorites
  if (routePart === '#/favorites') {
    setMeta('My Favorite Games - KopiPlay', 'Your personal collection of saved favorite games on KopiPlay.');
    appMain.innerHTML = await renderFavoritesView();
    initFavoritesEvents();
    return;
  }

  // Route: Search
  if (routePart === '#/search') {
    const query = params.get('q') || '';
    const category = params.get('category') || '';
    setMeta(`Search Games: ${query || 'All'} - KopiPlay`, 'Search and discover games across all categories on KopiPlay.');
    appMain.innerHTML = await renderSearchView(query, category);
    initSearchEvents();
    return;
  }

  // Route: About
  if (routePart === '#/about') {
    setMeta('About KopiPlay - Browser Gaming Platform', 'Learn about our mission to bring high performance, frictionless HTML5 games to the web.');
    appMain.innerHTML = renderAboutView();
    return;
  }

  // Route: Contact
  if (routePart === '#/contact') {
    setMeta('Contact & Game Submissions - KopiPlay', 'Get in touch with the KopiPlay team or submit your HTML5 game for publication.');
    appMain.innerHTML = renderContactView();
    initContactEvents();
    return;
  }

  // Route: Privacy
  if (routePart === '#/privacy') {
    setMeta('Privacy Policy - KopiPlay', 'Review our privacy policy and how your local browser preferences are stored.');
    appMain.innerHTML = renderPrivacyView();
    return;
  }

  // Route: Terms
  if (routePart === '#/terms') {
    setMeta('Terms of Use - KopiPlay', 'Terms and conditions for playing games on KopiPlay.');
    appMain.innerHTML = renderTermsView();
    return;
  }

  // Fallback: 404 Not Found
  setMeta('404 Page Not Found - KopiPlay', 'The page you requested does not exist.');
  appMain.innerHTML = renderNotFoundView();
}

// Dynamic SEO meta tags updater
function setMeta(title, description) {
  document.title = title;
  
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);
}

// App Initialization
async function initApp() {
  try {
    // Preload catalog
    await loadCatalog();

    // Render persistent layout
    appHeader.innerHTML = await renderHeader();
    appFooter.innerHTML = await renderFooter();

    // Init global component events
    initHeaderEvents();
    initGameCardEvents();
    initHeroEvents();

    // Route initially
    await router();

    // Listen for hash changes
    window.addEventListener('hashchange', router);
  } catch (err) {
    console.error('Fatal initialization error:', err);
    appMain.innerHTML = `
      <div class="container" style="padding: 40px; text-align: center;">
        <h2>Initialization Error</h2>
        <p style="color: var(--text-muted); margin-top: 10px;">Failed to initialize game portal. Please check console logs.</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', initApp);

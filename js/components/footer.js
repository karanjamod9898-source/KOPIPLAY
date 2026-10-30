/**
 * NEXUSPLAY - Site Footer Component
 */

import { getCategories } from '../api.js';

export async function renderFooter() {
  const categories = await getCategories();

  const categoryLinks = categories.slice(0, 6).map(c => `
    <li><a href="#/category/${c.slug}" class="footer-link">${c.icon} ${c.name} Games</a></li>
  `).join('');

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-col footer-brand">
            <img src="assets/images/logo.svg" alt="NexusPlay" style="height: 36px;" />
            <p>
              NexusPlay is your premier destination for high-speed, instant HTML5 browser games. No downloads, no installations, just pure gaming directly in your web browser.
            </p>
          </div>

          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a href="#/" class="footer-link">Home</a></li>
              <li><a href="#/games" class="footer-link">All Games</a></li>
              <li><a href="#/games?filter=popular" class="footer-link">Popular Games</a></li>
              <li><a href="#/games?filter=new" class="footer-link">Recently Added</a></li>
              <li><a href="#/favorites" class="footer-link">My Favorites</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Game Categories</h4>
            <ul class="footer-links">
              ${categoryLinks}
            </ul>
          </div>

          <div class="footer-col">
            <h4>Platform & Legal</h4>
            <ul class="footer-links">
              <li><a href="#/about" class="footer-link">About NexusPlay</a></li>
              <li><a href="#/contact" class="footer-link">Developer & Contact</a></li>
              <li><a href="#/privacy" class="footer-link">Privacy Policy</a></li>
              <li><a href="#/terms" class="footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-disclaimer">
            &copy; 2026 NexusPlay Portal. All rights reserved. Games featured on this portal are licensed, self-hosted, or public domain HTML5 web applications.
          </div>
          <div>
            Built with modern web standards • Powered by NexusPlay Engine
          </div>
        </div>
      </div>
    </footer>
  `;
}

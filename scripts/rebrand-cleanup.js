const fs = require('fs');

let bundleSrc = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

bundleSrc = bundleSrc.replace(
  "const currentSort = localStorage.getItem('nexus_sort_pref') || 'featured';",
  "const currentSort = (localStorage.getItem(STORAGE_KEYS.sortPref) || localStorage.getItem(STORAGE_KEYS.legacySort) || 'featured');"
);

bundleSrc = bundleSrc.replace(
  '<li><code>nexus_favorites</code>: An array of game identifiers you have marked with a heart.</li>',
  '<li><code>kipoplay_favorites</code> (and legacy <code>nexus_favorites</code>): An array of game identifiers you have marked with a heart.</li>'
);

bundleSrc = bundleSrc.replace(
  '<li><code>nexus_recently_played</code>: An array of game identifiers for games you have launched recently.</li>',
  '<li><code>kipoplay_recent</code> (and legacy <code>nexus_recently_played</code>): An array of game identifiers for games you have launched recently.</li>'
);

bundleSrc = bundleSrc.replace(
  '<li><code>nexus_sort_pref</code>: Your chosen sort ordering in the game library (e.g. Featured, Rating, Newest).</li>',
  '<li><code>kipoplay_sort_pref</code>: Your chosen sort ordering in the game library (e.g. Featured, Rating, Newest).</li>'
);

bundleSrc = bundleSrc.replace(
  '<li><code>nexus_sidebar_collapsed</code>: Your desktop preference for keeping the sidebar expanded or compact.</li>',
  '<li><code>kipoplay_sidebar_collapsed</code>: Your desktop preference for keeping the sidebar expanded or compact.</li>'
);

fs.writeFileSync('scripts/build-complete-bundle.js', bundleSrc, 'utf8');
console.log('scripts/build-complete-bundle.js updated.');

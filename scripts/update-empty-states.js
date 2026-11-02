const fs = require('fs');

let content = fs.readFileSync('scripts/build-complete-bundle.js', 'utf8');

const targetStr = `    const cardsHtml = sorted.length > 0
      ? sorted.map(renderCard).join('')
      : \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="width: 54px; height: 54px; margin: 0 auto 16px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); margin-bottom:8px;">No Games Found</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:18px;">We couldn't find games matching your criteria. Try another category or search term!</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      \\\`;`;

const replacement = `let emptyStateHtml = '';
    if (title === 'My Favorites') {
      emptyStateHtml = \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 620px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(255, 71, 87, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-coral); box-shadow: 0 0 24px var(--accent-coral-glow);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Favorite Games Yet</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">Click the heart icon on any game card to add it to your personal favorites for instant 1-click access!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Browse Complete Catalog</a>
        </div>
      \\\`;
    } else if (title === 'Recently Played') {
      emptyStateHtml = \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 620px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(0, 210, 255, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-primary); box-shadow: 0 0 24px rgba(0, 210, 255, 0.25);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Recently Played Games</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">Games you play will automatically appear here so you can easily jump straight back into the action!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Discover Games</a>
        </div>
      \\\`;
    } else {
      emptyStateHtml = \\\`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 620px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Games Found</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">We couldn't find any games matching this view or search term. Try another category or explore all games!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Browse All Games</a>
        </div>
      \\\`;
    }

    const cardsHtml = sorted.length > 0 ? sorted.map(renderCard).join('') : emptyStateHtml;`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacement);
  fs.writeFileSync('scripts/build-complete-bundle.js', content, 'utf8');
  console.log('Successfully updated empty states in renderAllGamesView');
} else {
  console.error('Target string not found in file');
}

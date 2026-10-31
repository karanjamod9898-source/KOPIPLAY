/**
 * KipoPlay - Monetization & Advertising Slot Component
 * Clean, separated reserved space for future authorized ad networks (e.g. Google AdSense, GameDistribution)
 */

export function renderAdSlot(type = 'leaderboard', customClass = '') {
  const isLeaderboard = type === 'leaderboard';
  const sizeClass = isLeaderboard ? 'ad-slot-leaderboard' : 'ad-slot-rectangle';
  const sizeLabel = isLeaderboard ? '728 × 90 • Leaderboard' : '300 × 250 • Medium Rectangle';

  return `
    <div class="ad-slot-wrapper ${customClass}">
      <span class="ad-label">Advertisement • Reserved Monetization Slot</span>
      <div class="ad-slot ${sizeClass}" data-ad-unit="${type}">
        <div class="ad-slot-title">Reserved Ad Space (${sizeLabel})</div>
        <div class="ad-slot-desc">Ready for approved ad network integration (AdSense / GameDistribution)</div>
      </div>
    </div>
  `;
}

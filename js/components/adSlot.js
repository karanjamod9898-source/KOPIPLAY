/**
 * KopiPlay - Reusable Advertisement Slot Component
 * Clean, compliant ad container for authorized ad networks (e.g. Google AdSense, GAM, Playwire)
 */

export function renderAdSlot(placementId = 'game-detail-sidebar', options = {}) {
  const size = options.size || '300x250';
  const label = options.label || 'ADVERTISEMENT';
  const is300x250 = size === '300x250';

  return `
    <!-- Advertisement Container (${placementId}) -->
    <aside class="game-ad-container" data-ad-placement="${placementId}" aria-label="Advertisement">
      <div class="ad-disclaimer-label">${label}</div>
      <div class="ad-slot-frame ${is300x250 ? 'ad-slot-300x250' : 'ad-slot-responsive'}" id="ad-unit-${placementId}">
        <!-- ========================================================================= -->
        <!-- AUTHORIZED AD PROVIDER CODE INJECTION POINT (e.g. AdSense / GAM / Playwire) -->
        <!-- When active ad provider is configured, inject provider ad tag here.       -->
        <!-- ========================================================================= -->
        <div class="ad-placeholder-content" unselectable="on" aria-hidden="true">
          <div class="ad-placeholder-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div class="ad-placeholder-title">Advertisement Space</div>
          <div class="ad-placeholder-size">300 &times; 250 px</div>
        </div>
        <!-- END AD INJECTION POINT -->
      </div>
    </aside>
  `;
}

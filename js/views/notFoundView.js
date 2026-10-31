/**
 * KipoPlay - Custom 404 Not Found View
 */

export function renderNotFoundView() {
  return `
    <div class="container" style="text-align: center; padding: 80px 20px;">
      <div style="font-size: 80px; font-weight: 900; line-height: 1;" class="gradient-text">404</div>
      <h1 style="font-size: 2.2rem; margin: 16px 0 8px 0;">Level Not Found</h1>
      <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 28px auto;">
        Oops! You've wandered into an uncharted sector. The page or game you're looking for doesn't exist.
      </p>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="#/" class="btn btn-primary">
          <span>🏠</span>
          <span>Back to Home</span>
        </a>
        <a href="#/games" class="btn btn-secondary">
          <span>🎮</span>
          <span>Browse All Games</span>
        </a>
      </div>
    </div>
  `;
}

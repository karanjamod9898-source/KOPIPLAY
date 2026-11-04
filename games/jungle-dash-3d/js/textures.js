/**
 * Jungle Dash 3D - Procedural Canvas Texture & Material Generator
 * Creates rich, high-resolution procedural textures for stone paths, bark, flora, water, and temple glyphs.
 */
class TextureGenerator {
  static get cache() {
    if (!this._cache) this._cache = {};
    return this._cache;
  }

  /**
   * Weathered Ancient Flagstone Pavers Texture with Moss & Mortar
   */
  static getStonePath() {
    if (this.cache.stonePath) return this.cache.stonePath;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base earth stone
    ctx.fillStyle = '#64748B';
    ctx.fillRect(0, 0, 512, 512);

    // Stone blocks grid with irregular paving
    const rows = 8;
    const cols = 6;
    const rowH = 512 / rows;
    const colW = 512 / cols;

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (colW * 0.5);
      for (let c = -1; c <= cols; c++) {
        const x = c * colW + offset;
        const y = r * rowH;

        // Individual stone tone variation
        const shade = Math.floor(135 + Math.random() * 40);
        ctx.fillStyle = `rgb(${shade}, ${shade + 4}, ${shade + 8})`;
        ctx.fillRect(x + 3, y + 3, colW - 6, rowH - 6);

        // Stone grain noise
        for (let n = 0; n < 30; n++) {
          const nx = x + 4 + Math.random() * (colW - 8);
          const ny = y + 4 + Math.random() * (rowH - 8);
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)';
          ctx.fillRect(nx, ny, 2 + Math.random() * 4, 2 + Math.random() * 4);
        }

        // Moss edges in cracks
        if (Math.random() < 0.45) {
          ctx.fillStyle = 'rgba(22, 101, 52, 0.65)';
          ctx.fillRect(x + 2, y + rowH - 5, colW - 4, 3);
        }
      }
    }

    // Mortar lines
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 4;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * rowH);
      ctx.lineTo(512, r * rowH);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 6);
    this.cache.stonePath = texture;
    return texture;
  }

  /**
   * Gnarled Tropical Tree Bark Texture
   */
  static getTreeBark() {
    if (this.cache.treeBark) return this.cache.treeBark;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#451A03';
    ctx.fillRect(0, 0, 256, 512);

    // Vertical bark ridges
    for (let i = 0; i < 40; i++) {
      const x = i * (256 / 40);
      const shade = Math.floor(70 + Math.random() * 35);
      ctx.fillStyle = `rgb(${shade}, ${shade * 0.4}, ${shade * 0.2})`;
      ctx.fillRect(x, 0, 4 + Math.random() * 3, 512);
    }

    // Moss streaks
    for (let m = 0; m < 15; m++) {
      const mx = Math.random() * 256;
      const my = Math.random() * 512;
      ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
      ctx.fillRect(mx, my, 8 + Math.random() * 12, 20 + Math.random() * 35);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 4);
    this.cache.treeBark = texture;
    return texture;
  }

  /**
   * Ancient Temple Carved Stone Relief
   */
  static getTempleStone() {
    if (this.cache.templeStone) return this.cache.templeStone;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 256, 256);

    // Concentric Carved Aztec Glyphs
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 6;
    ctx.strokeRect(16, 16, 224, 224);
    ctx.strokeRect(48, 48, 160, 160);

    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(80, 80, 96, 96);

    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.arc(128, 128, 24, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.templeStone = texture;
    return texture;
  }

  /**
   * Animated Caustic Water Surface
   */
  static getWater() {
    if (this.cache.water) return this.cache.water;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, '#0284C7');
    grad.addColorStop(0.5, '#06B6D4');
    grad.addColorStop(1, '#0369A1');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Water caustics
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 256, Math.random() * 256, 15 + Math.random() * 30, 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 12);
    this.cache.water = texture;
    return texture;
  }
}

window.TextureGenerator = TextureGenerator;


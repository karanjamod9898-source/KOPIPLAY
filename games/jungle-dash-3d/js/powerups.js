/**
 * Jungle Dash 3D - Power-Up System
 * Manages 5 unique power-ups: Coin Magnet, Energy Shield, Speed Boost, Coin Multiplier, and Hoverboard.
 */
class PowerupManager {
  static get TYPES() {
    return {
      magnet: { name: 'Coin Magnet', duration: 12.0, color: '#EF4444', icon: '🧲' },
      shield: { name: 'Energy Shield', duration: 15.0, color: '#38BDF8', icon: '🛡️' },
      boost: { name: 'Speed Boost', duration: 6.0, color: '#F97316', icon: '⚡' },
      multiplier: { name: '2X Multiplier', duration: 12.0, color: '#A855F7', icon: '✨' },
      hoverboard: { name: 'Hoverboard', duration: 15.0, color: '#06B6D4', icon: '🏄' }
    };
  }

  constructor(game) {
    this.game = game;
    this.activePowerups = {};
  }

  reset() {
    this.activePowerups = {};
  }

  activate(type) {
    const def = PowerupManager.TYPES[type];
    if (!def) return;

    this.activePowerups[type] = {
      type: type,
      name: def.name,
      timer: def.duration,
      maxDuration: def.duration,
      color: def.color,
      icon: def.icon
    };

    // Apply immediate visual effects on character
    if (type === 'hoverboard') {
      if (this.game.player && this.game.player.hoverboard) {
        this.game.player.hoverboard.visible = true;
      }
    } else if (type === 'shield') {
      if (this.game.player && this.game.player.shield) {
        this.game.player.shield.visible = true;
      }
    }

    if (this.game.ui) {
      this.game.ui.showFloatingText(`${def.icon} ${def.name.toUpperCase()}!`, def.color);
    }
  }

  has(type) {
    return !!(this.activePowerups[type] && this.activePowerups[type].timer > 0);
  }

  update(delta) {
    for (const key in this.activePowerups) {
      const p = this.activePowerups[key];
      p.timer -= delta;
      if (p.timer <= 0) {
        // Expiration cleanup
        if (key === 'hoverboard') {
          if (this.game.player && this.game.player.hoverboard) {
            this.game.player.hoverboard.visible = false;
          }
        } else if (key === 'shield') {
          if (this.game.player && this.game.player.shield) {
            this.game.player.shield.visible = false;
          }
        }
        delete this.activePowerups[key];
      }
    }

    // Magnet Effect: Radial Pull of nearby coins
    if (this.has('magnet') && this.game.player && this.game.track) {
      const pPos = this.game.player.root.position;
      const pullRadius = 11.5;

      this.game.track.coins.forEach(coin => {
        if (coin.collected) return;
        const dx = pPos.x - coin.x;
        const dz = pPos.z - coin.z;
        const dist = Math.hypot(dx, dz);

        if (dist < pullRadius) {
          // Accelerate coin towards player
          coin.x += (pPos.x - coin.x) * 0.18;
          coin.z += (pPos.z - coin.z) * 0.18;
          coin.mesh.position.x = coin.x;
          // Compensate for segment relative z
          if (coin.parentSeg) {
            coin.mesh.position.z = coin.z - coin.parentSeg.z;
          }
        }
      });
    }
  }

  consumeShieldOrHoverboard() {
    if (this.has('hoverboard')) {
      delete this.activePowerups['hoverboard'];
      if (this.game.player && this.game.player.hoverboard) {
        this.game.player.hoverboard.visible = false;
      }
      return { absorbed: true, item: 'Hoverboard' };
    }
    if (this.has('shield')) {
      delete this.activePowerups['shield'];
      if (this.game.player && this.game.player.shield) {
        this.game.player.shield.visible = false;
      }
      return { absorbed: true, item: 'Energy Shield' };
    }
    return { absorbed: false };
  }

  getActiveList() {
    return Object.values(this.activePowerups);
  }
}

window.PowerupManager = PowerupManager;


/**
 * Crazy Bumper Arena - UI & Screen Manager
 * Manages Main Menu, HUD, Level Select, Garage, Pause, Game Over, Victory, and Touch Controls.
 */
class UIManager {
  constructor(game) {
    this.game = game;
    this.dom = {
      menuScreen: document.getElementById('screenMenu'),
      levelsScreen: document.getElementById('screenLevels'),
      garageScreen: document.getElementById('screenGarage'),
      hudLayer: document.getElementById('hudLayer'),
      pauseModal: document.getElementById('modalPause'),
      gameOverModal: document.getElementById('modalGameOver'),
      victoryModal: document.getElementById('modalVictory'),
      mobileControls: document.getElementById('mobileControls'),
      floatingText: document.getElementById('floatingTextContainer')
    };

    this.bindEvents();
    this.renderLevelGrid();
    this.updateCoinDisplay();
  }

  bindEvents() {
    // Menu Buttons
    document.getElementById('btnMenuPlay').addEventListener('click', () => {
      this.game.audio.playClick();
      this.game.startMatch(this.game.currentLevelIndex);
    });

    document.getElementById('btnMenuLevels').addEventListener('click', () => {
      this.game.audio.playClick();
      this.openLevels();
    });

    document.getElementById('btnMenuGarage').addEventListener('click', () => {
      this.game.audio.playClick();
      this.openGarage();
    });

    document.getElementById('btnDailyReward').addEventListener('click', () => {
      this.game.claimDailyReward();
    });

    // Level Select Back
    document.getElementById('btnLevelsBack').addEventListener('click', () => {
      this.game.audio.playClick();
      this.showScreen('menu');
    });

    // Garage Controls
    document.getElementById('btnGarageBack').addEventListener('click', () => {
      this.game.audio.playClick();
      this.game.garage.closeGarage();
      this.showScreen('menu');
    });

    document.getElementById('btnGaragePrev').addEventListener('click', () => {
      this.game.audio.playClick();
      const state = this.game.garage.prevCar();
      this.renderGarageState(state);
    });

    document.getElementById('btnGarageNext').addEventListener('click', () => {
      this.game.audio.playClick();
      const state = this.game.garage.nextCar();
      this.renderGarageState(state);
    });

    document.getElementById('btnGarageAction').addEventListener('click', () => {
      const def = ModelFactory.CAR_DEFINITIONS[this.game.garage.currentIndex];
      const isUnlocked = this.game.garage.unlockedCars.includes(def.id);
      if (isUnlocked) {
        this.game.audio.playClick();
        this.game.garage.selectCurrentCar();
      } else {
        const res = this.game.garage.buyCurrentCar();
        if (res.success) {
          this.game.audio.playPowerup('super_bumper');
        } else {
          this.game.audio.playDefeat();
        }
      }
      const state = this.game.garage.showCar(this.game.garage.currentIndex);
      this.renderGarageState(state);
      this.updateCoinDisplay();
    });

    // Garage Paint Color Swatches
    const swatches = document.querySelectorAll('.paint-swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        const color = e.target.getAttribute('data-color');
        if (color) {
          this.game.audio.playClick();
          const state = this.game.garage.setCustomColor(color);
          this.renderGarageState(state);
        }
      });
    });

    // Pause / Resume
    document.getElementById('btnHudPause').addEventListener('click', () => {
      this.game.audio.playClick();
      this.game.pauseMatch();
    });

    document.getElementById('btnResume').addEventListener('click', () => {
      this.game.audio.playClick();
      this.game.resumeMatch();
    });

    document.getElementById('btnRestartPause').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.pauseModal.classList.remove('active');
      this.game.startMatch(this.game.currentLevelIndex);
    });

    document.getElementById('btnQuitPause').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.pauseModal.classList.remove('active');
      this.game.returnToMenu();
    });

    // Game Over & Victory Buttons
    document.getElementById('btnGameOverRetry').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.gameOverModal.classList.remove('active');
      this.game.startMatch(this.game.currentLevelIndex);
    });

    document.getElementById('btnGameOverMenu').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.gameOverModal.classList.remove('active');
      this.game.returnToMenu();
    });

    document.getElementById('btnVictoryNext').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.victoryModal.classList.remove('active');
      const nextLvl = (this.game.currentLevelIndex + 1) % ArenaBuilder.LEVEL_CONFIGS.length;
      this.game.startMatch(nextLvl);
    });

    document.getElementById('btnVictoryMenu').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.victoryModal.classList.remove('active');
      this.game.returnToMenu();
    });

    // Sound Toggle in Top Bar
    const btnSound = document.getElementById('btnSoundToggle');
    btnSound.addEventListener('click', () => {
      const isMuted = this.game.audio.toggleMute();
      this.updateSoundIcons(isMuted);
    });
    this.updateSoundIcons(this.game.audio.muted);

    // Fullscreen Toggle
    document.getElementById('btnFullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

    // Mobile Touch Controls
    this.bindTouchControls();
  }

  bindTouchControls() {
    const bindBtn = (id, onStart, onEnd) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(); }, { passive: false });
      btn.addEventListener('touchend', (e) => { e.preventDefault(); onEnd(); }, { passive: false });
      btn.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(); });
      btn.addEventListener('mouseup', (e) => { e.preventDefault(); onEnd(); });
    };

    bindBtn('btnTouchLeft', () => { this.game.playerInput.left = true; }, () => { this.game.playerInput.left = false; });
    bindBtn('btnTouchRight', () => { this.game.playerInput.right = true; }, () => { this.game.playerInput.right = false; });
    bindBtn('btnTouchGas', () => { this.game.playerInput.forward = true; }, () => { this.game.playerInput.forward = false; });
    bindBtn('btnTouchBrake', () => { this.game.playerInput.backward = true; }, () => { this.game.playerInput.backward = false; });
    bindBtn('btnTouchPower', () => { this.game.activatePowerup(); }, () => {});
  }

  showScreen(screen) {
    this.dom.menuScreen.classList.remove('active');
    this.dom.levelsScreen.classList.remove('active');
    this.dom.garageScreen.classList.remove('active');
    this.dom.hudLayer.classList.remove('active');
    this.dom.pauseModal.classList.remove('active');
    this.dom.gameOverModal.classList.remove('active');
    this.dom.victoryModal.classList.remove('active');

    const topBar = document.querySelector('.game-top-bar');
    if (topBar) {
      topBar.style.display = (screen === 'playing') ? 'none' : 'flex';
    }

    if (screen === 'menu') {
      this.dom.menuScreen.classList.add('active');
      this.updateCoinDisplay();
    } else if (screen === 'levels') {
      this.dom.levelsScreen.classList.add('active');
      this.renderLevelGrid();
    } else if (screen === 'garage') {
      this.dom.garageScreen.classList.add('active');
    } else if (screen === 'playing') {
      this.dom.hudLayer.classList.add('active');
    }
  }

  openLevels() {
    this.showScreen('levels');
    this.renderLevelGrid();
  }

  openGarage() {
    this.showScreen('garage');
    this.game.garage.openGarage(document.getElementById('garageCanvasWrap'));
    const state = this.game.garage.showCar(this.game.garage.currentIndex);
    this.renderGarageState(state);
  }

  renderGarageState(state) {
    const def = state.def;
    document.getElementById('garageCarName').textContent = def.name;
    document.getElementById('garageCarCategory').textContent = `${def.category} Class`;
    document.getElementById('garageCarDesc').textContent = def.description;

    // Stat Bars
    document.getElementById('statSpeedBar').style.width = `${def.stats.speed}%`;
    document.getElementById('statHandlingBar').style.width = `${def.stats.handling}%`;
    document.getElementById('statImpactBar').style.width = `${def.stats.impact}%`;
    document.getElementById('statStabilityBar').style.width = `${def.stats.stability}%`;

    const btn = document.getElementById('btnGarageAction');
    if (state.isSelected) {
      btn.textContent = 'SELECTED';
      btn.className = 'btn-action btn-selected';
      btn.disabled = true;
    } else if (state.isUnlocked) {
      btn.textContent = 'SELECT CAR';
      btn.className = 'btn-action btn-select';
      btn.disabled = false;
    } else {
      btn.textContent = `UNLOCK (${def.price} COINS)`;
      btn.className = 'btn-action btn-buy';
      btn.disabled = false;
    }
  }

  renderLevelGrid() {
    const grid = document.getElementById('levelsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const configs = ArenaBuilder.LEVEL_CONFIGS;
    const completedLevels = JSON.parse(localStorage.getItem('cba_completed_levels') || '[0]');
    const totalStars = parseInt(localStorage.getItem('cba_stars') || '0', 10);

    configs.forEach((cfg, idx) => {
      const isUnlocked = completedLevels.includes(idx) || totalStars >= cfg.starsRequired;
      const card = document.createElement('div');
      card.className = `level-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        <div class="level-num">LEVEL 0${idx + 1}</div>
        <div class="level-badge ${cfg.difficulty.toLowerCase()}">${cfg.difficulty}</div>
        <h3 class="level-title">${cfg.name}</h3>
        <p class="level-theme">${cfg.theme}</p>
        <p class="level-desc">${cfg.description}</p>
        <div class="level-footer">
          ${isUnlocked ? `<button type="button" class="btn-play-level">PLAY ARENA</button>` : `<div class="lock-req">⭐ ${cfg.starsRequired} Stars Required</div>`}
        </div>
      `;

      if (isUnlocked) {
        card.querySelector('.btn-play-level').addEventListener('click', () => {
          this.game.audio.playClick();
          this.game.startMatch(idx);
        });
      }

      grid.appendChild(card);
    });
  }

  updateHUD(state) {
    document.getElementById('hudTimer').textContent = `${Math.ceil(state.timeLeft)}s`;
    document.getElementById('hudScore').textContent = state.score;
    document.getElementById('hudCoins').textContent = state.coins;
    document.getElementById('hudOpponents').textContent = state.remainingOpponents;

    const healthPct = Math.max(0, Math.min(100, state.health));
    const healthBar = document.getElementById('hudHealthBar');
    if (healthBar) healthBar.style.width = `${healthPct}%`;
    const healthText = document.getElementById('hudHealthText');
    if (healthText) healthText.textContent = `${Math.round(healthPct)}%`;
    if (healthBar) {
      if (healthPct < 25) {
        healthBar.style.background = '#EF4444';
      } else if (healthPct < 60) {
        healthBar.style.background = '#F59E0B';
      } else {
        healthBar.style.background = '#10B981';
      }
    }

    // Active Power-up Badge
    const powerBadge = document.getElementById('hudActivePowerup');
    if (state.activePowerup) {
      powerBadge.classList.add('visible');
      powerBadge.textContent = `POWER: ${state.activePowerup.toUpperCase()}`;
    } else {
      powerBadge.classList.remove('visible');
    }
  }

  updateCoinDisplay() {
    const coins = localStorage.getItem('cba_total_coins') || '150';
    const els = document.querySelectorAll('.coin-balance-val');
    els.forEach(el => el.textContent = coins);
  }

  showGameOver(stats) {
    document.getElementById('goScore').textContent = stats.score;
    document.getElementById('goCoins').textContent = stats.coins;
    document.getElementById('goKOs').textContent = stats.knockouts;
    document.getElementById('goTime').textContent = `${Math.floor(stats.time)}s`;
    this.dom.gameOverModal.classList.add('active');
  }

  showVictory(stats) {
    document.getElementById('vicScore').textContent = stats.score;
    document.getElementById('vicCoins').textContent = stats.coins;
    document.getElementById('vicBonus').textContent = `+${stats.bonus} Coins`;
    document.getElementById('vicStars').textContent = '⭐⭐⭐';
    this.dom.victoryModal.classList.add('active');
  }

  showFloatingText(text, color = '#FACC15') {
    const el = document.createElement('div');
    el.className = 'floating-popup';
    el.textContent = text;
    el.style.color = color;
    this.dom.floatingText.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1100);
  }

  updateSoundIcons(muted) {
    const on = document.getElementById('soundIconOn');
    const off = document.getElementById('soundIconOff');
    if (on && off) {
      on.style.display = muted ? 'none' : 'block';
      off.style.display = muted ? 'block' : 'none';
    }
  }
}

window.UIManager = UIManager;


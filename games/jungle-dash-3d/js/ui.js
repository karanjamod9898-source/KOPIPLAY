/**
 * Jungle Dash 3D - User Interface & Screen Manager
 * Controls Menus, HUD, Worlds, Shop, Missions, Modals, and Touch/Swipe Controls.
 */
class UIManager {
  constructor(game) {
    this.game = game;
    this.dom = {
      menuScreen: document.getElementById('screenMenu'),
      worldsScreen: document.getElementById('screenWorlds'),
      shopScreen: document.getElementById('screenShop'),
      missionsScreen: document.getElementById('screenMissions'),
      hudLayer: document.getElementById('hudLayer'),
      pauseModal: document.getElementById('modalPause'),
      gameOverModal: document.getElementById('modalGameOver'),
      floatingText: document.getElementById('floatingTextContainer')
    };

    this.bindButtons();
    this.bindTouchSwipe();
    this.updateBalanceDisplays();
  }

  bindButtons() {
    // Menu Buttons
    document.getElementById('btnMenuPlay').addEventListener('click', () => {
      this.game.audio.playClick();
      this.game.startRun(this.game.currentWorldIndex);
    });

    document.getElementById('btnMenuWorlds').addEventListener('click', () => {
      this.game.audio.playClick();
      this.openWorlds();
    });

    document.getElementById('btnMenuShop').addEventListener('click', () => {
      this.game.audio.playClick();
      this.openShop();
    });

    document.getElementById('btnMenuMissions').addEventListener('click', () => {
      this.game.audio.playClick();
      this.openMissions();
    });

    // Back to Menu
    document.getElementById('btnWorldsBack').addEventListener('click', () => {
      this.game.audio.playClick();
      this.showScreen('menu');
    });

    document.getElementById('btnShopBack').addEventListener('click', () => {
      this.game.audio.playClick();
      this.showScreen('menu');
    });

    document.getElementById('btnMissionsBack').addEventListener('click', () => {
      this.game.audio.playClick();
      this.showScreen('menu');
    });

    // Shop Carousel
    document.getElementById('btnShopPrev').addEventListener('click', () => {
      this.game.audio.playClick();
      const state = this.game.shop.prevSkin();
      this.renderShopState(state);
    });

    document.getElementById('btnShopNext').addEventListener('click', () => {
      this.game.audio.playClick();
      const state = this.game.shop.nextSkin();
      this.renderShopState(state);
    });

    document.getElementById('btnShopAction').addEventListener('click', () => {
      const res = this.game.shop.buyOrSelectCurrent();
      if (res.success) {
        if (res.action === 'unlocked') {
          this.game.audio.playVictory();
          this.showFloatingText(`UNLOCKED ${res.def.name.toUpperCase()}!`, '#FACC15');
        } else {
          this.game.audio.playClick();
        }
      } else {
        this.game.audio.playCrash();
        this.showFloatingText('NOT ENOUGH COINS!', '#EF4444');
      }
      const state = this.game.shop.showSkin(this.game.shop.currentSkinIndex);
      this.renderShopState(state);
      this.updateBalanceDisplays();
    });

    // In-Game Pause & Modals
    document.getElementById('btnHudPause').addEventListener('click', () => {
      this.game.audio.playClick();
      this.game.pauseRun();
    });

    document.getElementById('btnResume').addEventListener('click', () => {
      this.game.audio.playClick();
      this.game.resumeRun();
    });

    document.getElementById('btnRestartPause').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.pauseModal.classList.remove('active');
      this.game.startRun(this.game.currentWorldIndex);
    });

    document.getElementById('btnQuitPause').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.pauseModal.classList.remove('active');
      this.game.returnToMenu();
    });

    document.getElementById('btnGameOverRetry').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.gameOverModal.classList.remove('active');
      this.game.startRun(this.game.currentWorldIndex);
    });

    document.getElementById('btnGameOverMenu').addEventListener('click', () => {
      this.game.audio.playClick();
      this.dom.gameOverModal.classList.remove('active');
      this.game.returnToMenu();
    });

    // Sound & Fullscreen
    document.getElementById('btnSoundToggle').addEventListener('click', () => {
      const isMuted = this.game.audio.toggleMute();
      this.updateSoundIcons(isMuted);
    });
    this.updateSoundIcons(this.game.audio.muted);

    document.getElementById('btnFullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

    // Mobile On-Screen Direction Buttons
    const bindTouch = (id, action) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('touchstart', (e) => { e.preventDefault(); action(); }, { passive: false });
      el.addEventListener('mousedown', (e) => { e.preventDefault(); action(); });
    };

    bindTouch('btnTouchLeft', () => this.game.moveLeft());
    bindTouch('btnTouchRight', () => this.game.moveRight());
    bindTouch('btnTouchJump', () => this.game.jump());
    bindTouch('btnTouchSlide', () => this.game.slide());
  }

  bindTouchSwipe() {
    let startX = 0;
    let startY = 0;
    const threshold = 35; // minimum swipe distance in px

    window.addEventListener('touchstart', (e) => {
      if (this.game.state !== 'running') return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (this.game.state !== 'running') return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const dx = endX - startX;
      const dy = endY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal Swipe
        if (Math.abs(dx) > threshold) {
          if (dx > 0) this.game.moveRight();
          else this.game.moveLeft();
        }
      } else {
        // Vertical Swipe
        if (Math.abs(dy) > threshold) {
          if (dy < 0) this.game.jump();
          else this.game.slide();
        }
      }
    }, { passive: true });
  }

  showScreen(screen) {
    this.dom.menuScreen.classList.remove('active');
    this.dom.worldsScreen.classList.remove('active');
    this.dom.shopScreen.classList.remove('active');
    this.dom.missionsScreen.classList.remove('active');
    this.dom.hudLayer.classList.remove('active');
    this.dom.pauseModal.classList.remove('active');
    this.dom.gameOverModal.classList.remove('active');

    const topBar = document.querySelector('.game-top-bar');
    if (topBar) {
      topBar.style.display = (screen === 'running') ? 'none' : 'flex';
    }

    if (screen === 'menu') {
      this.dom.menuScreen.classList.add('active');
      this.updateBalanceDisplays();
    } else if (screen === 'worlds') {
      this.dom.worldsScreen.classList.add('active');
      this.renderWorldsGrid();
    } else if (screen === 'shop') {
      this.dom.shopScreen.classList.add('active');
    } else if (screen === 'missions') {
      this.dom.missionsScreen.classList.add('active');
      this.renderMissionsList();
    } else if (screen === 'running') {
      this.dom.hudLayer.classList.add('active');
    }
  }

  openWorlds() {
    this.showScreen('worlds');
    this.renderWorldsGrid();
  }

  openShop() {
    this.showScreen('shop');
    this.game.shop.openShop(document.getElementById('shopCanvasWrap'));
    const state = this.game.shop.showSkin(this.game.shop.currentSkinIndex);
    this.renderShopState(state);
  }

  openMissions() {
    this.showScreen('missions');
    this.renderMissionsList();
  }

  renderWorldsGrid() {
    const grid = document.getElementById('worldsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const worlds = WorldManager.WORLDS;
    const completedWorlds = this.game.missions.unlockedWorlds;

    worlds.forEach((w, idx) => {
      const isUnlocked = completedWorlds.includes(idx);
      const card = document.createElement('div');
      card.className = `world-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        <div class="world-num">WORLD 0${idx + 1}</div>
        <div class="world-badge ${w.difficulty.toLowerCase()}">${w.difficulty}</div>
        <h3 class="world-title">${w.name}</h3>
        <p class="world-theme">${w.theme}</p>
        <p class="world-desc">${w.description}</p>
        <div class="world-footer">
          ${isUnlocked ? `<button type="button" class="btn-play-world">DASH HERE</button>` : `<div class="lock-req">⭐ ${w.starsReq} Gems Required</div>`}
        </div>
      `;

      if (isUnlocked) {
        card.querySelector('.btn-play-world').addEventListener('click', () => {
          this.game.audio.playClick();
          this.game.startRun(idx);
        });
      }

      grid.appendChild(card);
    });
  }

  renderShopState(state) {
    const def = state.def;
    document.getElementById('shopSkinName').textContent = def.name;
    document.getElementById('shopSkinDesc').textContent = def.description;

    const btn = document.getElementById('btnShopAction');
    if (state.isSelected) {
      btn.textContent = 'EQUIPPED';
      btn.className = 'btn-action btn-selected';
      btn.disabled = true;
    } else if (state.isUnlocked) {
      btn.textContent = 'EQUIP OUTFIT';
      btn.className = 'btn-action btn-select';
      btn.disabled = false;
    } else {
      btn.textContent = `UNLOCK (${def.price} COINS)`;
      btn.className = 'btn-action btn-buy';
      btn.disabled = false;
    }
  }

  renderMissionsList() {
    const list = document.getElementById('missionsList');
    if (!list) return;
    list.innerHTML = '';

    this.game.missions.missions.forEach(m => {
      const card = document.createElement('div');
      card.className = `mission-item ${m.completed ? 'completed' : ''}`;

      card.innerHTML = `
        <div class="mission-info">
          <h4 class="mission-title">${m.title}</h4>
          <p class="mission-desc">${m.desc}</p>
          <div class="mission-reward">Reward: <span>+${m.rewardCoins} Coins, +${m.rewardGems} Gems</span></div>
        </div>
        <div class="mission-action">
          ${m.claimed ? `<span class="badge-claimed">CLAIMED</span>` : (m.completed ? `<button type="button" class="btn-claim-reward" data-id="${m.id}">CLAIM</button>` : `<span class="badge-in-progress">IN PROGRESS</span>`)}
        </div>
      `;

      if (m.completed && !m.claimed) {
        card.querySelector('.btn-claim-reward').addEventListener('click', () => {
          const res = this.game.missions.claimReward(m.id);
          if (res.success) {
            this.game.audio.playVictory();
            this.showFloatingText(`+${res.coins} COINS, +${res.gems} GEMS!`, '#FACC15');
            this.updateBalanceDisplays();
            this.renderMissionsList();
          }
        });
      }

      list.appendChild(card);
    });
  }

  updateHUD(stats) {
    document.getElementById('hudDistVal').textContent = `${Math.floor(stats.distance)}m`;
    document.getElementById('hudScoreVal').textContent = Math.floor(stats.score);
    document.getElementById('hudCoinsVal').textContent = stats.coins;
    document.getElementById('hudGemsVal').textContent = stats.gems;

    // Active Powerups Display
    const container = document.getElementById('hudActivePowerups');
    if (container) {
      const activeList = this.game.powerups.getActiveList();
      if (activeList.length > 0) {
        container.innerHTML = activeList.map(p => `
          <div class="active-power-pill" style="border-color:${p.color}">
            <span>${p.icon} ${p.name.toUpperCase()}</span>
            <div class="power-bar-fill" style="width:${(p.timer / p.maxDuration) * 100}%; background:${p.color};"></div>
          </div>
        `).join('');
      } else {
        container.innerHTML = '';
      }
    }
  }

  showGameOver(runStats) {
    document.getElementById('goDistance').textContent = `${Math.floor(runStats.distance)}m`;
    document.getElementById('goScore').textContent = Math.floor(runStats.score);
    document.getElementById('goCoins').textContent = runStats.coins;
    document.getElementById('goGems').textContent = runStats.gems;
    document.getElementById('goBestScore').textContent = this.game.missions.highScore;

    const banner = document.getElementById('goNewRecord');
    if (banner) {
      banner.style.display = runStats.isNewRecord ? 'block' : 'none';
    }

    this.dom.gameOverModal.classList.add('active');
  }

  updateBalanceDisplays() {
    const c = this.game.missions.totalCoins;
    const g = this.game.missions.totalGems;
    document.querySelectorAll('.coin-balance-val').forEach(el => el.textContent = c);
    document.querySelectorAll('.gem-balance-val').forEach(el => el.textContent = g);
  }

  showFloatingText(text, color = '#FACC15') {
    const el = document.createElement('div');
    el.className = 'floating-popup';
    el.textContent = text;
    el.style.color = color;
    this.dom.floatingText.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1200);
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


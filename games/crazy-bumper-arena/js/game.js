/**
 * Crazy Bumper Arena - Main Game Coordinator
 * Orchestrates Three.js rendering, third-person elevated camera with impact shake,
 * physics loop, AI rivals, particle VFX, and responsive match states.
 */
class CrazyBumperGame {
  constructor() {
    this.container = document.getElementById('gameCanvasContainer');
    this.state = 'menu'; // 'menu', 'playing', 'paused', 'gameover', 'victory', 'garage'
    this.currentLevelIndex = 0;

    // Sub-systems
    this.audio = new AudioManager();
    this.physics = new PhysicsEngine(22);
    this.ai = new AIManager(this.physics, 22);

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sunLight = null;

    // Dynamic Camera State
    this.camShake = { x: 0, y: 0, z: 0 };
    this.targetCamPos = new THREE.Vector3(0, 16, 26);
    this.currentCamPos = new THREE.Vector3(0, 16, 26);
    this.currentCamLook = new THREE.Vector3(0, 0, 0);

    // Game Entities
    this.arena = null;
    this.playerCar = null;
    this.playerInput = { forward: false, backward: false, left: false, right: false };
    this.items = null;
    this.garage = null;
    this.ui = null;

    // Match Stats
    this.matchTimer = 90;
    this.matchScore = 0;
    this.matchCoins = 0;
    this.matchKnockouts = 0;
    this.particles = [];

    this.lastTime = 0;

    this.initThree();
    this.initSystems();
    this.bindKeyboard();
    this.animate(0);
  }

  initThree() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene with Atmospheric Stadium Night Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0A0F1D, 0.009);

    // 2. Third-Person Elevated Perspective Camera (Balanced FOV: 46°)
    this.camera = new THREE.PerspectiveCamera(46, width / height, 0.5, 450);
    this.camera.position.set(0, 18, 28);
    this.camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer with High-Performance Shadows & Tone Mapping
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Premium Stadium Lighting (Key, Rims, Ambient)
    const ambient = new THREE.AmbientLight(0x2A324B, 0.85);
    this.scene.add(ambient);

    // Main Overhead Warm Floodlight
    const sun = new THREE.DirectionalLight(0xFFFBEB, 1.15);
    sun.position.set(24, 45, 24);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 140;
    const d = 36;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    this.sunLight = sun;
    this.scene.add(sun);

    // Cyan Stadium Rim Light (Left Flank)
    const cyanRim = new THREE.DirectionalLight(0x38BDF8, 0.55);
    cyanRim.position.set(-32, 16, -32);
    this.scene.add(cyanRim);

    // Magenta Stadium Rim Light (Right Flank)
    const magentaRim = new THREE.DirectionalLight(0xF43F5E, 0.45);
    magentaRim.position.set(32, 14, -32);
    this.scene.add(magentaRim);

    // Warm Gold Backlight (Ferris Wheel & Bleacher Highlights)
    const goldBack = new THREE.DirectionalLight(0xFACC15, 0.40);
    goldBack.position.set(0, 22, -45);
    this.scene.add(goldBack);

    // Resize handling
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  initSystems() {
    this.items = new ItemManager(this.scene, 22);
    this.garage = new GarageManager(this.scene, (carDef) => {
      if (this.state === 'playing') {
        this.rebuildPlayerCar(carDef);
      }
    });
    this.ui = new UIManager(this);
    window.cbaGame = this;
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (this.state !== 'playing') {
        if (e.code === 'Space' && this.state === 'menu') {
          this.startMatch(this.currentLevelIndex);
        }
        return;
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.playerInput.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.playerInput.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.playerInput.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.playerInput.right = true;
          break;
        case 'Space':
          e.preventDefault();
          this.activatePowerup();
          break;
        case 'Escape':
        case 'KeyP':
          this.pauseMatch();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.playerInput.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.playerInput.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.playerInput.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.playerInput.right = false;
          break;
      }
    });
  }

  startMatch(levelIndex = 0) {
    this.state = 'playing';
    this.currentLevelIndex = levelIndex;
    this.audio.init();
    this.audio.startEngine();

    // Reset physics & arena
    this.physics.clearCars();
    if (this.arena) {
      this.arena.cleanup();
    }
    this.items.cleanup();

    // 1. Build Stadium Arena
    this.arena = ArenaBuilder.buildArena(this.scene, levelIndex);
    const radius = this.arena.config.arenaRadius;
    this.physics.setArenaRadius(radius);
    this.ai.setArenaRadius(radius);
    this.items.setArenaRadius(radius);

    // 2. Build Player Bumper Car
    const carDef = this.garage.getSelectedCarDef();
    const custom = this.garage.customColors[carDef.id] || {};
    const playerMesh = ModelFactory.createBumperCar(carDef, {
      primaryColor: custom.primaryColor || carDef.primaryColor,
      accentColor: custom.accentColor || carDef.accentColor
    });

    playerMesh.position.set(0, 0, radius * 0.52);
    playerMesh.rotation.y = Math.PI; // Face inward towards center
    this.scene.add(playerMesh);

    this.playerCar = {
      id: 'player',
      name: 'Player',
      isPlayer: true,
      mesh: playerMesh,
      x: 0,
      z: radius * 0.52,
      vx: 0,
      vz: 0,
      heading: Math.PI,
      speed: 0,
      impulseX: 0,
      impulseZ: 0,
      health: 100,
      maxHealth: 100,
      knockedOut: false,
      stats: { ...carDef.stats },
      input: this.playerInput,
      nitroTimer: 0,
      shieldTimer: 0,
      superBumperTimer: 0,
      magnetTimer: 0,
      isNitro: false,
      isShield: false,
      isSuperBumper: false,
      isMagnet: false,
      storedPowerup: 'nitro',
      onCarCollide: (other, imp, cx, cz) => {
        const intensity = Math.min(imp / 8, 2.5);
        this.audio.playCollision(intensity);
        this.createSparks(cx, 0.45, cz, 20);

        // Dynamic Camera Impact Shake!
        this.camShake.x += (Math.random() - 0.5) * intensity * 0.45;
        this.camShake.y += (Math.random() - 0.5) * intensity * 0.35;

        this.matchScore += Math.floor(imp * 12);

        // Check for opponent knockout
        if (other.isAI && other.health <= 0 && !other.knockedOut) {
          other.knockedOut = true;
          this.matchKnockouts++;
          this.matchScore += 400;
          this.audio.playKnockout();
          this.createFirework(other.x, 1.4, other.z);
          this.ui.showFloatingText(`KNOCKOUT! +400`, '#EF4444');
          this.scene.remove(other.mesh);
        }
      },
      onWallCollide: (imp) => {
        this.audio.playCollision(0.8);
        this.createSparks(this.playerCar.x, 0.4, this.playerCar.z, 10);
        this.camShake.x += (Math.random() - 0.5) * 0.25;
      }
    };

    this.physics.addCar(this.playerCar);

    // 3. Build 5 AI Opponents
    this.ai.initOpponents(this.scene, levelIndex);

    // 4. Spawn Items (Coins & Power-ups)
    this.items.spawnCoins(14);
    this.items.spawnPowerups(4);

    // Reset Match Stats
    this.matchTimer = this.arena.config.timeLimit;
    this.matchScore = 0;
    this.matchCoins = 0;
    this.matchKnockouts = 0;

    // Reset camera position right behind player
    this.currentCamPos.set(0, 16, radius * 0.52 + 12);
    this.currentCamLook.set(0, 1.2, radius * 0.52);

    this.ui.showScreen('playing');
    this.ui.showFloatingText(`ARENA: ${this.arena.config.name}!`, '#38BDF8');
  }

  pauseMatch() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.audio.stopEngine();
    this.ui.dom.pauseModal.classList.add('active');
  }

  resumeMatch() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.audio.startEngine();
    this.ui.dom.pauseModal.classList.remove('active');
  }

  returnToMenu() {
    this.state = 'menu';
    this.audio.stopEngine();
    if (this.arena) this.arena.cleanup();
    if (this.playerCar && this.playerCar.mesh) {
      this.scene.remove(this.playerCar.mesh);
      this.playerCar = null;
    }
    this.physics.clearCars();
    this.items.cleanup();

    this.camera.position.set(0, 18, 28);
    this.camera.lookAt(0, 2, 0);

    this.ui.showScreen('menu');
  }

  activatePowerup() {
    if (!this.playerCar || this.playerCar.knockedOut) return;
    const pType = this.playerCar.storedPowerup;
    if (!pType) return;

    this.audio.playPowerup(pType);

    if (pType === 'nitro') {
      this.playerCar.isNitro = true;
      this.playerCar.nitroTimer = 4.0;
      this.ui.showFloatingText('NITRO BOOST!', '#EF4444');
    } else if (pType === 'super_bumper') {
      this.playerCar.isSuperBumper = true;
      this.playerCar.superBumperTimer = 6.0;
      this.ui.showFloatingText('SUPER BUMPER!', '#F59E0B');
    } else if (pType === 'shield') {
      this.playerCar.isShield = true;
      this.playerCar.shieldTimer = 7.0;
      this.ui.showFloatingText('ENERGY SHIELD!', '#06B6D4');
    } else if (pType === 'magnet') {
      this.playerCar.isMagnet = true;
      setTimeout(() => { if (this.playerCar) this.playerCar.isMagnet = false; }, 8000);
      this.ui.showFloatingText('COIN MAGNET!', '#8B5CF6');
    } else if (pType === 'shockwave') {
      this.ai.opponents.forEach(opp => {
        if (opp.knockedOut) return;
        const dx = opp.x - this.playerCar.x;
        const dz = opp.z - this.playerCar.z;
        const dist = Math.hypot(dx, dz);
        if (dist < 12.0 && dist > 0.01) {
          const force = (12.0 - dist) * 3.8;
          opp.impulseX += (dx / dist) * force;
          opp.impulseZ += (dz / dist) * force;
          opp.health -= 25;
        }
      });
      this.createShockwaveRing(this.playerCar.x, 0.2, this.playerCar.z);
      this.ui.showFloatingText('SHOCKWAVE PULSE!', '#10B981');
    }

    this.playerCar.storedPowerup = null;
  }

  claimDailyReward() {
    this.audio.playVictory();
    this.garage.addCoins(100);
    this.ui.updateCoinDisplay();
    this.ui.showFloatingText('+100 DAILY COINS!', '#FACC15');
    const btn = document.getElementById('btnDailyReward');
    if (btn) btn.disabled = true;
  }

  // Particle Generators
  createSparks(x, y, z, count = 16) {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos.push(x, y, z);
      vel.push(
        (Math.random() - 0.5) * 8,
        Math.random() * 6 + 1.5,
        (Math.random() - 0.5) * 8
      );
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xFACC15, size: 0.18, transparent: true, opacity: 1 });
    const pts = new THREE.Points(geo, mat);
    this.scene.add(pts);
    this.particles.push({ mesh: pts, vel, life: 0.5 });
  }

  createShockwaveRing(x, y, z) {
    const ringGeo = new THREE.RingGeometry(0.5, 1.4, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.95, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(x, y, z);
    this.scene.add(ring);
    this.particles.push({ mesh: ring, scaleSpeed: 24, opacitySpeed: 1.8, isRing: true, life: 0.65 });
  }

  createFirework(x, y, z) {
    this.createSparks(x, y, z, 36);
  }

  animate(time) {
    requestAnimationFrame((t) => this.animate(t));

    const delta = Math.min((time - this.lastTime) * 0.001, 0.05) || 0.016;
    this.lastTime = time;

    // 1. Update In-Game Loop
    if (this.state === 'playing') {
      // Match Timer
      this.matchTimer -= delta;
      if (this.matchTimer <= 0) {
        this.matchTimer = 0;
        this.checkMatchEnd();
      }

      // Check Player Health
      if (this.playerCar && this.playerCar.health <= 0) {
        this.playerCar.knockedOut = true;
        this.audio.playDefeat();
        this.state = 'gameover';
        this.audio.stopEngine();
        this.ui.showGameOver({
          score: this.matchScore,
          coins: this.matchCoins,
          knockouts: this.matchKnockouts,
          time: this.arena.config.timeLimit - this.matchTimer
        });
      }

      // Update Engine Sound
      if (this.playerCar) {
        this.audio.updateEngine(Math.abs(this.playerCar.speed) / 12.0);
      }

      // Physics Step
      this.physics.update(delta, this.arena.config);

      // AI Step
      this.ai.update(delta, this.playerCar, this.items.coins, this.items.powerups);

      // Items Step (Coins & Powerups)
      this.items.update(
        delta,
        time * 0.001,
        [this.playerCar, ...this.ai.opponents],
        (car, coin) => {
          if (car.isPlayer) {
            this.audio.playCoin();
            this.matchCoins += 5;
            this.matchScore += 50;
            this.garage.addCoins(5);
            this.ui.showFloatingText('+5 COINS', '#FACC15');
          }
        },
        (car, powerupType) => {
          if (car.isPlayer) {
            this.playerCar.storedPowerup = powerupType;
            this.audio.playPowerup(powerupType);
            this.ui.showFloatingText(`GOT ${powerupType.toUpperCase()}!`, '#38BDF8');
          }
        }
      );

      // Arena Custom Animators (Ferris wheel, cheering crowd, pulsing lava, etc.)
      if (this.arena && this.arena.animators) {
        this.arena.animators.forEach(fn => fn(delta, time * 0.001));
      }

      // -------------------------------------------------------------
      // ELEVATED THIRD-PERSON CAMERA WITH DYNAMIC SPRING & IMPACT SHAKE
      // -------------------------------------------------------------
      if (this.playerCar && this.playerCar.mesh) {
        const pPos = this.playerCar.mesh.position;
        const pHeading = this.playerCar.heading;

        // Elevated third-person parameters:
        // Positioned 11m behind, 6.2m high, looking 3.2m ahead into the arena path
        const camDist = 11.2;
        const camHeight = 6.2;
        const lookAhead = 3.2;

        const targetX = pPos.x - Math.sin(pHeading) * camDist;
        const targetZ = pPos.z - Math.cos(pHeading) * camDist;
        const targetY = pPos.y + camHeight;

        // Smooth spring damper follow
        const lerpFactor = 0.12;
        this.currentCamPos.x += (targetX - this.currentCamPos.x) * lerpFactor;
        this.currentCamPos.z += (targetZ - this.currentCamPos.z) * lerpFactor;
        this.currentCamPos.y += (targetY - this.currentCamPos.y) * lerpFactor;

        // Apply Impact Shake
        this.camera.position.x = this.currentCamPos.x + this.camShake.x;
        this.camera.position.y = this.currentCamPos.y + this.camShake.y;
        this.camera.position.z = this.currentCamPos.z + this.camShake.z;

        // Decay shake rapidly
        this.camShake.x *= 0.85;
        this.camShake.y *= 0.85;
        this.camShake.z *= 0.85;

        // Target look point (aiming slightly in front of the car)
        const targetLookX = pPos.x + Math.sin(pHeading) * lookAhead;
        const targetLookZ = pPos.z + Math.cos(pHeading) * lookAhead;
        const targetLookY = pPos.y + 1.2;

        this.currentCamLook.x += (targetLookX - this.currentCamLook.x) * 0.15;
        this.currentCamLook.y += (targetLookY - this.currentCamLook.y) * 0.15;
        this.currentCamLook.z += (targetLookZ - this.currentCamLook.z) * 0.15;

        this.camera.lookAt(this.currentCamLook);
      }

      // Update In-Game HUD
      const activeOpponents = this.ai.opponents.filter(o => !o.knockedOut).length;
      this.ui.updateHUD({
        timeLeft: this.matchTimer,
        score: this.matchScore,
        coins: this.matchCoins,
        remainingOpponents: activeOpponents,
        health: this.playerCar ? this.playerCar.health : 0,
        activePowerup: this.playerCar ? this.playerCar.storedPowerup : null
      });

      // Win Condition: All 5 opponents defeated
      if (activeOpponents === 0) {
        this.checkMatchEnd(true);
      }
    }

    // 2. Update Garage if active
    if (this.state === 'garage' || this.ui.dom.garageScreen.classList.contains('active')) {
      this.garage.update(delta);
    }

    // 3. Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= delta;

      if (p.isRing) {
        p.mesh.scale.x += p.scaleSpeed * delta;
        p.mesh.scale.y += p.scaleSpeed * delta;
        p.mesh.material.opacity -= p.opacitySpeed * delta;
      } else {
        const posAttr = p.mesh.geometry.attributes.position;
        const arr = posAttr.array;
        for (let j = 0; j < arr.length; j += 3) {
          arr[j] += p.vel[j] * delta;
          arr[j + 1] += p.vel[j + 1] * delta;
          p.vel[j + 1] -= 9.8 * delta; // gravity
          arr[j + 2] += p.vel[j + 2] * delta;
        }
        posAttr.needsUpdate = true;
        p.mesh.material.opacity = Math.max(0, p.life * 2);
      }

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  checkMatchEnd(forceVictory = false) {
    if (this.state !== 'playing') return;
    this.audio.stopEngine();

    const opponentsAlive = this.ai.opponents.filter(o => !o.knockedOut).length;
    const isWin = forceVictory || (opponentsAlive <= 2 && this.playerCar.health > 0);

    if (isWin) {
      this.state = 'victory';
      this.audio.playVictory();
      const bonusCoins = 50 + (this.currentLevelIndex * 25);
      this.garage.addCoins(bonusCoins);

      // Unlock next level in progression
      const completed = JSON.parse(localStorage.getItem('cba_completed_levels') || '[0]');
      if (!completed.includes(this.currentLevelIndex + 1)) {
        completed.push(this.currentLevelIndex + 1);
        localStorage.setItem('cba_completed_levels', JSON.stringify(completed));
      }

      this.ui.showVictory({
        score: this.matchScore,
        coins: this.matchCoins,
        bonus: bonusCoins
      });
    } else {
      this.state = 'gameover';
      this.audio.playDefeat();
      this.ui.showGameOver({
        score: this.matchScore,
        coins: this.matchCoins,
        knockouts: this.matchKnockouts,
        time: this.arena.config.timeLimit - this.matchTimer
      });
    }
  }
}

// Global bootstrap on load
window.addEventListener('DOMContentLoaded', () => {
  new CrazyBumperGame();
});

/**
 * Jungle Dash 3D - Main Game Loop & Coordinator Engine
 * Controls rendering, player state machine (running, lane-switch, jumping, sliding),
 * collision physics, camera tracking, and lifecycle.
 */
class JungleDashGame {
  constructor() {
    this.container = document.getElementById('gameCanvasContainer');
    this.state = 'menu'; // menu, running, paused, gameover

    this.currentWorldIndex = 0;
    this.targetLane = 1; // 0: Left, 1: Center, 2: Right
    this.currentLaneX = 0;
    this.targetLaneX = 0;

    // Kinematics
    this.playerX = 0;
    this.playerY = 0;
    this.playerZ = 0;
    this.baseSpeed = 16.0;
    this.currentSpeed = 16.0;
    this.maxSpeed = 28.0;

    // Jump & Slide
    this.isJumping = false;
    this.jumpVy = 0;
    this.isSliding = false;
    this.slideTimer = 0;

    // Run Stats
    this.runScore = 0;
    this.runDistance = 0;
    this.runCoins = 0;
    this.runGems = 0;
    this.runJumps = 0;
    this.runPowerups = 0;

    // Camera & Shake
    this.camShake = new THREE.Vector3();
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

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(54, width / height, 0.5, 400);
    this.camera.position.set(0, 4.2, 7.5);
    this.camera.lookAt(0, 1.2, -6);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Warm Tropical Sun Lighting
    const amb = new THREE.AmbientLight(0xFFFBEB, 0.85);
    this.scene.add(amb);

    const sun = new THREE.DirectionalLight(0xFFF7ED, 1.25);
    sun.position.set(15, 30, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 5;
    sun.shadow.camera.far = 120;
    const d = 25;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    this.scene.add(sun);

    // Tropical Cyan Backlight
    const cyanRim = new THREE.DirectionalLight(0x38BDF8, 0.6);
    cyanRim.position.set(-15, 12, -25);
    this.scene.add(cyanRim);

    window.addEventListener('resize', () => {
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  initSystems() {
    this.audio = new AudioManager();
    this.missions = new MissionManager();
    this.world = new WorldManager(this.scene);
    this.track = new TrackManager(this.scene);
    this.powerups = new PowerupManager(this);
    this.shop = new ShopManager(this);
    this.ui = new UIManager(this);

    // Build Initial Character
    const initialSkin = ModelFactory.SKINS.find(s => s.id === this.missions.selectedSkinId) || ModelFactory.SKINS[0];
    this.rebuildPlayer(initialSkin);

    window.jdGame = this;
  }

  rebuildPlayer(skinDef) {
    if (this.player && this.player.root) {
      this.scene.remove(this.player.root);
    }
    this.player = ModelFactory.createPlayer(skinDef);
    this.player.root.position.set(0, 0, 0);
    this.scene.add(this.player.root);
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (this.state !== 'running') {
        if (e.code === 'Space' && this.state === 'menu') {
          this.startRun(this.currentWorldIndex);
        }
        return;
      }

      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          this.moveLeft();
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.moveRight();
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'Space':
          this.jump();
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.slide();
          break;
        case 'Escape':
        case 'KeyP':
          this.pauseRun();
          break;
      }
    });
  }

  startRun(worldIndex = 0) {
    this.currentWorldIndex = worldIndex;
    const worldCfg = this.world.loadWorld(worldIndex);
    this.track.init(worldCfg);
    this.powerups.reset();

    // Reset Player Kinematics
    this.targetLane = 1;
    this.targetLaneX = TrackManager.LANES[1];
    this.currentLaneX = this.targetLaneX;
    this.playerX = this.currentLaneX;
    this.playerY = 0;
    this.playerZ = 0;
    this.isJumping = false;
    this.jumpVy = 0;
    this.isSliding = false;
    this.slideTimer = 0;

    this.baseSpeed = 16.0 * (worldCfg.speedMultiplier || 1.0);
    this.currentSpeed = this.baseSpeed;

    // Reset Run Stats
    this.runScore = 0;
    this.runDistance = 0;
    this.runCoins = 0;
    this.runGems = 0;
    this.runJumps = 0;
    this.runPowerups = 0;

    this.player.root.position.set(0, 0, 0);
    this.player.root.rotation.set(0, 0, 0);

    this.state = 'running';
    this.ui.showScreen('running');
    this.audio.startMusic();
    this.ui.showFloatingText(`WORLD: ${worldCfg.name.toUpperCase()}!`, '#38BDF8');
  }

  moveLeft() {
    if (this.state !== 'running') return;
    if (this.targetLane > 0) {
      this.targetLane--;
      this.targetLaneX = TrackManager.LANES[this.targetLane];
      this.audio.playFootstep();
    }
  }

  moveRight() {
    if (this.state !== 'running') return;
    if (this.targetLane < TrackManager.LANES.length - 1) {
      this.targetLane++;
      this.targetLaneX = TrackManager.LANES[this.targetLane];
      this.audio.playFootstep();
    }
  }

  jump() {
    if (this.state !== 'running') return;
    // Allow jumping from ground or cancelling a slide into a jump!
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpVy = 13.5;
      this.isSliding = false;
      this.runJumps++;
      this.audio.playJump();
      this.createPuff(this.playerX, 0.1, this.playerZ, 10);
    }
  }

  slide() {
    if (this.state !== 'running') return;
    if (this.isJumping) {
      // Fast drop down when sliding mid-air!
      this.jumpVy = -18.0;
    }
    this.isSliding = true;
    this.slideTimer = 0.72;
    this.audio.playSlide();
    this.createPuff(this.playerX, 0.1, this.playerZ, 12);
  }

  pauseRun() {
    if (this.state !== 'running') return;
    this.state = 'paused';
    this.audio.stopMusic();
    this.ui.dom.pauseModal.classList.add('active');
  }

  resumeRun() {
    if (this.state !== 'paused') return;
    this.state = 'running';
    this.audio.startMusic();
    this.ui.dom.pauseModal.classList.remove('active');
  }

  returnToMenu() {
    this.state = 'menu';
    this.audio.stopMusic();
    this.ui.showScreen('menu');
  }

  triggerCrash(obstacle) {
    // Check if protected by Shield or Hoverboard
    const shieldResult = this.powerups.consumeShieldOrHoverboard();
    if (shieldResult.absorbed) {
      this.audio.playPowerup('shield');
      this.createSparks(this.playerX, 1.0, this.playerZ, 25, 0x38BDF8);
      this.ui.showFloatingText(`${shieldResult.item.toUpperCase()} SAVED YOU!`, '#38BDF8');
      obstacle.cleared = true;
      return;
    }

    // Check if in Speed Boost
    if (this.powerups.has('boost')) {
      this.createSparks(obstacle.x, 1.0, obstacle.z, 20, 0xF97316);
      this.ui.showFloatingText('SMASHED! +100', '#F97316');
      this.runScore += 100;
      obstacle.cleared = true;
      return;
    }

    // Fatal Crash
    this.state = 'gameover';
    this.audio.stopMusic();
    this.audio.playCrash();
    this.audio.playGameOver();

    this.createSparks(this.playerX, 1.0, this.playerZ, 30, 0xEF4444);
    this.camShake.set(0.6, 0.6, 0.6);

    // Save progression
    this.missions.addCoins(this.runCoins);
    this.missions.addGems(this.runGems);
    const isNewRecord = this.missions.updateRunRecord(this.runScore, this.runDistance);

    this.missions.checkRunProgress({
      distance: this.runDistance,
      score: this.runScore,
      coins: this.runCoins,
      gems: this.runGems,
      jumps: this.runJumps,
      powerups: this.runPowerups
    });

    this.ui.showGameOver({
      distance: this.runDistance,
      score: this.runScore,
      coins: this.runCoins,
      gems: this.runGems,
      isNewRecord: isNewRecord
    });
  }

  // Particle Generation
  createPuff(x, y, z, count = 8) {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos.push(x + (Math.random() - 0.5) * 0.4, y, z + (Math.random() - 0.5) * 0.4);
      vel.push((Math.random() - 0.5) * 2.5, Math.random() * 2 + 0.5, (Math.random() - 0.5) * 2.5);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xD1D5DB, size: 0.18, transparent: true, opacity: 0.8 });
    const pts = new THREE.Points(geo, mat);
    this.scene.add(pts);
    this.particles.push({ mesh: pts, vel, life: 0.35 });
  }

  createSparks(x, y, z, count = 16, color = 0xFACC15) {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos.push(x, y, z);
      vel.push((Math.random() - 0.5) * 7, Math.random() * 6 + 1, (Math.random() - 0.5) * 7);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: color, size: 0.22, transparent: true, opacity: 1 });
    const pts = new THREE.Points(geo, mat);
    this.scene.add(pts);
    this.particles.push({ mesh: pts, vel, life: 0.5 });
  }

  animate(time) {
    requestAnimationFrame((t) => this.animate(t));

    const delta = Math.min((time - this.lastTime) * 0.001, 0.1);
    this.lastTime = time;

    if (this.state === 'running') {
      // 1. Advance Speed & Distance
      if (this.powerups.has('boost')) {
        this.currentSpeed = this.baseSpeed * 1.85;
      } else {
        // Accelerate naturally as run progresses
        this.currentSpeed = Math.min(this.maxSpeed, this.baseSpeed + (this.runDistance / 300) * 1.5);
      }

      const stepDist = this.currentSpeed * delta;
      this.playerZ -= stepDist;
      this.runDistance += stepDist;
      this.runScore += stepDist * (this.powerups.has('multiplier') ? 2.5 : 1.2);

      // 2. Smooth Lane Switching
      this.currentLaneX += (this.targetLaneX - this.currentLaneX) * 14.0 * delta;
      this.playerX = this.currentLaneX;

      // 3. Jump Gravity Physics
      if (this.isJumping) {
        this.playerY += this.jumpVy * delta;
        this.jumpVy -= 32.0 * delta; // Gravity
        if (this.playerY <= 0) {
          this.playerY = 0;
          this.isJumping = false;
          this.jumpVy = 0;
          this.audio.playFootstep();
          this.createPuff(this.playerX, 0.1, this.playerZ, 6);
        }
      }

      // 4. Slide Duration
      if (this.isSliding) {
        this.slideTimer -= delta;
        if (this.slideTimer <= 0) {
          this.isSliding = false;
        }
      }

      // 5. Update Player Mesh & Procedural Running Rig Animation
      if (this.player) {
        this.player.root.position.set(this.playerX, this.playerY, this.playerZ);

        // Banking lean on lane switch
        const laneDx = this.targetLaneX - this.currentLaneX;
        this.player.root.rotation.z = -laneDx * 0.12;

        const runCadence = time * 0.015 * (this.currentSpeed / 16.0);

        if (this.isSliding) {
          // Slide pose: low crouch sliding along viaduct pavers
          if (this.player.hips) this.player.hips.position.y = 0.38;
          if (this.player.spine) {
            this.player.spine.rotation.x = -0.7;
            this.player.spine.rotation.y = 0;
          }
          if (this.player.rightLeg) {
            this.player.rightLeg.hipJoint.rotation.x = 1.45;
            this.player.rightLeg.knee.rotation.x = 0.1;
          }
          if (this.player.leftLeg) {
            this.player.leftLeg.hipJoint.rotation.x = 0.6;
            this.player.leftLeg.knee.rotation.x = 1.35;
          }
          if (this.player.leftArm) {
            this.player.leftArm.shoulder.rotation.x = 0.7;
            this.player.leftArm.elbow.rotation.x = -0.4;
          }
          if (this.player.rightArm) {
            this.player.rightArm.shoulder.rotation.x = 0.7;
            this.player.rightArm.elbow.rotation.x = -0.4;
          }
        } else if (this.isJumping) {
          // Jump pose: athletic tuck, arms reaching forward
          if (this.player.hips) this.player.hips.position.y = 0.95;
          if (this.player.spine) {
            this.player.spine.rotation.x = 0.15;
            this.player.spine.rotation.y = 0;
          }
          if (this.player.leftLeg) {
            this.player.leftLeg.hipJoint.rotation.x = 0.6;
            this.player.leftLeg.knee.rotation.x = 0.9;
          }
          if (this.player.rightLeg) {
            this.player.rightLeg.hipJoint.rotation.x = 0.4;
            this.player.rightLeg.knee.rotation.x = 1.1;
          }
          if (this.player.leftArm) {
            this.player.leftArm.shoulder.rotation.x = -1.2;
            this.player.leftArm.elbow.rotation.x = -0.6;
          }
          if (this.player.rightArm) {
            this.player.rightArm.shoulder.rotation.x = -1.0;
            this.player.rightArm.elbow.rotation.x = -0.5;
          }
        } else {
          // Normal Running Cycle: alternating swinging limbs with knee flexion & spinal twist
          if (this.player.hips) this.player.hips.position.y = 0.95 + Math.abs(Math.sin(runCadence * 2)) * 0.06;
          if (this.player.spine) {
            this.player.spine.rotation.x = 0.14 + Math.sin(runCadence * 2) * 0.03;
            this.player.spine.rotation.y = Math.sin(runCadence) * 0.08;
          }

          const legSwing = Math.sin(runCadence) * 0.75;
          if (this.player.leftLeg) {
            this.player.leftLeg.hipJoint.rotation.x = legSwing;
            this.player.leftLeg.knee.rotation.x = Math.max(0, -legSwing * 1.1);
          }
          if (this.player.rightLeg) {
            this.player.rightLeg.hipJoint.rotation.x = -legSwing;
            this.player.rightLeg.knee.rotation.x = Math.max(0, legSwing * 1.1);
          }
          if (this.player.leftArm) {
            this.player.leftArm.shoulder.rotation.x = -legSwing * 0.85;
            this.player.leftArm.elbow.rotation.x = -0.4 - Math.max(0, -legSwing) * 0.5;
          }
          if (this.player.rightArm) {
            this.player.rightArm.shoulder.rotation.x = legSwing * 0.85;
            this.player.rightArm.elbow.rotation.x = -0.4 - Math.max(0, legSwing) * 0.5;
          }
        }
      }

      // 6. Update Endless Track & Collisions
      this.track.update(this.playerZ, time * 0.001);
      this.powerups.update(delta);
      this.world.update(delta, time * 0.001);

      // 7. Check Entity Collisions
      this.checkCollisions();

      // 8. Update Camera (Smooth Elevated Third-Person Chase Follow - Temple Run 2 style)
      const targetCamX = this.playerX * 0.45;
      const targetCamY = this.playerY + 3.8;
      const targetCamZ = this.playerZ + 6.2;

      this.camera.position.x += (targetCamX - this.camera.position.x) * 12 * delta;
      this.camera.position.y += (targetCamY - this.camera.position.y) * 10 * delta;
      this.camera.position.z += (targetCamZ - this.camera.position.z) * 16 * delta;

      // Dynamic FOV boost during speed boost
      const targetFov = this.powerups.has('boost') ? 66 : 54;
      if (Math.abs(this.camera.fov - targetFov) > 0.2) {
        this.camera.fov += (targetFov - this.camera.fov) * 5 * delta;
        this.camera.updateProjectionMatrix();
      }

      // Apply Camera Shake
      this.camera.position.add(this.camShake);
      this.camShake.multiplyScalar(0.85);

      const lookTarget = new THREE.Vector3(this.playerX * 0.2, this.playerY + 1.2, this.playerZ - 8.5);
      this.camera.lookAt(lookTarget);

      // 9. Update In-Game HUD
      this.ui.updateHUD({
        distance: this.runDistance,
        score: this.runScore,
        coins: this.runCoins,
        gems: this.runGems
      });
    }

    // Update Shop turntable if active
    if (this.ui.dom.shopScreen.classList.contains('active')) {
      this.shop.update(delta);
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= delta;
      const pos = p.mesh.geometry.attributes.position.array;
      for (let j = 0; j < pos.length; j += 3) {
        pos[j] += p.vel[j] * delta;
        pos[j + 1] += p.vel[j + 1] * delta;
        pos[j + 2] += p.vel[j + 2] * delta;
      }
      p.mesh.geometry.attributes.position.needsUpdate = true;
      p.mesh.material.opacity = Math.max(0, p.life * 2.5);

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  checkCollisions() {
    const pX = this.playerX;
    const pY = this.playerY;
    const pZ = this.playerZ;

    // A. Obstacle Collisions
    for (let i = 0; i < this.track.obstacles.length; i++) {
      const obs = this.track.obstacles[i];
      if (obs.cleared) continue;

      // Broken Bridge Chasm Gap Check
      if (obs.isGap) {
        if (pZ <= obs.gapStart && pZ >= obs.gapEnd) {
          // If player is not jumping high enough across chasm -> fatal fall!
          if (pY < 0.6) {
            this.triggerCrash(obs);
            break;
          }
        }
        continue;
      }

      const dz = Math.abs(pZ - obs.z);
      const dx = Math.abs(pX - obs.x);

      // Check collision bounds
      if (dz < 1.35) {
        if (obs.hitType === 'pendulum') {
          // Swinging Spiked Pendulum Blade Trap
          if (this.isSliding) {
            obs.cleared = true;
            this.runScore += 30;
            continue;
          }
          // Blade sweep calculation
          const swingAngle = obs.pendulumMesh ? obs.pendulumMesh.rotation.z : 0;
          const bladeX = -Math.sin(swingAngle) * 3.2;
          const bladeDistX = Math.abs(pX - (obs.x + bladeX));
          if (bladeDistX < 1.1) {
            this.triggerCrash(obs);
            break;
          }
          continue;
        }

        if (dx < 1.05) {
          if (obs.hitType === 'low') {
            // Must jump: if player high enough, success!
            if (pY >= 0.75) {
              obs.cleared = true;
              this.runScore += 25;
              continue;
            }
          } else if (obs.hitType === 'high') {
            // Must slide: if sliding, success!
            if (this.isSliding) {
              obs.cleared = true;
              this.runScore += 25;
              continue;
            }
          }

          // Fatal collision hit!
          this.triggerCrash(obs);
          break;
        }
      }
    }

    // B. Coin Pickups
    for (let i = 0; i < this.track.coins.length; i++) {
      const coin = this.track.coins[i];
      if (coin.collected) continue;

      const dz = Math.abs(pZ - coin.z);
      const dx = Math.abs(pX - coin.x);
      const dy = Math.abs(pY - coin.mesh.position.y);

      if (dz < 1.4 && dx < 1.1 && dy < 1.4) {
        coin.collected = true;
        coin.mesh.visible = false;
        const multiplier = this.powerups.has('multiplier') ? 2 : 1;
        this.runCoins += multiplier;
        this.runScore += 50 * multiplier;
        this.audio.playCoin();
        this.createSparks(coin.x, coin.mesh.position.y, coin.z, 8, 0xFACC15);
      }
    }

    // C. Gem Pickups
    for (let i = 0; i < this.track.gems.length; i++) {
      const gem = this.track.gems[i];
      if (gem.collected) continue;

      const dz = Math.abs(pZ - gem.z);
      const dx = Math.abs(pX - gem.x);
      const dy = Math.abs(pY - gem.mesh.position.y);

      if (dz < 1.5 && dx < 1.1 && dy < 1.5) {
        gem.collected = true;
        gem.mesh.visible = false;
        this.runGems += 1;
        this.runScore += 250;
        this.audio.playGem();
        this.createSparks(gem.x, gem.mesh.position.y, gem.z, 14, 0x06B6D4);
        this.ui.showFloatingText('+1 BLUE GEM!', '#06B6D4');
      }
    }

    // D. Powerup Pickups
    for (let i = 0; i < this.track.powerups.length; i++) {
      const p = this.track.powerups[i];
      if (p.collected) continue;

      const dz = Math.abs(pZ - p.z);
      const dx = Math.abs(pX - p.x);

      if (dz < 1.5 && dx < 1.1) {
        p.collected = true;
        p.mesh.visible = false;
        this.runPowerups++;
        this.powerups.activate(p.type);
        this.audio.playPowerup(p.type);
        this.createSparks(p.x, 1.0, p.z, 18, 0xF97316);
      }
    }
  }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
  new JungleDashGame();
});


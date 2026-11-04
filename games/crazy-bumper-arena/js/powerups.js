/**
 * Crazy Bumper Arena - Collectibles & Power-Ups Manager
 * Manages 3D rotating coins, power-up orbs (Nitro, Super Bumper, Shield, Magnet, Shockwave),
 * and dynamic collection animations.
 */
class ItemManager {
  constructor(scene, arenaRadius = 24) {
    this.scene = scene;
    this.arenaRadius = arenaRadius;
    this.coins = [];
    this.powerups = [];
    this.coinMeshCache = null;
  }

  setArenaRadius(radius) {
    this.arenaRadius = radius;
  }

  /**
   * Spawns rotating 3D Gold Coins across the arena
   */
  spawnCoins(count = 12) {
    // Clear old coins
    this.coins.forEach(c => {
      this.scene.remove(c.mesh);
      c.mesh.geometry.dispose();
      c.mesh.material.dispose();
    });
    this.coins = [];

    const coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 16);
    coinGeo.rotateX(Math.PI / 2);
    const coinMat = new THREE.MeshPhongMaterial({
      color: 0xFACC15,
      emissive: 0xCA8A04,
      emissiveIntensity: 0.35,
      specular: 0xFFFFFF,
      shininess: 90
    });

    const spawnRadius = this.arenaRadius * 0.75;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 3.5 + Math.random() * (spawnRadius - 3.5);
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const mesh = new THREE.Mesh(coinGeo, coinMat);
      mesh.position.set(x, 0.65, z);
      this.scene.add(mesh);

      this.coins.push({
        id: `coin_${i}`,
        x: x,
        z: z,
        y: 0.65,
        mesh: mesh,
        collected: false,
        rotSpeed: 2.5 + Math.random() * 1.5,
        bobPhase: Math.random() * Math.PI * 2
      });
    }
  }

  /**
   * Spawns Power-Up Mystery Orbs
   */
  spawnPowerups(count = 4) {
    // Clear old
    this.powerups.forEach(p => {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    });
    this.powerups = [];

    const types = ['nitro', 'super_bumper', 'shield', 'magnet', 'shockwave'];
    const typeColors = {
      nitro: 0xEF4444,        // Red / Fire
      super_bumper: 0xF59E0B, // Electric Amber
      shield: 0x06B6D4,       // Cyan Energy
      magnet: 0x8B5CF6,       // Purple Gravity
      shockwave: 0x10B981     // Emerald Shock
    };

    const spawnRadius = this.arenaRadius * 0.70;
    for (let i = 0; i < count; i++) {
      const type = types[i % types.length];
      const angle = (i / count) * Math.PI * 2 + Math.PI / 6;
      const dist = 6.0 + Math.random() * (spawnRadius - 6.0);
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const orbGeo = new THREE.OctahedronGeometry(0.65, 2);
      const orbMat = new THREE.MeshPhongMaterial({
        color: typeColors[type],
        emissive: typeColors[type],
        emissiveIntensity: 0.45,
        specular: 0xFFFFFF,
        shininess: 90,
        wireframe: false
      });

      const mesh = new THREE.Mesh(orbGeo, orbMat);
      mesh.position.set(x, 0.85, z);

      // Surrounding energy halo ring
      const haloGeo = new THREE.TorusGeometry(0.85, 0.04, 8, 24);
      haloGeo.rotateX(Math.PI / 2);
      const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color: typeColors[type] }));
      mesh.add(halo);

      this.scene.add(mesh);

      this.powerups.push({
        id: `pw_${i}`,
        type: type,
        x: x,
        z: z,
        mesh: mesh,
        collected: false,
        rotSpeed: 3.0,
        bobPhase: Math.random() * Math.PI * 2
      });
    }
  }

  update(dt, time, cars, onCoinCollect, onPowerupCollect) {
    // 1. Update Coins (Rotation, Floating Bob & Magnet attraction)
    for (let i = 0; i < this.coins.length; i++) {
      const c = this.coins[i];
      if (c.collected) continue;

      c.mesh.rotation.y += c.rotSpeed * dt;
      c.mesh.position.y = 0.65 + Math.sin(time * 3 + c.bobPhase) * 0.15;

      // Check Car Proximity
      for (let j = 0; j < cars.length; j++) {
        const car = cars[j];
        if (car.knockedOut) continue;

        const dx = car.x - c.x;
        const dz = car.z - c.z;
        const dist = Math.hypot(dx, dz);

        // Coin Magnet Pull effect (if active on car)
        const magnetRange = car.isMagnet ? 9.5 : 0;
        if (magnetRange > 0 && dist < magnetRange && dist > 1.8) {
          const pullSpeed = 16.0 * dt;
          c.x += (dx / dist) * pullSpeed;
          c.z += (dz / dist) * pullSpeed;
          c.mesh.position.x = c.x;
          c.mesh.position.z = c.z;
        }

        // Collection distance (car radius ~1.4)
        if (dist < 1.95) {
          c.collected = true;
          this.scene.remove(c.mesh);
          if (onCoinCollect) onCoinCollect(car, c);
          break;
        }
      }
    }

    // 2. Update Power-ups (Rotation, Floating Bob, Collection)
    for (let i = 0; i < this.powerups.length; i++) {
      const p = this.powerups[i];
      if (p.collected) continue;

      p.mesh.rotation.y += p.rotSpeed * dt;
      p.mesh.rotation.x += 1.2 * dt;
      p.mesh.position.y = 0.85 + Math.sin(time * 2.5 + p.bobPhase) * 0.18;

      for (let j = 0; j < cars.length; j++) {
        const car = cars[j];
        if (car.knockedOut) continue;

        const dist = Math.hypot(car.x - p.x, car.z - p.z);
        if (dist < 2.1) {
          p.collected = true;
          this.scene.remove(p.mesh);
          if (onPowerupCollect) onPowerupCollect(car, p.type);
          break;
        }
      }
    }
  }

  cleanup() {
    this.coins.forEach(c => this.scene.remove(c.mesh));
    this.powerups.forEach(p => this.scene.remove(p.mesh));
    this.coins = [];
    this.powerups = [];
  }
}

window.ItemManager = ItemManager;


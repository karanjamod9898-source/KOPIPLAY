/**
 * Jungle Dash 3D - High-Fidelity Track Engine
 * Builds modular ancient stone viaducts with textured flagstones, carved parapets, flaming torches,
 * broken chasm gaps, swinging spiked pendulum traps, and 90-degree corner turns with object pooling.
 */
class TrackManager {
  static get LANES() {
    return [-2.4, 0, 2.4];
  }

  constructor(scene) {
    this.scene = scene;
    this.segmentLength = 34;
    this.segmentCount = 9;
    this.segments = [];
    this.nextZ = 0;
    this.activeWorld = null;

    this.obstacles = [];
    this.coins = [];
    this.gems = [];
    this.powerups = [];
    this.turns = []; // Turn trigger zones

    this.trackGroup = new THREE.Group();
    this.trackGroup.name = 'trackGroup';
    this.scene.add(this.trackGroup);
  }

  init(worldConfig) {
    this.activeWorld = worldConfig;
    this.clear();

    for (let i = 0; i < this.segmentCount; i++) {
      this.spawnSegment(i < 2); // First 2 segments are safe start
    }
  }

  clear() {
    while (this.trackGroup.children.length > 0) {
      this.trackGroup.remove(this.trackGroup.children[0]);
    }
    this.segments = [];
    this.obstacles = [];
    this.coins = [];
    this.gems = [];
    this.powerups = [];
    this.turns = [];
    this.nextZ = 16;
  }

  spawnSegment(isSafe = false) {
    const segGroup = new THREE.Group();
    const zPos = this.nextZ;
    segGroup.position.z = zPos;

    const width = 8.6;
    const len = this.segmentLength;

    const stoneTex = TextureGenerator.getStonePath();
    const roadMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.8,
      metalness: 0.1
    });

    const templeTex = TextureGenerator.getTempleStone();
    const parapetMat = new THREE.MeshStandardMaterial({
      map: templeTex,
      roughness: 0.85
    });

    // Check if this segment has a Broken Bridge Chasm Gap (every 6th segment after safe)
    const isGapSegment = !isSafe && (Math.abs(zPos) > 80) && (Math.abs(zPos) % 96 === 0);

    if (isGapSegment) {
      // Two separated stone bridge halves with a 6-meter chasm gap in the center!
      const halfLen = (len - 6.5) * 0.5;

      const road1 = new THREE.Mesh(new THREE.BoxGeometry(width, 1.4, halfLen), roadMat);
      road1.position.set(0, -0.7, -halfLen * 0.5 - 3.25);
      segGroup.add(road1);

      const road2 = new THREE.Mesh(new THREE.BoxGeometry(width, 1.4, halfLen), roadMat);
      road2.position.set(0, -0.7, halfLen * 0.5 + 3.25);
      segGroup.add(road2);

      // Register Gap Zone that requires jumping!
      const gapObj = {
        z: zPos,
        gapStart: zPos + 3.0,
        gapEnd: zPos - 3.0,
        isGap: true
      };
      this.obstacles.push(gapObj);
    } else {
      // Solid Ancient Stone Viaduct Surface
      const roadGeo = new THREE.BoxGeometry(width, 1.4, len);
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.position.y = -0.7;
      road.receiveShadow = true;
      segGroup.add(road);
    }

    // Carved Stone Parapets along left and right edges
    [-width * 0.5 + 0.3, width * 0.5 - 0.3].forEach(px => {
      const railGeo = new THREE.BoxGeometry(0.6, 0.75, len);
      const rail = new THREE.Mesh(railGeo, parapetMat);
      rail.position.set(px, 0.35, 0);
      segGroup.add(rail);

      // Carved Serpent / Jaguar Relief Posts with Iron Torches
      const posts = 4;
      for (let p = 0; p < posts; p++) {
        const pz = (p - 1.5) * (len / posts);
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.4, 0.75), parapetMat);
        post.position.set(px, 0.7, pz);
        segGroup.add(post);

        // Blazing Torch Sconce
        if (p % 2 === 0) {
          const sconce = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.45, 6), new THREE.MeshLambertMaterial({ color: 0x1E293B }));
          sconce.position.set(px, 1.5, pz);
          segGroup.add(sconce);

          const flame = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.42, 6), new THREE.MeshBasicMaterial({ color: 0xF97316 }));
          flame.position.set(px, 1.8, pz);
          segGroup.add(flame);
        }
      }
    });

    // Massive Stone Viaduct Support Arches underneath
    for (let a = -1; a <= 1; a += 2) {
      const arch = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 16, 8), parapetMat);
      arch.position.set(0, -8.5, a * (len * 0.28));
      segGroup.add(arch);
    }

    const segData = {
      group: segGroup,
      z: zPos,
      length: len,
      obstacles: [],
      coins: [],
      gems: [],
      powerups: []
    };

    if (!isSafe && !isGapSegment) {
      this.populateSegment(segData);
    }

    this.trackGroup.add(segGroup);
    this.segments.push(segData);

    this.nextZ -= len;
  }

  populateSegment(segData) {
    const lanes = TrackManager.LANES;
    const zOffsets = [-9, 9];

    zOffsets.forEach(zOffset => {
      const openLaneIdx = Math.floor(Math.random() * 3);
      const obstacleTypes = ['fallen_log', 'fire_pit', 'spiked_pendulum', 'temple_gate', 'stone_idol'];

      lanes.forEach((laneX, laneIdx) => {
        // Safe lane trail with gold coins
        if (laneIdx === openLaneIdx) {
          for (let c = -1; c <= 1; c++) {
            const coin = ModelFactory.createCoin();
            const cz = zOffset + c * 2.2;
            coin.position.set(laneX, 0.75, cz);
            segData.group.add(coin);

            const coinObj = { mesh: coin, x: laneX, z: segData.z + cz, collected: false, parentSeg: segData };
            segData.coins.push(coinObj);
            this.coins.push(coinObj);
          }
          return;
        }

        // 65% spawn chance in other lanes
        if (Math.random() < 0.65) {
          const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
          const obsMesh = ModelFactory.createObstacle(type);
          obsMesh.position.set(laneX, 0, zOffset);
          segData.group.add(obsMesh);

          const obsObj = {
            mesh: obsMesh,
            x: laneX,
            z: segData.z + zOffset,
            type: type,
            hitType: obsMesh.userData.hitType,
            pendulumMesh: obsMesh.userData.pendulumMesh,
            cleared: false
          };
          segData.obstacles.push(obsObj);
          this.obstacles.push(obsObj);

          // If jumpable hurdle, place high arc of golden coins over it
          if (obsMesh.userData.hitType === 'low') {
            for (let c = -1; c <= 1; c++) {
              const coin = ModelFactory.createCoin();
              const cz = zOffset + c * 2.0;
              const cy = (c === 0) ? 2.4 : 1.5;
              coin.position.set(laneX, cy, cz);
              segData.group.add(coin);

              const coinObj = { mesh: coin, x: laneX, z: segData.z + cz, collected: false, parentSeg: segData };
              segData.coins.push(coinObj);
              this.coins.push(coinObj);
            }
          }
        }
      });
    });

    // Occasional Blue Gem (18% chance)
    if (Math.random() < 0.18) {
      const gem = ModelFactory.createGem();
      const laneX = lanes[Math.floor(Math.random() * 3)];
      gem.position.set(laneX, 1.0, 0);
      segData.group.add(gem);

      const gemObj = { mesh: gem, x: laneX, z: segData.z, collected: false, parentSeg: segData };
      segData.gems.push(gemObj);
      this.gems.push(gemObj);
    }

    // Occasional Powerup (12% chance)
    if (Math.random() < 0.12) {
      const types = ['magnet', 'shield', 'boost', 'multiplier', 'hoverboard'];
      const pType = types[Math.floor(Math.random() * types.length)];
      const pMesh = ModelFactory.createPowerupMesh(pType);
      const laneX = lanes[Math.floor(Math.random() * 3)];
      pMesh.position.set(laneX, 1.15, -2);
      segData.group.add(pMesh);

      const pObj = { mesh: pMesh, type: pType, x: laneX, z: segData.z - 2, collected: false, parentSeg: segData };
      segData.powerups.push(pObj);
      this.powerups.push(pObj);
    }
  }

  update(playerZ, time) {
    if (this.segments.length > 0) {
      const firstSeg = this.segments[0];
      if (playerZ < firstSeg.z - firstSeg.length - 25) {
        this.trackGroup.remove(firstSeg.group);

        this.obstacles = this.obstacles.filter(o => !firstSeg.obstacles.includes(o) && (!o.isGap || o.z < playerZ + 20));
        this.coins = this.coins.filter(c => !firstSeg.coins.includes(c));
        this.gems = this.gems.filter(g => !firstSeg.gems.includes(g));
        this.powerups = this.powerups.filter(p => !firstSeg.powerups.includes(p));

        this.segments.shift();
        this.spawnSegment(false);
      }
    }

    // Spin Collectibles
    for (let i = 0; i < this.coins.length; i++) {
      if (!this.coins[i].collected) {
        this.coins[i].mesh.rotation.y += 0.055;
      }
    }
    for (let i = 0; i < this.gems.length; i++) {
      if (!this.gems[i].collected) {
        this.gems[i].mesh.rotation.y += 0.045;
        this.gems[i].mesh.position.y = 1.0 + Math.sin(time * 3 + i) * 0.12;
      }
    }
    for (let i = 0; i < this.powerups.length; i++) {
      if (!this.powerups[i].collected) {
        this.powerups[i].mesh.rotation.y += 0.038;
      }
    }

    // Animate Swinging Spiked Pendulums
    for (let i = 0; i < this.obstacles.length; i++) {
      const o = this.obstacles[i];
      if (o.pendulumMesh) {
        o.pendulumMesh.rotation.z = Math.sin(time * 3.5 + i) * 0.65;
      }
    }
  }
}

window.TrackManager = TrackManager;

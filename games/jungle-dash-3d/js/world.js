/**
 * Jungle Dash 3D - High-Fidelity World & Atmosphere Engine
 * Builds breathtaking 3D environments with dense tropical rainforests, cascading waterfalls,
 * realistic water caustics, ancient stepped pyramids, towering rock cliffs, and atmospheric fog.
 */
class WorldManager {
  static get WORLDS() {
    return [
      {
        id: 'world_1',
        name: 'Green Jungle',
        theme: 'Tropical Rainforest',
        difficulty: 'Beginner',
        starsReq: 0,
        unlocked: true,
        skyColor: 0x38BDF8,
        fogColor: 0x064E3B,
        ambientColor: 0xFFFBEB,
        waterColor: 0x0284C7,
        speedMultiplier: 1.0,
        description: 'Sprint across ancient stone viaducts flanked by roaring waterfalls and dense rainforest canopy!'
      },
      {
        id: 'world_2',
        name: 'River Run',
        theme: 'River Canyon Crossing',
        difficulty: 'Medium',
        starsReq: 3,
        unlocked: false,
        skyColor: 0x67E8F9,
        fogColor: 0x0F766E,
        ambientColor: 0xF0FDFA,
        waterColor: 0x06B6D4,
        speedMultiplier: 1.15,
        description: 'Dash over wooden rope bridges spanning rapid white-water rivers and mossy gorge cliffs.'
      },
      {
        id: 'world_3',
        name: 'Lost Temple',
        theme: 'Ancient Mayan Ruins',
        difficulty: 'Challenging',
        starsReq: 7,
        unlocked: false,
        skyColor: 0xF59E0B,
        fogColor: 0x78350F,
        ambientColor: 0xFEF3C7,
        waterColor: 0x1E1B4B,
        speedMultiplier: 1.30,
        description: 'Navigate sacred temple corridors, towering pyramid ruins, and blazing ceremonial braziers.'
      },
      {
        id: 'world_4',
        name: 'Mountain Jungle',
        theme: 'High Altitude Peaks',
        difficulty: 'Hard',
        starsReq: 12,
        unlocked: false,
        skyColor: 0x60A5FA,
        fogColor: 0x1E3A8A,
        ambientColor: 0xEFF6FF,
        waterColor: 0x38BDF8,
        speedMultiplier: 1.45,
        description: 'High-speed sprint along narrow cliff ridges overlooking deep valleys and snowcapped mountains.'
      },
      {
        id: 'world_5',
        name: 'Volcanic Forest',
        theme: 'Magma Caldera',
        difficulty: 'Expert',
        starsReq: 18,
        unlocked: false,
        skyColor: 0x991B1B,
        fogColor: 0x450A0A,
        ambientColor: 0xFFEDD5,
        waterColor: 0xEF4444,
        speedMultiplier: 1.60,
        description: 'Perilous volcanic ruins surrounded by rivers of glowing molten lava and volcanic embers!'
      }
    ];
  }

  constructor(scene) {
    this.scene = scene;
    this.currentWorldIndex = 0;
    this.envGroup = new THREE.Group();
    this.envGroup.name = 'worldEnvGroup';
    this.scene.add(this.envGroup);
    this.animatedProps = [];
  }

  loadWorld(index = 0) {
    this.currentWorldIndex = index;
    const config = WorldManager.WORLDS[index] || WorldManager.WORLDS[0];

    // Clear old props
    while (this.envGroup.children.length > 0) {
      this.envGroup.remove(this.envGroup.children[0]);
    }
    this.animatedProps = [];

    // Sky & Atmospheric Height Fog
    this.scene.background = new THREE.Color(config.skyColor);
    this.scene.fog = new THREE.FogExp2(config.fogColor, 0.0055);

    // 1. Towering Mayan / Temple Pyramids in the Skyline
    this.buildTemplePyramids(config);

    // 2. Cascading Mountain Waterfalls & Cliffs
    this.buildWaterfallsAndCliffs(config);

    // 3. Dense Tropical Jungle Flora (Detailed Palms & Gnarled Trees)
    this.buildDenseTropicalCanopy(config);

    // 4. Realistic Animated Water / Magma Gorge Below
    this.buildRiverGorge(config);

    return config;
  }

  buildTemplePyramids(config) {
    const templeGroup = new THREE.Group();
    templeGroup.position.set(0, 0, -220);

    const stoneTex = TextureGenerator.getTempleStone();
    const stoneMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.85
    });

    // Great Center Step Pyramid
    const stepCount = 6;
    for (let s = 0; s < stepCount; s++) {
      const stepW = 75 - s * 10;
      const stepH = 8;
      const step = new THREE.Mesh(new THREE.BoxGeometry(stepW, stepH, stepW), stoneMat);
      step.position.y = s * 7.5;
      templeGroup.add(step);
    }

    // Altar Temple on top
    const altar = new THREE.Mesh(new THREE.BoxGeometry(16, 10, 16), stoneMat);
    altar.position.y = stepCount * 7.5 + 4;
    templeGroup.add(altar);

    // Grand Stairway down the pyramid face
    const stairGeo = new THREE.BoxGeometry(12, 45, 45);
    stairGeo.rotateX(Math.PI / 4);
    const stairs = new THREE.Mesh(stairGeo, stoneMat);
    stairs.position.set(0, 20, 25);
    templeGroup.add(stairs);

    // Two Flanking Ruin Monoliths
    [-65, 65].forEach(mx => {
      const monolith = new THREE.Mesh(new THREE.CylinderGeometry(4, 5.5, 40, 8), stoneMat);
      monolith.position.set(mx, 15, -10);
      templeGroup.add(monolith);
    });

    this.envGroup.add(templeGroup);
  }

  buildWaterfallsAndCliffs(config) {
    const cliffGroup = new THREE.Group();
    const cliffMat = new THREE.MeshStandardMaterial({
      map: TextureGenerator.getStonePath(),
      roughness: 0.95
    });

    // Sheer Rocky Canyon Cliffs on Left and Right flanks
    [-38, 38].forEach((cx, idx) => {
      for (let z = 0; z < 8; z++) {
        const cz = -z * 35;
        const cliffHeight = 45 + Math.random() * 20;
        const cliffGeo = new THREE.BoxGeometry(22, cliffHeight, 34);
        const cliff = new THREE.Mesh(cliffGeo, cliffMat);
        cliff.position.set(cx + (idx === 0 ? -11 : 11), cliffHeight * 0.5 - 12, cz);
        cliffGroup.add(cliff);

        // Cascading Waterfall Sheets dropping from cliff into river gorge
        if (z % 2 === 0 && config.id !== 'world_5') {
          const fallGeo = new THREE.PlaneGeometry(8, 32);
          const fallMat = new THREE.MeshBasicMaterial({
            color: 0xE0F2FE,
            transparent: true,
            opacity: 0.85
          });
          const fall = new THREE.Mesh(fallGeo, fallMat);
          fall.position.set(cx + (idx === 0 ? 0.2 : -0.2), 6, cz);
          fall.rotation.y = idx === 0 ? Math.PI / 2 : -Math.PI / 2;
          cliffGroup.add(fall);

          this.animatedProps.push({
            mesh: fall,
            update: (t) => {
              fall.position.y = 6 + Math.sin(t * 8) * 0.2;
            }
          });
        }
      }
    });

    this.envGroup.add(cliffGroup);
  }

  buildDenseTropicalCanopy(config) {
    const floraGroup = new THREE.Group();
    const barkTex = TextureGenerator.getTreeBark();
    const barkMat = new THREE.MeshStandardMaterial({ map: barkTex, roughness: 0.9 });
    const leafMat = new THREE.MeshLambertMaterial({
      color: config.id === 'world_5' ? 0x78350F : 0x15803D
    });

    // Populate Royal Palms and Giant Rainforest Trees along the bridge margins
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 16; i++) {
        const tx = side * (12 + Math.random() * 14);
        const tz = -i * 20 - Math.random() * 8;

        if (i % 2 === 0) {
          // 1. Curved Royal Palm Tree
          const palmGroup = new THREE.Group();
          palmGroup.position.set(tx, 0, tz);

          // Curved segmented trunk
          const trunkGeo = new THREE.CylinderGeometry(0.4, 0.65, 14, 8);
          const trunk = new THREE.Mesh(trunkGeo, barkMat);
          trunk.position.y = 7;
          trunk.rotation.z = side * 0.15; // Leaning gracefully toward the path
          palmGroup.add(trunk);

          // Drooping Palm Fronds (Layered fans)
          const frondGeo = new THREE.ConeGeometry(3.5, 1.2, 5);
          for (let f = 0; f < 6; f++) {
            const frond = new THREE.Mesh(frondGeo, leafMat);
            const ang = (f / 6) * Math.PI * 2;
            frond.position.set(Math.cos(ang) * 1.8, 14, Math.sin(ang) * 1.8);
            frond.rotation.set(Math.sin(ang) * 0.6, ang, Math.cos(ang) * 0.6);
            palmGroup.add(frond);
          }

          floraGroup.add(palmGroup);
        } else {
          // 2. Giant Rainforest Canopy Tree with root flare
          const treeGroup = new THREE.Group();
          treeGroup.position.set(tx, 0, tz);

          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.3, 16, 8), barkMat);
          trunk.position.y = 8;
          treeGroup.add(trunk);

          // Multi-tiered foliage spheres
          for (let l = 0; l < 3; l++) {
            const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(3.6 - l * 0.6, 1), leafMat);
            foliage.position.set((Math.random() - 0.5) * 1.5, 15 + l * 2.2, (Math.random() - 0.5) * 1.5);
            treeGroup.add(foliage);
          }

          floraGroup.add(treeGroup);
        }
      }
    }

    this.envGroup.add(floraGroup);
  }

  buildRiverGorge(config) {
    const riverGeo = new THREE.PlaneGeometry(160, 450);
    riverGeo.rotateX(-Math.PI / 2);

    const isLava = config.id === 'world_5';
    const riverMat = new THREE.MeshStandardMaterial({
      map: isLava ? null : TextureGenerator.getWater(),
      color: config.waterColor,
      roughness: isLava ? 0.3 : 0.15,
      metalness: isLava ? 0.2 : 0.6,
      transparent: true,
      opacity: isLava ? 0.95 : 0.88
    });

    const river = new THREE.Mesh(riverGeo, riverMat);
    river.position.set(0, -12, -120);
    this.envGroup.add(river);

    this.riverMesh = river;
    this.isLava = isLava;
  }

  update(delta, time) {
    // Animate waterfall sheets & river caustics
    if (this.riverMesh && !this.isLava && TextureGenerator.cache.water) {
      TextureGenerator.cache.water.offset.y -= delta * 0.12;
    }
    if (this.riverMesh && this.isLava) {
      this.riverMesh.material.color.setHSL(0.02 + Math.sin(time * 3) * 0.02, 1.0, 0.45);
    }
    for (let i = 0; i < this.animatedProps.length; i++) {
      this.animatedProps[i].update(time);
    }
  }
}

window.WorldManager = WorldManager;

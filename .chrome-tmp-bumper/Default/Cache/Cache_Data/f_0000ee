/**
 * Crazy Bumper Arena - Premium 3D Stadium & Environment Engine
 * Builds rich, fully-populated amusement park stadiums with multi-tier spectator bleachers,
 * animated cheering crowds, stadium floodlight towers, festive flags, rotating Ferris Wheel,
 * neon signs, searchlights, and carnival scenery.
 */
class ArenaBuilder {
  static get LEVEL_CONFIGS() {
    return [
      {
        id: 'level_1',
        name: 'Classic Stadium',
        theme: 'Amusement Park',
        difficulty: 'Beginner',
        arenaRadius: 22,
        timeLimit: 90,
        targetScore: 1000,
        starsRequired: 0,
        skyTop: '#1E1B4B',
        skyBottom: '#11162B',
        floorSpecular: 0x38BDF8,
        description: 'Vibrant amusement park stadium with cheering crowds, festive bunting, and a giant rotating Ferris Wheel!'
      },
      {
        id: 'level_2',
        name: 'Neon Cyber Dome',
        theme: 'Cyberpunk Grid',
        difficulty: 'Medium',
        arenaRadius: 22,
        timeLimit: 80,
        targetScore: 1500,
        starsRequired: 2,
        hasBoostPads: true,
        skyTop: '#0B0F19',
        skyBottom: '#061129',
        floorSpecular: 0x06B6D4,
        description: 'High-tech neon dome with speed boost pads, cyber city skylines, and pulsing neon barriers.'
      },
      {
        id: 'level_3',
        name: 'Jungle Coliseum',
        theme: 'Tropical Jungle',
        difficulty: 'Challenging',
        arenaRadius: 21,
        timeLimit: 75,
        targetScore: 2000,
        starsRequired: 5,
        hasObstacles: true,
        skyTop: '#064E3B',
        skyBottom: '#022C22',
        floorSpecular: 0x10B981,
        description: 'Lush tropical island arena surrounded by giant tiki totems, palm trees, and mossy rock barriers.'
      },
      {
        id: 'level_4',
        name: 'Glacier Dome',
        theme: 'Frozen Tundra',
        difficulty: 'Hard',
        arenaRadius: 22,
        timeLimit: 70,
        targetScore: 2500,
        starsRequired: 8,
        iceFriction: true,
        skyTop: '#082F49',
        skyBottom: '#0C4A6E',
        floorSpecular: 0xE0F2FE,
        description: 'Slippery frozen lake surrounded by glacial ice spikes and falling snowflakes.'
      },
      {
        id: 'level_5',
        name: 'Lava Caldera',
        theme: 'Volcanic Core',
        difficulty: 'Expert',
        arenaRadius: 21,
        timeLimit: 60,
        targetScore: 3200,
        starsRequired: 12,
        hasLavaHazard: true,
        lavaRadius: 5.2,
        skyTop: '#450A0A',
        skyBottom: '#18181B',
        floorSpecular: 0xF97316,
        description: 'Dangerous volcanic arena with a glowing molten lava pit hazard zone in the center!'
      }
    ];
  }

  static buildArena(scene, levelIndex = 0) {
    const config = ArenaBuilder.LEVEL_CONFIGS[levelIndex] || ArenaBuilder.LEVEL_CONFIGS[0];
    const root = new THREE.Group();
    root.name = `arena_${config.id}`;

    const radius = config.arenaRadius;
    const animators = [];

    // -------------------------------------------------------------
    // 0. ATMOSPHERIC THEME PARK SKY DOME & TWILIGHT GLOW
    // -------------------------------------------------------------
    const skyColor = new THREE.Color(config.skyBottom || 0x11162B);
    scene.background = skyColor;
    scene.fog = new THREE.FogExp2(skyColor, 0.005);

    // Giant Sky Dome
    const skyGeo = new THREE.SphereGeometry(150, 32, 24);
    const skyMat = new THREE.MeshBasicMaterial({
      color: 0x1E1B4B,
      side: THREE.BackSide
    });
    const skyDome = new THREE.Mesh(skyGeo, skyMat);
    root.add(skyDome);

    // Horizon Twilight Glow Ring
    const horizonGeo = new THREE.CylinderGeometry(148, 148, 48, 32, 1, true);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x312E81,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.65
    });
    const horizonGlow = new THREE.Mesh(horizonGeo, horizonMat);
    horizonGlow.position.y = 18;
    root.add(horizonGlow);

    // Starfield Points
    const starGeo = new THREE.BufferGeometry();
    const starPos = [];
    for (let st = 0; st < 320; st++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 142;
      const sx = r * Math.sin(phi) * Math.cos(theta);
      const sy = Math.abs(r * Math.cos(phi)) + 12;
      const sz = r * Math.sin(phi) * Math.sin(theta);
      starPos.push(sx, sy, sz);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xF8FAFC, size: 1.4, transparent: true, opacity: 0.9 });
    const starField = new THREE.Points(starGeo, starMat);
    root.add(starField);

    // -------------------------------------------------------------
    // 1. POLISHED REFLECTIVE ARENA FLOOR (Carnival Metal Grid Plate)
    // -------------------------------------------------------------
    const floorGeo = new THREE.CylinderGeometry(radius, radius + 0.5, 0.6, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: config.id === 'level_2' ? 0x070E24 : (config.id === 'level_3' ? 0x78350F : (config.id === 'level_4' ? 0xBAE6FD : 0x1E2438)),
      roughness: config.id === 'level_4' ? 0.08 : 0.22,
      metalness: 0.35
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.3;
    floor.receiveShadow = true;
    root.add(floor);

    // Decorative Concentric Speed Rings & Center Star Emblem
    const ringGeo1 = new THREE.RingGeometry(radius * 0.72, radius * 0.75, 64);
    ringGeo1.rotateX(-Math.PI / 2);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: config.id === 'level_2' ? 0x06B6D4 : (config.id === 'level_5' ? 0xF97316 : 0xFACC15),
      side: THREE.DoubleSide
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.y = 0.02;
    root.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(radius * 0.38, radius * 0.40, 64);
    ringGeo2.rotateX(-Math.PI / 2);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat1);
    ring2.position.y = 0.02;
    root.add(ring2);

    // Center Arena Logo Medallion
    const centerMedallion = new THREE.Mesh(
      new THREE.CircleGeometry(2.6, 32),
      new THREE.MeshBasicMaterial({ color: config.id === 'level_2' ? 0xD946EF : 0xEF4444 })
    );
    centerMedallion.rotateX(-Math.PI / 2);
    centerMedallion.position.y = 0.025;
    root.add(centerMedallion);

    // Center Star Symbol
    const starShape = new THREE.Mesh(
      new THREE.RingGeometry(0.8, 1.6, 5),
      new THREE.MeshBasicMaterial({ color: 0xFACC15, side: THREE.DoubleSide })
    );
    starShape.rotateX(-Math.PI / 2);
    starShape.position.y = 0.03;
    root.add(starShape);

    // -------------------------------------------------------------
    // 2. MULTI-TIER SAFETY BARRIERS (Steel Guardrails & Warning Stripes)
    // -------------------------------------------------------------
    const barrierMat = new THREE.MeshPhongMaterial({
      color: 0x0F172A,
      specular: 0x64748B,
      shininess: 60
    });

    const railGeo = new THREE.TorusGeometry(radius, 0.38, 14, 64);
    railGeo.rotateX(Math.PI / 2);
    const lowerRail = new THREE.Mesh(railGeo, barrierMat);
    lowerRail.position.y = 0.42;
    root.add(lowerRail);

    const upperRail = new THREE.Mesh(railGeo, barrierMat);
    upperRail.position.y = 1.25;
    root.add(upperRail);

    // Warning Chevron Stripe Plates along the barrier
    const chevronGeo = new THREE.BoxGeometry(1.4, 0.45, 0.12);
    const postCount = 36;
    for (let i = 0; i < postCount; i++) {
      const angle = (i / postCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Heavy Steel Vertical Support Post
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.18, 1.6, 12),
        barrierMat
      );
      post.position.set(x, 0.8, z);
      root.add(post);

      // Warning Indicator Light on Post
      const lightCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 10, 10),
        new THREE.MeshBasicMaterial({ color: (i % 2 === 0) ? 0xFACC15 : 0xEF4444 })
      );
      lightCap.position.set(x, 1.65, z);
      root.add(lightCap);

      // Chevron Plate
      const chevron = new THREE.Mesh(
        chevronGeo,
        new THREE.MeshBasicMaterial({ color: (i % 2 === 0) ? 0xFACC15 : 0x1E293B })
      );
      chevron.position.set(x, 0.85, z);
      chevron.lookAt(0, 0.85, 0);
      root.add(chevron);
    }

    // -------------------------------------------------------------
    // 3. SURROUNDING SPECTATOR BLEACHERS & ANIMATED CHEERING CROWD
    // -------------------------------------------------------------
    // 3 Tiers of Raised Grandstands encircling the entire stadium
    const bleacherTiers = 3;
    const tierColors = [0x1E293B, 0x334155, 0x475569];
    const crowdGroup = new THREE.Group();
    const crowdCharacters = [];

    const crowdShirtColors = [0xEF4444, 0x3B82F6, 0x10B981, 0xFACC15, 0xEC4899, 0x8B5CF6, 0xF97316];
    const crowdHeadGeo = new THREE.SphereGeometry(0.28, 10, 10);
    const crowdTorsoGeo = new THREE.CylinderGeometry(0.26, 0.32, 0.65, 10);
    const crowdArmGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 6);

    for (let t = 0; t < bleacherTiers; t++) {
      const tierRadius = radius + 2.5 + (t * 2.8);
      const tierHeight = 1.0 + (t * 1.4);

      // Solid Bleacher Riser / Floor Ring
      const riserGeo = new THREE.CylinderGeometry(tierRadius + 1.2, tierRadius + 1.2, 0.7, 48, 1, true);
      const riser = new THREE.Mesh(riserGeo, new THREE.MeshLambertMaterial({ color: 0x0F172A, side: THREE.DoubleSide }));
      riser.position.y = tierHeight - 0.35;
      root.add(riser);

      // Curved Bleacher Bench
      const benchGeo = new THREE.TorusGeometry(tierRadius, 0.65, 8, 48);
      benchGeo.rotateX(Math.PI / 2);
      const bench = new THREE.Mesh(benchGeo, new THREE.MeshLambertMaterial({ color: tierColors[t] }));
      bench.position.y = tierHeight;
      root.add(bench);

      // Populate Spectators along this tier
      const spectatorsOnTier = 36 + (t * 10);
      for (let s = 0; s < spectatorsOnTier; s++) {
        const sAngle = (s / spectatorsOnTier) * Math.PI * 2 + (t * 0.12);
        const sx = Math.cos(sAngle) * tierRadius;
        const sz = Math.sin(sAngle) * tierRadius;

        const specGroup = new THREE.Group();
        specGroup.position.set(sx, tierHeight + 0.35, sz);
        specGroup.lookAt(0, tierHeight + 0.35, 0);

        const shirtMat = new THREE.MeshLambertMaterial({
          color: crowdShirtColors[(s + t) % crowdShirtColors.length]
        });
        const skinMat = new THREE.MeshLambertMaterial({ color: 0xFCD34D });

        const torso = new THREE.Mesh(crowdTorsoGeo, shirtMat);
        torso.position.y = 0.32;
        specGroup.add(torso);

        const head = new THREE.Mesh(crowdHeadGeo, skinMat);
        head.position.y = 0.85;
        specGroup.add(head);

        // Cap / Hat
        const cap = new THREE.Mesh(
          new THREE.ConeGeometry(0.32, 0.2, 8),
          shirtMat
        );
        cap.position.y = 1.1;
        specGroup.add(cap);

        // Cheering Arms
        const leftArm = new THREE.Mesh(crowdArmGeo, shirtMat);
        leftArm.position.set(-0.35, 0.45, 0.1);
        leftArm.rotation.z = 0.6;
        specGroup.add(leftArm);

        const rightArm = new THREE.Mesh(crowdArmGeo, shirtMat);
        rightArm.position.set(0.35, 0.45, 0.1);
        rightArm.rotation.z = -0.6;
        specGroup.add(rightArm);

        crowdGroup.add(specGroup);

        crowdCharacters.push({
          mesh: specGroup,
          leftArm: leftArm,
          rightArm: rightArm,
          baseY: tierHeight + 0.35,
          speed: 4 + Math.random() * 4,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    root.add(crowdGroup);

    // Animate Cheering Spectator Bobble and Arms Waving
    animators.push((delta, time) => {
      for (let i = 0; i < crowdCharacters.length; i++) {
        const c = crowdCharacters[i];
        const wave = Math.sin(time * c.speed + c.phase);
        c.mesh.position.y = c.baseY + Math.max(0, wave) * 0.18;
        c.leftArm.rotation.z = 0.6 + wave * 0.3;
        c.rightArm.rotation.z = -0.6 - wave * 0.3;
      }
    });

    // -------------------------------------------------------------
    // 3B. GLOWING NEON STADIUM BILLBOARDS AROUND BLEACHERS
    // -------------------------------------------------------------
    const billboardRadius = radius + 11.0;
    const bannerTexts = ['KOPIPLAY', 'CRAZY BUMPER', 'NITRO BOOST', 'TURBO ARENA', 'CHAMPION', 'SUPER SMASH', 'BATTLE ARENA', 'GRAND PRIX'];
    const bannerColors = [0x38BDF8, 0xEF4444, 0xFACC15, 0x10B981, 0xEC4899, 0x8B5CF6, 0xF97316, 0x06B6D4];
    for (let b = 0; b < bannerTexts.length; b++) {
      const bAngle = (b / bannerTexts.length) * Math.PI * 2 + (Math.PI / bannerTexts.length);
      const bx = Math.cos(bAngle) * billboardRadius;
      const bz = Math.sin(bAngle) * billboardRadius;

      const boardGroup = new THREE.Group();
      boardGroup.position.set(bx, 6.2, bz);
      boardGroup.lookAt(0, 6.2, 0);

      // Backplate
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(7.2, 2.2, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.8, roughness: 0.2 })
      );
      boardGroup.add(plate);

      // Glowing Frame Border
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(7.4, 2.4, 0.18),
        new THREE.MeshBasicMaterial({ color: bannerColors[b % bannerColors.length] })
      );
      frame.position.z = -0.06;
      boardGroup.add(frame);

      // Glowing Center Bar
      const centerBar = new THREE.Mesh(
        new THREE.PlaneGeometry(6.6, 1.4),
        new THREE.MeshBasicMaterial({ color: bannerColors[b % bannerColors.length] })
      );
      centerBar.position.z = 0.14;
      boardGroup.add(centerBar);

      root.add(boardGroup);
    }

    // -------------------------------------------------------------
    // 4. FOUR TOWERING STADIUM FLOODLIGHT GANTRIES
    // -------------------------------------------------------------
    const towerRadius = radius + 10.5;
    for (let tl = 0; tl < 4; tl++) {
      const tlAngle = (tl / 4) * Math.PI * 2 + Math.PI / 4;
      const tx = Math.cos(tlAngle) * towerRadius;
      const tz = Math.sin(tlAngle) * towerRadius;

      const towerGroup = new THREE.Group();
      towerGroup.position.set(tx, 0, tz);

      // Steel Lattice Mast
      const mastGeo = new THREE.CylinderGeometry(0.45, 0.75, 20, 10);
      const mastMat = new THREE.MeshPhongMaterial({ color: 0x475569, specular: 0x94A3B8, shininess: 40 });
      const mast = new THREE.Mesh(mastGeo, mastMat);
      mast.position.y = 10;
      towerGroup.add(mast);

      // Floodlight Bank Header
      const headGeo = new THREE.BoxGeometry(4.8, 2.6, 1.2);
      const headMat = new THREE.MeshPhongMaterial({ color: 0x1E293B });
      const lightHead = new THREE.Mesh(headGeo, headMat);
      lightHead.position.y = 20;
      lightHead.lookAt(0, 5, 0);
      towerGroup.add(lightHead);

      // 6 Glowing Floodlight Bulbs
      const bulbGeo = new THREE.CircleGeometry(0.5, 16);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xFEF08A });
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const bulb = new THREE.Mesh(bulbGeo, bulbMat);
          bulb.position.set((col - 1) * 1.3, (row - 0.5) * 1.1, 0.65);
          lightHead.add(bulb);
        }
      }

      root.add(towerGroup);
    }

    // Festive Carnival Bunting Flags between light towers
    const flagGeo = new THREE.ConeGeometry(0.35, 0.85, 4);
    flagGeo.rotateZ(Math.PI);
    const flagColors = [0xEF4444, 0x3B82F6, 0xFACC15, 0x10B981, 0xEC4899];
    const flagCount = 48;
    for (let f = 0; f < flagCount; f++) {
      const fAngle = (f / flagCount) * Math.PI * 2;
      const fx = Math.cos(fAngle) * (radius + 2.2);
      const fz = Math.sin(fAngle) * (radius + 2.2);

      const flagMat = new THREE.MeshBasicMaterial({ color: flagColors[f % flagColors.length] });
      const flag = new THREE.Mesh(flagGeo, flagMat);
      flag.position.set(fx, 3.2 + Math.sin(fAngle * 4) * 0.4, fz);
      flag.lookAt(0, flag.position.y, 0);
      root.add(flag);
    }

    // -------------------------------------------------------------
    // 4B. SWEEPING THEME PARK SEARCHLIGHTS IN THE NIGHT SKY
    // -------------------------------------------------------------
    const searchlights = [];
    const beamGeo = new THREE.CylinderGeometry(0.4, 7.5, 80, 16, 1, true);
    beamGeo.translate(0, 40, 0);
    beamGeo.rotateX(Math.PI / 2);
    const beamColors = [0x38BDF8, 0xF43F5E, 0xFACC15, 0xA855F7];

    for (let sl = 0; sl < 4; sl++) {
      const slAngle = (sl / 4) * Math.PI * 2;
      const bMat = new THREE.MeshBasicMaterial({
        color: beamColors[sl],
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const beam = new THREE.Mesh(beamGeo, bMat);
      beam.position.set(Math.cos(slAngle) * (radius + 14), 1, Math.sin(slAngle) * (radius + 14));
      root.add(beam);
      searchlights.push({ mesh: beam, baseAngle: slAngle, speed: 0.75 + sl * 0.25 });
    }

    animators.push((delta, time) => {
      for (let i = 0; i < searchlights.length; i++) {
        const s = searchlights[i];
        s.mesh.rotation.y = time * s.speed + s.baseAngle;
        s.mesh.rotation.x = -Math.PI / 3.2 + Math.sin(time * 1.4 + i) * 0.25;
      }
    });

    // -------------------------------------------------------------
    // 5. GIANT ROTATING AMUSEMENT PARK FERRIS WHEEL IN SKYLINE
    // -------------------------------------------------------------
    const ferrisGroup = new THREE.Group();
    // Positioned close enough to loom proudly above stands
    ferrisGroup.position.set(0, 22, -38);

    // Glowing Double Wheel Rim
    const wheelRimGeo = new THREE.TorusGeometry(19, 0.5, 14, 64);
    const wheelRimMat = new THREE.MeshPhongMaterial({ color: 0xFACC15, specular: 0xFFFFFF, shininess: 90 });
    const wheelFront = new THREE.Mesh(wheelRimGeo, wheelRimMat);
    wheelFront.position.z = 1.3;
    ferrisGroup.add(wheelFront);

    const wheelBack = new THREE.Mesh(wheelRimGeo, wheelRimMat);
    wheelBack.position.z = -1.3;
    ferrisGroup.add(wheelBack);

    // Wheel Cross Spokes
    const spokeGeo = new THREE.CylinderGeometry(0.1, 0.1, 38, 8);
    const spokeMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
    for (let sp = 0; sp < 12; sp++) {
      const spoke = new THREE.Mesh(spokeGeo, spokeMat);
      spoke.rotation.z = (sp / 12) * Math.PI;
      ferrisGroup.add(spoke);
    }

    // 16 Passenger Gondolas / Cabins
    const cabinGeo = new THREE.BoxGeometry(2.2, 2.4, 2.0);
    const cabinColors = [0xEF4444, 0x3B82F6, 0x10B981, 0xEC4899, 0xF97316, 0x8B5CF6];
    const cabins = [];

    for (let c = 0; c < 16; c++) {
      const cAngle = (c / 16) * Math.PI * 2;
      const cMat = new THREE.MeshPhongMaterial({
        color: cabinColors[c % cabinColors.length],
        specular: 0xFFFFFF,
        shininess: 70
      });
      const cabin = new THREE.Mesh(cabinGeo, cMat);
      cabin.position.set(Math.cos(cAngle) * 19, Math.sin(cAngle) * 19, 0);
      ferrisGroup.add(cabin);
      cabins.push(cabin);
    }

    // Heavy A-Frame Support Legs
    const aFrameMat = new THREE.MeshPhongMaterial({ color: 0x64748B });
    const legGeo = new THREE.CylinderGeometry(0.6, 0.8, 38, 12);

    const leftLeg = new THREE.Mesh(legGeo, aFrameMat);
    leftLeg.position.set(-9, -12, 0);
    leftLeg.rotation.z = -0.32;
    ferrisGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, aFrameMat);
    rightLeg.position.set(9, -12, 0);
    rightLeg.rotation.z = 0.32;
    ferrisGroup.add(rightLeg);

    root.add(ferrisGroup);

    // Rotate Ferris Wheel smoothly
    animators.push((delta) => {
      wheelFront.rotation.z += delta * 0.15;
      wheelBack.rotation.z += delta * 0.15;
      for (let i = 0; i < cabins.length; i++) {
        const cAngle = (i / 16) * Math.PI * 2 + wheelFront.rotation.z;
        cabins[i].position.set(Math.cos(cAngle) * 19, Math.sin(cAngle) * 19, 0);
      }
    });

    // -------------------------------------------------------------
    // 6. CARNIVAL BIG-TOP TENTS & ROLLERCOASTER SKYLINE
    // -------------------------------------------------------------
    // Circus Big-Top Tent on Left
    const tentLeft = new THREE.Group();
    tentLeft.position.set(-36, 0, -32);
    const tentBase = new THREE.Mesh(new THREE.CylinderGeometry(11, 13, 8, 20), new THREE.MeshLambertMaterial({ color: 0xDC2626 }));
    tentBase.position.y = 4;
    tentLeft.add(tentBase);
    const tentCone = new THREE.Mesh(new THREE.ConeGeometry(13, 11, 20), new THREE.MeshLambertMaterial({ color: 0xFACC15 }));
    tentCone.position.y = 13.5;
    tentLeft.add(tentCone);
    root.add(tentLeft);

    // Circus Big-Top Tent on Right
    const tentRight = new THREE.Group();
    tentRight.position.set(36, 0, -32);
    const tentBaseR = new THREE.Mesh(new THREE.CylinderGeometry(11, 13, 8, 20), new THREE.MeshLambertMaterial({ color: 0x2563EB }));
    tentBaseR.position.y = 4;
    tentRight.add(tentBaseR);
    const tentConeR = new THREE.Mesh(new THREE.ConeGeometry(13, 11, 20), new THREE.MeshLambertMaterial({ color: 0xEF4444 }));
    tentConeR.position.y = 13.5;
    tentRight.add(tentConeR);
    root.add(tentRight);

    // Rollercoaster loop track in back corner
    const coasterGeo = new THREE.TorusGeometry(12, 0.4, 8, 32, Math.PI * 1.5);
    const coasterMat = new THREE.MeshPhongMaterial({ color: 0xF97316 });
    const coasterTrack = new THREE.Mesh(coasterGeo, coasterMat);
    coasterTrack.position.set(28, 12, 32);
    coasterTrack.rotation.y = Math.PI / 4;
    root.add(coasterTrack);

    // -------------------------------------------------------------
    // 7. LEVEL-SPECIFIC ARENA PROPS
    // -------------------------------------------------------------
    if (config.id === 'level_2') {
      // Glowing Speed Boost Pads
      const boostPadGeo = new THREE.PlaneGeometry(4.2, 2.6);
      boostPadGeo.rotateX(-Math.PI / 2);
      const boostMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4, side: THREE.DoubleSide });

      const padPositions = [
        { x: -11, z: 0, rot: Math.PI / 2 },
        { x: 11, z: 0, rot: -Math.PI / 2 },
        { x: 0, z: -11, rot: 0 },
        { x: 0, z: 11, rot: Math.PI }
      ];

      padPositions.forEach(p => {
        const pad = new THREE.Mesh(boostPadGeo, boostMat);
        pad.position.set(p.x, 0.04, p.z);
        pad.rotation.y = p.rot;
        root.add(pad);
      });
    } else if (config.id === 'level_3') {
      // Jungle Palm Trees around border
      for (let t = 0; t < 12; t++) {
        const tAngle = (t / 12) * Math.PI * 2;
        const treeX = Math.cos(tAngle) * (radius + 4);
        const treeZ = Math.sin(tAngle) * (radius + 4);

        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.55, 7, 8),
          new THREE.MeshLambertMaterial({ color: 0x78350F })
        );
        trunk.position.set(treeX, 3.5, treeZ);
        root.add(trunk);

        const leaves = new THREE.Mesh(
          new THREE.ConeGeometry(3.0, 4.5, 8),
          new THREE.MeshLambertMaterial({ color: 0x15803D })
        );
        leaves.position.set(treeX, 7.5, treeZ);
        root.add(leaves);
      }
    } else if (config.id === 'level_4') {
      // Ice Spikes & Glacial Pillars
      for (let s = 0; s < 10; s++) {
        const sAngle = (s / 10) * Math.PI * 2;
        const sX = Math.cos(sAngle) * (radius + 3.8);
        const sZ = Math.sin(sAngle) * (radius + 3.8);

        const spike = new THREE.Mesh(
          new THREE.ConeGeometry(1.4, 9.0, 6),
          new THREE.MeshPhongMaterial({ color: 0xE0F2FE, specular: 0xFFFFFF, shininess: 90 })
        );
        spike.position.set(sX, 4.5, sZ);
        root.add(spike);
      }
    } else if (config.id === 'level_5') {
      // Central Lava Caldera Pit
      const lavaGeo = new THREE.CircleGeometry(config.lavaRadius, 36);
      lavaGeo.rotateX(-Math.PI / 2);
      const lavaMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
      const lava = new THREE.Mesh(lavaGeo, lavaMat);
      lava.position.y = 0.04;
      root.add(lava);

      const lavaRing = new THREE.Mesh(
        new THREE.RingGeometry(config.lavaRadius, config.lavaRadius + 0.8, 36),
        new THREE.MeshBasicMaterial({ color: 0xF97316, side: THREE.DoubleSide })
      );
      lavaRing.rotation.x = -Math.PI / 2;
      lavaRing.position.y = 0.05;
      root.add(lavaRing);

      animators.push((delta, time) => {
        lavaMat.color.setHSL(0.04 + Math.sin(time * 3) * 0.03, 1.0, 0.5);
      });
    }

    scene.add(root);

    return {
      root: root,
      config: config,
      animators: animators,
      cleanup: () => {
        scene.remove(root);
      }
    };
  }
}

window.ArenaBuilder = ArenaBuilder;

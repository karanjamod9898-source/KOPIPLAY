/**
 * Crazy Bumper Arena - Premium 3D Car & Character Procedural Engine
 * Generates commercial-grade 3D bumper cars with sculptured bodies, thick rubber bumpers,
 * headlights, seats, steering wheels, wheels, and fully articulated cartoon drivers.
 */
class ModelFactory {
  static get CAR_DEFINITIONS() {
    return [
      {
        id: 'red_rocket',
        name: 'Red Rocket',
        category: 'Classic',
        price: 0,
        unlocked: true,
        stats: { speed: 85, handling: 80, impact: 88, stability: 82 },
        primaryColor: 0xEF4444, // Flame Red
        accentColor: 0xFACC15,  // Racing Gold
        bumperColor: 0x1E293B,
        driverShirt: 0x2563EB,  // Blue racing suit
        driverHair: 0x374151,
        driverSkin: 0xFCD34D,
        description: 'The iconic amusement park classic. Balanced, punchy, and built with reinforced bumpers for brutal collisions!'
      },
      {
        id: 'neon_phantom',
        name: 'Neon Phantom',
        category: 'Cyber',
        price: 250,
        unlocked: false,
        stats: { speed: 96, handling: 92, impact: 72, stability: 76 },
        primaryColor: 0x06B6D4, // Electric Cyan
        accentColor: 0xD946EF, // Magenta
        bumperColor: 0x0F172A,
        driverShirt: 0xEC4899,
        driverHair: 0xF3F4F6,
        driverSkin: 0xFDBA74,
        description: 'Aerodynamic low-rider cyber machine with rear spoiler fins and blistering acceleration.'
      },
      {
        id: 'jungle_crusher',
        name: 'Jungle Crusher',
        category: 'Offroad',
        price: 500,
        unlocked: false,
        stats: { speed: 76, handling: 74, impact: 98, stability: 95 },
        primaryColor: 0x10B981, // Emerald Green
        accentColor: 0x84CC16, // Lime
        bumperColor: 0x1F2937,
        driverShirt: 0xF59E0B,
        driverHair: 0x78350F,
        driverSkin: 0xFCD34D,
        description: 'Heavy reinforced bumper tank equipped with heavy-duty front bull-bars for maximum ramming power.'
      },
      {
        id: 'ice_drifter',
        name: 'Ice Drifter',
        category: 'Speed',
        price: 800,
        unlocked: false,
        stats: { speed: 92, handling: 98, impact: 76, stability: 84 },
        primaryColor: 0x38BDF8, // Ice Sky Blue
        accentColor: 0xE0F2FE, // Frost White
        bumperColor: 0x1E293B,
        driverShirt: 0x0284C7,
        driverHair: 0xFDE047,
        driverSkin: 0xFCD34D,
        description: 'Streamlined aerodynamic racer built for high-speed slides and razor-sharp steering around opponents.'
      },
      {
        id: 'lava_titan',
        name: 'Lava Titan',
        category: 'Heavy',
        price: 1200,
        unlocked: false,
        stats: { speed: 80, handling: 72, impact: 100, stability: 98 },
        primaryColor: 0x18181B, // Obsidian Black
        accentColor: 0xF97316, // Magma Orange
        bumperColor: 0x09090B,
        driverShirt: 0xDC2626,
        driverHair: 0x18181B,
        driverSkin: 0xFB923C,
        description: 'Volcanic monster car with molten bumper trim. Highly resistant to knockback and heavy impacts.'
      },
      {
        id: 'golden_bumble',
        name: 'Golden Bumble',
        category: 'Special',
        price: 1600,
        unlocked: false,
        stats: { speed: 90, handling: 88, impact: 85, stability: 86 },
        primaryColor: 0xFACC15, // Golden Yellow
        accentColor: 0x18181B, // Black Stripes
        bumperColor: 0x27272A,
        driverShirt: 0xFB923C,
        driverHair: 0x451A03,
        driverSkin: 0xFCD34D,
        description: 'Retro bee-striped speedster. Built with specialized magnetic coils that attract nearby gold coins!'
      },
      {
        id: 'viper_turbo',
        name: 'Viper Turbo',
        category: 'Muscle',
        price: 2200,
        unlocked: false,
        stats: { speed: 95, handling: 86, impact: 92, stability: 84 },
        primaryColor: 0x8B5CF6, // Vivid Purple
        accentColor: 0x10B981, // Neon Green
        bumperColor: 0x1E1B4B,
        driverShirt: 0x6D28D9,
        driverHair: 0x111827,
        driverSkin: 0xFCD34D,
        description: 'Twin-engine street brawler with hood scoops and dual exhaust pipes.'
      },
      {
        id: 'cosmic_cruiser',
        name: 'Cosmic Cruiser',
        category: 'Legendary',
        price: 3000,
        unlocked: false,
        stats: { speed: 99, handling: 96, impact: 95, stability: 92 },
        primaryColor: 0xEC4899, // Hot Pink
        accentColor: 0x38BDF8, // Cyan
        bumperColor: 0x030712,
        driverShirt: 0x8B5CF6,
        driverHair: 0x60A5FA,
        driverSkin: 0xFCD34D,
        description: 'The pinnacle of bumper arena technology. Dual neon halo rings and boosted nitro endurance.'
      }
    ];
  }

  /**
   * Builds an authentic, detailed 3D Bumper Car with driver, wheels, bumper, headlights, and seating
   */
  static createBumperCar(carDef, options = {}) {
    const root = new THREE.Group();
    root.name = `car_${carDef.id}`;

    const primaryColor = options.primaryColor || carDef.primaryColor;
    const accentColor = options.accentColor || carDef.accentColor;
    const bumperColor = carDef.bumperColor || 0x1E293B;

    // Premium PBR / Phong Materials with Gloss & Specular Highlights
    const bodyPaintMat = new THREE.MeshPhongMaterial({
      color: primaryColor,
      specular: 0x999999,
      shininess: 90,
      flatShading: false
    });

    const accentPaintMat = new THREE.MeshPhongMaterial({
      color: accentColor,
      specular: 0x888888,
      shininess: 80
    });

    const rubberMat = new THREE.MeshPhongMaterial({
      color: bumperColor,
      specular: 0x222222,
      shininess: 15
    });

    const chromeMat = new THREE.MeshPhongMaterial({
      color: 0xF1F5F9,
      specular: 0xFFFFFF,
      shininess: 120
    });

    const seatLeatherMat = new THREE.MeshPhongMaterial({
      color: 0x0F172A,
      specular: 0x334155,
      shininess: 25
    });

    const headlightGlowMat = new THREE.MeshBasicMaterial({
      color: 0xFEF08A
    });

    const taillightMat = new THREE.MeshBasicMaterial({
      color: 0xEF4444
    });

    const glassMat = new THREE.MeshPhongMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.6,
      shininess: 100
    });

    // -------------------------------------------------------------
    // 1. THICK WRAP-AROUND RUBBER BUMPER (Molded Ridges & Steel Band)
    // -------------------------------------------------------------
    const bumperGroup = new THREE.Group();

    // Primary Heavy Rubber Donut (Elongated along Z for authentic car footprint)
    const mainBumperGeo = new THREE.TorusGeometry(1.22, 0.28, 16, 36);
    mainBumperGeo.rotateX(Math.PI / 2);
    mainBumperGeo.scale(1.0, 1.0, 1.35); // Length: ~3.3m, Width: ~2.4m
    const mainBumper = new THREE.Mesh(mainBumperGeo, rubberMat);
    mainBumper.position.y = 0.28;
    mainBumper.castShadow = true;
    mainBumper.receiveShadow = true;
    bumperGroup.add(mainBumper);

    // Chrome Protective Rib Band encircling the rubber bumper
    const trimRibGeo = new THREE.TorusGeometry(1.30, 0.05, 12, 36);
    trimRibGeo.rotateX(Math.PI / 2);
    trimRibGeo.scale(1.0, 1.0, 1.35);
    const trimRib = new THREE.Mesh(trimRibGeo, chromeMat);
    trimRib.position.y = 0.28;
    bumperGroup.add(trimRib);

    // Bumper Corner Rubber Buffer Pads (Front & Rear Reinforcements)
    const padGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 12);
    padGeo.rotateX(Math.PI / 2);
    const padOffsets = [
      { x: -0.65, z: 1.62 }, { x: 0.65, z: 1.62 }, // Front corners
      { x: -0.65, z: -1.62 }, { x: 0.65, z: -1.62 } // Rear corners
    ];
    padOffsets.forEach(pos => {
      const pad = new THREE.Mesh(padGeo, rubberMat);
      pad.position.set(pos.x, 0.28, pos.z);
      bumperGroup.add(pad);
    });

    root.add(bumperGroup);

    // -------------------------------------------------------------
    // 2. SCULPTURED 3D CAR BODY (Cockpit, Hood, Fenders, Grille)
    // -------------------------------------------------------------
    const bodyGroup = new THREE.Group();
    bodyGroup.name = 'car_body';

    // Lower Undercarriage Chassis Plate
    const chassisGeo = new THREE.BoxGeometry(1.8, 0.25, 2.8);
    const chassisMat = new THREE.MeshLambertMaterial({ color: 0x0B0F19 });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.20;
    bodyGroup.add(chassis);

    // 4 Visible Rubber Wheels with Chrome Hubcaps
    const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshLambertMaterial({ color: 0x0F172A });
    const hubcapGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 12);
    hubcapGeo.rotateZ(Math.PI / 2);

    const wheelPositions = [
      { x: -0.92, z: 0.95 }, { x: 0.92, z: 0.95 },  // Front Wheels
      { x: -0.92, z: -0.95 }, { x: 0.92, z: -0.95 } // Rear Wheels
    ];
    wheelPositions.forEach(wp => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.position.set(wp.x, 0.24, wp.z);
      w.castShadow = true;
      bodyGroup.add(w);

      const hub = new THREE.Mesh(hubcapGeo, chromeMat);
      hub.position.set(wp.x, 0.24, wp.z);
      bodyGroup.add(hub);
    });

    // Main Curved Fiberglass Body Shell
    // Aerodynamic curved shell covering sides and nose
    const bodyShellGeo = new THREE.CylinderGeometry(1.05, 1.18, 0.52, 32);
    bodyShellGeo.scale(1.0, 1.0, 1.30);
    const bodyShell = new THREE.Mesh(bodyShellGeo, bodyPaintMat);
    bodyShell.position.y = 0.52;
    bodyShell.castShadow = true;
    bodyShell.receiveShadow = true;
    bodyGroup.add(bodyShell);

    // Front Sloping Hood with Sculptured Curves
    const hoodGeo = new THREE.BoxGeometry(1.22, 0.32, 1.0);
    const hood = new THREE.Mesh(hoodGeo, bodyPaintMat);
    hood.position.set(0, 0.65, 0.75);
    hood.rotation.x = -0.18; // Sleek nose slope
    hood.castShadow = true;
    bodyGroup.add(hood);

    // Racing Hood Accent Stripes
    const stripeGeo = new THREE.BoxGeometry(0.32, 0.03, 0.95);
    const stripe = new THREE.Mesh(stripeGeo, accentPaintMat);
    stripe.position.set(0, 0.82, 0.75);
    stripe.rotation.x = -0.18;
    bodyGroup.add(stripe);

    // Front Chrome Grille / Bumper Air Dam
    const grilleGeo = new THREE.BoxGeometry(0.85, 0.22, 0.12);
    const grilleMat = new THREE.MeshPhongMaterial({ color: 0x0F172A, specular: 0x64748B, shininess: 40 });
    const grille = new THREE.Mesh(grilleGeo, grilleMat);
    grille.position.set(0, 0.45, 1.48);
    bodyGroup.add(grille);

    const grilleTrim = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.04, 0.14), chromeMat);
    grilleTrim.position.set(0, 0.56, 1.48);
    bodyGroup.add(grilleTrim);

    // Dual Front Crystalline Headlights
    const headlightGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
    headlightGeo.rotateX(Math.PI / 2);
    const bezelGeo = new THREE.TorusGeometry(0.16, 0.03, 8, 16);

    const leftHeadlight = new THREE.Mesh(headlightGeo, headlightGlowMat);
    leftHeadlight.position.set(-0.52, 0.52, 1.45);
    bodyGroup.add(leftHeadlight);
    const leftBezel = new THREE.Mesh(bezelGeo, chromeMat);
    leftBezel.position.set(-0.52, 0.52, 1.47);
    bodyGroup.add(leftBezel);

    const rightHeadlight = new THREE.Mesh(headlightGeo, headlightGlowMat);
    rightHeadlight.position.set(0.52, 0.52, 1.45);
    bodyGroup.add(rightHeadlight);
    const rightBezel = new THREE.Mesh(bezelGeo, chromeMat);
    rightBezel.position.set(0.52, 0.52, 1.47);
    bodyGroup.add(rightBezel);

    // Dual Rear Red Taillights
    const leftTail = new THREE.Mesh(headlightGeo, taillightMat);
    leftTail.position.set(-0.55, 0.55, -1.45);
    bodyGroup.add(leftTail);

    const rightTail = new THREE.Mesh(headlightGeo, taillightMat);
    rightTail.position.set(0.55, 0.55, -1.45);
    bodyGroup.add(rightTail);

    // Dual Chrome Exhaust Pipes (at the rear)
    const exhaustGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.25, 12);
    exhaustGeo.rotateX(Math.PI / 2);
    const leftExhaust = new THREE.Mesh(exhaustGeo, chromeMat);
    leftExhaust.position.set(-0.28, 0.32, -1.52);
    bodyGroup.add(leftExhaust);

    const rightExhaust = new THREE.Mesh(exhaustGeo, chromeMat);
    rightExhaust.position.set(0.28, 0.32, -1.52);
    bodyGroup.add(rightExhaust);

    // -------------------------------------------------------------
    // 3. INTERIOR COCKPIT, BUCKET SEAT & STEERING WHEEL
    // -------------------------------------------------------------
    // Recessed Cockpit Tub
    const cockpitGeo = new THREE.BoxGeometry(1.2, 0.35, 1.3);
    const cockpitFloor = new THREE.Mesh(cockpitGeo, seatLeatherMat);
    cockpitFloor.position.set(0, 0.42, -0.05);
    bodyGroup.add(cockpitFloor);

    // Ergonomic Padded High-Back Bucket Seat with Headrest
    const seatBottomGeo = new THREE.BoxGeometry(1.05, 0.18, 0.65);
    const seatBottom = new THREE.Mesh(seatBottomGeo, seatLeatherMat);
    seatBottom.position.set(0, 0.52, -0.28);
    bodyGroup.add(seatBottom);

    const seatBackGeo = new THREE.BoxGeometry(1.0, 0.85, 0.22);
    const seatBack = new THREE.Mesh(seatBackGeo, seatLeatherMat);
    seatBack.position.set(0, 0.98, -0.62);
    seatBack.rotation.x = -0.15; // Angled backrest
    seatBack.castShadow = true;
    bodyGroup.add(seatBack);

    // Headrest
    const headrestGeo = new THREE.BoxGeometry(0.52, 0.28, 0.18);
    const headrest = new THREE.Mesh(headrestGeo, seatLeatherMat);
    headrest.position.set(0, 1.50, -0.72);
    bodyGroup.add(headrest);

    // Dashboard Console with Gauges
    const dashGeo = new THREE.BoxGeometry(1.05, 0.28, 0.35);
    const dash = new THREE.Mesh(dashGeo, seatLeatherMat);
    dash.position.set(0, 0.78, 0.32);
    dash.rotation.x = -0.25;
    bodyGroup.add(dash);

    // Steering Column & 3D Sports Steering Wheel
    const columnGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.48, 12);
    const column = new THREE.Mesh(columnGeo, chromeMat);
    column.position.set(0, 0.82, 0.16);
    column.rotation.x = -0.75;
    bodyGroup.add(column);

    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(0, 0.98, 0.05);
    wheelGroup.rotation.x = 0.82;

    const wheelRimGeo = new THREE.TorusGeometry(0.26, 0.04, 10, 24);
    const wheelRim = new THREE.Mesh(wheelRimGeo, rubberMat);
    wheelGroup.add(wheelRim);

    // Steering Wheel Spokes
    const spokeGeo = new THREE.BoxGeometry(0.48, 0.035, 0.04);
    const spokeH = new THREE.Mesh(spokeGeo, chromeMat);
    wheelGroup.add(spokeH);
    const spokeV = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.25, 0.04), chromeMat);
    spokeV.position.y = -0.12;
    wheelGroup.add(spokeV);

    bodyGroup.add(wheelGroup);

    // Mini Windshield Deflector
    const shieldGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.25, 24, 1, true, 0, Math.PI);
    shieldGeo.rotateX(Math.PI / 2);
    const shield = new THREE.Mesh(shieldGeo, glassMat);
    shield.position.set(0, 0.95, 0.42);
    bodyGroup.add(shield);

    // -------------------------------------------------------------
    // 4. OVERHEAD AMUSEMENT PARK POWER TROLLEY POLE
    // -------------------------------------------------------------
    const poleGroup = new THREE.Group();
    poleGroup.position.set(0.48, 0.9, -0.85);

    // Flexible Spring Base
    const springGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.22, 10);
    const spring = new THREE.Mesh(springGeo, chromeMat);
    spring.position.y = 0.11;
    poleGroup.add(spring);

    // Long Slender Chrome Antenna Mast
    const mastGeo = new THREE.CylinderGeometry(0.025, 0.035, 2.4, 10);
    const mast = new THREE.Mesh(mastGeo, chromeMat);
    mast.position.y = 1.32;
    poleGroup.add(mast);

    // Top Carnival Power Trolley Beacon / Head
    const tipHeadGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const tipHeadMat = new THREE.MeshBasicMaterial({ color: accentColor });
    const tipHead = new THREE.Mesh(tipHeadGeo, tipHeadMat);
    tipHead.position.y = 2.52;
    poleGroup.add(tipHead);

    bodyGroup.add(poleGroup);

    // -------------------------------------------------------------
    // 5. UNIQUE VISUAL FEATURES PER CAR IDENTITY
    // -------------------------------------------------------------
    if (carDef.id === 'neon_phantom' || carDef.id === 'cosmic_cruiser') {
      // Rear GT Wing Spoiler
      const wingGeo = new THREE.BoxGeometry(1.4, 0.08, 0.32);
      const wing = new THREE.Mesh(wingGeo, accentPaintMat);
      wing.position.set(0, 1.25, -1.15);
      bodyGroup.add(wing);

      const wingStrutL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.08), chromeMat);
      wingStrutL.position.set(-0.52, 1.05, -1.15);
      bodyGroup.add(wingStrutL);

      const wingStrutR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.08), chromeMat);
      wingStrutR.position.set(0.52, 1.05, -1.15);
      bodyGroup.add(wingStrutR);
    } else if (carDef.id === 'jungle_crusher' || carDef.id === 'lava_titan') {
      // Heavy Steel Front Bull-Bar Horns
      const hornGeo = new THREE.ConeGeometry(0.14, 0.45, 12);
      hornGeo.rotateX(Math.PI / 2);
      const leftHorn = new THREE.Mesh(hornGeo, chromeMat);
      leftHorn.position.set(-0.42, 0.32, 1.72);
      bodyGroup.add(leftHorn);

      const rightHorn = new THREE.Mesh(hornGeo, chromeMat);
      rightHorn.position.set(0.42, 0.32, 1.72);
      bodyGroup.add(rightHorn);
    }

    root.add(bodyGroup);

    // -------------------------------------------------------------
    // 6. FULLY ARTICULATED VISIBLE CARTOON DRIVER CHARACTER
    // -------------------------------------------------------------
    const driverGroup = ModelFactory.createDetailedDriver({
      shirtColor: options.driverShirt || carDef.driverShirt,
      skinColor: options.driverSkin || carDef.driverSkin,
      hairColor: options.driverHair || carDef.driverHair,
      carId: carDef.id
    });
    // Positioned securely in seat, hands placed on steering wheel
    driverGroup.position.set(0, 0.58, -0.22);
    driverGroup.name = 'driver_character';
    root.add(driverGroup);

    // Save gameplay & animation references
    root.userData = {
      carDef: carDef,
      stats: { ...carDef.stats },
      driverGroup: driverGroup,
      bodyGroup: bodyGroup,
      steeringWheel: wheelGroup,
      poleTip: tipHead,
      exhaustLeft: leftExhaust,
      exhaustRight: rightExhaust
    };

    return root;
  }

  /**
   * Procedural Cartoon Human Driver (Head, face, eyes, hair, neck, torso, arms gripping wheel)
   */
  static createDetailedDriver(opts = {}) {
    const driver = new THREE.Group();

    const skinMat = new THREE.MeshPhongMaterial({
      color: opts.skinColor || 0xFCD34D,
      specular: 0x333333,
      shininess: 20
    });

    const shirtMat = new THREE.MeshPhongMaterial({
      color: opts.shirtColor || 0x2563EB,
      specular: 0x444444,
      shininess: 30
    });

    const hairMat = new THREE.MeshPhongMaterial({
      color: opts.hairColor || 0x374151,
      specular: 0x222222,
      shininess: 15
    });

    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x0F172A });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const smileMat = new THREE.MeshBasicMaterial({ color: 0x991B1B });

    // 1. Torso & Racing Suit with Collar
    const torsoGeo = new THREE.CylinderGeometry(0.32, 0.36, 0.65, 18);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = 0.35;
    torso.castShadow = true;
    driver.add(torso);

    // Collar
    const collarGeo = new THREE.TorusGeometry(0.24, 0.05, 8, 16);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, shirtMat);
    collar.position.y = 0.68;
    driver.add(collar);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.18, 12);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.y = 0.74;
    driver.add(neck);

    // 2. Animated Head Pivot (For collision bobble and cornering lean)
    const headPivot = new THREE.Group();
    headPivot.name = 'head_pivot';
    headPivot.position.set(0, 0.95, 0);

    // Head Sphere (Detailed oval shape)
    const headGeo = new THREE.SphereGeometry(0.32, 20, 20);
    headGeo.scale(1.0, 1.08, 1.02);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.castShadow = true;
    headPivot.add(head);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.06, 0.12, 10);
    noseGeo.rotateX(Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, 0.02, 0.34);
    headPivot.add(nose);

    // Left Eye (Detailed Sclera + Iris + Specular Glint)
    const eyeWhiteGeo = new THREE.SphereGeometry(0.075, 12, 12);
    const eyePupilGeo = new THREE.SphereGeometry(0.042, 10, 10);
    const glintGeo = new THREE.SphereGeometry(0.018, 6, 6);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

    // Left Eye
    const eyeL = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    eyeL.position.set(-0.11, 0.08, 0.28);
    headPivot.add(eyeL);
    const pupilL = new THREE.Mesh(eyePupilGeo, eyePupilMat);
    pupilL.position.set(-0.11, 0.08, 0.34);
    headPivot.add(pupilL);
    const glintL = new THREE.Mesh(glintGeo, glintMat);
    glintL.position.set(-0.09, 0.10, 0.37);
    headPivot.add(glintL);

    // Right Eye
    const eyeR = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    eyeR.position.set(0.11, 0.08, 0.28);
    headPivot.add(eyeR);
    const pupilR = new THREE.Mesh(eyePupilGeo, eyePupilMat);
    pupilR.position.set(0.11, 0.08, 0.34);
    headPivot.add(pupilR);
    const glintR = new THREE.Mesh(glintGeo, glintMat);
    glintR.position.set(0.13, 0.10, 0.37);
    headPivot.add(glintR);

    // Cheerful Cartoon Smile (Torus Arc)
    const mouthGeo = new THREE.TorusGeometry(0.09, 0.02, 8, 16, Math.PI);
    const mouth = new THREE.Mesh(mouthGeo, smileMat);
    mouth.position.set(0, -0.10, 0.30);
    mouth.rotation.z = Math.PI;
    headPivot.add(mouth);

    // Stylized Hair / Cap
    const hairCapGeo = new THREE.SphereGeometry(0.34, 18, 18, 0, Math.PI * 2, 0, Math.PI * 0.58);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.y = 0.05;
    headPivot.add(hairCap);

    // Spiky Hair Tuft on Top
    const tuftGeo = new THREE.ConeGeometry(0.12, 0.25, 8);
    tuftGeo.rotateX(-0.35);
    const tuft = new THREE.Mesh(tuftGeo, hairMat);
    tuft.position.set(0, 0.36, 0.12);
    headPivot.add(tuft);

    driver.add(headPivot);

    // 3. Arms & Hands Visibly Positioned on Steering Wheel
    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.52, 12);
    armGeo.rotateX(Math.PI / 3.2);

    // Left Arm & Hand
    const armL = new THREE.Mesh(armGeo, shirtMat);
    armL.position.set(-0.34, 0.45, 0.22);
    armL.rotation.y = -0.45;
    armL.castShadow = true;
    driver.add(armL);

    const handGeo = new THREE.SphereGeometry(0.085, 10, 10);
    const handL = new THREE.Mesh(handGeo, skinMat);
    handL.position.set(-0.20, 0.34, 0.38);
    driver.add(handL);

    // Right Arm & Hand
    const armR = new THREE.Mesh(armGeo, shirtMat);
    armR.position.set(0.34, 0.45, 0.22);
    armR.rotation.y = 0.45;
    armR.castShadow = true;
    driver.add(armR);

    const handR = new THREE.Mesh(handGeo, skinMat);
    handR.position.set(0.20, 0.34, 0.38);
    driver.add(handR);

    return driver;
  }
}

window.ModelFactory = ModelFactory;

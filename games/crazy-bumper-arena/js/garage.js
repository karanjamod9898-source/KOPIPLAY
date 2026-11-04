/**
 * Crazy Bumper Arena - Garage & Car Customization Manager
 * Interactive 3D Turntable, Car Stats, Coin Unlock, Paint Picker, and Local Storage.
 */
class GarageManager {
  constructor(scene, onCarChanged) {
    this.scene = scene;
    this.onCarChanged = onCarChanged;
    this.currentIndex = 0;
    this.previewCarMesh = null;
    this.turntableMesh = null;
    this.previewScene = null;
    this.previewCamera = null;
    this.previewRenderer = null;
    this.isGarageActive = false;
    this.initData();
  }

  initData() {
    this.unlockedCars = JSON.parse(localStorage.getItem('cba_unlocked_cars') || '["red_rocket"]');
    this.selectedCarId = localStorage.getItem('cba_selected_car') || 'red_rocket';
    this.totalCoins = parseInt(localStorage.getItem('cba_total_coins') || '150', 10);
    this.customColors = JSON.parse(localStorage.getItem('cba_custom_colors') || '{}');

    // Index of selected car
    const idx = ModelFactory.CAR_DEFINITIONS.findIndex(c => c.id === this.selectedCarId);
    this.currentIndex = idx !== -1 ? idx : 0;
  }

  saveData() {
    localStorage.setItem('cba_unlocked_cars', JSON.stringify(this.unlockedCars));
    localStorage.setItem('cba_selected_car', this.selectedCarId);
    localStorage.setItem('cba_total_coins', this.totalCoins);
    localStorage.setItem('cba_custom_colors', JSON.stringify(this.customColors));
  }

  addCoins(amount) {
    this.totalCoins += amount;
    this.saveData();
    return this.totalCoins;
  }

  openGarage(containerEl) {
    this.isGarageActive = true;
    this.initData();
    this.container = containerEl;

    if (!this.previewRenderer && containerEl) {
      const w = containerEl.clientWidth || 480;
      const h = containerEl.clientHeight || 420;

      this.previewScene = new THREE.Scene();
      this.previewCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
      this.previewCamera.position.set(0, 2.2, 4.8);
      this.previewCamera.lookAt(0, 0.5, 0);

      this.previewRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.previewRenderer.setSize(w, h);
      this.previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.previewRenderer.shadowMap.enabled = true;

      // Add to container before navigation arrows
      containerEl.prepend(this.previewRenderer.domElement);

      // Dedicated Turntable Studio Lighting
      const amb = new THREE.AmbientLight(0xFFFFFF, 0.95);
      this.previewScene.add(amb);

      const keyLight = new THREE.DirectionalLight(0xFFFBEB, 1.35);
      keyLight.position.set(5, 8, 5);
      this.previewScene.add(keyLight);

      const cyanRim = new THREE.DirectionalLight(0x38BDF8, 0.85);
      cyanRim.position.set(-5, 4, -5);
      this.previewScene.add(cyanRim);

      const magentaRim = new THREE.DirectionalLight(0xF43F5E, 0.65);
      magentaRim.position.set(5, 3, -5);
      this.previewScene.add(magentaRim);

      // Turntable pedestal
      const turnGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.25, 32);
      const turnMat = new THREE.MeshPhongMaterial({ color: 0x1E293B, specular: 0x64748B, shininess: 60 });
      this.turntableMesh = new THREE.Mesh(turnGeo, turnMat);
      this.turntableMesh.position.set(0, -0.12, 0);

      const rimGeo = new THREE.TorusGeometry(2.3, 0.05, 12, 36);
      rimGeo.rotateX(Math.PI / 2);
      const rimMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.y = 0.12;
      this.turntableMesh.add(rim);
      this.previewScene.add(this.turntableMesh);
    }

    this.showCar(this.currentIndex);
  }

  closeGarage() {
    this.isGarageActive = false;
  }

  showCar(index) {
    const cars = ModelFactory.CAR_DEFINITIONS;
    this.currentIndex = (index + cars.length) % cars.length;
    const def = cars[this.currentIndex];

    // Remove existing car mesh in preview scene
    if (this.previewCarMesh && this.previewScene) {
      this.previewScene.remove(this.previewCarMesh);
    }

    // Apply any saved custom colors
    const custom = this.customColors[def.id] || {};
    this.previewCarMesh = ModelFactory.createBumperCar(def, {
      primaryColor: custom.primaryColor || def.primaryColor,
      accentColor: custom.accentColor || def.accentColor
    });
    this.previewCarMesh.position.set(0, 0.14, 0);
    
    if (this.previewScene) {
      this.previewScene.add(this.previewCarMesh);
    }

    return {
      def: def,
      isUnlocked: this.unlockedCars.includes(def.id),
      isSelected: this.selectedCarId === def.id,
      coins: this.totalCoins
    };
  }

  nextCar() {
    return this.showCar(this.currentIndex + 1);
  }

  prevCar() {
    return this.showCar(this.currentIndex - 1);
  }

  selectCurrentCar() {
    const def = ModelFactory.CAR_DEFINITIONS[this.currentIndex];
    if (this.unlockedCars.includes(def.id)) {
      this.selectedCarId = def.id;
      this.saveData();
      if (this.onCarChanged) this.onCarChanged(def);
      return { success: true, message: 'Car selected!' };
    }
    return { success: false, message: 'Car is locked!' };
  }

  buyCurrentCar() {
    const def = ModelFactory.CAR_DEFINITIONS[this.currentIndex];
    if (this.unlockedCars.includes(def.id)) {
      return { success: false, message: 'Already unlocked!' };
    }
    if (this.totalCoins >= def.price) {
      this.totalCoins -= def.price;
      this.unlockedCars.push(def.id);
      this.selectedCarId = def.id;
      this.saveData();
      if (this.onCarChanged) this.onCarChanged(def);
      return { success: true, message: `Unlocked ${def.name}!` };
    } else {
      return { success: false, message: `Need ${def.price - this.totalCoins} more coins!` };
    }
  }

  setCustomColor(primaryHex) {
    const def = ModelFactory.CAR_DEFINITIONS[this.currentIndex];
    if (!this.customColors[def.id]) this.customColors[def.id] = {};
    this.customColors[def.id].primaryColor = parseInt(primaryHex.replace('#', '0x'), 16);
    this.saveData();
    return this.showCar(this.currentIndex);
  }

  update(dt) {
    if (this.isGarageActive && this.previewRenderer && this.previewScene && this.previewCamera) {
      if (this.previewCarMesh) {
        this.previewCarMesh.rotation.y += 0.9 * dt;
      }
      this.previewRenderer.render(this.previewScene, this.previewCamera);
    }
  }

  getSelectedCarDef() {
    this.initData();
    const def = ModelFactory.CAR_DEFINITIONS.find(c => c.id === this.selectedCarId);
    return def || ModelFactory.CAR_DEFINITIONS[0];
  }
}

window.GarageManager = GarageManager;

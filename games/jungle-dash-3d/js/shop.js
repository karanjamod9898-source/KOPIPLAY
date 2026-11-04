/**
 * Jungle Dash 3D - Explorer Character Shop
 * Handles unlocking adventurer outfits and previewing skins.
 */
class ShopManager {
  constructor(game) {
    this.game = game;
    this.previewScene = null;
    this.previewCamera = null;
    this.previewRenderer = null;
    this.previewPlayer = null;
    this.currentSkinIndex = 0;
  }

  openShop(containerEl) {
    this.currentSkinIndex = ModelFactory.SKINS.findIndex(s => s.id === this.game.missions.selectedSkinId);
    if (this.currentSkinIndex === -1) this.currentSkinIndex = 0;

    if (!this.previewRenderer && containerEl) {
      const w = containerEl.clientWidth || 360;
      const h = containerEl.clientHeight || 340;

      this.previewScene = new THREE.Scene();
      this.previewCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 50);
      this.previewCamera.position.set(0, 1.4, 3.8);
      this.previewCamera.lookAt(0, 0.85, 0);

      this.previewRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.previewRenderer.setSize(w, h);
      this.previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      containerEl.prepend(this.previewRenderer.domElement);

      // Studio Lighting
      const amb = new THREE.AmbientLight(0xFFFFFF, 0.95);
      this.previewScene.add(amb);
      const key = new THREE.DirectionalLight(0xFFFBEB, 1.3);
      key.position.set(3, 6, 4);
      this.previewScene.add(key);
      const rim = new THREE.DirectionalLight(0x38BDF8, 0.8);
      rim.position.set(-3, 3, -3);
      this.previewScene.add(rim);

      // Small Pedestal
      const ped = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.5, 0.2, 24),
        new THREE.MeshLambertMaterial({ color: 0x1E293B })
      );
      ped.position.y = -0.1;
      this.previewScene.add(ped);
    }

    this.showSkin(this.currentSkinIndex);
  }

  showSkin(index) {
    const skins = ModelFactory.SKINS;
    this.currentSkinIndex = (index + skins.length) % skins.length;
    const skinDef = skins[this.currentSkinIndex];

    if (this.previewPlayer && this.previewScene) {
      this.previewScene.remove(this.previewPlayer.root);
    }

    this.previewPlayer = ModelFactory.createPlayer(skinDef);
    this.previewPlayer.root.position.set(0, 0, 0);
    if (this.previewScene) {
      this.previewScene.add(this.previewPlayer.root);
    }

    const isUnlocked = this.game.missions.unlockedSkins.includes(skinDef.id);
    const isSelected = this.game.missions.selectedSkinId === skinDef.id;

    return {
      def: skinDef,
      isUnlocked,
      isSelected,
      coins: this.game.missions.totalCoins
    };
  }

  nextSkin() {
    return this.showSkin(this.currentSkinIndex + 1);
  }

  prevSkin() {
    return this.showSkin(this.currentSkinIndex - 1);
  }

  buyOrSelectCurrent() {
    const skinDef = ModelFactory.SKINS[this.currentSkinIndex];
    const isUnlocked = this.game.missions.unlockedSkins.includes(skinDef.id);

    if (isUnlocked) {
      this.game.missions.selectedSkinId = skinDef.id;
      this.game.missions.saveData();
      this.game.rebuildPlayer(skinDef);
      return { success: true, action: 'selected', def: skinDef };
    }

    if (this.game.missions.totalCoins >= skinDef.price) {
      this.game.missions.totalCoins -= skinDef.price;
      this.game.missions.unlockedSkins.push(skinDef.id);
      this.game.missions.selectedSkinId = skinDef.id;
      this.game.missions.saveData();
      this.game.rebuildPlayer(skinDef);
      return { success: true, action: 'unlocked', def: skinDef };
    }

    return { success: false, action: 'insufficient_funds', def: skinDef };
  }

  update(delta) {
    if (this.previewPlayer && this.previewRenderer && this.previewScene && this.previewCamera) {
      this.previewPlayer.root.rotation.y += 0.85 * delta;
      this.previewRenderer.render(this.previewScene, this.previewCamera);
    }
  }
}

window.ShopManager = ShopManager;


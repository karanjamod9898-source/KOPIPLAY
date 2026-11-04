/**
 * Crazy Bumper Arena - Physics & Collision Engine
 * Custom arcade physics with elastic bumper impulses, momentum, friction,
 * barrier rebound, and head/body reaction wobble.
 */
class PhysicsEngine {
  constructor(arenaRadius = 24) {
    this.arenaRadius = arenaRadius;
    this.cars = [];
    this.gravity = 9.8;
  }

  setArenaRadius(radius) {
    this.arenaRadius = radius;
  }

  addCar(carState) {
    this.cars.push(carState);
  }

  clearCars() {
    this.cars = [];
  }

  /**
   * Main Physics Simulation Step (Fixed Delta Time)
   */
  update(dt, arenaConfig = {}) {
    const cars = this.cars;
    const frictionBase = arenaConfig.iceFriction ? 0.985 : 0.94; // Ice is slippery!

    // 1. Update Individual Car Kinematics
    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];
      if (c.knockedOut) continue;

      // Handle Nitro Duration
      if (c.nitroTimer > 0) {
        c.nitroTimer -= dt;
        if (c.nitroTimer <= 0) c.isNitro = false;
      }

      // Handle Shield Duration
      if (c.shieldTimer > 0) {
        c.shieldTimer -= dt;
        if (c.shieldTimer <= 0) c.isShield = false;
      }

      // Handle Super Bumper Duration
      if (c.superBumperTimer > 0) {
        c.superBumperTimer -= dt;
        if (c.superBumperTimer <= 0) c.isSuperBumper = false;
      }

      // Speed limits based on car stats & active power-ups
      const baseMaxSpeed = 12 + (c.stats.speed / 100) * 8; // 12 .. 20 m/s
      const maxSpeed = c.isNitro ? baseMaxSpeed * 1.55 : baseMaxSpeed;
      const accel = (8 + (c.stats.speed / 100) * 8) * (c.isNitro ? 1.7 : 1.0);
      const turnRate = 2.4 + (c.stats.handling / 100) * 1.6; // rad/s

      // Input Driving Dynamics
      if (c.input.forward) {
        c.speed += accel * dt;
      } else if (c.input.backward) {
        c.speed -= (accel * 0.75) * dt;
      } else {
        c.speed *= frictionBase;
      }

      // Cap speed
      if (c.speed > maxSpeed) c.speed = maxSpeed;
      if (c.speed < -maxSpeed * 0.5) c.speed = -maxSpeed * 0.5;

      // Steering (Allow turning on spot as bumper cars have 360-degree front steering wheels!)
      const moveDirection = c.speed >= 0 ? 1 : -1;
      const speedSteerFactor = Math.max(0.65, Math.min(Math.abs(c.speed) / 2.5, 1.2));

      if (c.input.left) {
        c.heading += turnRate * dt * (c.speed === 0 ? 1 : moveDirection) * speedSteerFactor;
      }
      if (c.input.right) {
        c.heading -= turnRate * dt * (c.speed === 0 ? 1 : moveDirection) * speedSteerFactor;
      }

      // Forward velocity component
      c.vx = Math.sin(c.heading) * c.speed;
      c.vz = Math.cos(c.heading) * c.speed;

      // Add Impulse Recoil / Knockback
      c.x += (c.vx + c.impulseX) * dt;
      c.z += (c.vz + c.impulseZ) * dt;

      // Dampen impulses rapidly
      c.impulseX *= 0.88;
      c.impulseZ *= 0.88;
      if (Math.abs(c.impulseX) < 0.01) c.impulseX = 0;
      if (Math.abs(c.impulseZ) < 0.01) c.impulseZ = 0;

      // Sync 3D Mesh Position & Yaw Rotation
      if (c.mesh) {
        c.mesh.position.x = c.x;
        c.mesh.position.z = c.z;
        c.mesh.rotation.y = c.heading;

        // Visual Body Roll / Lean on Turn & Acceleration
        const body = c.mesh.userData.bodyGroup;
        const driver = c.mesh.userData.driverGroup;

        if (body) {
          const steerTilt = (c.input.left ? 0.08 : c.input.right ? -0.08 : 0) * speedSteerFactor;
          const accelPitch = (c.input.forward ? 0.04 : c.input.backward ? -0.04 : 0);
          body.rotation.z += (steerTilt - body.rotation.z) * 0.15;
          body.rotation.x += (accelPitch - body.rotation.x) * 0.15;
        }

        // Driver Head Bobble / Reaction
        if (driver) {
          const headPivot = driver.getObjectByName('head_pivot');
          if (headPivot) {
            const headTargetZ = (c.input.left ? -0.18 : c.input.right ? 0.18 : 0);
            const headTargetX = (c.input.forward ? 0.14 : c.input.backward ? -0.14 : 0);
            headPivot.rotation.z += (headTargetZ - headPivot.rotation.z) * 0.2;
            headPivot.rotation.x += (headTargetX - headPivot.rotation.x) * 0.2;
          }
        }
      }

      // Arena Boundary Collision (Circular Arena Rails)
      const distFromCenter = Math.hypot(c.x, c.z);
      const carRadius = 1.35;
      const effectiveBoundary = this.arenaRadius - carRadius;

      if (distFromCenter > effectiveBoundary) {
        // Normal pointing inward towards center
        const nx = -c.x / distFromCenter;
        const nz = -c.z / distFromCenter;
        const overlap = distFromCenter - effectiveBoundary;

        // Push back inside arena
        c.x += nx * overlap;
        c.z += nz * overlap;

        // Rebound reflection impulse
        const dot = c.vx * nx + c.vz * nz;
        if (dot < 0) {
          c.impulseX += nx * Math.abs(dot) * 1.4;
          c.impulseZ += nz * Math.abs(dot) * 1.4;
          c.speed *= -0.3; // bounce recoil

          // Trigger collision feedback
          if (c.onWallCollide) c.onWallCollide(Math.abs(dot));
        }
      }

      // Lava Hazard Zone Detection (Level 5)
      if (arenaConfig.hasLavaHazard) {
        const hazardRadius = arenaConfig.lavaRadius || 5.0;
        if (distFromCenter < hazardRadius) {
          c.health -= dt * 25; // lava takes damage
          if (c.onHazard) c.onHazard('lava', dt);
        }
      }
    }

    // 2. Inter-Car Elastic Bumper Collisions (N^2 pairwise check for 6 cars)
    for (let i = 0; i < cars.length; i++) {
      for (let j = i + 1; j < cars.length; j++) {
        const c1 = cars[i];
        const c2 = cars[j];

        if (c1.knockedOut || c2.knockedOut) continue;

        const dx = c2.x - c1.x;
        const dz = c2.z - c1.z;
        const dist = Math.hypot(dx, dz);
        const minDist = 2.45; // Sum of bumper radii

        if (dist < minDist && dist > 0.001) {
          // Collision Normal from c1 to c2
          const nx = dx / dist;
          const nz = dz / dist;
          const overlap = minDist - dist;

          // Positional Separation to prevent clipping
          c1.x -= nx * overlap * 0.5;
          c1.z -= nz * overlap * 0.5;
          c2.x += nx * overlap * 0.5;
          c2.z += nz * overlap * 0.5;

          // Relative Velocity along normal
          const rvx = (c2.vx + c2.impulseX) - (c1.vx + c1.impulseX);
          const rvz = (c2.vz + c2.impulseZ) - (c1.vz + c1.impulseZ);
          const velAlongNormal = rvx * nx + rvz * nz;

          // Do not resolve if objects are already separating
          if (velAlongNormal > 0) continue;

          // Restitution (elasticity) of rubber bumper rings
          const restitution = 1.35; // bouncy bumper feel!

          // Mass & Impact modifiers
          const mass1 = 1.0 + (c1.stats.stability / 100) * 0.5;
          const mass2 = 1.0 + (c2.stats.stability / 100) * 0.5;
          const impact1 = (c1.stats.impact / 100) * (c1.isSuperBumper ? 2.2 : 1.0);
          const impact2 = (c2.stats.impact / 100) * (c2.isSuperBumper ? 2.2 : 1.0);

          // Shield absorption
          const shieldMod1 = c1.isShield ? 0.25 : 1.0;
          const shieldMod2 = c2.isShield ? 0.25 : 1.0;

          // Impulse magnitude
          let impulseMag = -(1 + restitution) * velAlongNormal;
          impulseMag /= (1 / mass1 + 1 / mass2);
          impulseMag = Math.max(impulseMag, 6.0); // Minimum solid bump feel

          // Apply Impulses
          const impX = nx * impulseMag;
          const impZ = nz * impulseMag;

          c1.impulseX -= (impX / mass1) * impact2 * shieldMod1;
          c1.impulseZ -= (impZ / mass1) * impact2 * shieldMod1;

          c2.impulseX += (impX / mass2) * impact1 * shieldMod2;
          c2.impulseZ += (impZ / mass2) * impact1 * shieldMod2;

          // Speed loss on impact
          c1.speed *= 0.55;
          c2.speed *= 0.55;

          // Health / Impact Damage
          const damage = Math.min(Math.abs(impulseMag) * 1.5, 30);
          c1.health -= damage * shieldMod1 * (impact2 / 1.0);
          c2.health -= damage * shieldMod2 * (impact1 / 1.0);

          // Collision Callback (Audio, sparks, particles)
          const contactX = c1.x + nx * (minDist * 0.5);
          const contactZ = c1.z + nz * (minDist * 0.5);

          if (c1.onCarCollide) c1.onCarCollide(c2, impulseMag, contactX, contactZ);
          if (c2.onCarCollide) c2.onCarCollide(c1, impulseMag, contactX, contactZ);
        }
      }
    }
  }
}

window.PhysicsEngine = PhysicsEngine;


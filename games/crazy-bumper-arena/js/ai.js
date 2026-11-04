/**
 * Crazy Bumper Arena - AI Opponent Controller
 * Manages 5 intelligent AI cars with unique personalities, target selection,
 * obstacle avoidance, and level-scaled reaction times.
 */
class AIManager {
  static get AI_PROFILES() {
    return [
      {
        id: 'ai_crash_king',
        name: 'Crash King',
        personality: 'Aggressive',
        carId: 'lava_titan',
        primaryColor: 0xDC2626,
        accentColor: 0xF97316,
        driverColor: 0x991B1B,
        hairColor: 0x18181B,
        decisionRate: 0.15, // rapid aggressive checks
        ramAggression: 0.95
      },
      {
        id: 'ai_swift_sally',
        name: 'Swift Sally',
        personality: 'Defensive',
        carId: 'ice_drifter',
        primaryColor: 0x38BDF8,
        accentColor: 0x0284C7,
        driverColor: 0x0EA5E9,
        hairColor: 0xFDE047,
        decisionRate: 0.22,
        dodgeTendency: 0.9
      },
      {
        id: 'ai_coin_bandit',
        name: 'Coin Bandit',
        personality: 'CoinHunter',
        carId: 'golden_bumble',
        primaryColor: 0xFACC15,
        accentColor: 0x1E293B,
        driverColor: 0xFB923C,
        hairColor: 0x78350F,
        decisionRate: 0.25,
        coinGreed: 0.92
      },
      {
        id: 'ai_bumper_bob',
        name: 'Bumper Bob',
        personality: 'Tactical',
        carId: 'jungle_crusher',
        primaryColor: 0x10B981,
        accentColor: 0x84CC16,
        driverColor: 0x047857,
        hairColor: 0x4B5563,
        decisionRate: 0.28,
        tacticalFlanking: 0.85
      },
      {
        id: 'ai_speedy_max',
        name: 'Speedy Max',
        personality: 'Balanced',
        carId: 'neon_phantom',
        primaryColor: 0x8B5CF6,
        accentColor: 0xD946EF,
        driverColor: 0x6D28D9,
        hairColor: 0x1F2937,
        decisionRate: 0.20,
        balancedDecision: 0.88
      }
    ];
  }

  constructor(physicsEngine, arenaRadius = 24) {
    this.physics = physicsEngine;
    this.arenaRadius = arenaRadius;
    this.opponents = [];
  }

  setArenaRadius(radius) {
    this.arenaRadius = radius;
  }

  initOpponents(scene, levelIndex = 0) {
    this.opponents = [];
    const profiles = AIManager.AI_PROFILES;
    const count = 5;

    // Place 5 AI cars in a circular starting grid around center
    const radius = this.arenaRadius * 0.65;
    for (let i = 0; i < count; i++) {
      const prof = profiles[i];
      const carDef = ModelFactory.CAR_DEFINITIONS.find(c => c.id === prof.carId) || ModelFactory.CAR_DEFINITIONS[0];

      const angle = ((i + 1) / (count + 1)) * Math.PI * 2;
      const startX = Math.cos(angle) * radius;
      const startZ = Math.sin(angle) * radius;

      const mesh = ModelFactory.createBumperCar(carDef, {
        primaryColor: prof.primaryColor,
        accentColor: prof.accentColor,
        driverColor: prof.driverColor,
        hairColor: prof.hairColor
      });

      mesh.position.set(startX, 0, startZ);
      // Face towards center initially
      const heading = Math.atan2(-startX, -startZ);
      mesh.rotation.y = heading;
      scene.add(mesh);

      // Level difficulty scaling factor
      const speedScale = 0.85 + (levelIndex * 0.08);

      const aiCar = {
        id: prof.id,
        name: prof.name,
        profile: prof,
        isAI: true,
        mesh: mesh,
        x: startX,
        z: startZ,
        vx: 0,
        vz: 0,
        heading: heading,
        speed: 0,
        impulseX: 0,
        impulseZ: 0,
        health: 100,
        maxHealth: 100,
        knockedOut: false,
        stats: {
          speed: carDef.stats.speed * speedScale,
          handling: carDef.stats.handling * speedScale,
          impact: carDef.stats.impact * (1 + levelIndex * 0.05),
          stability: carDef.stats.stability
        },
        input: { forward: false, backward: false, left: false, right: false },
        decisionTimer: Math.random() * prof.decisionRate,
        currentGoal: { x: 0, z: 0 },
        nitroTimer: 0,
        shieldTimer: 0,
        superBumperTimer: 0,
        isNitro: false,
        isShield: false,
        isSuperBumper: false
      };

      this.opponents.push(aiCar);
      this.physics.addCar(aiCar);
    }
  }

  update(dt, playerCar, activeCoins = [], activePowerups = []) {
    const arenaBound = this.arenaRadius - 2.5;

    for (let i = 0; i < this.opponents.length; i++) {
      const ai = this.opponents[i];
      if (ai.knockedOut) continue;

      ai.decisionTimer -= dt;

      // 1. Re-evaluate Decision periodically based on Personality
      if (ai.decisionTimer <= 0) {
        ai.decisionTimer = ai.profile.decisionRate + (Math.random() * 0.08);

        // Target Determination
        let targetX = 0;
        let targetZ = 0;

        const distToCenter = Math.hypot(ai.x, ai.z);

        // Immediate boundary recovery if too close to arena wall
        if (distToCenter > arenaBound - 1.5) {
          targetX = 0;
          targetZ = 0;
        } else {
          switch (ai.profile.personality) {
            case 'Aggressive':
              // Actively chase player or closest opponent
              if (playerCar && !playerCar.knockedOut && Math.random() < 0.75) {
                targetX = playerCar.x;
                targetZ = playerCar.z;
              } else {
                const target = this.findClosestTarget(ai, playerCar);
                if (target) {
                  targetX = target.x;
                  targetZ = target.z;
                }
              }
              break;

            case 'Defensive':
              // Avoid nearby high-speed cars, hover around middle ring
              const threat = this.findIncomingThreat(ai, playerCar);
              if (threat) {
                // Steer perpendicular or opposite to incoming threat
                const dx = ai.x - threat.x;
                const dz = ai.z - threat.z;
                targetX = ai.x + dx * 2;
                targetZ = ai.z + dz * 2;
              } else {
                // Circle inside arena safely
                const tAngle = Math.atan2(ai.z, ai.x) + 0.6;
                targetX = Math.cos(tAngle) * (this.arenaRadius * 0.4);
                targetZ = Math.sin(tAngle) * (this.arenaRadius * 0.4);
              }
              break;

            case 'CoinHunter':
              // Pathfind to nearest available coin or power-up
              const nearestCoin = this.findClosestItem(ai, activeCoins);
              if (nearestCoin) {
                targetX = nearestCoin.x;
                targetZ = nearestCoin.z;
              } else {
                targetX = (Math.random() - 0.5) * (this.arenaRadius * 0.8);
                targetZ = (Math.random() - 0.5) * (this.arenaRadius * 0.8);
              }
              break;

            case 'Tactical':
              // Push weaker cars or flank player
              if (playerCar && !playerCar.knockedOut) {
                // Aim for rear quarter of player car
                const flankDist = 3.5;
                targetX = playerCar.x - Math.sin(playerCar.heading) * flankDist;
                targetZ = playerCar.z - Math.cos(playerCar.heading) * flankDist;
              } else {
                const target = this.findClosestTarget(ai, playerCar);
                if (target) {
                  targetX = target.x;
                  targetZ = target.z;
                }
              }
              break;

            case 'Balanced':
            default:
              // Mix: 40% chase coin, 40% ram opponent, 20% wander
              const roll = Math.random();
              if (roll < 0.4 && activeCoins.length > 0) {
                const coin = this.findClosestItem(ai, activeCoins);
                if (coin) {
                  targetX = coin.x;
                  targetZ = coin.z;
                }
              } else if (roll < 0.8 && playerCar && !playerCar.knockedOut) {
                targetX = playerCar.x;
                targetZ = playerCar.z;
              } else {
                targetX = (Math.random() - 0.5) * (this.arenaRadius * 0.7);
                targetZ = (Math.random() - 0.5) * (this.arenaRadius * 0.7);
              }
              break;
          }
        }

        ai.currentGoal.x = targetX;
        ai.currentGoal.z = targetZ;
      }

      // 2. Drive towards currentGoal (Steering and Throttle)
      const toTargetX = ai.currentGoal.x - ai.x;
      const toTargetZ = ai.currentGoal.z - ai.z;
      const targetAngle = Math.atan2(toTargetX, toTargetZ);

      // Angle difference between current heading and target
      let angleDiff = targetAngle - ai.heading;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      // Throttle decision
      if (Math.abs(angleDiff) < 1.0) {
        ai.input.forward = true;
        ai.input.backward = false;
      } else if (Math.abs(angleDiff) > 2.4) {
        // Reverse if target is directly behind and close
        ai.input.forward = false;
        ai.input.backward = true;
      } else {
        ai.input.forward = true;
        ai.input.backward = false;
      }

      // Steering decision
      const steerDeadzone = 0.08;
      if (angleDiff > steerDeadzone) {
        ai.input.left = true;
        ai.input.right = false;
      } else if (angleDiff < -steerDeadzone) {
        ai.input.left = false;
        ai.input.right = true;
      } else {
        ai.input.left = false;
        ai.input.right = false;
      }
    }
  }

  findClosestTarget(self, playerCar) {
    let closest = playerCar && !playerCar.knockedOut ? playerCar : null;
    let minDist = closest ? Math.hypot(closest.x - self.x, closest.z - self.z) : 9999;

    for (let i = 0; i < this.opponents.length; i++) {
      const opp = this.opponents[i];
      if (opp === self || opp.knockedOut) continue;
      const d = Math.hypot(opp.x - self.x, opp.z - self.z);
      if (d < minDist) {
        minDist = d;
        closest = opp;
      }
    }
    return closest;
  }

  findIncomingThreat(self, playerCar) {
    const list = [playerCar, ...this.opponents].filter(c => c && c !== self && !c.knockedOut);
    for (let c of list) {
      const d = Math.hypot(c.x - self.x, c.z - self.z);
      if (d < 6.0 && Math.abs(c.speed) > 5.0) {
        return c;
      }
    }
    return null;
  }

  findClosestItem(self, items) {
    if (!items || items.length === 0) return null;
    let closest = null;
    let minDist = 9999;
    for (let it of items) {
      if (it.collected) continue;
      const d = Math.hypot(it.x - self.x, it.z - self.z);
      if (d < minDist) {
        minDist = d;
        closest = it;
      }
    }
    return closest;
  }
}

window.AIManager = AIManager;


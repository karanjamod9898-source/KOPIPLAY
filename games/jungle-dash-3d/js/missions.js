/**
 * Jungle Dash 3D - Missions & Progression Manager
 * Tracks mission objectives, daily explorer goals, gems, coins, and high scores with local storage.
 */
class MissionManager {
  static get DEFAULT_MISSIONS() {
    return [
      { id: 'm_coins_75', title: 'Coin Seeker', desc: 'Collect 75 gold coins in a single run', target: 75, type: 'coins', rewardCoins: 120, rewardGems: 1, progress: 0, completed: false, claimed: false },
      { id: 'm_dist_500', title: 'Trail Blazer', desc: 'Reach a distance of 500 meters', target: 500, type: 'distance', rewardCoins: 150, rewardGems: 2, progress: 0, completed: false, claimed: false },
      { id: 'm_jump_10', title: 'Agile Leap', desc: 'Jump over 8 fallen obstacles', target: 8, type: 'jumps', rewardCoins: 180, rewardGems: 2, progress: 0, completed: false, claimed: false },
      { id: 'm_power_3', title: 'Artifact Power', desc: 'Collect 3 mystical power-ups', target: 3, type: 'powerups', rewardCoins: 220, rewardGems: 3, progress: 0, completed: false, claimed: false },
      { id: 'm_score_3000', title: 'Legendary Sprint', desc: 'Achieve a score of 3,000 points', target: 3000, type: 'score', rewardCoins: 300, rewardGems: 5, progress: 0, completed: false, claimed: false }
    ];
  }

  constructor() {
    this.initData();
  }

  initData() {
    this.totalCoins = parseInt(localStorage.getItem('jd3d_total_coins') || '200', 10);
    this.totalGems = parseInt(localStorage.getItem('jd3d_total_gems') || '10', 10);
    this.highScore = parseInt(localStorage.getItem('jd3d_high_score') || '0', 10);
    this.maxDistance = parseInt(localStorage.getItem('jd3d_max_distance') || '0', 10);
    this.unlockedWorlds = JSON.parse(localStorage.getItem('jd3d_unlocked_worlds') || '[0]');
    this.selectedSkinId = localStorage.getItem('jd3d_selected_skin') || 'classic_explorer';
    this.unlockedSkins = JSON.parse(localStorage.getItem('jd3d_unlocked_skins') || '["classic_explorer"]');

    const savedMissions = localStorage.getItem('jd3d_missions');
    if (savedMissions) {
      this.missions = JSON.parse(savedMissions);
    } else {
      this.missions = JSON.parse(JSON.stringify(MissionManager.DEFAULT_MISSIONS));
    }
  }

  saveData() {
    localStorage.setItem('jd3d_total_coins', this.totalCoins);
    localStorage.setItem('jd3d_total_gems', this.totalGems);
    localStorage.setItem('jd3d_high_score', this.highScore);
    localStorage.setItem('jd3d_max_distance', this.maxDistance);
    localStorage.setItem('jd3d_unlocked_worlds', JSON.stringify(this.unlockedWorlds));
    localStorage.setItem('jd3d_selected_skin', this.selectedSkinId);
    localStorage.setItem('jd3d_unlocked_skins', JSON.stringify(this.unlockedSkins));
    localStorage.setItem('jd3d_missions', JSON.stringify(this.missions));
  }

  addCoins(amount) {
    this.totalCoins += amount;
    this.saveData();
    return this.totalCoins;
  }

  addGems(amount) {
    this.totalGems += amount;
    this.saveData();
    return this.totalGems;
  }

  updateRunRecord(score, distance) {
    let newRecord = false;
    if (score > this.highScore) {
      this.highScore = Math.floor(score);
      newRecord = true;
    }
    if (distance > this.maxDistance) {
      this.maxDistance = Math.floor(distance);
    }
    this.saveData();
    return newRecord;
  }

  checkRunProgress(runStats) {
    this.missions.forEach(m => {
      if (m.completed) return;
      if (m.type === 'coins' && runStats.coins >= m.target) m.completed = true;
      if (m.type === 'distance' && runStats.distance >= m.target) m.completed = true;
      if (m.type === 'jumps' && runStats.jumps >= m.target) m.completed = true;
      if (m.type === 'powerups' && runStats.powerups >= m.target) m.completed = true;
      if (m.type === 'score' && runStats.score >= m.target) m.completed = true;
    });
    this.saveData();
  }

  claimReward(missionId) {
    const m = this.missions.find(x => x.id === missionId);
    if (m && m.completed && !m.claimed) {
      m.claimed = true;
      this.addCoins(m.rewardCoins);
      this.addGems(m.rewardGems);
      this.saveData();
      return { success: true, coins: m.rewardCoins, gems: m.rewardGems };
    }
    return { success: false };
  }
}

window.MissionManager = MissionManager;


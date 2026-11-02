const fs = require('fs');

let readme = fs.readFileSync('README.md', 'utf8');

const targetSection = `### 🕹️ 1. Active 187-Game Catalog (Zero Fake Cards)
The platform includes **187 verified, playable games** across 22 categories:
- **7 First-Party In-House Games (Proprietary IP):**
  - **Neon Horizon: Cyber Racer** (\`neon-racer-02\` / Car): 3D Synthwave highway racer with particle traffic, nitro turbo, and procedural Web Audio SFX.
  - **Space Nebula Defender** (\`space-def-03\` / Action): Retro arcade space shooter with alien formations, boss waves, and blasters.
  - **Pulse 2048: Cyber Edition** (\`pulse-2048-04\` / Puzzle): Kinetic sliding number puzzle with swipe gestures and score saving.
  - **Cyber Snake: Neon Overdrive** (\`cyber-snake-05\` / Arcade): Particle serpent score-chaser with time-warp mechanics.
  - **Neon Breaker DX** (\`neon-breakout-06\` / Arcade): Holographic brick-breaker with multi-ball physics and paddle deflection.
  - **Hyper Hoops: Street Dunk** (\`hyper-hoops-07\` / Sports): Physics timing basketball game with combo streaks and net swish effects.
  - **Chrono Dungeon: Crystal Quest** (\`dungeon-quest-08\` / Adventure): Procedural top-down dungeon crawler with crystal collection and combat.
- **180 Third-Party Syndicated Embeds:**
  - **121 Games via HTMLGames (Zygomatic B.V.):** Puzzles, card games, mahjong, and solitaire under official webmaster syndication.
  - **47 Games via GameDistribution (Azerion B.V.):** High-production 3D action, racing, and casual games via official GUID players.
  - **12 Games via GameMonetize Inc.:** WebGL driving, casual, and puzzle games via official HTML5 players.

---

## ⚖️ Commercial Sale, Licensing & Handover Disclosure

> [!IMPORTANT]
> **LEGAL NOTICE FOR WEBSITE ACQUISITION & HANDOVER:**
> 1. **What is Included in the Sale:**
>    - 100% full ownership of the website platform software, frontend source code, client-side router, and responsive design system.
>    - 100% full intellectual property ownership and source code of the **7 proprietary in-house games** in \`games/\`.
>    - Configuration and integration data for all 187 catalog games.
> 2. **What is Excluded from the Sale:**
>    - Intellectual property, copyrights, and trademarks of the 180 third-party syndicated games (owned by their respective developers and distribution networks).
>    - The seller's personal advertising and publisher monetization accounts.
> 3. **Mandatory Buyer Setup After Purchase:**
>    - **Custom Domain:** Connect your own domain and rebuild the sitemap (\`SITE_URL=https://yourdomain.com node scripts/build-sitemap.js\`).
>    - **Publisher Accounts:** Register your own publisher accounts at [GameDistribution](https://publisher.gamedistribution.com) and [GameMonetize](https://gamemonetize.com) to receive ad revenue.
>    - **Domain Whitelisting:** Submit your domain for approval in GameDistribution and GameMonetize dashboards.
>    - **Root ads.txt:** Deploy your consolidated \`ads.txt\` containing Zygomatic, GameDistribution, and GameMonetize publisher entries.
>    - **GDPR / CMP:** Deploy an IAB TCF 2.2 compliant Consent Management Platform for European visitors.`;

readme = readme.replace(/### 🕹️ 1\. Real Playable Games Catalog[\s\S]*?(?=### 🎨 2\. Premium Cyber Dark)/, targetSection + '\n\n');

fs.writeFileSync('README.md', readme, 'utf8');
console.log('README.md successfully updated with commercial sale & licensing disclosure.');


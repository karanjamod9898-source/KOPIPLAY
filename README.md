# 🎮 KopiPlay - Modern Online Browser Gaming Portal

![KopiPlay Platform](assets/images/logo.svg)

KopiPlay is a complete, modern, responsive online browser gaming platform built with native web technologies. Similar in functionality to CrazyGames and GameDistribution, it features original branding, a cyber-dark glassmorphic UI, real playable HTML5 games, categorized catalog search, and browser-local favorites and history.

---

## ✨ Features & Architecture

### 🕹️ 1. Active 187-Game Catalog (Zero Fake Cards)
The platform includes **187 verified, playable games** across 22 categories:
- **7 First-Party In-House Games (Proprietary IP):**
  - **Neon Horizon: Cyber Racer** (`neon-racer-02` / Car): 3D Synthwave highway racer with particle traffic, nitro turbo, and procedural Web Audio SFX.
  - **Space Nebula Defender** (`space-def-03` / Action): Retro arcade space shooter with alien formations, boss waves, and blasters.
  - **Pulse 2048: Cyber Edition** (`pulse-2048-04` / Puzzle): Kinetic sliding number puzzle with swipe gestures and score saving.
  - **Cyber Snake: Neon Overdrive** (`cyber-snake-05` / Arcade): Particle serpent score-chaser with time-warp mechanics.
  - **Neon Breaker DX** (`neon-breakout-06` / Arcade): Holographic brick-breaker with multi-ball physics and paddle deflection.
  - **Hyper Hoops: Street Dunk** (`hyper-hoops-07` / Sports): Physics timing basketball game with combo streaks and net swish effects.
  - **Chrono Dungeon: Crystal Quest** (`dungeon-quest-08` / Adventure): Procedural top-down dungeon crawler with crystal collection and combat.
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
>    - 100% full intellectual property ownership and source code of the **7 proprietary in-house games** in `games/`.
>    - Configuration and integration data for all 187 catalog games.
> 2. **What is Excluded from the Sale:**
>    - Intellectual property, copyrights, and trademarks of the 180 third-party syndicated games (owned by their respective developers and distribution networks).
>    - The seller's personal advertising and publisher monetization accounts.
> 3. **Mandatory Buyer Setup After Purchase:**
>    - **Custom Domain:** Connect your own domain and rebuild the sitemap (`SITE_URL=https://yourdomain.com node scripts/build-sitemap.js`).
>    - **Publisher Accounts:** Register your own publisher accounts at [GameDistribution](https://publisher.gamedistribution.com) and [GameMonetize](https://gamemonetize.com) to receive ad revenue.
>    - **Domain Whitelisting:** Submit your domain for approval in GameDistribution and GameMonetize dashboards.
>    - **Root ads.txt:** Deploy your consolidated `ads.txt` containing Zygomatic, GameDistribution, and GameMonetize publisher entries.
>    - **GDPR / CMP:** Deploy an IAB TCF 2.2 compliant Consent Management Platform for European visitors.

### 🎨 2. Premium Cyber Dark Aesthetics & Genuine Metadata
- Removed all artificial demo ratings (e.g., fake 4.9 stars) and fake play counts (e.g., 1.4M plays).
- Implemented genuine metadata pills: Engine / Tech badge (`WebGL 3D`, `HTML5 Canvas`) and Genre tags.
- Deep obsidian backdrop with vivid electric cyan (`#00f0ff`) and cyber violet (`#8a2be2`) accents.
- Modern typography via Google Fonts (`Outfit` and `Inter`).
- Frosted glassmorphism with dynamic backdrop blur.
- High-resolution SVG thumbnails and custom vector logos for sharp display on 4K & Retina screens.
- Smooth CSS transitions and micro-animations.

### 🔍 3. Real-Time Search & Category Filters
- Live search bar with instant autocomplete dropdown, keyword highlights, and thumbnail previews.
- Dedicated search results view with genre filter tags and query refinement.
- Category pages with sorting (Most Popular, Highest Rated, Newest, A-Z) and sub-filters.

### 📺 4. Dedicated Responsive Game Player
- Seamless 16:9 iframe responsive viewport.
- HTML5 Fullscreen API toggle.
- Theater Mode (full-width expand).
- Loading indicator with animated progress feedback.
- Graceful error states and one-click retry button.
- Support for unconfigured demo games with informative preview banners instead of broken players.
- Interactive keyboard visual keycaps (e.g. `[W]`, `[A]`, `[S]`, `[D]`, `[Space]`).
- Quick Share button (copies direct game URL with toast notification).

### 💾 5. Zero-Friction Local Storage Features
- **Favorites**: One-click heart bookmarking saved across sessions in `localStorage`.
- **Recently Played**: Automatically captures game history and displays a "Jump Back In" shelf.
- No forced account registration required for users.

### 💰 6. Clean Monetization Architecture
- Reserved IAB ad banner slots:
  - `728 × 90` Leaderboard placements (below hero and above footer).
  - `300 × 250` Medium Rectangle placement in the game detail sidebar.
  - Clearly separated from game mechanics and ready for approved ad network integration (Google AdSense, GameDistribution, or Adinplay).

---

## 📂 Project Structure

```
c:\online game\
├── index.html                  # Root HTML5 document with SEO & OpenGraph tags
├── robots.txt                  # Search engine crawler permissions
├── sitemap.xml                 # XML Sitemap for indexing
├── README.md                   # Full documentation & deployment guide
├── HOW_TO_ADD_GAMES.md         # Step-by-step game catalog editing guide
├── css/
│   ├── main.css                # Design system tokens, variables, and typography
│   ├── components.css          # Header, hero, search, cards, ad slots, footer
│   ├── player.css              # Game player, fullscreen, theater mode, keycaps
│   └── responsive.css          # Mobile drawer and responsive breakpoints
├── js/
│   ├── app.js                  # Application bootstrap & client-side hash router
│   ├── state.js                # LocalStorage favorites & recently played manager
│   ├── api.js                  # Data query layer for games and categories
│   ├── components/
│   │   ├── header.js           # Header with live search & mobile drawer
│   │   ├── footer.js           # Navigation links and disclaimer
│   │   ├── gameCard.js         # Card component with fallback image handling
│   │   ├── hero.js             # Featured game hero banner
│   │   ├── adSlot.js           # Monetization ad slot component
│   │   └── toast.js            # User notification toast
│   └── views/
│       ├── homeView.js         # Homepage sections and genre grids
│       ├── gameView.js         # Individual game detail and player
│       ├── categoryView.js     # Category listings with filters and sorting
│       ├── allGamesView.js     # All games catalog
│       ├── favoritesView.js    # User bookmarked favorites
│       ├── searchView.js       # Search results page
│       ├── staticViews.js      # About, Contact, Privacy, Terms
│       └── notFoundView.js     # Custom 404 page
├── data/
│   ├── games.json              # Central game records catalog
│   └── categories.json         # Category definitions
├── assets/
│   └── images/
│       ├── logo.svg            # KopiPlay brand logo
│       ├── favicon.svg         # Platform favicon
│       └── games/              # 12+ high-res SVG game thumbnails & fallbacks
└── games/
    ├── neon-racer/             # Playable 3D highway racer
    ├── space-defender/         # Playable arcade space defender
    ├── pulse-2048/             # Playable 2048 cyber puzzle
    ├── cyber-snake/            # Playable neon snake
    └── neon-breakout/          # Playable breakout DX
```

---

## 💻 Running the Portal Locally

Because the project uses standard ES Modules (`type="module"`), it should be served via an HTTP server (rather than `file:///`) to allow local JSON fetching and module imports.

### Option 1: VS Code / Cursor Live Server (Simplest)
1. Install the **Live Server** extension.
2. Right click `index.html` and click **"Open with Live Server"**.

### Option 2: Python (Preinstalled on most systems)
```bash
# In the project directory:
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your web browser.

### Option 3: Node / npx (Zero install)
```bash
npx serve .
# or
npx http-server .
```

### Option 4: PHP
```bash
php -S localhost:8000
```

---

## 🚀 Free Static Hosting Deployment Guide

KopiPlay is 100% static and requires **no paid backend services**. You can host it free of charge on any modern static host:

### 1. GitHub Pages (Free)
1. Initialize git and push to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial KopiPlay release"
   git remote add origin https://github.com/YOUR_USERNAME/kopiplay.git
   git push -u origin main
   ```
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch** and choose `main` / `/ (root)`.
4. Click **Save**. Your site is live at `https://YOUR_USERNAME.github.io/kopiplay/`!

### 2. Netlify (Free)
1. Drag and drop the `online game` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Or connect your Git repository; leave the build command blank and publish directory as `.`.

### 3. Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel` or import the GitHub repo on [vercel.com](https://vercel.com).
2. Set Framework Preset: **Other** and root directory to `./`.
3. Deploy!

### 4. Cloudflare Pages (Free)
1. Connect your repository on the Cloudflare dashboard.
2. Select **None** as build preset and deploy.

---

## 📈 Monetization Setup (AdSense / GameDistribution)

When you are ready to monetize:
1. Obtain approval from your preferred ad network (e.g. Google AdSense, GameDistribution, or Adinplay).
2. Open `js/components/adSlot.js`.
3. Replace the placeholder markup inside `renderAdSlot()` with your network's ad snippet (or script tag).
4. All ad placements across the homepage, game sidebar, and catalog will immediately render live ads.

---

## 🛡️ License & Game Publishing Compliance
All games bundled in `games/` are self-contained HTML5 applications provided under open licenses. 

### 🔑 GameDistribution Publisher Authorization:
For third-party network games such as **Epic Racing: Descent on Cars**:
1. Sign up for a free publisher account on [GameDistribution.com](https://gamedistribution.com/publishers).
2. Go to your **Publisher Dashboard** > **My Websites** > **Add Website**.
3. Register the production domain where you deploy KopiPlay (e.g. `https://your-domain.com` or `https://username.github.io`).
4. Once verified, GameDistribution authorizes ad delivery and revenue sharing through your registered domain.
5. In `data/games.json`, you can customize the game entry's `embedUrl` with your publisher zone config parameters if provided by your account manager.

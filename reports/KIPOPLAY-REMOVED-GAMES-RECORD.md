# KipoPlay – Record of Removed Games (Copyright & Authorization Clearance)

**Date of Removal:** October 31, 2026  
**Catalog Status:** Exactly 5 Games Permanently Removed from Active Web Portal  
**Active Catalog Count Post-Removal:** **195 Games** across 22 Categories  
**Objective:** Immediate elimination of third-party intellectual property infringement risks and unverified community mirrors prior to public launch.

---

## 1. Summary of Removed Games

The following 5 titles have been completely expunged from the active game catalog, homepage shelves, category listings, search index, and XML sitemaps:

| # | Game Title | Unique Game ID | Previous Embed / Source URL | Identified True IP Owner / Original Creator | Removal Justification & Legal Risk Tier |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | **Subway Winter Vacation** | `subway-winter-vacation-11` | `https://lolygames.github.io/subway-surfers-winter-holiday/` | **SYBO Games ApS** (Copenhagen, Denmark) / Poki B.V. | **HIGH RISK – UNAUTHORIZED PIRATED SCRAPE.** Code inspection revealed `/cloak.js` (school evasion script) and mocked Poki SDK (`pokiSdkDebug: false`). Illegally scraped from Poki's exclusive SYBO Games *Subway Surfers* release. |
| **2** | **Level Devil** | `level-devil-03` | `https://lolygames.github.io/level-devil/` | **Unept** (Indie Developer) | **UNAUTHORIZED MIRROR.** Independent intellectual property created by Unept, syndicated officially via Poki/CrazyGames. The GitHub Pages deployment is an unverified third-party mirror without commercial clearance. |
| **3** | **Pool Club** | `pool-club-15` | `https://lolygames.github.io/pool-club/` | **Ravalmatic** (Barcelona, Spain) | **UNAUTHORIZED COMMERCIAL IP MIRROR.** Proprietary B2B game developed by Ravalmatic. Ravalmatic sells commercial licenses and licenses via GameDistribution. The `lolygames.github.io` build is an unauthorized community mirror. |
| **4** | **Monster Truck** | `monster-truck-06` | `https://monstertracks-online.github.io/file/` | **Martin Magni / Fancade** | **UNAUTHORIZED FANCADE MIRROR.** Standalone GitHub Pages re-host of Martin Magni's *Monster Tracks* without formal commercial distribution clearance. |
| **5** | **Arrow Escape – Tap Puzzle** | `arrow-escape-tap-puzzle-01` | `https://arrow-escape-tap-puzzle.vercel.app/` | **Anonymous Web Developer** | **UNVERIFIED OPEN WEB DEPLOYMENT.** Hosted on personal Vercel deployment with zero developer identity, copyright notice, or licensing terms. |

---

## 2. Technical Removal Scope & System Changes

1. **Catalog Data Expunged:**
   - Removed all 5 records from `data/games.json` (Count: 200 $\rightarrow$ 195).
   - Removed all 5 records from `data/catalogData.js` (`window.KIPO_CATALOG` and `window.NEXUS_CATALOG`).
2. **Dynamic UI & Count Alignment:**
   - Active game counts across all components updated to reflect the exact 195 verified games.
   - Sidebar badge, hero stats, and catalog shelves automatically derive from `catalog.length`.
3. **Route & Player Inaccessibility:**
   - Direct navigation to any of the 5 removed slugs (e.g. `#/game/subway-winter-vacation`, `#/game/level-devil`, `#/game/pool-club`, `#/game/monster-truck`, `#/game/arrow-escape-tap-puzzle`) triggers the native **Game Not Found** view with zero iframe embed loading.
4. **Search & Shelf Indexing:**
   - Instant search queries for "subway", "level devil", "pool club", "monster truck", or "arrow escape" return zero results.
5. **SEO & Sitemaps:**
   - Rebuilt `sitemap.xml`: all 5 URLs purged. Remaining clean URL count: 228 (11 static pages, 22 categories, 195 playable games).
   - `robots.txt` points cleanly to the updated sitemap.

---

## 3. Preservation of Historical Audit Logs

Pre-existing audit reports in `reports/` (`NEXUSPLAY-GAME-AUDIT.*` and `NEXUSPLAY-GAME-OWNERSHIP-AUDIT.*`) are preserved for historical reference and documentation of the audit process. The active website is now 100% free of these 5 copyright-risk games.


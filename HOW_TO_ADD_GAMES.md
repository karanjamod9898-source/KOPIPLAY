# 🎮 NexusPlay - How to Add & Manage Games Guide

This guide explains how to easily add, modify, or publish games in your NexusPlay catalog.

---

## 📁 1. Catalog File Location

All games on the portal are defined in a single, organized JSON catalog:
```
data/games.json
```
Categories are defined in:
```
data/categories.json
```

---

## 📝 2. Game Record Schema & Fields

Each entry in `data/games.json` uses the following structure:

```json
{
  "id": "epic-racing-01",
  "title": "Epic Racing: Descent on Cars",
  "slug": "epic-racing-descent-on-cars",
  "category": "Racing",
  "engine": "WebGL 3D",
  "thumbnail": "https://img.gamedistribution.com/2541c94a787f4c58b94636a38c3aa060-512x384.jpg",
  "description": "Experience thrilling downhill 3D car physics, high-speed descents, ramp jumps, and dynamic obstacle destruction.",
  "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/...",
  "embedAllowed": true,
  "controls": "WASD or Arrow Keys to steer and accelerate, Space for Handbrake, R to reset car",
  "featured": true,
  "popular": true,
  "badge": "FEATURED",
  "tags": ["Racing", "3D", "Cars", "Physics", "Destruction", "WebGL"],
  "developer": "Mirra Games",
  "instructions": "Accelerate down the mountain road, take massive ramp leaps, dodge obstacles, and reach the finish line."
}
```

### Field Definitions:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Yes** | Unique identifier (e.g. `space-002`, `neon-racer-01`). Used for local storage bookmarks and recent history. |
| `title` | `string` | **Yes** | Full public game title displayed across cards and game detail page. |
| `slug` | `string` | **Yes** | URL-friendly slug used in the route `#/game/<slug>`. Use lowercase letters and hyphens. |
| `category` | `string` | **Yes** | Must match one of the categories: `Action`, `Racing`, `Puzzle`, `Arcade`, `Adventure`, `Strategy`, or `Sports`. |
| `thumbnail` | `string` | **Yes** | Relative path to thumbnail image (e.g. `assets/images/games/my-game.svg` or `.png`/`.jpg`). A fallback is automatically shown if unavailable. |
| `description` | `string` | **Yes** | 1-3 sentences describing the game, lore, and gameplay. |
| `gameUrl` | `string` | Optional | The source URL or local path to the playable HTML5 entry file (e.g. `games/my-game/index.html` or an authorized embed URL). |
| `embedAllowed`| `boolean` | **Yes** | Set to `true` if iframe embedding is authorized and working. Set to `false` if it is a demo or preview. |
| `controls` | `string` | **Yes** | Guide describing how to play. Keys mentioned (e.g. `WASD`, `Space`, `Arrow Keys`) automatically render as keyboard badges! |
| `featured` | `boolean` | Optional | Set to `true` to make this game eligible for the homepage Hero section. |
| `popular` | `boolean` | Optional | Set to `true` to list the game in the "Popular Games" section. |
| `rating` | `number` | Optional | Rating from `1.0` to `5.0`. Displayed on cards and search results. |
| `plays` | `string` | Optional | Player counter string (e.g. `450K`, `1.2M`). |
| `releaseDate` | `string` | Optional | `YYYY-MM-DD` release date format. Used for the "New Releases" sort. |
| `badge` | `string` | Optional | Card ribbon badge: `"HOT"`, `"NEW"`, `"TOP"`, `"DEMO"`, or `"TRENDING"`. |
| `tags` | `array` | Optional | Keyword list for search filtering (e.g. `["Space", "Shooter", "Retro"]`). |
| `developer` | `string` | Optional | Studio or author name. |
| `instructions`| `string` | Optional | In-depth gameplay rules and tips displayed under the player. |

---

## 🚀 3. Adding a New Self-Hosted HTML5 Game (Step-by-Step)

1. **Create game folder:**
   Create a new directory in `games/` (e.g. `games/retro-invaders/`).
2. **Place game files:**
   Place your `index.html`, scripts, and assets in `games/retro-invaders/`.
3. **Add thumbnail:**
   Place a 16:9 thumbnail (recommended 400x250) in `assets/images/games/retro-invaders.png` (or `.svg`).
4. **Append entry to `data/games.json`:**
   ```json
   {
     "id": "retro-invaders-13",
     "title": "Retro Invaders",
     "slug": "retro-invaders",
     "category": "Action",
     "thumbnail": "assets/images/games/retro-invaders.png",
     "description": "Defend the planet against 8-bit invaders!",
     "gameUrl": "games/retro-invaders/index.html",
     "embedAllowed": true,
     "controls": "Arrow keys to steer. Space to fire cannons.",
     "featured": false,
     "popular": true,
     "rating": 4.8,
     "plays": "120K",
     "releaseDate": "2026-10-29",
     "badge": "NEW",
     "tags": ["Action", "Arcade", "Retro", "Space"]
   }
   ```
5. **Save the file:** The website updates immediately—no rebuild required!

---

## 🌐 4. Adding an Authorized Third-Party Embed Game

To integrate an official distributor (e.g. GameDistribution, Gamedistribution embed link, or a publisher you have an agreement with):

1. Confirm that embedding is permitted by the publisher and does not send `X-Frame-Options: DENY` or restrictive CSP headers.
2. Set `"gameUrl"` to the HTTPS embed link:
   ```json
   "gameUrl": "https://html5.gamedistribution.com/YOUR_GAME_ID/",
   "embedAllowed": true
   ```
3. Set `"embedAllowed": true`.
4. If a title is pending approval or publisher licensing, keep `"embedAllowed": false` and `"badge": "DEMO"` so users see a helpful educational notice instead of a broken player.

---

## 🎨 5. Creating New Categories

To add a new category (e.g., "Horror" or "Multiplayer"):
Open `data/categories.json` and add:
```json
{
  "id": "multiplayer",
  "name": "Multiplayer",
  "slug": "multiplayer",
  "icon": "👥",
  "description": "Compete with or cooperate against players worldwide in real-time.",
  "color": "#00f0ff"
}
```
It will automatically appear in the navigation dropdown, mobile menu, and homepage chips!

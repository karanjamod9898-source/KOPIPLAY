/**
 * NEXUSPLAY - Standalone Self-Contained Bundle
 * Premium Design System with Custom Vector SVG Icons & 72 Verified Playable Games
 * Zero-dependency, works seamlessly on BOTH file:/// and HTTP/HTTPS
 */
(function() {
  'use strict';

  // --- CATALOG DATA ---
  const categoriesData = [
  {
    "id": "pool",
    "name": "Pool",
    "slug": "pool",
    "icon": "🎱",
    "description": "Classic 8-ball pool, billiards, and cue trick shots.",
    "color": "#10b981"
  },
  {
    "id": "action",
    "name": "Action",
    "slug": "action",
    "icon": "⚔️",
    "description": "Fast-paced adrenaline-pumping action games, combat, and reflex battles.",
    "color": "#ef4444"
  },
  {
    "id": "adventure",
    "name": "Adventure",
    "slug": "adventure",
    "icon": "🗺️",
    "description": "Explore dungeon labyrinths, collect crystals, and solve quests.",
    "color": "#f59e0b"
  },
  {
    "id": "beauty",
    "name": "Beauty",
    "slug": "beauty",
    "icon": "💄",
    "description": "Dress-up, makeover, and fashion styling games.",
    "color": "#ec4899"
  },
  {
    "id": "racing",
    "name": "Car",
    "slug": "racing",
    "icon": "🏎️",
    "description": "High-speed 3D car racing, drift stunts, and highway drives.",
    "color": "#2563eb"
  },
  {
    "id": "puzzle",
    "name": "Puzzle",
    "slug": "puzzle",
    "icon": "🧩",
    "description": "Brain teasers, logic challenges, and sliding arrow puzzles.",
    "color": "#8b5cf6"
  },
  {
    "id": "casual",
    "name": "Casual",
    "slug": "casual",
    "icon": "🎯",
    "description": "Relaxing, instant-play casual games for quick fun.",
    "color": "#06b6d4"
  },
  {
    "id": "board",
    "name": "Board",
    "slug": "board",
    "icon": "🎲",
    "description": "Tabletop games, chess, ludo, and strategy board classics.",
    "color": "#d97706"
  },
  {
    "id": "sports",
    "name": "Sports",
    "slug": "sports",
    "icon": "🏀",
    "description": "Arcade basketball shootouts, soccer, and athletic physics fun.",
    "color": "#f97316"
  },
  {
    "id": "arcade",
    "name": "Arcade",
    "slug": "arcade",
    "icon": "🕹️",
    "description": "Classic retro arcade games, neon brick breakers, and snake runners.",
    "color": "#10b981"
  }
];
  const gamesData = [
  {
    "id": "arrow-escape-tap-puzzle-01",
    "title": "Arrow Escape - Tap Puzzle",
    "slug": "arrow-escape-tap-puzzle",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1786543059984-854678763.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1786543059987-655712358.webp",
    "description": "Arrow Escape - Tap Puzzle is a fun and challenging online puzzle game where your goal is simple: clear every arrow from the board . But there’s a catch: each arrow can only move in the direction it points.",
    "gameUrl": "https://arrow-escape-tap-puzzle.vercel.app/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Arrow game",
      "Arrow puzzle",
      "Arrows",
      "Arrow escape",
      "puzzle game",
      "board game",
      "Board"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Arrow Escape - Tap Puzzle is a fun and challenging online puzzle game where your goal is simple: clear every arrow from the board . But there’s a catch: each arrow can only move in the direction it points. Think carefully, choose the right arrows, and plan your moves before tapping. One wrong move c",
    "releaseDate": "2026-08-12",
    "isAuthorized": true
  },
  {
    "id": "angry-heroes-02",
    "title": "Angry Heroes",
    "slug": "angry-heroes",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1785505145177-91770557.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1785505145183-482353934.webp",
    "description": "Angry Heroes is an exciting and entertaining physics-based shooting game that challenges your aiming skills, timing, strategy, and problem-solving abilities. If you enjoy online physics games, shooting games, puzzle games, slingshot games, and browser games , Angry Heroes offers a fun gaming experience that is easy to learn but challenging to master.",
    "gameUrl": "https://html5.gamedistribution.com/d628d0c891494139b9f04f556caf23b0/?gd_sdk_referrer_url=https://www.example.com/games/{game-path}",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Angry Heroes is an exciting and entertaining physics-based shooting game that challenges your aiming skills, timing, strategy, and problem-solving abilities. If you enjoy online physics games, shooting games, puzzle games, slingshot games, and browser games , Angry Heroes offers a fun gaming experie",
    "releaseDate": "2026-07-31",
    "isAuthorized": true
  },
  {
    "id": "level-devil-03",
    "title": "Level Devil",
    "slug": "level-devil",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1771590230459-3770848.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1771590230460-297673533.webp",
    "description": "Welcome to Level Devil , a funny, challenging, and unpredictable 2D platformer game where nothing is ever quite what it seems. If you enjoy platformer games, arcade games, retro games, puzzle games, and challenging online games , Level Devil delivers a unique experience filled with unexpected traps, surprising obstacles, and hilarious moments.",
    "gameUrl": "https://lolygames.github.io/level-devil/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Welcome to Level Devil , a funny, challenging, and unpredictable 2D platformer game where nothing is ever quite what it seems. If you enjoy platformer games, arcade games, retro games, puzzle games, and challenging online games , Level Devil delivers a unique experience filled with unexpected traps,",
    "releaseDate": "2026-02-16",
    "isAuthorized": true
  },
  {
    "id": "rise-up-air-balloon-04",
    "title": "Rise Up Air Balloon",
    "slug": "rise-up-air-balloon",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1786591337262-693595561.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1786591337268-385539736.webp",
    "description": "Rise Up Air Balloon is an exciting and challenging arcade game where your mission is to protect a rising balloon from dangerous obstacles. As the balloon continuously moves upward, you must control a protective shield and use it to clear the path.",
    "gameUrl": "https://games.cdn.famobi.com/html5games/r/rise-up/v010/?fg_domain=play.famobi.com&fg_aid=A1000-10B0B&fg_uid=de20e6f4-fd89-414f-b200-6a20b3ac9378&fg_pid=48fd668a-7711-4ef7-9b1d-723b3af47503&fg_beat=553&original_ref=https%3A%2F%2Fplay.famobi.com%2Fwrapper%2Frise-up%2FA1000-10",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Balloon",
      "Balloon Game",
      "Save Balloon",
      "Protect ballon"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Rise Up Air Balloon is an exciting and challenging arcade game where your mission is to protect a rising balloon from dangerous obstacles. As the balloon continuously moves upward, you must control a protective shield and use it to clear the path. Stay focused, react quickly, and prevent obstacles f",
    "releaseDate": "2026-08-13",
    "isAuthorized": true
  },
  {
    "id": "bubble-fall-05",
    "title": "Bubble Fall",
    "slug": "bubble-fall",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1785503864280-384289029.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1785503864293-34180375.webp",
    "description": "Bubble Fall is an exciting and addictive bubble shooting puzzle game where your goal is to clear the playing field by matching and popping colorful bubbles. Aim carefully, create groups of matching bubbles, trigger powerful chain reactions, and clear every bubble to complete each level.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/82c9d9ae7f6d4ca6b00b36025870d17a/index.html?utm_source=gamedistribution.com&utm_medium=bubble-fall&utm_campaign=block-and-redirect&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2h0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tLzgyYzlkOWFlN2Y2ZDRjYTZiMDBiMzYwMjU4NzBkMTdhLz91dG1fc291cmNlPWdhbWVkaXN0cmlidXRpb24uY29tJnV0bV9tZWRpdW09YnViYmxlLWZhbGwmdXRtX2NhbXBhaWduPWJsb2NrLWFuZC1yZWRpcmVjdCIsInBhcmVudERvbWFpbiI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Bubble Fall is an exciting and addictive bubble shooting puzzle game where your goal is to clear the playing field by matching and popping colorful bubbles. Aim carefully, create groups of matching bubbles, trigger powerful chain reactions, and clear every bubble to complete each level. If you enjoy",
    "releaseDate": "2026-08-04",
    "isAuthorized": true
  },
  {
    "id": "monster-truck-06",
    "title": "Monster Truck",
    "slug": "monster-truck",
    "category": "Car",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1784717555931-80654098.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1784717555947-471391296.webp",
    "description": "Get ready for an exciting off-road driving adventure with Monster Truck , a thrilling racing and driving game where you take control of a powerful monster truck and navigate challenging tracks filled with obstacles. Drive over steep hills, rocks, ramps, uneven terrain, and other difficult obstacles while keeping your truck balanced and reaching the finish line safely.",
    "gameUrl": "https://monstertracks-online.github.io/file/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Car",
      "Monster Truck",
      "Racing",
      "Big car"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Get ready for an exciting off-road driving adventure with Monster Truck , a thrilling racing and driving game where you take control of a powerful monster truck and navigate challenging tracks filled with obstacles. Drive over steep hills, rocks, ramps, uneven terrain, and other difficult obstacles ",
    "releaseDate": "2026-07-22",
    "isAuthorized": true
  },
  {
    "id": "hand-feight-07",
    "title": "Hand Fight",
    "slug": "hand-feight",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/gewpym4ock7fbqj5z6tr-1770954235711-595808181.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/mzkdb5lo8s2g6wwwzzxa-1770954235715-178703027.webp",
    "description": "Hand Fight is a fast-paced and exciting fighting game where you must use your punches, blocks, and quick reactions to defeat your opponent. The game combines simple controls with action-packed battles, making it a fun choice for players who enjoy fighting games, action games, combat games, boxing games, and competitive online games .",
    "gameUrl": "https://html5.gamemonetize.co/485gqzfrbzass7ig99juwrcb73d0286z/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "POPULAR",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Hand Fight is a fast-paced and exciting fighting game where you must use your punches, blocks, and quick reactions to defeat your opponent. The game combines simple controls with action-packed battles, making it a fun choice for players who enjoy fighting games, action games, combat games, boxing ga",
    "releaseDate": "2026-08-04",
    "isAuthorized": true
  },
  {
    "id": "home-island-08",
    "title": "Home Island",
    "slug": "home-island",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770955500620-86718700.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770955500626-563459522.webp",
    "description": "Home Island is a relaxing and entertaining island adventure game where you can create, clean, repair, and decorate your very own beautiful island home. Explore colorful locations, complete simple tasks, restore different areas, and transform an ordinary island into a comfortable and welcoming place.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/da1111d4369f4cb08525d593fe515fa4/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fhome-island%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2hvbWUtaXNsYW5kLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": true,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Home Island is a relaxing and entertaining island adventure game where you can create, clean, repair, and decorate your very own beautiful island home. Explore colorful locations, complete simple tasks, restore different areas, and transform an ordinary island into a comfortable and welcoming place.",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "dream-restaurant-3d-09",
    "title": "Dream Restaurant 3D",
    "slug": "dream-restaurant-3d",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/l0z1f76w546zequlmovx-1770954287896-980508149.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/l0z1f76w546zequlmovx-1770954287898-964703254.webp",
    "description": "Dream Restaurant 3D is an exciting and entertaining restaurant management game where you get to build, manage, and grow your very own restaurant. Take orders from hungry customers, prepare delicious dishes, serve meals, improve your kitchen, and upgrade your restaurant as your business becomes more successful.",
    "gameUrl": "https://html5.gamemonetize.co/0lmv5h0j5tuk9gi94xd8crb2dwfmkqn3/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "POPULAR",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Dream Restaurant 3D is an exciting and entertaining restaurant management game where you get to build, manage, and grow your very own restaurant. Take orders from hungry customers, prepare delicious dishes, serve meals, improve your kitchen, and upgrade your restaurant as your business becomes more ",
    "releaseDate": "2026-02-05",
    "isAuthorized": true
  },
  {
    "id": "counter-war-10",
    "title": "Counter War",
    "slug": "counter-war",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1787123904968-52220234.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1787123904997-464314177.webp",
    "description": "Counter War is an exciting and action-packed combat game where you must face dangerous enemies, aim accurately, react quickly, and survive challenging battlefield encounters. Take control of your player, move through intense battle situations, target approaching enemies, and use smart strategies to overcome every challenge.",
    "gameUrl": "https://assets.actiongameshub.com/games/count-war_v1/game.html",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "War",
      "gun",
      "gun game."
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Counter War is an exciting and action-packed combat game where you must face dangerous enemies, aim accurately, react quickly, and survive challenging battlefield encounters. Take control of your player, move through intense battle situations, target approaching enemies, and use smart strategies to ",
    "releaseDate": "2026-08-19",
    "isAuthorized": true
  },
  {
    "id": "subway-winter-vacation-11",
    "title": "Subway Winter Vacation",
    "slug": "subway-winter-vacation",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/ajrdviummclxosyyis6z-1771236377293-179919321.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/iwewk5juqbyyzerlbvt9-1771236377300-106717162.webp",
    "description": "Subway Winter Vacation is a fun, fast-paced, and exciting endless running game set in a colorful snowy city. Get ready to run through winter-themed subway tracks, avoid trains and obstacles, collect coins, grab useful power-ups, and see how far you can go without crashing.",
    "gameUrl": "https://lolygames.github.io/subway-surfers-winter-holiday/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Subway Winter Vacation is a fun, fast-paced, and exciting endless running game set in a colorful snowy city. Get ready to run through winter-themed subway tracks, avoid trains and obstacles, collect coins, grab useful power-ups, and see how far you can go without crashing. If you enjoy endless runne",
    "releaseDate": "2026-02-16",
    "isAuthorized": true
  },
  {
    "id": "neon-breacks-breaker-12",
    "title": "Neon Breaks Breaker",
    "slug": "neon-breacks-breaker",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770955549699-281341622.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770955549703-460055910.webp",
    "description": "Neon Breaks Breaker is an exciting and addictive arcade game where your goal is to destroy glowing bricks using bouncing balls. Aim carefully, choose the right angle, launch your balls, and try to break as many blocks as possible before they reach the bottom.",
    "gameUrl": "https://html5.gamemonetize.co/4qlzvoyo94nx261mosc65dif1zzearma/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Neon Breaks Breaker is an exciting and addictive arcade game where your goal is to destroy glowing bricks using bouncing balls. Aim carefully, choose the right angle, launch your balls, and try to break as many blocks as possible before they reach the bottom. With bright neon visuals, simple control",
    "releaseDate": "2026-02-06",
    "isAuthorized": true
  },
  {
    "id": "helicopter-battle-13",
    "title": "Helicopter Battle",
    "slug": "helicopter-battle",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770955575557-640075480.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770955575558-210242040.webp",
    "description": "Helicopter Battle is an exciting and fast-paced two-player action game where you take control of a helicopter and compete against an opponent in thrilling aerial battles. Fly through the battlefield, avoid enemy attacks, fire at your opponent, and try to stay in the air longer than your rival.",
    "gameUrl": "https://html5.gamemonetize.co/zlpj0cuc8qtjtptpl8o7t5jqtes478wz/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Helicopter Battle is an exciting and fast-paced two-player action game where you take control of a helicopter and compete against an opponent in thrilling aerial battles. Fly through the battlefield, avoid enemy attacks, fire at your opponent, and try to stay in the air longer than your rival. If yo",
    "releaseDate": "2026-02-06",
    "isAuthorized": true
  },
  {
    "id": "magic-block-puzzle-14",
    "title": "Magic Block Puzzle",
    "slug": "magic-block-puzzle",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/tafy1busokfcppl4jd4u-1770954311568-822295225.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/ykqo7bpscuw7czvxpksm-1770954311574-485214406.webp",
    "description": "Magic Block Puzzle is a relaxing yet challenging block puzzle game that puts your logical thinking, planning, and problem-solving skills to the test. Place different shaped blocks on the grid, complete full rows or columns, clear them from the board, and create more space for new blocks.",
    "gameUrl": "https://html5.gamemonetize.co/3nin4ln4pjt0ae72rcoxq07kekbedyn7/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Magic Block Puzzle is a relaxing yet challenging block puzzle game that puts your logical thinking, planning, and problem-solving skills to the test. Place different shaped blocks on the grid, complete full rows or columns, clear them from the board, and create more space for new blocks. The gamepla",
    "releaseDate": "2026-02-05",
    "isAuthorized": true
  },
  {
    "id": "pool-club-15",
    "title": "Pool Club",
    "slug": "pool-club",
    "category": "Pool",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770975625287-439145493.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770975625289-26432954.webp",
    "description": "Pool Club is an entertaining and engaging online pool game that brings the classic experience of billiards directly to your browser. Take control of the cue stick, carefully aim at the cue ball, adjust your shooting direction, control the power of every shot, and try to pocket the balls with precision.",
    "gameUrl": "https://lolygames.github.io/pool-club/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Pool",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Pool Club is an entertaining and engaging online pool game that brings the classic experience of billiards directly to your browser. Take control of the cue stick, carefully aim at the cue ball, adjust your shooting direction, control the power of every shot, and try to pocket the balls with precisi",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "ludo-kingdom-16",
    "title": "Ludo Kingdom",
    "slug": "ludo-kingdom",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770955975964-685882900.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770955975968-274027427.webp",
    "description": "Ludo Kingdom is an exciting and entertaining online board game based on the classic Ludo experience. Roll the dice, move your tokens around the colorful board, capture your opponents, and try to get all your tokens safely into the home area before your rivals.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/320b65ea8ce34cb7a4537ff63576d976/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fludo-kingdom-online%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2x1ZG8ta2luZ2RvbS1vbmxpbmUvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Ludo Kingdom is an exciting and entertaining online board game based on the classic Ludo experience. Roll the dice, move your tokens around the colorful board, capture your opponents, and try to get all your tokens safely into the home area before your rivals. If you enjoy Ludo games, online board g",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "word-connect-17",
    "title": "Word Connect",
    "slug": "word-connect",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770955995369-850203714.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770955995370-284818579.webp",
    "description": "Word Connect is a relaxing and entertaining word puzzle game that challenges you to connect letters, discover hidden words, and complete exciting levels. Look carefully at the letters on the screen, link them together in the correct order, and find as many meaningful words as possible.",
    "gameUrl": "https://html5.gamemonetize.co/vwtlu5q0rwupfhmjg6cd700sasyucxzm/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Word Connect is a relaxing and entertaining word puzzle game that challenges you to connect letters, discover hidden words, and complete exciting levels. Look carefully at the letters on the screen, link them together in the correct order, and find as many meaningful words as possible. If you enjoy ",
    "releaseDate": "2026-02-06",
    "isAuthorized": true
  },
  {
    "id": "daily-sudoku-18",
    "title": "Daily Sudoku",
    "slug": "daily-sudoku",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956010991-434144605.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956010993-157450590.webp",
    "description": "Daily Sudoku is an engaging and relaxing number puzzle game that gives you a fresh Sudoku challenge to solve every day. Use logic, concentration, and careful planning to fill the grid with numbers from 1 to 9 without repeating a number in any row, column, or 3x3 box.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/dd9701cd84da40699cdc404645f29c1f/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fdaily-sudoku-2%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2RhaWx5LXN1ZG9rdS0yLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Daily Sudoku is an engaging and relaxing number puzzle game that gives you a fresh Sudoku challenge to solve every day. Use logic, concentration, and careful planning to fill the grid with numbers from 1 to 9 without repeating a number in any row, column, or 3x3 box. Sudoku is one of the most popula",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "tic-tac-toe-immanitas-19",
    "title": "Tic Tac Toe Immanitas",
    "slug": "tic-tac-toe-immanitas",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/mcnrfl6nis5flrbefeoo-1770956029242-802724615.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/suqar7ubogyj6y4qmnbv-1770956029248-439477999.webp",
    "description": "Tic Tac Toe Immanitas is a simple, entertaining, and strategic two-player board game where you compete against an opponent by placing X and O marks on a 3x3 grid. The goal is easy to understand: be the first player to place three of your symbols in a straight line.",
    "gameUrl": "https://html5.gamemonetize.games/fourvv1oev39x7013ybw5a1pvrd6af0o/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Tic Tac Toe Immanitas is a simple, entertaining, and strategic two-player board game where you compete against an opponent by placing X and O marks on a 3x3 grid. The goal is easy to understand: be the first player to place three of your symbols in a straight line. You can create a line horizontally",
    "releaseDate": "2026-02-05",
    "isAuthorized": true
  },
  {
    "id": "wood-screw-puzzle-20",
    "title": "Wood & Screw Puzzle",
    "slug": "wood-screw-puzzle",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956196318-360462475.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956196321-82586252.webp",
    "description": "Wood &amp; Screw Puzzle is an engaging and challenging logic puzzle game where you need to remove screws in the correct order to free wooden blocks and clear each puzzle. Carefully examine the structure, understand how the wooden pieces are connected, and decide which screw should be removed first.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/eef2c852d9784065a22a21d51cfdc9fd/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fwood-and-screw-puzzle%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3dvb2QtYW5kLXNjcmV3LXB1enpsZS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Wood &amp; Screw Puzzle is an engaging and challenging logic puzzle game where you need to remove screws in the correct order to free wooden blocks and clear each puzzle. Carefully examine the structure, understand how the wooden pieces are connected, and decide which screw should be removed first. ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "3d-fashion-princess-dress-up-21",
    "title": "3D Fashion Princess - Dress Up",
    "slug": "3d-fashion-princess-dress-up",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956212446-281000299.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956212447-490316991.webp",
    "description": "3D Fashion Princess - Dress Up is a fun and creative fashion game where you can transform a beautiful princess by choosing stylish outfits, hairstyles, shoes, makeup, bags, and accessories. Create unique looks, experiment with different combinations, and discover your own sense of fashion while enjoying an entertaining 3D dress-up experience.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/b4addeae4bfe422f8a324ab5474ca7b5/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Ffashion-princess-dress-up-for-girls%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2Zhc2hpb24tcHJpbmNlc3MtZHJlc3MtdXAtZm9yLWdpcmxzLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "3D Fashion Princess - Dress Up is a fun and creative fashion game where you can transform a beautiful princess by choosing stylish outfits, hairstyles, shoes, makeup, bags, and accessories. Create unique looks, experiment with different combinations, and discover your own sense of fashion while enjo",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "bomber-plane-22",
    "title": "Bomber Plane",
    "slug": "bomber-plane",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956243176-458316935.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956243179-594551522.webp",
    "description": "Bomber Plane is an exciting air combat action game where you take control of a powerful aircraft and complete challenging missions from above. Fly through dangerous environments, attack enemy targets, drop bombs, fire weapons, avoid incoming threats, and protect your aircraft as you work your way through increasingly difficult challenges.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/9da40c9b342846f99339b7c4c8a428b7/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fbomber-plane%3A-2d-air-strike%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2JvbWJlci1wbGFuZTotMmQtYWlyLXN0cmlrZS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Bomber Plane is an exciting air combat action game where you take control of a powerful aircraft and complete challenging missions from above. Fly through dangerous environments, attack enemy targets, drop bombs, fire weapons, avoid incoming threats, and protect your aircraft as you work your way th",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "charger-city-driver-23",
    "title": "Charger City Driver",
    "slug": "charger-city-driver",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956262778-799459164.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956262779-180708382.webp",
    "description": "Charger City Driver is an exciting city driving game that lets you take control of a powerful car and explore busy urban streets. Get behind the wheel, accelerate through wide roads, make sharp turns, avoid crashes, and enjoy the freedom of driving around a virtual city.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/3f0aec385266424bb0529dfcecfe30b4/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fcharger-city-driver%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NoYXJnZXItY2l0eS1kcml2ZXIvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Charger City Driver is an exciting city driving game that lets you take control of a powerful car and explore busy urban streets. Get behind the wheel, accelerate through wide roads, make sharp turns, avoid crashes, and enjoy the freedom of driving around a virtual city. The game is designed for pla",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "crazy-traffic-racer-24",
    "title": "Crazy Traffic Racer",
    "slug": "crazy-traffic-racer",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956298687-821741499.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956298688-293293980.webp",
    "description": "Crazy Traffic Racer is an exciting and fast-paced driving game where you take control of a car and race through busy roads filled with traffic. Your goal is to drive as far as possible while avoiding other vehicles, changing lanes at the right time, and maintaining control as the speed continues to increase.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/d0b8e5ba257d4f888738a7ec722443f1/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fcrazy-traffic-racer-1%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NyYXp5LXRyYWZmaWMtcmFjZXItMS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Crazy Traffic Racer is an exciting and fast-paced driving game where you take control of a car and race through busy roads filled with traffic. Your goal is to drive as far as possible while avoiding other vehicles, changing lanes at the right time, and maintaining control as the speed continues to ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "temple-run-25",
    "title": "Temple Run",
    "slug": "temple-run",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956321018-26203143.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956321019-914987285.webp",
    "description": "Temple Run is a fast-paced and exciting endless running adventure game where you take control of a brave runner and race through dangerous jungle paths. Run as far as possible, avoid obstacles, jump over gaps, slide under barriers, collect coins, and stay ahead as the adventure becomes faster and more challenging.",
    "gameUrl": "https://html5.gamemonetize.co/z8ud3po55n6uhr9d86moe2ur7rzlffs0/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Temple Run is a fast-paced and exciting endless running adventure game where you take control of a brave runner and race through dangerous jungle paths. Run as far as possible, avoid obstacles, jump over gaps, slide under barriers, collect coins, and stay ahead as the adventure becomes faster and mo",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "tank-wars-2-26",
    "title": "Tank Wars 2",
    "slug": "tank-wars-2",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1787134473115-783028416.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1787134473119-607777236.webp",
    "description": "Tank War 2 is an action-packed tank battle game where you take control of a powerful armored tank and enter intense battlefield combat. Your mission is to move across the battlefield, aim your cannon, destroy enemy tanks, avoid incoming attacks, and survive every battle.",
    "gameUrl": "https://html5.gamedistribution.com/659090e00bfc4650899550d63f8a130d/?rd=1",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Tank War 2 is an action-packed tank battle game where you take control of a powerful armored tank and enter intense battlefield combat. Your mission is to move across the battlefield, aim your cannon, destroy enemy tanks, avoid incoming attacks, and survive every battle. The game combines tank comba",
    "releaseDate": "2026-08-19",
    "isAuthorized": true
  },
  {
    "id": "urus-city-driver-27",
    "title": "Urus City Driver",
    "slug": "urus-city-driver",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956359548-726979561.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956359549-190314366.webp",
    "description": "Urus City Driver is an exciting luxury car driving game where you take control of a powerful SUV and explore a lively virtual city. Drive through city streets, follow different roads, make smooth turns, avoid obstacles, discover new locations, and enjoy the freedom of driving at your own pace.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/a328bd1f75004f8b912aa34dc451fb4c/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Furus-city-driver%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3VydXMtY2l0eS1kcml2ZXIvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Urus City Driver is an exciting luxury car driving game where you take control of a powerful SUV and explore a lively virtual city. Drive through city streets, follow different roads, make smooth turns, avoid obstacles, discover new locations, and enjoy the freedom of driving at your own pace. The g",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "mahjong-garden-28",
    "title": "Mahjong Garden",
    "slug": "mahjong-garden",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956375480-150888695.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956375482-914551920.webp",
    "description": "Mahjong Garden is a relaxing and entertaining tile-matching puzzle game that combines classic Mahjong-style gameplay with a beautiful and peaceful garden setting. Your goal is to find matching pairs of identical tiles and remove them from the board until all the tiles have been cleared.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/bf59a11ee422478a82cb29ea23caaa20/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fmahjong-garden%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL21haGpvbmctZ2FyZGVuLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Mahjong Garden is a relaxing and entertaining tile-matching puzzle game that combines classic Mahjong-style gameplay with a beautiful and peaceful garden setting. Your goal is to find matching pairs of identical tiles and remove them from the board until all the tiles have been cleared. The game off",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "snake-master-29",
    "title": "Snake Master",
    "slug": "snake-master",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956396028-886832311.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956396030-511085644.webp",
    "description": "Snake Master is a fun and addictive arcade game inspired by the classic snake gameplay that players have enjoyed for years. Your goal is simple: control the snake, collect food, grow longer, and achieve the highest score possible while avoiding dangerous crashes.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/8d477a23de1743198aca29f1893c6be6/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fsnake-masters%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3NuYWtlLW1hc3RlcnMvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Snake Master is a fun and addictive arcade game inspired by the classic snake gameplay that players have enjoyed for years. Your goal is simple: control the snake, collect food, grow longer, and achieve the highest score possible while avoiding dangerous crashes. As your snake eats more food, its bo",
    "releaseDate": "2026-02-09",
    "isAuthorized": true
  },
  {
    "id": "ludo-world-30",
    "title": "Ludo World",
    "slug": "ludo-world",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956412141-957327600.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956412150-740006341.webp",
    "description": "Ludo World is an exciting and entertaining online board game that brings the classic fun of Ludo to your screen. Roll the dice, move your tokens around the colorful board, capture opponent pieces, and try to bring all your tokens safely into the home area before your rivals.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/d0046c8fd4eb4d4fb2492ba8013909f0/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fludo-world%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2x1ZG8td29ybGQvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Ludo World is an exciting and entertaining online board game that brings the classic fun of Ludo to your screen. Roll the dice, move your tokens around the colorful board, capture opponent pieces, and try to bring all your tokens safely into the home area before your rivals. The game combines luck, ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "farm-merge-harvest-31",
    "title": "Farm: Merge Harvest",
    "slug": "farm-merge-harvest",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956439350-303319342.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956439351-198645329.webp",
    "description": "Farm: Merge Harvest is a relaxing and entertaining farming game that combines classic farm activities with satisfying merge puzzle mechanics. Grow crops, harvest valuable items, combine matching objects, complete farming tasks, and expand your colorful farm as you progress.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/01b4c5438e0c4f17b046a0d1ca94fdae/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Ffarm%3A-merge-harvest%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2Zhcm06LW1lcmdlLWhhcnZlc3QvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Farm: Merge Harvest is a relaxing and entertaining farming game that combines classic farm activities with satisfying merge puzzle mechanics. Grow crops, harvest valuable items, combine matching objects, complete farming tasks, and expand your colorful farm as you progress. The game gives you the op",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "fruit-jam-32",
    "title": "Fruit Jam",
    "slug": "fruit-jam",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956459638-18087828.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956459639-295473697.webp",
    "description": "Fruit Jam is a colorful and entertaining match-3 puzzle game where your goal is to match identical fruits, clear them from the board, and complete different level objectives. With bright visuals, simple controls, and increasingly challenging puzzles, Fruit Jam is perfect for players who enjoy casual games that are easy to learn but difficult to master.",
    "gameUrl": "https://html5.gamemonetize.co/a4rwq4sv7v4yg9atrojx1vj26hwcshud/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Fruit Jam is a colorful and entertaining match-3 puzzle game where your goal is to match identical fruits, clear them from the board, and complete different level objectives. With bright visuals, simple controls, and increasingly challenging puzzles, Fruit Jam is perfect for players who enjoy casual",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "mega-shark-33",
    "title": "Mega Shark",
    "slug": "mega-shark",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956476387-781120818.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956476388-441468321.webp",
    "description": "Mega Shark is an exciting and action-packed shark survival game where you take control of a powerful shark and explore the ocean in search of food. Swim through the underwater world, eat smaller sea creatures, collect targets, grow bigger, and become stronger as you progress.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/9ff4c1c62da64af98d32fe1a1b44ac0a/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fmega-shark%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL21lZ2Etc2hhcmsvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Mega Shark is an exciting and action-packed shark survival game where you take control of a powerful shark and explore the ocean in search of food. Swim through the underwater world, eat smaller sea creatures, collect targets, grow bigger, and become stronger as you progress. The main objective is s",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "fruit-ninja-34",
    "title": "Fruit Ninja",
    "slug": "fruit-ninja",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956495934-854112859.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956495935-415591321.webp",
    "description": "Fruit Ninja is a fast-paced and entertaining fruit slicing arcade game where your goal is to slice as many flying fruits as possible while avoiding dangerous bombs. Test your speed, accuracy, focus, and reflexes as fruits appear on the screen and challenge yourself to achieve the highest score.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/a186dc9ac7f548f884db8ff54df6dd9f/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Ffruit-ninja-2%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2ZydWl0LW5pbmphLTIvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Fruit Ninja is a fast-paced and entertaining fruit slicing arcade game where your goal is to slice as many flying fruits as possible while avoiding dangerous bombs. Test your speed, accuracy, focus, and reflexes as fruits appear on the screen and challenge yourself to achieve the highest score. The ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "the-zombie-house-35",
    "title": "The Zombie House",
    "slug": "the-zombie-house",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956514388-889614010.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956514389-35235787.webp",
    "description": "The Zombie House is an exciting zombie survival game where you must explore a dangerous environment filled with zombies, traps, and unexpected challenges. Your main objective is to stay alive, move carefully through different areas, avoid dangerous situations, and find a safe way out of the zombie-filled house.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/ddc202e7d252451f8d1344f9f0e455ef/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fthe-zombie-house%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3RoZS16b21iaWUtaG91c2UvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "The Zombie House is an exciting zombie survival game where you must explore a dangerous environment filled with zombies, traps, and unexpected challenges. Your main objective is to stay alive, move carefully through different areas, avoid dangerous situations, and find a safe way out of the zombie-f",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "dino-idle-park-36",
    "title": "Dino Idle Park",
    "slug": "dino-idle-park",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956534659-476269559.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956534660-838124332.webp",
    "description": "Dino Idle Park is a fun and relaxing idle management game where you can build and manage your own dinosaur theme park. Start with a small park, create exciting dinosaur areas, attract visitors, collect rewards, and expand your park as you progress.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/e60b6dcfbc1e4027a11abc8dc3959669/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fdino-idle-park%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2Rpbm8taWRsZS1wYXJrLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Dino Idle Park is a fun and relaxing idle management game where you can build and manage your own dinosaur theme park. Start with a small park, create exciting dinosaur areas, attract visitors, collect rewards, and expand your park as you progress. Your goal is to turn a simple dinosaur attraction i",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "marble-blast-37",
    "title": "Marble Blast",
    "slug": "marble-blast",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956548465-878300016.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956548465-661387721.webp",
    "description": "Marble Blast is an exciting marble shooting puzzle game where you must aim, shoot, and match colorful marbles before they reach the end of the path. The game combines fast-paced arcade action with strategic puzzle-solving, making every level a fun challenge.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/685ccaa7326c42be8aa2076801e82acd/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fmarble-blast-2%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL21hcmJsZS1ibGFzdC0yLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Marble Blast is an exciting marble shooting puzzle game where you must aim, shoot, and match colorful marbles before they reach the end of the path. The game combines fast-paced arcade action with strategic puzzle-solving, making every level a fun challenge. Your objective is simple: use the marble ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "pool-diamond-challenge-38",
    "title": "Pool Diamond Challenge",
    "slug": "pool-diamond-challenge",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956571047-413762952.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956571049-147555080.webp",
    "description": "Pool Diamond Challenge is an exciting online pool game that combines classic billiards gameplay with challenging puzzle-style levels. Instead of simply playing a traditional pool match, you must carefully aim your cue, control your shooting power, and plan each move to pocket the balls and complete the level.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/d915f03f46804091933c3be8d17273be/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fbilliard-diamond-challenge%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2JpbGxpYXJkLWRpYW1vbmQtY2hhbGxlbmdlLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Pool Diamond Challenge is an exciting online pool game that combines classic billiards gameplay with challenging puzzle-style levels. Instead of simply playing a traditional pool match, you must carefully aim your cue, control your shooting power, and plan each move to pocket the balls and complete ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "fast-rescue-save-human-39",
    "title": "Fast Rescue - Save Human",
    "slug": "fast-rescue-save-human",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956589123-552503865.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956589124-199671432.webp",
    "description": "Fast Rescue - Save Human is an exciting rescue puzzle game where your aim, timing, and precision are put to the test. Your mission is to rescue people who are hanging from dangerous locations by using a bow and arrow to cut the ropes holding them.",
    "gameUrl": "https://html5.gamemonetize.co/0cf1k8jt1nfk5jy5disal21panmlv6un/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Fast Rescue - Save Human is an exciting rescue puzzle game where your aim, timing, and precision are put to the test. Your mission is to rescue people who are hanging from dangerous locations by using a bow and arrow to cut the ropes holding them. Each level presents a new rescue situation. You need",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "dart-jam-2-40",
    "title": "Dart Jam 2",
    "slug": "dart-jam-2",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956618447-746949161.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956618448-542707128.webp",
    "description": "Dart Jam 2 is a fun and colorful dart puzzle game that combines accurate aiming with satisfying balloon-popping gameplay. Your objective is to throw darts at groups of matching balloons and clear them from the board.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/9addb82d5ce74fb5b2eab726f8524cac/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fdarts-jam%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2RhcnRzLWphbS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Dart Jam 2 is a fun and colorful dart puzzle game that combines accurate aiming with satisfying balloon-popping gameplay. Your objective is to throw darts at groups of matching balloons and clear them from the board. Each level presents a new arrangement of colorful balloons, giving you a fresh chal",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "coffee-cup-fill-blocks-41",
    "title": "Coffee Cup - Fill Blocks",
    "slug": "coffee-cup-fill-blocks",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956645791-402919249.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956645792-802909359.webp",
    "description": "Coffee Cup - Fill Blocks is a relaxing and colorful block puzzle game that combines color matching, logical thinking, and strategic planning. Your goal is to fill the board with the correct colored blocks and guide each coffee cup toward its matching plate.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/0904d5fb5d0044fe9fddf1cd5834cff2/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fcoffee-color-blocks%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NvZmZlZS1jb2xvci1ibG9ja3MvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Coffee Cup - Fill Blocks is a relaxing and colorful block puzzle game that combines color matching, logical thinking, and strategic planning. Your goal is to fill the board with the correct colored blocks and guide each coffee cup toward its matching plate. Each level provides a different layout tha",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "ellie-and-ben-christmas-eve-42",
    "title": "Ellie and Ben Christmas Eve",
    "slug": "ellie-and-ben-christmas-eve",
    "category": "Beauty",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956662527-294703672.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956662531-728910851.webp",
    "description": "Ellie and Ben Christmas Eve is a fun and festive Christmas dress-up game where you get to prepare Ellie and Ben for a special Christmas Eve celebration. Choose beautiful outfits, hairstyles, shoes, and accessories to create stylish holiday looks for both characters.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/d3b2230575e14473823dcb3db1029329/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fellie-and-ben-christmas-eve%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2VsbGllLWFuZC1iZW4tY2hyaXN0bWFzLWV2ZS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Beauty",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Ellie and Ben Christmas Eve is a fun and festive Christmas dress-up game where you get to prepare Ellie and Ben for a special Christmas Eve celebration. Choose beautiful outfits, hairstyles, shoes, and accessories to create stylish holiday looks for both characters. The game combines fashion, makeov",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "halloween-fruit-slice-43",
    "title": "Halloween Fruit Slice",
    "slug": "halloween-fruit-slice",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956677733-146431657.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956677734-140012907.webp",
    "description": "Halloween Fruit Slice is a fast-paced fruit slicing game with a fun and spooky Halloween theme. Your goal is to slice flying fruits and other objects as they appear on the screen while avoiding dangerous items that can end your run.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/754a3153c5964afe918325052fa17419/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fhalloween-fruit-slice%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2hhbGxvd2Vlbi1mcnVpdC1zbGljZS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Halloween Fruit Slice is a fast-paced fruit slicing game with a fun and spooky Halloween theme. Your goal is to slice flying fruits and other objects as they appear on the screen while avoiding dangerous items that can end your run. The game combines the satisfying action of a classic fruit slicing ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "epic-racing-descent-on-cars-44",
    "title": "Epic Racing - Descent on Cars",
    "slug": "epic-racing-descent-on-cars",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956706060-766912937.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956706061-195022399.webp",
    "description": "Epic Racing - Descent on Cars is an exciting downhill racing game where you take control of powerful cars and race across steep tracks filled with ramps, jumps, sharp turns, and challenging obstacles. Your goal is to maintain control at high speeds, avoid crashes, and reach the finish line as quickly as possible.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/2541c94a787f4c58b94636a38c3aa060/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fepic-racing-descent-on-cars%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2VwaWMtcmFjaW5nLWRlc2NlbnQtb24tY2Fycy8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Epic Racing - Descent on Cars is an exciting downhill racing game where you take control of powerful cars and race across steep tracks filled with ramps, jumps, sharp turns, and challenging obstacles. Your goal is to maintain control at high speeds, avoid crashes, and reach the finish line as quickl",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "bubble-shooter-wild-west-45",
    "title": "Bubble Shooter Wild West",
    "slug": "bubble-shooter-wild-west",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956731870-528347598.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956731872-267575166.webp",
    "description": "Bubble Shooter Wild West is an exciting bubble shooter game that combines classic bubble-matching gameplay with a fun Wild West theme. Your goal is to aim and shoot colorful bubbles, match three or more bubbles of the same color, and clear them from the board before they reach the bottom.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/0b18452cd7844e308b726bf05034fac2/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fbubble-shooter-wild-west%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2J1YmJsZS1zaG9vdGVyLXdpbGQtd2VzdC8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Bubble Shooter Wild West is an exciting bubble shooter game that combines classic bubble-matching gameplay with a fun Wild West theme. Your goal is to aim and shoot colorful bubbles, match three or more bubbles of the same color, and clear them from the board before they reach the bottom. With simpl",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "ludo-classic-46",
    "title": "Ludo Classic",
    "slug": "ludo-classic",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956751445-567744364.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956751447-127779613.webp",
    "description": "Ludo Classic is a fun and engaging online board game based on the traditional Ludo gameplay that players know and enjoy. Roll the dice, move your tokens around the colorful board, capture opponent tokens, and try to bring all four of your tokens safely to the home area before your opponents.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/72b97cf38278422b8b9ab83eba0ffa3a/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fludo-classic%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2x1ZG8tY2xhc3NpYy8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Ludo Classic is a fun and engaging online board game based on the traditional Ludo gameplay that players know and enjoy. Roll the dice, move your tokens around the colorful board, capture opponent tokens, and try to bring all four of your tokens safely to the home area before your opponents. The gam",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "merge-haven-47",
    "title": "Merge Haven",
    "slug": "merge-haven",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770956769260-505840384.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770956769261-67784999.webp",
    "description": "Merge Haven is a relaxing and entertaining merge puzzle game where you combine similar items to create better, more useful, and higher-level objects. Start with simple items, merge them together, complete customer orders, and gradually unlock new producers, products, and areas as you progress.",
    "gameUrl": "https://garden.cleverappssg.com/publish/html5/?source=gdcom&_t=1770898085262&hybrid=%2C&gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fmerge-haven%2F",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Merge Haven is a relaxing and entertaining merge puzzle game where you combine similar items to create better, more useful, and higher-level objects. Start with simple items, merge them together, complete customer orders, and gradually unlock new producers, products, and areas as you progress. The g",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "chain-puzzle-48",
    "title": "Chain Puzzle",
    "slug": "chain-puzzle",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770957039663-155028954.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770957039664-537580368.webp",
    "description": "Chain Puzzle is a relaxing yet challenging logic puzzle game where you connect matching colored balls by creating chains across a carefully designed board. Your goal is to connect every pair of matching colors while avoiding blocked screws and making sure your chains do not cross or overlap.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/40ec584436da4841b9b80e9d649112e2/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fchain-puzzle%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NoYWluLXB1enpsZS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Chain Puzzle is a relaxing yet challenging logic puzzle game where you connect matching colored balls by creating chains across a carefully designed board. Your goal is to connect every pair of matching colors while avoiding blocked screws and making sure your chains do not cross or overlap. At firs",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "two-stunt-racers-49",
    "title": "Two Stunt Racers",
    "slug": "two-stunt-racers",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770957094657-314832659.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770957094658-726017124.webp",
    "description": "Two Stunt Racers is an exciting car racing and stunt driving game where you race across high-altitude tracks filled with ramps, jumps, sharp turns, and challenging obstacles. Build up speed, control your car through difficult sections, perform impressive stunts, and try to reach the finish line before your opponent.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/bb65344d29f74da1bd1f41500d8b1dc2/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Ftwo-stunt-racers%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3R3by1zdHVudC1yYWNlcnMvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Two Stunt Racers is an exciting car racing and stunt driving game where you race across high-altitude tracks filled with ramps, jumps, sharp turns, and challenging obstacles. Build up speed, control your car through difficult sections, perform impressive stunts, and try to reach the finish line befo",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "blast-cube-50",
    "title": "Blast Cube",
    "slug": "blast-cube",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770957109101-896417534.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770957109103-34407847.webp",
    "description": "Blast Cube is a fun and colorful cube matching puzzle game where your goal is to clear groups of matching blocks and complete different level objectives. Tap or select matching cubes to create powerful blasts, remove blocks from the board, and work your way through increasingly challenging puzzles.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/eb75ff08712148498a298d9a8e0defb0/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fblast-cubes%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2JsYXN0LWN1YmVzLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Blast Cube is a fun and colorful cube matching puzzle game where your goal is to clear groups of matching blocks and complete different level objectives. Tap or select matching cubes to create powerful blasts, remove blocks from the board, and work your way through increasingly challenging puzzles. ",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "marble-run-ultimate-race-51",
    "title": "Marble Run - Ultimate Race!",
    "slug": "marble-run-ultimate-race",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770957125340-978092169.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770957125348-32224829.webp",
    "description": "Marble Run - Ultimate Race! is an exciting marble racing game where you control a fast-moving marble through challenging tracks filled with twists, drops, slopes, sharp turns, and obstacles.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/ae42ea5c4e0b4ff4b9eddf47fbd2cc5e/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fmarble-run-ultimate-race!%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL21hcmJsZS1ydW4tdWx0aW1hdGUtcmFjZSEvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Marble Run - Ultimate Race! is an exciting marble racing game where you control a fast-moving marble through challenging tracks filled with twists, drops, slopes, sharp turns, and obstacles. Your goal is to keep your marble on the track, maintain your speed, and reach the finish line before the comp",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "angry-birds-blast-52",
    "title": "Angry Birds Blast",
    "slug": "angry-birds-blast",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1784723295864-875664519.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1784723295869-793379232.webp",
    "description": "Angry Birds Blast is an exciting physics-based puzzle game where your goal is to launch powerful birds toward enemy structures, destroy pig fortresses, and complete challenging levels. Use the slingshot to control the direction and power of each shot, then carefully aim your birds at the weakest parts of the structures.",
    "gameUrl": "https://html5.gamemonetize.co/cpsujk6ccofasotw7ryvj58js31mk0hx/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "POPULAR",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Birds",
      "Angry",
      "Bird",
      "Action",
      "Through",
      "Fly"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Angry Birds Blast is an exciting physics-based puzzle game where your goal is to launch powerful birds toward enemy structures, destroy pig fortresses, and complete challenging levels. Use the slingshot to control the direction and power of each shot, then carefully aim your birds at the weakest par",
    "releaseDate": "2026-08-13",
    "isAuthorized": true
  },
  {
    "id": "3d-super-rolling-ball-race-53",
    "title": "3D Super Rolling Ball Race",
    "slug": "3d-super-rolling-ball-race",
    "category": "Casual",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770957174778-462285857.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770957174779-883619496.webp",
    "description": "3D Super Rolling Ball Race is a fast-paced 3D ball racing game where you control a rolling ball across challenging tracks filled with sharp turns, jumps, obstacles, and narrow paths. Your goal is to maintain control, avoid falling from the track, and reach the finish line as quickly as possible.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/c77c8b1ffef242609915d126535b0ca9/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2F3d-super-rolling-ball-race%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzLzNkLXN1cGVyLXJvbGxpbmctYmFsbC1yYWNlLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Casual",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "3D Super Rolling Ball Race is a fast-paced 3D ball racing game where you control a rolling ball across challenging tracks filled with sharp turns, jumps, obstacles, and narrow paths. Your goal is to maintain control, avoid falling from the track, and reach the finish line as quickly as possible. The",
    "releaseDate": "2026-02-12",
    "isAuthorized": true
  },
  {
    "id": "association-connect-word-54",
    "title": "Association - Connect Word",
    "slug": "association-connect-word",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770957632817-245017662.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770957632820-699296385.webp",
    "description": "Association - Connect Word is an engaging word association puzzle game that challenges you to find connections between words based on a given hint or topic. Instead of simply finding individual words, you need to think about how different words are related and identify the correct group.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/4857071352d449b383886bcf8627a231/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fassociation-connect-word%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2Fzc29jaWF0aW9uLWNvbm5lY3Qtd29yZC8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Association - Connect Word is an engaging word association puzzle game that challenges you to find connections between words based on a given hint or topic. Instead of simply finding individual words, you need to think about how different words are related and identify the correct group. Each puzzle",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "bubble-pop-fairyland-55",
    "title": "Bubble Pop Fairyland",
    "slug": "bubble-pop-fairyland",
    "category": "Adventure",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770957761706-148260883.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770957761709-322395877.webp",
    "description": "Bubble Pop Fairyland is a colorful and magical bubble shooter puzzle game where you aim, match, and pop groups of bubbles to clear each level. Set in a charming fairyland environment, the game combines classic bubble-popping gameplay with bright visuals, colorful designs, and increasingly challenging bubble patterns.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/fc84a63fc1db4ebabc334521c2cb3c68/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fbubble-pop-fairyland%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2J1YmJsZS1wb3AtZmFpcnlsYW5kLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Adventure",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Bubble Pop Fairyland is a colorful and magical bubble shooter puzzle game where you aim, match, and pop groups of bubbles to clear each level. Set in a charming fairyland environment, the game combines classic bubble-popping gameplay with bright visuals, colorful designs, and increasingly challengin",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "nut-color-sort-puzzle-56",
    "title": "Nut Color Sort Puzzle",
    "slug": "nut-color-sort-puzzle",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770967882517-295449817.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770967882518-189919254.webp",
    "description": "Nut Color Sort Puzzle is a relaxing and satisfying color sorting puzzle game where your goal is to organize colorful nuts by placing them onto the correct bolts. The main objective is simple: sort all nuts so that each bolt contains nuts of the same color.",
    "gameUrl": "https://html5.gamemonetize.co/bqo62nz1cpec68bw0mb8z8deln9yrq5a/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Nut Color Sort Puzzle is a relaxing and satisfying color sorting puzzle game where your goal is to organize colorful nuts by placing them onto the correct bolts. The main objective is simple: sort all nuts so that each bolt contains nuts of the same color. The game starts with simple sorting challen",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "search-the-word-57",
    "title": "Search the Word",
    "slug": "search-the-word",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770959841981-423915772.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770959841982-862687174.webp",
    "description": "Search the Word is an engaging word search puzzle game where you need to find hidden words inside a grid filled with letters. Your objective is to carefully examine the letter grid, locate all the words shown in the puzzle, and complete each level.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/c13ee9c06edc4f0a8d7f6f291a7c13d8/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fword-search-2%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3dvcmQtc2VhcmNoLTIvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Search the Word is an engaging word search puzzle game where you need to find hidden words inside a grid filled with letters. Your objective is to carefully examine the letter grid, locate all the words shown in the puzzle, and complete each level. The game combines word searching, vocabulary challe",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "fighter-jet-airplane-rush-58",
    "title": "Fighter Jet Airplane Rush",
    "slug": "fighter-jet-airplane-rush",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770958137774-134401891.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770958137776-497526767.webp",
    "description": "Fighter Jet Airplane Rush is a fast-paced airplane shooting and fighter jet game where you take control of a powerful fighter aircraft and fly through challenging routes filled with obstacles, enemy attacks, and dangerous situations. Your objective is to keep your fighter jet flying, avoid incoming threats, destroy enemies, and travel as far as possible.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/d033df5e52e74348951516eecf4c2ff7/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fjet-fighter-airplane-racing%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2pldC1maWdodGVyLWFpcnBsYW5lLXJhY2luZy8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "POPULAR",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Fighter Jet Airplane Rush is a fast-paced airplane shooting and fighter jet game where you take control of a powerful fighter aircraft and fly through challenging routes filled with obstacles, enemy attacks, and dangerous situations. Your objective is to keep your fighter jet flying, avoid incoming ",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "pool-master-59",
    "title": "Pool Master",
    "slug": "pool-master",
    "category": "Pool",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770959474206-15116434.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770959474208-143821736.webp",
    "description": "Pool Master is a fun and relaxing online pool game designed for players who enjoy billiards, precision shots, and classic arcade-style gameplay. The game lets you control the cue stick, aim carefully, adjust your shot power, and try to sink the balls into the pockets.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/cfe752f3ab0742bbaa481bd558591c48/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fpool-master%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3Bvb2wtbWFzdGVyLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Pool",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Pool Master is a fun and relaxing online pool game designed for players who enjoy billiards, precision shots, and classic arcade-style gameplay. The game lets you control the cue stick, aim carefully, adjust your shot power, and try to sink the balls into the pockets. With simple controls and smooth",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "celebrity-e-girl-vibes-60",
    "title": "Celebrity E-Girl Vibes",
    "slug": "celebrity-e-girl-vibes",
    "category": "Beauty",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770964642270-96931242.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770964642272-68255597.webp",
    "description": "Celebrity E-Girl Vibes is a fun and creative dress-up and fashion game where you can create trendy looks for celebrity-style characters. Choose from different outfits, hairstyles, makeup styles, and accessories to create unique e-girl-inspired fashion combinations.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/80ddf44c832b44d69d72392d9453ca00/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fcelebrity-e-girl-vibes%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NlbGVicml0eS1lLWdpcmwtdmliZXMvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Beauty",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Celebrity E-Girl Vibes is a fun and creative dress-up and fashion game where you can create trendy looks for celebrity-style characters. Choose from different outfits, hairstyles, makeup styles, and accessories to create unique e-girl-inspired fashion combinations. Experiment with different colors, ",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "celebrity-thanksgiving-prep-61",
    "title": "Celebrity Thanksgiving Prep",
    "slug": "celebrity-thanksgiving-prep",
    "category": "Beauty",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770964733791-746560673.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770964733793-388867037.webp",
    "description": "Celebrity Thanksgiving Prep is a fun and relaxing Thanksgiving dress-up game where you can help celebrity-style characters get ready for a special festive celebration. The game combines fashion, creativity, and holiday preparation, allowing you to experiment with different outfits, hairstyles, accessories, and decorations.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/e5dcd09e91004a5c8d1b7d473a572bcf/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fcelebrity-thanksgiving-prep%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NlbGVicml0eS10aGFua3NnaXZpbmctcHJlcC8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Beauty",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Celebrity Thanksgiving Prep is a fun and relaxing Thanksgiving dress-up game where you can help celebrity-style characters get ready for a special festive celebration. The game combines fashion, creativity, and holiday preparation, allowing you to experiment with different outfits, hairstyles, acces",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "crazy-stunts-3d-62",
    "title": "Crazy Stunts 3D",
    "slug": "crazy-stunts-3d",
    "category": "Car",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770964822677-202031216.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770964822679-144155796.webp",
    "description": "Crazy Stunts 3D is an exciting 3D stunt driving game where you can drive powerful cars across challenging tracks filled with ramps, jumps, obstacles, and sharp turns. Your goal is to control your car carefully, perform impressive stunts, and reach the finish line without crashing.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/7003f00653b24b0686c8d448eca7083b/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fcrazy-stunts-3d%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NyYXp5LXN0dW50cy0zZC8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Car",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Crazy Stunts 3D is an exciting 3D stunt driving game where you can drive powerful cars across challenging tracks filled with ramps, jumps, obstacles, and sharp turns. Your goal is to control your car carefully, perform impressive stunts, and reach the finish line without crashing. As you progress th",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "screw-puzzle-63",
    "title": "Screw Puzzle",
    "slug": "screw-puzzle",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770966680973-325059593.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770966680978-184823149.webp",
    "description": "Screw Puzzle is a challenging logic puzzle game where you need to remove screws and clear metal plates from the board. Each plate is held in place by screws, and your goal is to figure out the correct order for removing them without creating obstacles for the remaining plates.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/eef2c852d9784065a22a21d51cfdc9fd/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fwood-and-screw-puzzle%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3dvb2QtYW5kLXNjcmV3LXB1enpsZS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Screw Puzzle is a challenging logic puzzle game where you need to remove screws and clear metal plates from the board. Each plate is held in place by screws, and your goal is to figure out the correct order for removing them without creating obstacles for the remaining plates. The early levels are s",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "word-search-universe-64",
    "title": "Word Search Universe",
    "slug": "word-search-universe",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770966871055-927901883.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770966871056-128017526.webp",
    "description": "Word Search Universe is a relaxing and engaging word search puzzle game where you can discover hidden words across different themes and challenging letter grids. The game offers a collection of word puzzles designed to keep your mind active while providing a simple and enjoyable gaming experience.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/b660d10d6c124922babb5d9e7bf29133/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fword-search-universe%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3dvcmQtc2VhcmNoLXVuaXZlcnNlLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Word Search Universe is a relaxing and engaging word search puzzle game where you can discover hidden words across different themes and challenging letter grids. The game offers a collection of word puzzles designed to keep your mind active while providing a simple and enjoyable gaming experience. Y",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "celebrities-get-ready-for-christmas-65",
    "title": "Celebrities Get Ready For Christmas",
    "slug": "celebrities-get-ready-for-christmas",
    "category": "Beauty",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1771590114569-787082481.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1771590114571-612012919.webp",
    "description": "Celebrities Get Ready For Christmas is a fun and festive Christmas dress-up game where you can help celebrity-style characters prepare for their holiday celebrations. Choose beautiful Christmas outfits, winter accessories, hairstyles, jewelry, and bags to create stylish festive looks.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/a60b670196384d8db35fab193cc80297/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fcelebrities-get-ready-for-christmas%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NlbGVicml0aWVzLWdldC1yZWFkeS1mb3ItY2hyaXN0bWFzLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "NEW",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Beauty",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Celebrities Get Ready For Christmas is a fun and festive Christmas dress-up game where you can help celebrity-style characters prepare for their holiday celebrations. Choose beautiful Christmas outfits, winter accessories, hairstyles, jewelry, and bags to create stylish festive looks. With its brigh",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "hill-racing-egg-drop-66",
    "title": "Hill Racing - Egg drop!",
    "slug": "hill-racing-egg-drop",
    "category": "Car",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770967775633-869893798.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770967775634-8450932.webp",
    "description": "Hill Racing - Egg Drop! is a fun and challenging hill racing game where you drive a vehicle across bumpy roads while carefully protecting an egg.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/7b5a23ec82874487868deee0b7afbbfa/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fhill-racing-egg-drop!%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2hpbGwtcmFjaW5nLWVnZy1kcm9wIS8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Car",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Hill Racing - Egg Drop! is a fun and challenging hill racing game where you drive a vehicle across bumpy roads while carefully protecting an egg. Your main goal is to reach the finish line without allowing the egg to fall, crack, or break. The hilly tracks are filled with uneven surfaces, slopes, bu",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "air-force-space-shooter-67",
    "title": "Air Force Space Shooter",
    "slug": "air-force-space-shooter",
    "category": "Action",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770958017489-597092745.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770958017491-603032017.webp",
    "description": "Air Force Space Shooter is an action-packed space shooting game where you take control of a powerful fighter jet and battle waves of enemy ships across the vastness of outer space. Your mission is to fly through dangerous space routes, avoid incoming attacks, destroy enemy forces, and survive for as long as possible.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/38ab3871c30c48a3a6a4b1e3e2ce802c/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2F1945-air-force-space-shooter%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzLzE5NDUtYWlyLWZvcmNlLXNwYWNlLXNob290ZXIvIiwicGFyZW50RG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ0b3BEb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE4In0%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "POPULAR",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Action",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Air Force Space Shooter is an action-packed space shooting game where you take control of a powerful fighter jet and battle waves of enemy ships across the vastness of outer space. Your mission is to fly through dangerous space routes, avoid incoming attacks, destroy enemy forces, and survive for as",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "pool-maniya-68",
    "title": "Pool Maniya",
    "slug": "pool-maniya",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770955607796-576536803.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770955607801-239867589.webp",
    "description": "Pool Maniya is a fun and relaxing online pool game where you can test your aiming, timing, and shooting skills while trying to clear the table with accurate shots. The game gives you a simple pool experience where every shot matters.",
    "gameUrl": "https://html5.gamemonetize.co/6h3a9smok88omcg38xx6os9ghd5avu45/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Pool Maniya is a fun and relaxing online pool game where you can test your aiming, timing, and shooting skills while trying to clear the table with accurate shots. The game gives you a simple pool experience where every shot matters. You need to carefully position the cue stick, choose the right ang",
    "releaseDate": "2026-02-06",
    "isAuthorized": true
  },
  {
    "id": "sort-puzzle-nuts-and-bolts-69",
    "title": "Sort Puzzle - Nuts and Bolts",
    "slug": "sort-puzzle-nuts-and-bolts",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770975894684-115107469.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770975894687-144168237.webp",
    "description": "Sort Puzzle - Nuts and Bolts is a relaxing and satisfying sorting puzzle game where you arrange colorful nuts on matching bolts. Your goal is to organize all the nuts by color and place them on the correct bolts while carefully planning each move.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/1181e80fccb44318a69756c736bfbda7/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fsort-puzzle-nuts-and-bolts%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3NvcnQtcHV6emxlLW51dHMtYW5kLWJvbHRzLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Sort Puzzle - Nuts and Bolts is a relaxing and satisfying sorting puzzle game where you arrange colorful nuts on matching bolts. Your goal is to organize all the nuts by color and place them on the correct bolts while carefully planning each move. The game starts with simple arrangements and gradual",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "chiron-city-driver-70",
    "title": "Chiron City Driver",
    "slug": "chiron-city-driver",
    "category": "Car",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1771589895348-413828999.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1771589895351-136177732.webp",
    "description": "Chiron City Driver is an exciting free-roaming driving game that puts you behind the wheel of a powerful sports car and lets you explore a large city at your own pace. Instead of competing in a traditional race or trying to beat a countdown timer, you can simply enjoy the freedom of driving through urban streets, practicing your steering, testing your speed, and discovering different parts of the city.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/1b5315fd207a446daf4cbf9df971e5b0/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Fchiron-city-driver%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL2NoaXJvbi1jaXR5LWRyaXZlci8iLCJwYXJlbnREb21haW4iOiJnYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TRENDING",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Car",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Chiron City Driver is an exciting free-roaming driving game that puts you behind the wheel of a powerful sports car and lets you explore a large city at your own pace. Instead of competing in a traditional race or trying to beat a countdown timer, you can simply enjoy the freedom of driving through ",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "cross-word-puzzle-71",
    "title": "Cross Word Puzzle",
    "slug": "cross-word-puzzle",
    "category": "Puzzle",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1770979606989-142924617.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1770979606991-348910479.webp",
    "description": "Cross Word Puzzle is a fun, relaxing, and engaging word game that challenges you to connect letters and discover meaningful words. The game is designed for players who enjoy vocabulary challenges, word discovery, and simple brain-training gameplay.",
    "gameUrl": "https://html5.gamemonetize.co/bhs9ves88nta7s59d4ms7o9bhc49dss2/",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Puzzle",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Cross Word Puzzle is a fun, relaxing, and engaging word game that challenges you to connect letters and discover meaningful words. The game is designed for players who enjoy vocabulary challenges, word discovery, and simple brain-training gameplay. Instead of complicated controls or difficult rules,",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  },
  {
    "id": "royal-garden-match-2-72",
    "title": "Royal Garden Match 2",
    "slug": "royal-garden-match-2",
    "category": "Board",
    "thumbnail": "https://lupzogames.com/uploads/games/landscap-1771590041412-434633647.webp",
    "fallbackThumbnail": "https://lupzogames.com/uploads/games/Verrtical-1771590041414-511574235.webp",
    "description": "Royal Garden Match 2 is a relaxing and colorful match puzzle game set in a beautiful garden environment. Your goal is to find and match identical garden objects, including flowers, mushrooms, and other charming icons, to clear them from the board and complete each level.",
    "gameUrl": "https://html5.gamedistribution.com/rvvASMiM/6416456afd5147b489069f061ea00699/index.html?gd_sdk_referrer_url=https%3A%2F%2Fgamedistribution.com%2Fgames%2Froyal-garden-match-2%2F&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2dhbWVkaXN0cmlidXRpb24uY29tL2dhbWVzL3JveWFsLWdhcmRlbi1tYXRjaC0yLyIsInBhcmVudERvbWFpbiI6ImdhbWVkaXN0cmlidXRpb24uY29tIiwidG9wRG9tYWluIjoiZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJoYXNJbXByZXNzaW9uIjpmYWxzZSwibG9hZGVyRW5hYmxlZCI6dHJ1ZSwiaG9zdCI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwidmVyc2lvbiI6IjEuNS4xOCJ9",
    "embedAllowed": true,
    "controls": "Tap or Click and Drag to play. Supports touchscreens, mouse, and keyboard.",
    "featured": false,
    "popular": true,
    "badge": "TOP",
    "technology": "HTML5 / WebGL",
    "controlsType": "Touch & Mouse",
    "tags": [
      "Board",
      "Free Games"
    ],
    "developer": "LupzoGames Partner",
    "instructions": "Royal Garden Match 2 is a relaxing and colorful match puzzle game set in a beautiful garden environment. Your goal is to find and match identical garden objects, including flowers, mushrooms, and other charming icons, to clear them from the board and complete each level. Every level brings a new boa",
    "releaseDate": "2026-02-13",
    "isAuthorized": true
  }
];

  // --- EMBEDDED VECTOR SVG ICONS (Pixel-perfect, zero emoji lag) ---
  const ICONS = {
    home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
    popular: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.5 2.5 2 4.5 4 6 2.5 1.8 4 4.5 4 7.5 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-3.5 2-6.5 5-8 .5 1.5 1.5 3 3 4 .5-3 1.5-6.5 2-9.5z"/></svg>`,
    recent: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
    favorites: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    gamepad: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="6"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="17.5" cy="13.5" r="1.2" fill="currentColor"/></svg>`,
    pool: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5" fill="#FFFFFF"/><text x="12" y="15" font-size="8" font-family="'Outfit', sans-serif" font-weight="900" text-anchor="middle" fill="#0F172A">8</text></svg>`,
    action: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 6.5L21 18v3h-3L6.5 9.5"/><path d="M5 8l-2 2"/><path d="M3 13l2-2"/></svg>`,
    adventure: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/></svg>`,
    beauty: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z"/></svg>`,
    car: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L16 9.5 13.5 5h-7L4.5 9.5C3.7 9.7 3 10.5 3 11.4V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2.5"/><circle cx="17" cy="17" r="2.5"/></svg>`,
    puzzle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 10.5V6a2 2 0 0 0-2-2h-4.5a2.5 2.5 0 0 0-5 0H3a2 2 0 0 0-2 2v4.5a2.5 2.5 0 0 0 0 5V18a2 2 0 0 0 2 2h4.5a2.5 2.5 0 0 0 5 0H17a2 2 0 0 0 2-2v-4.5a2.5 2.5 0 0 0 0-5z"/></svg>`,
    casual: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
    board: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>`,
    sports: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/><path d="M14.83 9.17a6 6 0 0 0-8.49 0"/><path d="M9.17 14.83a6 6 0 0 0 8.49 0"/></svg>`,
    arcade: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="3"/><circle cx="12" cy="14" r="2"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="8" y1="18" x2="16" y2="18"/></svg>`,
    install: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    search: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    chevronRight: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    arrowUp: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
    play: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    reload: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    fullscreen: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
    theater: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="8" y1="4" x2="8" y2="20"/><line x1="16" y1="4" x2="16" y2="20"/></svg>`,
    share: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    heart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
  };

  function getCategoryIcon(catSlug) {
    const slug = (catSlug || '').toLowerCase();
    if (slug === 'pool') return ICONS.pool;
    if (slug === 'action') return ICONS.action;
    if (slug === 'adventure') return ICONS.adventure;
    if (slug === 'beauty') return ICONS.beauty;
    if (slug === 'racing' || slug === 'car') return ICONS.car;
    if (slug === 'puzzle') return ICONS.puzzle;
    if (slug === 'casual') return ICONS.casual;
    if (slug === 'board') return ICONS.board;
    if (slug === 'sports') return ICONS.sports;
    if (slug === 'arcade') return ICONS.arcade;
    return ICONS.gamepad;
  }

  // --- STATE (LocalStorage) ---
  const STORAGE_KEYS = {
    FAVORITES: 'nexusplay_favorites',
    RECENT: 'nexusplay_recently_played',
    SIDEBAR: 'nexusplay_sidebar_collapsed'
  };

  const stateListeners = [];
  function subscribeState(fn) { stateListeners.push(fn); }
  function notifyState() { stateListeners.forEach(fn => fn()); }

  function getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function isFavorite(gameId) {
    return getFavorites().includes(gameId);
  }

  function toggleFavorite(gameId) {
    try {
      const favs = getFavorites();
      const index = favs.indexOf(gameId);
      let added = false;
      if (index === -1) {
        favs.push(gameId);
        added = true;
      } else {
        favs.splice(index, 1);
        added = false;
      }
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      notifyState();
      return added;
    } catch (e) {
      return false;
    }
  }

  function getRecentlyPlayed() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function addRecentlyPlayed(gameId) {
    try {
      let recent = getRecentlyPlayed();
      recent = recent.filter(id => id !== gameId);
      recent.unshift(gameId);
      if (recent.length > 16) recent = recent.slice(0, 16);
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recent));
      notifyState();
    } catch (e) {}
  }

  // --- QUERY HELPERS ---
  function getGameBySlug(slug) {
    return gamesData.find(g => g.slug.toLowerCase() === slug.toLowerCase() || g.id.toLowerCase() === slug.toLowerCase()) || null;
  }

  function getCategoryBySlug(slug) {
    return categoriesData.find(c => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()) || null;
  }

  function searchGames(query, category = '') {
    const q = query.trim().toLowerCase();
    return gamesData.filter(g => {
      const matchesCat = !category || category === 'all' || 
                         g.category.toLowerCase() === category.toLowerCase() ||
                         (category === 'racing' && (g.category.toLowerCase() === 'racing' || g.category.toLowerCase() === 'car')) ||
                         (category === 'car' && g.category.toLowerCase() === 'car') ||
                         (category === 'pool' && g.category.toLowerCase() === 'pool') ||
                         (category === 'beauty' && g.category.toLowerCase() === 'beauty') ||
                         (category === 'board' && g.category.toLowerCase() === 'board') ||
                         (g.tags && g.tags.some(t => t.toLowerCase() === category.toLowerCase()));
      if (!matchesCat) return false;
      if (!q) return true;
      return g.title.toLowerCase().includes(q) ||
             g.description.toLowerCase().includes(q) ||
             g.category.toLowerCase().includes(q) ||
             (g.tags && g.tags.some(t => t.toLowerCase().includes(q)));
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast(message, icon = '✅') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(14px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // --- UI RENDERERS ---

  // 1. Left Navigation Sidebar
  function renderSidebar() {
    const categoriesHtml = categoriesData.map(c => `
      <li>
        <a href="#/category/${c.slug}" class="category-nav-item" data-category="${c.slug}">
          <span class="cat-chip cat-chip-${c.slug}">
            ${getCategoryIcon(c.slug)}
          </span>
          <span class="category-nav-label">${c.name}</span>
        </a>
      </li>
    `).join('');

    return `
      <div class="sidebar-header">
        <a href="#/" class="sidebar-brand" aria-label="NexusPlay Home">
          <img src="assets/images/logo.svg" alt="NexusPlay" />
        </a>
        <button class="sidebar-collapse-btn" id="sidebar-collapse-btn" title="Toggle Sidebar" aria-label="Toggle Sidebar">
          ${ICONS.chevronRight}
        </button>
      </div>

      <div class="sidebar-content">
        <div class="sidebar-nav-group">
          <a href="#/" class="nav-pill active" id="nav-item-home" data-route="#/">
            <span class="nav-icon-badge nav-icon-home">${ICONS.home}</span>
            <span class="nav-pill-label">Home</span>
          </a>
          <a href="#/games?filter=popular" class="nav-pill" id="nav-item-popular" data-route="#/games?filter=popular">
            <span class="nav-icon-badge nav-icon-popular">${ICONS.popular}</span>
            <span class="nav-pill-label">Popular Games</span>
          </a>
          <a href="#/games?filter=recent" class="nav-pill" id="nav-item-recent" data-route="#/games?filter=recent">
            <span class="nav-icon-badge nav-icon-recent">${ICONS.recent}</span>
            <span class="nav-pill-label">Recently Played</span>
          </a>
          <a href="#/favorites" class="nav-pill" id="nav-item-favorites" data-route="#/favorites">
            <span class="nav-icon-badge nav-icon-fav">${ICONS.favorites}</span>
            <span class="nav-pill-label">My Favorites</span>
          </a>
          <a href="#/games" class="nav-pill" id="nav-item-all" data-route="#/games">
            <span class="nav-icon-badge nav-icon-all">${ICONS.gamepad}</span>
            <span class="nav-pill-label">All 72 Games</span>
          </a>
        </div>

        <div class="sidebar-section-title">
          <span>Categories</span>
          <span style="font-size: 0.65rem; color: var(--accent-primary); background: rgba(37,99,235,0.08); padding: 1px 6px; border-radius: 9999px;">${categoriesData.length}</span>
        </div>
        <ul class="category-nav-list" id="sidebar-category-list">
          ${categoriesHtml}
        </ul>
      </div>

      <div class="sidebar-footer">
        <div>&copy; 2026 NexusPlay Portal</div>
      </div>
    `;
  }

  // 2. Top Header Navigation
  function renderHeader() {
    const favCount = getFavorites().length;

    return `
      <div class="header-inner">
        <div class="header-left">
          <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Open Navigation">☰</button>
          
          <div class="search-wrapper">
            <div class="search-box">
              <span class="search-icon">${ICONS.search}</span>
              <input type="text" id="header-search-input" class="search-input" placeholder="Search across 72+ free games..." autocomplete="off" aria-label="Search games" />
              <span class="search-shortcut">/</span>
              <button class="search-clear-btn" id="search-clear-btn" style="display: none;">✕</button>
            </div>
            <div class="search-suggestions" id="search-suggestions"></div>
          </div>
        </div>

        <div class="header-actions">
          <button class="btn-install" id="btn-install-app" title="Install Web App">
            <span>${ICONS.install}</span>
            <span>Install</span>
          </button>
          
          <a href="#/favorites" class="btn-header-fav" title="My Bookmarked Favorites">
            <span style="color: #F43F5E; display: flex; align-items: center;">${ICONS.heart}</span>
            <span class="fav-counter-badge" id="header-fav-count">${favCount}</span>
          </a>
        </div>
      </div>
    `;
  }

  // 3. Top Row Hero Shelf (Top 8 Games)
  function renderHeroShelf() {
    const heroSlugs = [
      "helicopter-battle",
      "neon-breacks-breaker",
      "rise-up-air-balloon",
      "home-island",
      "counter-war",
      "level-devil",
      "arrow-escape-tap-puzzle",
      "bubble-fall"
    ];
    const topHeroGames = heroSlugs.map(slug => gamesData.find(g => g.slug === slug)).filter(Boolean);

    return `
      <div class="hero-shelf-grid">
        ${topHeroGames.map(game => {
          const thumb = game.thumbnail || game.fallbackThumbnail || 'assets/images/games/default-game.svg';
          const fallback = game.fallbackThumbnail || 'assets/images/games/default-game.svg';
          return `
            <a href="#/game/${game.slug}" class="hero-shelf-card" title="Play ${escapeHtml(game.title)}">
              <img src="${thumb}" alt="${escapeHtml(game.title)}" class="hero-shelf-img" loading="eager" onerror="this.onerror=null; this.src='${fallback}';" />
              <div class="hero-shelf-tag">${game.badge || 'TOP PICK'}</div>
              <div class="hero-shelf-overlay">
                <div class="hero-shelf-title">${escapeHtml(game.title)}</div>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    `;
  }

  // 4. Game Card (Unique Modern Casual Card)
  function renderGameCard(game, customBadge = null) {
    const isFav = isFavorite(game.id);
    const badgeText = customBadge || game.badge;
    let badgeClass = 'badge-trending';
    if (badgeText === 'NEW') badgeClass = 'badge-new';
    else if (badgeText === 'TOP') badgeClass = 'badge-top';
    else if (badgeText === 'HOT') badgeClass = 'badge-hot';

    const fallbackThumb = game.fallbackThumbnail || 'assets/images/games/default-game.svg';
    const primaryThumb = game.thumbnail || fallbackThumb;

    return `
      <article class="game-card" data-id="${game.id}">
        <div class="card-media">
          <img 
            src="${primaryThumb}" 
            alt="${escapeHtml(game.title)}" 
            class="card-thumb" 
            loading="lazy"
            onerror="this.onerror=null; this.src='${fallbackThumb}';"
          />
          ${badgeText ? `<span class="card-badge ${badgeClass}">${badgeText}</span>` : ''}
          <button 
            class="card-fav-btn ${isFav ? 'is-fav' : ''}" 
            aria-label="Save ${escapeHtml(game.title)} to favorites"
            data-fav-id="${game.id}"
            title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
          >
            ${ICONS.heart}
          </button>
          <a href="#/game/${game.slug}" class="card-play-overlay" aria-label="Play ${escapeHtml(game.title)}">
            <div class="card-play-btn">${ICONS.play}</div>
          </a>
        </div>
        <div class="card-details">
          <a href="#/game/${game.slug}" class="card-title" title="${escapeHtml(game.title)}">
            ${escapeHtml(game.title)}
          </a>
          <div class="card-meta-row">
            <span class="card-category-pill">
              <span class="card-category-dot"></span>
              <span>${game.category}</span>
            </span>
            <span>${game.technology || 'HTML5'}</span>
          </div>
        </div>
      </article>
    `;
  }

  // 5. Ad Slot
  function renderAdSlot(type = 'leaderboard') {
    return `
      <div class="ad-slot-wrapper">
        <div class="ad-slot-container ad-slot-leaderboard">
          <span class="ad-badge">Advertisement</span>
          <div class="ad-placeholder-text">Reserved Responsive Ad Slot (728 &times; 90)</div>
        </div>
      </div>
    `;
  }

  // 6. Site Footer
  function renderFooter() {
    const categoryLinks = categoriesData.map(c => `
      <li><a href="#/category/${c.slug}" class="footer-link">${c.name} Games</a></li>
    `).join('');

    return `
      <div class="container">
        <div class="footer-top">
          <div class="footer-col footer-brand">
            <img src="assets/images/logo.svg" alt="NexusPlay" style="height: 38px;" />
            <p>NexusPlay delivers clean, lightweight, instant browser gaming with zero downloads. Enjoy 72+ hand-picked casual, action, racing, and puzzle games freely on any device.</p>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a href="#/" class="footer-link">Home</a></li>
              <li><a href="#/games" class="footer-link">All 72 Games</a></li>
              <li><a href="#/games?filter=popular" class="footer-link">Popular Games</a></li>
              <li><a href="#/games?filter=new" class="footer-link">New Games</a></li>
              <li><a href="#/favorites" class="footer-link">My Favorites</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Categories</h4>
            <ul class="footer-links">${categoryLinks}</ul>
          </div>
          <div class="footer-col">
            <h4>Platform & Legal</h4>
            <ul class="footer-links">
              <li><a href="#/about" class="footer-link">About NexusPlay</a></li>
              <li><a href="#/contact" class="footer-link">Developer & Contact</a></li>
              <li><a href="#/privacy" class="footer-link">Privacy Policy</a></li>
              <li><a href="#/terms" class="footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>&copy; 2026 NexusPlay Portal. All rights reserved. Self-hosted & licensed HTML5 browser games.</div>
          <div>Simple, clean & instant casual gameplay.</div>
        </div>
      </div>
    `;
  }

  // --- VIEWS ---

  // Home View
  function renderHomeView() {
    const recentIds = getRecentlyPlayed();
    let recentGames = recentIds.map(id => gamesData.find(g => g.id === id || g.slug === id)).filter(Boolean);
    if (recentGames.length === 0) {
      const defaultSlugs = [
        "subway-winter-vacation",
        "angry-heroes",
        "counter-war",
        "arrow-escape-tap-puzzle",
        "bubble-fall",
        "neon-breacks-breaker"
      ];
      recentGames = defaultSlugs.map(s => gamesData.find(g => g.slug === s)).filter(Boolean);
    }

    const newSlugs = [
      "rise-up-air-balloon",
      "monster-truck",
      "ludo-kingdom",
      "3d-fashion-princess-dress-up",
      "charger-city-driver",
      "temple-run"
    ];
    let newGames = newSlugs.map(s => gamesData.find(g => g.slug === s)).filter(Boolean);
    if (newGames.length < 6) {
      newGames = gamesData.filter(g => g.badge === 'NEW').slice(0, 6);
    }

    const trendingGames = gamesData.filter(g => g.popular).slice(0, 12);
    const carGames = gamesData.filter(g => g.category === 'Car');
    const actionGames = gamesData.filter(g => g.category === 'Action').slice(0, 6);
    const puzzleGames = gamesData.filter(g => g.category === 'Puzzle').slice(0, 6);
    const boardGames = gamesData.filter(g => g.category === 'Board').slice(0, 6);
    const adventureGames = gamesData.filter(g => g.category === 'Adventure').slice(0, 6);
    const beautyGames = gamesData.filter(g => g.category === 'Beauty');
    const poolGames = gamesData.filter(g => g.category === 'Pool');
    const casualGames = gamesData.filter(g => g.category === 'Casual').slice(0, 6);

    return `
      <!-- Top Row Hero Shelf (Top 8 Games) -->
      ${renderHeroShelf()}

      <!-- Section: Recently Played -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #F5F3FF; color: #8B5CF6;">${ICONS.recent}</span>
            <h2 class="section-shelf-title">Recently Played</h2>
          </div>
          <a href="#/games?filter=recent" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${recentGames.slice(0, 6).map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: New Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #ECFDF5; color: #10B981;">${ICONS.popular}</span>
            <h2 class="section-shelf-title">New Games</h2>
          </div>
          <a href="#/games?filter=new" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${newGames.slice(0, 6).map(g => renderGameCard(g, 'NEW')).join('')}
        </div>
      </section>

      <!-- Section: All Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #EFF6FF; color: #2563EB;">${ICONS.gamepad}</span>
            <h2 class="section-shelf-title">All Games</h2>
          </div>
          <a href="#/games" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${trendingGames.slice(0, 6).map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      ${renderAdSlot('leaderboard')}

      <!-- Section: Car & Racing Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #ECFEFF; color: #0891B2;">${ICONS.car}</span>
            <h2 class="section-shelf-title">Car & Racing Games</h2>
          </div>
          <a href="#/category/racing" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${carGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: Action & Combat Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #FEF2F2; color: #DC2626;">${ICONS.action}</span>
            <h2 class="section-shelf-title">Action Games</h2>
          </div>
          <a href="#/category/action" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${actionGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: Puzzle & Logic Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #F5F3FF; color: #7C3AED;">${ICONS.puzzle}</span>
            <h2 class="section-shelf-title">Puzzle Games</h2>
          </div>
          <a href="#/category/puzzle" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${puzzleGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: Board & Tabletop Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #FFF7ED; color: #EA580C;">${ICONS.board}</span>
            <h2 class="section-shelf-title">Board Games</h2>
          </div>
          <a href="#/category/board" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${boardGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: Adventure Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #FFFBEB; color: #D97706;">${ICONS.adventure}</span>
            <h2 class="section-shelf-title">Adventure Games</h2>
          </div>
          <a href="#/category/adventure" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${adventureGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: Beauty & Dress Up -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #FDF2F8; color: #DB2777;">${ICONS.beauty}</span>
            <h2 class="section-shelf-title">Beauty & Dress Up Games</h2>
          </div>
          <a href="#/category/beauty" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${beautyGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: Pool Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #ECFDF5; color: #059669;">${ICONS.pool}</span>
            <h2 class="section-shelf-title">Pool Games</h2>
          </div>
          <a href="#/category/pool" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${poolGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>

      <!-- Section: Casual Games -->
      <section class="game-section">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #F0FDFA; color: #0D9488;">${ICONS.casual}</span>
            <h2 class="section-shelf-title">Casual Games</h2>
          </div>
          <a href="#/category/casual" class="see-all-link"><span>See All</span> ${ICONS.chevronRight}</a>
        </div>
        <div class="games-grid">
          ${casualGames.map(g => renderGameCard(g)).join('')}
        </div>
      </section>
    `;
  }

  // Game Detail & Player View
  function renderGameView(slug) {
    const game = getGameBySlug(slug);
    if (!game) {
      return `
        <div style="text-align: center; padding: 80px 20px;">
          <h1 style="font-size: 2.2rem; margin-bottom: 12px; color: var(--text-primary);">Game Not Found</h1>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">The game you are looking for does not exist or has been moved.</p>
          <a href="#/" class="btn-install" style="display: inline-block;">Back to Home</a>
        </div>
      `;
    }

    addRecentlyPlayed(game.id);
    const isFav = isFavorite(game.id);
    const related = gamesData.filter(g => g.id !== game.id).slice(0, 5);

    return `
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <a href="#/category/${game.category.toLowerCase()}" class="breadcrumb-link">${game.category}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${escapeHtml(game.title)}</span>
      </nav>

      <div class="game-detail-layout" id="game-layout">
        <div class="game-player-column">
          <div class="player-container" id="player-container">
            <div class="player-loader" id="player-loader">
              <div class="spinner"></div>
              <div class="loader-text">LAUNCHING ${escapeHtml(game.title.toUpperCase())}...</div>
            </div>

            <div class="player-error" id="player-error">
              <div style="font-size: 48px;">⚠️</div>
              <div class="player-error-title">Unable to Load Game</div>
              <p class="player-error-desc">There was an issue launching the game sandbox.</p>
              <button class="btn-install" id="player-retry-btn">Retry Game</button>
            </div>

            <iframe 
              src="${game.gameUrl}" 
              id="game-iframe"
              class="game-iframe"
              title="${escapeHtml(game.title)}"
              allow="autoplay; fullscreen; keyboard; gamepad"
              allowfullscreen
              loading="eager"
            ></iframe>
          </div>

          <!-- Clean Player Controls Toolbar -->
          <div class="player-controls-bar">
            <div class="player-controls-left">
              <div class="player-game-title">${escapeHtml(game.title)}</div>
            </div>
            <div class="player-controls-right">
              <button class="ctrl-btn ${isFav ? 'is-fav' : ''}" id="ctrl-fav-btn" title="Add to Favorites" data-id="${game.id}">
                <span class="ctrl-btn-icon">${ICONS.heart}</span>
                <span>${isFav ? 'Favorited' : 'Favorite'}</span>
              </button>
              <button class="ctrl-btn" id="ctrl-reload-btn" title="Restart Game">
                <span class="ctrl-btn-icon">${ICONS.reload}</span>
                <span>Restart</span>
              </button>
              <button class="ctrl-btn" id="ctrl-theater-btn" title="Toggle Theater Mode">
                <span class="ctrl-btn-icon">${ICONS.theater}</span>
                <span>Theater</span>
              </button>
              <button class="ctrl-btn" id="ctrl-fullscreen-btn" title="Full Screen">
                <span class="ctrl-btn-icon">${ICONS.fullscreen}</span>
                <span>Full Screen</span>
              </button>
              <button class="ctrl-btn" id="ctrl-share-btn" title="Share Game Link">
                <span class="ctrl-btn-icon">${ICONS.share}</span>
                <span>Share</span>
              </button>
            </div>
          </div>

          <!-- Info Card & Controls -->
          <div class="game-info-card">
            <div class="game-info-header">
              <h1 class="game-info-title">${escapeHtml(game.title)}</h1>
              <div class="game-info-tags">
                <span class="info-tag tag-accent">${game.category}</span>
                <span class="info-tag">${game.technology || 'HTML5'}</span>
                <span class="info-tag">${game.developer || 'Verified Playable'}</span>
              </div>
            </div>

            <p class="game-info-desc">${escapeHtml(game.description)}</p>

            <div class="controls-guide-box">
              <div class="controls-guide-title">
                <span>${ICONS.gamepad}</span>
                <span>How to Play & Controls</span>
              </div>
              <div class="keycaps-list">
                <span class="keycap">W</span>
                <span class="keycap">A</span>
                <span class="keycap">S</span>
                <span class="keycap">D</span>
                <span class="keycap">Space</span>
                <span class="keycap">Arrow Keys</span>
                <span class="keycap">Touch / Mouse</span>
              </div>
              <p class="controls-guide-text">${escapeHtml(game.controls)}</p>
              ${game.instructions ? `<p class="controls-guide-text" style="margin-top: 8px;"><strong>Strategy & Overview:</strong> ${escapeHtml(game.instructions)}</p>` : ''}
            </div>
          </div>
        </div>

        <aside class="game-sidebar">
          <div class="sidebar-box">
            <h3 class="sidebar-box-title">You Might Also Like</h3>
            <div class="related-games-list">
              ${related.map(g => `
                <a href="#/game/${g.slug}" class="related-game-item">
                  <img src="${g.thumbnail || g.fallbackThumbnail}" class="related-thumb" alt="${escapeHtml(g.title)}" onerror="this.onerror=null; this.src='${g.fallbackThumbnail || 'assets/images/games/default-game.svg'}';" />
                  <div class="related-info">
                    <div class="related-title">${escapeHtml(g.title)}</div>
                    <div class="related-meta">${g.category} &bull; ${g.technology || 'HTML5'}</div>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>

          ${renderAdSlot('medium-rect')}
        </aside>
      </div>
    `;
  }

  // Category View
  function renderCategoryView(slug, currentFilter = 'all', sortBy = 'popular') {
    const category = getCategoryBySlug(slug);
    if (!category) {
      return `
        <div style="text-align: center; padding: 60px 20px;">
          <h1 style="font-size: 2rem; margin-bottom: 12px;">Category Not Found</h1>
          <a href="#/" class="btn-install" style="display: inline-block;">Return to Home</a>
        </div>
      `;
    }

    let games = gamesData.filter(g => 
      g.category.toLowerCase() === category.name.toLowerCase() ||
      g.category.toLowerCase() === category.slug.toLowerCase() ||
      (category.slug === 'racing' && (g.category.toLowerCase() === 'racing' || g.category.toLowerCase() === 'car')) ||
      (category.slug === 'pool' && g.category.toLowerCase() === 'pool') ||
      (category.slug === 'beauty' && g.category.toLowerCase() === 'beauty') ||
      (category.slug === 'board' && g.category.toLowerCase() === 'board') ||
      (category.slug === 'arcade' && (g.category.toLowerCase() === 'arcade' || g.category.toLowerCase() === 'casual')) ||
      (g.tags && g.tags.some(t => t.toLowerCase() === category.slug.toLowerCase()))
    );

    if (currentFilter === 'popular') games = games.filter(g => g.popular);
    else if (currentFilter === 'new') games = games.filter(g => g.badge === 'NEW');

    if (sortBy === 'title') games.sort((a, b) => a.title.localeCompare(b.title));

    return `
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${category.name} Games</span>
      </nav>

      <div class="game-section">
        <div class="section-shelf-header" style="margin-bottom: 24px;">
          <div class="section-shelf-title-wrap">
            <span class="cat-chip cat-chip-${category.slug}" style="width: 38px; height: 38px;">
              ${getCategoryIcon(category.slug)}
            </span>
            <h1 class="section-shelf-title">${category.name} Games</h1>
            <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">(${games.length} titles)</span>
          </div>
        </div>

        ${games.length > 0 ? `
          <div class="games-grid">
            ${games.map(g => renderGameCard(g)).join('')}
          </div>
        ` : `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 56px 24px; text-align: center;">
            <div style="font-size: 40px; margin-bottom: 12px;">🎮</div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">More ${category.name} Games Coming Soon</h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">We are continuously adding verified playable games to this catalog.</p>
            <a href="#/games" class="btn-install" style="display: inline-block;">Explore All Games</a>
          </div>
        `}
      </div>

      ${renderAdSlot('leaderboard')}
    `;
  }

  // All Games View
  function renderAllGamesView(filter = 'all', sort = 'popular', category = 'all') {
    let games = [...gamesData];
    if (category !== 'all') {
      games = games.filter(g => g.category.toLowerCase() === category.toLowerCase() || (g.tags && g.tags.some(t => t.toLowerCase() === category.toLowerCase())));
    }
    if (filter === 'popular') games = games.filter(g => g.popular);
    else if (filter === 'new') games = games.filter(g => g.badge === 'NEW');
    else if (filter === 'recent') {
      const recentIds = getRecentlyPlayed();
      if (recentIds.length > 0) {
        games = recentIds.map(id => gamesData.find(g => g.id === id || g.slug === id)).filter(Boolean);
      }
    }

    if (sort === 'title') games.sort((a, b) => a.title.localeCompare(b.title));

    return `
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">All Games</span>
      </nav>

      <div class="game-section">
        <div class="section-shelf-header" style="margin-bottom: 24px;">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #EFF6FF; color: #2563EB;">${ICONS.gamepad}</span>
            <h1 class="section-shelf-title">
              ${filter === 'popular' ? 'Popular Games' : (filter === 'recent' ? 'Recently Played' : (filter === 'new' ? 'New Games' : 'All 72 Games'))}
            </h1>
            <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">(${games.length} titles)</span>
          </div>
        </div>

        <div class="games-grid">
          ${games.map(g => renderGameCard(g)).join('')}
        </div>
      </div>

      ${renderAdSlot('leaderboard')}
    `;
  }

  // Favorites View
  function renderFavoritesView() {
    const favIds = getFavorites();
    const favGames = favIds.map(id => gamesData.find(g => g.id === id || g.slug === id)).filter(Boolean);

    return `
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Favorites</span>
      </nav>

      <div class="game-section">
        <div class="section-shelf-header" style="margin-bottom: 24px;">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #FFF1F2; color: #F43F5E;">${ICONS.favorites}</span>
            <h1 class="section-shelf-title">Your Favorite Games</h1>
            <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">(${favGames.length} saved)</span>
          </div>
        </div>

        ${favGames.length > 0 ? `
          <div class="games-grid">
            ${favGames.map(g => renderGameCard(g)).join('')}
          </div>
        ` : `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 56px 24px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 14px;">🤍</div>
            <h2 style="font-size: 1.35rem; margin-bottom: 8px;">No Favorites Saved Yet</h2>
            <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto 24px auto;">Click the heart icon on any game card to bookmark it here for quick access anytime!</p>
            <a href="#/" class="btn-install" style="display: inline-block;">Browse Popular Games</a>
          </div>
        `}
      </div>

      ${renderAdSlot('leaderboard')}
    `;
  }

  // Search Results View
  function renderSearchView(query = '', category = '') {
    const results = searchGames(query, category);

    return `
      <nav class="breadcrumbs">
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Search</span>
      </nav>

      <div class="game-section">
        <div class="section-shelf-header" style="margin-bottom: 24px;">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon" style="background: #EFF6FF; color: #2563EB;">${ICONS.search}</span>
            <h1 class="section-shelf-title">
              Search Results ${query ? `for "${escapeHtml(query)}"` : ''}
            </h1>
            <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">(${results.length} found)</span>
          </div>
        </div>

        ${results.length > 0 ? `
          <div class="games-grid">
            ${results.map(g => renderGameCard(g)).join('')}
          </div>
        ` : `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 56px 24px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 14px;">🔎</div>
            <h2 style="font-size: 1.35rem; margin-bottom: 8px;">No Games Found</h2>
            <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 24px auto;">We couldn't find any games matching "${escapeHtml(query)}". Try searching for "racing", "arcade", or "puzzle".</p>
            <a href="#/" class="btn-install" style="display: inline-block;">View All Games</a>
          </div>
        `}
      </div>

      ${renderAdSlot('leaderboard')}
    `;
  }

  // Static Views
  function renderAboutView() {
    return `
      <div style="max-width: 800px; margin: 0 auto;">
        <nav class="breadcrumbs">
          <a href="#/" class="breadcrumb-link">Home</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">About</span>
        </nav>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 36px;">
          <h1 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">About NexusPlay</h1>
          <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">
            NexusPlay is a clean, modern, high-speed HTML5 browser gaming platform. Our goal is to bring fast, friction-free web gaming to desktop and mobile players without forced downloads, heavy clutter, or annoying delays.
          </p>
          <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7;">
            All 72 game titles are verified, ensuring maximum performance, responsive mobile play, and zero friction.
          </p>
        </div>
      </div>
    `;
  }

  function renderContactView() {
    return `
      <div style="max-width: 700px; margin: 0 auto;">
        <nav class="breadcrumbs">
          <a href="#/" class="breadcrumb-link">Home</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">Contact</span>
        </nav>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 36px;">
          <h1 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">Developer & Contact</h1>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 24px;">Have questions, feedback, or want to submit your HTML5 game? Reach out to us below.</p>
          <form id="contact-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">Your Name</label>
              <input type="text" id="contact-name" required style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.92rem;" placeholder="John Doe" />
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">Email Address</label>
              <input type="email" id="contact-email" required style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.92rem;" placeholder="john@example.com" />
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;">Message</label>
              <textarea id="contact-message" required rows="4" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.92rem;" placeholder="Your message or game submission link..."></textarea>
            </div>
            <button type="submit" class="btn-install" style="align-self: flex-start; padding: 10px 24px;">Send Message</button>
          </form>
        </div>
      </div>
    `;
  }

  function renderPrivacyView() {
    return `
      <div style="max-width: 800px; margin: 0 auto;">
        <nav class="breadcrumbs">
          <a href="#/" class="breadcrumb-link">Home</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">Privacy Policy</span>
        </nav>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 36px;">
          <h1 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">Privacy Policy</h1>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">NexusPlay values your privacy. We do not require registration or track personal identifying information.</p>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">Favorite games and recently played history are stored strictly in your local web browser using standard LocalStorage.</p>
        </div>
      </div>
    `;
  }

  function renderTermsView() {
    return `
      <div style="max-width: 800px; margin: 0 auto;">
        <nav class="breadcrumbs">
          <a href="#/" class="breadcrumb-link">Home</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">Terms of Service</span>
        </nav>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 36px;">
          <h1 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">Terms of Service</h1>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">By using NexusPlay, you agree to access games for personal, non-commercial entertainment. All game trademarks belong to their respective developers and licensors.</p>
        </div>
      </div>
    `;
  }

  function renderNotFoundView() {
    return `
      <div style="text-align: center; padding: 70px 20px;">
        <div style="font-size: 56px; margin-bottom: 16px;">404</div>
        <h1 style="font-size: 1.8rem; margin-bottom: 8px;">Page Not Found</h1>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">The page you are looking for does not exist.</p>
        <a href="#/" class="btn-install" style="display: inline-block;">Return to Home</a>
      </div>
    `;
  }

  // --- ROUTER ---
  function updateActiveNav(hash) {
    const route = hash.split('?')[0] || '#/';
    
    document.querySelectorAll('.nav-pill').forEach(pill => {
      const target = pill.getAttribute('data-route');
      if (target === hash || (target === '#/' && (route === '#/' || route === '#'))) {
        pill.classList.add('active');
      } else if (target && target !== '#/' && hash.startsWith(target)) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    document.querySelectorAll('.category-nav-item').forEach(item => {
      const cat = item.getAttribute('data-category');
      if (hash.startsWith(`#/category/${cat}`)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function setMeta(title, description) {
    document.title = title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', description);
  }

  function router() {
    const appMain = document.getElementById('app-main');
    if (!appMain) return;

    const hash = window.location.hash || '#/';
    const [routePart, queryPart] = hash.split('?');
    const params = new URLSearchParams(queryPart || '');

    window.scrollTo({ top: 0, behavior: 'instant' });
    updateActiveNav(hash);

    if (routePart === '#/' || routePart === '#') {
      setMeta('NexusPlay - Play Free HTML5 Games Online | Instant Play', 'Play 72+ free online games on NexusPlay. Clean, simple, and instant browser gaming.');
      appMain.innerHTML = renderHomeView();
    } else if (routePart === '#/games') {
      const filter = params.get('filter') || 'all';
      const sort = params.get('sort') || 'popular';
      const category = params.get('category') || 'all';
      setMeta('All 72 Games - NexusPlay Catalog', 'Browse our complete catalog of free browser games.');
      appMain.innerHTML = renderAllGamesView(filter, sort, category);
    } else if (routePart.startsWith('#/game/')) {
      const slug = routePart.replace('#/game/', '').trim();
      const game = getGameBySlug(slug);
      if (game) setMeta(`${game.title} - Play Free Online on NexusPlay`, game.description);
      appMain.innerHTML = renderGameView(slug);
      initGamePlayerEvents();
    } else if (routePart.startsWith('#/category/')) {
      const slug = routePart.replace('#/category/', '').trim();
      const filter = params.get('filter') || 'all';
      const sort = params.get('sort') || 'popular';
      const cat = getCategoryBySlug(slug);
      if (cat) setMeta(`${cat.name} Games - Play Free on NexusPlay`, cat.description);
      appMain.innerHTML = renderCategoryView(slug, filter, sort);
    } else if (routePart === '#/favorites') {
      setMeta('My Favorite Games - NexusPlay', 'Your personal collection of saved favorite games.');
      appMain.innerHTML = renderFavoritesView();
    } else if (routePart === '#/search') {
      const query = params.get('q') || '';
      const category = params.get('category') || '';
      setMeta(`Search Games: ${query || 'All'} - NexusPlay`, 'Search and discover games across all categories.');
      appMain.innerHTML = renderSearchView(query, category);
    } else if (routePart === '#/about') {
      setMeta('About NexusPlay - Browser Gaming Platform', 'Learn about our mission.');
      appMain.innerHTML = renderAboutView();
    } else if (routePart === '#/contact') {
      setMeta('Contact & Game Submissions - NexusPlay', 'Get in touch with the NexusPlay team.');
      appMain.innerHTML = renderContactView();
      initContactEvents();
    } else if (routePart === '#/privacy') {
      setMeta('Privacy Policy - NexusPlay', 'Privacy policy for NexusPlay.');
      appMain.innerHTML = renderPrivacyView();
    } else if (routePart === '#/terms') {
      setMeta('Terms of Use - NexusPlay', 'Terms and conditions for playing games.');
      appMain.innerHTML = renderTermsView();
    } else {
      setMeta('404 Page Not Found - NexusPlay', 'The page you requested does not exist.');
      appMain.innerHTML = renderNotFoundView();
    }
  }

  // --- EVENT ATTACHMENTS ---

  // Sidebar Collapse and Mobile Drawer
  function initSidebarEvents() {
    const layout = document.getElementById('app-layout');
    const collapseBtn = document.getElementById('sidebar-collapse-btn');
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');

    try {
      if (localStorage.getItem(STORAGE_KEYS.SIDEBAR) === 'true' && layout && collapseBtn) {
        layout.classList.add('sidebar-collapsed');
      }
    } catch (e) {}

    if (collapseBtn && layout) {
      collapseBtn.addEventListener('click', () => {
        const isCollapsed = layout.classList.toggle('sidebar-collapsed');
        try {
          localStorage.setItem(STORAGE_KEYS.SIDEBAR, isCollapsed ? 'true' : 'false');
        } catch (e) {}
      });
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        document.body.classList.add('mobile-sidebar-open');
      });
    }

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', () => {
        document.body.classList.remove('mobile-sidebar-open');
      });
    }

    document.addEventListener('click', e => {
      if (e.target.closest('.nav-pill') || e.target.closest('.category-nav-item')) {
        document.body.classList.remove('mobile-sidebar-open');
      }
    });
  }

  // Header Search & Install
  function initHeaderEvents() {
    const searchInput = document.getElementById('header-search-input');
    const searchClear = document.getElementById('search-clear-btn');
    const suggestionsBox = document.getElementById('search-suggestions');
    const favCounter = document.getElementById('header-fav-count');
    const installBtn = document.getElementById('btn-install-app');

    subscribeState(() => {
      if (favCounter) favCounter.textContent = getFavorites().length;
    });

    // Keyboard shortcut: '/' focuses search bar
    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        if (searchInput) searchInput.focus();
      }
    });

    let debounceTimer = null;
    if (searchInput && suggestionsBox) {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (searchClear) searchClear.style.display = query ? 'block' : 'none';
        clearTimeout(debounceTimer);
        if (!query) {
          suggestionsBox.classList.remove('active');
          suggestionsBox.innerHTML = '';
          return;
        }

        debounceTimer = setTimeout(() => {
          const matches = searchGames(query);
          if (matches.length === 0) {
            suggestionsBox.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.88rem;">No games found for "<strong>${escapeHtml(query)}</strong>"</div>`;
          } else {
            suggestionsBox.innerHTML = matches.slice(0, 6).map(g => `
              <a href="#/game/${g.slug}" class="suggestion-item">
                <img src="${g.thumbnail || g.fallbackThumbnail}" class="suggestion-thumb" alt="${escapeHtml(g.title)}" onerror="this.onerror=null; this.src='${g.fallbackThumbnail || 'assets/images/games/default-game.svg'}';" />
                <div class="suggestion-info">
                  <div class="suggestion-title">${escapeHtml(g.title)}</div>
                  <div class="suggestion-meta">${g.category} &bull; ${g.technology || 'HTML5'}</div>
                </div>
              </a>
            `).join('') + `
              <a href="#/search?q=${encodeURIComponent(query)}" class="suggestion-item" style="justify-content: center; color: var(--accent-primary); font-weight: 700; font-size: 0.88rem; background: #F8FAFC;">
                View all results for "${escapeHtml(query)}" &rarr;
              </a>
            `;
          }
          suggestionsBox.classList.add('active');
        }, 120);
      });

      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            suggestionsBox.classList.remove('active');
            window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
          }
        } else if (e.key === 'Escape') {
          suggestionsBox.classList.remove('active');
        }
      });

      if (searchClear) {
        searchClear.addEventListener('click', () => {
          searchInput.value = '';
          searchClear.style.display = 'none';
          suggestionsBox.classList.remove('active');
          searchInput.focus();
        });
      }

      document.addEventListener('click', e => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
          suggestionsBox.classList.remove('active');
        }
      });
    }

    if (installBtn) {
      installBtn.addEventListener('click', () => {
        showToast('To install: click your browser menu (⋮) and select "Add to Home Screen" or "Install App"!', '📲');
      });
    }
  }

  // Floating Back to Top Button
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Global Favorite Clicks
  function initGlobalEvents() {
    document.addEventListener('click', e => {
      const favBtn = e.target.closest('.card-fav-btn');
      if (favBtn) {
        e.preventDefault();
        e.stopPropagation();
        const gameId = favBtn.dataset.favId;
        if (gameId) {
          const added = toggleFavorite(gameId);
          favBtn.classList.toggle('is-fav', added);
          showToast(added ? 'Saved to Favorites!' : 'Removed from Favorites', added ? '❤️' : '💔');
        }
      }
    });
  }

  // Game Player Events
  function initGamePlayerEvents() {
    const iframe = document.getElementById('game-iframe');
    const loader = document.getElementById('player-loader');
    const errorScreen = document.getElementById('player-error');
    const retryBtn = document.getElementById('player-retry-btn');
    const reloadBtn = document.getElementById('ctrl-reload-btn');
    const fullscreenBtn = document.getElementById('ctrl-fullscreen-btn');
    const theaterBtn = document.getElementById('ctrl-theater-btn');
    const shareBtn = document.getElementById('ctrl-share-btn');
    const favBtn = document.getElementById('ctrl-fav-btn');
    const playerContainer = document.getElementById('player-container');
    const gameLayout = document.getElementById('game-layout');

    if (iframe && loader) {
      iframe.addEventListener('load', () => loader.classList.add('hidden'));
      setTimeout(() => { if (loader) loader.classList.add('hidden'); }, 3000);
      iframe.addEventListener('error', () => {
        if (loader) loader.classList.add('hidden');
        if (errorScreen) errorScreen.classList.add('active');
      });
    }

    if (retryBtn && iframe && loader && errorScreen) {
      retryBtn.addEventListener('click', () => {
        errorScreen.classList.remove('active');
        loader.classList.remove('hidden');
        iframe.src = iframe.src;
      });
    }

    if (reloadBtn && iframe && loader) {
      reloadBtn.addEventListener('click', () => {
        loader.classList.remove('hidden');
        iframe.src = iframe.src;
        showToast('Restarting game session...', '🔄');
      });
    }

    if (fullscreenBtn && playerContainer) {
      fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          if (playerContainer.requestFullscreen) {
            playerContainer.requestFullscreen();
          } else if (playerContainer.webkitRequestFullscreen) {
            playerContainer.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });

      document.addEventListener('fullscreenchange', () => {
        const isFull = !!document.fullscreenElement;
        playerContainer.classList.toggle('is-fullscreen', isFull);
        fullscreenBtn.classList.toggle('active', isFull);
      });
    }

    if (theaterBtn && gameLayout) {
      theaterBtn.addEventListener('click', () => {
        const isTheater = gameLayout.classList.toggle('theater-mode');
        theaterBtn.classList.toggle('active', isTheater);
        theaterBtn.querySelector('span:last-child').textContent = isTheater ? 'Standard' : 'Theater';
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const url = window.location.href;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast('Game URL copied to clipboard!', '📋');
          });
        } else {
          showToast('Copy URL from your address bar!', '🔗');
        }
      });
    }

    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const gameId = favBtn.dataset.id;
        if (gameId) {
          const added = toggleFavorite(gameId);
          favBtn.classList.toggle('is-fav', added);
          favBtn.querySelector('span:last-child').textContent = added ? 'Favorited' : 'Favorite';
          showToast(added ? 'Added to Favorites!' : 'Removed from Favorites', added ? '❤️' : '💔');
        }
      });
    }
  }

  function initContactEvents() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        showToast(`Thank you, ${name}! Your message has been received.`, '✅');
        form.reset();
      });
    }
  }

  // --- BOOTSTRAP ---
  function init() {
    const appSidebar = document.getElementById('app-sidebar');
    const appHeader = document.getElementById('app-header');
    const appFooter = document.getElementById('app-footer');

    if (appSidebar) appSidebar.innerHTML = renderSidebar();
    if (appHeader) appHeader.innerHTML = renderHeader();
    if (appFooter) appFooter.innerHTML = renderFooter();

    initSidebarEvents();
    initHeaderEvents();
    initBackToTop();
    initGlobalEvents();

    router();
    window.addEventListener('hashchange', router);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

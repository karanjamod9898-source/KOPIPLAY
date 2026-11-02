const fs = require('fs');
const path = require('path');

const bundleScript = `/**
 * KopiPlay - Complete Modern Gaming Portal Bundle (Production Ready)
 * Dark gaming aesthetic, fully static, zero external backend dependencies
 */

(function () {
  'use strict';

  // --- SVG Icons Map for Categories and Navigation ---
  const SVG_ICONS = {
    'shooting': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>',
    'action': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'adventure': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>',
    'racing': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    'car': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    'driving': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>',
    'sports': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"/></svg>',
    'football': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6l3.5 2.5-1.3 4h-4.4l-1.3-4zM12 2v4M12 22v-4M2 12h4M22 12h-4"/></svg>',
    'puzzle': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c0-1.571-1.274-2.85-2.846-2.85s-2.846 1.279-2.846 2.85H9.5c0-1.571-1.274-2.85-2.846-2.85S3.808 6.279 3.808 7.85V11c1.571 0 2.846 1.274 2.846 2.846s-1.275 2.846-2.846 2.846v3.15c0 1.571 1.274 2.85 2.846 2.85H9.5c0-1.571 1.274-2.85 2.846-2.85s2.846 1.279 2.846 2.85h4.247c1.572 0 2.846-1.279 2.846-2.85V16.7c-1.572 0-2.846-1.274-2.846-2.846s1.274-2.846 2.846-2.846V7.85z"/></svg>',
    'strategy': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    'platform': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="16" width="18" height="4" rx="1"/><rect x="6" y="8" width="12" height="4" rx="1"/><circle cx="12" cy="4" r="2"/></svg>',
    'multiplayer': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'arcade': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="12" width="12" height="8" rx="2"/><circle cx="12" cy="8" r="3"/><line x1="12" y1="11" x2="12" y2="12"/><path d="M6 12H4a2 2 0 0 0-2 2v6h20v-6a2 2 0 0 0-2-2h-2"/></svg>',
    'simulation': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    'casual': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
    'kids-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5z"/></svg>',
    'beauty': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    'pool': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 10v4"/></svg>',
    'board-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
    'card-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="12" height="16" rx="2"/><rect x="8" y="6" width="12" height="16" rx="2"/></svg>',
    'clicker': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 15l6 6M9 9l6 6M12 3v6M3 12h6M6 6l3 3M18 6l-3 3M6 18l3-3"/></svg>',
    'io-games': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    'default': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="7" cy="12" r="1.5"/><circle cx="17" cy="12" r="1.5"/><path d="M12 8v8"/></svg>'
  };

  function getCategoryIcon(slug) {
    return SVG_ICONS[slug] || SVG_ICONS['default'];
  }

  // --- Category Classifier ---
  function matchCategories(game) {
    const text = ((game.title || '') + ' ' + (game.category || '') + ' ' + (game.description || '') + ' ' + ((game.tags || []).join(' '))).toLowerCase();
    const matched = [];

    if (/shoot|gun|sniper|cannon|fps|bullet|target|tank|space shooter|galaxy|missile|strike|invader|alien|zombie/i.test(text)) matched.push('shooting');
    if (/action|fight|combat|ninja|warrior|brawler|battle|smash|brawl|attack|survival|defense/i.test(text)) matched.push('action');
    if (/adventure|quest|escape|journey|explore|dungeon|tomb|odyssey|hero/i.test(text)) matched.push('adventure');
    if (/rac(e|ing)|speed|track|kart|moto|bike|rally|grand prix|lap|drift|formula/i.test(text)) matched.push('racing');
    if (/car|vehicle|auto|truck|bus|driver|drift|parking|supercar/i.test(text)) matched.push('car');
    if (/driv(e|ing)|pilot|fly|flight|traffic|road|steer|parking/i.test(text)) matched.push('driving');
    if (/sport|ball|soccer|football|basketball|tennis|cricket|golf|hockey|bowling|baseball|penalty/i.test(text)) matched.push('sports');
    if (/soccer|football|penalty|goal|fifa|kick|striker|premier/i.test(text)) matched.push('football');
    if (/puzzle|match|brain|connect|block|logic|sudoku|tile|mahjong|jewel|bubble|jigsaw|maze|2048|physics puzzle|word/i.test(text)) matched.push('puzzle');
    if (/strategy|tower|defense|chess|tactic|conquer|empire|commander|rts|clash|war/i.test(text)) matched.push('strategy');
    if (/platform|jump|hop|run|runner|parkour|climb|dash|fly|leap|frog/i.test(text)) matched.push('platform');
    if (/multiplayer|2 player|two player|online|pvp|co-op|versus|vs/i.test(text) || (game.features && game.features.includes('multiplayer'))) matched.push('multiplayer');
    if (/arcade|retro|classic|score|endless|pac|pinball|breakout|brick|pong|snake|flappy/i.test(text)) matched.push('arcade');
    if (/simulat(ion|or)|tycoon|virtual|manage|farm|build|city|craft|life/i.test(text)) matched.push('simulation');
    if (/casual|relax|easy|tap|pop|fun|simple|hypercasual|idle/i.test(text)) matched.push('casual');
    if (/kid|child|cute|coloring|draw|baby|animal|pet|puppy|kitty|farm/i.test(text)) matched.push('kids-games');
    if (/beauty|dress|makeup|fashion|salon|style|outfit|princess|hair|spa/i.test(text)) matched.push('beauty');
    if (/pool|billiard|snooker|8-ball|8 ball/i.test(text)) matched.push('pool');
    if (/board|chess|checkers|domino|backgammon|ludo|scrabble/i.test(text)) matched.push('board-games');
    if (/card|solitaire|poker|blackjack|spades|hearts|klondike|uno/i.test(text)) matched.push('card-games');
    if (/clicker|idle|tap|tapper|tycoon|incremental|upgrade/i.test(text)) matched.push('clicker');
    if (/\.io\b|io game|worm|slither|agar|arena/i.test(text)) matched.push('io-games');

    if (matched.length === 0) {
      const cat = (game.category || '').toLowerCase();
      if (cat.includes('shoot')) matched.push('shooting');
      else if (cat.includes('rac')) matched.push('racing');
      else if (cat.includes('action')) matched.push('action');
      else if (cat.includes('puzz')) matched.push('puzzle');
      else if (cat.includes('sport')) matched.push('sports');
      else if (cat.includes('arc')) matched.push('arcade');
      else matched.push('casual');
    }
    return [...new Set(matched)];
  }

  // --- Category Rich SEO Metadata Dictionary (Phase 4) ---
  const CATEGORY_SEO_DATA = {
    'shooting': {
      title: 'Play Free Shooting Games Online – KopiPlay',
      description: 'Play action-packed free online shooting games on KopiPlay. Aim, fire, and conquer sniper, tactical FPS, and space blaster browser games with no downloads.',
      intro: 'Welcome to the KopiPlay Shooting Games arena. Whether you favor precision sniper rifles, tactical space blasters, or defensive turret warfare, our shooting library delivers fast-paced target acquisition and reflex testing on both desktop and mobile.',
      faqs: [
        { q: 'Can I play shooting games on mobile without downloading an app?', a: 'Yes! All KopiPlay shooting games run directly in modern mobile browsers via HTML5 and WebGL.' },
        { q: 'What controls are used for browser shooting games?', a: 'Desktop games typically use mouse aiming with left-click to fire, alongside WASD/arrow keys for tactical movement. Touchscreens feature intuitive virtual controls.' },
        { q: 'Are these shooting games completely free?', a: 'Every shooting game on KopiPlay is 100% free with instant, unlimited play.' }
      ]
    },
    'action': {
      title: 'Play Free Action Games Online – KopiPlay',
      description: 'Jump into thrilling free online action games on KopiPlay. Experience combat, ninja duels, survival battles, and fast-paced brawlers instantly in your browser.',
      intro: 'KopiPlay Action Games bring heart-pounding combat, hero quests, and survival arenas straight to your screen. Challenge your reflexes across hand-to-hand combat, dodge hazards, and overcome enemy waves.',
      faqs: [
        { q: 'What makes action games on KopiPlay unique?', a: 'They load instantly with zero downloads, featuring smooth canvas animations, reactive audio, and full responsiveness.' },
        { q: 'Do action games support touch controls?', a: 'Yes, each action title is adapted for touch taps, swipes, and on-screen pads on smartphones and tablets.' },
        { q: 'Can I save my high scores or progress?', a: 'Scores and level progress are safely preserved locally in your browser storage.' }
      ]
    },
    'adventure': {
      title: 'Play Free Adventure Games Online – KopiPlay',
      description: 'Embark on epic free online adventure games on KopiPlay. Explore mysterious dungeons, solve quest puzzles, and journey across captivating digital worlds.',
      intro: 'Step into immersive journeys and mysterious labyrinths with KopiPlay Adventure Games. Uncover secrets, solve ancient mechanisms, and steer brave adventurers through exciting storylines.',
      faqs: [
        { q: 'Are adventure games suitable for all ages?', a: 'Our adventure catalog features family-friendly puzzle quests, fantasy explorations, and rich storytelling.' },
        { q: 'Can I play adventure games on tablet or iPad?', a: 'Absolutely. Responsive aspect ratios ensure full viewability on touch tablets and iPads.' }
      ]
    },
    'racing': {
      title: 'Explore Free Racing Games – KopiPlay',
      description: 'Race at top speeds with free online racing games on KopiPlay. Drift through city tracks, burn rubber on highways, and master precision vehicle control.',
      intro: 'Feel the adrenaline of competition in KopiPlay Racing Games. From neon synthwave highways to off-road dirt tracks, accelerate past rivals and clock record lap times.',
      faqs: [
        { q: 'Do racing games work with keyboard arrow keys?', a: 'Yes, desktop players can steer with Arrow keys or WASD, with Spacebar for nitro or handbrake.' },
        { q: 'Are there 3D racing games available?', a: 'Yes, multiple titles feature smooth 3D canvas and WebGL simulation engines.' }
      ]
    },
    'car': {
      title: 'Play Free Car Games Online – KopiPlay',
      description: 'Enjoy free car games online on KopiPlay. Test your skills with precision parking, highway traffic dodging, stunt driving, and custom supercars.',
      intro: 'Get behind the wheel in KopiPlay Car Games. Master parking challenges, navigate dense city traffic, or test horsepower across high-octane stunt courses.',
      faqs: [
        { q: 'What types of car games are featured?', a: 'We offer precision parking simulators, highway traffic runners, stunt obstacle courses, and drift arenas.' },
        { q: 'Is there any download or installation required?', a: 'No, all car games run instantly inside your web browser.' }
      ]
    },
    'driving': {
      title: 'Free Driving Simulators & Road Games – KopiPlay',
      description: 'Experience realistic free online driving games on KopiPlay. Steer buses, pilot aircraft, navigate traffic highways, and test vehicle handling.',
      intro: 'Take control of diverse vehicles in KopiPlay Driving Games. From airport flight simulators to city transit navigation, experience satisfying vehicular control.',
      faqs: [
        { q: 'Are driving games optimized for mobile devices?', a: 'Yes, on-screen steering controls and touch acceleration pedals are fully integrated.' }
      ]
    },
    'sports': {
      title: 'Discover Sports Games Free Online – KopiPlay',
      description: 'Play free online sports games on KopiPlay. Compete in football, basketball, tennis, bowling, and golf with realistic physics and instant gameplay.',
      intro: 'Step onto the field, court, and green with KopiPlay Sports Games. Score game-winning three-pointers, bend free kicks, and conquer athletic tournaments.',
      faqs: [
        { q: 'Are multiplayer sports games supported?', a: 'Yes, select sports titles support local 2-player turn-based or simultaneous competitive matches.' }
      ]
    },
    'football': {
      title: 'Play Free Football & Soccer Games – KopiPlay',
      description: 'Score epic goals in free online football games on KopiPlay. Master penalty shootouts, tournament championships, and striker headers.',
      intro: 'Experience the world’s favorite sport in KopiPlay Football Games. Beat the goalkeeper, execute curving free kicks, and lift tournament trophies.',
      faqs: [
        { q: 'How do penalty kick controls work?', a: 'Simply swipe or drag your cursor to aim power and curve directly into the goal corners.' }
      ]
    },
    'puzzle': {
      title: 'Play Puzzle Games Online Free – KopiPlay',
      description: 'Challenge your mind with free online puzzle games on KopiPlay. Solve logic grids, sliding tiles, block puzzles, 2048, and match-3 brain teasers.',
      intro: 'Sharpen your cognitive skills with KopiPlay Puzzle Games. Engage in relaxing block placements, strategic tile-matching, and intricate spatial brain teasers.',
      faqs: [
        { q: 'Are puzzle games good for brain training?', a: 'Yes, games like 2048, Sudoku, and spatial block puzzles exercise logic, memory, and concentration.' }
      ]
    },
    'strategy': {
      title: 'Free Strategy & Tactical Games – KopiPlay',
      description: 'Outsmart opponents in free online strategy games on KopiPlay. Command armies, deploy tower defenses, and master tactical board maneuvers.',
      intro: 'Plan your victory step-by-step with KopiPlay Strategy Games. Defend strongholds against invading waves, allocate resources, and checkmate rivals.',
      faqs: [
        { q: 'Are tower defense games included?', a: 'Yes, our strategy library features tower defense titles with tactical upgrade paths.' }
      ]
    },
    'platform': {
      title: 'Play Free Platformer Games Online – KopiPlay',
      description: 'Jump, dash, and run through free online platform games on KopiPlay. Overcome traps, leap across moving platforms, and reach the finish flag.',
      intro: 'Experience pure timing and agile jumps in KopiPlay Platform Games. Hop over hazards, collect glowing gems, and discover hidden shortcuts.',
      faqs: [
        { q: 'Can I play platformers with a keyboard spacebar?', a: 'Yes, Spacebar or Up Arrow performs jumps, with Left/Right keys controlling movement.' }
      ]
    },
    'multiplayer': {
      title: 'Play Free Multiplayer Games Online – KopiPlay',
      description: 'Play free online multiplayer and 2-player games on KopiPlay. Challenge friends on the same device or face rivals in arena battles.',
      intro: 'Gaming is best together! KopiPlay Multiplayer Games offer 2-player shared screen matches, competitive sports duels, and cooperative challenges.',
      faqs: [
        { q: 'How do 2-player games work on one keyboard?', a: 'Player 1 uses WASD while Player 2 uses the Arrow keys, ensuring seamless simultaneous play.' }
      ]
    },
    'arcade': {
      title: 'Classic & Modern Arcade Games – KopiPlay',
      description: 'Relive retro thrills with free online arcade games on KopiPlay. Play Snake, Breakout, high-score runners, and neon reflex games.',
      intro: 'Step into the neon glow of KopiPlay Arcade Games. Enjoy instant high-score chasing, retro brick deflectors, and endless arcade classics.',
      faqs: [
        { q: 'Do arcade games track local high scores?', a: 'Yes, high scores are stored locally in your browser so you can beat your personal best.' }
      ]
    },
    'simulation': {
      title: 'Free Simulation Games Online – KopiPlay',
      description: 'Build, manage, and experience life simulations in free online games on KopiPlay. Run restaurants, manage virtual farms, and pilot crafts.',
      intro: 'Immerse yourself in virtual systems with KopiPlay Simulation Games. Craft efficient businesses, cultivate digital farms, and test engineering builds.',
      faqs: [
        { q: 'Are simulation games relaxing to play?', a: 'Many simulation games are designed for relaxing, low-pressure creative and management gameplay.' }
      ]
    },
    'casual': {
      title: 'Play Casual Games Free Online – KopiPlay',
      description: 'Unwind with fun and relaxing casual games on KopiPlay. Quick, easy-to-learn browser games for satisfying instant entertainment.',
      intro: 'Take a quick break with KopiPlay Casual Games. Designed with intuitive controls and immediate satisfaction, jump in for two minutes or two hours.',
      faqs: [
        { q: 'Do casual games require tutorials?', a: 'No, every casual game is designed with pick-up-and-play simplicity and zero learning curves.' }
      ]
    },
    'kids-games': {
      title: 'Fun & Safe Kids Games Online – KopiPlay',
      description: 'Play safe, kid-friendly free online games on KopiPlay. Enjoy coloring, cute animal adventures, educational puzzles, and gentle fun.',
      intro: 'Delightful entertainment for younger players! KopiPlay Kids Games feature colorful animation, friendly pets, drawing activities, and gentle puzzles.',
      faqs: [
        { q: 'Are kids games safe and family-friendly?', a: 'Yes, games in this category are curated for positive, non-violent, family-friendly fun.' }
      ]
    },
    'beauty': {
      title: 'Free Dress-Up & Fashion Games – KopiPlay',
      description: 'Unleash your creativity with free online fashion, makeup, and beauty games on KopiPlay. Style royal outfits and create chic makeovers.',
      intro: 'Design runway looks and royal styles in KopiPlay Beauty Games. Choose elegant gowns, experiment with makeup palettes, and express fashion creativity.',
      faqs: [
        { q: 'Can I save or take a snapshot of my designs?', a: 'You can easily view full-screen outfits and screenshot your creations on any device.' }
      ]
    },
    'pool': {
      title: 'Play Free 8-Ball & Billiards Games – KopiPlay',
      description: 'Sink 8-ball stripes and solids in free online pool games on KopiPlay. Experience accurate cue ball physics and table angles.',
      intro: 'Chalk your cue in KopiPlay Pool Games. Line up trick shots, calculate cushion rebounds, and master classic 8-Ball and Snooker tables.',
      faqs: [
        { q: 'How is shot power controlled?', a: 'Click and pull back the cue stick with your mouse or finger, releasing when power reaches your target.' }
      ]
    },
    'board-games': {
      title: 'Free Classic Board Games Online – KopiPlay',
      description: 'Play Chess, Checkers, Ludo, and classic board games free on KopiPlay. Challenge computer AI or practice strategic moves.',
      intro: 'Timeless tabletop strategy awaits in KopiPlay Board Games. Play Chess, Ludo, and Dominoes anytime without needing physical pieces.',
      faqs: [
        { q: 'Can I play Chess against different AI difficulties?', a: 'Yes, our chess titles feature multiple skill levels to match beginners and masters alike.' }
      ]
    },
    'card-games': {
      title: 'Free Solitaire & Card Games – KopiPlay',
      description: 'Play Solitaire, Klondike, Spider, and classic card games free on KopiPlay. Enjoy smooth card deals, hints, and undo moves.',
      intro: 'Shuffle the deck in KopiPlay Card Games. Relax with classic Klondike Solitaire, test patience in Spider, or clear card pyramids with undo features.',
      faqs: [
        { q: 'Does Solitaire offer unlimited undos?', a: 'Yes, our Solitaire games support free undo moves and helpful card hints.' }
      ]
    },
    'clicker': {
      title: 'Play Idle & Clicker Games Free – KopiPlay',
      description: 'Tap, upgrade, and build empires with free online clicker games on KopiPlay. Enjoy exponential progression and satisfying idle unlocks.',
      intro: 'Watch numbers multiply in KopiPlay Clicker Games. Tap for revenue, purchase automated upgrades, and build thriving idle businesses.',
      faqs: [
        { q: 'Does idle progress continue when I switch tabs?', a: 'Yes, clicker games store your progression and calculate offline returns upon return.' }
      ]
    },
    'io-games': {
      title: 'Free .io Games & Arena Battles – KopiPlay',
      description: 'Survive and dominate competitive battle arenas in free .io games on KopiPlay. Grow your champion, outmaneuver rivals, and lead the scoreboard.',
      intro: 'Jump into fast-paced survival rings in KopiPlay .io Games. Eat power nodes, grow in size, and outsmart rivals in non-stop browser arenas.',
      faqs: [
        { q: 'Are .io games fast to join?', a: 'Yes, simply enter and you are instantly spawned into the active arena with zero queues.' }
      ]
    }
  };


  // --- Centralized Site Configuration ---
  const SITE_CONFIG = {
    brandName: 'KopiPlay',
    tagline: 'Play More. Discover More.',
    category: 'Free Online Games',
    description: 'KopiPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports.',
    homepageTitle: 'KopiPlay – Play Free Online Games',
    homepageDescription: 'Discover KopiPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.',
    productionDomain: 'https://kipo.in'
  };

  const STORAGE_KEYS = {
    favorites: 'kopiplay_favorites',
    recentlyPlayed: 'kopiplay_recent',
    sortPref: 'kopiplay_sort_pref',
    sidebarCollapsed: 'kopiplay_sidebar_collapsed',
    reports: 'kopiplay_game_reports',
    messages: 'kopiplay_contact_messages',
    // Legacy keys for safe migration and backward compatibility
    legacyFavorites: 'nexus_favorites',
    legacyFavoritesAlt: 'nexusplay_favorites',
    legacyRecent: 'nexus_recently_played',
    legacyRecentAlt: 'nexusplay_recent',
    legacySort: 'nexus_sort_pref',
    legacySidebar: 'nexus_sidebar_collapsed',
    legacyReports: 'nexus_game_reports',
    legacyMessages: 'nexus_contact_messages'
  };

  function migrateStorage() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.favorites)) {
        const oldFav = localStorage.getItem(STORAGE_KEYS.legacyFavorites) || localStorage.getItem(STORAGE_KEYS.legacyFavoritesAlt);
        if (oldFav) localStorage.setItem(STORAGE_KEYS.favorites, oldFav);
      }
      if (!localStorage.getItem(STORAGE_KEYS.recentlyPlayed)) {
        const oldRec = localStorage.getItem(STORAGE_KEYS.legacyRecent) || localStorage.getItem(STORAGE_KEYS.legacyRecentAlt);
        if (oldRec) localStorage.setItem(STORAGE_KEYS.recentlyPlayed, oldRec);
      }
      if (!localStorage.getItem(STORAGE_KEYS.sortPref)) {
        const oldSort = localStorage.getItem(STORAGE_KEYS.legacySort);
        if (oldSort) localStorage.setItem(STORAGE_KEYS.sortPref, oldSort);
      }
      if (!localStorage.getItem(STORAGE_KEYS.sidebarCollapsed)) {
        const oldSb = localStorage.getItem(STORAGE_KEYS.legacySidebar);
        if (oldSb) localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, oldSb);
      }
    } catch (e) {}
  }

  // --- Application State ---
  let catalog = [];
  let categoryList = [];
  let categoryCounts = {};
  let favorites = [];
  let recentlyPlayed = [];

  function loadLocalState() {
    migrateStorage();
    try {
      const rawFav = localStorage.getItem(STORAGE_KEYS.favorites) || 
                     localStorage.getItem(STORAGE_KEYS.legacyFavorites) || 
                     localStorage.getItem(STORAGE_KEYS.legacyFavoritesAlt) || '[]';
      favorites = JSON.parse(rawFav);
      const rawRec = localStorage.getItem(STORAGE_KEYS.recentlyPlayed) || 
                     localStorage.getItem(STORAGE_KEYS.legacyRecent) || 
                     localStorage.getItem(STORAGE_KEYS.legacyRecentAlt) || '[]';
      recentlyPlayed = JSON.parse(rawRec);
    } catch (e) {
      favorites = [];
      recentlyPlayed = [];
    }
  }

  function toggleFavorite(slug) {
    const idx = favorites.indexOf(slug);
    const added = idx === -1;
    if (added) {
      favorites.push(slug);
      nexusAnalytics.track('favorite_added', { slug });
      showToast('Added to My Favorites!', '♥');
    } else {
      favorites.splice(idx, 1);
      showToast('Removed from Favorites', '♡');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
      localStorage.setItem(STORAGE_KEYS.legacyFavorites, JSON.stringify(favorites));
      localStorage.setItem(STORAGE_KEYS.legacyFavoritesAlt, JSON.stringify(favorites));
    } catch (e) {}
    updateHeaderAndSidebarBadges();
    return favorites.includes(slug);
  }

  function addRecentlyPlayed(slug) {
    recentlyPlayed = recentlyPlayed.filter(s => s !== slug);
    recentlyPlayed.unshift(slug);
    if (recentlyPlayed.length > 30) recentlyPlayed.pop();
    try {
      localStorage.setItem(STORAGE_KEYS.recentlyPlayed, JSON.stringify(recentlyPlayed));
      localStorage.setItem(STORAGE_KEYS.legacyRecent, JSON.stringify(recentlyPlayed));
      localStorage.setItem(STORAGE_KEYS.legacyRecentAlt, JSON.stringify(recentlyPlayed));
    } catch (e) {}
    updateHeaderAndSidebarBadges();
  }

  function updateHeaderAndSidebarBadges() {
    const favHeader = document.getElementById('headerFavCount');
    if (favHeader) favHeader.textContent = favorites.length;

    const favSidebar = document.getElementById('favBadgeCount');
    if (favSidebar) favSidebar.textContent = favorites.length;

    const recentSidebar = document.getElementById('recentBadgeCount');
    if (recentSidebar) recentSidebar.textContent = recentlyPlayed.length;
  }

  function computeCategoryCounts() {
    categoryCounts = {};
    categoryList.forEach(c => categoryCounts[c.slug] = 0);

    catalog.forEach(game => {
      const cats = matchCategories(game);
      game._categories = cats;
      cats.forEach(slug => {
        categoryCounts[slug] = (categoryCounts[slug] || 0) + 1;
      });
    });
  }

  // --- Utility Functions ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeUrl(url) {
    if (!url) return '';
    const trimmed = String(url).trim();
    if (trimmed.startsWith('games/') || trimmed.startsWith('./games/') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return '';
  }

  function showToast(message, icon = '✓') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = \`<span style="font-size:1.1rem; color:#38BDF8;">\${icon}</span><span>\${escapeHtml(message)}</span>\`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Tactile 3D Keycap Formatter & Category Quick Bar ---
  function formatControlsKeycaps(text) {
    if (!text) return '';
    return escapeHtml(text)
      .replace(/\bWASD\b/g, '<kbd class="keycap">W</kbd><kbd class="keycap">A</kbd><kbd class="keycap">S</kbd><kbd class="keycap">D</kbd>')
      .replace(/\bArrow Keys\b/gi, '<kbd class="keycap">↑</kbd><kbd class="keycap">↓</kbd><kbd class="keycap">←</kbd><kbd class="keycap">→</kbd>')
      .replace(/\bSpacebar\b/gi, '<kbd class="keycap">Space</kbd>')
      .replace(/\bSpace\b/g, '<kbd class="keycap">Space</kbd>')
      .replace(/\bMouse\b/gi, '<kbd class="keycap">Mouse</kbd>')
      .replace(/\bEnter\b/gi, '<kbd class="keycap">Enter</kbd>')
      .replace(/\bShift\b/gi, '<kbd class="keycap">Shift</kbd>');
  }

  function renderCategoryQuickBar(activeSlug = null) {
    const quickCategories = [
      { slug: 'popular', name: 'Popular', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg>', href: '#/popular' },
      { slug: 'shooting', name: 'Shooting', icon: SVG_ICONS['shooting'] || '', href: '#/category/shooting' },
      { slug: 'racing', name: 'Racing', icon: SVG_ICONS['racing'] || '', href: '#/category/racing' },
      { slug: 'puzzle', name: 'Puzzle', icon: SVG_ICONS['puzzle'] || '', href: '#/category/puzzle' },
      { slug: 'action', name: 'Action', icon: SVG_ICONS['action'] || '', href: '#/category/action' },
      { slug: 'sports', name: 'Sports', icon: SVG_ICONS['sports'] || '', href: '#/category/sports' },
      { slug: 'multiplayer', name: 'Multiplayer', icon: SVG_ICONS['multiplayer'] || '', href: '#/category/multiplayer' },
      { slug: 'arcade', name: 'Arcade', icon: SVG_ICONS['arcade'] || '', href: '#/category/arcade' },
      { slug: 'car', name: 'Cars', icon: SVG_ICONS['car'] || '', href: '#/category/car' },
      { slug: 'adventure', name: 'Adventure', icon: SVG_ICONS['adventure'] || '', href: '#/category/adventure' }
    ];

    return \`
      <div class="category-quick-bar" aria-label="Quick Category Filter">
        \${quickCategories.map(c => \`
          <a href="\${c.href}" class="category-quick-pill \${activeSlug === c.slug ? 'active' : ''}">
            <span>\${c.icon}</span>
            <span>\${c.name}</span>
          </a>
        \`).join('')}
      </div>
    \`;
  }

  // --- Google AdSense Engine (Prepared, Inactive by Default) ---
  const ADS_CONFIG = {
    enabled: false,
    client: '',
    slots: {
      homeLeaderboard: '',
      categoryBanner: '',
      gameSidebar: '',
      gameFooter: ''
    }
  };

  const nexusAds = {
    init: function (config) {
      if (config && typeof config === 'object') {
        Object.assign(ADS_CONFIG, config);
      }
    },
    renderSlot: function (slotName) {
      if (!ADS_CONFIG.enabled || !ADS_CONFIG.client || !ADS_CONFIG.slots[slotName]) {
        return '';
      }
      return \`
        <div class="nexus-ad-slot-wrap" data-slot="\${escapeHtml(slotName)}" style="margin: 20px 0; text-align: center;">
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="\${escapeHtml(ADS_CONFIG.client)}"
               data-ad-slot="\${escapeHtml(ADS_CONFIG.slots[slotName])}"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      \`;
    }
  };

  // --- Analytics Engine (Configurable, Zero Tracking when Disabled) ---
  const ANALYTICS_CONFIG = {
    enabled: false,
    measurementId: ''
  };

  const nexusAnalytics = {
    init: function (config) {
      if (config && typeof config === 'object') {
        Object.assign(ANALYTICS_CONFIG, config);
      }
    },
    track: function (eventName, params = {}) {
      if (!ANALYTICS_CONFIG.enabled) return;
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }
    }
  };

  // --- Dynamic SEO Metadata & Schema Manager ---
  function updateSeo({ title, description, canonical, ogType, ogImage, schema }) {
    if (title) {
      document.title = title;
      const metaTitle = document.querySelector('meta[name="title"]');
      if (metaTitle) metaTitle.setAttribute('content', title);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
      const twTitle = document.querySelector('meta[property="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', title);
    }
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
      const twDesc = document.querySelector('meta[property="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', description);
    }
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', canonical);
      const twUrl = document.querySelector('meta[property="twitter:url"]');
      if (twUrl) twUrl.setAttribute('content', canonical);
    }
    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', ogImage);
      const twImg = document.querySelector('meta[property="twitter:image"]');
      if (twImg) twImg.setAttribute('content', ogImage);
    }
    if (ogType) {
      const ogT = document.querySelector('meta[property="og:type"]');
      if (ogT) ogT.setAttribute('content', ogType);
    }
    if (schema) {
      const schemaScript = document.getElementById('kopi-schema') || document.getElementById('nexus-schema');
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schema, null, 2);
      }
    }
  }

  // --- Render Sidebar ---
  function renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = \`
      <div class="sidebar-header">
        <a href="#/" class="sidebar-brand" aria-label="KopiPlay Home">
          <svg class="gamepad-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="12" x2="10" y2="12"></line>
            <line x1="8" y1="10" x2="8" y2="14"></line>
            <line x1="15" y1="13" x2="15.01" y2="13"></line>
            <line x1="18" y1="11" x2="18.01" y2="11"></line>
            <rect x="2" y="6" width="20" height="12" rx="6"></rect>
          </svg>
          <span class="brand-text">KopiPlay</span>
        </a>
        <button class="sidebar-close-btn" id="sidebarCloseBtn" aria-label="Close Menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="sidebar-content">
        <a href="#/" class="drawer-nav-item active-pill" data-route="home">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Home</span>
          </div>
        </a>

        <a href="#/games" class="drawer-nav-item" data-route="games">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>All Games</span>
          </div>
          <span class="category-nav-count">\${catalog.length}</span>
        </a>

        <a href="#/games" class="drawer-nav-item" data-route="categories">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            <span>Categories</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>

        <a href="#/favorites" class="drawer-nav-item" data-route="favorites">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>Favorites</span>
          </div>
          <span class="category-nav-count">\${favorites.length}</span>
        </a>

        <a href="#/recent" class="drawer-nav-item" data-route="recent">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Recently Played</span>
          </div>
        </a>

        <hr class="drawer-divider">

        <a href="#/about" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>About Us</span>
          </div>
        </a>

        <a href="#/contact" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>Contact</span>
          </div>
        </a>

        <a href="#/privacy" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Privacy Policy</span>
          </div>
        </a>

        <a href="#/terms" class="drawer-nav-item">
          <div class="drawer-nav-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Terms of Use</span>
          </div>
        </a>
      </div>
    \`;

    const closeBtn = document.getElementById('sidebarCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.body.classList.remove('mobile-sidebar-open');
      });
    }
  }

  function renderHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    header.innerHTML = \`
      <div class="header-inner">
        <div class="header-left">
          <a href="#/" class="header-logo" aria-label="KopiPlay Home">
            <svg class="header-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="6" y1="12" x2="10" y2="12"></line>
              <line x1="8" y1="10" x2="8" y2="14"></line>
              <line x1="15" y1="13" x2="15.01" y2="13"></line>
              <line x1="18" y1="11" x2="18.01" y2="11"></line>
              <rect x="2" y="6" width="20" height="12" rx="6"></rect>
            </svg>
            <span class="header-logo-text">KopiPlay</span>
          </a>
          <nav class="header-nav" aria-label="Primary Navigation">
            <a href="#/" class="nav-pill active" id="navHomePill">Home</a>
            <a href="#/games" class="nav-link">All Games</a>
            <div class="header-dropdown">
              <a href="#/games" class="nav-link">
                Categories
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <div class="dropdown-menu">
                <a href="#/category/action" class="dropdown-item">Action</a>
                <a href="#/category/racing" class="dropdown-item">Racing</a>
                <a href="#/category/puzzle" class="dropdown-item">Puzzle</a>
                <a href="#/category/shooting" class="dropdown-item">Shooting</a>
                <a href="#/category/sports" class="dropdown-item">Sports</a>
                <a href="#/category/arcade" class="dropdown-item">Arcade</a>
                <a href="#/category/adventure" class="dropdown-item">Adventure</a>
              </div>
            </div>
          </nav>
        </div>

        <div class="header-search">
          <div class="search-input-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="search-input" id="globalSearchInput" placeholder="Search games..." autocomplete="off" aria-label="Search games">
            <button class="search-clear-btn" id="searchClearBtn" aria-label="Clear Search"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
          <div class="search-suggestions" id="searchSuggestions"></div>
        </div>

        <div class="header-right">
          <button class="mobile-search-toggle" id="mobileSearchToggle" aria-label="Open Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <a href="#/favorites" class="header-action-btn" title="Favorites">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="action-text">Favorites</span>
            <span class="header-badge" id="headerFavBadge" style="\${favorites.length > 0 ? '' : 'display:none;'}">\${favorites.length}</span>
          </a>
          <a href="#/recent" class="header-action-btn" title="Recent Games">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span class="action-text">Recent</span>
          </a>
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open Navigation Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    \`;

    initSearchEvents();
  }

    function renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;

    footer.innerHTML = \`
      <div class="footer-container">
        <div class="footer-top">
          <!-- Column 1: KopiPlay Brand -->
          <div class="footer-brand">
            <a href="#/" class="footer-logo" aria-label="KopiPlay Home">
              <svg class="footer-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="6" y1="12" x2="10" y2="12"></line>
                <line x1="8" y1="10" x2="8" y2="14"></line>
                <line x1="15" y1="13" x2="15.01" y2="13"></line>
                <line x1="18" y1="11" x2="18.01" y2="11"></line>
                <rect x="2" y="6" width="20" height="12" rx="6"></rect>
              </svg>
              <span class="footer-logo-text">KopiPlay</span>
            </a>
            <p>KopiPlay is an online gaming portal where players discover and enjoy free, high-performance browser-based games. Instant play on desktop, tablet, and mobile with zero downloads.</p>
            <div class="footer-brand-badge">
              <span class="pulse-dot"></span>
              <span>\${catalog.length} Free Games &bull; Instant Play</span>
            </div>
          </div>

          <!-- Column 2: Explore Games -->
          <div class="footer-col">
            <h4>Explore Games</h4>
            <ul class="footer-links">
              <li><a href="#/games" class="footer-link">All Games (\${catalog.length})</a></li>
              <li><a href="#/popular" class="footer-link">Popular Games</a></li>
              <li><a href="#/new" class="footer-link">New Releases</a></li>
              <li><a href="#/recent" class="footer-link">Recently Played</a></li>
              <li><a href="#/favorites" class="footer-link">Favorites</a></li>
            </ul>
          </div>

          <!-- Column 3: Popular Categories -->
          <div class="footer-col">
            <h4>Popular Categories</h4>
            <ul class="footer-links">
              <li><a href="#/category/shooting" class="footer-link">Shooting Games</a></li>
              <li><a href="#/category/action" class="footer-link">Action Games</a></li>
              <li><a href="#/category/adventure" class="footer-link">Adventure Games</a></li>
              <li><a href="#/category/racing" class="footer-link">Racing Games</a></li>
              <li><a href="#/category/puzzle" class="footer-link">Puzzle Games</a></li>
              <li><a href="#/category/sports" class="footer-link">Sports Games</a></li>
              <li><a href="#/category/arcade" class="footer-link">Arcade Games</a></li>
            </ul>
          </div>

          <!-- Column 4: Trust & Legal -->
          <div class="footer-col">
            <h4>Trust & Legal</h4>
            <ul class="footer-links">
              <li><a href="#/about" class="footer-link">About Us</a></li>
              <li><a href="#/contact" class="footer-link">Contact & Support</a></li>
              <li><a href="#/privacy" class="footer-link">Privacy Policy</a></li>
              <li><a href="#/terms" class="footer-link">Terms of Service</a></li>
              <li><a href="#/dmca" class="footer-link">DMCA & Copyright</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            &copy; 2026 KopiPlay. All rights reserved. Free Browser Gaming Platform.
          </div>
          <div class="footer-legal-links">
            <a href="#/about" class="footer-bottom-link">About Us</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/privacy" class="footer-bottom-link">Privacy Policy</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/terms" class="footer-bottom-link">Terms of Service</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/dmca" class="footer-bottom-link">DMCA</a>
            <span class="footer-bottom-sep">&bull;</span>
            <a href="#/contact" class="footer-bottom-link">Contact</a>
          </div>
        </div>
      </div>
    \`;
  }

  function initSearchEvents() {
    const input = document.getElementById('globalSearchInput');
    const suggestions = document.getElementById('searchSuggestions');
    const clearBtn = document.getElementById('searchClearBtn');
    if (!input || !suggestions) return;

    let debounceTimer = null;

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

      clearTimeout(debounceTimer);
      if (!q) {
        suggestions.classList.remove('active');
        suggestions.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        const matches = catalog.filter(g => {
          return (g.title || '').toLowerCase().includes(q) ||
                 (g.category || '').toLowerCase().includes(q) ||
                 (g.tags || []).some(t => t.toLowerCase().includes(q));
        }).slice(0, 8);

        if (matches.length === 0) {
          suggestions.innerHTML = '<div style="padding:14px; text-align:center; color:var(--text-muted); font-size:0.86rem;">No games found for "' + escapeHtml(q) + '"</div>';
        } else {
          suggestions.innerHTML = matches.map(g => \`
            <a href="#/game/\${g.slug}" class="suggestion-item" onclick="document.getElementById('searchSuggestions').classList.remove('active')">
              <img class="suggestion-thumb" src="\${g.thumbnail}" alt="\${escapeHtml(g.title)}" width="48" height="32" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="suggestion-info">
                <div class="suggestion-title">\${escapeHtml(g.title)}</div>
                <div class="suggestion-cat">\${escapeHtml(g.category || 'Arcade')}</div>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:#38BDF8; padding:3px 8px; border-radius:4px; background:rgba(56,189,248,0.1);">PLAY</span>
            </a>
          \`).join('');
        }
        suggestions.classList.add('active');
      }, 120);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        suggestions.classList.remove('active');
        input.focus();
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (q) {
          suggestions.classList.remove('active');
          window.location.hash = '#/games?q=' + encodeURIComponent(q);
          nexusAnalytics.track('search_used', { query: q });
        }
      } else if (e.key === 'Escape') {
        suggestions.classList.remove('active');
      }
    });

    // Global keyboard shortcut '/' to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        suggestions.classList.remove('active');
      }
    });
  }

  function initMobileNavEvents() {
    const toggle = document.getElementById('mobileNavToggle');
    const overlay = document.getElementById('mobile-drawer-overlay');

    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('mobile-sidebar-open');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        document.body.classList.remove('mobile-sidebar-open');
      });
    }

    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) {
      sidebar.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          document.body.classList.remove('mobile-sidebar-open');
        }
      });
    }

    window.addEventListener('hashchange', () => {
      document.body.classList.remove('mobile-sidebar-open');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        document.body.classList.remove('mobile-sidebar-open');
      }
    });

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTop.classList.add('is-visible');
        } else {
          backToTop.classList.remove('is-visible');
        }
      }, { passive: true });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // --- Game Card Renderer (CLS Optimized) ---
  function renderCard(game) {
    const isFav = favorites.includes(game.slug);
    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge badge-top">TOP</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge badge-hot">HOT</span>';
    }

    return \`
      <a href="#/game/\${game.slug}" class="game-card card-normal" data-slug="\${game.slug}" aria-label="Play \${escapeHtml(game.title)}">
        <div class="card-media">
          <img class="card-thumb"
               src="\${game.thumbnail}"
               alt="\${escapeHtml(game.title)}"
               loading="lazy"
               decoding="async"
               onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
          \${badgeHtml}
          <button class="card-fav-btn \${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('\${game.slug}', event)" title="Favorite" aria-label="Favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <div class="card-overlay-info">
            <span class="card-overlay-title">\${escapeHtml(game.title)}</span>
          </div>
        </div>
      </a>
    \`;
  }

  function renderMixedGridCard(game, sizeClass = 'card-normal') {
    const isFav = favorites.includes(game.slug);
    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge badge-top">TOP</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge badge-hot">HOT</span>';
    }

    return \`
      <a href="#/game/\${game.slug}" class="game-card \${sizeClass}" data-slug="\${game.slug}" aria-label="Play \${escapeHtml(game.title)}">
        <div class="card-media">
          <img class="card-thumb"
               src="\${game.thumbnail}"
               alt="\${escapeHtml(game.title)}"
               loading="lazy"
               decoding="async"
               onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
          \${badgeHtml}
          <button class="card-fav-btn \${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('\${game.slug}', event)" title="Favorite" aria-label="Favorite">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <div class="card-overlay-info">
            <span class="card-overlay-title">\${escapeHtml(game.title)}</span>
          </div>
        </div>
      </a>
    \`;
  }

  function renderCategoryShowcase() {
    const categories = [
      { name: 'Action', slug: 'action', iconClass: 'cat-icon-action', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
      { name: 'Racing', slug: 'racing', iconClass: 'cat-icon-racing', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>' },
      { name: 'Puzzle', slug: 'puzzle', iconClass: 'cat-icon-puzzle', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v4a2 2 0 0 0 4 0V3"/><path d="M17 3v4a2 2 0 0 0 4 0V3"/></svg>' },
      { name: 'Arcade', slug: 'arcade', iconClass: 'cat-icon-arcade', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 3 18 3 21 21 3 21 6 3"/><circle cx="12" cy="12" r="3"/></svg>' },
      { name: 'Sports', slug: 'sports', iconClass: 'cat-icon-sports', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>' },
      { name: 'Shooting', slug: 'shooting', iconClass: 'cat-icon-shooting', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>' },
      { name: 'Adventure', slug: 'adventure', iconClass: 'cat-icon-adventure', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>' },
      { name: '.io Games', slug: 'multiplayer', iconClass: 'cat-icon-io', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
      { name: 'Girls', slug: 'casual', iconClass: 'cat-icon-girls', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5z"/></svg>' },
      { name: 'Cooking', slug: 'casual', iconClass: 'cat-icon-cooking', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>' },
      { name: 'Multiplayer', slug: 'multiplayer', iconClass: 'cat-icon-multiplayer', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { name: 'More', slug: 'all', iconClass: 'cat-icon-more', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' }
    ];

    return \`
      <section class="game-categories-section">
        <div class="section-header-clean">
          <h2 class="section-title-clean">Game Categories</h2>
        </div>
        <div class="category-showcase-grid">
          \${categories.map(cat => \`
            <a href="\${cat.slug === 'all' ? '#/games' : '#/category/' + cat.slug}" class="category-showcase-card" data-cat="\${cat.slug}">
              <div class="cat-card-icon \${cat.iconClass}">\${cat.icon}</div>
              <span class="cat-card-label">\${cat.name}</span>
            </a>
          \`).join('')}
        </div>
      </section>
    \`;
  }

  function renderShelf(title, iconSvg, seeAllHref, games, rowId) {
    if (!games || games.length === 0) return '';
    const cardsHtml = games.map(renderCard).join('');

    return \`
      <section class="scroll-section" id="sec-\${rowId}">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon">\${iconSvg}</span>
            <h2 class="section-shelf-title">\${title}</h2>
            <span class="sidebar-section-count">\${games.length}</span>
          </div>
          <div class="section-actions">
            \${seeAllHref ? \`<a href="\${seeAllHref}" class="see-all-link">See All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a>\` : ''}
            <div class="scroll-controls">
              <button class="scroll-arrow-btn prev" onclick="window.NEXUS.scrollRow('\${rowId}', -1)" aria-label="Scroll left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="scroll-arrow-btn next" onclick="window.NEXUS.scrollRow('\${rowId}', 1)" aria-label="Scroll right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-row-wrapper">
          <div class="scroll-row" id="\${rowId}">
            \${cardsHtml}
          </div>
        </div>
      </section>
    \`;
  }

  // --- PHASE 3: Homepage SEO Rich Content Section ---
  function renderHomepageSeoSection() {
    return \`
      <section class="portal-seo-section" aria-label="About KopiPlay Free Online Games">
        <h2>Play Free Online Games on KopiPlay</h2>
        <p>KopiPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting, and Sports. Play directly in your browser with instant execution, zero downloads, and smooth responsive controls.</p>

        <div class="seo-highlight-grid">
          <div class="seo-highlight-item">
            <h4>Explore Free Online Games</h4>
            <p>From quick 2-minute casual puzzles to immersive 3D racing simulators, every game runs smoothly in modern desktop and mobile web browsers.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Popular Gaming Categories</h4>
            <p>Master target acquisition in Shooting Games, solve logic challenges in Puzzle & Brain, or accelerate down neon tracks in Racing & Car games.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Discover New Browser Games</h4>
            <p>Our library of \${catalog.length} games is regularly curated with handpicked HTML5 creations from verified providers and original developers worldwide.</p>
          </div>
        </div>

        <h3 class="faq-section-title">Frequently Asked Questions</h3>
        <div class="faq-accordion">
          <details class="faq-item" open>
            <summary class="faq-question">Are all games on KopiPlay really free? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">Yes, 100%. Every single game in our catalog is completely free to play directly in your web browser with no hidden paywalls or subscription requirements.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Do I need to download or install any plugins? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">No downloads or installations are required. All games run natively via modern HTML5, WebGL, and JavaScript technologies in any standard browser.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Can I play KopiPlay games on my phone or tablet? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">Yes! KopiPlay is designed mobile-first. The user interface, touch controls, and responsive layouts adapt seamlessly to iPhone, iPad, Android, and tablets.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">How are my favorites and game history saved? <span class="faq-chevron">&#9660;</span></summary>
            <div class="faq-answer">Your favorites and recently played titles are saved locally in your browser storage so you can easily access them whenever you return.</div>
          </details>
        </div>
      </section>
    \`;
  }

  function renderHomepage() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'KopiPlay – Play Free Online Games',
      description: 'Discover KopiPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.',
      canonical: 'https://kipo.in/',
      ogType: 'website',
      ogImage: 'assets/images/logo.svg',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "KopiPlay",
        "alternateName": "KopiPlay Online Games",
        "url": "https://kipo.in/",
        "description": "KopiPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports."
      }
    });

    // Curate Mixed Grid Spans (Matching Reference Image Layout)
    const featured2x2 = ['neon-racer', 'subway-winter-vacation', 'bubble-fall', 'cyber-snake', 'magic-block-puzzle', 'merge-haven', 'neon-breakout', 'tank-wars-2'];
    const wide2x1 = ['space-defender', 'slam-dunk', 'helicopter-battle', 'angry-heroes', 'dream-restaurant-3d'];
    const tall1x2 = ['hand-feight', 'wood-screw-puzzle', 'home-island', 'pulse-2048'];

    // Homepage Dense Mixed-Size Grid: First 52 games arranged densely
    const mixedGames = catalog.slice(0, 52);
    const mixedGridHtml = mixedGames.map(game => {
      let size = 'card-normal';
      if (featured2x2.includes(game.slug)) size = 'card-large';
      else if (wide2x1.includes(game.slug)) size = 'card-wide';
      else if (tall1x2.includes(game.slug)) size = 'card-tall';
      return renderMixedGridCard(game, size);
    }).join('');

    // Remaining Explore Games: Complete catalog coverage
    const exploreGames = catalog.slice(52);

    const html = \`
      <!-- Dense Image-First Mixed-Size Game Grid (Matches Left Panel of Reference) -->
      <section class="mixed-game-grid" aria-label="Featured Free Online Games">
        \${mixedGridHtml}
      </section>

      <!-- Game Categories Showcase Section (Matches Middle-Right Panel of Reference) -->
      \${renderCategoryShowcase()}

      <!-- Complete Explore Games Library -->
      <section class="explore-all-section" style="margin-top: 20px; margin-bottom: 40px;">
        <div class="section-header-clean">
          <h2 class="section-title-clean">Explore More Games (\${catalog.length})</h2>
          <a href="#/games" class="related-view-all">View All (\${catalog.length})</a>
        </div>
        <div class="games-grid">
          \${exploreGames.map(renderCard).join('')}
        </div>
      </section>

      <!-- Rich Homepage SEO Content Section -->
      \${renderHomepageSeoSection()}
    \`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderAllGamesView(title = 'All Games', games = catalog, activeCatSlug = null) {
    const main = document.getElementById('app-main');
    if (!main) return;

    const catSeo = (activeCatSlug && CATEGORY_SEO_DATA[activeCatSlug]) || null;
    let pageTitle = catSeo ? catSeo.title : \`\${title} – KopiPlay Online Gaming\`;
    let metaDescription = catSeo ? catSeo.description : \`Browse \${games.length} free HTML5 browser games in our collection on KopiPlay.\`;
    let introText = catSeo ? catSeo.intro : \`Showing \${games.length} verified instant-play browser games.\`;

    const currentSort = (localStorage.getItem(STORAGE_KEYS.sortPref) || localStorage.getItem(STORAGE_KEYS.legacySort) || 'featured');
    let sorted = [...games];
    if (currentSort === 'rating') {
      sorted.sort((a,b) => (b.rating || 0) - (a.rating || 0));
    } else if (currentSort === 'plays') {
      sorted.sort((a,b) => (b.plays || 0) - (a.plays || 0));
    } else if (currentSort === 'newest') {
      sorted.sort((a,b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
    } else if (currentSort === 'az') {
      sorted.sort((a,b) => a.title.localeCompare(b.title));
    } else if (currentSort === 'za') {
      sorted.sort((a,b) => b.title.localeCompare(a.title));
    }

    updateSeo({
      title: pageTitle,
      description: metaDescription,
      canonical: activeCatSlug ? \`https://kipo.in/#/category/\${activeCatSlug}\` : 'https://kipo.in/#/games',
      ogType: 'website',
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": metaDescription,
        "url": activeCatSlug ? \`https://kipo.in/#/category/\${activeCatSlug}\` : 'https://kipo.in/#/games'
      }
    });

    let emptyStateHtml = '';
    if (title === 'My Favorites') {
      emptyStateHtml = \`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 600px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(255, 71, 87, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-coral); box-shadow: 0 0 24px var(--accent-coral-glow);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Favorite Games Yet</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">Click the heart icon on any game card to add it to your personal favorites for instant 1-click access!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Browse Complete Catalog</a>
        </div>
      \`;
    } else if (title === 'Recently Played') {
      emptyStateHtml = \`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 600px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(0, 210, 255, 0.12); display: flex; align-items: center; justify-content: center; color: var(--accent-primary); box-shadow: 0 0 24px rgba(0, 210, 255, 0.25);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Recently Played Games</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">Games you play will automatically appear here so you can easily jump straight back into the action!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Discover Games</a>
        </div>
      \`;
    } else {
      emptyStateHtml = \`
        <div style="grid-column: 1 / -1; text-align: center; padding: 72px 24px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); max-width: 600px; margin: 30px auto; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <div style="width: 64px; height: 64px; margin: 0 auto 18px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); font-size:1.4rem; font-weight:800; margin-bottom:10px;">No Games Found</h3>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:24px;">We couldn't find any games matching this view or search term. Try another category or explore all games!</p>
          <a href="#/games" class="btn btn-primary" style="display:inline-flex;">Browse All Games</a>
        </div>
      \`;
    }

    const cardsHtml = sorted.length > 0 ? sorted.map(renderCard).join('') : emptyStateHtml;

    const iconSvg = activeCatSlug ? getCategoryIcon(activeCatSlug) : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';

    // Category FAQ Section if active category has FAQs
    let categoryFaqHtml = '';
    if (catSeo && catSeo.faqs && catSeo.faqs.length > 0) {
      categoryFaqHtml = \`
        <div class="portal-seo-section" style="margin-top: 36px;">
          <h2>\${escapeHtml(title)} FAQ</h2>
          <div class="faq-accordion">
            \${catSeo.faqs.map((f, i) => \`
              <details class="faq-item" \${i === 0 ? 'open' : ''}>
                <summary class="faq-question">\${escapeHtml(f.q)}</summary>
                <div class="faq-answer">\${escapeHtml(f.a)}</div>
              </details>
            \`).join('')}
          </div>
        </div>
      \`;
    }

    const html = \`
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="section-badge-icon" style="width: 36px; height: 36px;">\${iconSvg}</span>
            <div>
              <h1 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF; margin: 0;">\${escapeHtml(title)}</h1>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 4px 0 0 0;">\${escapeHtml(introText)}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="sidebar-section-count" style="font-size: 0.82rem; padding: 4px 12px;">\${games.length} \${games.length === 1 ? 'Game' : 'Games'}</span>
            <select id="sortSelect" onchange="window.NEXUS.sortView(this.value)" style="background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.85rem; outline: none; cursor: pointer;">
              <option value="featured" \${currentSort==='featured'?'selected':''}>Sort: Featured</option>
              <option value="rating" \${currentSort==='rating'?'selected':''}>Top Rated</option>
              <option value="plays" \${currentSort==='plays'?'selected':''}>Most Played</option>
              <option value="newest" \${currentSort==='newest'?'selected':''}>Newest First</option>
              <option value="az" \${currentSort==='az'?'selected':''}>Title: A to Z</option>
              <option value="za" \${currentSort==='za'?'selected':''}>Title: Z to A</option>
            </select>
          </div>
        </div>

        <!-- Category Shortcuts Bar -->
        <div class="category-quick-bar" style="margin-bottom: 20px;">
          <a href="#/games" class="category-quick-pill \${!activeCatSlug ? 'active' : ''}">
            <span>All (\${catalog.length})</span>
          </a>
          \${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = activeCatSlug === c.slug;
            return \`
              <a href="#/category/\${c.slug}" class="category-quick-pill \${isActive ? 'active' : ''}">
                <span>\${getCategoryIcon(c.slug)}</span>
                <span>\${c.name} (\${count})</span>
              </a>
            \`;
          }).join('')}
        </div>
      </div>

      \${nexusAds.renderSlot('categoryBanner')}

      <div class="games-grid" id="mainGamesGrid">
        \${cardsHtml}
      </div>

      \${categoryFaqHtml}
    \`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  
  // --- Monetization & Reusable Ad Slot Component ---
  /**
   * Reusable Ad Slot Component
   * Renders a reserved, compliant advertisement container for authorized ad networks.
   *
   * @param {string} placementId - Unique ad slot placement identifier (e.g. 'game-detail-sidebar')
   * @param {Object} options - Configuration options { size: '300x250', label: 'ADVERTISEMENT' }
   * @returns {string} HTML markup string
   *
   * TO INTEGRATE AN AUTHORIZED AD PROVIDER (Google AdSense, Google Ad Manager, Playwire, etc.):
   * 1. Replace the inner .ad-slot-frame placeholder markup with your provider's tag:
   *    e.g. For Google AdSense:
   *      <ins class="adsbygoogle"
   *           style="display:inline-block;width:300px;height:250px"
   *           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
   *           data-ad-slot="XXXXXXXXXX"></ins>
   *      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   * 2. Or initialize via window.googletag / provider API targeting placementId.
   */
  function renderAdSlot(placementId = 'game-detail-sidebar', options = {}) {
    const size = options.size || '300x250';
    const label = options.label || 'ADVERTISEMENT';
    const is300x250 = size === '300x250';

    return \`
      <!-- Advertisement Container (\${placementId}) -->
      <aside class="game-ad-container" data-ad-placement="\${placementId}" aria-label="Advertisement">
        <div class="ad-disclaimer-label">\${label}</div>
        <div class="ad-slot-frame \${is300x250 ? 'ad-slot-300x250' : 'ad-slot-responsive'}" id="ad-unit-\${placementId}">
          <!-- ========================================================================= -->
          <!-- AUTHORIZED AD PROVIDER CODE INJECTION POINT (e.g. AdSense / GAM / Playwire) -->
          <!-- When active ad provider is configured, inject provider ad tag here.       -->
          <!-- ========================================================================= -->
          <div class="ad-placeholder-content" unselectable="on" aria-hidden="true">
            <div class="ad-placeholder-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <div class="ad-placeholder-title">Advertisement Space</div>
            <div class="ad-placeholder-size">300 &times; 250 px</div>
          </div>
          <!-- END AD INJECTION POINT -->
        </div>
      </aside>
    \`;
  }

  // --- PHASE 5: Individual Game SEO & Detail Player ---
  let activePlayerTimeout = null;
  let activePostMessageCleanup = null;

  function renderGameDetail(slug) {
    const main = document.getElementById('app-main');
    if (!main) return;

    const game = catalog.find(g =>
      g.slug === slug ||
      g.id === slug ||
      (g.aliases && g.aliases.includes(slug)) ||
      (g.slug && g.slug.toLowerCase() === slug.toLowerCase()) ||
      (g.id && g.id.toLowerCase() === slug.toLowerCase())
    );
    if (!game) {
      main.innerHTML = \`
        <div class="empty-state-card">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 class="empty-state-title">Game Not Found</h2>
          <p class="empty-state-text">We couldn't locate the game "\${escapeHtml(slug)}". It may have been renamed or moved.</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      \`;
      return;
    }

    addRecentlyPlayed(game.slug);
    nexusAnalytics.track('game_viewed', { slug: game.slug, title: game.title, category: game.category });

    const isFav = favorites.includes(game.slug);
    let rawEmbedUrl = game.embedUrl || game.gameUrl || game.url || '';
    if (rawEmbedUrl.includes('html5.gamedistribution.com') && !rawEmbedUrl.includes('gd_sdk_referrer_url=')) {
      const sep = rawEmbedUrl.includes('?') ? '&' : '?';
      rawEmbedUrl = rawEmbedUrl + sep + 'gd_sdk_referrer_url=' + encodeURIComponent(window.location.href);
    }
    const embedUrl = sanitizeUrl(rawEmbedUrl);
    const catSlug = (game.category || 'arcade').toLowerCase();

    // Related Games: 10 games from same category or random
    const related = catalog.filter(g => g.slug !== game.slug && (g.category === game.category || (g._categories && g._categories.includes(catSlug)))).slice(0, 10);
    const relatedGames = related.length >= 6 ? related : catalog.filter(g => g.slug !== game.slug).slice(0, 10);

    // Controls Parser
    const controlsHtml = (function() {
      const desc = (game.instructions || game.description || 'Mouse, Arrow Keys, WASD, Space').toUpperCase();
      const keys = [];
      if (desc.includes('WASD')) keys.push('WASD');
      if (desc.includes('ARROW') || desc.includes('KEYS')) keys.push('Arrow Keys');
      if (desc.includes('SPACE')) keys.push('Space');
      if (desc.includes('MOUSE') || desc.includes('CLICK')) keys.push('Mouse');
      if (desc.includes('TOUCH')) keys.push('Touch');
      if (keys.length === 0) keys.push('Mouse', 'Arrow Keys');
      return keys.map(k => \`<span class="keycap">\${k}</span>\`).join('');
    })();

    updateSeo({
      title: \`Play \${game.title} Online Free – KopiPlay\`,
      description: game.description || \`Play \${game.title} instantly in your browser on KopiPlay. Free online game with zero downloads.\`,
      canonical: 'https://kipo.in/#/game/' + game.slug,
      ogType: 'game',
      ogImage: game.thumbnail,
      schema: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game.title,
        "description": game.description,
        "genre": [game.category || 'Arcade'],
        "playMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any"
      }
    });

    const html = \`
      <!-- Breadcrumbs & Navigation Bar -->
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back to catalog">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Back</span>
        </button>
        <a href="#/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-sep">&gt;</span>
        <a href="#/category/\${catSlug}" class="breadcrumb-link">\${escapeHtml(game.category || 'Action')}</a>
        <span class="breadcrumb-sep">&gt;</span>
        <span class="breadcrumb-current">\${escapeHtml(game.title)}</span>

        <!-- Relocated Favorite Button (Preserves user favorites functionality) -->
        <button class="player-fav-btn \${isFav ? 'is-fav' : ''}" id="detailFavBtn" onclick="window.NEXUS.toggleFav('\${game.slug}', event)" title="Favorite" aria-label="Favorite">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="\${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span id="detailFavText">\${isFav ? 'Favorited' : 'Favorite'}</span>
        </button>
      </nav>

      <!-- Main Game Detail Layout: 16:9 Cinematic Player on Left, Professional Ad Container on Right -->
      <div class="game-detail-layout">
        <!-- 16:9 Cinematic Player Container (Unchanged) -->
        <div class="player-stage-card" id="playerStageCard">
          <iframe id="gameIframe"
                  src="\${embedUrl}"
                  title="\${escapeHtml(game.title)}"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowfullscreen
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals">
          </iframe>
          <button class="player-overlay-fullscreen-btn" id="playerOverlayFullscreenBtn" title="Toggle Fullscreen" aria-label="Toggle Fullscreen" onclick="window.NEXUS.toggleFullscreen()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>
        </div>

        <!-- Right Advertisement Container (Replaces duplicate game info card) -->
        \${renderAdSlot('game-detail-sidebar')}
      </div>

      <!-- Related Games Strip (Matches Bottom of Reference Player Panel) -->
      <section class="related-games-section">
        <div class="related-games-header">
          <h3>Related Games</h3>
          <a href="#/games" class="related-view-all">View All</a>
        </div>
        <div class="related-games-strip">
          \${relatedGames.map(renderCard).join('')}
        </div>
      </section>
    \`;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

    // --- PHASE 2: Redesigned Five Informational & Legal Pages ---

  // 1. ABOUT US VIEW
  function renderAboutView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'About KopiPlay - Free Online Gaming Platform',
      description: 'Discover KopiPlay, your home for verified HTML5 browser games. Instant play on PC, tablet, and mobile with zero downloads.',
      canonical: 'https://kipo.in/#/about',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">About Us</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">About KopiPlay</div>
          <h1 class="legal-title">Play Instantly. <span class="gradient-text">Discover More.</span></h1>
          <p class="legal-lead">
            KopiPlay is an independent online gaming portal built to deliver verified, high-performance browser games directly to your screen—no software downloads, no paywalls, and zero friction.
          </p>
        </header>

        <!-- Feature Grid (4 Visual Highlights) -->
        <div class="about-feature-grid">
          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #8B5CF6;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h4>Instant Execution</h4>
            <p>Built purely on HTML5 Canvas, WebGL, and Web Audio web standards. Games load in seconds in your browser tab without native client installs.</p>
          </div>

          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #3B82F6;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h4>Privacy First</h4>
            <p>Zero mandatory accounts or intrusive tracking. Your favorite titles and gameplay history are stored safely in your own browser's local storage.</p>
          </div>

          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #10B981;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="6"/><circle cx="8" cy="12" r="2"/><line x1="14" y1="12" x2="18" y2="12"/><line x1="16" y1="10" x2="16" y2="14"/></svg>
            </div>
            <h4>Handpicked Library</h4>
            <p>A catalog of \${catalog.length} verified titles across 22 categories, from high-speed 3D racers and tactical shooters to relaxing puzzles.</p>
          </div>

          <div class="about-feature-card">
            <div class="about-feature-icon" style="color: #F59E0B;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </div>
            <h4>Cross-Device Freedom</h4>
            <p>Responsive dark gaming interface engineered to run smoothly across high-end desktop rigs, laptops, Chromebooks, iPads, and smartphones.</p>
          </div>
        </div>

        <!-- Story & Purpose Card -->
        <div class="legal-card">
          <h2>The KopiPlay Experience</h2>
          <p>
            We believe digital entertainment should be straightforward and enjoyable. Too many gaming sites burden players with mandatory user registrations, excessive loading screens, and heavy background downloads. KopiPlay strips away those barriers by curating legitimate HTML5 titles from verified game studios worldwide and presenting them in a fast, organized, dark-themed portal.
          </p>
          <p>
            Whether you have two minutes for a quick casual puzzle on your mobile commute or an hour for a 3D driving simulator on your PC, KopiPlay delivers instant fun directly inside any modern web browser.
          </p>
        </div>

        <!-- Call to Action Banner -->
        <div class="about-cta-banner">
          <div class="about-cta-content">
            <h3>Ready to Jump Into the Action?</h3>
            <p>Explore all \${catalog.length} free games with zero downloads or account requirements.</p>
          </div>
          <div class="about-cta-actions">
            <a href="#/games" class="btn btn-primary">Browse All Games</a>
            <a href="#/contact" class="btn btn-secondary">Contact Our Team</a>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 2. CONTACT & SUPPORT VIEW
  function renderContactView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Contact & Support - KopiPlay Gaming Portal',
      description: 'Contact KopiPlay support for assistance with games, bug reports, publisher inquiries, or general feedback.',
      canonical: 'https://kipo.in/#/contact',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Contact & Support</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">Help & Enquiries</div>
          <h1 class="legal-title">Contact & <span class="gradient-text">Support</span></h1>
          <p class="legal-lead">
            Have questions about a game, experienced a technical glitch, or have an HTML5 game you would like to showcase? Reach out to us below.
          </p>
        </header>

        <!-- 4 Quick Support Channels -->
        <div class="contact-support-grid">
          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>General Inquiries</h4>
              <p>Platform questions, portal suggestions, or general gameplay feedback.</p>
            </div>
          </div>

          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>Technical Glitches</h4>
              <p>Black screens, audio issues, or games that fail to load in your browser.</p>
            </div>
          </div>

          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>Game Submissions</h4>
              <p>Are you an HTML5 developer? Submit your playable web game to our catalog.</p>
            </div>
          </div>

          <div class="contact-support-card">
            <div class="contact-support-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="contact-support-info">
              <h4>DMCA & Copyright</h4>
              <p>Submit formal copyright notifications and intellectual property inquiries.</p>
            </div>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="legal-card">
          <h2>Send Us a Message</h2>
          <p>Fill out the fields below and we will log your inquiry directly into the portal records.</p>

          <form id="contactForm" class="contact-form-layout" onsubmit="window.NEXUS.submitContact(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="contactName">Your Name *</label>
                <input type="text" class="form-control" id="contactName" required placeholder="Alex Mercer" autocomplete="name">
              </div>

              <div class="form-group">
                <label class="form-label" for="contactEmail">Email Address *</label>
                <input type="email" class="form-control" id="contactEmail" required placeholder="alex@example.com" autocomplete="email">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="contactTopic">Inquiry Topic</label>
              <select class="form-control" id="contactTopic" style="cursor: pointer;">
                <option value="general">General Inquiry & Feedback</option>
                <option value="bug-report">Report a Broken Game or Glitch</option>
                <option value="submit-game">Submit an HTML5 Game Creation</option>
                <option value="licensing">Business & Monetization Inquiries</option>
                <option value="copyright">Copyright / DMCA Notice</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="contactMessage">Message Details *</label>
              <textarea class="form-control form-textarea" id="contactMessage" rows="5" required placeholder="Describe your inquiry, game feedback, or technical issue..."></textarea>
            </div>

            <button type="submit" class="btn-submit-contact">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              <span>Send Message</span>
            </button>
          </form>

          <!-- Form Architecture Notice for Website Operator -->
          <div class="legal-notice-box notice-purple" style="margin-top: 24px;">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Technical Implementation Notice:</strong> This client-side form currently stores submitted inquiries in your browser's local storage (<code>kopiplay_messages</code>). To route inquiries to a live email inbox or ticketing system upon domain handover, configure a form endpoint (e.g. Formspree, EmailJS, or an API backend).
            </div>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 3. PRIVACY POLICY VIEW
  function renderPrivacyView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Privacy Policy - KopiPlay Online Gaming',
      description: 'Accurate and transparent privacy policy for KopiPlay detailing client-side storage, cookie usage, third-party embeds, and data protection practices.',
      canonical: 'https://kipo.in/#/privacy',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Privacy Policy</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">Legal & Compliance</div>
          <h1 class="legal-title">Privacy <span class="gradient-text">Policy</span></h1>
          <p class="legal-lead">Effective Date: October 2026 &bull; Last updated: October 2026</p>
        </header>

        <!-- Quick Navigation Bar -->
        <div class="legal-toc-bar">
          <span class="legal-toc-title">Jump to:</span>
          <a href="#/privacy#sec-collection" class="legal-toc-pill">1. Data Collection</a>
          <a href="#/privacy#sec-storage" class="legal-toc-pill">2. Local Storage</a>
          <a href="#/privacy#sec-cookies" class="legal-toc-pill">3. Cookies</a>
          <a href="#/privacy#sec-embeds" class="legal-toc-pill">4. Third-Party Embeds</a>
          <a href="#/privacy#sec-ads" class="legal-toc-pill">5. Advertising</a>
          <a href="#/privacy#sec-rights" class="legal-toc-pill">6. Your Rights</a>
        </div>

        <div class="legal-card" id="sec-collection">
          <h2>1. Information We Collect</h2>
          <p>
            KopiPlay operates as a client-side static web gaming portal. We do not require users to create personal accounts, register with an email address, or provide identity verification to play games. We collect zero personally identifiable information (PII) during your standard gaming sessions.
          </p>

          <h2 id="sec-storage">2. Browser Local Storage</h2>
          <p>
            To deliver an enjoyable, personalized gaming experience without maintaining server-side user databases, KopiPlay utilizes your browser's client-side <code>localStorage</code> API. The following keys are stored exclusively on your own device:
          </p>
          <ul>
            <li><code>kopiplay_favorites</code>: An array of game identifiers you have favorited.</li>
            <li><code>kopiplay_recent</code>: An array of game identifiers you have launched recently.</li>
            <li><code>kopiplay_sort_pref</code>: Your chosen sort ordering in the game library (e.g. Featured, Rating, Newest).</li>
            <li><code>kopiplay_messages</code>: Inquiries you submit through the contact form, stored locally for demonstration.</li>
          </ul>
          <p>You can clear this data at any time by clearing your browser cache and local storage.</p>

          <h2 id="sec-cookies">3. Cookies & Tracking Technologies</h2>
          <p>
            The core KopiPlay portal does not set proprietary tracking cookies. Temporary session identifiers may be created by your browser to maintain active tab states.
          </p>

          <h2 id="sec-embeds">4. Third-Party Embedded Games & CDNs</h2>
          <p>
            Games on KopiPlay are delivered via authorized embedding mechanisms from legitimate third-party game distribution networks (such as HTMLGames, GameDistribution, and GameMonetize). When you load an external game iframe, the provider's servers may process standard HTTP request headers (including IP address and browser user-agent) solely to transmit the game files. These third-party services operate under their own independent privacy policies.
          </p>

          <h2 id="sec-ads">5. Future Advertising & Monetization</h2>
          <p>
            KopiPlay includes reserved advertisement containers (such as the 300 &times; 250 px sidebar on game detail pages) for future integration with authorized ad networks such as Google AdSense. <strong>Please note:</strong> Live third-party ad network scripts are not currently active. When an ad provider is configured, advertising will comply with applicable privacy regulations (including GDPR, CCPA, and COPPA frameworks).
          </p>

          <h2 id="sec-rights">6. Your Data Rights & Contact</h2>
          <p>
            Because we do not maintain personal user accounts or server databases, you have full direct control over your data directly within your web browser. If you have questions about our privacy practices, contact us via the <a href="#/contact" style="color:#8B5CF6; font-weight:600;">Contact Form</a>.
          </p>

          <!-- Operator Review Box -->
          <div class="legal-notice-box notice-warning">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Website Owner Review Required:</strong> Prior to publishing under a production domain, review this privacy policy with your legal counsel and insert your registered business entity name, legal jurisdiction, and cookie consent management setup.
            </div>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 4. TERMS OF SERVICE VIEW
  function renderTermsView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Terms of Service - KopiPlay',
      description: 'Official Terms of Service for KopiPlay covering website usage, third-party games, intellectual property, user responsibilities, and service conditions.',
      canonical: 'https://kipo.in/#/terms',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">Terms of Service</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">User Agreement</div>
          <h1 class="legal-title">Terms of <span class="gradient-text">Service</span></h1>
          <p class="legal-lead">Effective Date: October 2026 &bull; Governs your access to KopiPlay</p>
        </header>

        <div class="legal-card">
          <h2>1. Agreement to Terms</h2>
          <p>
            By visiting, accessing, or playing games on KopiPlay ("the Website"), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please discontinue using the portal.
          </p>

          <h2>2. Permitted Website Usage & Entertainment License</h2>
          <p>
            KopiPlay grants you a personal, non-exclusive, non-transferable, revocable license to access and play HTML5 games through our portal interface strictly for personal, non-commercial entertainment.
          </p>

          <h2>3. Third-Party Game Ownership & Attribution</h2>
          <p>
            Games hosted or embedded on KopiPlay remain the intellectual property of their respective creators, developers, or authorized distribution networks. KopiPlay embeds games in accordance with permitted distribution terms, preserving all original developer credits, branding, and links.
          </p>

          <h2>4. User Responsibilities & Prohibited Conduct</h2>
          <p>As a user of KopiPlay, you agree not to:</p>
          <ul>
            <li>Circumvent, disable, or tamper with security measures or iframe sandbox restrictions on the portal.</li>
            <li>Use automated scrapers, bots, or data-mining scripts to extract content without authorization.</li>
            <li>Transmit malicious code, viruses, or disruptive scripts through forms or feedback mechanisms.</li>
            <li>Attempt to reverse-engineer or redistribute the KopiPlay portal software without permission.</li>
          </ul>

          <h2>5. Game Availability & Catalog Management</h2>
          <p>
            We strive to keep games playable around the clock. However, third-party developers and distribution partners may update, modify, or withdraw titles at their discretion. KopiPlay reserves the right to modify, replace, or discontinue games or portal features without prior notice for maintenance or performance enhancements.
          </p>

          <h2>6. Disclaimer of Warranties & Limitation of Liability</h2>
          <p>
            KopiPlay is provided on an "as-is" and "as-available" basis without warranties of any kind. In no event shall KopiPlay be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the platform.
          </p>

          <h2>7. Updates to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Service at any time. Continued usage of KopiPlay following revisions constitutes full acceptance of the updated terms.
          </p>

          <!-- Operator Review Box -->
          <div class="legal-notice-box notice-warning">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Website Owner Review Required:</strong> When transferring this site to your new domain, review Section 6 and Section 7 with your legal advisor to insert your governing jurisdiction and dispute resolution location.
            </div>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 5. DMCA & COPYRIGHT POLICY VIEW
  function renderDmcaView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'DMCA & Copyright Policy - KopiPlay',
      description: 'Official DMCA and Copyright notice for KopiPlay detailing intellectual property protection, infringement notification procedures, and counter-claims.',
      canonical: 'https://kipo.in/#/dmca',
      ogType: 'website'
    });

    main.innerHTML = \`
      <div class="legal-page-wrapper">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="player-back-btn" onclick="if(window.history.length>1){window.history.back();}else{window.location.hash='#/';}" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            <span>Back</span>
          </button>
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-sep">&gt;</span>
          <span class="breadcrumb-current">DMCA & Copyright</span>
        </nav>

        <header class="legal-page-header">
          <div class="legal-badge">Intellectual Property</div>
          <h1 class="legal-title">DMCA & <span class="gradient-text">Copyright Policy</span></h1>
          <p class="legal-lead">
            KopiPlay respects creator intellectual property rights and adheres to the provisions of the Digital Millennium Copyright Act (17 U.S.C. § 512).
          </p>
        </header>

        <div class="legal-card">
          <h2>1. Third-Party Game Ownership & Attribution</h2>
          <p>
            All third-party video games, game characters, audio assets, trademarks, and associated intellectual property featured on KopiPlay remain the sole property of their respective copyright holders. We host and embed games through authorized embedding licenses and developer distribution catalogs (such as HTMLGames, GameDistribution, and GameMonetize), preserving required developer branding and credits.
          </p>

          <h2>2. Copyright Infringement Notification Procedure</h2>
          <p>
            If you are a copyright owner or an authorized representative and believe that any game or content accessible on KopiPlay infringes upon your copyright, you may submit a formal notification containing the following:
          </p>
          <ol>
            <li>A physical or electronic signature of the copyright owner or person authorized to act on their behalf.</li>
            <li>Specific identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact URL (e.g., <code>https://kipo.in/#/game/[game-slug]</code>) where the allegedly infringing material is located on KopiPlay.</li>
            <li>Your contact information, including your full legal name, mailing address, telephone number, and verifiable email address.</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement made under penalty of perjury that the information in the notification is accurate and that you are authorized to act on behalf of the owner.</li>
          </ol>

          <h2>3. Submission Method</h2>
          <p>
            Please deliver your copyright notification via our official <a href="#/contact" style="color:#8B5CF6; font-weight:600;">Contact & Support Form</a> by choosing the topic <strong>"Copyright / DMCA Notice"</strong>. Verified infringement claims are investigated and processed within 24 to 48 business hours.
          </p>

          <h2>4. Counter-Notification Procedure</h2>
          <p>
            If a game developer believes their material was removed or disabled by mistake or misidentification, a counter-notification may be submitted containing their identity, explanation, and consent to legal jurisdiction under 17 U.S.C. § 512(g).
          </p>

          <!-- Action Required by Website Owner -->
          <div class="legal-notice-box notice-warning">
            <div class="legal-notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="legal-notice-content">
              <strong>Website Owner Action Required:</strong> To qualify for DMCA statutory Safe Harbor protections under 17 U.S.C. § 512(c)(2), register a Designated Agent with the U.S. Copyright Office Directory of Service Provider Agents and update this page with your agent's full legal name, physical postal address, telephone, and designated DMCA email.
            </div>
          </div>
        </div>
      </div>
    \`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- Router ---
  function handleRoute() {
    const rawHash = window.location.hash || '#/';
    const hash = rawHash.split('?')[0];
    updateActiveNavClasses(hash);

    if (hash === '#/' || hash === '' || hash === '#') {
      renderHomepage();
    } else if (hash === '#/games') {
      const urlParams = new URLSearchParams(rawHash.includes('?') ? rawHash.split('?')[1] : '');
      const query = urlParams.get('q');
      if (query) {
        const matches = catalog.filter(g => {
          return (g.title || '').toLowerCase().includes(query.toLowerCase()) ||
                 (g.category || '').toLowerCase().includes(query.toLowerCase()) ||
                 (g.tags || []).some(t => t.toLowerCase().includes(query.toLowerCase()));
        });
        renderAllGamesView('Search: "' + query + '"', matches);
      } else {
        renderAllGamesView('All Games', catalog);
      }
    } else if (hash === '#/popular') {
      const pop = catalog.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7));
      renderAllGamesView('Popular Games', pop.length ? pop : catalog.slice(0, 50));
    } else if (hash === '#/new') {
      const nw = catalog.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01'));
      renderAllGamesView('New Games', nw.length ? nw : catalog.slice(0, 50));
    } else if (hash === '#/favorites') {
      const favGames = catalog.filter(g => favorites.includes(g.slug));
      renderAllGamesView('My Favorites', favGames);
    } else if (hash === '#/recent') {
      const recentGames = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
      renderAllGamesView('Recently Played', recentGames);
    } else if (hash.startsWith('#/category/')) {
      const catSlug = hash.replace('#/category/', '');
      const catObj = categoryList.find(c => c.slug === catSlug);
      const catName = catObj ? catObj.name : catSlug.replace('-', ' ');
      const filtered = catalog.filter(g => g._categories && g._categories.includes(catSlug));
      renderAllGamesView(catName + ' Games', filtered, catSlug);
    } else if (hash.startsWith('#/game/')) {
      const slug = hash.replace('#/game/', '');
      renderGameDetail(slug);
    } else if (hash === '#/about') {
      renderAboutView();
    } else if (hash === '#/contact') {
      renderContactView();
    } else if (hash === '#/privacy') {
      renderPrivacyView();
    } else if (hash === '#/terms') {
      renderTermsView();
    } else if (hash === '#/dmca') {
      renderDmcaView();
    } else {
      renderHomepage();
    }
  }

  function updateActiveNavClasses(hash) {
    document.querySelectorAll('.nav-pill').forEach(el => {
      const href = el.getAttribute('href');
      if (href === hash) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    document.querySelectorAll('.category-nav-item').forEach(el => {
      const cat = el.getAttribute('data-category');
      if (hash === \`#/category/\${cat}\`) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // --- Global Window NEXUS Namespace ---
  window.KOPI = window.KIPO = window.NEXUS = {
    playRandomGame: function () {
      if (!catalog || catalog.length === 0) return;
      const randomIndex = Math.floor(Math.random() * catalog.length);
      const randomGame = catalog[randomIndex];
      showToast('Launching ' + randomGame.title + '...', '🎲');
      window.location.hash = '#/game/' + randomGame.slug;
    },

    focusGame: function () {
      const stage = document.getElementById('playerStageCard') || document.getElementById('playerContainer');
      if (stage) {
        stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const iframe = stage.querySelector('iframe');
        if (iframe) {
          setTimeout(() => { iframe.focus(); }, 350);
        }
      }
    },

    toggleFullscreen: function () {
      const container = document.getElementById('playerStageCard') || document.getElementById('playerContainer');
      if (!container) return;

      const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      if (!isFs) {
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
        else if (container.mozRequestFullScreen) container.mozRequestFullScreen();
        else if (container.msRequestFullscreen) container.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      }
    },

    toggleFav: function (slug, event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const isFav = toggleFavorite(slug);
      const btn = event ? event.currentTarget : null;
      if (btn) {
        btn.classList.toggle('is-fav', isFav);
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
      }
      const detailBtn = document.getElementById('detailFavBtn');
      if (detailBtn) {
        detailBtn.classList.toggle('is-fav', isFav);
        const svg = detailBtn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
        const txt = document.getElementById('detailFavText');
        if (txt) txt.textContent = isFav ? 'Favorited' : 'Favorite';
      }
      const headerBadge = document.getElementById('headerFavBadge');
      if (headerBadge) {
        headerBadge.textContent = favorites.length;
        headerBadge.style.display = favorites.length > 0 ? '' : 'none';
      }
    },

    shareGame: function (slug, title) {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Game link copied to clipboard!', '🔗');
        }).catch(() => {
          showToast('Game URL: ' + url, '🔗');
        });
      } else {
        showToast('Game URL: ' + url, '🔗');
      }
    },

    goBack: function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.hash = '#/';
      }
    },

    scrollRow: function (rowId, direction) {
      const row = document.getElementById(rowId);
      if (!row) return;
      const scrollAmount = row.clientWidth * 0.75 * direction;
      row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    },

    sortView: function (sortBy) {
      try {
        localStorage.setItem(STORAGE_KEYS.sortPref, sortBy);
        localStorage.setItem(STORAGE_KEYS.legacySort, sortBy);
      } catch (e) {}

      const rawHash = window.location.hash || '#/';
      const hash = rawHash.split('?')[0];
      let list = [...catalog];

      if (hash.startsWith('#/category/')) {
        const catSlug = hash.replace('#/category/', '');
        list = list.filter(g => g._categories && g._categories.includes(catSlug));
      } else if (hash === '#/favorites') {
        list = list.filter(g => favorites.includes(g.slug));
      } else if (hash === '#/recent') {
        list = recentlyPlayed.map(s => catalog.find(g => g.slug === s)).filter(Boolean);
      } else if (hash === '#/popular') {
        list = list.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7));
      } else if (hash === '#/new') {
        list = list.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01'));
      }

      if (sortBy === 'rating') {
        list.sort((a,b) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === 'plays') {
        list.sort((a,b) => (b.plays || 0) - (a.plays || 0));
      } else if (sortBy === 'newest') {
        list.sort((a,b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
      } else if (sortBy === 'az') {
        list.sort((a,b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'za') {
        list.sort((a,b) => b.title.localeCompare(a.title));
      }

      const grid = document.getElementById('mainGamesGrid');
      if (grid) {
        grid.innerHTML = list.map(renderCard).join('');
      }
    },

    openReport: function (gameSlug) {
      const modalRoot = (document.getElementById('kopi-modal-root') || document.getElementById('nexus-modal-root'));
      if (!modalRoot) return;
      const game = catalog.find(g => g.slug === gameSlug);
      const gameTitle = game ? game.title : 'this game';

      modalRoot.innerHTML = \`
        <div class="nexus-modal-overlay is-open" id="reportModalOverlay" onclick="if(event.target===this) window.NEXUS.closeModal()">
          <div class="nexus-modal" role="dialog" aria-modal="true" aria-labelledby="reportModalTitle">
            <div class="nexus-modal-header">
              <h3 class="nexus-modal-title" id="reportModalTitle">Report Issue: \${escapeHtml(gameTitle)}</h3>
              <button class="nexus-modal-close" onclick="window.NEXUS.closeModal()" aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form id="reportGameForm" onsubmit="window.NEXUS.submitReport(event, '\${escapeHtml(gameSlug)}')">
              <div class="form-group">
                <label class="form-label" for="reportReason">Issue Type</label>
                <select class="form-control" id="reportReason" required style="cursor: pointer;">
                  <option value="not-loading">Game does not load / black screen</option>
                  <option value="controls-broken">Controls or keyboard/touch not working</option>
                  <option value="audio-glitch">Audio or sound glitch</option>
                  <option value="broken-display">Visual display or aspect ratio error</option>
                  <option value="other">Other problem</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="reportDetails">Details (Optional)</label>
                <textarea class="form-control form-textarea" id="reportDetails" rows="3" placeholder="Briefly describe what happened or what device you are using..."></textarea>
              </div>
              <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
                <button type="button" class="btn btn-secondary" onclick="window.NEXUS.closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      \`;
    },

    closeModal: function () {
      const modalRoot = (document.getElementById('kopi-modal-root') || document.getElementById('nexus-modal-root'));
      if (modalRoot) modalRoot.innerHTML = '';
    },

    submitReport: function (event, slug) {
      event.preventDefault();
      const reason = document.getElementById('reportReason').value;
      const details = document.getElementById('reportDetails').value;

      try {
        const reports = JSON.parse((localStorage.getItem(STORAGE_KEYS.reports) || localStorage.getItem(STORAGE_KEYS.legacyReports)) || '[]');
        reports.push({
          slug,
          reason,
          details,
          date: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
        localStorage.setItem(STORAGE_KEYS.legacyReports, JSON.stringify(reports));
      } catch (e) {}

      nexusAnalytics.track('report_submitted', { slug, reason });
      window.NEXUS.closeModal();
      showToast('Thank you! Your report has been submitted.', '✓');
    },

    submitContact: function (event) {
      event.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const topic = document.getElementById('contactTopic').value;
      const message = document.getElementById('contactMessage').value;

      try {
        const messages = JSON.parse((localStorage.getItem(STORAGE_KEYS.messages) || localStorage.getItem(STORAGE_KEYS.legacyMessages)) || '[]');
        messages.push({
          name,
          email,
          topic,
          message,
          date: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
        localStorage.setItem(STORAGE_KEYS.legacyMessages, JSON.stringify(messages));
      } catch (e) {}

      nexusAnalytics.track('contact_submitted', { topic });
      showToast(\`Thank you, \${name}! Your message has been sent.\`, '✓');
      const form = document.getElementById('contactForm');
      if (form) form.reset();
    },

    configureAds: function (config) {
      nexusAds.init(config);
    },

    configureAnalytics: function (config) {
      nexusAnalytics.init(config);
    }
  };

  // Fullscreen event listener to sync button UI
  document.addEventListener('fullscreenchange', syncFullscreenButton);
  document.addEventListener('webkitfullscreenchange', syncFullscreenButton);
  document.addEventListener('mozfullscreenchange', syncFullscreenButton);
  document.addEventListener('MSFullscreenChange', syncFullscreenButton);

  function syncFullscreenButton() {
    const btn = document.getElementById('fullscreenBtn');
    if (!btn) return;
    const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    const label = btn.querySelector('.ctrl-btn-text');
    if (label) label.textContent = isFs ? 'Exit' : 'Fullscreen';
  }

  // Global Error Boundary
  window.addEventListener('error', (e) => {
    console.warn('[KopiPlay Runtime Guard]', e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.warn('[KopiPlay Promise Guard]', e.reason);
  });

  // --- Application Bootstrap ---
  async function init() {
    loadLocalState();

    const rawCatalog = window.KIPO_CATALOG || window.NEXUS_CATALOG;
    if (rawCatalog && Array.isArray(rawCatalog) && rawCatalog.length > 0) {
      catalog = rawCatalog;
    }
    const rawCategories = window.KIPO_CATEGORIES || window.NEXUS_CATEGORIES;
    if (rawCategories && Array.isArray(rawCategories) && rawCategories.length > 0) {
      categoryList = rawCategories;
    }

    try {
      if (catalog.length === 0) {
        const gRes = await fetch('data/games.json');
        catalog = await gRes.json();
      }
      if (categoryList.length === 0) {
        const cRes = await fetch('data/categories.json');
        categoryList = await cRes.json();
      }
    } catch (e) {
      // Offline fallback already loaded
    }

    console.log(\`[KopiPlay] Initialized with \${catalog.length} games across \${categoryList.length} categories.\`);

    computeCategoryCounts();
    renderSidebar();
    renderHeader();
    renderFooter();

    try {
      if (window.innerWidth > 1024 && (localStorage.getItem(STORAGE_KEYS.sidebarCollapsed) || localStorage.getItem(STORAGE_KEYS.legacySidebar)) === '1') {
        document.body.classList.add('sidebar-collapsed');
      }
    } catch (e) {}

    initMobileNavEvents();

    // Delegated Card Click Handler (Guarantees card clicks always open games)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.card-fav-btn') || e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;
      const card = e.target.closest('.game-card');
      if (card) {
        const slug = card.getAttribute('data-slug');
        if (slug) {
          window.location.hash = '#/game/' + slug;
        }
      }
    });

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
`;

fs.writeFileSync(path.join(__dirname, '../js/bundle.js'), bundleScript, 'utf8');
console.log('Successfully generated complete upgraded js/bundle.js');


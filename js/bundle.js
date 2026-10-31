/**
 * KipoPlay - Complete Modern Gaming Portal Bundle (Production Ready)
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
      title: 'Play Free Shooting Games Online – KipoPlay',
      description: 'Play action-packed free online shooting games on KipoPlay. Aim, fire, and conquer sniper, tactical FPS, and space blaster browser games with no downloads.',
      intro: 'Welcome to the KipoPlay Shooting Games arena. Whether you favor precision sniper rifles, tactical space blasters, or defensive turret warfare, our shooting library delivers fast-paced target acquisition and reflex testing on both desktop and mobile.',
      faqs: [
        { q: 'Can I play shooting games on mobile without downloading an app?', a: 'Yes! All KipoPlay shooting games run directly in modern mobile browsers via HTML5 and WebGL.' },
        { q: 'What controls are used for browser shooting games?', a: 'Desktop games typically use mouse aiming with left-click to fire, alongside WASD/arrow keys for tactical movement. Touchscreens feature intuitive virtual controls.' },
        { q: 'Are these shooting games completely free?', a: 'Every shooting game on KipoPlay is 100% free with instant, unlimited play.' }
      ]
    },
    'action': {
      title: 'Play Free Action Games Online – KipoPlay',
      description: 'Jump into thrilling free online action games on KipoPlay. Experience combat, ninja duels, survival battles, and fast-paced brawlers instantly in your browser.',
      intro: 'KipoPlay Action Games bring heart-pounding combat, hero quests, and survival arenas straight to your screen. Challenge your reflexes across hand-to-hand combat, dodge hazards, and overcome enemy waves.',
      faqs: [
        { q: 'What makes action games on KipoPlay unique?', a: 'They load instantly with zero downloads, featuring smooth canvas animations, reactive audio, and full responsiveness.' },
        { q: 'Do action games support touch controls?', a: 'Yes, each action title is adapted for touch taps, swipes, and on-screen pads on smartphones and tablets.' },
        { q: 'Can I save my high scores or progress?', a: 'Scores and level progress are safely preserved locally in your browser storage.' }
      ]
    },
    'adventure': {
      title: 'Play Free Adventure Games Online – KipoPlay',
      description: 'Embark on epic free online adventure games on KipoPlay. Explore mysterious dungeons, solve quest puzzles, and journey across captivating digital worlds.',
      intro: 'Step into immersive journeys and mysterious labyrinths with KipoPlay Adventure Games. Uncover secrets, solve ancient mechanisms, and steer brave adventurers through exciting storylines.',
      faqs: [
        { q: 'Are adventure games suitable for all ages?', a: 'Our adventure catalog features family-friendly puzzle quests, fantasy explorations, and rich storytelling.' },
        { q: 'Can I play adventure games on tablet or iPad?', a: 'Absolutely. Responsive aspect ratios ensure full viewability on touch tablets and iPads.' }
      ]
    },
    'racing': {
      title: 'Explore Free Racing Games – KipoPlay',
      description: 'Race at top speeds with free online racing games on KipoPlay. Drift through city tracks, burn rubber on highways, and master precision vehicle control.',
      intro: 'Feel the adrenaline of competition in KipoPlay Racing Games. From neon synthwave highways to off-road dirt tracks, accelerate past rivals and clock record lap times.',
      faqs: [
        { q: 'Do racing games work with keyboard arrow keys?', a: 'Yes, desktop players can steer with Arrow keys or WASD, with Spacebar for nitro or handbrake.' },
        { q: 'Are there 3D racing games available?', a: 'Yes, multiple titles feature smooth 3D canvas and WebGL simulation engines.' }
      ]
    },
    'car': {
      title: 'Play Free Car Games Online – KipoPlay',
      description: 'Enjoy free car games online on KipoPlay. Test your skills with precision parking, highway traffic dodging, stunt driving, and custom supercars.',
      intro: 'Get behind the wheel in KipoPlay Car Games. Master parking challenges, navigate dense city traffic, or test horsepower across high-octane stunt courses.',
      faqs: [
        { q: 'What types of car games are featured?', a: 'We offer precision parking simulators, highway traffic runners, stunt obstacle courses, and drift arenas.' },
        { q: 'Is there any download or installation required?', a: 'No, all car games run instantly inside your web browser.' }
      ]
    },
    'driving': {
      title: 'Free Driving Simulators & Road Games – KipoPlay',
      description: 'Experience realistic free online driving games on KipoPlay. Steer buses, pilot aircraft, navigate traffic highways, and test vehicle handling.',
      intro: 'Take control of diverse vehicles in KipoPlay Driving Games. From airport flight simulators to city transit navigation, experience satisfying vehicular control.',
      faqs: [
        { q: 'Are driving games optimized for mobile devices?', a: 'Yes, on-screen steering controls and touch acceleration pedals are fully integrated.' }
      ]
    },
    'sports': {
      title: 'Discover Sports Games Free Online – KipoPlay',
      description: 'Play free online sports games on KipoPlay. Compete in football, basketball, tennis, bowling, and golf with realistic physics and instant gameplay.',
      intro: 'Step onto the field, court, and green with KipoPlay Sports Games. Score game-winning three-pointers, bend free kicks, and conquer athletic tournaments.',
      faqs: [
        { q: 'Are multiplayer sports games supported?', a: 'Yes, select sports titles support local 2-player turn-based or simultaneous competitive matches.' }
      ]
    },
    'football': {
      title: 'Play Free Football & Soccer Games – KipoPlay',
      description: 'Score epic goals in free online football games on KipoPlay. Master penalty shootouts, tournament championships, and striker headers.',
      intro: 'Experience the world’s favorite sport in KipoPlay Football Games. Beat the goalkeeper, execute curving free kicks, and lift tournament trophies.',
      faqs: [
        { q: 'How do penalty kick controls work?', a: 'Simply swipe or drag your cursor to aim power and curve directly into the goal corners.' }
      ]
    },
    'puzzle': {
      title: 'Play Puzzle Games Online Free – KipoPlay',
      description: 'Challenge your mind with free online puzzle games on KipoPlay. Solve logic grids, sliding tiles, block puzzles, 2048, and match-3 brain teasers.',
      intro: 'Sharpen your cognitive skills with KipoPlay Puzzle Games. Engage in relaxing block placements, strategic tile-matching, and intricate spatial brain teasers.',
      faqs: [
        { q: 'Are puzzle games good for brain training?', a: 'Yes, games like 2048, Sudoku, and spatial block puzzles exercise logic, memory, and concentration.' }
      ]
    },
    'strategy': {
      title: 'Free Strategy & Tactical Games – KipoPlay',
      description: 'Outsmart opponents in free online strategy games on KipoPlay. Command armies, deploy tower defenses, and master tactical board maneuvers.',
      intro: 'Plan your victory step-by-step with KipoPlay Strategy Games. Defend strongholds against invading waves, allocate resources, and checkmate rivals.',
      faqs: [
        { q: 'Are tower defense games included?', a: 'Yes, our strategy library features tower defense titles with tactical upgrade paths.' }
      ]
    },
    'platform': {
      title: 'Play Free Platformer Games Online – KipoPlay',
      description: 'Jump, dash, and run through free online platform games on KipoPlay. Overcome traps, leap across moving platforms, and reach the finish flag.',
      intro: 'Experience pure timing and agile jumps in KipoPlay Platform Games. Hop over hazards, collect glowing gems, and discover hidden shortcuts.',
      faqs: [
        { q: 'Can I play platformers with a keyboard spacebar?', a: 'Yes, Spacebar or Up Arrow performs jumps, with Left/Right keys controlling movement.' }
      ]
    },
    'multiplayer': {
      title: 'Play Free Multiplayer Games Online – KipoPlay',
      description: 'Play free online multiplayer and 2-player games on KipoPlay. Challenge friends on the same device or face rivals in arena battles.',
      intro: 'Gaming is best together! KipoPlay Multiplayer Games offer 2-player shared screen matches, competitive sports duels, and cooperative challenges.',
      faqs: [
        { q: 'How do 2-player games work on one keyboard?', a: 'Player 1 uses WASD while Player 2 uses the Arrow keys, ensuring seamless simultaneous play.' }
      ]
    },
    'arcade': {
      title: 'Classic & Modern Arcade Games – KipoPlay',
      description: 'Relive retro thrills with free online arcade games on KipoPlay. Play Snake, Breakout, high-score runners, and neon reflex games.',
      intro: 'Step into the neon glow of KipoPlay Arcade Games. Enjoy instant high-score chasing, retro brick deflectors, and endless arcade classics.',
      faqs: [
        { q: 'Do arcade games track local high scores?', a: 'Yes, high scores are stored locally in your browser so you can beat your personal best.' }
      ]
    },
    'simulation': {
      title: 'Free Simulation Games Online – KipoPlay',
      description: 'Build, manage, and experience life simulations in free online games on KipoPlay. Run restaurants, manage virtual farms, and pilot crafts.',
      intro: 'Immerse yourself in virtual systems with KipoPlay Simulation Games. Craft efficient businesses, cultivate digital farms, and test engineering builds.',
      faqs: [
        { q: 'Are simulation games relaxing to play?', a: 'Many simulation games are designed for relaxing, low-pressure creative and management gameplay.' }
      ]
    },
    'casual': {
      title: 'Play Casual Games Free Online – KipoPlay',
      description: 'Unwind with fun and relaxing casual games on KipoPlay. Quick, easy-to-learn browser games for satisfying instant entertainment.',
      intro: 'Take a quick break with KipoPlay Casual Games. Designed with intuitive controls and immediate satisfaction, jump in for two minutes or two hours.',
      faqs: [
        { q: 'Do casual games require tutorials?', a: 'No, every casual game is designed with pick-up-and-play simplicity and zero learning curves.' }
      ]
    },
    'kids-games': {
      title: 'Fun & Safe Kids Games Online – KipoPlay',
      description: 'Play safe, kid-friendly free online games on KipoPlay. Enjoy coloring, cute animal adventures, educational puzzles, and gentle fun.',
      intro: 'Delightful entertainment for younger players! KipoPlay Kids Games feature colorful animation, friendly pets, drawing activities, and gentle puzzles.',
      faqs: [
        { q: 'Are kids games safe and family-friendly?', a: 'Yes, games in this category are curated for positive, non-violent, family-friendly fun.' }
      ]
    },
    'beauty': {
      title: 'Free Dress-Up & Fashion Games – KipoPlay',
      description: 'Unleash your creativity with free online fashion, makeup, and beauty games on KipoPlay. Style royal outfits and create chic makeovers.',
      intro: 'Design runway looks and royal styles in KipoPlay Beauty Games. Choose elegant gowns, experiment with makeup palettes, and express fashion creativity.',
      faqs: [
        { q: 'Can I save or take a snapshot of my designs?', a: 'You can easily view full-screen outfits and screenshot your creations on any device.' }
      ]
    },
    'pool': {
      title: 'Play Free 8-Ball & Billiards Games – KipoPlay',
      description: 'Sink 8-ball stripes and solids in free online pool games on KipoPlay. Experience accurate cue ball physics and table angles.',
      intro: 'Chalk your cue in KipoPlay Pool Games. Line up trick shots, calculate cushion rebounds, and master classic 8-Ball and Snooker tables.',
      faqs: [
        { q: 'How is shot power controlled?', a: 'Click and pull back the cue stick with your mouse or finger, releasing when power reaches your target.' }
      ]
    },
    'board-games': {
      title: 'Free Classic Board Games Online – KipoPlay',
      description: 'Play Chess, Checkers, Ludo, and classic board games free on KipoPlay. Challenge computer AI or practice strategic moves.',
      intro: 'Timeless tabletop strategy awaits in KipoPlay Board Games. Play Chess, Ludo, and Dominoes anytime without needing physical pieces.',
      faqs: [
        { q: 'Can I play Chess against different AI difficulties?', a: 'Yes, our chess titles feature multiple skill levels to match beginners and masters alike.' }
      ]
    },
    'card-games': {
      title: 'Free Solitaire & Card Games – KipoPlay',
      description: 'Play Solitaire, Klondike, Spider, and classic card games free on KipoPlay. Enjoy smooth card deals, hints, and undo moves.',
      intro: 'Shuffle the deck in KipoPlay Card Games. Relax with classic Klondike Solitaire, test patience in Spider, or clear card pyramids with undo features.',
      faqs: [
        { q: 'Does Solitaire offer unlimited undos?', a: 'Yes, our Solitaire games support free undo moves and helpful card hints.' }
      ]
    },
    'clicker': {
      title: 'Play Idle & Clicker Games Free – KipoPlay',
      description: 'Tap, upgrade, and build empires with free online clicker games on KipoPlay. Enjoy exponential progression and satisfying idle unlocks.',
      intro: 'Watch numbers multiply in KipoPlay Clicker Games. Tap for revenue, purchase automated upgrades, and build thriving idle businesses.',
      faqs: [
        { q: 'Does idle progress continue when I switch tabs?', a: 'Yes, clicker games store your progression and calculate offline returns upon return.' }
      ]
    },
    'io-games': {
      title: 'Free .io Games & Arena Battles – KipoPlay',
      description: 'Survive and dominate competitive battle arenas in free .io games on KipoPlay. Grow your champion, outmaneuver rivals, and lead the scoreboard.',
      intro: 'Jump into fast-paced survival rings in KipoPlay .io Games. Eat power nodes, grow in size, and outsmart rivals in non-stop browser arenas.',
      faqs: [
        { q: 'Are .io games fast to join?', a: 'Yes, simply enter and you are instantly spawned into the active arena with zero queues.' }
      ]
    }
  };


  // --- Centralized Site Configuration ---
  const SITE_CONFIG = {
    brandName: 'KipoPlay',
    tagline: 'Play More. Discover More.',
    category: 'Free Online Games',
    description: 'KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports.',
    homepageTitle: 'KipoPlay – Play Free Online Games',
    homepageDescription: 'Discover KipoPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.',
    productionDomain: 'https://kipo.in'
  };

  const STORAGE_KEYS = {
    favorites: 'kipoplay_favorites',
    recentlyPlayed: 'kipoplay_recent',
    sortPref: 'kipoplay_sort_pref',
    sidebarCollapsed: 'kipoplay_sidebar_collapsed',
    reports: 'kipoplay_game_reports',
    messages: 'kipoplay_contact_messages',
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
    toast.innerHTML = `<span style="font-size:1.1rem; color:#38BDF8;">${icon}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
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
      return `
        <div class="nexus-ad-slot-wrap" data-slot="${escapeHtml(slotName)}" style="margin: 20px 0; text-align: center;">
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="${escapeHtml(ADS_CONFIG.client)}"
               data-ad-slot="${escapeHtml(ADS_CONFIG.slots[slotName])}"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      `;
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
      const schemaScript = document.getElementById('kipo-schema') || document.getElementById('nexus-schema');
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schema, null, 2);
      }
    }
  }

  // --- Render Sidebar ---
  function renderSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    let catListHtml = '';
    let visibleCategoryCount = 0;

    categoryList.forEach(cat => {
      const count = categoryCounts[cat.slug] || 0;
      if (count === 0) return;
      visibleCategoryCount++;

      const iconSvg = getCategoryIcon(cat.slug);
      catListHtml += `
        <a href="#/category/${cat.slug}" class="category-nav-item" data-category="${cat.slug}" data-tooltip="${cat.name}" title="${cat.name}">
          <div class="category-nav-left">
            <span class="category-nav-icon">${iconSvg}</span>
            <span class="category-nav-name">${cat.name}</span>
          </div>
          <span class="category-nav-count">${count}</span>
        </a>
      `;
    });

    sidebar.innerHTML = `
      <div class="sidebar-header">
        <a href="#/" class="sidebar-brand" aria-label="KipoPlay Home" data-tooltip="KipoPlay Home">
          <img class="brand-full" src="assets/images/logo.svg" alt="KipoPlay">
          <img class="brand-icon" src="assets/images/favicon.svg" alt="KipoPlay" title="Click to expand sidebar">
        </a>
        <button class="sidebar-collapse-btn" id="sidebarCollapseBtn" aria-label="Toggle Sidebar" title="Collapse sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-nav-group">
          <a href="#/" class="nav-pill" data-nav="home" data-tooltip="Home" title="Home">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
            <span class="nav-pill-label">Home</span>
          </a>
          <a href="#/popular" class="nav-pill" data-nav="popular" data-tooltip="Popular Games" title="Popular Games">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg></span>
            <span class="nav-pill-label">Popular Games</span>
          </a>
          <a href="#/new" class="nav-pill" data-nav="new" data-tooltip="New Games" title="New Games">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg></span>
            <span class="nav-pill-label">New Games</span>
          </a>
          <a href="#/recent" class="nav-pill" data-nav="recent" data-tooltip="Recently Played" title="Recently Played">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <span class="nav-pill-label">Recently Played</span>
            <span class="sidebar-section-count" id="recentBadgeCount">${recentlyPlayed.length}</span>
          </a>
          <a href="#/favorites" class="nav-pill" data-nav="favorites" data-tooltip="My Favorites" title="My Favorites">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
            <span class="nav-pill-label">My Favorites</span>
            <span class="sidebar-section-count" id="favBadgeCount">${favorites.length}</span>
          </a>
          <a href="#/games" class="nav-pill" data-nav="games" data-tooltip="All 200 Games" title="All 200 Games">
            <span class="nav-icon-badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
            <span class="nav-pill-label">All 200 Games</span>
            <span class="sidebar-section-count">${catalog.length}</span>
          </a>
        </div>

        <div class="sidebar-section-header">
          <span>Categories</span>
          <span class="sidebar-section-count" id="sidebarCategoryCount">${visibleCategoryCount}</span>
        </div>

        <div class="category-nav-list" id="categoryNavList">
          ${catListHtml}
        </div>
      </div>
    `;

    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          document.body.classList.remove('mobile-sidebar-open');
        } else {
          const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
          try {
            localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, isCollapsed ? '1' : '0');
          } catch (e) {}
        }
      });
    }

    const brandIcon = sidebar.querySelector('.brand-icon');
    if (brandIcon) {
      brandIcon.addEventListener('click', (e) => {
        if (document.body.classList.contains('sidebar-collapsed')) {
          e.preventDefault();
          document.body.classList.remove('sidebar-collapsed');
          try {
            localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, '0');
          } catch (err) {}
        }
      });
    }
  }

  function initSidebarTooltips() {
    let tooltipEl = document.getElementById('sidebar-floating-tooltip');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'sidebar-floating-tooltip';
      tooltipEl.className = 'sidebar-floating-tooltip';
      document.body.appendChild(tooltipEl);
    }

    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    sidebar.addEventListener('mouseover', (e) => {
      if (!document.body.classList.contains('sidebar-collapsed') || window.innerWidth <= 1024) {
        tooltipEl.classList.remove('visible');
        return;
      }
      const item = e.target.closest('.nav-pill, .category-nav-item, .sidebar-brand');
      if (!item) {
        tooltipEl.classList.remove('visible');
        return;
      }
      const text = item.getAttribute('data-tooltip') || (item.classList.contains('sidebar-brand') ? 'KipoPlay (Click to expand)' : '');
      if (!text) {
        tooltipEl.classList.remove('visible');
        return;
      }
      const rect = item.getBoundingClientRect();
      tooltipEl.textContent = text;
      tooltipEl.style.top = `${rect.top + rect.height / 2}px`;
      tooltipEl.style.left = `${rect.right + 10}px`;
      tooltipEl.classList.add('visible');
    });

    sidebar.addEventListener('mouseleave', () => {
      tooltipEl.classList.remove('visible');
    });

    window.addEventListener('scroll', () => {
      tooltipEl.classList.remove('visible');
    }, { passive: true });
  }

  // --- Render Header ---
  function renderHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    header.innerHTML = `
      <div class="header-inner">
        <div class="header-left">
          <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open Navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="search-wrapper">
            <div class="search-input-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" class="search-input" id="globalSearchInput" placeholder="Search games..." autocomplete="off" aria-label="Search games catalog">
              <button class="search-clear-btn" id="searchClearBtn" aria-label="Clear Search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div class="search-suggestions" id="searchSuggestions" role="listbox"></div>
          </div>
        </div>
        <div class="header-right">
          <a href="#/favorites" class="btn-header-fav" id="headerFavLink" title="View Favorites" aria-label="Favorites">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="header-fav-text">Favorites</span>
            <span class="header-fav-count" id="headerFavCount">${favorites.length}</span>
          </a>
        </div>
      </div>
    `;

    initSearchEvents();
    initMobileNavEvents();
  }

  // --- PHASE 1: Professional 4-Column Gaming Portal Footer ---
  function renderFooter() {
    const footer = document.getElementById('app-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-top">
          <!-- Column 1: Brand -->
          <div class="footer-brand">
            <a href="#/" class="footer-logo" aria-label="KipoPlay Home">
              <img src="assets/images/logo.svg" alt="KipoPlay" height="38">
            </a>
            <p>KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports. Enjoy seamless instant play on desktop and mobile.</p>
            <div class="footer-experience-badge">
              <span class="pulse-dot"></span>
              <span>Play More. Discover More. • Free Online Games</span>
            </div>
          </div>

          <!-- Column 2: Popular Categories -->
          <div class="footer-col">
            <h4>Popular Categories</h4>
            <ul class="footer-links">
              <li><a href="#/category/shooting" class="footer-link">Shooting Games</a></li>
              <li><a href="#/category/action" class="footer-link">Action Games</a></li>
              <li><a href="#/category/adventure" class="footer-link">Adventure Games</a></li>
              <li><a href="#/category/racing" class="footer-link">Racing Games</a></li>
              <li><a href="#/category/car" class="footer-link">Car Games</a></li>
              <li><a href="#/category/puzzle" class="footer-link">Puzzle Games</a></li>
              <li><a href="#/category/sports" class="footer-link">Sports Games</a></li>
            </ul>
          </div>

          <!-- Column 3: Portal Navigation -->
          <div class="footer-col">
            <h4>Portal Navigation</h4>
            <ul class="footer-links">
              <li><a href="#/" class="footer-link">Home</a></li>
              <li><a href="#/games" class="footer-link">All Games</a></li>
              <li><a href="#/popular" class="footer-link">Popular Games</a></li>
              <li><a href="#/new" class="footer-link">New Games</a></li>
              <li><a href="#/recent" class="footer-link">Recently Played</a></li>
              <li><a href="#/favorites" class="footer-link">My Favorites</a></li>
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
          <div>&copy; 2026 KipoPlay. All rights reserved. Play More. Discover More.</div>
          <div class="footer-bottom-links">
            <a href="#/about">About</a>
            <a href="#/privacy">Privacy Policy</a>
            <a href="#/terms">Terms of Service</a>
            <a href="#/dmca">DMCA Policy</a>
            <a href="#/contact">Support</a>
          </div>
        </div>
      </div>
    `;
  }

  // --- Search & Drawer Listeners ---
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
          suggestions.innerHTML = matches.map(g => `
            <a href="#/game/${g.slug}" class="suggestion-item" onclick="document.getElementById('searchSuggestions').classList.remove('active')">
              <img class="suggestion-thumb" src="${g.thumbnail}" alt="${escapeHtml(g.title)}" width="48" height="32" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="suggestion-info">
                <div class="suggestion-title">${escapeHtml(g.title)}</div>
                <div class="suggestion-cat">${escapeHtml(g.category || 'Arcade')}</div>
              </div>
              <span style="font-size:0.75rem; font-weight:700; color:#38BDF8; padding:3px 8px; border-radius:4px; background:rgba(56,189,248,0.1);">PLAY</span>
            </a>
          `).join('');
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
    const catName = game.category || 'Arcade';
    const rating = game.rating ? game.rating.toFixed(1) : '4.5';

    let badgeHtml = '';
    if (game.rating && game.rating >= 4.8) {
      badgeHtml = '<span class="card-badge badge-top">TOP</span>';
    } else if (game.isNew || (game.dateAdded && game.dateAdded >= '2024-03-01')) {
      badgeHtml = '<span class="card-badge badge-new">NEW</span>';
    } else if (game.plays && game.plays > 15000) {
      badgeHtml = '<span class="card-badge badge-hot">HOT</span>';
    }

    return `
      <div class="game-card" data-slug="${game.slug}">
        <div class="card-media">
          <img class="card-thumb"
               src="${game.thumbnail}"
               alt="${escapeHtml(game.title)} free HTML5 game"
               loading="lazy"
               decoding="async"
               width="280"
               height="158"
               onerror="this.onerror=null;this.src='assets/images/games/default-game.svg'">
          ${badgeHtml}
          <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" onclick="window.NEXUS.toggleFav('${game.slug}', event)" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" aria-label="Toggle favorite">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <a href="#/game/${game.slug}" class="card-play-overlay" aria-label="Play ${escapeHtml(game.title)}">
            <div class="card-play-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
            </div>
          </a>
        </div>
        <div class="card-details">
          <a href="#/game/${game.slug}" class="card-title" title="${escapeHtml(game.title)}">${escapeHtml(game.title)}</a>
          <div class="card-meta-row">
            <span class="card-category-pill">${escapeHtml(catName)}</span>
            <span class="card-rating-pill" style="display:inline-flex; align-items:center; gap:3px; color:#F59E0B; font-weight:700;">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${rating}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // --- Scroll Row Shelf ---
  function renderShelf(title, iconSvg, seeAllHref, games, rowId) {
    if (!games || games.length === 0) return '';
    const cardsHtml = games.map(renderCard).join('');

    return `
      <section class="scroll-section" id="sec-${rowId}">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon">${iconSvg}</span>
            <h2 class="section-shelf-title">${title}</h2>
            <span class="sidebar-section-count">${games.length}</span>
          </div>
          <div class="section-actions">
            ${seeAllHref ? `<a href="${seeAllHref}" class="see-all-link">See All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a>` : ''}
            <div class="scroll-controls">
              <button class="scroll-arrow-btn prev" onclick="window.NEXUS.scrollRow('${rowId}', -1)" aria-label="Scroll left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="scroll-arrow-btn next" onclick="window.NEXUS.scrollRow('${rowId}', 1)" aria-label="Scroll right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-row-wrapper">
          <div class="scroll-row" id="${rowId}">
            ${cardsHtml}
          </div>
        </div>
      </section>
    `;
  }

  // --- PHASE 3: Homepage SEO Rich Content Section ---
  function renderHomepageSeoSection() {
    return `
      <section class="portal-seo-section" aria-label="About KipoPlay Free Online Games">
        <h2>Play Free Online Games on KipoPlay</h2>
        <p>KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports. Play directly in your browser with instant execution and zero downloads.</p>

        <div class="seo-highlight-grid">
          <div class="seo-highlight-item">
            <h4>Explore Free Online Games</h4>
            <p>From quick 2-minute casual puzzles to immersive 3D racing simulators, every game runs smoothly in modern web browsers.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Popular Gaming Categories</h4>
            <p>Master target acquisition in Shooting Games, solve logic challenges in Puzzle & Brain, or accelerate down neon tracks in Racing & Car games.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Discover New Browser Games</h4>
            <p>Our library is regularly updated with handpicked, legitimate HTML5 creations from verified game developers worldwide.</p>
          </div>
          <div class="seo-highlight-item">
            <h4>Play on Desktop and Mobile</h4>
            <p>Responsive design adapts seamlessly whether you are on a high-resolution desktop PC, laptop, iPad, tablet, or smartphone.</p>
          </div>
        </div>

        <h3>Frequently Asked Questions</h3>
        <div class="faq-accordion">
          <details class="faq-item" open>
            <summary class="faq-question">Are all games on KipoPlay really free?</summary>
            <div class="faq-answer">Yes, 100%. Every single game in our 200-game catalog is completely free to play directly in your web browser with no hidden paywalls or subscription requirements.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Do I need to download or install any plugins?</summary>
            <div class="faq-answer">No downloads or plugins are required. All games are built on modern web standards (HTML5 Canvas, WebGL, Web Audio) that run natively in Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Can I play KipoPlay games on my phone or tablet?</summary>
            <div class="faq-answer">Yes! KipoPlay is fully responsive. Mobile touchscreen controls, virtual thumbsticks, and adaptive aspect ratios are provided for smooth handheld gameplay.</div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">How are my favorites and game history saved?</summary>
            <div class="faq-answer">Your starred favorites and recently played games are saved securely on your local device using your browser's private localStorage. No personal tracking or account registration is needed.</div>
          </details>
        </div>
      </section>
    `;
  }

  // --- View: Homepage (All 11 Sections + SEO Rich Content) ---
  function renderHomepage() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'KipoPlay – Play Free Online Games',
      description: 'Discover KipoPlay, your destination for free online games. Play browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile.',
      canonical: 'https://kipo.in/',
      ogType: 'website',
      ogImage: 'assets/images/logo.svg',
      schema: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "KipoPlay",
        "alternateName": "KipoPlay Online Games",
        "url": "https://kipo.in/",
        "description": "KipoPlay is an online gaming platform where players can discover and enjoy browser-based games across multiple categories, including Action, Adventure, Racing, Puzzle, Shooting and Sports."
      }
    });

    const topPicks = [...catalog].sort((a,b) => (b.rating || 4.5) - (a.rating || 4.5)).slice(0, 16);
    const featured = catalog.filter(g => g.featured || (g.tags && g.tags.includes('featured'))).slice(0, 16);
    const featuredList = featured.length >= 8 ? featured : catalog.slice(0, 16);
    const popular = catalog.filter(g => (g.plays && g.plays > 10000) || (g.rating && g.rating >= 4.7)).slice(0, 16);
    const shooting = catalog.filter(g => g._categories && g._categories.includes('shooting')).slice(0, 16);
    const racing = catalog.filter(g => g._categories && (g._categories.includes('racing') || g._categories.includes('car'))).slice(0, 16);
    const actionAdv = catalog.filter(g => g._categories && (g._categories.includes('action') || g._categories.includes('adventure'))).slice(0, 16);
    const puzzle = catalog.filter(g => g._categories && g._categories.includes('puzzle')).slice(0, 16);
    const sports = catalog.filter(g => g._categories && (g._categories.includes('sports') || g._categories.includes('football'))).slice(0, 16);
    const multiplayer = catalog.filter(g => g._categories && (g._categories.includes('multiplayer') || (g.features && g.features.includes('multiplayer')))).slice(0, 16);
    const newGames = catalog.filter(g => g.isNew || (g.dateAdded && g.dateAdded >= '2024-03-01')).slice(0, 16);
    const exploreGames = catalog.slice(0, 48);

    const html = `
      <!-- Hero Banner -->
      <section class="portal-hero">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="live-dot"></span> 200 Free Games Live
          </div>
          <h1 class="hero-title">
            Play The Best Free Games <span>Online</span>
          </h1>
          <p class="hero-subtitle">
            Play More. Discover More. Enjoy browser-based action, racing, puzzle, adventure, shooting and sports games on desktop and mobile with instant play.
          </p>
          <div class="hero-buttons">
            <a href="#/games" class="btn btn-primary">Explore All 200 Games</a>
            <a href="#/category/shooting" class="btn btn-secondary">Shooting Action</a>
          </div>
        </div>
        <div class="hero-stats">
          <div class="hero-stat-box">
            <div class="stat-number">200</div>
            <div class="stat-label">Games</div>
          </div>
          <div class="hero-stat-box">
            <div class="stat-number">22</div>
            <div class="stat-label">Categories</div>
          </div>
          <div class="hero-stat-box">
            <div class="stat-number">100%</div>
            <div class="stat-label">Free</div>
          </div>
        </div>
      </section>

      ${nexusAds.renderSlot('homeLeaderboard')}

      <!-- 1. Top Picks for You -->
      ${renderShelf('Top Picks for You', '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', '#/popular', topPicks, 'row-top-picks')}

      <!-- 2. Featured Games -->
      ${renderShelf('Featured Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>', '#/games', featuredList, 'row-featured')}

      <!-- 3. Popular Games -->
      ${renderShelf('Popular Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-2.5 1-4.5 3-6 0 2.5 1.5 4.5 3 4.5s2-2 2-7.5z"/></svg>', '#/popular', popular, 'row-popular')}

      <!-- 4. Shooting Games -->
      ${renderShelf('Shooting Games', getCategoryIcon('shooting'), '#/category/shooting', shooting, 'row-shooting')}

      <!-- 5. Racing Games -->
      ${renderShelf('Racing & Car Games', getCategoryIcon('racing'), '#/category/racing', racing, 'row-racing')}

      <!-- 6. Action & Adventure -->
      ${renderShelf('Action & Adventure', getCategoryIcon('action'), '#/category/action', actionAdv, 'row-action')}

      <!-- 7. Puzzle & Brain Games -->
      ${renderShelf('Puzzle & Brain Games', getCategoryIcon('puzzle'), '#/category/puzzle', puzzle, 'row-puzzle')}

      <!-- 8. Sports Games -->
      ${renderShelf('Sports & Football', getCategoryIcon('sports'), '#/category/sports', sports, 'row-sports')}

      <!-- 9. Multiplayer Games -->
      ${multiplayer.length > 0 ? renderShelf('Multiplayer Games', getCategoryIcon('multiplayer'), '#/category/multiplayer', multiplayer, 'row-multiplayer') : ''}

      <!-- 10. New Games -->
      ${renderShelf('New Games', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>', '#/new', newGames, 'row-new')}

      <!-- 11. Explore All Games -->
      <section class="explore-all-section" style="margin-top: 10px; margin-bottom: 30px;">
        <div class="section-shelf-header">
          <div class="section-shelf-title-wrap">
            <span class="section-badge-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>
            <h2 class="section-shelf-title">Explore All Games</h2>
            <span class="sidebar-section-count">${catalog.length}</span>
          </div>
          <a href="#/games" class="see-all-link">View Full Library (${catalog.length})</a>
        </div>
        <div class="games-grid">
          ${exploreGames.map(renderCard).join('')}
        </div>
        <div style="margin-top: 24px; text-align: center;">
          <a href="#/games" class="btn btn-primary" style="padding: 12px 30px; font-weight: 700; border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 8px;">
            <span>Browse Complete Library (${catalog.length} Games)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </section>

      <!-- PHASE 3: Rich Homepage SEO Content -->
      ${renderHomepageSeoSection()}
    `;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- View: All Games / Category / Filtered View (With Phase 4 Category SEO) ---
  function renderAllGamesView(title = 'All Games', games = catalog, activeCatSlug = null) {
    const main = document.getElementById('app-main');
    if (!main) return;

    const catSeo = (activeCatSlug && CATEGORY_SEO_DATA[activeCatSlug]) || null;
    let pageTitle = catSeo ? catSeo.title : `${title} – KipoPlay Online Gaming`;
    let metaDescription = catSeo ? catSeo.description : `Browse ${games.length} free HTML5 browser games in our collection on KipoPlay.`;
    let introText = catSeo ? catSeo.intro : `Showing ${games.length} verified instant-play browser games.`;

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
      canonical: activeCatSlug ? `https://kipo.in/#/category/${activeCatSlug}` : 'https://kipo.in/#/games',
      ogType: 'website',
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": pageTitle,
        "description": metaDescription,
        "url": activeCatSlug ? `https://kipo.in/#/category/${activeCatSlug}` : 'https://kipo.in/#/games'
      }
    });

    const cardsHtml = sorted.length > 0
      ? sorted.map(renderCard).join('')
      : `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="width: 54px; height: 54px; margin: 0 auto 16px; border-radius: 50%; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 style="color:#FFF; font-family:var(--font-heading); margin-bottom:8px;">No Games Found</h3>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:18px;">We couldn't find games matching your criteria. Try another category or search term!</p>
          <a href="#/games" class="btn btn-primary">Browse All Games</a>
        </div>
      `;

    const iconSvg = activeCatSlug ? getCategoryIcon(activeCatSlug) : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';

    // Category FAQ Section if active category has FAQs
    let categoryFaqHtml = '';
    if (catSeo && catSeo.faqs && catSeo.faqs.length > 0) {
      categoryFaqHtml = `
        <div class="portal-seo-section" style="margin-top: 36px;">
          <h2>${escapeHtml(title)} FAQ</h2>
          <div class="faq-accordion">
            ${catSeo.faqs.map((f, i) => `
              <details class="faq-item" ${i === 0 ? 'open' : ''}>
                <summary class="faq-question">${escapeHtml(f.q)}</summary>
                <div class="faq-answer">${escapeHtml(f.a)}</div>
              </details>
            `).join('')}
          </div>
        </div>
      `;
    }

    const html = `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="section-badge-icon" style="width: 36px; height: 36px;">${iconSvg}</span>
            <div>
              <h1 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF; margin: 0;">${escapeHtml(title)}</h1>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin: 4px 0 0 0;">${escapeHtml(introText)}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="sidebar-section-count" style="font-size: 0.82rem; padding: 4px 12px;">${games.length} ${games.length === 1 ? 'Game' : 'Games'}</span>
            <select id="sortSelect" onchange="window.NEXUS.sortView(this.value)" style="background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-primary); padding: 6px 12px; border-radius: var(--radius-sm); font-size: 0.85rem; outline: none; cursor: pointer;">
              <option value="featured" ${currentSort==='featured'?'selected':''}>Sort: Featured</option>
              <option value="rating" ${currentSort==='rating'?'selected':''}>Top Rated</option>
              <option value="plays" ${currentSort==='plays'?'selected':''}>Most Played</option>
              <option value="newest" ${currentSort==='newest'?'selected':''}>Newest First</option>
              <option value="az" ${currentSort==='az'?'selected':''}>Title: A to Z</option>
              <option value="za" ${currentSort==='za'?'selected':''}>Title: Z to A</option>
            </select>
          </div>
        </div>

        <!-- Category Shortcuts Bar -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 12px; scrollbar-width: none;">
          <a href="#/games" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid ${!activeCatSlug ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: ${!activeCatSlug ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: ${!activeCatSlug ? '#38BDF8' : 'var(--text-secondary)'};">
            All (${catalog.length})
          </a>
          ${categoryList.map(c => {
            const count = categoryCounts[c.slug] || 0;
            if (count === 0) return '';
            const isActive = activeCatSlug === c.slug;
            return `
              <a href="#/category/${c.slug}" style="white-space: nowrap; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-decoration: none; border: 1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: ${isActive ? 'rgba(37,99,235,0.2)' : 'var(--bg-card)'}; color: ${isActive ? '#38BDF8' : 'var(--text-secondary)'};">
                ${c.name} (${count})
              </a>
            `;
          }).join('')}
        </div>
      </div>

      ${nexusAds.renderSlot('categoryBanner')}

      <div class="games-grid" id="mainGamesGrid">
        ${cardsHtml}
      </div>

      ${categoryFaqHtml}
    `;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });
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
      main.innerHTML = `
        <div class="info-page-container" style="text-align: center; padding: 80px 20px;">
          <h2 style="color: #FFF; font-family: var(--font-heading); margin-bottom: 12px;">Game Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">We couldn't locate the game "${escapeHtml(slug)}". It may have been renamed or moved.</p>
          <a href="#/games" class="btn btn-primary">Browse All 200 Games</a>
        </div>
      `;
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
    const catSlug = (game._categories && game._categories[0]) || 'arcade';
    const related = catalog.filter(g => g.slug !== game.slug && (g._categories.some(c => game._categories.includes(c)) || g.category === game.category)).slice(0, 10);

    const metaStr = ((game.category || '') + ' ' + (game.tags || []).join(' ') + ' ' + (game.slug || '')).toLowerCase();
    let initialRatioClass = 'ratio-16-9';
    let initialRatioLabel = '16:9';
    if (/puzzle|2048|snake|block|mahjong|board|card|connect|logic|sudoku|bubble|chess|idle|tapper/i.test(metaStr)) {
      initialRatioClass = 'ratio-4-3';
      initialRatioLabel = '4:3';
    }

    // Dynamic SEO Metadata for Game Page
    const gameSeoTitle = `${game.title} – Play Free Online on KipoPlay`;
    const gameSeoDesc = game.description || `Play ${game.title} free in your browser on KipoPlay. Instant HTML5 gameplay with no downloads or installation.`;

    updateSeo({
      title: gameSeoTitle,
      description: gameSeoDesc,
      canonical: `https://kipo.in/#/game/${game.slug}`,
      ogType: 'game',
      ogImage: game.thumbnail,
      schema: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game.title,
        "description": gameSeoDesc,
        "image": game.thumbnail,
        "genre": game.category || "Arcade",
        "playMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any modern web browser (Desktop & Mobile)",
        "inLanguage": "en",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": (game.rating || 4.5).toFixed(1),
          "ratingCount": game.plays ? Math.floor(game.plays / 10) : 150,
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    });

    const controlsGuide = game.controls || game.instructions || 'Use Mouse / Keyboard (Arrow keys, WASD, Spacebar) on desktop, or intuitive touch taps/swipes on mobile.';
    const supportedDevices = game.controlsType || 'Desktop, Tablet & Mobile';

    const html = `
      <!-- Breadcrumbs & Back Navigation with Microdata Schema -->
      <nav class="breadcrumbs" aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        <button onclick="window.NEXUS.goBack()" class="player-back-btn" aria-label="Back to previous page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Back</span>
        </button>
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="#/" class="breadcrumb-link" itemprop="item"><span itemprop="name">Home</span></a>
          <meta itemprop="position" content="1" />
        </span>
        <span class="breadcrumb-separator">/</span>
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="#/category/${catSlug}" class="breadcrumb-link" itemprop="item"><span itemprop="name">${escapeHtml(game.category || 'Arcade')}</span></a>
          <meta itemprop="position" content="2" />
        </span>
        <span class="breadcrumb-separator">/</span>
        <span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <span class="breadcrumb-current" itemprop="name">${escapeHtml(game.title)}</span>
          <meta itemprop="position" content="3" />
        </span>
      </nav>

      <div class="game-detail-layout" id="gameDetailLayout">
        <!-- Main Column -->
        <div class="game-main-content">
          <div class="player-container ${initialRatioClass}" id="playerContainer">
            <iframe
              id="gameFrame"
              class="game-iframe"
              src="${embedUrl}"
              title="${escapeHtml(game.title)} - Free HTML5 Game"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowfullscreen
              referrerpolicy="origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-pointer-lock allow-modals allow-orientation-lock allow-presentation"
              loading="eager"
            ></iframe>
            <div class="player-loader" id="playerLoader">
              <div class="spinner"></div>
              <div class="loader-text">Connecting to ${escapeHtml(game.title)}...</div>
            </div>
            <!-- Player Timeout & Retry Overlay -->
            <div class="player-retry-overlay" id="playerRetryOverlay" style="display:none;">
              <div class="player-retry-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div class="player-retry-title">Game Loading Stalled</div>
              <div class="player-retry-desc">The game is taking longer than usual to connect. You can retry loading or launch it directly in a clean window.</div>
              <div class="player-retry-actions">
                <button class="btn btn-primary" onclick="window.NEXUS.reloadGame()">Retry Loading</button>
                <a href="${embedUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Open Directly</a>
              </div>
            </div>
          </div>

          <!-- Controls Bar -->
          <div class="player-controls-bar">
            <div class="player-controls-left">
              <img class="player-bar-thumb" src="${game.thumbnail}" alt="${escapeHtml(game.title)}" width="38" height="38" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
              <div class="player-bar-info">
                <h1 class="player-game-title">${escapeHtml(game.title)}</h1>
                <span class="player-bar-cat">${escapeHtml(game.category || 'Arcade')}</span>
              </div>
              <button class="ctrl-btn ${isFav ? 'is-fav' : ''}" id="playerFavBtn" onclick="window.NEXUS.togglePlayerFav('${game.slug}')" title="Favorite" aria-label="Favorite">
                <span class="ctrl-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </span>
                <span class="ctrl-btn-text" id="playerFavLabel">${isFav ? 'Favorited' : 'Favorite'}</span>
              </button>
            </div>

            <div class="player-controls-right">
              <button class="ctrl-btn" onclick="window.NEXUS.reloadGame()" title="Reload game" aria-label="Reload">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></span>
                <span class="ctrl-btn-text">Reload</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.cycleAspectRatio()" title="Aspect Ratio" aria-label="Aspect Ratio">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></span>
                <span class="ctrl-btn-text" id="ratioLabel">${initialRatioLabel}</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.toggleTheater()" title="Theater mode" aria-label="Theater Mode">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
                <span class="ctrl-btn-text">Theater</span>
              </button>

              <button class="ctrl-btn btn-fullscreen" id="fullscreenBtn" onclick="window.NEXUS.toggleFullscreen()" title="Fullscreen" aria-label="Fullscreen">
                <span class="ctrl-btn-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></span>
                <span class="ctrl-btn-text">Fullscreen</span>
              </button>

              <button class="ctrl-btn" onclick="window.NEXUS.openReport('${game.slug}')" title="Report issue with this game" aria-label="Report">
                <span class="ctrl-btn-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>
                <span class="ctrl-btn-text">Report</span>
              </button>
            </div>
          </div>

          <!-- Metadata & SEO Description Card -->
          <div class="game-info-card">
            <h2>About ${escapeHtml(game.title)}</h2>
            <div class="game-meta-tags">
              <span class="card-badge badge-popular" style="position:static;">${escapeHtml(game.category || 'Arcade')}</span>
              <span style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.25); color:#38BDF8; padding:4px 10px; border-radius:4px; font-size:0.75rem; font-weight:700;">${escapeHtml(supportedDevices)}</span>
              ${game.tags ? game.tags.slice(0, 5).map(t => `<span style="background:rgba(255,255,255,0.06); padding:4px 10px; border-radius:4px; font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(t)}</span>`).join('') : ''}
            </div>
            <p style="color:var(--text-secondary); line-height:1.75; font-size:0.95rem; margin-bottom:20px;">
              ${escapeHtml(game.description || 'Play ' + game.title + ' instantly online on KipoPlay. No download required. Free browser gameplay across desktop and mobile devices.')}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 14px;">
              <div style="background:rgba(255,255,255,0.03); border-left:3px solid var(--accent-primary); padding:14px 18px; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                <h4 style="color:#FFF; font-size:0.92rem; font-family:var(--font-heading); margin-bottom:6px;">🎮 Game Controls</h4>
                <p style="color:var(--text-muted); font-size:0.88rem; line-height:1.6; margin:0;">${escapeHtml(controlsGuide)}</p>
              </div>

              <div style="background:rgba(255,255,255,0.03); border-left:3px solid var(--accent-purple); padding:14px 18px; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                <h4 style="color:#FFF; font-size:0.92rem; font-family:var(--font-heading); margin-bottom:6px;">📱 Supported Devices</h4>
                <p style="color:var(--text-muted); font-size:0.88rem; line-height:1.6; margin:0;">Playable across Windows, Mac, Chromebook, iPhone, iPad, and Android without installing apps.</p>
              </div>
            </div>
          </div>

          ${nexusAds.renderSlot('gameFooter')}
        </div>

        <!-- Related Games Sidebar Column -->
        <div class="game-sidebar">
          <h3 style="font-family:var(--font-heading); font-size:1.05rem; font-weight:800; color:#FFF; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            Related Games
          </h3>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${related.map(r => `
              <a href="#/game/${r.slug}" style="display:flex; align-items:center; gap:12px; padding:8px 10px; border-radius:var(--radius-md); background:var(--bg-surface); border:1px solid var(--border-subtle); text-decoration:none; transition:all var(--transition-fast);" onmouseover="this.style.background='var(--bg-surface-hover)'" onmouseout="this.style.background='var(--bg-surface)'">
                <img src="${r.thumbnail}" alt="${escapeHtml(r.title)}" width="52" height="36" style="width:52px; height:36px; border-radius:4px; object-fit:cover;" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/favicon.svg'">
                <div style="min-width:0; flex:1;">
                  <div style="font-size:0.86rem; font-weight:700; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(r.title)}</div>
                  <div style="font-size:0.72rem; color:var(--text-muted);">${escapeHtml(r.category || 'Arcade')}</div>
                </div>
              </a>
            `).join('')}
          </div>
          ${nexusAds.renderSlot('gameSidebar')}
        </div>
      </div>
    `;

    main.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Dynamic provider-aware timeout & postMessage detection
    if (activePlayerTimeout) {
      clearTimeout(activePlayerTimeout);
      activePlayerTimeout = null;
    }
    if (activePostMessageCleanup) {
      window.removeEventListener('message', activePostMessageCleanup);
      activePostMessageCleanup = null;
    }

    const frame = document.getElementById('gameFrame');
    const loader = document.getElementById('playerLoader');
    const retry = document.getElementById('playerRetryOverlay');
    if (retry) retry.style.display = 'none';

    // Provider-aware timeout:
    // Local games load in <6s
    // HTMLGames CDN loads in <12s
    // External WebGL / distributor games (GameDistribution, GameMonetize, Famobi) load interstitial ads and large bundles, so 16s
    let timeoutMs = 16000;
    if (embedUrl.startsWith('games/')) {
      timeoutMs = 6000;
    } else if (embedUrl.includes('cdn.htmlgames.com')) {
      timeoutMs = 12000;
    }

    function onGameActive() {
      if (activePlayerTimeout) {
        clearTimeout(activePlayerTimeout);
        activePlayerTimeout = null;
      }
      if (loader) loader.classList.add('hidden');
      nexusAnalytics.track('game_started', { slug: game.slug, title: game.title });
    }

    if (frame && loader) {
      frame.onload = onGameActive;

      // Listen for documented game-ready messages with strict origin and source validation
      activePostMessageCleanup = (event) => {
        if (!event || !event.data) return;
        // Validate event source: must originate from the game iframe window
        if (frame && event.source !== frame.contentWindow) return;

        // Validate trusted provider origins
        const origin = event.origin || '';
        const isAllowedOrigin = (
          origin === window.location.origin ||
          origin.endsWith('.gamedistribution.com') ||
          origin.endsWith('.gamemonetize.co') ||
          origin.endsWith('.gamemonetize.games') ||
          origin.endsWith('.htmlgames.com') ||
          origin.endsWith('.famobi.com')
        );
        if (!isAllowedOrigin) return;

        const d = event.data;
        // Documented provider event triggers
        if (typeof d === 'string' && (d.includes('SDK_GAME_START') || d.includes('LOADER_DATA'))) {
          onGameActive();
        } else if (typeof d === 'object' && (d.name === 'SDK_GAME_START' || d.type === 'SDK_GAME_START')) {
          onGameActive();
        }
      };
      window.addEventListener('message', activePostMessageCleanup);

      activePlayerTimeout = setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
          loader.classList.add('hidden');
          if (retry) retry.style.display = 'flex';
        }
      }, timeoutMs);
    }
  }

  // --- PHASE 2: Redesigned Five Informational Pages (Unified Design System) ---

  // 1. ABOUT US
  function renderAboutView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'About KipoPlay – Play Free Online Games',
      description: 'Discover KipoPlay, your destination for free online games offering 200 free, instant-play HTML5 games across 22 categories with zero downloads.',
      canonical: 'https://kipo.in/#/about',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="info-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">About Us</span>
        </nav>

        <header class="info-hero-header">
          <div class="info-badge">About Our Platform</div>
          <h1 class="info-title">About <span>KipoPlay</span></h1>
          <p class="info-lead">
            KipoPlay is a dedicated online gaming destination built for players who want immediate, high-octane fun without the barriers of software downloads, heavy installations, or forced accounts.
          </p>
        </header>

        <div class="info-card">
          <h2>What is KipoPlay?</h2>
          <p>
            KipoPlay is a modern, lightweight, high-performance web gaming portal engineered from the ground up for seamless browser play. We bring together a hand-curated collection of exactly 200 legitimate HTML5 games spanning 22 distinct categories—from pulse-pounding 3D racers and tactical shooters to relaxing block puzzles and classic card tables.
          </p>

          <div class="info-grid-3">
            <div class="info-feature-box">
              <h4>⚡ Instant Execution</h4>
              <p>Built exclusively on HTML5 Canvas, WebGL, and Web Audio web standards. Games load in seconds without bulky native app downloads.</p>
            </div>
            <div class="info-feature-box">
              <h4>🛡️ Privacy by Design</h4>
              <p>Zero compulsory sign-ups. Your favorites and gameplay history remain safely inside your personal browser storage.</p>
            </div>
            <div class="info-feature-box">
              <h4>📱 Cross-Platform Play</h4>
              <p>Designed with a responsive dark gaming theme that works flawlessly on desktop PCs, laptops, Chromebooks, iPads, and smartphones.</p>
            </div>
          </div>
        </div>

        <div class="info-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to make digital play instantly accessible, safe, and engaging for gaming fans everywhere. We believe quality gaming should not require expensive hardware, app store permissions, or endless loading bars. By leveraging pure client-side web technology, KipoPlay delivers console-inspired responsiveness directly to your browser tab.
          </p>

          <h2>Reasons to Explore KipoPlay</h2>
          <ul>
            <li><strong>200 Verified Games:</strong> Handpicked titles across action, racing, puzzle, sports, platformers, and casual genres.</li>
            <li><strong>Zero Cost:</strong> 100% free with unlimited gameplay anytime, anywhere.</li>
            <li><strong>Clean Dark Gaming Theme:</strong> Sleek obsidian-blue aesthetic that is easy on the eyes during late-night sessions.</li>
            <li><strong>Responsive Player:</strong> Multiple aspect ratios (16:9, 4:3, 1:1, Fit), theater mode, and full-screen immersion.</li>
          </ul>

          <div style="margin-top: 24px;">
            <a href="#/games" class="btn btn-primary" style="margin-right: 12px;">Explore All 200 Games</a>
            <a href="#/contact" class="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 2. CONTACT & SUPPORT
  function renderContactView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Contact KipoPlay – Gaming Support & Feedback',
      description: 'Contact the KipoPlay team for technical support, game suggestions, developer partnerships, bug reports, or general inquiries.',
      canonical: 'https://kipo.in/#/contact',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="info-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Contact & Support</span>
        </nav>

        <header class="info-hero-header">
          <div class="info-badge">Help & Enquiries</div>
          <h1 class="info-title">Contact & <span>Support</span></h1>
          <p class="info-lead">
            Have questions about a game, experienced a technical glitch, or want to submit an original HTML5 creation? Our technical and publishing team is ready to assist.
          </p>
        </header>

        <!-- Useful Support Guidance Cards -->
        <div class="support-grid">
          <div class="support-item-card">
            <div class="support-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div class="support-item-title">General Enquiries</div>
            <p class="support-item-desc">Questions regarding website features, game recommendations, or feedback about the portal layout.</p>
          </div>

          <div class="support-item-card">
            <div class="support-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </div>
            <div class="support-item-title">Game Loading Issues</div>
            <p class="support-item-desc">Having trouble loading a title? Use the in-player Reload button or review our browser cache recommendations.</p>
          </div>

          <div class="support-item-card">
            <div class="support-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            </div>
            <div class="support-item-title">Broken Games</div>
            <p class="support-item-desc">Encountered an unresponsive game or black screen? Submit a report directly using the form below or on the game page.</p>
          </div>

          <div class="support-item-card">
            <div class="support-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div class="support-item-title">Game Submissions</div>
            <p class="support-item-desc">Are you an independent HTML5 game developer? Submit your playable web build to showcase it to our audience.</p>
          </div>
        </div>

        <!-- Preserved Form Fields & Functionality -->
        <div class="info-card">
          <h2>Send Us a Message</h2>
          <p>Please provide your name, valid email, topic, and message details. We review and log submissions directly.</p>

          <form id="contactForm" onsubmit="window.NEXUS.submitContact(event)">
            <div class="form-group">
              <label class="form-label" for="contactName">Your Name</label>
              <input type="text" class="form-control" id="contactName" required placeholder="Alex Mercer" autocomplete="name">
            </div>

            <div class="form-group">
              <label class="form-label" for="contactEmail">Email Address</label>
              <input type="email" class="form-control" id="contactEmail" required placeholder="alex@example.com" autocomplete="email">
            </div>

            <div class="form-group">
              <label class="form-label" for="contactTopic">Topic</label>
              <select class="form-control" id="contactTopic" style="cursor: pointer;">
                <option value="general">General Enquiry & Feedback</option>
                <option value="submit-game">Submit an HTML5 Game</option>
                <option value="bug-report">Report a Broken Game or Glitch</option>
                <option value="licensing">Advertising & Partnerships</option>
                <option value="copyright">Copyright / DMCA Notice</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="contactMessage">Your Message</label>
              <textarea class="form-control form-textarea" id="contactMessage" rows="5" required placeholder="Describe your inquiry, game submission details, or technical glitch..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 8px;">
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 3. PRIVACY POLICY
  function renderPrivacyView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Privacy Policy – KipoPlay Online Gaming',
      description: 'Accurate and transparent privacy policy for KipoPlay detailing client-side storage, cookie usage, third-party embeds, and data protection practices.',
      canonical: 'https://kipo.in/#/privacy',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="info-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Privacy Policy</span>
        </nav>

        <header class="info-hero-header">
          <div class="info-badge">Data & Transparency</div>
          <h1 class="info-title">Privacy <span>Policy</span></h1>
          <p class="info-lead">Effective Date: October 2026 • Last updated: October 2026</p>
        </header>

        <div class="info-card">
          <h2>1. Information We Collect</h2>
          <p>
            KipoPlay is operated as a client-side static web gaming portal. We do not require users to create personal accounts, register with an email address, or provide personal identity details to access any game on the platform. We collect zero personally identifiable information (PII) during your standard gaming sessions.
          </p>

          <h2>2. Browser Local Storage</h2>
          <p>
            To deliver an engaging and personalized gaming experience without maintaining server-side user databases, KipoPlay utilizes your browser's client-side <code>localStorage</code> API. The following keys are stored exclusively on your device:
          </p>
          <ul>
            <li><code>kipoplay_favorites</code> (and legacy <code>nexus_favorites</code>): An array of game identifiers you have marked with a heart.</li>
            <li><code>kipoplay_recent</code> (and legacy <code>nexus_recently_played</code>): An array of game identifiers for games you have launched recently.</li>
            <li><code>kipoplay_sort_pref</code>: Your chosen sort ordering in the game library (e.g. Featured, Rating, Newest).</li>
            <li><code>kipoplay_sidebar_collapsed</code>: Your desktop preference for keeping the sidebar expanded or compact.</li>
          </ul>
          <p>You can clear this data at any time by simply clearing your browser cache and cookies.</p>

          <h2>3. Cookies & Session Storage</h2>
          <p>
            The core KipoPlay portal does not set tracking cookies. However, temporary session identifiers may be created by your browser to maintain active tab states.
          </p>

          <h2>4. Third-Party Embedded Games</h2>
          <p>
            Many games on KipoPlay are delivered via authorized embedding mechanisms from legitimate third-party game distribution networks (such as HTMLGames). When you load an external game iframe, that game provider's servers may process standard network request headers (including IP address and user-agent string) solely to transmit the game files. These third-party services operate under their own independent privacy policies.
          </p>

          <h2>5. Future Monetization & Google AdSense</h2>
          <p>
            KipoPlay has prepared architectural containers for future non-intrusive advertisement integration with approved partners such as Google AdSense. <strong>Please note:</strong> Real advertising scripts and tracking cookies are currently disabled. When advertising is eventually enabled, it will comply with Google AdSense privacy policies, standard cookie consent regulations, and COPPA/GDPR/CCPA frameworks.
          </p>

          <h2>6. Analytics Notice</h2>
          <p>
            Analytics event dispatching is currently deactivated. If privacy-friendly analytics are enabled in the future, they will track aggregated portal usage (such as total game plays and general category interest) without harvesting personal user information.
          </p>

          <h2>7. Data Security & External Links</h2>
          <p>
            We enforce HTTPS encryption across all site assets and embed legitimate games via sandboxed iframes. If you click on external links, you are subject to the respective external website's privacy practices.
          </p>

          <h2>8. Policy Updates</h2>
          <p>
            We may periodically update this Privacy Policy to reflect technical or legal improvements. Material revisions will be reflected by the Effective Date displayed at the top of this page.
          </p>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 4. TERMS OF SERVICE
  function renderTermsView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'Terms of Service – KipoPlay',
      description: 'Official Terms of Service for KipoPlay covering website usage, third-party games, intellectual property, user responsibilities, and service conditions.',
      canonical: 'https://kipo.in/#/terms',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="info-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Terms of Service</span>
        </nav>

        <header class="info-hero-header">
          <div class="info-badge">User Agreement</div>
          <h1 class="info-title">Terms of <span>Service</span></h1>
          <p class="info-lead">Effective Date: October 2026</p>
        </header>

        <div class="info-card">
          <h2>1. Agreement to Terms</h2>
          <p>
            By visiting, accessing, or playing games on KipoPlay ("the Website"), you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please discontinue using the portal.
          </p>

          <h2>2. Permitted Website Usage</h2>
          <p>
            KipoPlay grants you a personal, non-exclusive, non-transferable, revocable license to access and play HTML5 games through our portal interface strictly for personal, non-commercial entertainment.
          </p>

          <h2>3. Third-Party Game Ownership</h2>
          <p>
            Games hosted or embedded on KipoPlay remain the intellectual property of their respective developers, creators, or authorized publishers. KipoPlay embeds games in accordance with permitted distribution terms, preserving all original branding, credits, and links provided by each game developer.
          </p>

          <h2>4. User Responsibilities & Conduct</h2>
          <p>As a user of KipoPlay, you agree not to:</p>
          <ul>
            <li>Circumvent, disable, or tamper with security or iframe sandbox restrictions on the portal.</li>
            <li>Use automated scrapers, bots, or data-mining utilities to extract content without authorization.</li>
            <li>Transmit malicious code, viruses, or disruptive scripts through forms or feedback mechanisms.</li>
            <li>Attempt to reverse-engineer or rebrand KipoPlay portal software.</li>
          </ul>

          <h2>5. Game Availability & Maintenance</h2>
          <p>
            We strive to keep all 200 games playable around the clock. However, third-party developers may update or withdraw games at their discretion. KipoPlay reserves the right to modify, replace, or discontinue games or portal features without prior notice for maintenance or performance enhancements.
          </p>

          <h2>6. Disclaimer of Warranties & Limitation of Liability</h2>
          <p>
            KipoPlay is provided on an "as-is" and "as-available" basis without representations or warranties of any kind. In no event shall KipoPlay be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the platform.
          </p>

          <h2>7. Updates to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Service at any time. Continued usage of KipoPlay following revisions constitutes full acceptance of the updated terms.
          </p>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 5. DMCA & COPYRIGHT POLICY
  function renderDmcaView() {
    const main = document.getElementById('app-main');
    if (!main) return;

    updateSeo({
      title: 'DMCA & Copyright Policy – KipoPlay',
      description: 'Official DMCA and Copyright notice for KipoPlay detailing intellectual property protection, infringement notification procedures, and counter-claims.',
      canonical: 'https://kipo.in/#/dmca',
      ogType: 'website'
    });

    main.innerHTML = `
      <div class="info-page-container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/" class="breadcrumb-link">Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">DMCA & Copyright</span>
        </nav>

        <header class="info-hero-header">
          <div class="info-badge">Intellectual Property</div>
          <h1 class="info-title">DMCA & <span>Copyright Policy</span></h1>
          <p class="info-lead">
            KipoPlay respects the intellectual property rights of creators and adheres to the provisions of the Digital Millennium Copyright Act (17 U.S.C. § 512).
          </p>
        </header>

        <div class="info-card">
          <h2>Third-Party Game Ownership</h2>
          <p>
            All third-party video games, game characters, audio assets, trademarks, and associated intellectual property featured on KipoPlay remain the sole property of their respective copyright holders. We host and embed games through authorized embedding licenses and developer distribution catalogs (such as HTMLGames), strictly preserving required developer branding and links.
          </p>

          <h2>Copyright Infringement Notification Procedure</h2>
          <p>
            If you are a copyright owner or an authorized representative and believe that any game or content accessible on KipoPlay infringes upon your copyright, you may submit a formal notification containing the following:
          </p>
          <ul>
            <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
            <li>Specific identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact URL (e.g., <code>https://kipo.in/#/game/[game-slug]</code>) where the allegedly infringing material is located.</li>
            <li>Your contact information, including your full legal name, mailing address, telephone number, and verifiable email address.</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement made under penalty of perjury that the information in the notification is accurate and that you are authorized to act on behalf of the owner.</li>
          </ul>

          <h2>Submission Procedure</h2>
          <p>
            Please deliver your copyright notification via our official <a href="#/contact" style="color:#38BDF8; font-weight:600;">Contact & Support Form</a> by choosing the topic <strong>"Copyright / DMCA Notice"</strong>. Verified infringement claims are investigated and processed within 24 to 48 business hours.
          </p>

          <h2>Counter-Notification Procedure</h2>
          <p>
            If a game developer believes their material was removed or disabled by mistake or misidentification, a counter-notification may be submitted containing their identity, explanation, and consent to legal jurisdiction.
          </p>
        </div>
      </div>
    `;
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
        renderAllGamesView('All 200 Games', catalog);
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
      if (hash === `#/category/${cat}`) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // --- Global Window NEXUS Namespace ---
  window.KIPO = window.NEXUS = {
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
    },

    togglePlayerFav: function (slug) {
      const isFav = toggleFavorite(slug);
      const btn = document.getElementById('playerFavBtn');
      const label = document.getElementById('playerFavLabel');
      if (btn) {
        btn.classList.toggle('is-fav', isFav);
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
      }
      if (label) {
        label.textContent = isFav ? 'Favorited' : 'Favorite';
      }
    },

    reloadGame: function () {
      const frame = document.getElementById('gameFrame');
      const loader = document.getElementById('playerLoader');
      const retry = document.getElementById('playerRetryOverlay');
      if (retry) retry.style.display = 'none';
      if (activePlayerTimeout) {
        clearTimeout(activePlayerTimeout);
        activePlayerTimeout = null;
      }
      if (frame) {
        if (loader) loader.classList.remove('hidden');
        frame.src = frame.src;

        const currentSrc = frame.src || '';
        const timeoutMs = currentSrc.includes('games/') ? 6000 : (currentSrc.includes('cdn.htmlgames.com') ? 12000 : 16000);
        activePlayerTimeout = setTimeout(() => {
          if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            if (retry) retry.style.display = 'flex';
          }
        }, timeoutMs);
      }
    },

    toggleFullscreen: function () {
      const container = document.getElementById('playerContainer');
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

    toggleTheater: function () {
      const layout = document.getElementById('gameDetailLayout');
      if (layout) {
        layout.classList.toggle('theater-mode');
      }
    },

    cycleAspectRatio: function () {
      const container = document.getElementById('playerContainer');
      const label = document.getElementById('ratioLabel');
      if (!container) return;

      const ratios = ['16-9', '4-3', '1-1', 'fit'];
      let current = ratios.find(r => container.classList.contains('ratio-' + r)) || '16-9';
      let nextIdx = (ratios.indexOf(current) + 1) % ratios.length;
      let next = ratios[nextIdx];

      ratios.forEach(r => container.classList.remove('ratio-' + r));
      container.classList.add('ratio-' + next);

      const displayMap = {
        '16-9': '16:9',
        '4-3': '4:3',
        '1-1': '1:1',
        'fit': 'Fit'
      };
      if (label) label.textContent = displayMap[next];
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
      const modalRoot = (document.getElementById('kipo-modal-root') || document.getElementById('nexus-modal-root'));
      if (!modalRoot) return;
      const game = catalog.find(g => g.slug === gameSlug);
      const gameTitle = game ? game.title : 'this game';

      modalRoot.innerHTML = `
        <div class="nexus-modal-overlay is-open" id="reportModalOverlay" onclick="if(event.target===this) window.NEXUS.closeModal()">
          <div class="nexus-modal" role="dialog" aria-modal="true" aria-labelledby="reportModalTitle">
            <div class="nexus-modal-header">
              <h3 class="nexus-modal-title" id="reportModalTitle">Report Issue: ${escapeHtml(gameTitle)}</h3>
              <button class="nexus-modal-close" onclick="window.NEXUS.closeModal()" aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form id="reportGameForm" onsubmit="window.NEXUS.submitReport(event, '${escapeHtml(gameSlug)}')">
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
      `;
    },

    closeModal: function () {
      const modalRoot = (document.getElementById('kipo-modal-root') || document.getElementById('nexus-modal-root'));
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
      showToast(`Thank you, ${name}! Your message has been sent.`, '✓');
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
    console.warn('[KipoPlay Runtime Guard]', e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.warn('[KipoPlay Promise Guard]', e.reason);
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

    console.log(`[KipoPlay] Initialized with ${catalog.length} games across ${categoryList.length} categories.`);

    computeCategoryCounts();
    renderSidebar();
    renderHeader();
    renderFooter();

    try {
      if (window.innerWidth > 1024 && (localStorage.getItem(STORAGE_KEYS.sidebarCollapsed) || localStorage.getItem(STORAGE_KEYS.legacySidebar)) === '1') {
        document.body.classList.add('sidebar-collapsed');
      }
    } catch (e) {}

    initSidebarTooltips();

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

const fs = require('fs');

const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));

console.log(`Auditing all ${games.length} games for copyright and commercial sale risks...`);

const auditResults = [];

games.forEach((g, index) => {
  const url = g.gameUrl || '';
  const title = g.title || '';
  const desc = g.description || '';
  const fullText = (title + ' ' + desc + ' ' + (g.tags || []).join(' ')).toLowerCase();

  let sourceProvider = 'UNVERIFIED';
  let embedLicenseVerified = 'UNVERIFIED';
  let commercialSalePermitted = 'UNVERIFIED';
  let permissionOrVerificationRequired = 'YES';
  let shouldBeRemovedIfNoPermission = 'NO';
  let classification = 'YELLOW';
  let legalRiskNotes = '';
  let trademarkNotes = 'No known brand infringement detected';

  // 1. LOCAL 1ST-PARTY GAMES (7)
  if (url.startsWith('games/')) {
    sourceProvider = 'KipoPlay In-House (Proprietary Canvas / Web Audio)';
    embedLicenseVerified = 'YES (First-party proprietary original code)';
    commercialSalePermitted = 'YES (Code and assets are 100% transferable to client)';
    permissionOrVerificationRequired = 'NO (Owned by seller)';
    shouldBeRemovedIfNoPermission = 'NO';
    classification = 'GREEN';
    legalRiskNotes = 'Vanilla HTML5 Canvas & Web Audio API procedural synthesis. 0 external assets, 0 external image dependencies. 100% transferable asset.';

    if (g.slug.includes('breakout')) {
      trademarkNotes = 'Game mechanic is classic arcade, but "Breakout" is a registered trademark of Atari Interactive, Inc. Recommended to rename to "Neon Breaker" in commercial contracts to avoid trademark warranty exposure.';
      classification = 'YELLOW';
      permissionOrVerificationRequired = 'YES (Trademark verification on "Breakout" name before providing IP indemnification to client)';
    } else {
      trademarkNotes = 'Original title and assets. Concept inspired by public domain/open-source mechanics (e.g. 2048 / MIT Gabriele Cirulli). Safe to sell.';
    }
  }

  // 2. GAMEDISTRIBUTION (AZERION B.V.) (50 games)
  else if (url.includes('html5.gamedistribution.com')) {
    sourceProvider = 'GameDistribution (Azerion B.V., Amsterdam, Netherlands)';
    embedLicenseVerified = 'YES (Official clean GUID embed authorized for web portals under GameDistribution Publisher Agreement)';
    commercialSalePermitted = 'CONDITIONAL / RESTRICTED (Embedding on website is allowed, but client cannot own the games. Client must register their own GameDistribution Publisher Account for revenue attribution. Seller cannot transfer game IP to client.)';
    permissionOrVerificationRequired = 'YES (Client must be onboarded to Azerion; thumbnail dependency on lupzogames.com requires clearance)';
    shouldBeRemovedIfNoPermission = 'YES (If client requires 100% proprietary game ownership or refuses third-party ad syndication)';
    classification = 'YELLOW';
    legalRiskNotes = 'Ad-supported syndication feed. Azerion serves pre-roll/in-game ads. Games cannot be sold as owned software assets. Thumbnails hosted on lupzogames.com represent an unverified third-party asset dependency.';

    // Check specific trademark risks
    if (fullText.includes('urus')) {
      classification = 'RED';
      trademarkNotes = 'HIGH RISK: "Urus" is a registered trademark of Automobili Lamborghini S.p.A. Unlicensed use of automotive trademarks creates trademark infringement liability when selling a commercial gaming portal.';
      shouldBeRemovedIfNoPermission = 'YES (High trademark infringement risk; remove before sale to client)';
      commercialSalePermitted = 'NO (Unlicensed trademark usage conflicts with client sale)';
    } else if (fullText.includes('charger')) {
      classification = 'RED';
      trademarkNotes = 'HIGH RISK: "Charger" is a registered trademark of FCA US LLC (Dodge / Stellantis). Automotive trademark exposure in commercial portal sale.';
      shouldBeRemovedIfNoPermission = 'YES (High trademark infringement risk; remove before sale to client)';
      commercialSalePermitted = 'NO (Unlicensed trademark usage conflicts with client sale)';
    }
  }

  // 3. GAMEMONETIZE (14 games)
  else if (url.includes('gamemonetize.co') || url.includes('gamemonetize.games')) {
    sourceProvider = 'GameMonetize Inc. (Global / USA)';
    embedLicenseVerified = 'YES (Official GameMonetize embed endpoint; open ad-supported syndication)';
    commercialSalePermitted = 'CONDITIONAL / RESTRICTED (Embedding allowed with GameMonetize ads, but games cannot be sold as proprietary assets. Client must register their own GameMonetize Publisher ID.)';
    permissionOrVerificationRequired = 'YES (Developer identity unverified; client must obtain their own publisher tag)';
    shouldBeRemovedIfNoPermission = 'YES (If client requires verified studio provenance or ad-free portal)';
    classification = 'YELLOW';
    legalRiskNotes = 'Open distribution network with community uploads. Originating studios are often anonymous or unverified partners.';

    // Check specific trademark risks
    if (g.slug.includes('temple-run') || fullText.includes('temple run')) {
      classification = 'RED';
      trademarkNotes = 'CRITICAL LEGAL RISK: "Temple Run" / "Temple Run 2" is a globally registered trademark and proprietary IP of Imangi Studios, LLC. This build is an unauthorized port/clone. Must be removed before selling website to client.';
      shouldBeRemovedIfNoPermission = 'YES (Mandatory removal to prevent trademark infringement lawsuit)';
      commercialSalePermitted = 'NO (Blatant IP infringement)';
      embedLicenseVerified = 'NO (Unauthorized clone hosted on GameMonetize)';
    } else if (g.slug.includes('angry-birds') || fullText.includes('angry bird')) {
      classification = 'RED';
      trademarkNotes = 'CRITICAL LEGAL RISK: "Angry Birds" is a globally registered trademark and proprietary IP of Rovio Entertainment (SEGA). This game is an unauthorized clone. Must be removed before selling website to client.';
      shouldBeRemovedIfNoPermission = 'YES (Mandatory removal to prevent trademark infringement lawsuit)';
      commercialSalePermitted = 'NO (Blatant IP infringement)';
      embedLicenseVerified = 'NO (Unauthorized clone hosted on GameMonetize)';
    } else if (fullText.includes('steve') || g.slug.includes('helicopter-battle')) {
      classification = 'YELLOW';
      trademarkNotes = 'POTENTIAL IP RISK: Game title in HTML contains "Steve 2 Player", referencing Minecraft / Mojang character aesthetics. Verification required.';
    }
  }

  // 4. HTMLGAMES / ZYGOMATIC (121 games)
  else if (url.includes('cdn.htmlgames.com')) {
    sourceProvider = 'Zygomatic B.V. (HTMLGames.com, Vianen, Netherlands)';
    embedLicenseVerified = 'YES (Official public webmaster embed feed at htmlgames.com/html5-games-for-your-site/)';
    commercialSalePermitted = 'RESTRICTED TO EMBEDDING ONLY (Games cannot be sold to client. Zygomatic terms prohibit selling, sub-licensing, or transferring games. Client only acquires the website shell; games must remain unaltered with Zygomatic ads and branding.)';
    permissionOrVerificationRequired = 'YES (Client must be explicitly informed they do NOT own the games; GDPR CMP & Zygomatic ads.txt required)';
    shouldBeRemovedIfNoPermission = 'NO (Safe to retain as an embedded feed, but CANNOT be warranted as owned client assets)';
    classification = 'YELLOW';
    legalRiskNotes = 'Terms of service explicitly prohibit selling or transferring games. Valid for hosting on client site under webmaster license, but seller cannot represent games as owned intellectual property in asset sale agreement.';

    if (g.slug.includes('tetrix') || fullText.includes('tetris')) {
      trademarkNotes = 'POTENTIAL IP RISK: "Tetris" is a registered trademark of The Tetris Company / Tetris Holding, LLC. Zygomatic distributes "Tetrix XL" as a block-stacking variant, but description contains "Tetris". Minor trademark dilution risk.';
    }
  }

  // 5. FAMOBI (1 game - Rise Up Air Balloon)
  else if (url.includes('famobi.com')) {
    sourceProvider = 'Famobi GmbH (Cologne, Germany)';
    embedLicenseVerified = 'PARTIALLY VERIFIED (Syndication wrapper with default affiliate tag A1000-10B0B; B2B HTML5 Games Shop commercial license is NOT held)';
    commercialSalePermitted = 'NO (Seller does not possess Famobi B2B commercial license. Selling a site with Famobi embeds without a written publisher agreement leaves client with zero monetization and potential domain blacklisting.)';
    permissionOrVerificationRequired = 'YES (Client must execute direct publisher agreement with Famobi or acquire B2B license)';
    shouldBeRemovedIfNoPermission = 'YES (If client demands commercial monetization clearance)';
    classification = 'YELLOW';
    legalRiskNotes = 'Famobi operates a paid B2B licensing shop. Embed uses free promotional tag. Commercial sale requires Famobi written clearance.';
  }

  // 6. ACTIONGAMESHUB (1 game - Counter War)
  else if (url.includes('actiongameshub.com')) {
    sourceProvider = 'ActionGamesHub (Guangdong, China)';
    embedLicenseVerified = 'UNVERIFIED (Direct CDN link without formal publisher API key or sub-licensing agreement)';
    commercialSalePermitted = 'UNVERIFIED (No written commercial syndication contract exists between seller and ActionGamesHub)';
    permissionOrVerificationRequired = 'YES (Written permission required from bd@actiongameshub.com)';
    shouldBeRemovedIfNoPermission = 'YES (If commercial warranties are required by client)';
    classification = 'YELLOW';
    legalRiskNotes = 'Direct asset hotlinking. Originating developer permission is unverified.';
  }

  // 7. CLEVER APPS (1 game - Merge Haven)
  else if (url.includes('cleverappssg.com')) {
    sourceProvider = 'Clever Apps Pte. Ltd. (Singapore) / GameDistribution';
    embedLicenseVerified = 'YES (WebGL build with source=gdcom syndicated via GameDistribution)';
    commercialSalePermitted = 'RESTRICTED (Operates under GameDistribution publisher terms; cannot be sold as owned game asset)';
    permissionOrVerificationRequired = 'YES (Client must maintain active GameDistribution publisher account)';
    shouldBeRemovedIfNoPermission = 'NO (Valid if client operates under GameDistribution terms)';
    classification = 'YELLOW';
    legalRiskNotes = 'Syndicated partner WebGL game. Monetized via in-game purchases and video ads.';
  }

  auditResults.push({
    index: index + 1,
    id: g.id,
    title: g.title,
    category: g.category,
    sourceProvider,
    embedLicenseVerified,
    commercialSalePermitted,
    permissionOrVerificationRequired,
    shouldBeRemovedIfNoPermission,
    classification,
    legalRiskNotes,
    trademarkNotes
  });
});

const counts = { GREEN: 0, YELLOW: 0, RED: 0 };
auditResults.forEach(r => counts[r.classification]++);

console.log('Audit Summary:');
console.log(`- GREEN: ${counts.GREEN}`);
console.log(`- YELLOW: ${counts.YELLOW}`);
console.log(`- RED: ${counts.RED}`);
console.log(`- Total Games: ${auditResults.length}`);

fs.writeFileSync('scripts/audit-results-data.json', JSON.stringify({ counts, games: auditResults }, null, 2), 'utf8');
console.log('Saved scripts/audit-results-data.json');


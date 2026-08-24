// 升级指南页（内容层）
export default {
  slug: 'leveling-guide',
  type: 'page',
  order: 40,
  title: '{{game}} Leveling Guide: Fastest Route to Level 100 ({{platform}})',
  description: 'How to level up fast in {{game}} on {{platform}}: the 1–100 progression route, combo and charge mechanics that speed up kills, and the free codes that fund your run.',
  updated: '2026-08-24',
  navLabel: 'Leveling',
  footerLabel: 'Leveling',
  crumb: 'Leveling Guide',
  card: { title: 'Leveling 1–100', blurb: 'Fastest route to max level.',
    wiki: { title: 'Leveling Guide', blurb: '1–100 progression route.' } },
  inSitemap: true,
  sitemapPriority: 0.8,

  h1: '{{game}} Leveling Guide — Fastest Route to Level 100',
  metaLine: '<span class="status-beta">BETA progression — tuned per update</span>',

  body: `
    <p>Leveling in <em>{{gameFull}}</em> is about killing efficiently, not killing everything. This guide covers the mechanics that make XP fast, the stage-by-stage route we're verifying, and how to fund the whole run with free codes.</p>

    <h2>Step 0: Claim Your Free Resources</h2>
    <div class="card">
      <p>Before grinding anything, redeem all ten codes on the <a href="./index.html">codes page</a>. UPDATE1 + UPDATE3 together hand you 200,000 Gold, 20,000 Gems, 100 Xeros Tears, 50 Ember Stones, 30 Crystal Storm Stones and 300 potions. That's your entire early-game consumable budget, free.</p>
    </div>

    <h2>Mechanics That Speed Up Leveling</h2>
    <div class="card">
      <h3>Play the combat system, don't mash</h3>
      <ul>
        <li><strong>Combo-triggered skills</strong> — skills fire from attack combos, so clean combo strings clear packs faster than spam.</li>
        <li><strong>Charged attacks</strong> — holding attacks charges heavy hits; use them on grouped mobs and boss openings.</li>
        <li><strong>Q-roll repositioning</strong> — rolling between packs keeps your kill streak alive; momentum beats backtracking.</li>
        <li><strong>Ctrl camera lock</strong> — lock on in fights so your swings land while you focus on positioning.</li>
      </ul>
    </div>

    <h2>The 1–100 Route (In Verification)</h2>
    <div class="card">
      <h3>Phase structure</h3>
      <table>
        <tr><th>Phase</th><th>Range</th><th>Focus</th></tr>
        <tr><td>Starter islands</td><td>1–30</td><td>Quests first — they gate island progression and hand out replacement gear.</td></tr>
        <tr><td>Mid islands</td><td>30–60</td><td>Mob farming routes between bosses; upgrade one main sword with banked materials.</td></tr>
        <tr><td>Boss circuit</td><td>60–100</td><td>Repeatable boss kills with party-safe Q-roll patterns; best XP-per-hour in Beta so far.</td></tr>
      </table>
      <p>Exact island-by-island stops are being verified in-game — the game is a Beta and the developer reshuffles spawn XP with updates. We update this table whenever a patch changes the curve.</p>
    </div>

    <h2>Common Leveling Mistakes</h2>
    <div class="card">
      <ul>
        <li><strong>Spreading upgrades thin</strong> — upgrading three mediocre swords instead of pushing one (see <a href="./best-swords.html">Best Swords</a>).</li>
        <li><strong>Skipping quests</strong> — quests unlock islands; island access is worth more XP than any single farm spot.</li>
        <li><strong>Farming underleveled zones</strong> — XP falls off hard; move on when kills stop feeling dangerous.</li>
      </ul>
    </div>

    <h2>Related Guides</h2>
    <ul>
      <li><a href="./bosses.html">Boss guide — the level 60+ XP engine</a></li>
      <li><a href="./gold-guide.html">Gold guide</a> · <a href="./gems-guide.html">Gems guide</a></li>
      <li><a href="./tier-list.html">Weapon tier list — pick one sword and commit</a></li>
    </ul>
`,
};

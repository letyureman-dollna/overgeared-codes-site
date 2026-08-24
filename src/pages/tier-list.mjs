// 武器 Tier List 页（内容层）
export default {
  slug: 'tier-list',
  type: 'page',
  order: 20,
  title: '{{game}} Weapon Tier List ({{platform}}) — Best Weapons, Beta Ranking',
  description: '{{game}} {{platform}} weapon tier list: how we rank swords and gear during Beta, what makes a weapon S-tier, and which weapons to chase first. Updated {{monthYear}}.',
  updated: '2026-08-24',
  navLabel: 'Tier List',
  crumb: 'Tier List',
  card: { title: 'Weapon Tier List', blurb: 'Best weapons ranked, updated through Beta.',
    wiki: { blurb: 'Ranking criteria and current beta standings.' } },
  inSitemap: true,
  sitemapPriority: 0.9,

  h1: '{{game}} Weapon Tier List ({{platform}})',
  metaLine: 'Coverage status: <span class="status-beta">BETA — ranking in progress</span>',

  body: `
    <p>There is currently <strong>no complete weapon ranking for {{game}} anywhere</strong> — the game is a solo-developed Beta, and no major guide site has documented its weapons yet. We're building the first one. This page explains exactly how we rank weapons and will be updated continuously as we verify each weapon in-game.</p>

    <h2>How We Rank Weapons</h2>
    <div class="card">
      <h3>Four criteria, equal weight</h3>
      <ul>
        <li><strong>Damage output</strong> — raw DPS from combo strings and charged attacks.</li>
        <li><strong>Reach &amp; speed</strong> — swing arc, animation length, how safely you can hit and roll out (Q dodge).</li>
        <li><strong>Availability</strong> — how early a normal player can realistically get it (drop rate, boss requirement, craft cost in Gold/Gems).</li>
        <li><strong>Upgrade ceiling</strong> — how much it gains from materials like Ember Stones and Crystal Storm Stones.</li>
      </ul>
    </div>

    <h2>Tier Definitions</h2>
    <div class="card">
      <table>
        <tr><th>Tier</th><th>Meaning</th></tr>
        <tr><td><span class="tier-s">S</span></td><td>Best-in-slot. Worth farming materials for immediately.</td></tr>
        <tr><td><span class="tier-a">A</span></td><td>Strong pick that carries you through most islands and bosses.</td></tr>
        <tr><td><span class="tier-b">B</span></td><td>Serviceable early/mid-game gear; replace when an A/S drops.</td></tr>
      </table>
    </div>

    <h2>Current Beta Standing</h2>
    <div class="card">
      <p>The weapon roster includes multiple obtainable swords — community showcases on TikTok have previewed the launch set, including limited-time weapons. We're running damage tests per weapon right now and will publish the full ranked table here as each entry is verified in-game.</p>
      <p>What we can already say:</p>
      <ul>
        <li>Charged attacks are the biggest damage spikes — weapons with faster charge cycles punch above their raw numbers.</li>
        <li>Resource weapons (craft/upgrade cost in Ember Stones and Xeros Tears) trade early power for a higher ceiling — save materials from <a href="./index.html">codes</a> for these.</li>
        <li>Limited-time weapons from events are being evaluated for whether they return.</li>
      </ul>
      <p>Want the per-sword breakdown? See the <a href="./best-swords.html">Best Swords guide</a>.</p>
    </div>

    <div class="callout">
      <strong>Why trust a ranking "in progress"?</strong> Because every claim here is tested in-game, not invented. We'd rather ship verified entries slowly than a full table of guesses. The update date at the top always tells you how fresh the ranking is.
    </div>

    <h2>Related Guides</h2>
    <ul>
      <li><a href="./best-swords.html">{{game}} Best Swords — how to get each one</a></li>
      <li><a href="./bosses.html">Boss guide — weapon-testing grounds</a></li>
      <li><a href="./ember-stones.html">Ember Stones — upgrade material farming</a></li>
    </ul>
`,
};

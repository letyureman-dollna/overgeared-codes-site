// 金币指南页（内容层）
export default {
  slug: 'gold-guide',
  type: 'page',
  order: 50,
  title: 'How to Get Gold Fast in {{game}} ({{platform}}) — Gold Guide',
  description: 'Gold farming guide for {{game}} on {{platform}}: 200,000 free Gold from codes, what Gold is spent on, and how to keep your income up while leveling through the Beta.',
  updated: '2026-08-24',
  navLabel: 'Gold Guide',
  footerLabel: 'Gold',
  crumb: 'Gold Guide',
  card: { title: 'Gold Guide', blurb: 'How to farm Gold fast.',
    wiki: { blurb: 'Catch-up currency fast, free codes first.' } },
  inSitemap: true,
  sitemapPriority: 0.8,

  h1: 'How to Get Gold Fast in {{game}} ({{platform}})',
  metaLine: '<span class="status-beta">BETA economy</span>',

  body: `
    <p>Gold is the main currency in <em>{{gameFull}}</em> — it funds gear, upgrades and consumables. The good news: the two biggest Gold boosts in the game are completely free and take under a minute to claim.</p>

    <h2>Instant Gold: 200,000 Free From Codes</h2>
    <div class="card">
      <table>
        <tr><th>Code</th><th>Gold</th></tr>
        <tr><td><span class="code">UPDATE3</span></td><td>100,000</td></tr>
        <tr><td><span class="code">UPDATE1</span></td><td>100,000</td></tr>
      </table>
      <p>Both are currently active — grab them on the <a href="./index.html">codes page</a> along with the eight other working codes. New codes usually arrive with each update and visits milestone, so re-check after every patch.</p>
    </div>

    <h2>What Gold Is Spent On</h2>
    <div class="card">
      <ul>
        <li><strong>Gear and weapon purchases</strong> — buying out shop stock where available.</li>
        <li><strong>Upgrades</strong> — sword upgrade paths consume Gold alongside materials.</li>
        <li><strong>Consumables</strong> — potions for boss attempts (though UPDATE1's code gives 300 free potions).</li>
      </ul>
    </div>

    <h2>Keeping Income Up While You Level</h2>
    <div class="card">
      <h3>Three habits that compound</h3>
      <ul>
        <li><strong>Clear quests before re-farming</strong> — quests pay out in one lump what ten mob kills drip.</li>
        <li><strong>Farm at your level band</strong> — underleveled zones pay badly; follow the <a href="./leveling-guide.html">leveling route</a>.</li>
        <li><strong>Bank, don't spend</strong> — early Gold is best saved for your first boss-tier weapon upgrade (see <a href="./best-swords.html">Best Swords</a>).</li>
      </ul>
      <p>Specific farm routes with Gold-per-hour numbers are being measured in-game and will be added here as each is verified.</p>
    </div>

    <h2>Related Guides</h2>
    <ul>
      <li><a href="./gems-guide.html">Gems guide — the premium currency</a></li>
      <li><a href="./ember-stones.html">Ember Stones — upgrade materials</a></li>
      <li><a href="./index.html">All working codes</a></li>
    </ul>
`,
};

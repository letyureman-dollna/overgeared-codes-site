// 宝石指南页（内容层）
export default {
  slug: 'gems-guide',
  type: 'page',
  order: 60,
  title: 'How to Get Gems in {{game}} ({{platform}}) — Gems Guide',
  description: 'Every verified way to get Gems in {{game}} on {{platform}}: 20,000 free Gems from active codes, what Gems are used for, and how the premium economy works in Beta.',
  updated: '2026-08-24',
  navLabel: 'Gems Guide',
  footerLabel: 'Gems',
  crumb: 'Gems Guide',
  card: { title: 'Gems Guide', blurb: 'Free and farmed Gem sources.',
    wiki: { blurb: 'Every verified Gem source.' } },
  inSitemap: true,
  sitemapPriority: 0.8,

  h1: 'How to Get Gems in {{game}} ({{platform}})',
  metaLine: '<span class="status-beta">BETA economy</span>',

  body: `
    <p>Gems are the premium currency in <em>{{gameFull}}</em>. They're scarcer than Gold and mostly flow through update codes, so knowing every source matters. Here's everything verified so far.</p>

    <h2>Free Gems: 20,000 From Active Codes</h2>
    <div class="card">
      <table>
        <tr><th>Code</th><th>Gems</th><th>Extras</th></tr>
        <tr><td><span class="code">UPDATE3</span></td><td>10,000</td><td>50 Ember Stones, 50 Xeros Tears, 30 Crystal Storm Stones</td></tr>
        <tr><td><span class="code">UPDATE1</span></td><td>10,000</td><td>100 Xeros Tears, 50 Xerath's Gems, 300 potions</td></tr>
      </table>
      <p>Note: <strong>Xerath's Gems</strong> from UPDATE1 are a distinct rare material, separate from plain Gems — don't confuse the two. Redeem everything on the <a href="./index.html">codes page</a>.</p>
    </div>

    <h2>Ongoing Gem Sources</h2>
    <div class="card">
      <ul>
        <li><strong>Update codes</strong> — every content update so far has shipped with a 10,000-Gem code; this is the primary renewable source.</li>
        <li><strong>Progression rewards</strong> — quests and island progression include currency payouts; exact Gem amounts per quest are being documented.</li>
      </ul>
      <p>As with all Beta economies, drop rates shift with patches. We re-verify sources after each update.</p>
    </div>

    <h2>What to Spend Gems On</h2>
    <div class="card">
      <ul>
        <li><strong>Weapon upgrades</strong> — high-tier upgrade paths cost Gems alongside materials.</li>
        <li><strong>Progression shortcuts</strong> — spend only after banking one full code payout (20,000) so you never run dry mid-update.</li>
      </ul>
      <p>Pair Gem spending with your <a href="./tier-list.html">tier list</a> pick — one maxed sword beats several half-upgraded ones.</p>
    </div>

    <h2>Related Guides</h2>
    <ul>
      <li><a href="./gold-guide.html">Gold guide</a></li>
      <li><a href="./ember-stones.html">Ember Stones guide</a></li>
      <li><a href="./index.html">All working codes</a></li>
    </ul>
`,
};

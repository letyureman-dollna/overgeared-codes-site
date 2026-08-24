// 最佳武器页（内容层）
export default {
  slug: 'best-swords',
  type: 'page',
  order: 30,
  title: '{{game}} Best Swords & How to Get Them ({{platform}})',
  description: 'Guide to the best swords in {{game}} on {{platform}}: the known weapon roster, limited weapons, what each sword is good at, and how to start collecting them during Beta.',
  updated: '2026-08-24',
  navLabel: 'Best Swords',
  crumb: 'Best Swords',
  card: { title: 'Best Swords', blurb: 'Every known sword and how to get it.',
    wiki: { blurb: 'Known swords and where they drop.' } },
  inSitemap: true,
  sitemapPriority: 0.8,

  h1: '{{game}} Best Swords &amp; How to Get Them',
  metaLine: '<span class="status-beta">BETA roster — expanding each update</span>',

  body: `
    <p>Swords are the signature weapons of <em>{{gameFull}}</em>. The launch roster — including limited-time weapons — has been previewed in community showcases, and the developer keeps adding more with each update. This guide tracks the roster, what each sword excels at, and how to get your hands on them.</p>

    <h2>The Sword Roster Right Now</h2>
    <div class="card">
      <h3>What's confirmed</h3>
      <ul>
        <li><strong>Multiple obtainable swords</strong> across the islands, from starter blades to boss-tier weapons.</li>
        <li><strong>Limited-time weapons</strong> available during events/beta windows — shown off in TikTok sword showcases; availability windows matter.</li>
        <li><strong>Upgrade paths</strong> — swords consume materials (Ember Stones, Xeros Tears, Crystal Storm Stones) to scale up, so a "weaker" sword with a good ceiling can outgrow an early favorite.</li>
      </ul>
      <p>We're documenting each sword's stats, drop location and upgrade cost in-game. Individual entries get their own item pages as they're verified — the <a href="./tier-list.html">Tier List</a> ranks them once testing completes.</p>
    </div>

    <h2>How Swords Actually Perform</h2>
    <div class="card">
      <h3>Three things we test for every sword</h3>
      <ul>
        <li><strong>Combo string damage</strong> — full combo vs. single-hit spam.</li>
        <li><strong>Charge attack payoff</strong> — hold-to-charge heavy hits; some swords charge much faster than others.</li>
        <li><strong>Safety</strong> — whether the swing animation lets you Q-roll out before a boss counterattacks.</li>
      </ul>
    </div>

    <h2>Fastest Way to Gear Up Your First Sword</h2>
    <div class="card">
      <ol>
        <li>Redeem every active code on the <a href="./index.html">codes page</a> — UPDATE1 + UPDATE3 alone give 200,000 Gold, 20,000 Gems and 100+ upgrade materials.</li>
        <li>Push the early islands with your starter sword — quests hand out replacement gear.</li>
        <li>Bank Ember Stones and Crystal Storm Stones for the first boss-tier sword you get, don't spread upgrades thin.</li>
      </ol>
      <p>Need the currency first? <a href="./gold-guide.html">Gold guide</a> · <a href="./gems-guide.html">Gems guide</a></p>
    </div>

    <h2>Related Guides</h2>
    <ul>
      <li><a href="./tier-list.html">Weapon Tier List — full ranking criteria</a></li>
      <li><a href="./bosses.html">Boss guide — where boss weapons drop</a></li>
      <li><a href="./ember-stones.html">Ember Stones — the upgrade material that matters</a></li>
    </ul>
`,
};

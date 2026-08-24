// Wiki Hub 页（内容层）—— "All Guides" 网格由 <!--AUTO:HUB--> 自动生成
export default {
  slug: 'wiki',
  type: 'page',
  order: 10,
  title: '{{game}} Wiki Hub ({{platform}}): Guides, Codes, Items & Systems',
  description: 'The complete {{game}} {{platform}} wiki hub: codes, weapon tier list, leveling, gold and gems guides, boss fights, crafting materials and update log — all in one place.',
  updated: '2026-08-24',
  navLabel: 'Wiki',
  crumb: 'Wiki',
  card: { title: 'Wiki Hub', blurb: 'All guides, items &amp; systems in one place.' },
  hub: { heading: 'All Guides', style: 'plain' },
  inSitemap: true,
  sitemapPriority: 0.9,

  h1: '{{game}} Wiki Hub — Every Guide in One Place',
  metaDate: false, // wiki 页 meta-line 不带 Updated 日期前缀（与原版一致）
  metaLine: 'The navigation center for all our <em>{{gameFull}}</em> ({{platform}}) guides.',

  body: `
    <p><em>{{gameFull}}</em> is a solo-developed action RPG on {{platform}} by {{developer}}. You battle across islands, hunt powerful bosses, complete quests and collect increasingly powerful gear, growing from a lowly adventurer into an "overgeared legend". It runs on PC and mobile, supports combo-triggered skills and chargeable attacks, and is updated frequently during Beta.</p>

    <h2>Game Quick Facts</h2>
    <div class="card">
      <table>
        <tr><th>Item</th><th>Detail</th></tr>
        <tr><td>Platform</td><td>{{platform}} (PC &amp; mobile)</td></tr>
        <tr><td>Developer</td><td>{{developer}} (solo dev, passion project)</td></tr>
        <tr><td>Status</td><td><span class="status-beta">BETA</span> — frequent downtime for updates</td></tr>
        <tr><td>Rating</td><td>91% like ratio</td></tr>
        <tr><td>Official community</td><td>{{game}} Discord (linked from the {{platform}} game page)</td></tr>
      </table>
    </div>

    <h2>Currencies &amp; Materials</h2>
    <div class="card">
      <h3>What you'll be farming</h3>
      <ul>
        <li><strong>Gold</strong> — main currency. Free starter amount from codes.</li>
        <li><strong>Gems</strong> — premium currency. Up to 10,000 per code.</li>
        <li><strong>Ember Stones</strong> — crafting/upgrade material (50 from UPDATE3).</li>
        <li><strong>Xeros Tears</strong> — material, 50–100 from codes.</li>
        <li><strong>Crystal Storm Stones</strong> — material introduced with UPDATE3.</li>
        <li><strong>Xerath's Gems</strong> — rare material from UPDATE1.</li>
      </ul>
      <p>Full farming routes: see the <a href="./gold-guide.html">Gold guide</a>, <a href="./gems-guide.html">Gems guide</a> and <a href="./ember-stones.html">Ember Stones guide</a>.</p>
    </div>

    <!--AUTO:HUB-->

    <h2>Combat Controls Reference</h2>
    <div class="card">
      <table>
        <tr><th>Action</th><th>Control</th></tr>
        <tr><td>Lock camera</td><td>Ctrl</td></tr>
        <tr><td>Roll / dash</td><td>Q</td></tr>
        <tr><td>Jump</td><td>Space</td></tr>
        <tr><td>Skills</td><td>Triggered through attack combos</td></tr>
        <tr><td>Heavy attacks</td><td>Hold to charge</td></tr>
      </table>
      <p>These matter in boss fights — see the <a href="./bosses.html">Bosses guide</a> for how to use rolls and charged attacks against heavy enemies.</p>
    </div>

    <h2>Update Tracker</h2>
    <p>The game is in active Beta with frequent updates. Known update timeline inferred from codes: launch (BETA, OVERGEARED, RELEASED) → 15K visits milestone → UPDATE1 → UPDATE2 → UPDATE3 (added Crystal Storm Stones) → 100K visits milestone. We log each change as it's confirmed in the official Discord.</p>
`,
};

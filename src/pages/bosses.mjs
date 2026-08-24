// Boss 指南页（内容层）
export default {
  slug: 'bosses',
  type: 'page',
  order: 80,
  title: '{{game}} Bosses Guide ({{platform}}) — Mechanics & Fight Tips',
  description: 'Boss guide for {{game}} on {{platform}}: how boss fights work, the dodge-and-charge combat loop that beats every heavy enemy, and what bosses drop. Updated for Beta.',
  updated: '2026-08-24',
  navLabel: 'Bosses',
  footerLabel: 'Bosses',
  crumb: 'Bosses',
  card: { title: 'Bosses Guide', blurb: 'Mechanics and fight tips.',
    wiki: { blurb: 'Mechanics, dodge timing, fight rewards.' } },
  inSitemap: true,
  sitemapPriority: 0.8,

  h1: '{{game}} Bosses Guide — Mechanics &amp; Fight Tips',
  metaLine: '<span class="status-beta">BETA — boss roster growing each update</span>',

  body: `
    <p>Bosses are the heart of <em>{{gameFull}}</em>: the game's own description promises you'll "hunt powerful bosses" across the islands, and boss-tier weapons are the payoff. The roster is still expanding during Beta, so this guide focuses on the universal fight patterns that beat every boss we've seen.</p>

    <h2>The Universal Boss Loop</h2>
    <div class="card">
      <h3>Dodge → Punish → Bank</h3>
      <ol>
        <li><strong>Ctrl lock</strong> onto the boss so every swing connects while you track its wind-ups.</li>
        <li><strong>Q-roll out</strong> of telegraphed attacks — rolls are generous in Beta; use them aggressively, not reactively.</li>
        <li><strong>Punish with charged attacks</strong> — after a boss finishes a combo string it has a recovery window; that's when your hold-to-charge heavy hits land.</li>
        <li><strong>Bank combo skills</strong> — combo-triggered skills are your burst damage; hold them for openings instead of opening the fight with them.</li>
      </ol>
    </div>

    <h2>Prep Before Every Boss Attempt</h2>
    <div class="card">
      <ul>
        <li>Redeem all <a href="./index.html">codes</a> first — UPDATE1 gives 300 free potions; walking into a boss fight without them is throwing away free retries.</li>
        <li>Bring your highest upgraded sword, not your newest — see the <a href="./tier-list.html">tier list</a> and <a href="./best-swords.html">best swords</a> guides.</li>
        <li>Stock Ember Stones and Crystal Storm Stones for post-fight upgrades — boss drops pair with materials to unlock the next weapon tier.</li>
      </ul>
    </div>

    <h2>Boss Roster &amp; Drops (Being Documented)</h2>
    <div class="card">
      <p>The developer adds new bosses with each content update. Individual boss pages — with attack patterns, safe spots and drop tables — get published here as each fight is verified in-game. What we track per boss:</p>
      <ul>
        <li>Telegraph timings for every attack</li>
        <li>Whether the boss is farmable repeatable or once-per-island</li>
        <li>Drop tables (weapons, materials, currency)</li>
      </ul>
      <p>New boss announcements appear in the official {{game}} Discord first; we verify and document them here.</p>
    </div>

    <h2>Related Guides</h2>
    <ul>
      <li><a href="./leveling-guide.html">Leveling guide — bosses are the 60+ XP engine</a></li>
      <li><a href="./ember-stones.html">Ember Stones — post-boss upgrade materials</a></li>
      <li><a href="./wiki.html">Wiki hub</a></li>
    </ul>
`,
};

// 首页 · Codes（内容层）
// hero 文案、codes 表、兑换步骤、消歧区块都在这；hub 网格由 <!--AUTO:HUB--> 自动生成
export default {
  slug: 'index',
  type: 'home',
  order: 5,
  title: '{{game}} Codes ({{platform}}) — All Working Codes, {{monthYear}}',
  description: 'All working {{game}} codes for {{platform}}, updated {{monthYear}}. Redeem for free Gold, Gems, Ember Stones and Xeros Tears. Full reward list and how to redeem.',
  updated: '2026-08-24',
  navLabel: 'Codes',
  card: { title: '{{game}} Codes', blurb: 'All 10 working codes + reward list.' },
  hub: { heading: 'Explore the Codex', style: 'orn' },
  inSitemap: true,
  sitemapPriority: 1.0,

  hero: {
    overline: "The Adventurer's Codex · {{platform}}",
    h1: '{{game}} Codes',
    h1Em: 'for {{platform}}',
    sub: 'Every working code for the island-hopping action RPG — Gold, Gems, Ember Stones &amp; Xeros Tears. Verified after the UPDATE3 patch.',
    ctaPrimary: { label: 'Claim the Codes', href: '#codes' },
    ctaSecondary: { label: 'Enter the Wiki', href: './wiki.html' },
    stats: [
      { value: '10', label: 'Active codes' },
      { value: '9', label: 'Guides & counting' },
      { value: '91%', label: 'Game like ratio' },
    ],
    badge: 'BETA',
  },

  body: `
    <!-- ═══════════ CODES ═══════════ -->
    <section id="codes" class="card">
      <h2>Active {{game}} Codes</h2>
      <p class="meta-line">Updated: <strong>{{dateHuman}}</strong> · checked against UPDATE3 · new codes drop with every patch</p>
      <table>
        <tr><th>Code</th><th>Reward</th><th>Status</th></tr>
        <tr><td><span class="code">UPDATE3</span></td><td>100,000 Gold, 10,000 Gems, 50 Ember Stones, 50 Xeros Tears, 30 Crystal Storm Stones</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">UPDATE2</span></td><td>Free rewards</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">UPDATE1</span></td><td>100,000 Gold, 10,000 Gems, 100 Xeros Tears, 50 Xerath's Gems, 300 HP Potions</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">100KVISIT</span></td><td>Free rewards (visits milestone)</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">15KVISIT</span></td><td>Free rewards (visits milestone)</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">RELEASED</span></td><td>Free rewards (launch)</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">OVERGEARED</span></td><td>Free rewards</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">BETA</span></td><td>Free rewards (beta launch)</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">LGREED</span></td><td>Free rewards</td><td class="status-active">Active</td></tr>
        <tr><td><span class="code">MAGNUS</span></td><td>Free rewards</td><td class="status-active">Active</td></tr>
      </table>
      <p style="font-size:14px;color:var(--muted-fg)">Codes are case-sensitive — copy them exactly. A code that fails has likely expired after a patch.</p>
    </section>

    <section class="card">
      <h2>How to Redeem</h2>
      <ol class="redeem-steps">
        <li>Launch <strong>{{gameFull}}</strong> on {{platform}} (PC or mobile).</li>
        <li>Open the <strong>Codes</strong> menu (the bird icon).</li>
        <li>Paste a code exactly as shown above.</li>
        <li>Hit <strong>Redeem</strong> — rewards land instantly.</li>
      </ol>
    </section>

    <section class="card">
      <h2>Which {{game}} Is This?</h2>
      <p>This site covers only the <strong>{{platform}} game</strong> <em>{{gameFull}}</em> by {{developer}} — an island-hopping action RPG inspired by the Korean web novel.</p>
      <p class="disambig">Fandom's "{{game}} Wiki" (Behen Archipelago, 66 islands) documents the <strong>novel</strong>, not this game. <em>{{game}} Hero: Merge RPG</em> is a separate mobile game — its codes don't work here.</p>
    </section>

    <!--AUTO:HUB-->
`,
};

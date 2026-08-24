#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   热词游戏站 · 模板构建脚本（框架层）
   ─────────────────────────────────────────────────────────────
   三层架构：
     框架层  build.mjs + style.css          —— 不含任何游戏专属信息
     配置层  site.config.json               —— 游戏名/域名/主题色/导航/SEO/GA
     内容层  src/pages/*.mjs                —— 一页一文件，增删页面自动进导航/hub/sitemap

   用法：
     node build.mjs                                     原地构建（覆盖根目录 *.html 等）
     node build.mjs --out test-dist                     构建到其他目录
     node build.mjs --config other.jsonc --out test-dist  换配置构建（替换测试）
     node build.mjs --check-only                        只跑 SEO/内链自检，不写文件

   零依赖，Node 18+。生成产物：*.html、sitemap.xml、robots.txt、theme.css。
   不会碰：google*.html（GSC 验证文件）、style.css、screenshots/、.vercel/。
   ═══════════════════════════════════════════════════════════════ */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const CONFIG_PATH = getArg('--config') || 'site.config.json';
const OUT_DIR = getArg('--out') || '.';
const CHECK_ONLY = args.includes('--check-only');

/* ─── JSONC 解析：允许 // 注释、块注释、尾逗号 ─── */
function parseJSONC(text) {
  let out = '';
  let mode = 'code'; // code | lineComment | blockComment | string
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (mode === 'string') {
      out += c;
      if (c === '\\') { out += next; i++; }
      else if (c === '"') mode = 'code';
      continue;
    }
    if (mode === 'lineComment') {
      if (c === '\n') { out += '\n'; mode = 'code'; }
      continue;
    }
    if (mode === 'blockComment') {
      if (c === '*' && next === '/') { i++; mode = 'code'; }
      continue;
    }
    // code
    if (c === '"') { out += c; mode = 'string'; continue; }
    if (c === '/' && next === '/') { i++; mode = 'lineComment'; continue; }
    if (c === '/' && next === '*') { i++; mode = 'blockComment'; continue; }
    out += c;
  }
  // 去尾逗号（字符串已在上面原样保留，剩余的 ,}] / ,] 组合都在代码区）
  out = out.replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(out);
}

/* ─── 工具 ─── */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** {{token}} 替换，tokens 里没有的 key 原样保留 */
const tpl = (s, tokens) => String(s ?? '').replace(/\{\{(\w+)\}\}/g,
  (m, k) => (k in tokens ? tokens[k] : m));
const humanDate = (iso) => new Date(iso + 'T00:00:00Z')
  .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
/** 某页可用的 {{token}} 集合：站点级 + 该页日期 */
const pageTokens = (page) => ({
  ...siteTokens,
  dateHuman: humanDate(page.updated),
  monthYear: new Date(page.updated + 'T00:00:00Z')
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
  year: String(page.updated).slice(0, 4),
});

/* ─── 载入配置与页面 ─── */
const root = path.resolve(CONFIG_PATH, '..');
const config = parseJSONC(fs.readFileSync(CONFIG_PATH, 'utf8'));

const pagesDir = path.join(root, 'src', 'pages');
const pageFiles = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.mjs')).sort();
const pages = [];
for (const f of pageFiles) {
  const mod = await import(pathToFileURL(path.join(pagesDir, f)).href);
  const page = mod.default;
  const slugFromFile = f.replace(/\.mjs$/, '');
  if (page.slug !== slugFromFile) {
    throw new Error(`文件名与 slug 不一致: ${f} vs slug "${page.slug}"`);
  }
  pages.push(page);
}
const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));

/* 站点级 token：供 {{game}} 等占位符使用 */
const rawTokens = {
  game: config.game.short,
  gameFull: config.game.full,
  platform: config.game.platform,
  developer: config.game.developer,
  domain: config.site.domain,
};
const siteTokens = {
  ...rawTokens,
  brand: tpl(config.brand.name, rawTokens) + tpl(config.brand.suffix, rawTokens),
};

/* ─── 校验：导航引用的 slug 必须存在 ─── */
const errors = [], warnings = [];
for (const [key, slugs] of Object.entries(config.nav || {})) {
  for (const s of slugs) if (!bySlug[s]) errors.push(`nav.${key} 引用了不存在的页面 "${s}"`);
}
for (const p of pages) {
  const inHeader = (config.nav.header || []).includes(p.slug);
  const inFooter = (config.nav.footer || []).includes(p.slug);
  if (!inHeader && !inFooter) warnings.push(`页面 ${p.slug} 不在任何导航里（只能靠内链/hub 发现）`);
}

/* ─── 渲染片段 ─── */
function renderNav(kind) {
  const items = (config.nav[kind] || [])
    .map((slug) => {
      const p = bySlug[slug];
      const label = tpl(kind === 'header' ? p.navLabel : (p.footerLabel || p.navLabel), siteTokens);
      return `        <a href="./${slug}.html">${label}</a>`;
    })
    .join('\n');
  return items;
}

function renderHub(currentSlug) {
  return pages
    .filter((p) => p.slug !== currentSlug && p.card)
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
    .map((p) => {
      const t = pageTokens(p);
      // wiki 页的 hub 允许不同的卡片文案（card.wiki 可选）
      const c = currentSlug === 'wiki' && p.card.wiki ? { ...p.card, ...p.card.wiki } : p.card;
      return `      <a class="hub-card" href="./${p.slug}.html"><h3>${tpl(c.title, t)}</h3><p>${tpl(c.blurb, t)}</p></a>`;
    })
    .join('\n');
}

function renderHead(page) {
  const T = pageTokens(page);
  const url = `https://${config.site.domain}/${page.slug}.html`;
  const gaId = config.analytics?.gaId;
  const ga = gaId ? `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${gaId}');
</script>
` : '';
  const fonts = config.theme.googleFonts ||
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Crimson+Pro:wght@400;600&family=Cinzel:wght@600;700;900&family=JetBrains+Mono:wght@700&display=swap';
  const ogImage = config.seo.ogImage
    ? `\n  <meta property="og:image" content="${esc(config.seo.ogImage)}">` : '';
  return `${ga}  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(tpl(page.title, T))}</title>
  <meta name="description" content="${esc(tpl(page.description, T))}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(siteTokens.brand)}">
  <meta property="og:title" content="${esc(tpl(page.title, T))}">
  <meta property="og:description" content="${esc(tpl(page.description, T))}">
  <meta property="og:url" content="${esc(url)}">${ogImage}
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="${esc(url)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${esc(fonts)}">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="theme.css">`;
}

function renderHeader() {
  return `  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="./index.html">${esc(tpl(config.brand.name, siteTokens))}<span>${esc(tpl(config.brand.suffix, siteTokens))}</span></a>
      <nav class="nav">
${renderNav('header')}
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  const official = (config.officialLinks || [])
    .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(tpl(l.label, siteTokens))}</a>`)
    .join(' · ');
  const officialLine = official
    ? `      <p class="official-links">Official: ${official}</p>\n` : '';
  return `  <footer class="site-footer">
    <div class="footer-inner">
      <nav>
${renderNav('footer')}
      </nav>
${officialLine}      <p>${esc(tpl(config.footer.disclaimer, siteTokens))}</p>
    </div>
  </footer>`;
}

/* 首页 hero（拱顶大屏 + 纹章） */
function renderHero(page) {
  const T = pageTokens(page);
  const h = page.hero;
  const stats = h.stats
    .map((s) => `        <div><b>${esc(tpl(s.value, T))}</b><span>${esc(tpl(s.label, T))}</span></div>`)
    .join('\n');
  return `  <!-- ═══════════ HERO ═══════════ -->
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-crest" aria-hidden="true">
        <svg viewBox="0 0 120 132" width="104" height="114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 4 108 20v44c0 32-22 54-48 64C34 118 12 96 12 64V20L60 4Z" stroke="#C9A962" stroke-width="3"/>
          <path d="M60 14 98 27v36c0 26-18 44-38 52-20-8-38-26-38-52V27L60 14Z" stroke="#8a6f38" stroke-width="1.4"/>
          <path d="M60 26v56M60 26l-4 8h8l-4-8Z" stroke="#C9A962" stroke-width="3" stroke-linecap="round"/>
          <path d="M44 40h32M48 46h24" stroke="#C9A962" stroke-width="3" stroke-linecap="round"/>
          <path d="M60 82l-7 9 7 9 7-9-7-9Z" fill="#8B2635" stroke="#C9A962" stroke-width="1.6"/>
          <circle cx="60" cy="52" r="7" stroke="#C9A962" stroke-width="2.4"/>
          <path d="M60 45l6 7-6 7-6-7 6-7Z" fill="#C9A962" opacity=".55"/>
        </svg>
      </div>
      <p class="hero-overline">${esc(tpl(h.overline, T))}</p>
      <h1>${tpl(h.h1, T)}${h.h1Em ? ` <em>${esc(tpl(h.h1Em, T))}</em>` : ''}</h1>
      <p class="hero-sub">${tpl(h.sub, T)}</p>
      <div class="hero-cta">
        <a class="btn btn-brass" href="${esc(h.ctaPrimary.href)}">${esc(tpl(h.ctaPrimary.label, T))}</a>
        <a class="btn btn-ghost" href="${esc(h.ctaSecondary.href)}">${esc(tpl(h.ctaSecondary.label, T))}</a>
      </div>
      <div class="hero-stats">
${stats}
      </div>
      <span class="wax-seal">${esc(tpl(h.badge, T))}</span>
    </div>
  </section>`;
}

function breadcrumbHTML(page) {
  if (!page.crumb) return '';
  const home = '<a href="./index.html">Home</a>';
  const wikiMid = page.slug !== 'wiki' && bySlug.wiki ? ' / <a href="./wiki.html">Wiki</a>' : '';
  return `    <p class="breadcrumb">${home}${wikiMid} / ${esc(tpl(page.crumb, pageTokens(page)))}</p>\n`;
}

function renderPage(page) {
  const T = pageTokens(page);
  let body = tpl(page.body, T);
  if (body.includes('<!--AUTO:HUB-->')) {
    const heading = page.hub?.heading
      ? (page.hub.style === 'orn'
          ? `    <h2 class="section-orn">${esc(tpl(page.hub.heading, T))}</h2>\n`
          : `    <h2>${esc(tpl(page.hub.heading, T))}</h2>\n`)
      : '';
    body = body.replace(/[ \t]*<!--AUTO:HUB-->\n?/, `${heading}    <div class="hub-grid">\n${renderHub(page.slug)}\n    </div>\n`);
  }

  let mainOpen;
  if (page.type === 'home') {
    mainOpen = '';
  } else {
    const datePrefix = page.metaDate === false ? '' : `Updated: <strong>${humanDate(page.updated)}</strong> · `;
    const meta = page.metaLine
      ? `    <p class="meta-line">${datePrefix}${tpl(page.metaLine, T)}</p>\n`
      : '';
    mainOpen = `${breadcrumbHTML(page)}    <h1>${tpl(page.h1, T)}</h1>\n${meta}`;
  }
  return `<!DOCTYPE html>
<html lang="${esc(config.site.lang || 'en')}">
<head>
${renderHead(page)}
</head>
<body>
${renderHeader()}

${page.type === 'home' ? renderHero(page) : ''}
  <main>
${mainOpen}${body}
  </main>

${renderFooter()}
</body>
</html>
`;
}

/* ─── SEO / 内链自检（SOP 检查清单自动化） ─── */
function runChecks(generated) {
  const slugs = new Set(pages.map((p) => p.slug));
  for (const page of pages) {
    const html = generated[page.slug];
    const label = page.slug;
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    if (h1Count !== 1) errors.push(`${label}: H1 数量为 ${h1Count}，必须唯一`);
    if (!/<h2[\s>]/.test(html)) warnings.push(`${label}: 页面没有 H2`);
    const title = tpl(page.title, pageTokens(page));
    const desc = tpl(page.description, pageTokens(page));
    if (!title) errors.push(`${label}: 缺少 title`);
    if (!desc) errors.push(`${label}: 缺少 description`);
    if (title && (title.length < 15 || title.length > 70)) warnings.push(`${label}: title 长度 ${title.length}（建议 15-70）`);
    if (desc && (desc.length < 60 || desc.length > 170)) warnings.push(`${label}: description 长度 ${desc.length}（建议 60-170）`);
    if (!page.updated) warnings.push(`${label}: 缺少 updated（sitemap lastmod 用）`);
  }
  // 内链：<a> 的 ./xxx.html 目标必须存在（<link> 样式表不查）
  for (const page of pages) {
    const html = generated[page.slug];
    for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      const href = m[1];
      if (/^(https?:|mailto:|#|tel:)/.test(href)) continue;
      const target = href.replace(/^\.\//, '').replace(/\.html$/, '');
      if (target && !slugs.has(target)) errors.push(`${page.slug}: 死链 ${href}`);
    }
  }
}

/* ─── 生成产物 ─── */
function renderSitemap() {
  const urls = pages
    .filter((p) => p.inSitemap !== false)
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
    .map((p) => {
      const loc = p.slug === 'index'
        ? `https://${config.site.domain}/`
        : `https://${config.site.domain}/${p.slug}.html`;
      return `  <url><loc>${esc(loc)}</loc><lastmod>${p.updated}</lastmod><priority>${(p.sitemapPriority ?? 0.5).toFixed(1)}</priority></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: https://${config.site.domain}/sitemap.xml
`;
}

function renderThemeCss() {
  const vars = Object.entries(config.theme.vars || {})
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');
  return `/* GENERATED by build.mjs — 来源 site.config.json 的 theme.vars，改配置重新构建，勿手改 */
:root {
${vars}
}
`;
}

/* ─── 主流程 ─── */
const generated = {};
for (const page of pages) generated[page.slug] = renderPage(page);
runChecks(generated);

console.log(`配置: ${CONFIG_PATH}  页面: ${pages.length}  输出: ${path.resolve(OUT_DIR)}`);
console.log('─'.repeat(64));
for (const p of pages) {
  const h1 = (generated[p.slug].match(/<h1[\s>]/g) || []).length;
  const h2 = (generated[p.slug].match(/<h2[\s>]/g) || []).length;
  const inNav = (config.nav.header || []).includes(p.slug) || (config.nav.footer || []).includes(p.slug);
  console.log(
    `  ${p.slug}.html`.padEnd(24) +
    `H1:${h1} H2:${h2}`.padEnd(10) +
    `title:${tpl(p.title, pageTokens(p)).length}`.padEnd(12) +
    `desc:${tpl(p.description, pageTokens(p)).length}`.padEnd(12) +
    `nav:${inNav ? '✓' : '✗'}`
  );
}
if (warnings.length) {
  console.log('─'.repeat(64));
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
if (errors.length) {
  console.log('─'.repeat(64));
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log('\n构建失败：先修复上面的错误。未写入任何文件。');
  process.exit(1);
}
console.log('─'.repeat(64));
console.log('  SEO 自检全部通过（唯一 H1 / 独立 title+description / 无死链）');

if (!CHECK_ONLY) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [slug, html] of Object.entries(generated))
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.html`), html);
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), renderSitemap());
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), renderRobots());
  fs.writeFileSync(path.join(OUT_DIR, 'theme.css'), renderThemeCss());
  // 复制框架层静态资源（style.css）到输出目录（原地构建时等于无操作）
  const styleSrc = path.join(root, 'style.css');
  if (path.resolve(OUT_DIR) !== path.resolve(root) && fs.existsSync(styleSrc))
    fs.copyFileSync(styleSrc, path.join(OUT_DIR, 'style.css'));
  console.log(`  已生成 ${pages.length} 个页面 + sitemap.xml + robots.txt + theme.css`);
}

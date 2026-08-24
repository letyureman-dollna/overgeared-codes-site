# 热词游戏站模板（The Adventurer's Codex）

由第一个站 overgeared-site（2026-08-24 上线）重构而来：**框架层 / 配置层 / 内容层** 三层分离，换游戏建新站时框架代码零改动。

## 三层结构

| 层 | 文件 | 放什么 | 换游戏时要动吗 |
|---|---|---|---|
| **框架层** | `build.mjs`、`style.css` | 构建脚本 + 主题样式（含默认配色），不含任何游戏信息 | ❌ 不动 |
| **配置层** | `site.config.json` | 游戏名、域名、品牌、主题色、导航、官方链接、GA、页脚免责 | ✅ 只改这里 |
| **内容层** | `src/pages/*.mjs` | 一页一文件：SEO title/description、H1、正文 HTML、卡片文案 | ✅ 重写内容 |

构建产物（提交进 git，Vercel 直接服务）：`*.html`、`sitemap.xml`、`robots.txt`、`theme.css`。
不归构建管：`google*.html`（GSC 验证文件，勿删）、`screenshots/`。

## 日常操作

```bash
node build.mjs            # 构建到根目录（改完配置/内容后跑）
node build.mjs --check-only   # 只跑 SEO/内链自检，不写文件
```

构建自带 SOP 检查清单：每页唯一 H1、独立 title/description、`<a>` 内链无死链、导航 slug 校验，任何一条不过直接构建失败。

**加一个页面**：`src/pages/` 丢一个新 `.mjs`（抄现有页面结构）→ `site.config.json` 的 `nav.header/footer` 加 slug → `node build.mjs`。导航、首页/wiki 的 hub 网格、sitemap.xml 全部自动更新。
**删一个页面**：删 `.mjs` + 从 nav 数组去掉 slug → 重建。
**换主题色**：改 `theme.vars` 里的色值 → 生成 `theme.css` 覆盖默认配色。
**换域名**：改 `site.domain` → canonical / og:url / sitemap / robots 全部跟随。

## 占位符 token

配置和页面文本里可写 `{{game}}`、`{{gameFull}}`、`{{platform}}`、`{{developer}}`、`{{domain}}`、`{{brand}}`，页面里额外有 `{{dateHuman}}`（如 August 24, 2026）、`{{monthYear}}`、`{{year}}`（取该页 `updated` 字段）。构建时自动替换。

## 替换测试结论（2026-08-24，任务卡第 5 项）

用虚构游戏 **Emberfall** 做了配置替换测试（`test-dist.config.jsonc` → `test-dist/`，已 gitignore，不上线）：

| 改动点 | 只动配置的效果 | 结果 |
|---|---|---|
| 游戏名/品牌 | `{{game}}` 联动：title、品牌、正文 token、页脚全部变 Emberfall | ✅ |
| 域名 | canonical、og:url、sitemap.xml、robots.txt 全部换到新域名 | ✅ |
| 主题色 | theme.vars 换银蓝色板 → 全站换肤，style.css 未动 | ✅ |
| GA | 删掉 `analytics.gaId` → 9 页全部不再渲染 gtag | ✅ |
| 官方链接 | `officialLinks: []` → 页脚 Official 行不渲染 | ✅ |
| 新增页面 | 临时加 `blacksmith.mjs` → 顶栏/页脚导航、hub 网格、sitemap 自动收录 | ✅ |
| 框架层 | `build.mjs`、`style.css` 中 Overgeared 出现次数 = 0 | ✅ |

**结论：换游戏 = 改 `site.config.json` + 重写 `src/pages/`，框架层两个文件一行不用动。** 正文（codes 表、攻略）属于每游戏的内容工作，无法模板化。

## 建新站流程（对照 SOP）

1. 复制整个目录到新位置，删 `test-dist/`、`.git/`、`.vercel/`
2. 改 `site.config.json`（游戏名/域名/主题/官方链接/GA 留空）
3. 逐页重写 `src/pages/*.mjs`（内容按关卡 2/3 方法生产，两个来源印证）
4. `node build.mjs` → 本地开 `python3 -m http.server` 预览
5. 后续建仓 / Vercel / GSC / GA 按《热词游戏站SOP》第 3-5 步执行（SOP 见 `../航海作业/热词游戏站SOP-一键建站上站验证.md`）

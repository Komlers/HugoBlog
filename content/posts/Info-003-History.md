---
title: 【文档】此博客从毛坯到如今的优化与改动参考
date: 2026-08-14T10:20:00+08:00
lastmod: 2026-08-14T10:20:00+08:00
draft: false
toc: true
images:
description: 根据我当前的个人博客搭建情况，展示出我的博客从刚开始部署的毛坯状态，到如今功能比较丰富的状态的一些优化和改动。
author: Dan_Evan
categories:
  - 介绍和记录
tags:
  - Hugo
  - 优化
  - 博客
---
# 博客功能变更记录（vs 原版 Hermit-V2）

> 本文档记录本博客相较原版 Hugo + Hermit-V2 主题，所有优化与新增功能的差异汇总。
> 原版基准：`6f0ed7e`（Initial commit: Hugo site with Hermit-V2 theme）。

>[!TIP]
>本博客几乎一切优化都是在AI的帮助下得以实现的，所以我建议大家在部署博客和优化博客的时候，也积极使用AI工具，能省不少事（）

---

## 一、基础配置

**`hugo.toml`** 相比原版做了大量扩展与修正：

### 新增功能配置

| 配置项 | 说明 |
|--------|------|
| `[markup.goldmark]` | 开启 `unsafe = true`（允许原生 HTML），启用删除线、上标、下标、`mark` 等扩展语法 |
| `[markup.goldmark.extensions.extras]` | 启用 `insert`、`delete`、`mark`、`subscript`、`superscript` |
| `[outputs]` | home 输出 `HTML`、`RSS`、`JSON`（JSON 用于搜索索引） |
| `[params.utterances]` | 配置 utterances 评论系统（repo、issueTerm、theme） |
| `[params.pages]` | `relatedPosts = true`（相关推荐）等 |
| `[params]` | `pinned`（置顶文案）、`pinnedSVGname`、`listLayout`、`footerHideThemeName`、`global_mathjax = true` |
| `[[params.socialLinks]]` | 扩展为 github、email、bilibili、telegram 四个 |
| `[menu]` | 增加「搜索」菜单项 |

### 修正的配置问题

- **时区**：新增 `timezone = "Asia/Shanghai"`，解决云端部署日期显示问题
- **`enableGitInfo`**：改为关闭，避免 Git 信息导致所有文章显示同一天
- **TOML 缩进**：修正 `params` 下各子表缩进，避免键被错误嵌套进 `utterances` 表
- **`global_mathjax`**：`false` → `true`，全局启用 MathJax 数学公式

---

## 二、搜索功能

原版主题无站内搜索，本博客新增了完整的客户端搜索：

- **`content/search.md`**：搜索页面内容
- **`layouts/_default/search.html`**：搜索页布局（搜索框、按钮、结果列表）
- **`layouts/_default/list.json.json`**：生成文章索引 JSON（含标题、URL、正文、日期）
- **`assets/js/search.js`**：搜索逻辑（加载索引、关键词匹配、展示结果）
- **`layouts/_partials/header.html`**：导航栏加入搜索入口

搜索为纯前端实现，无需后端，索引由 Hugo 构建时生成。

---

## 三、评论系统

原版主题无评论功能，本博客接入 **Utterances**（基于 GitHub Issues 的评论系统）：

- **`layouts/_partials/comments.html`**：评论组件
- **延迟加载**：评论默认隐藏，点击「加载评论」按钮才加载脚本，提升首屏性能
- **评论数显示**：通过 GitHub Issues API 获取并显示评论数量
- 在 `hugo.toml` 配置 `repo`、`issueTerm`、`theme`

---

## 四、图片灯箱（Lightbox）

原版图片无法点击放大，本博客新增了简洁的灯箱效果：

- **`assets/scss/simple-lightbox.scss`**：灯箱样式
- **`assets/js/simple-lightbox.js`**：点击图片放大、关闭、翻页
- **`layouts/_partials/extra-head.html` / `extra-foot.html`**：加载灯箱资源
- 灯箱背景改为浅灰色遮罩（更柔和）

---

## 五、阅读进度条

- **`assets/js/reading-progress.js`**：顶部阅读进度条
- **`assets/scss/features.scss`**：进度条样式
- 仅在文章页面（含 `<article>`）显示，随滚动更新进度

---

## 六、回到顶部按钮优化

原版仅在设置了 `scrolltotop` front matter 的文章显示，且显示逻辑依赖 CSS 动画。

### 改动

- **`layouts/_partials/scroll-to-top.html`**：改为由 `hugo.toml` 的 `scrollToTop` 统一控制
- **仅 posts 文章显示**：条件从 `.Kind "page"` 改为 `.Kind "page"` + `.Section "posts"`，关于、搜索等页面不显示
- **`assets/js/scrollwatcher.js`**（覆盖主题版）：显示阈值从「滚动 40%」改为「滚动 200px」
- **`assets/scss/_scrolltotop.scss`**（覆盖主题版）：移除 `animation-timeline` CSS 路径，统一使用 JS 的像素阈值，保证现代浏览器（Edge/Chrome）行为一致

---

## 七、GitHub Markdown Alerts

原版只支持 `admonition` shortcode，本博客新增了对 GitHub 原生 alert 语法的支持：

- **`layouts/_markup/render-blockquote.html`**：blockquote 渲染钩子，将 `> [!NOTE]` 等语法转换为主题 admonition 样式
- **`i18n/zh.toml`**：新增 alert 标题中文翻译

### 支持语法

```markdown
> [!NOTE]      <!-- 备注 -->
> [!TIP]       <!-- 提示 -->
> [!IMPORTANT] <!-- 重要 -->
> [!WARNING]   <!-- 警告 -->
> [!CAUTION]   <!-- 注意 -->
```

- **`assets/scss/features.scss`**：为 `important`（紫色）、`caution`（红色）补充颜色样式（主题原本无这两种类型）
- 普通 blockquote 仍正常渲染为 `<blockquote>`

---

## 八、iframe 嵌入功能

原版无 iframe 短代码，本博客新增了灵活的 iframe 嵌入：

- **`layouts/_shortcodes/iframe.html`**：iframe shortcode，通过 `type` 参数选择预设样式

| type | 适用场景 | 说明 |
|------|---------|------|
| `widget`（默认） | 通用小部件 | 高度内容自适应，透明背景 |
| `music` | 网易云音乐 | 高度内容自适应，透明背景、无边框 |
| `video` | B站 / YouTube | 固定 450px，黑色背景 |

支持参数：`src`、`type`、`height`、`width`、`title`、`allow`、`class`、`sandbox`。默认启用 `loading="lazy"`（懒加载）和 `allowfullscreen`。

- **`assets/scss/features.scss`**：`.iframe-container` 响应式样式，通过 `--iframe-bg` CSS 变量控制底色
- 新增类型只需在 `$presets` 表添加一行

---

## 九、MiSans 字体切换

原版固定使用系统字体，本博客新增了 MiSans 字体切换按钮：

- **`layouts/_partials/header.html`**：导航栏新增字体切换按钮（`#font-btn`）
- **`layouts/_partials/svg.html`**：新增字体图标
- **`assets/js/font-switch.js`**：点击在系统字体 / MiSans 间切换，持久化到 localStorage
- **`assets/scss/features.scss`**：字体切换样式
- **`layouts/_partials/extra-head.html`**：加载 MiSans 外链字体 CSS + 提前应用的内联脚本（避免闪烁）

### 重要修复：CORS 跨域问题

发现 MiSans 外链 CSS 一直无法加载，原因如下：

- MiSans 的 **CSS 文件**响应头**没有** `Access-Control-Allow-Origin`
- 原代码给 `<link>` 加了 `crossorigin="anonymous"`，强制浏览器以 CORS 模式请求，因响应无允许头被拦截

**修复**：移除 MiSans `<link>` 上的 `crossorigin="anonymous"` 属性，CSS 走普通加载模式（成功），而 CSS 内的字体文件（woff2）本身有 `Access-Control-Allow-Origin: *`，跨域字体也能正常加载。

---

## 十、网站访问统计（Vercount）

原版无访问统计，本博客接入 **Vercount**（公益统计服务）：

- **`layouts/_partials/footer.html`**：页脚新增统计栏，显示「总访问量」和「访客数」
- **`layouts/_partials/extra-foot.html`**：引入 `https://events.vercount.one/js`
- **`assets/scss/features.scss`**：统计栏样式

---

## 十一、外部链接新窗口打开

- **`layouts/_markup/render-link.html`**：自定义链接渲染钩子
- 外部链接（http/https 等）自动添加 `target="_blank"` 和 `rel="noopener"`，新窗口打开

---

## 十二、日期与时区修复

系列提交修复了日期显示问题：

- **时区感知**：使用 `.Local` 替代 `time.LoadLocation`，解决 Hugo 版本兼容性问题（`9e330a8`）
- **时区感知日期分组**：修复日期分组及 pinned posts 参数名不匹配（`647ea90`）
- **文章列表日期**：优先使用 front matter 日期，避免 GitInfo 导致所有文章显示同一天（`58db43a`）
- **关闭 enableGitInfo**：避免云端构建日期异常（`45a123b`）
- **`hugo.toml`**：添加 `timezone` 配置（`421ae1b`）

---

## 十三、文章模板（Archetype）扩展

原版 `hugo new` 生成的模板字段有限，本博客扩展了：

- **`archetypes/posts.md`**（新增，覆盖主题模板）：用于 `content/posts/` 下的文章，新增 `lastmod`、`description`、`author`、`categories` 字段
- **`archetypes/default.md`**（修改）：同样扩展了 `lastmod`、`description`、`author`

> 说明：`hugo new posts/xxx.md` 用 `archetypes/posts.md`，其他目录用 `archetypes/default.md`。

---

## 十四、其他修复与改进

- **自定义资源加载**：修复自定义 `custom_js`/`custom_css` 不被主题拾取的问题（`8eda510`），通过 `extra-head.html` / `extra-foot.html` 钩子加载
- **自定义 SVG 图标**：`layouts/_partials/svg.html` 大幅扩展，加入大量图标（社交媒体、admonition 类型等）
- **首页/列表页定制**：`layouts/list.html` 定制文章列表（置顶、日期分组、标签分类展示）
- **`.gitignore` / `.gitattributes`**：忽略 `.obsidian` 等本地目录，规范换行符
- **usehelp 文档**：新增 `Post.md`（写作指南）、`Deploy.md`（部署指南）、`History.md`（本文档）

---

## 文件改动索引

| 文件 | 类型 | 功能 |
|------|------|------|
| `hugo.toml` | 修改 | 基础配置、搜索、评论、功能开关 |
| `content/search.md` | 新增 | 搜索页 |
| `layouts/_default/search.html` | 新增 | 搜索布局 |
| `layouts/_default/list.json.json` | 新增 | 搜索索引 JSON |
| `assets/js/search.js` | 新增 | 搜索逻辑 |
| `layouts/_partials/comments.html` | 新增 | 评论系统 |
| `assets/js/simple-lightbox.js` | 新增 | 图片灯箱 |
| `assets/scss/simple-lightbox.scss` | 新增 | 灯箱样式 |
| `assets/js/reading-progress.js` | 新增 | 阅读进度条 |
| `assets/scss/comments.scss` | 新增 | 评论样式 |
| `layouts/_partials/scroll-to-top.html` | 修改 | 回顶按钮（仅 posts） |
| `assets/js/scrollwatcher.js` | 新增 | 回顶按钮 200px 触发 |
| `assets/scss/_scrolltotop.scss` | 新增 | 回顶样式（移除 CSS 动画路径） |
| `layouts/_markup/render-blockquote.html` | 新增 | GitHub Alert 渲染钩子 |
| `layouts/_markup/render-link.html` | 新增 | 外链新窗口 |
| `layouts/_shortcodes/iframe.html` | 新增 | iframe 嵌入 |
| `layouts/_partials/header.html` | 新增 | 字体切换按钮、搜索入口 |
| `layouts/_partials/footer.html` | 新增 | Vercount 统计栏 |
| `assets/js/font-switch.js` | 新增 | 字体切换逻辑 |
| `assets/scss/features.scss` | 新增 | 各功能样式 |
| `layouts/_partials/extra-head.html` | 新增 | 加载资源钩子（灯箱、字体、CSS） |
| `layouts/_partials/extra-foot.html` | 新增 | 加载资源钩子（JS、统计） |
| `layouts/_partials/svg.html` | 新增 | 自定义图标库 |
| `layouts/list.html` | 新增 | 定制文章列表 |
| `archetypes/posts.md` | 新增 | 文章模板 |
| `archetypes/default.md` | 修改 | 文章模板 |
| `i18n/zh.toml` | 修改 | GitHub Alert 翻译 |
| `assets/identity/*` | 新增 | 站点图标（favicon、web app manifest 等） |
| `usehelp/Post.md` | 新增 | 写作指南 |
| `usehelp/Deploy.md` | 新增 | 部署指南 |
| `usehelp/History.md` | 新增 | 本文档 |

---

> 注：部分功能（如字体切换 CORS 修复、回顶按钮逻辑）经历多次迭代，最终以上述「当前状态」为准。
---
title: 【文档】开始写一篇新的文章（撰写文章指南）
date: 2026-08-14T10:05:00+08:00
lastmod: 2026-08-16T11:00:00+08:00
draft: false
toc: true
images:
description: 根据我当前的个人博客搭建情况，实例在我这个部署的环境下，如何去写一篇新的文章，以及一些相关注意事项。
author: Dan_Evan
categories:
  - 博客文档
tags:
  - Hugo
  - 文章
  - 博客
  - Markdown
---
# 博客文章写作指南

> 适用于博客环境已部署好的情况。首次部署请参考 [【文档】从零开始安装部署Hugo+Hermit-V2主题+我的预设](https://blog.danevan.top/posts/info-001-deploy/)

**Hugo 版本**：0.164.0 Extended  
**主题**：Hermit-V2

>[!NOTE]
>本文档是基于我的博客状态写的一个撰写文章的小帮助，如果你的博客搭建情况和我略有不同，请勿完全照搬这里的方法！

---

## 一、创建新文章

```bash
# 在博客目录下运行
hugo new posts/文章标题.md
```

示例：
```bash
hugo new posts/hugo-install-guide.md
```

这会在 `content/posts/` 下创建新文件，并自动填充 front matter。
> `content/posts/` 下的文章使用 `archetypes/posts.md` 模板；其他目录的文章使用 `archetypes/default.md` 模板。

---

## 二、Front Matter（文章元信息）

创建后的文件结构（posts 模板）：
```yaml
---
title: "文章标题"
date: 2026-08-08
lastmod: 2026-08-08
draft: true
toc: false
images:
description: ""
author: ""
categories:
  - uncategorized
tags:
  - untagged
---
```

### 字段说明

| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 文章标题 | `"Hugo 安装教程"` |
| `date` | 创建日期 | 自动生成，可手动修改 |
| `lastmod` | 最后修改日期 | 自动生成，可手动修改 |
| `draft` | 草稿状态 | `true` 预览可见 / `false` 发布后可见 |
| `toc` | 显示目录 | `true` / `false` |
| `images` | 特色图片 | `images/cover.jpg`（图片放 `static/` 目录） |
| `description` | 文章描述（SEO） | `"文章简介"` |
| `author` | 作者 | `"Dan_Evan"` |
| `categories` | 分类（多选） | `- 技术` / `- 生活` |
| `tags` | 标签（多选） | `- Hugo` / `- 教程` |

### 注意事项

- **draft**: 本地预览用 `true`，发布前改为 `false`
- **tags/categories**: 使用 `-` 列表语法，多个标签多行写
- **中文标题**: 引号可省略，但含特殊字符时需加引号

### 更多 Front Matter 字段参考

Hugo 的 Front Matter 支持非常丰富，常见的有：

- **slug / url / aliases**: 自定义 URL、路径及旧链接重定向
- **weight**: 排序权重，越小越靠前（如果没作用请使用pinned）
- **pinned**: 是否置顶文章（true/false）
- **summary**: 自定义摘要（不设置则 Hugo 自动截取）
- **layout / type**: 自定义布局模板
- **publishDate / expiryDate**: 发布时间与过期时间
- **build / cascade / headless**: 高级构建与级联配置
- **params**: 自定义参数（放在 `params` 下）

---

## 三、正文写作

### 1. 基础 Markdown

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体** *斜体* ~~删除线~~

- 无序列表
  - 子列表
1. 有序列表
2. 第二项

[链接](https://example.com)
![图片](images/photo.jpg)
```

### 2. 代码块

````markdown
```python
def hello():
    print("Hello World")
```
````

主题已启用代码复制按钮。

### 3. 插入图片

1. 图片放入 `static/images/` 目录
2. 正文中引用：

```markdown
![描述](images/myphoto.jpg)
```

### 4. 表格

```markdown
| 左对齐 | 居中 | 右对齐 |
|:-------|:----:|-------:|
| 内容   | 内容 |   内容 |
```

### 5. 数学公式（已启用 MathJax）

行内公式：`$E=mc^2$`

块级公式：
```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 6. 提示块（Admonition）

主题使用 `admonition` shortcode，支持以下类型：
`note`、`info`、`tip`、`success`、`warning`、`failure`、`danger`、`bug`、`summary`

![Snipaste_2026-08-14_10-48-55.png](https://img.danevan.top/image/pic/Snipaste_2026-08-14_10-48-55.png)

>[!NOTE]
>由于Hugo策略，即使在代码块中的ShortCode也会被识别正常渲染，所以我就换截图了。

`title` 可省略，省略时自动使用类型名。

### 7. GitHub Markdown Alerts

主题原生支持 GitHub 风格的 alert 语法，可直接在正文中使用：

```markdown
> [!NOTE]
> 有用的信息

> [!TIP]
> 更好的做法

> [!IMPORTANT]
> 关键信息

> [!WARNING]
> 需要立即关注

> [!CAUTION]
> 潜在风险
```

支持类型：`NOTE`、`TIP`、`IMPORTANT`、`WARNING`、`CAUTION`，标题会自动翻译为中文（备注/提示/重要/警告/注意）。

### 8. 嵌入 iframe（外链页面 / 视频 / 音乐）

使用 `iframe` shortcode 嵌入外部页面。通过 `type` 参数选择预设样式：

| type         | 适用场景            | 说明                |
| ------------ | --------------- | ----------------- |
| `widget`（默认） | 通用小部件           | 高度由内容自适应，透明背景     |
| `music`      | 网易云音乐播放器        | 高度由内容自适应，透明背景、无边框 |
| `video`      | B站 / YouTube 视频 | 固定高度 450，黑色背景     |

![Snipaste_2026-08-14_10-48-44.png](https://img.danevan.top/image/pic/Snipaste_2026-08-14_10-48-44.png)

>[!NOTE]
>由于Hugo策略，即使在代码块中的ShortCode也会被识别正常渲染，所以我就换截图了。

可选参数：

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `src` | 必填 | iframe 的 URL |
| `type` | `widget` | `widget` / `music` / `video` |
| `height` | 由 type 决定 | 手动指定高度（px），会覆盖默认值 |
| `width` | `100%` | iframe 宽度 |
| `title` | Embedded content | 无障碍标题 |
| `allow` | fullscreen; autoplay; ... | iframe 权限 |
| `class` | 空 | 附加到容器的额外 class |
| `sandbox` | 无 | 沙箱限制标志 |

默认已启用 `loading="lazy"`（懒加载）与 `allowfullscreen`（全屏）。
> 如需新增 iframe 类型，在 `layouts/_shortcodes/iframe.html` 的 `$presets` 表中添加一行即可。

---

## 四、本地预览

```bash
hugo server --buildDrafts
```

浏览器访问 http://localhost:1313

- `--buildDrafts` 显示草稿文章
- 预览效果与最终部署一致

---

## 五、构建检查

发布前执行，确认无错误：

```bash
hugo --minify
```

构建产物输出到 `public/` 目录。

---

## 六、发布流程

### 1. 修改草稿状态

把 `draft: true` 改为 `draft: false`

### 2. 添加摘要分隔符（可选）

手动指定列表页摘要截断位置：

```markdown
摘要内容...

<! --more-->
 (↑这里的空格要删掉，和HTML注释格式一样)

正文其余部分...
```

### 3. 提交推送

```bash
git add -A
git commit -m "new post: 文章标题"
git push
```

推送后 Cloudflare Pages 自动构建部署。

---

## 七、注意事项

### 文件命名

- 使用英文或拼音：`hugo-install-guide.md`
- 尽量避免中文标题：`中文标题.md`
- 避免空格和特殊字符

### 图片路径

- 放到 `static/` 目录
- 引用时用相对路径，如 `images/foo.jpg`

### 代码高亮

主题使用 Hugo 内置 Chroma 高亮，无需额外配置

### 分类和标签

- 标签和分类均已启用
- 访问 `/tags/` 或 `/categories/` 查看全部

### 回到顶部按钮

- 仅 `content/posts/` 下的文章会显示
- 滚动超过 200px 后出现

### 字体切换

- 顶栏有字体切换按钮，可在系统字体与 MiSans 之间切换
- 选择会保存在本地（localStorage），跨页面保持

### 访问统计

- 页脚显示「总访问量」和「访客数」，由 Vercount 提供

---

## 八、常用命令速查

| 操作 | 命令 |
|------|------|
| 新建文章 | `hugo new posts/标题.md` |
| 本地预览 | `hugo server --buildDrafts` |
| 构建检查 | `hugo --minify` |
| 提交 | `git add -A && git commit -m "new post: xxx"` |
| 推送 | `git push` |

---

## 九、文件位置

| 用途 | 路径 |
|------|------|
| 文章 | `content/posts/*.md` |
| 关于页 | `content/about.md` |
| 配置 | `hugo.toml` |
| 主题 | `themes/hermit-v2/` |
| 文章模板（posts） | `archetypes/posts.md` |
| 文章模板（其他） | `archetypes/default.md` |
| 自定义图标 | `layouts/_partials/svg.html` |
| iframe 短代码 | `layouts/_shortcodes/iframe.html` |
| 图片资源 | `static/images/` |
| i18n | `i18n/zh.toml` |

---

## 十、环境配置参考

如需在新设备上配置环境，请参考 [【文档】从零开始安装部署Hugo+Hermit-V2主题+我的预设](https://blog.danevan.top/posts/info-001-deploy/)，包含：
- Windows / Linux (Fedora/Debian/Ubuntu) / Termux 安装教程
- GitHub 仓库创建与推送
- Cloudflare Pages 部署步骤
- 常见问题解答

---

如有问题，先检查 hugo 构建输出的错误提示，通常会指出具体文件和行号。
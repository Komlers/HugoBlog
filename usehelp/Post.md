# 博客文章写作指南

> 适用于博客环境已部署好的情况。首次部署请参考 [Deploy.md](./Deploy.md)

**博客目录**：`D:\Blog`（Windows）/ `~/HugoBlog`（Linux/Termux）  
**Hugo 版本**：0.164.0 Extended  
**主题**：Hermit-V2

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

---

## 二、Front Matter（文章元信息）

创建后的文件结构：

```yaml
---
title: "文章标题"
date: 2026-08-08
draft: true
toc: false
images:
tags:
  - 标签1
categories:
  - 分类1
author: xxx
description: "文章描述"
---
```

### 字段说明

| 字段 | 说明 | 示例 |
|------|------|------|
| `title` | 文章标题 | `"Hugo 安装教程"` |
| `date` | 创建日期 | 自动生成，可手动修改 |
| `draft` | 草稿状态 | `true` 预览可见 / `false` 发布后可见 |
| `toc` | 显示目录 | `true` / `false` |
| `images` | 特色图片 | `images/cover.jpg`（图片放 `static/` 目录） |
| `tags` | 标签（多选） | `- Hugo` / `- 教程` |
| `categories` | 分类（多选） | `- 技术` / `- 生活` |
| `author` | 作者 | `"Dan_Evan"` |

### 注意事项

- **draft**: 本地预览用 `true`，发布前改为 `false`
- **tags/categories**: 使用 `-` 列表语法，多个标签多行写
- **中文标题**: 引号可省略，但含特殊字符时需加引号

由于这个 Front Matter 支持的东西特别特别多，而上网搜可能找不全，所以我就找 `Deepseek-V4-Flash` 总结了一份，供参考：

```yaml
---
# ==============================================
# 1. 基础信息 (Basic Information)
# ==============================================

# 【必填】文章标题，会显示在页面和浏览器标签栏上
title: "我的第一篇文章"

# 【强烈推荐】文章描述，用于SEO，显示在搜索引擎结果中
description: "这是我的博客第一篇文章的简短描述，用于SEO优化。"

# 【重要】文章发布日期，影响排序和RSS订阅
# 格式：YYYY-MM-DDTHH:MM:SS+时区
date: 2024-02-02T14:14:54+08:00

# 【重要】最后修改日期，通常由Git自动管理，也可手动设置
# 如果未设置，Hugo会尝试从Git读取
lastmod: 2024-02-05T10:30:00+08:00

# 【重要】是否为草稿。true时，生产环境构建不会包含该文章
draft: false

# 【可选】文章权重，用于自定义排序。权重值越小，排序越靠前
weight: 10

# ==============================================
# 2. URL与重定向管理 (URL & Redirect Management)
# ==============================================

# 【可选】自定义URL的最后一段。例如设置为 'my-first-post'
# 最终URL为：https://example.org/posts/my-first-post/[reference:0]
slug: "my-first-post"

# 【可选】覆盖整个页面路径。优先级高于 slug[reference:1]
# 注意：如果同时设置 slug 和 url，url 会优先生效[reference:2]
url: "posts/my-first-article"

# 【可选】设置一个或多个别名，用于从旧链接重定向到当前页面[reference:3]
# 常用于文章迁移后保持旧链接可访问
aliases:
  - "/old-posts/2014/01/01/my-old-url/"
  - "/another-old-path/"

# ==============================================
# 3. 分类与标签 (Taxonomies)
# ==============================================

# 【可选】文章的分类，用于组织内容
categories:
  - "技术笔记"
  - "Hugo教程"

# 【可选】文章的标签，用于更细粒度的内容标记
tags:
  - "Hugo"
  - "Front Matter"
  - "静态网站"

# 【可选】文章所属系列，可用于生成系列文章列表
series:
  - "Hugo从入门到精通"

# ==============================================
# 4. 内容与显示控制 (Content & Display Control)
# ==============================================

# 【可选】文章摘要，会显示在列表页。如果不设置，Hugo会自动截取[reference:4]
summary: "这篇文章将带你全面了解Hugo的Front Matter..."

# 【可选】指定图片，用于社交媒体分享卡片
# 可以是数组，取第一个作为分享图
images:
  - "/images/post-cover.jpg"

# 【可选】指定文章使用的布局模板，覆盖主题默认布局[reference:5]
layout: "custom-post-layout"

# 【可选】文章的类型，影响Hugo如何选择模板。与 `layout` 不同，`type` 会影响整个页面类型[reference:6]
type: "blog"

# 【可选】用于侧边栏或导航中显示的简短标题[reference:7]
linkTitle: "首页"

# 【可选】是否为CJK（中日韩）语言，设为true可让Hugo更准确地统计字数和生成摘要
isCJKLanguage: true

# ==============================================
# 5. 高级功能 (Advanced Features)
# ==============================================

# 【可选】构建选项，精细控制页面构建行为[reference:8]
build:
  # 是否渲染该页面（设为never可创建头页面，不生成独立URL）
  render: "always"  # 可选值: always, never, link
  # 是否在列表页（如首页、分类页）中列出
  list: "always"    # 可选值: always, never, link
  # 是否发布（设为false等同于draft: true，但更精细）
  publishResources: true

# 【可选】级联配置，将配置传递给所有子页面[reference:9]
# 例如在 section 的 _index.md 中设置，该 section 下所有页面都会继承
cascade:
  # 这些配置会传递给子页面，除非子页面自己覆盖
  banner: "/images/section-banner.jpg"
  show_author: true
  # 甚至可以覆盖更深层的配置
  params:
    author: "默认作者"

# 【可选】文章过期时间。过期后将不再渲染，除非使用 --buildExpired 标志[reference:10]
expiryDate: 2025-12-31T23:59:59+08:00

# 【可选】发布时间。在此时间之前不会渲染[reference:11]
publishDate: 2024-02-01T00:00:00+08:00

# 【可选】头页面模式。设为 true 后，页面不会生成独立URL，但仍可被其他页面引用[reference:12]
headless: false

# ==============================================
# 6. 自定义参数 (Custom Parameters)
# ==============================================

# 所有自定义字段都应放在 params 下[reference:13]
params:
  # 作者信息
  author: "张三"
  # 作者个人网站或社交链接
  authorLink: "https://github.com/yourusername"
  # 是否显示作者信息
  showAuthor: true
  # 是否显示目录
  showToc: true
  # 是否显示评论
  showComments: true
  # 自定义CSS类
  cssClass: "article-special"
  # 自定义JavaScript文件
  scripts:
    - "/js/custom.js"
  # 甚至可以嵌套更复杂的结构
  address:
    city: "北京"
    street: "长安街"
    building: "1号"
  # 文章相关资源
  resources:
    - name: "封面图"
      src: "/images/cover.jpg"
      title: "文章封面图"
    - name: "PDF下载"
      src: "/files/paper.pdf"
      title: "下载PDF版本"
---
```

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

````markdown
:::note
笔记内容
:::

:::tip
技巧提示
:::

:::warning
警告信息
:::

:::danger
危险提示
:::
````

### 7. 相册（Gallery）

````markdown
{{< gallery >}}
{{< figure src="images/1.jpg" caption="图片1" >}}
{{< figure src="images/2.jpg" caption="图片2" >}}
{{< /gallery >}}
````

### 8. 加密文章

```yaml
password: your_password
```

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

将 `draft: true` 改为 `draft: false`

### 2. 添加摘要分隔符（可选）

手动指定列表页摘要截断位置：

```markdown
摘要内容...

<!--more-->

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

- 放 `static/` 目录
- 引用时用相对路径，如 `images/foo.jpg`

### 代码高亮

主题使用 Hugo 内置 Chroma 高亮，无需额外配置

### 分类和标签

- 标签和分类均已启用
- 访问 `/tags/` 和 `/categories/` 查看全部

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
| 自定义图标 | `layouts/_partials/svg.html` |
| 图片资源 | `static/images/` |
| i18n | `i18n/zh.toml` |

---

## 十、环境配置参考

如需在新设备上配置环境，请参考 [Deploy.md](./Deploy.md)，包含：
- Windows / Linux (Fedora/Debian/Ubuntu) / Termux 安装教程
- GitHub 仓库创建与推送
- Cloudflare Pages 部署步骤
- 常见问题解答

---

如有问题，先检查 hugo 构建输出的错误提示，通常会指出具体文件和行号。

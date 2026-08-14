---
title: 【文档】从零开始安装部署Hugo+Hermit-V2主题+我的预设
date: 2026-08-14T10:00:00+08:00
lastmod: 2026-08-14T10:00:00+08:00
draft: false
toc: true
images:
description: 根据我当前的个人博客搭建情况，讲述如何从零开始基于Hugo和Hermit-V2主题，以及我个人优化改动的地方，去搭建部署个人博客。
author: Dan_Evan
categories:
  - 介绍和记录
tags:
  - Hugo
  - Hermit-V2
  - 预设
  - 搭建
  - 部署
  - 博客
---
# 博客从零部署指南

> 从零开始在 Windows、Linux（Fedora/Debian/Ubuntu）、Android（Termux）三大平台搭建并部署 Hugo 博客。
> 本指南的配置文件为「最小可用」模板；本博客实际启用了搜索、评论、GitHub Alert、iframe 等扩展功能，完整配置请直接参考仓库根目录的 `hugo.toml` 与本仓库 `layouts/`、`assets/` 下的自定义文件。

>[!NOTE]
>本教程是基于我当前的博客搭建情况，来详细说明如何去从零搭建博客，可供参考但不可完全照搬！

---

## 一、博客概览

| 项目        | 内容                                    |
| --------- | ------------------------------------- |
| 博客地址      | `https://blog.danevan.top`            |
| GitHub 仓库 | `https://github.com/Komlers/HugoBlog` |
| 主题        | Hermit-V2                             |
| 部署平台      | Cloudflare Pages                      |
| Hugo 版本   | **0.164.0 Extended**                  |

> **关键要求**：必须使用 Hugo **Extended** 版本（含 `+extended` 标记），否则无法编译 SCSS。

---

## 二、环境准备

### 2.1 安装 Hugo Extended

#### Windows 10/11

```powershell
# 方式一：winget（推荐）
winget install --id Hugo.Hugo.Extended -e --accept-source-agreements --accept-package-agreements --silent

# 方式二：手动下载
# 访问 https://github.com/gohugoio/hugo/releases
# 下载 hugo_extended_0.164.0_windows-amd64.zip
# 解压后将 hugo.exe 放到合适位置（如 C:\Program Files\hugo）
# 并将目录添加到系统 PATH
```

#### Fedora

```bash
# 方式一：dnf（可能不是 extended 版）
sudo dnf install hugo

# 方式二：从 GitHub 下载（推荐）
wget https://github.com/gohugoio/hugo/releases/download/v0.164.0/hugo_extended_0.164.0_linux-amd64.tar.gz
tar -xzf hugo_extended_0.164.0_linux-amd64.tar.gz
sudo mv hugo /usr/local/bin/
rm hugo_extended_0.164.0_linux-amd64.tar.gz LICENSE README.md
```

#### Debian / Ubuntu

```bash
# 方式一：apt（可能不是 extended 版）
sudo apt update && sudo apt install hugo

# 方式二：从 GitHub 下载（推荐）
wget https://github.com/gohugoio/hugo/releases/download/v0.164.0/hugo_extended_0.164.0_linux-amd64.tar.gz
tar -xzf hugo_extended_0.164.0_linux-amd64.tar.gz
sudo mv hugo /usr/local/bin/
rm hugo_extended_0.164.0_linux-amd64.tar.gz LICENSE README.md
```

#### Termux (安卓)

```bash
# 更新仓库
pkg update

# 安装 git（如果没有）
pkg install git

# 下载 extended 版（ARM64）
wget https://github.com/gohugoio/hugo/releases/download/v0.164.0/hugo_extended_0.164.0_linux-arm64.tar.gz
tar -xzf hugo_extended_0.164.0_linux-arm64.tar.gz
mv hugo $PREFIX/bin/
rm hugo_extended_0.164.0_linux-arm64.tar.gz LICENSE README.md
```

### 2.2 验证安装

```bash
hugo version
# 必须显示 +extended，例如：hugo v0.164.0+extended windows/amd64
```

### 2.3 安装 Git（如需要）

| 平台 | 命令 |
|------|------|
| Windows | `winget install --id Git.Git -e --accept-source-agreements` |
| Fedora | `sudo dnf install git` |
| Debian/Ubuntu | `sudo apt install git` |
| Termux | `pkg install git` |

---

## 三、创建博客项目

### 3.1 初始化 Hugo 站点

```bash
# 进入工作目录
cd D:\Projects\WebsiteRepo\HugoBlog   # Windows
cd ~/HugoBlog                          # Linux/Termux

# 初始化站点
hugo new site . --format toml --force
```

### 3.2 添加 Hermit-V2 主题

```bash
# 初始化 git 仓库
git init

# 添加主题为 submodule（推荐）
git submodule add https://github.com/1bl4z3r/hermit-V2 themes/hermit-v2
```

### 3.3 创建配置文件 hugo.toml

```toml
baseURL = "https://你的域名/"
theme = "hermit-v2"
defaultContentLanguage = "zh"
hasCJKLanguage = true
enableRobotsTXT = true
enableEmoji = true
timezone = "Asia/Shanghai"

title = "博客标题"
copyright = "你的名字"

pygmentsCodefences = true
pygmentsUseClasses = true

# 若需要站内搜索，home 需输出 JSON 作为搜索索引
[outputs]
  home = ["HTML", "RSS", "JSON"]

[frontmatter]
  date = ["date", "publishDate", "lastmod"]

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
    [markup.goldmark.extensions]
      strikethrough = false
      [markup.goldmark.extensions.extras]
        [markup.goldmark.extensions.extras.insert]
          enable = true
        [markup.goldmark.extensions.extras.delete]
          enable = true
        [markup.goldmark.extensions.extras.mark]
          enable = true
        [markup.goldmark.extensions.extras.subscript]
          enable = true
        [markup.goldmark.extensions.extras.superscript]
          enable = true

[params.author]
  name = "你的名字"
  about = "about.md"

[taxonomies]
  tag = "tags"
  category = "categories"

[params]
  description = "博客描述"
  themeColor = "#494f5c"
  accentColor = "#018472"
  homeSubtitle = "首页副标题"
  footerCopyright = "版权显示"
  code_copy_button = true
  homeSubtitlePrinter = true
  scrollToTop = true
  global_mathjax = true
  shareSocial = true

  # 评论系统（可选，配置后启用 utterances）
  [params.utterances]
    repo = "你的用户名/仓库名"
    issueTerm = "pathname"
    theme = "github-light"

  [params.pages]
    LastmodOpen = '['
    LastmodClose = ']'
    readTimeSeparator = "… ⏱ 阅读时长:"
    lastUpdatedOn = "最后更新于: "
    relatedPosts = true

  [params.dateform]
    CopyrightDate = "2006"
    LongDate = "2006年1月2日"
    ShortDate = "1月2日"

  [[params.socialLinks]]
    name = "github"
    url = "https://github.com/你的用户名"

[menu]
  [[menu.main]]
    name = "文章"
    url = "posts/"
    weight = 10

  [[menu.main]]
    name = "关于"
    url = "about/"
    weight = 20

  [[menu.main]]
    name = "搜索"
    url = "search/"
    weight = 25
```

> 说明：本博客额外启用了 MiSans 字体切换、Vercount 访问统计、GitHub Alert、iframe 短代码等，均通过 `layouts/`、`assets/` 下的自定义文件实现，不属于 `hugo.toml` 配置，部署时以仓库实际文件为准。

### 3.4 添加中文 i18n

创建 `i18n/zh.toml`：

```toml
[notFound]
other = "糟糕，您要访问的页面不存在……"

[home]
other = "主页"

[archives]
other = "归档"

[seeAlso]
other = "相关推荐"

[wordCount]
other = "{{ .WordCount }} 字"

[tableOfContents]
other = "目录"

[newer]
other = "新"

[older]
other = "旧"

[menu]
other = "菜单"

[share]
other = "分享"

[featuredImage]
other = "特色图片"

[Summary]
other = "摘要"

# GitHub Markdown Alerts（可选，启用 GitHub Alert 渲染钩子时需要）
[ghAlertnote]
other = "备注"

[ghAlerttip]
other = "提示"

[ghAlertimportant]
other = "重要"

[ghAlertwarning]
other = "警告"

[ghAlertcaution]
other = "注意"
```

### 3.5 创建初始内容

```bash
# 创建示例文章
hugo new posts/hello-world.md

# 创建关于页
hugo new about.md
```

编辑内容后，将 `draft: true` 改为 `draft: false` 即可发布。

### 3.6 创建 .gitignore

```
public/
resources/_gen/
assets/jsconfig.json
.hugo_build.lock
```

### 3.7 首次提交

```bash
# 配置 Git 身份
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的邮箱"

# 提交所有文件
git add -A
git commit -m "Initial commit: Hugo blog with Hermit-V2"
git branch -M main
```

---

## 四、推送到 GitHub

### 4.1 创建仓库

1. 登录 GitHub
2. 点击 "New repository"
3. 输入仓库名（如 `my-blog`）
4. 选择 "Public"
5. 点击 "Create repository"（不要勾选任何初始化选项）

### 4.2 推送

```bash
# 添加远程仓库
git remote add origin https://github.com/你的用户名/仓库名.git

# 首次推送
git push -u origin main
```

---

## 五、部署到 Cloudflare Pages

### 5.1 登录 Cloudflare

访问 https://dash.cloudflare.com

### 5.2 创建 Pages 项目

1. 点击左侧「Pages」
2. 点击「Create a project」
3. 选择「Connect to Git」
4. 授权 GitHub，选择刚创建的仓库
5. 点击「Begin setup」

### 5.3 配置构建

| 设置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Framework preset | `Hugo` |
| Build command | `hugo --minify` |
| Build output directory | `public` |
| Root directory | `/` |

### 5.4 添加环境变量

在「Environment variables」中添加：

| 变量名            | 值               | **备注**         |
| -------------- | --------------- | -------------- |
| `HUGO_VERSION` | `0.164.0`       | 与实际安装版本一致      |
| `TZ`           | `Asia/Shanghai` | 可选，可以解决时间不对的问题 |

### 5.5 部署

点击「Save and Deploy」，等待构建完成。

### 5.6 绑定自定义域名（可选）

>[!CAUTION]
>如果你不绑定自己的域名，使用CF给分配的 `xxx.pages.dev` 域名的话，则 `hugo.toml` 中的这一行：`baseURL = "https://你的域名/"` 中的URL要填 `https://xxx.pages.dev/`！总之就是要与实际你用的域名一样！

1. 构建完成后，点击「Custom domains」
2. 输入你的域名（如 `blog.example.com`）
3. 按提示添加 DNS 记录

---

## 六、多设备同步

### 6.1 克隆仓库

```bash
# 必须加 --recurse-submodules
git clone --recurse-submodules https://github.com/你的用户名/仓库名.git
cd 仓库名
```

### 6.2 后续同步

```bash
# 拉取更新
git pull

# 更新主题 submodule
git submodule update --init --recursive
```

---

## 七、文件结构

```
Blog/
├── archetypes/          # 文章模板（posts.md / default.md）
├── assets/              # 资源文件（JS、SCSS、图标）
│   ├── identity/        # 站点图标
│   ├── js/              # 自定义脚本（搜索、灯箱、字体切换等）
│   └── scss/            # 自定义样式（features.scss 等）
├── content/             # 文章内容
│   ├── posts/
│   ├── about.md
│   └── search.md
├── layouts/             # 自定义布局
│   ├── _default/        # 默认模板（search.html、list.json.json）
│   ├── _markup/         # 渲染钩子（GitHub Alert、外链）
│   ├── _partials/       # 局部模板（header、footer、svg 等）
│   └── _shortcodes/     # 短代码（iframe）
├── static/              # 静态资源（图片等）
│   └── images/
├── themes/              # 主题（submodule）
│   └── hermit-v2/
├── i18n/                # 国际化
│   └── zh.toml
├── usehelp/             # 使用说明文档
│   ├── Post.md          # 写作指南
│   ├── Deploy.md        # 部署指南
│   └── History.md       # 功能变更记录
├── hugo.toml            # 主配置文件
├── .gitignore
└── .gitmodules
```

---

## 八、常见问题

### Q1: 构建报错 "tofu: exit status 255"

**原因**：使用了非 Extended 版本的 Hugo  
**解决**：安装 Hugo Extended 版本

### Q2: 主题样式错位

**原因**：自定义 SVG 图标缺少 `class="feather"`  
**解决**：添加 `class="feather"` 属性

### Q3: 子模块内容为空

**原因**：克隆时没加 `--recurse-submodules`  
**解决**：`git submodule update --init --recursive`

### Q4: Cloudflare Pages 构建失败

**原因**：`HUGO_VERSION` 未设置或版本过低  
**解决**：添加环境变量 `HUGO_VERSION=0.164.0`

### Q5: 图片不显示

**原因**：图片路径错误  
**解决**：图片放 `static/` 目录，引用用相对路径，如 `images/foo.jpg`

---

## 九、写文章流程

日常写文章请参考 [【文档】开始写一篇新的文章（撰写文章指南）](https://blog.danevan.top/posts/info-002-post/)：

1. `hugo new posts/标题.md`
2. 编辑内容和 front matter
3. `hugo server --buildDrafts` 本地预览
4. `hugo --minify` 构建检查
5. `git add -A && git commit -m "new post: xxx"`
6. `git push`

---

如有其他问题，欢迎在此文章下评论。
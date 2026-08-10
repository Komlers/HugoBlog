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

---
title: Linux入门 - 第0章第1篇 - 选择一个合适的发行版
date: 2026-09-25T18:00:00+08:00
lastmod: 2026-09-25T18:00:00+08:00
draft: false
toc: true
images:
description: 在本章，我会介绍发行版御三家：Debian系、RedHat系、Arch系，以及其他小众发行版。作为本系列的开篇之作，选择一个自己喜欢的系统环境是一个必要前提，希望能帮助到读者挑选自己心仪的发行版。
author: ""
categories:
  - Linux入门
tags:
  - Linux
  - 发行版
  - Debian
  - RedHat
  - Ubuntu
  - Fedora
  - CentOS
---
## 引言

作为新系列的开篇之作，其实本来想先讲一讲Linux是什么，以便代入一下话题。但是发现这一方面的内容，讲深了，就篇幅很长，并且普通人也很难理解；讲浅了，也就没有什么好说的了。

所以作为一个初学者，你只需要知道：

在广义上，Linux是包括内核以及所有的发行版，统筹概括为Linux操作系统。

在狭义上，Linux就单指Linux内核。而像Debian、Ubuntu等等的发行版，其实都是使用Linux内核的，开箱可用的操作系统。

由于Linux内核的开源免费性，目前基于Linux内核的发行版，保守估计就有**上百个**。

但其实这一大堆发行版，无外乎可以概括为四大类：**Debian系**、**RedHat系**、**Arch系**、**其他小众发行版**。而分组依据就是他们所使用的软件包管理器。例如Debian系发行版的软件包管理器都是 **APT** (`.deb`)，RedHat系的是 **RPM** (`.rpm`)，Arch系的是 **Pacman** (`.pkg.tar.zst`)：

>[!NOTE] 关于Arch系的补充说明
>Arch系的软件包管理器区分比较复杂，比如在正统 **Arch Linux** 上是 `pacman`，但衍生版例如 **CachyOS** 就是 `octopi` / `pamac`。

>[!TIP] 关于软件包管理器
>对于 **Debian系** 和 **RadHat系**，软件包管理器其实可以分为**底层**和**高层**，底层往往只管某个软件主体的安装，而高层可以在底层的基础上增加对依赖等的处理。
>
>Debian系：**DPKG** (Debian Package，底层) -> **APT** (Advanced Package Tool，高层)
>
>RadHat系：**RPM** (RedHat Package Manager，底层) -> **YUM** (Yellow-dog Updater, Modified，已弃用) -> **DNF** (Dandified YUM，现在的高层)

其他还有一堆小众发行版：

| 发行版          | 软件包管理器                             | 备注      |
| ------------ | ---------------------------------- | ------- |
| Alpine Linux | **APK** (Alpine Package Keeper)    |         |
| Gentoo       | `emerge` (Portage)                 | 源码编译以安装 |
| Void Linux   | **XBPS** (X Binary Package System) |         |
| NixOS        | `nix`                              | 声明式配置安装 |

## Debian系

Debian系是目前Linux发行版用户最多的一个家族，同时也是衍生版最多的家族。例如我们耳熟能详的 **Ubuntu**，就是基于Debian衍生而来的。

>[!NOTE] Ubuntu的衍生版
>Ubuntu基于Debian，同时还有更多的发行版基于Ubuntu。比如Ubuntu的其他桌面环境变种：**Kubuntu** (KDE Plasma)、**Xubuntu** (XFCE)、**Lubuntu** (LXQT)、**Ubuntu MATE** (MATE)，等等等等。
>
>由于社区对Ubuntu的 `snap` 软件包及其管理器的排斥，所以剔除掉 `snap`，就诞生了Ubuntu又一个衍生版：**Linux Mint** (Cinnamon)

此外，像很多国产信创Linux系统也是基于Debian系开发的，例如：**Deepin**、**UOS** (Deepin下游) 等等。

Debian系的优点就是用户基数大、生态丰富、稳定可靠。这也是很多人会首选Debian系的发行版的主要原因。

但Debian系也不是完全没有缺点，主要还是归结于Debian自己。

如果我们单看Debian自己的话，会发现它的软件包貌似太旧了。**Debian Stable** 的软件包在一个大版本的生命周期内很难有几次更新，甚至内核也是，毕竟为了稳，肯定是要做得保守一些的，所以Debian非常适合当作服务器操作系统。

而Debian在个人使用场景的话，会显得不是那么友好，比如说默认不启用 **non-free** 源，就会出现有些Linux内核免驱的设备，会因为系统不自带闭源固件而导致无法正常使用。

而Debian的下游版本，像Ubuntu等就做得比较好，对于个人用户使用体验做了很多的优化，比如安装界面就可以针对一些闭源驱动和媒体编解码器进行预安装（例如NVIDIA显卡驱动），并且软件源也比Debian的要新一些。这也是很多人建议新手小白去用 **Ubuntu** 或 **Linux Mint** 的原因。

如果你的机器不是很新，而且不喜欢频繁更新软件，只想稳定地使用电脑，那么Debian系的发行版一定很适合你。比如 **Linux Mint** 对于新手小白的使用体验就是妥妥的第一梯队；如果你不是很排斥snap的话，尝试 **Ubuntu** 也不错，生态很丰富，教程也很多。

| 发行版        | 基于     | 推荐度  | 原因                           |
| ---------- | ------ | ---- | ---------------------------- |
| Debian     | ——     | 7/10 | 很稳，但是可能有些过于保守，新手可以尝试         |
| Ubuntu     | Debian | 8/10 | 很大众的发行版，很适合新手，体验很友好          |
| Linux Mint | Ubuntu | 9/10 | 剔除了snap，使用体验接近Windows，适合新手过渡 |
| Pop_OS     | Ubuntu | 7/10 | 主要针对闭源驱动做了预装等，比较省心           |
| Deepin     | Debian | 8/10 | 国产老牌Linux，对国内环境有适配，但性能开销稍大   |
| UOS        | Deepin | 8/10 | 国产信创Linux代表作，比较稳定，可以尝试       |
| Kali Linux | Debian | 5/10 | 主攻网络安全专业领域，新手不建议碰            |
| Zorin OS   | Ubuntu | 6/10 | 可以一键切换界面布局模仿Win/mac，稍小众      |

## RedHat系

RedHat系主要代表发行版就是 **RHEL** (Red Hat Enterprise Linux)，在服务器领域极其出名，与Debian一样都是及其适合服务器的发行版。但与Debian不同的是，RHEL是收费的，但核心代码仍然开源。所以在之前就有社区驱动的RHEL，你可能听说过：**CentOS** (Community Enterprise Operating System)，相当于RHEL核心的一个免费“克隆版”。

>[!TIP] 关于CentOS
>CentOS后续由 Red Hat Company (红帽公司) 转型，定位从"克隆"变为"预览"，即 **CentOS Stream**，作为RHEL的官方试验田。

而同为RedHat系，你可能还听说过一个同样优秀的Linux发行版：**Fedora**，Fedora作为RHEL的最终上游，一切RedHat系的新软件、新技术都会最先在Fedora上实装，稳定后才会装到RHEL上。社区人称Fedora为“RHEL的小白鼠”。

>[!NOTE] 关于Fedora
>Fedora是一个由红帽公司赞助、由社区驱动的Linux发行版项目，其特点就是**新**，可以让用户及时用上新软件、新内核等，同时也很适合搞开发。
>
>有趣的是，Linux内核之父 **Linus** 曾表示自己在Fedora上进行内核开发。原因可能有：Fedora上的软件包版本都非常新，而又不像一些滚动更新发行版那样容易出问题，很适合开发新内核和测试兼容性。

另外还有一个独立发展的RedHat系发行版：**openSUSE**，也被称为“大蜥蜴”。openSUSE也使用了RPM软件包管理器，同时它也服务于服务器领域。

另外，由于CentOS转型，RHEL的免费平替方案出现了空缺，所以就有了 **Rocky Linux** 和 **Alma Linux** 来填补这个空缺。

总的来说，RedHat系的Linux发行版也有Debian系相似的优点，生态也很丰富（主要是沾了CentOS的光），作为个人电脑上的操作系统来说，可能不如Debian系的Ubuntu等方便，所以很适合开发者和有一定Linux基础的极客玩家使用。

>[!NOTE] 注意一点
>对于个人用户来说，更推荐使用Fedora，因为其他的RedHat系发行版大多是主攻服务器领域的，不是很适合个人电脑。

| 发行版         | 上游     | 推荐度  | 原因                       |
| ----------- | ------ | ---- | ------------------------ |
| Fedora      | ——     | 8/10 | 新，非常新，但也很稳定，非常适合开发       |
| CentOS      | Fedora | 6/10 | 现在的Stream没有以前稳定了，且换为滚动更新 |
| RHEL        | CentOS | 7/10 | 稳，非常稳，但是需要付费，不如免费平替      |
| Rocky Linux | RHEL   | 9/10 | 现在的RHEL克隆版本，相当于老CentOS平替 |
| Alma Linux  | RHEL   | 8/10 | 同上，社区活跃，更新速度略快于Rocky     |
| openSUSE    | ——     | 8/10 | 稳定版复刻于SUSE企业版，风滚草版有滚动更新  |
| Nobara      | Fedora | 7/10 | Fedora的游戏优化版本，但比较小众      |

## Arch系

Arch系发行版一直以来都饱受争议，有的用户非常喜欢，也有很多用户比较反感。而争议点主要就体现在 **滚动更新** (Rolling Update) 这一模式。

通俗来说，滚动更新使得你的系统没有版本这一概念。从你安装那一时刻起，你的系统就不断地通过软件包更新在迭代。

这种滚动更新带来的好处就是，你可以在第一时间内就可以享受到软件包最新的功能和技术。比如今天KDE桌面新增了一个小功能，你立马就可以更新体验到这个功能，甚至比Fedora还要快。但随之而来的弊端就是软件包更新带来的不稳定性，如果你很长时间没有打开电脑，再次打开电脑进行更新的时候很可能会因为更新而“滚挂”。

Arch系比较有特色的有三个发行版：**Arch Linux**、**CachyOS**、**Manjaro**。还有一个就是 **SteamOS**，同样基于Arch Linux。这就由于Arch Linux性能调度优势，使得Arch系在游戏方面天生比较有优势。甚者还有 **CachyOS** 针对现代CPU的**额外分级性能优化**。

但是在日用方面的话，Arch系只适合于有一定Linux基础的极客玩家，如果你是一个Linux初学者，我建议还是先积累一点经验吧。

| 发行版        | 特色   | 推荐度  | 原因                   |
| ---------- | ---- | ---- | -------------------- |
| Arch Linux | 滚动更新 | 8/10 | 原汁原味的Arch Linux体验    |
| CachyOS    | 性能优化 | 9/10 | 最推荐的Arch系发行版，适合现代新电脑 |
| Manjaro    | 仓库延迟 | 8/10 | 通过仓库延迟更新，使得新软件测试后再下放 |
| SteamOS    | 游戏专用 | 8/10 | 专为游戏优化，不建议日常主力机使用    |

## 其他发行版

这里我挑两个代表来说一下。

其实这些小众发行版，新手是不建议去碰的，毕竟它们实在太小众了，教程也少，生态也不丰富，投入的时间成本的使用体验也肯定不如一些大众发行版来得划算。

### Alpine Linux

如果你接触过Docker容器，那么一定对它不陌生，它是Docker测试容器的时候的默认镜像，具有体积小、启动快、不臃肿等优点。

为了精简，他没有使用systemd作为系统第一进程掌管系统。并且软件源比较少，不适合日用。

>[!NOTE] 你知道吗
>PostMarketOS（在老安卓手机上装Linux的项目）就是基于Alpine Linux

### Gentoo

Gentoo绝对是Linux发行版中的一个异类，它的软件包管理器完全就是下载源码后本地编译后再安装，甚至是安装系统。这就使得使用它的时间成本和学习成本比较高，并且也非常的折腾。

它的优点就是在安装软件时，可以根据本地环境来进行一些优化，但这也是对于高级用户来说的了。

## 结语

总的来说，对于新手的话，我建议还是先去使用Debian系发行版来接触一下Linux；后续可以尝试一下RedHat系的Fedora以及Rocky Linux等，学习一下关于服务器运维方面的东西；后续可以研究一下Arch系，深入研究一下Linux；最后再去碰一下小众发行版。小众发行版碰或不碰，其实也无可厚非了。

其实换发行版不是目的，你用过的发行版越多，投入的时间成本也就越多。我认为重点应该放在选择一个最适合自己的Linux发行版，能让自己专心投入于日常使用和工作中才是目的。
---
title: Hermes 浏览器自动化
description: 用 Hermes + Playwright 做浏览器自动化 — 抓数据、填表单、自动登录、生成报告的完整教程。
---

# Hermes 浏览器自动化

Hermes 内置 Playwright,可以驱动真实浏览器(Chromium / Firefox / WebKit)做任何"在浏览器里能做的事"。

## 启用浏览器技能

```bash
pip install hermes-agent[browser]
playwright install chromium
```

或者用一键脚本就装好了。验证:

```
你: 用浏览器打开 example.com,告诉我标题
```

Hermes 应该启动 chromium 抓到 `Example Domain`。

## 五个高频实战

### 1. 抓 GitHub Trending

```
你: 用浏览器去 github.com/trending,把今天前 10 个 Python 项目抓下来,生成 markdown 表格存到 ./trending.md
```

Hermes 会:
- 启动 Chromium
- 导航 `https://github.com/trending?l=python&since=daily`
- 解析 DOM 提取 repo 名、星数、描述
- 写 markdown 文件

### 2. 自动登录 + 截图

```
你: 登录 v2ex.com(账号 xxx 密码 xxx),然后截图首页
```

::: warning 凭证安全
Hermes 会把账号密码当 prompt 发给 LLM。**重要账号**别这么做,改成:把凭证存 .env,让 Hermes 用 `process.env.V2EX_TOKEN` 读。
:::

### 3. 填表单

```
你: 去 baidu.com,搜"hermes 中文社区",把前 5 条结果链接告诉我
```

### 4. 监控网页变化

```
你: 每隔 30 分钟去 weibo.com 看 #某个话题# 的最新帖子,有新的就告诉我
```

(配合 [cron 技能](/zh/cli/) 实现)

### 5. PDF 生成

```
你: 去某文章 URL,把整页保存成 PDF
```

Hermes 调 Playwright 的 `page.pdf()`。

## 调试

### 看不到浏览器界面

默认 headless(隐藏窗口)。改 `.env`:

```bash
HERMES_BROWSER_HEADLESS=0
```

Hermes 会真的弹出 Chromium 窗口,你能眼看着它点击。

### 元素找不到

让 Hermes:

```
你: 打开 xxx.com,把页面源码 HTML 给我前 200 行,我帮你看 selector
```

或者:

```
你: 用 page.locator('.xxx').screenshot() 把这个区域截下来
```

### 反爬阻拦

```bash
HERMES_BROWSER_USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."
HERMES_BROWSER_VIEWPORT=1920x1080
HERMES_BROWSER_LOCALE=zh-CN
```

更狠的反检测:用 [playwright-stealth](https://github.com/AtuboDad/playwright_stealth)(社区技能)。

## 性能 Tips

### 复用 browser context

每次启动浏览器要 1-3 秒。让 Hermes 重用同一个:

```bash
HERMES_BROWSER_PERSIST=1
HERMES_BROWSER_DATA_DIR=~/.u-hermes/data/browser
```

效果:登录态、cookie、缓存都保留下来。

### 只下载文本

不需要图片?

```bash
HERMES_BROWSER_BLOCK_RESOURCES=image,font,media
```

省 70% 流量。

## 沙箱化

防止 Hermes 玩坏你正在登录的银行网站。沙箱模式:

```bash
HERMES_BROWSER_SANDBOX=1
HERMES_BROWSER_ALLOW_DOMAINS=github.com,stackoverflow.com,baidu.com
```

只允许在白名单域跑。

## 完整 .env 模板(浏览器场景)

```bash
DEEPSEEK_API_KEY=sk-xxx
HERMES_BROWSER_HEADLESS=0
HERMES_BROWSER_PERSIST=1
HERMES_BROWSER_DATA_DIR=~/.u-hermes/data/browser
HERMES_BROWSER_BLOCK_RESOURCES=image,font,media

# 必加
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

## 常见问题

**Q: 报 BROWSER_NOT_INSTALLED**
跑一下 `playwright install chromium`。

**Q: 跑了几次后浏览器没关**
chromium 进程残留。`pkill -f chromium` 清掉。

**Q: SSL 证书错误**
`HERMES_BROWSER_IGNORE_HTTPS_ERRORS=1`(只调试时用)。

**Q: 想用 firefox / webkit**
`playwright install firefox` + `HERMES_BROWSER=firefox`。

## 下一步

- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — 编程实战
- [写自定义技能](/zh/tutorials/build-skill) — 把抓数据流程做成可复用技能

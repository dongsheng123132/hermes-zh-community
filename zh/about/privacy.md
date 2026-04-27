# 隐私政策

最后更新:2026-04-26

## 这个站点收集什么

**几乎什么都不收集。**

`zh.u-hermes.org` 是一个静态文档站,部署在 Vercel 上。访问时:

| 数据 | 谁收集 | 用途 |
|---|---|---|
| 你的 IP / User-Agent / Referer | Vercel 边缘日志 | 反 DDoS、错误诊断 |
| 浏览器本地存储 | 仅本站 | 记住你的主题偏好(浅 / 深色) |

我们 **不使用** Google Analytics、Plausible、Umami、百度统计等第三方追踪。
我们 **不放置** 第三方广告。
我们 **不卖** 用户数据(因为根本没有)。

## 你直接和第三方交互的部分

下面这些操作,你的数据是直接发给第三方的,我们看不到:

| 操作 | 第三方 | 隐私链接 |
|---|---|---|
| 点击"打开 GitHub Discussions" | GitHub | [GitHub 隐私](https://docs.github.com/zh/site-policy/privacy-policies) |
| 浏览版本发布(从 api.github.com 拉) | GitHub | 同上 |
| 扫码加微信 | 腾讯 | [微信隐私](https://weixin.qq.com/cgi-bin/readtemplate?t=weixin_agreement&s=privacy) |
| 点击淘宝 / 拼多多 / 抖音购买 | 各电商平台 | 自查 |

## hermes-agent 本身的隐私

hermes-agent 在你**自己电脑**上运行。它会:

- 把你的 Prompt 发给你配置的 AI Provider(DeepSeek / OpenAI / Ollama 等)
- 把对话历史存在 `~/.u-hermes/data/sessions/`(本地)
- 调用 Shell / 浏览器 / 文件等工具(本地)

它**不会**把数据发回 NousResearch、本社区站、或任何第三方监控。
你的 API Key 只发给对应 AI Provider,不发给别处。

## Cookie

本站不主动设置任何 Cookie。VitePress 默认主题用 `localStorage` 记主题偏好,**不是 Cookie**,不会跨站跟踪。

## 联系

数据主体行使你在 GDPR / 网络安全法 / 个人信息保护法下的权利:

- Email: `hefangsheng@gmail.com`
- 我们会在 7 个工作日内回复

## 政策变更

本政策更新会在 [社区站 changelog](/zh/releases/changelog) 公告。继续使用本站点视为同意。

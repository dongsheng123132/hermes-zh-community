# 社区站 Changelog

记录 `zh.u-hermes.org` 这个站点本身的演进。**不是** hermes-agent 的版本日志(那个见 [上游 Releases](/zh/releases/))。

## v0.1.0 — 2026-04-26 · 首版上线

- 🎉 站点首版 MVP 上线
- 8 个栏目就位:首页 / 快速开始 / 安装 / 技能市场 / 社区论坛 / CLI 速查 / 版本发布 / 赞助
- 中文为主,英文 / 日文占位
- 技能市场 12 条种子(含 6 个上游 builtin、2 个认证、4 个社区)
- 论坛跳转 GitHub Discussions
- 版本发布拉 `NousResearch/hermes-agent` GitHub API
- 完整 [Linux Live USB 制盘教程](/zh/quickstart/linux-live-usb)
- VitePress 1.x + Vue 3 + 自定义橙色主题
- 部署 Vercel,域名待绑

## 路线图

### Phase 2 — 技能市场扩容 + 论坛热身

- [ ] 技能市场扩到 30+ 条
- [ ] 在 GitHub Discussions 上发 5-10 个种子帖,把板块分类先填满
- [ ] 英文首页翻译完成
- [ ] OG 分享图 1200×630
- [ ] sitemap.xml 自动生成 + JSON-LD 结构化数据

### Phase 3 — 视流量决定

- [ ] Giscus 评论嵌入(基于 GitHub Discussions)
- [ ] 真后端 API:Vercel Functions + Supabase 做技能市场后端 + 评论
- [ ] 自建论坛(Discourse / Flarum)
- [ ] 日文翻译
- [ ] 流量统计(Plausible / Umami)
- [ ] RSS feed
- [ ] 博客 `zh/blog/`(发布日志、教程、案例)

## 想推动某个 feature?

- 提 issue 到 [hermes-zh 仓库](https://github.com/dongsheng123132/hermes-zh)(规划中)
- 在 [GitHub Discussions](/discussions) 发 "想法" 帖
- 加微信群直接说

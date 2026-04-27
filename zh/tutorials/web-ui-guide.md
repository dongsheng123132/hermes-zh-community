---
title: Hermes Web UI 怎么用
description: Hermes Web UI 完整指南 — 多会话切换、Markdown 渲染、代码高亮、附件上传、技能开关、模型切换。
---

# Hermes Web UI 怎么用

启动后浏览器开 [http://127.0.0.1:8648](http://127.0.0.1:8648)(端口默认 8648)。

## 基本布局

```
┌──────────────────────────────────────────────────┐
│  Hermes                              ⚙ 设置 ⏱ 历史│
├──────────┬───────────────────────────────────────┤
│ 会话列表  │   消息区域                             │
│          │                                        │
│ + 新会话 │   助手:你好,有什么可以帮你?           │
│ • 写代码 │                                        │
│ • 抓数据 │   你:                                  │
│ • 改文件 │   _________________________________   │
│          │   [文件] [图片] [模型 ▾] [发送 →]       │
└──────────┴───────────────────────────────────────┘
```

## 多会话

- 左上角 **+ 新会话** 开一个新对话
- 旧会话保留在左侧列表,点击切换
- 数据存在 `~/.u-hermes/data/sessions/<session-id>.json`(可备份/迁移)

## Markdown / 代码高亮

回复自动渲染:
- 代码块带语法高亮(支持 100+ 语言)
- 表格、列表、链接、图片
- 数学公式(`$LaTeX$`)
- Mermaid 图(代码块标 `mermaid`)

## 附件上传

点击输入框旁的 📎 图标,可上传:
- 文本文件(.md / .txt / .json / .py / .ts ...)Hermes 会读
- 图片(.png / .jpg / .webp)Hermes 会用视觉模型分析
- PDF Hermes 会提取文字

::: tip 大文件上限
默认 10MB。改 `~/.u-hermes/data/.env` 里的 `HERMES_MAX_UPLOAD_MB=50`。
:::

## 切换模型

聊天输入框右侧的 **模型 ▾** 下拉:

- 显示所有 `.env` 里配置的模型
- 点击直接切换,**当前会话**生效
- 想全局换默认,改 `.env` 的 `HERMES_DEFAULT_MODEL`

## 启用 / 关闭技能

⚙ 设置 → **技能** → 开关每个技能:

- **shell** — 跑 shell 命令(默认开)
- **file** — 读写文件(默认开)
- **browser** — Playwright 浏览器(默认开)
- **python** — Python REPL
- **http** — HTTP 抓取

不想让 Hermes 写文件?关掉 file。怕跑错命令?关 shell。

## 沙箱模式

⚙ 设置 → **沙箱** 切到 ON:

- 所有 shell / file 操作只在 `~/.u-hermes/sandbox/` 内
- Hermes 看不见你的 `~/Documents` 等敏感目录
- 适合让 Hermes 帮你"先试试"再决定要不要全权限

## 历史搜索

⏱ 历史 → 搜索框输关键词:

- 全文匹配所有会话的 user / assistant 消息
- 点击结果跳到那条消息

## 暗色模式

⚙ 设置 → 主题 → 暗色 / 亮色 / 跟随系统。

## 常见问题

**Q: 一刷新 Web UI 会话就没了?**
A: 不会。会话存在 `data/sessions/`。如果丢了,看日志 `~/.u-hermes/data/logs/agent.log`。

**Q: Web UI 能让别人用吗?**
A: 默认绑 127.0.0.1。要给同事用:`hermes gateway run --host 0.0.0.0` + 加认证(看 [端口约定](/zh/cli/ports#暴露到局域网谨慎))。

**Q: Web UI 太丑能换吗?**
A: 上游开了主题接口,但默认就一套。想用别的 UI 看 [社区技能 → 自定义 UI](/zh/market/community)。

## 下一步

- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — 实战篇
- [Hermes 浏览器自动化](/zh/tutorials/browser-automation) — 用 Playwright 抓数据
- [写自定义技能](/zh/tutorials/build-skill) — 给 Hermes 加新工具

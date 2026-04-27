---
title: Hermes vs OpenClaw
description: Hermes 与 OpenClaw 的对比 — 同源姊妹项目,定位差异、何时用谁、混合方案。
---

# Hermes vs OpenClaw

Hermes 和 OpenClaw 是**姊妹项目**,都属于 NousResearch 开源 Agent 体系,但定位完全不同。

## 一句话区分

- **Hermes**:**编程 Agent**(写代码 / 跑 shell / 改文件 / 用浏览器)
- **OpenClaw**:**通用 AI 助手 + IM 机器人**(挂在飞书 / 钉钉 / 微信里聊天 + 简单工具)

## 形象类比

- Hermes 是你的 **DevOps / 程序员同事**
- OpenClaw 是你的 **行政助手 / 客服**(在群里 @ 它问问题)

## 详细对比

| 维度 | Hermes | OpenClaw |
|---|---|---|
| **核心场景** | 写代码 / 改项目 / 自动化任务 | IM 聊天 / 群机器人 / 通用问答 |
| **用法** | CLI + Web UI | 挂在 IM(钉钉 / 飞书 / 微信)里 |
| **shell 工具** | ✅ 强(rm / git / pip 都能跑) | ✅ 弱(仅安全子集) |
| **浏览器** | ✅ Playwright 完整 | ⚠ 受限(只读) |
| **文件读写** | ✅ 完全 | ⚠ 沙箱 |
| **IM 渠道** | ❌ 不主推 | ✅ 12+ IM 平台原生集成 |
| **持久记忆** | ✅ | ✅ |
| **自定义技能** | Python 插件 | TypeScript 插件 |
| **学习曲线** | 高(命令行 / 配 venv) | 低(IM 里直接 @) |
| **目标用户** | 程序员 / 运维 / DevOps | 公司员工 / 普通用户 / 行政场景 |
| **协议** | MIT | MIT |
| **中文社区** | zh.u-hermes.org(本站) | clawd.org.cn(姊妹站) |

## 何时选 Hermes?

✅ 你是程序员,想要 Cursor / Claude Code 的免费替代
✅ 你想 Hermes 直接改你的代码 / 跑你的脚本
✅ 你在终端 / IDE 里工作
✅ 你想用 DeepSeek 等国产模型省钱

## 何时选 OpenClaw?

✅ 你想在公司钉钉群挂个 AI 客服
✅ 你想让飞书 / 微信群里 @ AI 问问题
✅ 你不想让 AI 直接改你电脑文件(沙箱)
✅ 你团队有非技术员工

## 何时两个都装?

很常见:

| 用户 | 配置 |
|---|---|
| **个人开发者** | Hermes(本机)+ OpenClaw(挂自己微信群) |
| **小团队** | OpenClaw(团队 IM 里)+ Hermes(每个程序员本机) |
| **U-Hermes 马盘用户** | 商业 U 盘 **同时装** Hermes + OpenClaw,一盘双用 |

## 商业版 U 盘 = 双 Agent

[U-Hermes 马盘](/zh/install/windows-portable) 实际上同时打包了:

- **U-Claw**(基于 OpenClaw)— 通用 AI + IM 机器人
- **U-Hermes**(基于 hermes-agent)— 编程 Agent

¥199 一张盘,两个 Agent。这也是商业版的最大卖点之一。

## 数据 / 配置共享

两者都用 `~/.u-hermes/` 和 `~/.openclaw/`,**互不干扰**。但可以共享:

- 同一个 API Key 用两次(在两个 .env 各填一次)
- 同一组 Ollama 模型(都连 11434)
- 同一台机子的代理设置

## 命令对比

```bash
# Hermes
hermes gateway run            # 启动 gateway
hermes skill install <id>     # 装技能

# OpenClaw
openclaw-cn onboard           # 初始化(选 IM 渠道)
openclaw-cn channels          # 看接的 IM
openclaw-cn skills            # 看技能
```

## 模型适配

| 模型 | Hermes | OpenClaw |
|---|---|---|
| DeepSeek | ✅ | ✅ |
| 通义千问 | ✅ | ✅ |
| Kimi | ✅ | ✅ |
| OpenAI | ✅ | ✅ |
| Claude | ✅ | ✅ |
| Ollama | ✅ | ✅ |

完全一致 — 都通过 OpenAI 兼容协议接入。

## 端口约定

| 服务 | Hermes | OpenClaw |
|---|---|---|
| Gateway | 8642 | 18789 |
| Web UI | 8648 | 18789(/dashboard) |
| 配置端口 | - | 18788 |
| 浏览器控制 | (内嵌) | 18791 |

两个同时跑,**不冲突**。

## 选型流程图

```
你想干啥?
├── 写代码 / 改项目         → Hermes
├── 在 IM 群里挂机器人        → OpenClaw
├── 个人 AI 助手(随便用)     → Hermes(更全能)
└── 团队多人共用(行政为主)   → OpenClaw
```

## 下一步

- [Hermes 是什么?](/zh/tutorials/what-is-hermes) — 深入了解 Hermes
- [OpenClaw 中文社区](https://clawd.org.cn) — 姊妹站(完整 OpenClaw 文档)
- [Windows U 盘](/zh/install/windows-portable) — 一盘双装方案

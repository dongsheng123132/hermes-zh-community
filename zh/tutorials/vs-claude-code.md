---
title: Hermes vs Claude Code
description: Hermes 与 Anthropic Claude Code 的全维度对比 — 功能、价格、模型选择、本地化、用户场景。
---

# Hermes vs Claude Code

两者都是 AI 编程 Agent,核心思路相似。最大差异是 **开源 vs 闭源** 和 **模型自由度**。

## 一句话总结

- **Claude Code** = Anthropic 官方出品 + Claude 模型独占 + 闭源 + $20/月起
- **Hermes** = NousResearch 开源 + 任意模型自由配 + MIT + API 用量制 / 免费(Ollama)

## 详细对比

| 维度 | Claude Code | Hermes Agent |
|---|---|---|
| **开发方** | Anthropic 官方 | NousResearch(开源社区) |
| **协议** | 闭源专有 | MIT |
| **模型** | 仅 Claude 系列 | OpenAI / Claude / Gemini / DeepSeek / 通义 / Kimi / Ollama 全支持 |
| **价格** | $20/月起 + API 用量 | API 用量制(可用 Ollama 完全免费) |
| **接国产模型** | ❌ 不支持 | ✅ 一键 |
| **离线** | ❌ | ✅(Ollama) |
| **CLI** | `claude` | `hermes` |
| **Web UI** | 无 | ✅ 内置 |
| **代码补全** | 无(Cursor 是另一个产品) | 无 |
| **集成 IDE** | 终端为主 | 终端 + 浏览器 + 任意 IDE |
| **shell 工具** | ✅ | ✅ |
| **浏览器工具** | ❌(只有 file / shell) | ✅ Playwright 内置 |
| **持久记忆** | 单会话 | ✅ SQLite 跨会话 |
| **自定义技能** | 受限 | ✅ Python 插件系统 |
| **沙箱模式** | ✅ | ✅ |
| **国内访问** | ❌ 需代理 | ✅(国产模型) |
| **数据隐私** | 上 Anthropic | 完全本地 |
| **企业版** | ✅ | ❌(自己部署) |
| **商业 U 盘版** | ❌ | ✅ U-Hermes 马盘 |

## 谁该用 Claude Code?

✅ 你的雇主已经买了 Anthropic 企业版
✅ 你只用 Claude 模型,不想折腾别的
✅ 你在欧美市场,梯子稳定
✅ 你不在乎 $20/月
✅ 想要 Anthropic 官方支持

## 谁该用 Hermes?

✅ 在中国 / 想用 DeepSeek / 通义千问省钱
✅ 想完全离线 + 私有(Ollama)
✅ 想自己写技能扩展
✅ 公司不允许数据上美国云
✅ 喜欢开源 / 想 fork 改
✅ 想随身带 AI(U 盘版)

## 命令对比

### 启动

```bash
# Claude Code
claude

# Hermes
hermes gateway run
```

### 对话

```bash
# Claude Code(终端交互)
claude
> 帮我修这个 bug

# Hermes(可终端可 Web UI)
浏览器开 http://127.0.0.1:8648
```

### 配置

```bash
# Claude Code
~/.claude/settings.json
ANTHROPIC_API_KEY=...

# Hermes
~/.u-hermes/data/.env
DEEPSEEK_API_KEY=...
# (或任意其他模型)
```

## 性能差异

### 代码理解

| 任务 | Claude Code (Sonnet 3.5) | Hermes + DeepSeek-Reasoner | Hermes + Qwen2.5-Coder-32B |
|---|---|---|---|
| 简单 bug 修复 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 大型重构 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 算法题 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐(R1 强) | ⭐⭐⭐ |
| 中文沟通 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 长上下文(>100K) | ⭐⭐⭐⭐⭐(200K) | ⭐⭐⭐(64K) | ⭐⭐⭐⭐(128K) |

实测 Hermes + DeepSeek 在大多数中文 / 国内项目上接近 Claude Code,大幅省钱。

### 速度

| | Claude Code | Hermes + DeepSeek |
|---|---|---|
| 首字节延迟 | 0.5-2 秒(取决梯子) | 0.3-1 秒(国内直连) |
| 100 token 生成 | 2-3 秒 | 1-2 秒 |
| 国内访问 | 不稳定 | 稳定 |

## 切换成本

如果你已经用 Claude Code,迁移到 Hermes:

1. 装 Hermes(2 分钟):见 [快速开始](/zh/quickstart/)
2. `.claude/settings.json` 里的 API Key / 偏好不通用,需重配
3. 自定义 prompt / instructions 可以直接复制
4. 保留对话历史:目前两边格式不互通(社区有计划做迁移工具)

## 共存

完全可以两个都装:

```bash
~/.claude/      # Claude Code 数据
~/.u-hermes/    # Hermes 数据
```

不冲突。日常用 Hermes 省钱,关键任务上 Claude Code 求最强质量。

## 下一步

- [Hermes vs Cursor](/zh/tutorials/vs-cursor) — 编辑器型 AI 工具对比
- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — Hermes 实战
- [接 DeepSeek](/zh/tutorials/connect-deepseek) — 推荐配置

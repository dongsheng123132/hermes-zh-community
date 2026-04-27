---
title: Hermes 是什么?
description: Hermes 是 NousResearch 出品的开源 AI Agent。本文从零讲清 Hermes 是什么、能干什么、和 ChatGPT/Claude 有什么区别。
---

# Hermes 是什么?

> **Hermes** 是 [NousResearch](https://nousresearch.com) 出品的开源 AI Agent — 它能像人类同事一样,通过 shell 跑命令、用浏览器查资料、读写文件,完成多步任务。

**和 ChatGPT/Claude/通义千问最大的区别**:它不只是聊天机器人,而是一个能"动手干活"的 Agent。

## 一句话:Hermes vs 普通 AI 聊天

| | 普通 AI 聊天(ChatGPT) | Hermes Agent |
|---|---|---|
| 输入 | 你打字 | 你打字 |
| 输出 | AI 回字 | AI 回字 + 跑命令 + 改文件 + 用浏览器 |
| 上下文 | 单轮 / 短记忆 | 多步规划 + 自我纠错 + 持久记忆 |
| 工具 | 无 | shell / 文件 / 浏览器 / Python / HTTP / 自定义技能 |
| 协议 | 闭源 SaaS | MIT 开源 |

## Hermes 能干什么?

### 1. 写代码

```
你: 给我写一个 Python 脚本,扫 ~/Downloads 找出超过 100MB 的文件
Hermes: [自动跑] os.walk + os.path.getsize  → 输出 5 个文件
        [接着] 你要我把它们移到 ~/Archive 吗?
```

### 2. 跑 shell 命令

```
你: 看看 8642 端口被谁占了
Hermes: [自动跑] netstat -anvp tcp | grep 8642
        → PID 12345 是 Python(应该是另一个 hermes 进程)
        要我 kill 吗?
```

### 3. 用浏览器抓数据

```
你: 帮我从 hackernews 抓今天前 10 条新闻标题
Hermes: [启动 Playwright] 打开 news.ycombinator.com
        → 列出 10 个标题 + 链接,要不要存成 markdown?
```

### 4. 读写文件 / 改代码

```
你: 把这个 Python 项目里所有 print 改成 logging.info
Hermes: [扫 *.py] 找到 23 处
        [批量改] 已改 + 加了 import logging
        要我跑测试看看有没有破坏吗?
```

### 5. 多步推理 + 自我纠错

```
你: 我昨天写的脚本报错,你看看
Hermes: [跑脚本] 报错 ImportError
        [搜] which python  → 用错了 venv
        [改] source 正确 venv 重跑
        ✅ 成功,日志在 ./run.log
```

## Hermes 的核心特性

- **🧠 多步推理**:看到错误自己回头改,不像普通 LLM 一次性回字
- **🔧 工具齐全**:shell / 文件 / 浏览器 / Python / HTTP / 自定义技能
- **🇨🇳 国产模型**:DeepSeek / 通义 / Kimi / GLM / 文心 一键直连
- **🏠 本地优先**:Ollama 集成,可全离线跑 Qwen / DeepSeek-R1 / Llama
- **💼 便携**:U 盘装走配置 / 历史 / 技能,换电脑无感
- **📦 MIT 开源**:[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

## 谁该用 Hermes?

✅ **适合**:
- 程序员(代替 Cursor / Claude Code 的本地版)
- 运维(自动化 shell / 日志分析)
- 数据分析师(用 Python REPL 跑数据)
- 想接国产模型的人(不想翻墙用 Claude / GPT)
- 不想被 SaaS 锁数据的人(本地跑 + Ollama 离线)

❌ **不太适合**:
- 只是想随便聊天 → 通义千问网页版更轻
- 完全不会写代码 → 学习曲线略陡,先看 [5 分钟第一次对话](/zh/tutorials/first-chat)
- 公司禁止本地装东西 → 看 [Docker 方式](/zh/install/docker)

## Hermes 和其他 AI Agent 对比

详见独立文章:

- [Hermes vs Claude Code](/zh/tutorials/vs-claude-code) — Anthropic 官方 Agent
- [Hermes vs Cursor](/zh/tutorials/vs-cursor) — VSCode fork 风格的 AI 编辑器
- [Hermes vs OpenClaw](/zh/tutorials/vs-openclaw) — 姊妹项目(通用 AI + IM 机器人方向)

## 下一步

- [5 分钟第一次对话](/zh/tutorials/first-chat) — 不装环境直接试
- [pip 安装](/zh/quickstart/pip-install) — 在你机器上装一个
- [接 DeepSeek](/zh/tutorials/connect-deepseek) — 推荐第一个接的国产模型

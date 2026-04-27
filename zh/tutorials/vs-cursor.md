---
title: Hermes vs Cursor
description: Hermes Agent 和 Cursor IDE 的对比 — 编辑器 vs Agent、价格、模型自由度、本地化、迁移成本。
---

# Hermes vs Cursor

两者解决"用 AI 写代码"的同一问题,但路径完全不同。

## 一句话区分

- **Cursor** = **VSCode fork 的 AI 编辑器**(行内补全 + Agent 模式)
- **Hermes** = **独立 Agent + Web UI**(任意编辑器配合,不绑 IDE)

## 谁是谁?

| | Cursor | Hermes |
|---|---|---|
| 形态 | IDE(VSCode fork) | CLI + Web UI(任意编辑器) |
| 公司 | Anysphere(美) | NousResearch(开源) |
| 协议 | 闭源专有 | MIT |
| 主打 | Tab 行内补全 + Agent 模式 | 多步任务 Agent |
| 模型 | OpenAI / Claude / 部分自家 | 任意 |

## 详细对比

| 维度 | Cursor | Hermes |
|---|---|---|
| 价格 | Free 有限 / Pro $20/月 / Business $40/月 | 0 + API 用量(Ollama 免费) |
| Tab 补全 | ✅ 极强 | ❌ 不做(用 GitHub Copilot 等) |
| Agent 模式 | ✅ "Composer" | ✅ 原生 |
| 终端 / shell | 受限 | ✅ 完整 |
| 浏览器 | 部分(Cursor Browser) | ✅ Playwright 完整 |
| 文件操作 | ✅ | ✅ |
| 多步任务 | 中等 | 强(主打) |
| 模型选择 | 内置(GPT-4 / Claude / Sonnet) | 任意 |
| **国产模型** | ❌ | ✅ DeepSeek / Qwen / Kimi 直连 |
| Ollama 本地 | 部分支持 | ✅ 一等公民 |
| 数据隐私 | 部分上 Anysphere | 全本地(Ollama) |
| 国内访问 | 需代理 | 无需(国产模型) |
| 离线 | ❌ | ✅ |
| 编辑器集成 | VSCode fork(必须用 Cursor) | 任意 IDE / Vim / IntelliJ |
| 团队协作 | Pro 套餐 | 自己部署 |
| 快捷键 | Cmd+K / Cmd+L / Cmd+I | 浏览器交互 |
| 用户基数 | 大(VSCode 兼容) | 小 |

## 场景:重构一个 React 组件

### Cursor 流程

1. 在 Cursor 里打开文件
2. Cmd+K 选中代码 → "重构这个组件用 useReducer"
3. AI 直接改代码,inline diff 接受 / 拒绝
4. 看着 diff 一行行点 ✓

体验:**像一个会改代码的 VSCode**。

### Hermes 流程

1. 在你常用编辑器(VSCode / Vim / IntelliJ)里打开
2. Web UI 说:"看一下 src/components/Form.tsx,用 useReducer 重构"
3. Hermes 自己读文件 → 写新版本 → 用 diff 工具显示
4. 你说"提交",Hermes 跑 git commit

体验:**像一个会用 git / npm / 浏览器的同事**。

## Cursor 比 Hermes 强的地方

✅ **行内补全**:Tab 接受片段,这个 Hermes 做不了(也不打算做)
✅ **Cmd+K 改局部代码**:在编辑器里就地改一段,极快
✅ **学习曲线低**:VSCode 用户零成本上手
✅ **UI 美观度**:商业产品,精致
✅ **官方支持**:出问题有公司 SLA

## Hermes 比 Cursor 强的地方

✅ **国产模型支持**:DeepSeek / 通义,无需翻墙
✅ **完全离线**:Ollama 本地跑,数据不出门
✅ **任意编辑器**:不绑 VSCode fork
✅ **真 Agent 模式**:多步任务规划 + 自我纠错更深
✅ **价格**:零月费,API 用量 + Ollama 免费
✅ **可定制**:Python 写技能,改 prompt,fork 都行
✅ **MIT 协议**:你公司能合法 fork 内部用
✅ **U 盘便携**:换电脑无感

## 谁该用 Cursor?

✅ 你 VSCode 用得很熟,想加 AI 但不想换编辑器
✅ 你最看重 Tab 补全(行内推荐)
✅ 你不在中国 / 有稳定梯子
✅ 你愿意付 $20/月
✅ 你公司允许代码上 Anysphere 服务器

## 谁该用 Hermes?

✅ 你在中国 / 想用国产模型省钱
✅ 你想要真正本地 / 离线
✅ 你用 Vim / Emacs / IntelliJ / 别的编辑器
✅ 你想给 AI 加自定义工具(技能)
✅ 你想 fork / 部署到公司内网
✅ 你不需要 Tab 补全,要的是"做事的 Agent"

## 共存方案(推荐)

很多人 **Cursor + Hermes 都装**:

| 何时用 | 工具 |
|---|---|
| 写代码时的 Tab 补全 | Cursor(或 GitHub Copilot) |
| 多步任务 / 跑命令 / 改多文件 | Hermes |
| 离线 / 敏感代码 | Hermes + Ollama |

互补,不冲突。

## 迁移成本

### Cursor → Hermes

- 装 Hermes(2 分钟):[快速开始](/zh/quickstart/)
- 重新熟悉 Web UI(没有 Cmd+K,改成对话)
- 自定义 prompt 直接复制
- 保留 VSCode 编辑器,加 GitHub Copilot 补行内

### Hermes → Cursor

- 下载 Cursor(VSCode 风格),迁移你的扩展
- 失去 Ollama 离线、国产模型、自定义技能
- $20/月

## 价格实算

假设你每月 100 万 token 输入 + 50 万 token 输出:

| 工具 | 月支出 |
|---|---|
| Cursor Pro | $20(模型用量另算) |
| Hermes + DeepSeek | ¥1×1 + ¥8×0.5 = **¥5(约 $0.7)** |
| Hermes + Claude(中转) | $20-40 |
| Hermes + Ollama | **$0**(电费) |

## 下一步

- [Hermes vs Claude Code](/zh/tutorials/vs-claude-code) — Anthropic 官方 Agent
- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — Hermes 实战
- [接 DeepSeek](/zh/tutorials/connect-deepseek) — 替代 Cursor 的最便宜方式

---
title: Hermes 接 OpenAI / Claude
description: Hermes 接 OpenAI GPT-4o / Anthropic Claude / Google Gemini 的完整教程 — 配代理、API Key、模型选型。
---

# Hermes 接 OpenAI / Claude / Gemini

海外模型在国内需要代理 + 国际信用卡 / 中转。本教程涵盖三家。

## 前置:代理设置

国内访问海外 API,先把代理跑起来(Clash / V2Ray / 任意支持 HTTP proxy 的工具)。

```bash
# ~/.u-hermes/data/.env

HTTPS_PROXY=http://127.0.0.1:7890
HTTP_PROXY=http://127.0.0.1:7890

# 必加:hermes 自身回环不要走代理
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

::: warning
`NO_PROXY` 不配的话 hermes 会把 127.0.0.1:8642 也走代理,gateway 自己访问自己挂掉。
:::

## OpenAI(GPT-4o / o1)

### 申请 Key
1. [platform.openai.com](https://platform.openai.com)(需要梯子 + 美区/国际信用卡)
2. 充值 ¥35+ 解锁 tier 1
3. 创建 key:`sk-xxxxxxxxxxxx`

### 配 Hermes

```bash
OPENAI_API_KEY=sk-你的key
HERMES_DEFAULT_MODEL=gpt-4o
```

### 模型选

| 模型 | 用途 |
|---|---|
| `gpt-4o` | 综合最强,速度快 |
| `gpt-4o-mini` | 便宜版,适合简单任务 |
| `o1-preview` | 复杂推理(数学 / 难题),慢但深 |
| `o1-mini` | 推理便宜版 |

## Anthropic Claude

### 申请

[console.anthropic.com](https://console.anthropic.com)。

### 配

```bash
ANTHROPIC_API_KEY=sk-ant-你的key
HERMES_DEFAULT_MODEL=claude-3-5-sonnet-latest
```

### 模型选

| 模型 | 用途 |
|---|---|
| `claude-3-5-sonnet-latest` | 综合最强,代码尤佳 |
| `claude-3-5-haiku-latest` | 便宜快版 |
| `claude-3-opus-latest` | 长文写作最强 |

## Google Gemini

### 申请

[ai.google.dev](https://ai.google.dev) → Get API key。Gemini 有相对宽松的免费额度。

### 配

```bash
GOOGLE_API_KEY=AIza你的key
HERMES_DEFAULT_MODEL=gemini-2.0-flash-exp
```

### 模型选

| 模型 | 用途 |
|---|---|
| `gemini-2.0-flash-exp` | 实验版,最新最快 |
| `gemini-1.5-pro` | 长上下文(2M tokens) |
| `gemini-1.5-flash` | 便宜版 |

## 中转商 / OpenAI 兼容服务

不想自己搞梯子 + 国际卡?用中转 API。

```bash
# 任何 OpenAI 兼容服务
OPENAI_API_KEY=sk-中转商给的key
OPENAI_BASE_URL=https://api.中转商.com/v1
```

::: warning
中转商可能会读取你的 prompt 内容。**不要发敏感数据**。优先选有保护承诺的(比如 OpenRouter / 一些有备案的国内中转)。
:::

## 验证

```bash
pkill -f "hermes gateway"
~/.u-hermes/venv/bin/hermes gateway run
```

Web UI 问:"你是哪个模型?"

## 常见问题

**Q: 报 ConnectionError / SSL 错误**
代理没配好。先 `curl -x http://127.0.0.1:7890 https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"` 验证代理通。

**Q: 报 RateLimitError**
OpenAI / Claude tier 1 用户起步限速很严。冷启动 5-10 分钟自动放宽,或充值升 tier。

**Q: gateway 启动后访问不通?**
检查 `NO_PROXY` 是否加了 `127.0.0.1,localhost,::1`。

**Q: 速度比国内慢一倍?**
跨境 + 代理,正常。建议日常用国产模型,海外模型只在必要任务用。

## 下一步

- [接 DeepSeek](/zh/tutorials/connect-deepseek) — 国内首选
- [本地 Ollama](/zh/tutorials/connect-ollama) — 完全离线
- [Hermes vs Claude Code](/zh/tutorials/vs-claude-code) — 对比 Anthropic 官方 Agent

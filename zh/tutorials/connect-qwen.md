---
title: Hermes 接通义千问
description: Hermes 接阿里云通义千问(DashScope)完整教程 — qwen-plus / qwen-turbo / qwen-max 选型、长上下文优势、价格对比。
---

# Hermes 接通义千问

阿里云通义千问(DashScope API)是 DeepSeek 的强力备选 — 长上下文场景(单次 100 万 token)远超 DeepSeek 的 128K。

## 适合场景

✅ 整本书 / 整个代码仓库 / 大文档分析(qwen-long 撑 1000 万 token)
✅ 想要阿里云生态(对接日志服务 / OSS 直接用)
✅ DeepSeek 抖动时的备份

## Step 1:申请 API Key

1. 打开 [bailian.console.aliyun.com](https://bailian.console.aliyun.com/?apiKey=1)
2. 阿里云账号登录(企业 / 个人都行)
3. 控制台 → API-KEY 管理 → 创建,形式 `sk-xxxxxxxxxxxxxxxx`
4. 新用户首月送大额免费额度

## Step 2:配到 Hermes

```bash
# ~/.u-hermes/data/.env
DASHSCOPE_API_KEY=sk-你的key
HERMES_DEFAULT_MODEL=qwen-plus
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

## Step 3:重启验证

```bash
pkill -f "hermes gateway"
~/.u-hermes/venv/bin/hermes gateway run
```

Web UI 问:"你是哪个模型?"应回 `Qwen2.5 / Qwen-Plus / ...`。

## 选哪个 Qwen 模型?

| 模型 ID | 用途 | 上下文 | 价格(输入/输出 元/M token) |
|---|---|---|---|
| `qwen-turbo` | 简单问答 / 短任务 | 8K | 0.3 / 0.6 |
| `qwen-plus` | **日常推荐** / 写代码 / 复杂对话 | 128K | 0.8 / 2 |
| `qwen-max` | 最强,关键任务 / 难推理 | 8K | 20 / 60 |
| `qwen-long` | 长文档分析 | **1000 万** | 0.5 / 2 |
| `qwen-coder-plus` | 代码专用 | 128K | 0.8 / 2 |
| `qwen2.5-72b-instruct` | 开源版,公网调用 | 128K | 4 / 12 |

`qwen-long` 处理整个代码库:

```bash
HERMES_DEFAULT_MODEL=qwen-long
```

然后让 Hermes:`扫一下当前 git repo 所有 .py 文件,告诉我每个文件干什么`

## 路由策略:DeepSeek + Qwen 互补

DeepSeek 平时跑得快,但偶尔挂。配 fallback:

```bash
HERMES_PROVIDERS_PRIORITY=deepseek,dashscope
HERMES_FALLBACK_ON_ERROR=1
```

## 常见问题

**Q: 报 InvalidApiKey**
DashScope 的 API Key **不通用**于阿里云其他服务,要在 bailian 控制台单独建。

**Q: 报"该 API 当前不支持工具调用"**
不是所有 Qwen 模型都支持 function calling。用 `qwen-plus` / `qwen-max` / `qwen-coder-plus` 这几个,别用基础版。

**Q: 想用 DashScope 兼容模式 vs 原生模式?**
Hermes 用 OpenAI 兼容协议接 DashScope,baseUrl 已经配死:`https://dashscope.aliyuncs.com/compatible-mode/v1`。

**Q: 速度比 DeepSeek 慢?**
qwen-plus 首字节通常 1-3 秒,DeepSeek 0.5-1 秒。怕慢用 `qwen-turbo`。

## 下一步

- [接 Kimi](/zh/tutorials/connect-kimi) — 另一个国产长上下文选手
- [接 DeepSeek](/zh/tutorials/connect-deepseek) — 性价比最高
- [Hermes 浏览器自动化](/zh/tutorials/browser-automation) — 用 qwen-long 处理大页面

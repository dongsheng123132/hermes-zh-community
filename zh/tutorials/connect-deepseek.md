---
title: Hermes 接 DeepSeek
description: Hermes Agent 接 DeepSeek 完整教程 — 申请 API Key、配 .env、选 deepseek-chat / deepseek-reasoner、性价比对比。
---

# Hermes 接 DeepSeek

DeepSeek 是国内最受欢迎的 hermes-agent 后端 — 中文好、价格低、国内直连不翻墙。

## 推荐理由

| 维度 | DeepSeek | OpenAI GPT-4o |
|---|---|---|
| 中文质量 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 代码能力 | ⭐⭐⭐⭐⭐(deepseek-reasoner 接近 o1) | ⭐⭐⭐⭐⭐ |
| 价格(1M tokens) | **¥1-8 元** | **¥18-150 元** |
| 国内访问 | ✅ 直连 | ❌ 需代理 |
| 免费额度 | 注册赠 ¥10 | 无 |

## Step 1:申请 API Key

1. 打开 [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)
2. 微信登录,自动赠 ¥10
3. 创建 API Key,拷贝形式 `sk-xxxxxxxxxxxxxxxx`

## Step 2:配到 Hermes

编辑 `~/.u-hermes/data/.env`:

```bash
# DeepSeek
DEEPSEEK_API_KEY=sk-你的key

# 默认模型(不写则 hermes 自己选)
HERMES_DEFAULT_MODEL=deepseek-chat

# 必加:回环白名单
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

## Step 3:重启 Hermes

```bash
# 停掉旧 gateway
pkill -f "hermes gateway"

# 重新起
~/.u-hermes/venv/bin/hermes gateway run
```

## Step 4:验证

浏览器开 Web UI,问:

> 你是哪个模型?

应该回:`我是 DeepSeek V3 / R1...`(具体取决于版本)。

## 选哪个 DeepSeek 模型?

| 模型 ID | 用途 | 价格 |
|---|---|---|
| `deepseek-chat` | 通用对话 / 写代码 / 一般任务 | ¥1/1M token(输入)/ ¥8(输出) |
| `deepseek-reasoner` | 复杂推理 / 数学 / 难代码题 | 略贵,但质量接近 o1-mini |

切换:

```bash
# 在 .env 里
HERMES_DEFAULT_MODEL=deepseek-reasoner
```

或者 Web UI 右上角下拉切换。

## 高级:同时配多个 Provider

`.env` 可以同时配多个,Hermes 会自动选第一个有 key 的:

```bash
DEEPSEEK_API_KEY=sk-xxx           # 默认用这个
DASHSCOPE_API_KEY=sk-xxx          # 备用
OPENAI_API_KEY=sk-xxx             # 海外项目用
```

显式指定优先级:

```bash
HERMES_PROVIDERS_PRIORITY=deepseek,dashscope,openai
```

## 常见问题

**Q: 报 401 Unauthorized**
key 错了或被冻结。去 platform.deepseek.com 看 API Key 状态、余额是否欠费。

**Q: 报 timeout**
DeepSeek 偶尔抖动,改长 timeout:`HERMES_REQUEST_TIMEOUT=120`(秒)。

**Q: 回复有时候很慢**
deepseek-reasoner 因为有"思考过程",首字节延迟高(10-30 秒)。日常用 `deepseek-chat`。

**Q: 想看 DeepSeek 还剩多少钱?**
[platform.deepseek.com/usage](https://platform.deepseek.com/usage) 页面。

## 性价比小提示

DeepSeek 的 prompt cache 命中部分价格再打 1 折:

```bash
# 在 .env 里强制开缓存
HERMES_DEEPSEEK_PROMPT_CACHE=1
```

长上下文(>16K)的多轮会话特别有效,实测能省 60-80% 的 token 费用。

## 下一步

- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — 用 DeepSeek 当 Cursor 替代
- [接通义千问](/zh/tutorials/connect-qwen) — 备用 / 长上下文场景
- [本地 Ollama](/zh/tutorials/connect-ollama) — 完全离线

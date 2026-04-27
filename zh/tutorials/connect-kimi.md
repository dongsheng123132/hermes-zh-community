---
title: Hermes 接 Kimi
description: Hermes Agent 接月之暗面 Kimi(Moonshot)完整教程 — 长上下文的另一选,适合处理整书/整文档。
---

# Hermes 接 Kimi

月之暗面 Kimi(Moonshot)是国产长上下文(128K - 200K)的代表选手。

## 适合场景

✅ 长文档处理 / 整本书分析(128K 起步,可上 200K)
✅ 中文写作 / 文章润色(中文能力 top 梯队)
✅ DeepSeek + Qwen 之外的第三选项

## 不太适合

❌ 函数调用密集 / 复杂工具链(Kimi function calling 不如 DeepSeek 稳)
❌ 价格敏感(普通模型比 DeepSeek 贵 2-5 倍)

## Step 1:申请

1. [platform.moonshot.cn/console/api-keys](https://platform.moonshot.cn/console/api-keys)
2. 手机号登录,实名认证
3. 创建 key:`sk-xxxxxxxxxxxxxxxx`

## Step 2:配 Hermes

```bash
# ~/.u-hermes/data/.env
MOONSHOT_API_KEY=sk-你的key
HERMES_DEFAULT_MODEL=moonshot-v1-auto
NO_PROXY=127.0.0.1,localhost,::1
```

## 模型选项

| 模型 ID | 用途 | 上下文 |
|---|---|---|
| `moonshot-v1-8k` | 短任务,最便宜 | 8K |
| `moonshot-v1-32k` | 中等任务 | 32K |
| `moonshot-v1-128k` | 长文档 | 128K |
| `moonshot-v1-auto` | 自动按 token 量选模型(推荐) | 自适应 |

## 验证

Web UI 问:"今天上下文有多大?"

应该回类似:"我支持 128K(约 10 万字符)的上下文。"

## Tips:Kimi 的 Cache

和 DeepSeek 一样支持 prompt cache,不过用法不同。Hermes 默认不开,手动启用:

```bash
HERMES_KIMI_CACHE=1
HERMES_KIMI_CACHE_TTL=3600  # 缓存 1 小时
```

## 三家对比

| | DeepSeek | Qwen | Kimi |
|---|---|---|---|
| 中文 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 代码 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 长上下文 | 64K | 1000 万(qwen-long) | 200K |
| 价格 | 最便宜 | 中 | 较贵 |
| 工具调用 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**推荐组合**:DeepSeek 主用 + Kimi 备用(长文档时)。

## 常见问题

**Q: 报 ContextWindowExceeded**
切换 `moonshot-v1-auto` 让 Kimi 自动选合适大小,或显式 `moonshot-v1-128k`。

**Q: 速度比 DeepSeek 慢一倍?**
Kimi 在国内中午高峰会拥堵。错峰用,或退回 DeepSeek。

## 下一步

- [接 OpenAI / Claude](/zh/tutorials/connect-openai) — 海外模型
- [本地 Ollama](/zh/tutorials/connect-ollama) — 完全离线

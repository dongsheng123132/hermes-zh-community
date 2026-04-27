---
title: Hermes 接 Ollama 本地运行
description: Hermes 接本地 Ollama 完整教程 — 装 Ollama、拉 Qwen / DeepSeek-R1 / Llama,完全离线运行 AI Agent。
---

# Hermes 接 Ollama 本地运行

完全离线、不花钱、数据不外传。代价是需要本地有显卡(或耐心)。

## 硬件要求

| 模型大小 | 推荐显卡 / 内存 |
|---|---|
| **3-7B**(如 qwen2.5:7b) | 8GB 显存 / 16GB 内存(CPU 也能跑,慢) |
| **13-14B**(如 qwen2.5:14b) | 16GB 显存 / 32GB 内存 |
| **32B**(如 qwen2.5:32b) | 24GB 显存(RTX 4090 / 5090) |
| **70B**(如 llama3.3:70b) | 48GB+(双卡 / 量化版) |

::: tip 不知道自己显卡多少显存
Windows 任务管理器 → 性能 → GPU。Mac:Apple M1/M2/M3 共享内存,8GB 起步够跑 7B。
:::

## Step 1:装 Ollama

::: code-group

```bash [Linux/Mac]
curl -fsSL https://ollama.com/install.sh | sh
```

```powershell [Windows]
# 下载安装包: https://ollama.com/download/windows
# 双击安装即可
```

:::

启动后台:`ollama serve`(Windows 安装后自动起)。

## Step 2:拉模型

最推荐的国产模型:

```bash
# Qwen2.5 7B(中文好,通用)
ollama pull qwen2.5:7b

# DeepSeek-R1 蒸馏版(推理强)
ollama pull deepseek-r1:7b

# Qwen2.5-coder(代码专用)
ollama pull qwen2.5-coder:7b
```

测试:

```bash
ollama run qwen2.5:7b
>>> 你好
```

## Step 3:配 Hermes

```bash
# ~/.u-hermes/data/.env

# Hermes 用 OpenAI 兼容协议接 Ollama
OPENAI_API_KEY=ollama
OPENAI_BASE_URL=http://127.0.0.1:11434/v1
HERMES_DEFAULT_MODEL=qwen2.5:7b

# 必加(否则 hermes 会被代理拦)
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

## Step 4:重启 + 验证

```bash
pkill -f "hermes gateway"
~/.u-hermes/venv/bin/hermes gateway run
```

Web UI 问:"你是哪个模型?"

应该回:"我是 Qwen / Qwen2.5..."

## 切换不同 Ollama 模型

```bash
# .env 改
HERMES_DEFAULT_MODEL=deepseek-r1:7b

# 或 Web UI 右上角下拉切换
```

## 性能调优

### 长上下文

```bash
# Ollama 默认 ctx 窗口 2K,要扩
OLLAMA_NUM_CTX=8192   # 改成 8K

# 重启 ollama
```

### 用 GPU

Ollama 自动检测 NVIDIA / AMD / Apple Silicon。命令:

```bash
ollama ps
# 看到 100% GPU 表示成功
# 看到 90% CPU/10% GPU 说明显存爆了,换更小模型
```

### 量化版省显存

```bash
# Q4 量化,体积小一半,质量损失小
ollama pull qwen2.5:7b-instruct-q4_K_M
```

## 常见问题

**Q: 报 connection refused**
Ollama 没起。Linux/Mac:`ollama serve &`。Windows:任务栏看 ollama 图标。

**Q: 模型回复全是英文**
拉了英文优化版。换 `qwen2.5:7b`(中文专长)或 `qwen2.5:14b`。

**Q: 跑得太慢(几秒钟一个字)**
显存爆了,换更小模型(qwen2.5:1.5b)或量化版。

**Q: function calling 不准**
Ollama 的 function calling 还在演进。代码任务首选 `qwen2.5-coder` 或 `deepseek-r1`。

**Q: Windows 跑了几个小时变慢**
Ollama 进程内存涨了。重启:任务栏右键 ollama → Quit → 重新启动。

## 完全离线场景

Linux Live USB + Ollama 是 Hermes 的"最强离线姿态":

1. 制作 [Linux Live USB](/zh/quickstart/linux-live-usb) 启动盘
2. 启动后跑 `ollama pull qwen2.5:7b` 把模型下到 U 盘
3. 此后插上 U 盘开机,**完全不联网** 也能用 Hermes

详见 [便携 U 盘玩法](/zh/tutorials/portable-usb-tips)。

## 下一步

- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — 用 Ollama 当 Cursor 替代(免费!)
- [便携 U 盘玩法](/zh/tutorials/portable-usb-tips) — Ollama + U 盘 = 完全私有 AI

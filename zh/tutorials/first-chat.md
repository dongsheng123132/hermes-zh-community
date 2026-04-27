---
title: 5 分钟第一次对话
description: 5 分钟跑通 Hermes 第一次对话 — 装好、配 DeepSeek、起 Web UI、问第一个问题。
---

# 5 分钟第一次对话

不废话,5 分钟从 0 到第一次和 Hermes 对话。

## 前提

- 一台能装 Python 的电脑(Windows / Mac / Linux 都行)
- 大约 ¥5 充值的 [DeepSeek API Key](https://platform.deepseek.com/api_keys)(或其他模型)

## Step 1:装 Hermes(60 秒)

::: code-group

```bash [Linux/Mac]
curl -fsSL https://zh.u-hermes.org/install.sh | bash
```

```powershell [Windows]
iwr -useb https://zh.u-hermes.org/install.ps1 | iex
```

```bash [pip 直接装]
pip install -U hermes-agent
```

:::

## Step 2:配 DeepSeek API Key(60 秒)

去 [DeepSeek Platform](https://platform.deepseek.com/api_keys) 申请一个,拿到 `sk-xxx` 形式的 key。

```bash
# Linux/Mac
echo "DEEPSEEK_API_KEY=sk-xxx" >> ~/.u-hermes/data/.env

# Windows PowerShell
"DEEPSEEK_API_KEY=sk-xxx" | Out-File -Append "$env:USERPROFILE\.u-hermes\data\.env" -Encoding utf8
```

## Step 3:启动(15 秒)

```bash
~/.u-hermes/venv/bin/hermes gateway run
```

成功输出:

```
✅ U-Hermes 已启动
  Gateway API: http://127.0.0.1:8642
  Web UI:      http://127.0.0.1:8648
```

## Step 4:第一次对话(20 秒)

浏览器打开 [http://127.0.0.1:8648](http://127.0.0.1:8648)。

试这几个问题感受 Hermes 的"能动手"特点:

### 问题 1:"我桌面上现在有几个文件夹?"

Hermes 会自己跑 `ls ~/Desktop` 数给你。

### 问题 2:"我的电脑装了 Python 几?"

Hermes 会自己跑 `python3 --version` 告诉你。

### 问题 3:"帮我从 GitHub 找 5 个 trending Python 项目"

Hermes 会启动 Playwright 浏览器去 github.com/trending 抓。

### 问题 4:"在当前目录建一个 hello.py 写一个打印 hi 的程序"

Hermes 会自己用 file 工具创建文件。

## 看不到 Web UI 怎么办?

| 现象 | 解决 |
|---|---|
| 浏览器空白 | 等 5 秒再刷,Web UI 启动比 gateway 慢 |
| `ECONNREFUSED 8648` | gateway 起来了但 web UI 没起,看日志 `tail -f ~/.u-hermes/data/logs/agent.log` |
| 端口被占 | `hermes gateway run --port 18642` 改端口 |
| Windows 防火墙弹窗 | 选"允许专用网络",别勾"公用网络" |

## 改用别的模型?

| 模型 | 教程 |
|---|---|
| 通义千问 | [接通义千问](/zh/tutorials/connect-qwen) |
| Kimi | [接 Kimi](/zh/tutorials/connect-kimi) |
| OpenAI / Claude | [接 OpenAI / Claude](/zh/tutorials/connect-openai) |
| 本地 Ollama | [本地 Ollama](/zh/tutorials/connect-ollama) |

## 下一步

- [Web UI 怎么用](/zh/tutorials/web-ui-guide) — 多会话、Markdown、附件
- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — 把 Hermes 用成 Cursor 替代
- [CLI 速查](/zh/cli/) — 命令行用法

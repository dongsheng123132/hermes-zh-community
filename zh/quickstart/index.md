# 快速开始

按你手边有什么,选一条路:

## 我有 Linux / Mac / WSL → pip

最快、最干净。

```bash
pip install hermes-agent
hermes gateway run
# 浏览器开 http://127.0.0.1:8642/health 验证
```

→ [pip 安装详细步骤](/zh/quickstart/pip-install)

## 我想要"插上 U 盘就能用"的 Linux 启动盘

把任意 x86_64 电脑变成 AI 编程工作站,Ventoy + Ubuntu 24.04 LTS Live + persistence + hermes-agent。

```powershell
# Windows PowerShell 四步制盘
.\1-prepare-usb.ps1
.\2-download-iso.ps1
.\3-create-persistence.ps1 -SizeGB 20
.\4-copy-to-usb.ps1
```

→ [Linux Live USB 完整教程](/zh/quickstart/linux-live-usb)

## 我想要 Windows 成品 U 盘(开箱即用)

商业版 U-Hermes 马盘:¥199 起,内置 U-Claw + U-Hermes 双应用、激活码、初始 token、售后。

→ [Windows 商业版购买引导](/zh/install/windows-portable)

## 我想跑本地模型

ollama 集成,全离线。

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5:7b
pip install hermes-agent
# 在 .env 里把 OPENAI_BASE_URL 指向 http://127.0.0.1:11434/v1
```

→ [详细配置](/zh/cli/env-vars#ollama-本地)

## 配置 API Key

无论哪条路径,装好后第一件事是配 API Key。

```bash
# ~/.u-hermes/data/.env  (Linux/Mac)
DEEPSEEK_API_KEY=sk-xxx       # 国内推荐,直连
# DASHSCOPE_API_KEY=sk-xxx    # 阿里云通义
# OPENAI_API_KEY=sk-xxx       # 海外,需代理
# OPENAI_API_KEY=ollama
# OPENAI_BASE_URL=http://127.0.0.1:11434/v1   # 本地 ollama
```

支持的全部环境变量见 [CLI 速查 → 环境变量](/zh/cli/env-vars)。

## 然后呢?

- 在 Web UI 里 (`http://127.0.0.1:8648`) 开始第一次对话
- 装一两个技能 → [技能市场](/zh/market/)
- 加微信群 / GitHub Discussions 问问题 → [社区论坛](/zh/forum/)

---
title: Hermes 便携 U 盘玩法
description: 用 U 盘随身带 Hermes Agent — Linux Live USB + Ollama 离线、配置迁移、多电脑同步、风险与限制。
---

# Hermes 便携 U 盘玩法

把 Hermes 装在 U 盘里随身带,换电脑插上就能继续上一次的对话和配置。

## 三种姿势

### 1. Linux Live USB(开源,免费)

把任意 x86_64 电脑变成 AI 工作站。详见 [Linux Live USB 教程](/zh/quickstart/linux-live-usb)。

特点:
- ✅ 完全离线 + 完全私有(Ollama 模型也在 U 盘)
- ✅ 配置 / 历史 / 技能跟着 U 盘
- ❌ 需要从 USB 启动(每次开机按 F12)
- ❌ 不能在你正在用的 Windows 桌面里直接用

### 2. Windows U 盘成品(商业版)

¥199 起的 [U-Hermes 马盘](/zh/install/windows-portable),双击 .exe 起图形界面。

特点:
- ✅ 在你正常的 Windows 里直接用,不用重启
- ✅ 内置 U-Claw + U-Hermes 双应用
- ✅ 虾盘云预接入,首次启动赠送 token
- ❌ 仅 Windows
- ❌ 需要付费

### 3. 手动便携(DIY)

把 `~/.u-hermes` 整个目录复制到 U 盘,在不同电脑用环境变量指过去。

## DIY 详细方案

### 准备 U 盘(32GB+,USB 3.0)

格式化为 exFAT(跨平台兼容):

```bash
# Mac
diskutil eraseDisk ExFAT MyAI MBR /dev/diskN

# Linux
sudo mkfs.exfat -L MyAI /dev/sdX1

# Windows
# 文件管理器 → U 盘右键 → 格式化 → exFAT
```

### 装 Hermes 到 U 盘

```bash
# 假设 U 盘挂载在 /Volumes/MyAI(Mac)或 E:\(Win)
HERMES_HOME=/Volumes/MyAI/.u-hermes
mkdir -p $HERMES_HOME

# 装到 U 盘
python3 -m venv $HERMES_HOME/venv
$HERMES_HOME/venv/bin/pip install hermes-agent

# 配置在 U 盘
mkdir -p $HERMES_HOME/data
echo "DEEPSEEK_API_KEY=sk-xxx" > $HERMES_HOME/data/.env
```

### 启动脚本(放在 U 盘根目录)

`start.sh`(Mac/Linux):

```bash
#!/usr/bin/env bash
DIR="$(cd "$(dirname "$0")" && pwd)"
export HERMES_HOME="$DIR/.u-hermes/data"
"$DIR/.u-hermes/venv/bin/hermes" gateway run
```

`start.bat`(Windows):

```batch
@echo off
set HERMES_HOME=%~dp0\.u-hermes\data
%~dp0\.u-hermes\venv\Scripts\hermes.exe gateway run
```

双击启动。

## 完全离线(Ollama 也放 U 盘)

```bash
# 装 ollama
curl -fsSL https://ollama.com/install.sh | sh

# 让 ollama 把模型存到 U 盘
export OLLAMA_MODELS=/Volumes/MyAI/ollama-models
ollama pull qwen2.5:7b      # ~4GB,会下到 U 盘

# 配 hermes 用 ollama
cat >> $HERMES_HOME/data/.env <<EOF
OPENAI_API_KEY=ollama
OPENAI_BASE_URL=http://127.0.0.1:11434/v1
EOF
```

启动顺序:`ollama serve` → `start.sh`。

## 数据迁移到不同电脑

U 盘里的 Hermes 完全可移植,只要新电脑有:

| 平台 | 必需依赖 |
|---|---|
| Linux | python3 / glibc 兼容版本 |
| Mac | python3(brew install python) |
| Windows | python3(从 python.org) |

如果新电脑没 Python,U 盘版的 Hermes 跑不起来。商业版 U 盘是把 Python 也打进了 U 盘,这是它收费的核心价值之一。

## 风险与限制

### USB 速度

| U 盘类型 | 启动 hermes 时间 | 推荐 |
|---|---|---|
| USB 2.0 | 30-60 秒 | ❌ |
| USB 3.0 | 5-15 秒 | ✅ |
| USB 3.2 / Type-C / NVMe | 2-5 秒 | ✅⭐ |

### U 盘寿命

频繁读写会损耗闪存。建议:

- 选 SLC / MLC 闪存的工业 U 盘(贵但耐用)
- 关键数据定期备份到云
- 不要用 Hermes 跑 SQL 大批量写

### 防丢失

U 盘丢了 = API Key + 对话历史泄露。建议:

- `.env` 用 BitLocker / VeraCrypt 加密
- API Key 设余额上限(DeepSeek 控制台可设)
- 重要会话定期 export

## 多电脑同步另一种思路

如果你有公司电脑 + 家电脑两台,不想用 U 盘,可以:

1. 把 `~/.u-hermes/data/` 放进 Syncthing / Dropbox / iCloud
2. 不要同步 `venv/`(每台机子重装)
3. `.env` 单独本地存(避免云端泄露 API Key)

## 商业版用户的福利

商业版 [U-Hermes 马盘](/zh/install/windows-portable) 已经把这些都做好了:

- ✅ Python 进 U 盘,新电脑插上就能跑
- ✅ 启动器图形界面,不用记命令
- ✅ 自动同步 / 升级
- ✅ U 盘指纹防伪(防别人拷贝你的)

¥199 省一周 DIY 时间。值不值看你愿意花多少。

## 下一步

- [Linux Live USB 教程](/zh/quickstart/linux-live-usb) — 极客方案
- [Windows U 盘成品](/zh/install/windows-portable) — 开箱即用
- [本地 Ollama](/zh/tutorials/connect-ollama) — 离线必读

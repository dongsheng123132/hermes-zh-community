# 便捷脚本

`u-hermes/linux/` 目录下的两个 sh 脚本是 Linux Live USB 方案的核心,也可以直接用在普通 Ubuntu / Debian。

## setup-hermes.sh — 首次安装

```bash
#!/usr/bin/env bash
# U-Hermes 首次 bootstrap 脚本
# 在 Ubuntu Live(Ventoy + persistence)或干净 Ubuntu 上运行
#
# 用法:
#   chmod +x setup-hermes.sh
#   ./setup-hermes.sh

set -euo pipefail

# 1. 平台检查
. /etc/os-release
echo "检测到: $PRETTY_NAME"

# 2. apt 依赖
sudo apt update -qq
sudo apt install -y \
    python3 python3-pip python3-venv python3-full \
    nodejs npm curl git build-essential

# 3. 数据目录
HERMES_HOME="${HOME}/.u-hermes"
DATA_DIR="${HERMES_HOME}/data"
VENV_DIR="${HERMES_HOME}/venv"
mkdir -p "${HERMES_HOME}" "${DATA_DIR}/logs" "${DATA_DIR}/sessions"

# 4. Python venv + hermes-agent
python3 -m venv "${VENV_DIR}"
"${VENV_DIR}/bin/pip" install --upgrade pip --quiet
"${VENV_DIR}/bin/pip" install hermes-agent --quiet

# 5. 默认 .env
ENV_FILE="${DATA_DIR}/.env"
if [ ! -f "${ENV_FILE}" ]; then
    cp config.example "${ENV_FILE}"
fi

# 6. 桌面快捷方式
DESKTOP_FILE="${HOME}/Desktop/U-Hermes.desktop"
cat > "${DESKTOP_FILE}" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=U-Hermes
Exec=${PWD}/start-hermes.sh
Icon=utilities-terminal
Terminal=true
EOF
chmod +x "${DESKTOP_FILE}"

echo "✅ 安装完成"
echo "  Gateway: http://127.0.0.1:8642"
echo "  Web UI:  http://127.0.0.1:8648"
```

[原始脚本(完整版)](https://github.com/dongsheng123132/u-hermes/blob/main/linux/setup-hermes.sh)

## start-hermes.sh — 每次启动

```bash
#!/usr/bin/env bash
# U-Hermes · 每次启动执行
# 启动 hermes gateway + 打开浏览器

set -euo pipefail

HERMES_HOME="${HOME}/.u-hermes"
DATA_DIR="${HERMES_HOME}/data"
VENV="${HERMES_HOME}/venv"
LOG="${DATA_DIR}/logs/agent.log"

# 检查 setup 跑过没
if [ ! -x "${VENV}/bin/hermes" ]; then
    echo "⚠  先跑 setup-hermes.sh"
    exit 1
fi

# 检查 .env 里至少有一个 API Key
if ! grep -qE "^(DEEPSEEK|OPENAI|ANTHROPIC|DASHSCOPE)_API_KEY=" "${DATA_DIR}/.env"; then
    echo "⚠  ${DATA_DIR}/.env 里没有 API Key"
    echo "   编辑文件,取消某行注释填入你的 Key"
    exit 1
fi

# 启动 gateway
HERMES_HOME="${DATA_DIR}" \
PYTHONIOENCODING=utf-8 \
PYTHONUTF8=1 \
    "${VENV}/bin/hermes" gateway run > "${LOG}" 2>&1 &

# 等 gateway listen
for i in $(seq 1 30); do
    ss -tln 2>/dev/null | grep -q ":8642" && break
    sleep 0.5
done

echo "✅ U-Hermes 已启动: http://127.0.0.1:8642"
xdg-open http://127.0.0.1:8642/health 2>/dev/null || true
```

[原始脚本(完整版)](https://github.com/dongsheng123132/u-hermes/blob/main/linux/start-hermes.sh)

## config.example — .env 模板

完整字段说明见 [环境变量](/zh/cli/env-vars)。

```bash
# 至少取消一行 *_API_KEY 注释,填你的 key

# ─── 国产云 ───
# DEEPSEEK_API_KEY=sk-xxx
# DASHSCOPE_API_KEY=sk-xxx
# MOONSHOT_API_KEY=sk-xxx

# ─── 海外 ───
# OPENAI_API_KEY=sk-xxx
# ANTHROPIC_API_KEY=sk-ant-xxx
# GOOGLE_API_KEY=AIza...

# ─── 本地 Ollama ───
# OPENAI_API_KEY=ollama
# OPENAI_BASE_URL=http://127.0.0.1:11434/v1

# ─── 代理 ───
# HTTPS_PROXY=http://127.0.0.1:7890
# HTTP_PROXY=http://127.0.0.1:7890

# ─── 必加:回环白名单 ───
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

[原始模板(完整版)](https://github.com/dongsheng123132/u-hermes/blob/main/linux/config.example)

## Windows 制盘脚本(PowerShell)

四步制盘的 `.ps1` 脚本在 [u-hermes/linux/](https://github.com/dongsheng123132/u-hermes/tree/main/linux):

| 脚本 | 作用 |
|---|---|
| `1-prepare-usb.ps1` | 下载 Ventoy + 打开 Ventoy2Disk 图形界面 |
| `2-download-iso.ps1` | 下载 Ubuntu 24.04.4 Desktop ISO(国内镜像) |
| `3-create-persistence.ps1 -SizeGB 20` | 创建 persistence.dat 持久化镜像 |
| `4-copy-to-usb.ps1` | 把 ISO/persistence/ventoy 配置/sh 脚本复制到 U 盘 |

详细见 [Linux Live USB 教程](/zh/quickstart/linux-live-usb)。

#!/usr/bin/env bash
# Hermes 中文社区一键安装脚本
# 用法:
#   curl -fsSL https://hermes.org.cn/install.sh | bash
#   curl -fsSL https://hermes.org.cn/install.sh | bash -s -- --pypi-mirror https://pypi.tuna.tsinghua.edu.cn/simple

set -euo pipefail

PYPI_MIRROR=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --pypi-mirror)
      PYPI_MIRROR="$2"
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done

echo "🐎 Hermes Agent · 中文社区一键安装"
echo "================================="

# 1. 检查 Python 3.10+
if ! command -v python3 >/dev/null 2>&1; then
    echo "❌ 未检测到 python3。Mac:brew install python  Linux:apt install python3 python3-pip python3-venv"
    exit 1
fi
PY_VER=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo "Python: $PY_VER"

# 2. 建 venv
HERMES_HOME="${HERMES_HOME:-$HOME/.u-hermes}"
mkdir -p "$HERMES_HOME/data/logs" "$HERMES_HOME/data/sessions"
python3 -m venv "$HERMES_HOME/venv"

# 3. 装 hermes-agent
PIP="$HERMES_HOME/venv/bin/pip"
$PIP install --upgrade pip

if [ -n "$PYPI_MIRROR" ]; then
    echo "使用国内镜像: $PYPI_MIRROR"
    $PIP install hermes-agent -i "$PYPI_MIRROR"
else
    $PIP install hermes-agent
fi

# 4. 默认 .env
ENV_FILE="$HERMES_HOME/data/.env"
if [ ! -f "$ENV_FILE" ]; then
    cat > "$ENV_FILE" <<'EOF'
# Hermes 配置 - 至少取消一行 *_API_KEY 并填 key

# DeepSeek(国内推荐,直连)
# DEEPSEEK_API_KEY=sk-xxx

# 通义千问
# DASHSCOPE_API_KEY=sk-xxx

# OpenAI(需代理)
# OPENAI_API_KEY=sk-xxx

# 本地 Ollama
# OPENAI_API_KEY=ollama
# OPENAI_BASE_URL=http://127.0.0.1:11434/v1

# 必加:回环白名单
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
EOF
    echo "✏  已创建 $ENV_FILE — 编辑它填入你的 API Key"
fi

echo ""
echo "✅ 安装完成"
echo ""
echo "下一步:"
echo "  1. 编辑 $ENV_FILE 填入 API Key"
echo "  2. 启动: $HERMES_HOME/venv/bin/hermes gateway run"
echo "  3. 浏览器访问: http://127.0.0.1:8642/health"
echo ""
echo "📖 详细教程: https://hermes.org.cn/zh/quickstart/"

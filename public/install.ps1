# Hermes 中文社区 Windows 一键安装脚本
# 用法:
#   iwr -useb https://hermes.org.cn/install.ps1 | iex
#   iwr -useb https://hermes.org.cn/install.ps1 -OutFile install.ps1; .\install.ps1 -PypiMirror "https://pypi.tuna.tsinghua.edu.cn/simple"

param(
    [string]$PypiMirror = ""
)

$ErrorActionPreference = "Stop"

Write-Host "🐎 Hermes Agent · 中文社区一键安装" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# 1. 检查 Python
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    $python = Get-Command python3 -ErrorAction SilentlyContinue
}
if (-not $python) {
    Write-Host "❌ 未检测到 Python。请先装 Python 3.10+: https://www.python.org/downloads/" -ForegroundColor Red
    exit 1
}

$pyVer = & $python.Source --version
Write-Host "Python: $pyVer"

# 2. 建 venv
$hermesHome = if ($env:HERMES_HOME) { $env:HERMES_HOME } else { Join-Path $env:USERPROFILE ".u-hermes" }
New-Item -ItemType Directory -Force -Path "$hermesHome\data\logs" | Out-Null
New-Item -ItemType Directory -Force -Path "$hermesHome\data\sessions" | Out-Null

& $python.Source -m venv "$hermesHome\venv"

# 3. 装 hermes-agent
$pip = "$hermesHome\venv\Scripts\pip.exe"
& $pip install --upgrade pip

if ($PypiMirror) {
    Write-Host "使用国内镜像: $PypiMirror" -ForegroundColor Yellow
    & $pip install hermes-agent -i $PypiMirror
} else {
    & $pip install hermes-agent
}

# 4. 默认 .env
$envFile = "$hermesHome\data\.env"
if (-not (Test-Path $envFile)) {
    @'
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
'@ | Out-File -FilePath $envFile -Encoding utf8
    Write-Host "✏  已创建 $envFile — 编辑它填入你的 API Key" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ 安装完成" -ForegroundColor Green
Write-Host ""
Write-Host "下一步:"
Write-Host "  1. 编辑 $envFile 填入 API Key"
Write-Host "  2. 启动: $hermesHome\venv\Scripts\hermes.exe gateway run"
Write-Host "  3. 浏览器访问: http://127.0.0.1:8642/health"
Write-Host ""
Write-Host "📖 详细教程: https://hermes.org.cn/zh/quickstart/" -ForegroundColor Cyan

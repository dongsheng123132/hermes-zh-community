# 环境变量

hermes-agent 通过 `~/.u-hermes/data/.env` 读取所有配置。本页是字段速查。

## API Key(至少配一个)

### 国产云(国内直连)

```bash
# DeepSeek · 性价比高推荐
# 申请: https://platform.deepseek.com/api_keys
DEEPSEEK_API_KEY=sk-xxx

# 阿里云通义千问
# 申请: https://bailian.console.aliyun.com/?apiKey=1
DASHSCOPE_API_KEY=sk-xxx

# 月之暗面 Kimi
# 申请: https://platform.moonshot.cn/console/api-keys
MOONSHOT_API_KEY=sk-xxx

# 智谱 GLM
# 申请: https://open.bigmodel.cn/usercenter/apikeys
ZHIPUAI_API_KEY=xxx

# MiniMax
# 申请: https://www.minimaxi.com/user-center/basic-information/interface-key
MINIMAX_API_KEY=xxx
```

### 海外(需代理)

```bash
# OpenAI GPT
OPENAI_API_KEY=sk-xxx

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-xxx

# Google Gemini
GOOGLE_API_KEY=AIza...
```

### Ollama 本地

先装 ollama 跑本地模型,然后:

```bash
# 让 hermes 用 OpenAI 兼容协议接 ollama
OPENAI_API_KEY=ollama
OPENAI_BASE_URL=http://127.0.0.1:11434/v1
```

## 代理(只有用海外 provider 才要)

```bash
HTTPS_PROXY=http://127.0.0.1:7890
HTTP_PROXY=http://127.0.0.1:7890
```

::: warning 必须配 NO_PROXY
否则 hermes 会把本地 127.0.0.1 的请求也走代理,导致 gateway 自己访问自己也走代理失败。
:::

```bash
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

## 数据目录

```bash
# 默认 ~/.u-hermes
HERMES_HOME=/path/to/data

# 端口(也可以用 hermes gateway run --port 覆盖)
HERMES_PORT=8642
HERMES_WEB_PORT=8648
```

## 调试 / 日志

```bash
HERMES_LOG_LEVEL=DEBUG    # 默认 INFO,可选 DEBUG / INFO / WARN / ERROR
PYTHONIOENCODING=utf-8    # Windows 上处理中文输出必加
PYTHONUTF8=1
```

## 完整模板

直接拷贝下面整段到 `~/.u-hermes/data/.env`,按需取消注释:

```bash
# ─── 国产云(国内直连)───
# DEEPSEEK_API_KEY=sk-xxx
# DASHSCOPE_API_KEY=sk-xxx
# MOONSHOT_API_KEY=sk-xxx

# ─── 海外(需代理)───
# OPENAI_API_KEY=sk-xxx
# ANTHROPIC_API_KEY=sk-ant-xxx
# GOOGLE_API_KEY=AIza...

# ─── 本地 Ollama ───
# OPENAI_API_KEY=ollama
# OPENAI_BASE_URL=http://127.0.0.1:11434/v1

# ─── 代理(可选)───
# HTTPS_PROXY=http://127.0.0.1:7890
# HTTP_PROXY=http://127.0.0.1:7890

# ─── 回环白名单(必须配)───
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
```

## 配置生效顺序

```
进程环境变量 > .env 文件 > 默认值
```

修改 `.env` 后 **必须重启 gateway** 才能生效。

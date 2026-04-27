# pip 安装 hermes-agent

最干净的安装方式。在任何 Linux / macOS / WSL / Windows + Python 环境都能跑。

## 前置

- **Python 3.10+**(`python3 --version` 验证)
- **pip**(`python3 -m pip --version` 验证)
- 可选:**ollama** 跑本地模型

::: tip
在 Windows 上推荐用 [WSL2 + Ubuntu](https://learn.microsoft.com/zh-cn/windows/wsl/install) 跑 hermes,跨平台行为一致,踩坑少。
:::

## 三步装好

```bash
# 1. 建独立 venv,避免污染系统 Python
python3 -m venv ~/.u-hermes/venv

# 2. 装 hermes-agent
~/.u-hermes/venv/bin/pip install --upgrade pip
~/.u-hermes/venv/bin/pip install hermes-agent

# 3. 启动 gateway
~/.u-hermes/venv/bin/hermes gateway run
```

启动成功后会在终端看到:

```
✅ U-Hermes 已启动
  Gateway API: http://127.0.0.1:8642
```

浏览器开 [http://127.0.0.1:8642/health](http://127.0.0.1:8642/health) 应该看到 `{"status":"ok"}`。

## 配置 API Key

启动前先填好 `~/.u-hermes/data/.env`,至少取消一行 `*_API_KEY` 的注释:

```bash
mkdir -p ~/.u-hermes/data
cat > ~/.u-hermes/data/.env <<'EOF'
# 二选一:国内 DeepSeek 直连
DEEPSEEK_API_KEY=sk-xxx

# 或 OpenAI(需代理)
# OPENAI_API_KEY=sk-xxx
# HTTPS_PROXY=http://127.0.0.1:7890

# 必加:回环白名单,否则本地请求会走代理
NO_PROXY=127.0.0.1,localhost,::1
no_proxy=127.0.0.1,localhost,::1
EOF
```

完整字段见 [CLI 速查 → 环境变量](/zh/cli/env-vars)。

## 一键脚本(等价于上面手动操作)

```bash
curl -fsSL https://raw.githubusercontent.com/dongsheng123132/u-hermes/main/linux/setup-hermes.sh | bash
```

## 升级 / 卸载

```bash
# 升级
~/.u-hermes/venv/bin/pip install --upgrade hermes-agent

# 卸载
rm -rf ~/.u-hermes
```

## 常见问题

**Q: pip install 卡在下载某个包**
配国内源:`pip install hermes-agent -i https://pypi.tuna.tsinghua.edu.cn/simple`

**Q: 报 SSL 证书错误**
检查 `HTTPS_PROXY` 是否被错误设成了带 https:// 的地址。代理本身要 `http://` 协议,不要 `https://`。

**Q: 端口 8642 被占用**
`hermes gateway run --port 18642` 改端口。

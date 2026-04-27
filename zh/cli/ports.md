# 端口约定

| 端口 | 服务 | 默认绑定 | 改法 |
|---|---|---|---|
| **8642** | Gateway API(JSON / SSE) | `127.0.0.1` | `hermes gateway run --port 18642` |
| **8648** | Web UI | `127.0.0.1` | `HERMES_WEB_PORT=18648` |
| **11434** | Ollama(如果跑本地模型) | `127.0.0.1` | ollama 自己的配置 |

## 验证 gateway 在跑

```bash
# Linux / Mac
ss -tln | grep 8642
curl http://127.0.0.1:8642/health

# Windows
netstat -an | findstr "8642"
```

正常输出:

```
LISTEN  127.0.0.1:8642
{"status":"ok"}
```

## 端口冲突怎么办

```bash
# 找占用进程
lsof -i :8642        # Linux/Mac
netstat -ano | findstr :8642   # Windows + powershell

# 改端口启动
hermes gateway run --port 18642
```

## 暴露到局域网(谨慎)

::: danger 安全提示
默认只绑定 `127.0.0.1`(只有本机能访问)。如果 `--host 0.0.0.0` 暴露到局域网,**任何同 Wi-Fi 的人都能调用你的 hermes 和你的 API Key**。务必加认证(待 hermes-agent 上游补充)或装在内网防火墙后。
:::

```bash
# 局域网共享(自担风险)
hermes gateway run --host 0.0.0.0 --port 8642
```

## 防火墙

Windows 11 首次启动可能弹"是否允许 Python 访问网络",选**仅专用网络**,不要勾"公用网络"。

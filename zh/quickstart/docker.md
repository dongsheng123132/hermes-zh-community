# Docker(规划中)

::: warning 状态:占位
hermes-agent 上游暂未提供官方 Dockerfile。本页是社区计划:等上游或社区提供后立刻补上完整步骤。

如果你已经做好 Dockerfile 想贡献,请提交 PR 到 [u-hermes 仓库](https://github.com/dongsheng123132/u-hermes/pulls)。
:::

## 设想中的最小 Dockerfile

```dockerfile
FROM python:3.12-slim

RUN pip install --no-cache-dir hermes-agent

EXPOSE 8642 8648
ENV NO_PROXY=127.0.0.1,localhost,::1

# 用户挂卷把 .env / data 持久化
VOLUME ["/data"]
ENV HERMES_HOME=/data

CMD ["hermes", "gateway", "run", "--host", "0.0.0.0", "--port", "8642"]
```

## 设想中的 docker-compose.yml

```yaml
services:
  hermes:
    image: hermes-agent:latest
    ports:
      - "8642:8642"
      - "8648:8648"
    volumes:
      - ./data:/data
    environment:
      - DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
    restart: unless-stopped
```

## 临时替代方案

在 Docker 出来之前,可以用 [pip 安装](/zh/quickstart/pip-install) 或 [Linux Live USB](/zh/quickstart/linux-live-usb)。

如果硬要容器化,简单包一层:

```bash
docker run -it --rm \
  -p 8642:8642 -p 8648:8648 \
  -v "$PWD/.u-hermes:/data" \
  -e HERMES_HOME=/data \
  -e DEEPSEEK_API_KEY=$DEEPSEEK_API_KEY \
  python:3.12-slim \
  bash -c "pip install hermes-agent && hermes gateway run --host 0.0.0.0"
```

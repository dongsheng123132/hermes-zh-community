# pip 安装

完整教程见 [快速开始 → pip 安装](/zh/quickstart/pip-install)。

## 最短路径

```bash
pip install hermes-agent
hermes gateway run
```

## 推荐做法(隔离 venv)

```bash
python3 -m venv ~/.u-hermes/venv
~/.u-hermes/venv/bin/pip install hermes-agent
~/.u-hermes/venv/bin/hermes gateway run
```

## 一键脚本

```bash
curl -fsSL https://raw.githubusercontent.com/dongsheng123132/u-hermes/main/linux/setup-hermes.sh | bash
```

## 详细

→ [pip 安装完整步骤](/zh/quickstart/pip-install)

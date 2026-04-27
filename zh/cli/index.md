# CLI 速查总览

hermes-agent 的命令行用法、环境变量、端口约定、便捷脚本一次性查清。

## 子页

- [hermes 命令](/zh/cli/hermes-cli) — `hermes gateway run` / `status` / `logs` / `skill` 等
- [环境变量](/zh/cli/env-vars) — 所有 `*_API_KEY` / 代理 / 数据目录
- [端口约定](/zh/cli/ports) — 8642 gateway / 8648 Web UI
- [便捷脚本](/zh/cli/scripts) — `setup-hermes.sh` / `start-hermes.sh` 全文

## 最快速记忆点

```bash
hermes gateway run                # 启动(默认 8642)
hermes gateway run --port 18642   # 改端口
hermes gateway status             # 状态
hermes gateway logs               # 日志
hermes skill list                 # 列出技能
hermes skill install <id>         # 装技能
```

## 数据目录约定

```
~/.u-hermes/
├── venv/             # Python 虚拟环境
└── data/             # 由 HERMES_HOME 指向
    ├── .env          # API Key 配置
    ├── logs/         # 日志
    └── sessions/     # 对话历史
```

便携模式(U 盘)下,`HERMES_HOME` 通常指向 U 盘的 `data/` 目录,所有数据跟着 U 盘走。

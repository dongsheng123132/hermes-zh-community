# hermes 命令

::: tip
以下命令以 `hermes` 开头。如果你用 venv 安装,需要写完整路径 `~/.u-hermes/venv/bin/hermes`,或先 `source ~/.u-hermes/venv/bin/activate`。
:::

## gateway 子命令

启动、停止、查询 hermes gateway 进程。

| 命令 | 作用 |
|---|---|
| `hermes gateway run` | 前台启动,默认监听 `127.0.0.1:8642` |
| `hermes gateway run --port 18642` | 改端口 |
| `hermes gateway run --host 0.0.0.0` | 监听所有网卡(谨慎,会暴露给局域网) |
| `hermes gateway status` | 查看运行状态 + 进程 PID |
| `hermes gateway logs` | 滚动查看日志(默认 `~/.u-hermes/data/logs/agent.log`) |
| `hermes gateway logs --follow` | 类似 `tail -f` |
| `hermes gateway stop` | 停止后台进程 |

启动成功输出:

```
🦐 U-Hermes · 启动中
====================
启动 hermes gateway ...
  agent pid: 12345
  log: /home/you/.u-hermes/data/logs/agent.log
✅ U-Hermes 已启动
  Gateway API: http://127.0.0.1:8642
```

## skill 子命令

技能管理(类比 npm 包)。

| 命令 | 作用 |
|---|---|
| `hermes skill list` | 列出已安装技能 |
| `hermes skill install <skill_id>` | 装技能 |
| `hermes skill remove <skill_id>` | 卸载 |
| `hermes skill register <name>` | 把本地目录注册成技能 |
| `hermes skill info <skill_id>` | 查看技能详情 |

## health / version

```bash
curl http://127.0.0.1:8642/health
# {"status":"ok","version":"x.y.z"}

hermes --version
```

## 完整命令列表(自查)

```bash
hermes --help
hermes gateway --help
hermes skill --help
```

## 常用一键组合

启动 gateway + 等到 listen 再打开浏览器:

```bash
hermes gateway run > ~/.u-hermes/data/logs/agent.log 2>&1 &
sleep 2
xdg-open http://127.0.0.1:8642/health
```

完整版见 [start-hermes.sh](/zh/cli/scripts#start-hermes-sh)。

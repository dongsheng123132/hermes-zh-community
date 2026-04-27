---
title: Hermes 写代码教程
description: 用 Hermes 当 Cursor / Claude Code 替代品 — 真实项目改代码、修 bug、跑测试、提 PR 的完整流程。
---

# 用 Hermes 写代码

Hermes 替代 Cursor / Claude Code 的核心姿势:把它当一个**可以跑命令的同事**,而不是"补全工具"。

## 准备工作

```bash
# 进项目目录
cd ~/projects/my-app

# 启动 Hermes(默认就在当前目录的 cwd)
hermes gateway run
```

Web UI 打开 [http://127.0.0.1:8648](http://127.0.0.1:8648)。

::: tip
Hermes 跑命令的工作目录是**启动 gateway 时的当前目录**。最好在项目根目录起。
:::

## 基本姿势

### 1. 让 Hermes 看代码

```
你: 看一下当前目录,告诉我这是什么项目
```

Hermes 会自己跑 `ls`、`cat README.md`、`cat package.json`,然后总结。

### 2. 让 Hermes 找 bug

```
你: 我跑 npm test 报这个错(粘贴错误)。帮我看看问题在哪
```

Hermes 会:
- 跑 `npm test` 复现
- 读相关源文件
- 给出修复建议
- 问你要不要直接改

### 3. 让 Hermes 改代码

```
你: 把这个项目所有 console.log 改成 logger.info
```

Hermes 会:
- `grep -rn "console.log"` 找全部
- 一个个文件改
- 跑测试确保没破坏
- 把 diff 给你看

### 4. 让 Hermes 写 Commit

```
你: 看下 git diff,帮我写个合适的 commit message,然后提交
```

Hermes 会:
- `git diff` / `git status` 看变更
- 写一个符合 conventional commits 的 message
- 跑 `git commit -m "..."`

## 实战:让 Hermes 修一个真实 bug

### 场景

你在 React 项目里,某个组件偶尔渲染不出来。

```
你: 我有个 React 组件 <UserCard /> 偶尔不渲染,但没报错。帮我查
```

Hermes 自动:

1. **找代码** → `find . -name "UserCard*"`
2. **读源文件** → 发现 `useEffect` 缺依赖
3. **跑测试** → `npm test UserCard`,看到 race condition
4. **改代码** → 加 `useCallback` + 依赖数组
5. **再跑测试** → 通过
6. **建议你 commit**

整个过程你只看消息,偶尔批准操作。

## 把 Hermes 当 Pair Programmer

### 模式 1:解释器

```
你: 这段代码我看不懂,逐行讲一下
[贴代码]
```

### 模式 2:Code Reviewer

```
你: git diff HEAD~3,review 一下我最近 3 个 commit
```

### 模式 3:Refactor 助手

```
你: 这个文件 800 行了,帮我拆成多个模块
```

### 模式 4:测试生成器

```
你: 给 src/utils/format.ts 写单元测试,覆盖所有 export 函数
```

### 模式 5:文档生成器

```
你: 给当前项目写 README.md,从 package.json 和 src/ 结构推断它做啥的
```

## 高级:沙箱 + 危险命令二次确认

`.env` 加:

```bash
HERMES_REQUIRE_APPROVAL_ON=shell:rm,shell:git push,shell:npm publish
HERMES_SHELL_DENY=shell:rm -rf /,shell:sudo rm
```

意思:
- Hermes 想跑 `rm` / `git push` / `npm publish` 时会停下问你
- 永远禁止 `rm -rf /` 这种灾难命令

## 配国产模型省钱

代码任务推荐:

| 任务复杂度 | 模型 |
|---|---|
| 简单改代码 / 解释 | `deepseek-chat`(¥1-8/M token) |
| 复杂调试 / 算法题 | `deepseek-reasoner`(深推理但慢) |
| 整个仓库分析 | `qwen-long`(1000 万上下文) |
| 离线 / 私有 | Ollama + `qwen2.5-coder:7b` |

## 和 Cursor 的差异

| | Cursor | Hermes |
|---|---|---|
| 编辑器 | VSCode fork | 任何编辑器(VSCode / Vim / IntelliJ) |
| 补全 | Tab 补全(行内) | 整段对话(Web UI) |
| 跑命令 | 有 agent 模式 | 原生 agent |
| 模型 | OpenAI / Claude(有限) | 自由配,DeepSeek / Qwen / Ollama 都行 |
| 价格 | $20/月 | API 用量 / 免费(Ollama) |
| 数据 | 部分上 Cursor 服务器 | 全本地 |

详细对比 → [Hermes vs Cursor](/zh/tutorials/vs-cursor)。

## 下一步

- [Hermes 浏览器自动化](/zh/tutorials/browser-automation) — Playwright 抓数据
- [写自定义技能](/zh/tutorials/build-skill) — 给 Hermes 加新工具
- [接 DeepSeek](/zh/tutorials/connect-deepseek) — 推荐配置

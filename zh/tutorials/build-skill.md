---
title: 写自定义 Hermes 技能
description: 给 Hermes Agent 加新工具的完整教程 — Skill 结构、注册、调试、发布到技能市场。
---

# 写自定义 Hermes 技能

Hermes 技能 = 一个 Python 函数 + JSON Schema 描述 + 注册到 hermes。

## 一个最小技能

新建文件 `hello_skill.py`:

```python
from hermes_agent.skills import skill, register

@skill(
    name="hello_world",
    description="问候用户,可选传入名字",
    parameters={
        "type": "object",
        "properties": {
            "name": {"type": "string", "description": "要问候的人名,可选"}
        }
    }
)
def hello_world(name: str = "world") -> str:
    return f"Hello, {name}! 来自 Hermes 技能。"

# 注册到 hermes
register(hello_world)
```

放到 `~/.u-hermes/data/skills/` 下,重启 hermes,Web UI 里问:

> 用 hello_world 技能跟我打招呼

Hermes 会调用,返回 `Hello, world!`。

## 完整结构

一个标准技能包:

```
my-skill/
├── pyproject.toml          # 包元数据
├── README.md               # 用户看的说明
├── src/
│   └── my_skill/
│       ├── __init__.py
│       ├── tools.py        # 工具实现
│       └── manifest.json   # 技能描述
└── tests/
    └── test_tools.py
```

`manifest.json`:

```json
{
  "skill_id": "my-skill",
  "name": "我的技能",
  "version": "0.1.0",
  "description": "做某件事",
  "author": "你的名字",
  "tools": [
    { "name": "my_tool", "module": "my_skill.tools", "function": "my_tool" }
  ],
  "permissions": ["file:read", "http:get"]
}
```

`pyproject.toml`:

```toml
[project]
name = "hermes-skill-myskill"
version = "0.1.0"
dependencies = [
    "hermes-agent>=0.1.0"
]

[project.entry-points."hermes.skills"]
my-skill = "my_skill:register"
```

## 一个真实例子:微信公众号文章抓取

```python
# wechat_article.py
import httpx
from hermes_agent.skills import skill, register

@skill(
    name="fetch_wechat_article",
    description="抓取微信公众号文章正文。输入文章 URL,返回纯文本。",
    parameters={
        "type": "object",
        "required": ["url"],
        "properties": {
            "url": {"type": "string", "description": "微信公众号文章 URL,形如 https://mp.weixin.qq.com/s/..."}
        }
    }
)
def fetch_wechat_article(url: str) -> dict:
    if not url.startswith("https://mp.weixin.qq.com"):
        return {"error": "不是微信公众号链接"}
    
    headers = {"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)..."}
    r = httpx.get(url, headers=headers, timeout=20)
    
    # 提取正文(简化版,真实代码可能需要解析 HTML)
    return {
        "title": "...",  # 从 <title> 提取
        "content": r.text[:5000],
        "url": url,
    }

register(fetch_wechat_article)
```

## 工具调用的 JSON Schema

`parameters` 字段是 OpenAI function calling 兼容格式:

```json
{
  "type": "object",
  "required": ["query"],
  "properties": {
    "query": { "type": "string", "description": "搜索关键词" },
    "limit": { "type": "integer", "default": 10 },
    "lang": { "type": "string", "enum": ["zh", "en"] }
  }
}
```

## 调试技能

```bash
# 在 venv 里
pip install -e ./my-skill

# 启动 hermes 时打开 debug log
HERMES_LOG_LEVEL=DEBUG ~/.u-hermes/venv/bin/hermes gateway run

# 看日志
tail -f ~/.u-hermes/data/logs/agent.log | grep "tool"
```

Web UI 试调用,看到 tool_call 输入输出。

## 安全性

::: warning 越权风险
技能默认有完整文件 / 网络权限。如果你的技能要发布,务必:

- 在 `manifest.json` 里声明最小 `permissions`
- 用户输入做白名单 / 路径校验
- 不要 `eval()` 或 shell 拼接用户输入
:::

## 发布到技能市场

详见 [提交技能](/zh/market/submit)。一句话:把 `manifest.json` 的元数据填进 `skills.json`,提 PR。

## 高级:多工具技能 + 状态

技能可以包含多个 tool 共享状态:

```python
class GitSkill:
    def __init__(self):
        self.repo_path = None
    
    @skill(name="git_init", description="初始化 git 仓库")
    def init(self, path: str) -> str:
        self.repo_path = path
        # ...
    
    @skill(name="git_commit", description="commit")
    def commit(self, message: str) -> str:
        if not self.repo_path:
            return "先用 git_init"
        # ...

register(GitSkill())
```

## 常见问题

**Q: 注册了但 Hermes 不调用我的 skill**
检查 `description` 写得够清楚,LLM 看 description 决定要不要调。

**Q: 想本地测不挂 hermes**

```python
# 直接调函数测
print(hello_world(name="测试"))
```

**Q: 怎么读 .env 配置**

```python
import os
api_key = os.getenv("MY_SKILL_API_KEY")
```

## 下一步

- [提交到技能市场](/zh/market/submit) — 让别人用上你的技能
- [浏览技能市场](/zh/market/) — 看别人写了什么
- [Hermes 写代码](/zh/tutorials/coding-with-hermes) — 用 Hermes 帮你写新技能

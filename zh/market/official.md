# 官方技能

NousResearch 官方维护、随 hermes-agent 默认装的核心技能。

<SkillGrid filter="official" />

## 关于"官方"

这一组的特点:
- 跟着 `hermes-agent` 包一起发布,无需额外 `pip install`
- 接口稳定,版本号跟随 hermes-agent
- 测试覆盖 > 80%
- 出了 bug 由 NousResearch 官方修

如果你想做一个能进入"官方"列表的技能,得提 PR 到 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent),通过其 review。

## 内置工具的最小用法

每个内置工具都对应 hermes 的一个 tool block。你不需要手动导入,Agent 推理时自己会调。

```python
# 不要手动调,Agent 自己用
# user: "帮我看看 README 写了啥"
# agent 自动调:
shell.run("cat README.md")
file.read("README.md")
```

调试时可以直接看 gateway 日志里的 tool_call 部分:

```
[tool] file.read path=README.md size=2KB
[tool] shell.run cmd=ls timeout=10
```

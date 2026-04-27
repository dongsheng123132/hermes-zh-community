---
title: 技能市场
---

# 技能市场

发现并安装 Agent 能力。Hermes 的技能 = 工具(tool) + prompt 调优 + 模型路由。

<SkillGrid />

## 怎么贡献

任何人都可以提交一个技能。流程见 [提交技能](/zh/market/submit)。

## 常见问题

**Q: 怎么知道一个技能安全?**

官方(orange)技能由 NousResearch 维护,直接信任。
认证(blue)技能由社区核心成员审核。
社区(gray)技能你需要看源码自己判断 — 推荐先看 repo 链接。

**Q: 装了之后怎么开启?**

```bash
hermes skill list                  # 看已安装
hermes skill register <name>       # 注册到当前会话
```

**Q: 装错了怎么卸?**

```bash
hermes skill remove <skill_id>
```

**Q: 我能做闭源技能商用吗?**

可以,但要自己拉数据流(用户的 API Key、对话内容)边界 — Hermes 本身只负责调用,不负责审计你的技能合规。

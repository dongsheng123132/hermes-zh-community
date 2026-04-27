# 贡献指南

任何人都可以贡献,文档错字、技能、教程都欢迎。

## 我能贡献什么

| 类型 | 提到哪 |
|---|---|
| 文档错字 / 链接失效 | [hermes-zh](https://github.com/dongsheng123132/hermes-zh) (规划中) issue / PR |
| 新技能上架 | [提交技能](/zh/market/submit) |
| 新教程 | PR 到 `zh/blog/`(规划中) |
| 翻译 en / ja | PR 到 `en/` / `ja/` |
| 上游 hermes-agent 代码 / bug | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) |
| Linux Live USB 脚本改进 | [dongsheng123132/u-hermes](https://github.com/dongsheng123132/u-hermes) |
| 新主题 / UI 组件 | 同 hermes-zh |

## PR 流程

```bash
# 1. Fork
# 2. clone 你的 fork
git clone https://github.com/<你的id>/hermes-zh.git
cd hermes-zh

# 3. 装依赖
npm install

# 4. 起本地 dev
npm run docs:dev

# 5. 改完跑校验
npm run docs:build      # build 必须过
npm run lint:secrets    # 不能泄露闭源密钥
npm run lint:skills     # 改了 skills.json 必跑

# 6. 提 PR,描述清楚改了什么
```

## 文档约定

- **中文优先**,标点用全角(中文逗号、句号),英文 / 数字前后加空格(`hermes-agent 是 MIT 协议`)
- 标题层级:`h1` 只能有一个,从 `h2` 开始
- 代码块务必标语言(```bash / ```python / ```json)
- 新增页面要在 `.vitepress/config.mts` 的 `sidebar` 里挂上,否则打不开
- 链接用 `/zh/xxx` 绝对路径,不要相对路径

## 写作风格

- **直接、动词为主**:"装 hermes" 不要 "可以考虑安装一下 hermes"
- **不臭长**:一段话超过 4 行就拆
- **代码先于解释**:能用一段命令说明白的,不要先讲 5 段理论
- **真实场景**:举例用真命令、真路径,不要 `xxx` `your-key-here`
- **avoid 营销话术**:不要 "极致体验"、"颠覆性"、"全新升级"

## 闭源边界

::: danger 严禁
本仓库**绝对禁止**包含以下任何内容(它们属于商业版闭源仓库 `u-hermes-portable`):

- ED25519 dealer 公钥 / 私钥
- 任何 `uclaw` activate secret
- USB 指纹算法实现
- 虾盘云 `/recharge/activate` 调用
- 任何长 `sk-...` 形式的真实 API Key
- Electron launcher 的源码
- 制盘脚本中调用云激活 API 的部分
:::

提 PR 前自己跑一遍:

```bash
npm run lint:secrets
```

CI 会自动跑同样检查,没过的 PR 不会合并。

## Code Review

- 一般 7 天内有反馈
- 维护者会在 PR 里给具体修改建议
- 改完 push 即可,不用关 PR 重开

## 联系

- 微信:`hecare888`
- Email:`hefangsheng@gmail.com`
- GitHub: `@dongsheng123132`

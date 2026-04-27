# 提交技能

把你的技能加到本社区站的市场页。

## 步骤

### 1. 准备一个公开仓库

GitHub / GitLab / Gitee 都行,公开可访问即可。

仓库根目录至少要有:
- `README.md`(中文 / 英文)
- `LICENSE`(MIT / Apache 2 / BSD 推荐)
- 安装命令(`pip install <pkg>` 或 `hermes skill install <id>`)

### 2. 准备 skill 描述 JSON

按下面格式准备好一段 JSON,你 PR 里需要把它加到 `.vitepress/data/skills.json` 的 `skills` 数组末尾:

```json
{
  "skill_id": "my-awesome-skill",
  "name": "我的酷炫技能",
  "category": "community",
  "author": "你的名字 / GitHub ID",
  "author_url": "https://github.com/your-id",
  "version": "0.1.0",
  "description": "一句话说清楚这个技能干啥的,30 个字以内",
  "install_cmd": "hermes skill install my-awesome-skill",
  "repo": "https://github.com/your-id/my-awesome-skill",
  "homepage": "https://example.com",
  "tags": ["tag1", "tag2"]
}
```

字段说明:

| 字段 | 必填 | 说明 |
|---|---|---|
| `skill_id` | ✅ | 全站唯一 slug,小写 + 连字符 |
| `name` | ✅ | 显示名,中文优先 |
| `category` | ✅ | `community`(自荐时)/ `certified`(审核后) |
| `author` | ✅ | 作者名 |
| `version` | ✅ | semver |
| `description` | ✅ | 30 字以内 |
| `install_cmd` | ✅ | 一行 / 多行皆可 |
| `repo` | 推荐 | 公开仓库 |
| `tags` | 推荐 | 便于搜索 |

### 3. Fork + PR

```bash
git clone https://github.com/dongsheng123132/hermes-zh.git
cd hermes-zh

# 编辑 .vitepress/data/skills.json,把你的对象 push 到 skills 数组末尾
# 跑校验
npm run lint:skills

# 提 PR
git checkout -b add-my-skill
git add .vitepress/data/skills.json
git commit -m "skills: add my-awesome-skill"
git push origin add-my-skill
```

::: tip
仓库 `dongsheng123132/hermes-zh` 还在规划中。在它建好之前,可以在 [GitHub Discussions](/discussions) 发布技能,或加微信群让维护者代为收录。
:::

### 4. CI 通过 + Review

提 PR 后会自动跑:
- `npm run lint:skills` — JSON schema 校验
- `npm run docs:build` — 整站 build 不报错

review 通过后合并,你的技能立刻出现在 [技能市场](/zh/market/) 的"社区"分类。

## 升级 / 维护

技能更新后,在你的仓库 release 新版本,然后再来一次 PR 改 `version` 字段就行。

如果一年内没更新且 issue 没回应,核心成员可能把你的技能标为 deprecated 或下架。

## 进入"认证"列表

详见 [认证标准](/zh/market/certified#认证标准)。简言之:活跃维护 + 代码 review + 安全性 OK。

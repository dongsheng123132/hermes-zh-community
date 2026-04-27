# 从源码安装

适合贡献者、二次开发者。

## 克隆上游

```bash
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent

# 建 venv
python3 -m venv .venv
source .venv/bin/activate

# 装开发依赖
pip install -e ".[dev]"

# 跑测试
pytest

# 启动 gateway
hermes gateway run
```

## 中文社区 fork

如果想基于中文便携 fork 二次开发(改 launcher / Linux Live 脚本):

```bash
git clone https://github.com/dongsheng123132/u-hermes.git
cd u-hermes
```

注意:`u-hermes` 仓库只包含**开源部分**(官网 + Linux Live 制盘脚本)。Windows 启动器、虾盘云对接、激活逻辑属于闭源仓库,**不在此处**。

## 贡献流程

1. Fork
2. 提 PR 到对应仓库:
   - 上游核心:[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
   - 中文便携:[dongsheng123132/u-hermes](https://github.com/dongsheng123132/u-hermes)
   - 本社区站:[dongsheng123132/hermes-zh](https://github.com/dongsheng123132/hermes-zh)(规划中)
3. PR 合并前会跑 CI(lint + test)
4. 详见 [贡献指南](/zh/community/contributing)

## 二次发行

`hermes-agent` 是 MIT 协议,你可以自由 fork、改名、商业化。请保留 NOTICE 文件并明确标注与上游的关系。

## 商标提醒

- "Hermes" 不等于 NousResearch — Hermes 是希腊神话人物,作为通用名词没有商标。
- "NousResearch" 是 NousResearch 公司的商标,你的 fork 不要冒充其官方。
- "U-Hermes 马盘" 是中文便携版的产品命名,商业版 U 盘归 [u-hermes.org](https://u-hermes.org)。

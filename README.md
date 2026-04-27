# U-Hermes 中文社区站 (zh.u-hermes.org)

基于 [NousResearch hermes-agent](https://github.com/NousResearch/hermes-agent) 的中文文档与社区入口,部署在 `zh.u-hermes.org`(`u-hermes.org` 主域子域)。

## 站点定位(终版,3 站)

- `u-hermes.org` —— 商业版 U-Hermes 马盘官网(卖货)
- `study.u-hermes.org` —— 客户售后教程(已买盘的用户手册)
- **`zh.u-hermes.org`(本站)** —— 中文社区门户 + 实体书全文 + 技能市场 + 开发者文档

## 本地开发

```bash
npm install
npm run docs:dev
# 浏览器开 http://localhost:5173
```

## 构建与预览

```bash
npm run docs:build
npm run docs:preview
```

## 部署

绑 Vercel 仓库,框架自动识别为 VitePress。`vercel.json` 已配置 build 命令、输出目录、redirects。

## 提交前安全网

```bash
npm run lint:secrets   # 扫描是否泄露 u-hermes-pro 闭源密钥/算法
npm run lint:skills    # 校验 skills.json schema
```

## 目录约定

- `zh/` — 中文(默认)
- `en/` — English (Phase 2)
- `ja/` — 日本語 (Phase 3 占位)
- `.vitepress/` — 配置 + 主题 + 自定义组件
- `public/` — 静态资源(logo/favicon/QR/og-image)
- `scripts/` — build 期辅助脚本

## 与商业版的边界

本仓库**仅**包含开源文档、技能市场、社区入口。商业版 U-Hermes 启动器、虾盘云激活、USB 指纹算法、ED25519 签名等闭源逻辑**严禁**进入本仓库。详见 `zh/about/disclaimer.md`。

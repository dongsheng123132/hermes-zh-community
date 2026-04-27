<script setup lang="ts">
// 落地页二级 hero,放在 layout: home 下方,补充一段产品定位文案
</script>

<template>
  <section class="hermes-section">
    <div class="positioning">
      <div class="pill">🐎 NousResearch hermes-agent · 中文便携版</div>
      <h2 class="hermes-h2">不只是聊天框,是会写代码的 AI 同事</h2>
      <p class="hermes-lead">
        Hermes 是 NousResearch 出品的开源 AI Agent —— 它能用 shell 跑命令、用浏览器查资料、读写本地文件、调 API,像同事一样多步推理。
        <strong>U-Hermes 中文社区</strong> 把它打包成可以装在 U 盘里随身带走的便携版,
        中文文档、国产模型直连、对话记忆和技能都在 U 盘里,换电脑无感迁移。
      </p>
      <ul class="value-list">
        <li>🇨🇳 国产模型直连(DeepSeek / 通义 / Kimi / GLM / 文心),不用翻墙</li>
        <li>💼 配置/历史/技能跟着 U 盘走,公司、家、咖啡店一致体验</li>
        <li>🏠 ollama 集成,可全离线跑 Qwen / DeepSeek-R1 / Llama</li>
        <li>🛠 MIT 协议,Linux Live USB 方案完全开源</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.positioning {
  max-width: 880px;
  margin: 0 auto;
  text-align: left;
}
.pill {
  display: inline-block;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
}
.value-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: grid;
  gap: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
</style>

<script setup lang="ts">
// 对应 OpenClaw 中文社区的"关于本项目"区段
</script>

<template>
  <section class="hermes-section">
    <h2 class="hermes-h2">📢 关于本项目</h2>
    <div class="about">
      <p>
        <strong>Hermes 中文社区</strong> 是 NousResearch <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener"><code>hermes-agent</code></a> 在中国的官方文档与社区门户。我们专注于:
      </p>
      <ul>
        <li><strong>中文文档</strong> — 把上游英文文档翻译成更适合中文开发者阅读的版本,补充国产模型(DeepSeek / 通义 / Kimi / GLM)的对接踩坑总结</li>
        <li><strong>教程矩阵</strong> — 从"Hermes 是什么"到"自定义技能开发",15+ 篇分阶段教程</li>
        <li><strong>技能市场</strong> — 让中文社区贡献的 Hermes 技能能被发现、被复用</li>
        <li><strong>社区入口</strong> — GitHub Discussions + 微信群双轨答疑,中国时区在线</li>
        <li><strong>便携 U 盘方案</strong> — Linux Live USB 制盘脚本 + Windows 商业 U 盘成品两条路</li>
      </ul>
      <p class="meta">
        本项目基于 <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT 协议</a>,文档采用
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>。
        Hermes / NousResearch 是其各自所有者的商标。
        商业版 U-Hermes 马盘由 <a href="https://u-hermes.org" target="_blank" rel="noopener">u-hermes.org</a> 运营。
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  font-size: 14px;
  line-height: 1.75;
}
.about ul {
  margin: 12px 0;
  padding-left: 20px;
}
.about li {
  margin: 6px 0;
  color: var(--vp-c-text-2);
}
.about li strong {
  color: var(--vp-c-text-1);
}
.about p.meta {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>

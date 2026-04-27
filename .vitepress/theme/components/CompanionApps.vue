<script setup lang="ts">
// 对应 OpenClaw 的"伴侣应用"区域
const apps = [
  {
    name: 'U-Hermes 马盘',
    icon: '🐎',
    desc: 'Windows 便携 U 盘成品,内置 U-Claw + U-Hermes 双应用,插上 U 盘双击 .exe 起图形界面。',
    url: 'https://u-hermes.org',
    badge: '商业版',
  },
  {
    name: 'OpenClaw 中文社区',
    icon: '🦞',
    desc: '姊妹站。OpenClaw(通用 AI + IM 机器人)的中文文档与社区。',
    url: 'https://clawd.org.cn',
    badge: '友情站',
  },
  {
    name: 'NousResearch hermes-agent',
    icon: '🐙',
    desc: '上游项目。本社区的所有内容都基于此项目。MIT 协议。',
    url: 'https://github.com/NousResearch/hermes-agent',
    badge: '上游',
  },
  {
    name: 'u-hermes(开源版)',
    icon: '📦',
    desc: 'Linux Live USB 制盘脚本 + 官网。MIT 协议,完全开源。',
    url: 'https://github.com/dongsheng123132/u-hermes',
    badge: '开源仓库',
  },
]
</script>

<template>
  <section class="hermes-section">
    <h2 class="hermes-h2">📱 伴侣应用</h2>
    <p class="hermes-lead">和 Hermes 一起用更顺手的姊妹工具。</p>
    <div class="grid">
      <a v-for="a in apps" :key="a.name" :href="a.url" target="_blank" rel="noopener" class="hermes-card app">
        <div class="head">
          <span class="ic">{{ a.icon }}</span>
          <h3>{{ a.name }}</h3>
          <span class="badge">{{ a.badge }}</span>
        </div>
        <p>{{ a.desc }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
  margin-top: 12px;
}
.app {
  text-decoration: none;
  color: inherit;
  display: block;
}
.head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.ic {
  font-size: 24px;
}
.head h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  flex: 1;
  color: var(--vp-c-text-1);
}
.badge {
  font-size: 11px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 500;
}
.app p {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}
</style>

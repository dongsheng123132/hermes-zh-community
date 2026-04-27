<script setup lang="ts">
// 对应 OpenClaw 中文社区的"加入社区"区段
const channels = [
  {
    icon: '💬',
    name: 'GitHub Discussions',
    desc: '英文 / 中文都行。最适合提 bug、想法、求帮助。',
    cta: '打开 Discussions',
    url: 'https://github.com/dongsheng123132/u-hermes/discussions',
  },
  {
    icon: '🍵',
    name: '微信群',
    desc: '中文用户最活跃的地方。加 hecare888 备注 hermes 拉群。',
    cta: '查看微信二维码',
    url: '/zh/sponsor/',
  },
  {
    icon: '✈️',
    name: 'Telegram 群',
    desc: '海外用户首选,讨论英文 / 跨境话题。',
    cta: '联系 @dsds8848',
    url: 'https://t.me/dsds8848',
  },
  {
    icon: '🐦',
    name: 'X / Twitter',
    desc: '关注获取 hermes-agent 上游动态推送。',
    cta: '@Bitplus888',
    url: 'https://x.com/Bitplus888',
  },
  {
    icon: '📕',
    name: '小红书',
    desc: '查看实操教程视频、用户案例分享。',
    cta: '关注 U-Hermes 马盘',
    url: '/xhs-qr.jpg',
  },
  {
    icon: '🐙',
    name: 'GitHub Star',
    desc: '在上游和中文 fork 仓库 Star,帮助项目被更多人发现。',
    cta: '⭐ Star',
    url: 'https://github.com/NousResearch/hermes-agent',
  },
]
</script>

<template>
  <section class="hermes-section">
    <h2 class="hermes-h2">🌐 加入社区</h2>
    <p class="hermes-lead">在中国时区,你能在 24 小时内拿到回复。</p>
    <div class="grid">
      <a v-for="c in channels" :key="c.name" :href="c.url" target="_blank" rel="noopener" class="hermes-card item">
        <div class="head">
          <span class="ic">{{ c.icon }}</span>
          <h3>{{ c.name }}</h3>
        </div>
        <p>{{ c.desc }}</p>
        <span class="cta">{{ c.cta }} →</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin-top: 12px;
}
.item {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
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
}
.item p {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 12px;
  flex: 1;
}
.cta {
  font-size: 12.5px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>

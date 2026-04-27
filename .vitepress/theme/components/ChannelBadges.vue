<script setup lang="ts">
// 对齐 OpenClaw 中文社区(clawd.org.cn)的 12 渠道布局
const channels = [
  { icon: '📨', name: '飞书', status: '✅ 已支持' },
  { icon: '💚', name: 'WhatsApp', status: '✅ 已支持' },
  { icon: '✈️', name: 'Telegram', status: '✅ 已支持' },
  { icon: '🎮', name: 'Discord', status: '✅ 已支持' },
  { icon: '💬', name: 'Slack', status: '✅ 已支持' },
  { icon: '🔵', name: '钉钉', status: '✅ 已支持' },
  { icon: '🏢', name: '企业微信', status: '✅ 已支持' },
  { icon: '🐧', name: 'QQ 机器人', status: '✅ 已支持' },
  { icon: '🔒', name: 'Signal', status: '✅ 已支持' },
  { icon: '💚', name: '微信', status: '✅ 已支持' },
  { icon: '📱', name: 'iMessage', status: '🔧 计划中' },
  { icon: '🔌', name: 'Mattermost', status: '🔧 计划中' },
]
</script>

<template>
  <section class="hermes-section">
    <h2 class="hermes-h2">💬 支持的消息渠道</h2>
    <p class="hermes-lead">通过钉钉、企业微信、飞书、QQ、微信、Telegram、Discord 与 Hermes 对话。支持私聊和群聊。</p>
    <div class="grid">
      <div v-for="c in channels" :key="c.name" class="badge">
        <div class="ic">{{ c.icon }}</div>
        <div class="info">
          <div class="n">{{ c.name }}</div>
          <div class="d">{{ c.status }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  margin-top: 12px;
}
.badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.15s, transform 0.15s;
}
.badge:hover {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}
.ic {
  font-size: 24px;
}
.info {
  flex: 1;
}
.n {
  font-size: 13.5px;
  font-weight: 600;
}
.d {
  font-size: 11.5px;
  color: var(--vp-c-text-3);
}
</style>

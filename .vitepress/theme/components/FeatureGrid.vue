<script setup lang="ts">
// 对齐 OpenClaw 中文社区 6 张特性卡的姿态,同款话语只换主角
const features = [
  {
    icon: '🖥️',
    title: '运行在你的设备上',
    text: 'Mac、Windows 或 Linux。DeepSeek、通义、OpenAI、Anthropic 或本地 Ollama 模型。默认私有 — 你的数据属于你自己。',
  },
  {
    icon: '💬',
    title: '任意聊天应用',
    text: '通过钉钉、企业微信、飞书、QQ、微信、Telegram、Discord 与它对话。支持私聊和群聊。',
  },
  {
    icon: '🧠',
    title: '持久记忆',
    text: '记住你的一切并成为独一无二的你的 AI。你的偏好、你的上下文、你的 AI。',
  },
  {
    icon: '🌐',
    title: '浏览器控制',
    text: '它可以浏览网页、填写表单、从任何网站提取数据。Playwright 驱动,真实浏览器执行。',
  },
  {
    icon: '🔧',
    title: '完整系统访问',
    text: '读写文件、运行 Shell 命令、执行 Python 脚本。完全访问或沙箱模式 — 由你选择。',
  },
  {
    icon: '🔌',
    title: '技能与插件',
    text: '使用社区技能扩展或自己构建。Hermes 甚至可以自己编写技能。',
  },
]
</script>

<template>
  <section class="hermes-section">
    <h2 class="hermes-h2">核心能力</h2>
    <p class="hermes-lead">真正能做事的 AI Agent — 不是聊天机器人。</p>
    <div class="grid">
      <div v-for="f in features" :key="f.title" class="hermes-card feat">
        <div class="ico">{{ f.icon }}</div>
        <h3>{{ f.title }}</h3>
        <p>{{ f.text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.feat .ico {
  font-size: 32px;
  margin-bottom: 12px;
}
.feat h3 {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 8px;
}
.feat p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin: 0;
}
</style>

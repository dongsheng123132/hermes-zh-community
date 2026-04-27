<script setup lang="ts">
// 拉 PyPI 下载统计(类比 OpenClaw 的 npm 下载量区域)
import { ref, onMounted } from 'vue'

interface Stats {
  pkg: string
  url: string
  badges: { label: string; img: string }[]
}

const items = ref<Stats[]>([
  {
    pkg: 'hermes-agent',
    url: 'https://pypi.org/project/hermes-agent/',
    badges: [
      { label: '版本', img: 'https://img.shields.io/pypi/v/hermes-agent?style=flat&color=f97316&label=PyPI' },
      { label: '月下载', img: 'https://static.pepy.tech/badge/hermes-agent/month' },
      { label: '总下载', img: 'https://static.pepy.tech/badge/hermes-agent' },
      { label: 'Python', img: 'https://img.shields.io/pypi/pyversions/hermes-agent?style=flat&color=3b82f6' },
      { label: '协议', img: 'https://img.shields.io/pypi/l/hermes-agent?style=flat&color=22c55e' },
    ],
  },
])

const githubStars = ref<Record<string, string>>({})

onMounted(async () => {
  const repos = [
    { key: 'upstream', repo: 'NousResearch/hermes-agent' },
    { key: 'fork', repo: 'dongsheng123132/u-hermes' },
  ]
  for (const r of repos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${r.repo}`, { signal: AbortSignal.timeout(3000) })
      if (res.ok) {
        const data = await res.json()
        githubStars.value[r.key] = `${data.stargazers_count} ★`
      }
    } catch {
      // 静默
    }
  }
})
</script>

<template>
  <section class="hermes-section">
    <h2 class="hermes-h2">📦 项目统计</h2>
    <p class="hermes-lead">实时拉取 PyPI 与 GitHub 数据。</p>
    <div class="stats">
      <div v-for="s in items" :key="s.pkg" class="card">
        <a :href="s.url" target="_blank" rel="noopener" class="title"><code>{{ s.pkg }}</code></a>
        <div class="badges">
          <img v-for="b in s.badges" :key="b.label" :src="b.img" :alt="b.label" loading="lazy" />
        </div>
      </div>
      <div class="card">
        <span class="title">GitHub Stars</span>
        <div class="github">
          <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noopener">
            <strong>NousResearch/hermes-agent</strong>
            <span class="star">{{ githubStars.upstream || '—' }}</span>
          </a>
          <a href="https://github.com/dongsheng123132/u-hermes" target="_blank" rel="noopener">
            <strong>dongsheng123132/u-hermes</strong>
            <span class="star">{{ githubStars.fork || '—' }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 14px;
  margin-top: 12px;
}
.card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 18px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.title code {
  font-size: 14px;
  color: var(--vp-c-brand-1);
}
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.badges img {
  height: 22px;
}
.github {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}
.github a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font-size: 13px;
}
.github a:hover {
  border-color: var(--vp-c-brand-2);
}
.star {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 13px;
}
</style>

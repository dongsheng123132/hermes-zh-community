<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Release {
  tag_name: string
  name: string
  html_url: string
  published_at: string
  body?: string
  prerelease?: boolean
}

const props = withDefaults(
  defineProps<{
    repo?: string
    limit?: number
  }>(),
  { repo: 'NousResearch/hermes-agent', limit: 10 },
)

const releases = ref<Release[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const r = await fetch(`https://api.github.com/repos/${props.repo}/releases?per_page=${props.limit}`, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    releases.value = await r.json()
  } catch (e: any) {
    error.value = e?.message || '加载失败'
  } finally {
    loading.value = false
  }
})

function fmtDate(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function summarize(body?: string) {
  if (!body) return ''
  // 取前 200 字,去掉 markdown 头标记
  return body.replace(/^#+\s+/gm, '').slice(0, 240).trim() + (body.length > 240 ? '…' : '')
}
</script>

<template>
  <div class="rel-shell">
    <div v-if="loading" class="state">⏳ 加载 {{ repo }} 的 Releases…</div>
    <div v-else-if="error" class="state err">
      ⚠ 拉取失败({{ error }})。请直接看
      <a :href="`https://github.com/${repo}/releases`" target="_blank" rel="noopener">GitHub Releases</a>。
    </div>
    <div v-else-if="releases.length === 0" class="state">暂无 release。</div>
    <ul v-else class="rel-list">
      <li v-for="r in releases" :key="r.tag_name" class="rel-item">
        <div class="head">
          <a :href="r.html_url" target="_blank" rel="noopener" class="tag">{{ r.tag_name }}</a>
          <span v-if="r.prerelease" class="pre">pre-release</span>
          <span class="date">{{ fmtDate(r.published_at) }}</span>
        </div>
        <h3 v-if="r.name && r.name !== r.tag_name">{{ r.name }}</h3>
        <p class="body">{{ summarize(r.body) }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.state {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}
.state.err {
  color: var(--vp-c-warning-1, #d97706);
}
.rel-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}
.rel-item {
  border: 1px solid var(--vp-c-divider);
  border-left: 3px solid var(--vp-c-brand-2);
  border-radius: 8px;
  padding: 14px 18px;
  background: var(--vp-c-bg-soft);
}
.head {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}
.tag {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 14px;
}
.pre {
  font-size: 11px;
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
  padding: 2px 8px;
  border-radius: 999px;
}
.date {
  margin-left: auto;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
.rel-item h3 {
  font-size: 15px;
  margin: 8px 0 4px;
}
.body {
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin: 4px 0 0;
  line-height: 1.7;
  white-space: pre-wrap;
}
</style>

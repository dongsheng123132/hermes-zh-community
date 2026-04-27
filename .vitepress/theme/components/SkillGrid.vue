<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SkillCard from './SkillCard.vue'
import skillsStatic from '../../data/skills.json'

interface Skill {
  skill_id: string
  name: string
  category: string
  author: string
  author_url?: string
  version: string
  description: string
  install_cmd: string
  repo?: string
  homepage?: string
  tags?: string[]
}

interface SkillsData {
  version: string
  updated: string
  categories: Array<{ id: string; name: string; color?: string }>
  skills: Skill[]
}

const props = defineProps<{
  /** 限定显示的 category id,留空显示全部 */
  filter?: string
}>()

const data = ref<SkillsData>(skillsStatic as SkillsData)
const search = ref('')
const activeCat = ref<string>(props.filter || 'all')

onMounted(async () => {
  // 优先尝试从远端 API 拉,失败回退静态文件
  try {
    const r = await fetch('/api/skills.json', { signal: AbortSignal.timeout(2500) })
    if (r.ok) {
      const fresh = (await r.json()) as SkillsData
      if (fresh?.skills) data.value = fresh
    }
  } catch {
    // 静默失败,用静态数据
  }
})

const filtered = computed(() => {
  let arr = data.value.skills
  if (activeCat.value !== 'all') arr = arr.filter(s => s.category === activeCat.value)
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    arr = arr.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags?.some(t => t.toLowerCase().includes(q))
    )
  }
  return arr
})

const catName = (id: string) => data.value.categories.find(c => c.id === id)?.name ?? id
</script>

<template>
  <div class="skill-shell">
    <div class="toolbar">
      <input v-model="search" type="search" placeholder="搜索技能(名称 / 描述 / 标签)" class="search" />
      <div class="cats">
        <button :class="['chip', { active: activeCat === 'all' }]" @click="activeCat = 'all'">全部</button>
        <button
          v-for="c in data.categories"
          :key="c.id"
          :class="['chip', { active: activeCat === c.id }]"
          @click="activeCat = c.id"
        >
          {{ c.name }}
        </button>
      </div>
    </div>
    <div v-if="filtered.length === 0" class="empty">暂无匹配的技能。<a href="/zh/market/submit">提交一个 →</a></div>
    <div v-else class="grid">
      <SkillCard v-for="s in filtered" :key="s.skill_id" :skill="s" :category-name="catName(s.category)" />
    </div>
    <p class="updated">最后更新:{{ data.updated }}</p>
  </div>
</template>

<style scoped>
.skill-shell {
  margin: 16px 0;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}
.search {
  flex: 1;
  min-width: 240px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-family: inherit;
}
.search:focus {
  outline: none;
  border-color: var(--vp-c-brand-2);
}
.cats {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.chip {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 12.5px;
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
}
.chip.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}
.empty {
  text-align: center;
  padding: 40px 16px;
  color: var(--vp-c-text-3);
}
.empty a {
  color: var(--vp-c-brand-1);
}
.updated {
  text-align: right;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 16px;
}
</style>

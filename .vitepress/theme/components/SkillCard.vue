<script setup lang="ts">
defineProps<{
  skill: {
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
  categoryName?: string
}>()
</script>

<template>
  <article class="skill-card">
    <header>
      <div class="title-row">
        <h3>{{ skill.name }}</h3>
        <span v-if="categoryName" :class="['cat', skill.category]">{{ categoryName }}</span>
      </div>
      <div class="meta">
        <span>v{{ skill.version }}</span>
        <span class="dot">·</span>
        <a v-if="skill.author_url" :href="skill.author_url" target="_blank" rel="noopener">{{ skill.author }}</a>
        <span v-else>{{ skill.author }}</span>
      </div>
    </header>
    <p class="desc">{{ skill.description }}</p>
    <pre v-if="skill.install_cmd" class="install"><code>{{ skill.install_cmd }}</code></pre>
    <div v-if="skill.tags?.length" class="tags">
      <span v-for="t in skill.tags" :key="t" class="tag">#{{ t }}</span>
    </div>
    <div class="actions">
      <a v-if="skill.repo" :href="skill.repo" target="_blank" rel="noopener" class="btn">仓库</a>
      <a v-if="skill.homepage" :href="skill.homepage" class="btn">详情</a>
    </div>
  </article>
</template>

<style scoped>
.skill-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  transition: all 0.18s;
}
.skill-card:hover {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
}
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}
h3 {
  font-size: 15.5px;
  font-weight: 600;
  margin: 0;
}
.cat {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 500;
}
.cat.official {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.cat.certified {
  background: rgba(59, 130, 246, 0.14);
  color: #3b82f6;
}
.cat.community {
  background: rgba(120, 120, 120, 0.14);
  color: var(--vp-c-text-2);
}
.meta {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}
.meta a {
  color: var(--vp-c-text-3);
  text-decoration: none;
}
.meta .dot {
  margin: 0 6px;
}
.desc {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin: 0 0 12px;
  flex: 1;
}
.install {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  margin: 0 0 10px;
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  overflow-x: auto;
}
.install code {
  background: transparent;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}
.tag {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.actions {
  display: flex;
  gap: 8px;
}
.btn {
  font-size: 12px;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  background: var(--vp-c-bg);
}
.btn:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}
</style>

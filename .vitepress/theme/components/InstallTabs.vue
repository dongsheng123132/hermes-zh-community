<script setup lang="ts">
import { ref } from 'vue'

// 对齐 OpenClaw 中文社区 (clawd.org.cn) 的 4 类安装方式 + 国内镜像选项
const tabs = [
  {
    id: 'script',
    label: 'macOS / Linux / WSL2',
    cmd: `# 一键脚本(自动检测 Python / 装 venv / 装 hermes-agent)
curl -fsSL https://hermes.org.cn/install.sh | bash

# 国内镜像(清华源)
curl -fsSL https://hermes.org.cn/install.sh | bash -s -- --pypi-mirror https://pypi.tuna.tsinghua.edu.cn/simple`,
  },
  {
    id: 'pwsh',
    label: 'Windows (PowerShell)',
    cmd: `# 一键脚本(PowerShell)
iwr -useb https://hermes.org.cn/install.ps1 | iex

# 国内镜像
iwr -useb https://hermes.org.cn/install.ps1 -OutFile install.ps1
.\\install.ps1 -PypiMirror https://pypi.tuna.tsinghua.edu.cn/simple`,
  },
  {
    id: 'pip',
    label: 'pip (推荐)',
    cmd: `# 全球
pip install -U hermes-agent
hermes gateway run

# 国内镜像(清华源)
pip install -U hermes-agent -i https://pypi.tuna.tsinghua.edu.cn/simple`,
  },
  {
    id: 'docker',
    label: 'Docker',
    cmd: `# Docker Compose 一键起
curl -fsSL https://hermes.org.cn/docker-compose.yml -o docker-compose.yml
docker compose up -d

# 单容器
docker run -d -p 8642:8642 -p 8648:8648 \\
  -v ./data:/data \\
  -e DEEPSEEK_API_KEY=sk-xxx \\
  ghcr.io/dongsheng123132/hermes-agent:latest`,
  },
  {
    id: 'usb',
    label: 'U 盘绿色版',
    cmd: `# 商业 U 盘成品(¥199 起,Windows)
# 淘宝 / 拼多多 / 抖音搜 "U-Hermes 马盘"
# 收到 U 盘后:插上,双击 X:\\U-Hermes\\启动 U-Hermes.bat`,
  },
]

const active = ref(tabs[0].id)
const copied = ref(false)

function setActive(id: string) {
  active.value = id
}

async function copy(cmd: string) {
  try {
    await navigator.clipboard.writeText(cmd)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}
</script>

<template>
  <section class="hermes-section" id="install">
    <h2 class="hermes-h2">🚀 一键安装</h2>
    <p class="hermes-lead">按你的环境选一个,30 秒装好。详细步骤见 <a href="/zh/install/">安装指南</a>。</p>
    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['tab', { active: active === t.id }]"
        @click="setActive(t.id)"
      >
        {{ t.label }}
      </button>
    </div>
    <div v-for="t in tabs" v-show="active === t.id" :key="t.id" class="panel">
      <pre><code>{{ t.cmd }}</code></pre>
      <button class="copy" @click="copy(t.cmd)">{{ copied ? '✓ 已复制' : '复制' }}</button>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.tab {
  background: transparent;
  border: 0;
  padding: 8px 14px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  font-family: inherit;
}
.tab:hover {
  color: var(--vp-c-text-1);
}
.tab.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-2);
  font-weight: 500;
}
.panel {
  position: relative;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-top: 0;
  border-radius: 0 0 8px 8px;
  padding: 0;
}
.panel pre {
  margin: 0;
  padding: 16px 20px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.7;
  background: transparent;
  font-family: var(--vp-font-family-mono);
}
.copy {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.copy:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}
</style>

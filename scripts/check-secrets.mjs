#!/usr/bin/env node
// 提交前安全网:扫描是否误把 u-hermes-pro 闭源密钥/算法/secret 拷进社区站
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOT = process.cwd()
const SCAN_EXT = new Set(['.md', '.ts', '.mts', '.tsx', '.js', '.mjs', '.cjs', '.vue', '.json', '.html', '.css'])
const SKIP_DIRS = new Set(['node_modules', '.vitepress', '.git', '.vercel', 'dist', 'cache'])
// 这些文件**故意**包含禁词(规则定义本身、文档里的禁区清单、本扫描器自身)
const ALLOWLIST_FILES = new Set([
  'scripts/check-secrets.mjs',
  'README.md',
  'zh/community/contributing.md',
  'zh/about/disclaimer.md',
])

const PATTERNS = [
  { name: 'ED25519 dealer key', re: /\bED25519\b|dealer.{0,20}(public|private).{0,20}key/i },
  { name: 'uclaw activate secret', re: /uclaw2026activate|UCLAW_ACTIVATE_SECRET|UCLAW2026/ },
  { name: 'USB fingerprint algo', re: /\bSHA256\(\s*Model.{0,40}Serial.{0,40}PNP/i },
  { name: 'recharge activate endpoint', re: /\/recharge\/activate/ },
  { name: 'detectBestEndpoint', re: /\bdetectBestEndpoint\b/ },
  { name: 'apiKeyFromFingerprint', re: /\bapiKeyFromFingerprint\b/ },
  { name: 'long sk-* api key', re: /\bsk-[A-Za-z0-9]{30,}/ },
  { name: 'AIza* google key', re: /\bAIza[0-9A-Za-z_-]{30,}/ },
]

const hits = []

function relPath(p) {
  return p.replace(ROOT + '\\', '').replace(ROOT + '/', '').replace(/\\/g, '/')
}

function scanDir(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const p = join(dir, entry)
    const s = statSync(p)
    if (s.isDirectory()) {
      scanDir(p)
    } else if (SCAN_EXT.has(extname(entry))) {
      const rel = relPath(p)
      if (ALLOWLIST_FILES.has(rel)) continue
      const content = readFileSync(p, 'utf8')
      for (const { name, re } of PATTERNS) {
        const m = content.match(re)
        if (m) hits.push({ file: p, pattern: name, snippet: m[0].slice(0, 80) })
      }
    }
  }
}

scanDir(ROOT)

if (hits.length === 0) {
  console.log('✅ secrets check passed — no closed-source patterns leaked.')
  process.exit(0)
} else {
  console.error('❌ secrets check FAILED:')
  for (const h of hits) {
    console.error(`  [${h.pattern}] ${h.file}`)
    console.error(`    > ${h.snippet}`)
  }
  process.exit(1)
}

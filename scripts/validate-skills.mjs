#!/usr/bin/env node
// 校验 skills.json schema
import { readFileSync } from 'node:fs'

const PATH = '.vitepress/data/skills.json'
const data = JSON.parse(readFileSync(PATH, 'utf8'))

const errors = []
const seen = new Set()

if (data.version !== '1') errors.push(`version must be "1", got ${JSON.stringify(data.version)}`)
if (!Array.isArray(data.categories)) errors.push('categories must be array')
if (!Array.isArray(data.skills)) errors.push('skills must be array')

const validCats = new Set(data.categories?.map(c => c.id) || [])

for (const [i, s] of (data.skills || []).entries()) {
  const where = `skills[${i}] (${s.skill_id || '?'})`
  for (const k of ['skill_id', 'name', 'category', 'author', 'version', 'description', 'install_cmd']) {
    if (!s[k]) errors.push(`${where}: missing ${k}`)
  }
  if (s.skill_id && seen.has(s.skill_id)) errors.push(`${where}: duplicate skill_id`)
  seen.add(s.skill_id)
  if (s.category && !validCats.has(s.category)) {
    errors.push(`${where}: unknown category "${s.category}"`)
  }
  if (s.tags && !Array.isArray(s.tags)) errors.push(`${where}: tags must be array`)
}

if (errors.length === 0) {
  console.log(`✅ skills.json valid (${data.skills.length} skills, ${data.categories.length} categories)`)
  process.exit(0)
} else {
  console.error('❌ skills.json validation failed:')
  for (const e of errors) console.error('  ' + e)
  process.exit(1)
}

#!/usr/bin/env node
/**
 * Search the component catalog.
 *
 *   node scripts/find.mjs chart
 *   node scripts/find.mjs --free --source boardui sidebar
 *   node scripts/find.mjs --use chat
 */

import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const catalog = JSON.parse(
  readFileSync(join(root, "catalog/components.json"), "utf8")
)

const args = process.argv.slice(2)
let source = null
let useCase = null
let tier = null
const terms = []

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i]
  if (arg === "--free") tier = "free"
  else if (arg === "--pro") tier = "pro"
  else if (arg === "--source") source = args[++i]
  else if (arg === "--use") useCase = args[++i]
  else terms.push(arg.toLowerCase())
}

if (!terms.length && !useCase && !source && !tier) {
  console.log(
    "Usage: node scripts/find.mjs [--free|--pro] [--source easyui|boardui] [--use <case>] <query>"
  )
  console.log("Use cases:")
  for (const [name, ids] of Object.entries(catalog.groups)) {
    console.log(`  ${name} (${ids.length})`)
  }
  process.exit(0)
}

const matches = catalog.components.filter((item) => {
  if (tier === "free" && item.paid) return false
  if (tier === "pro" && !item.paid) return false
  if (source && item.source !== source) return false
  if (useCase && !item.use_cases.includes(useCase)) return false
  if (!terms.length) return true
  const hay = [
    item.name,
    item.slug,
    item.id,
    item.source,
    item.category,
    item.description,
    item.tier,
    item.local_path,
    ...(item.use_cases ?? []),
  ]
    .join(" ")
    .toLowerCase()
  return terms.every((term) => hay.includes(term))
})

if (!matches.length) {
  console.log(`No matches.`)
  process.exit(0)
}

console.log(`${matches.length} match${matches.length === 1 ? "" : "es"}\n`)
for (const item of matches.slice(0, 40)) {
  const paid = item.paid ? "PAID" : "free"
  console.log(`${item.name}  [${item.source} / ${paid}]`)
  console.log(`  use: ${(item.use_cases ?? []).join(", ")}`)
  console.log(`  ${item.description}`)
  if (item.local_path) console.log(`  file: ${item.local_path}`)
  else console.log("  file: not included (BoardUI Pro license required)")
  console.log(`  docs: ${item.url}`)
  console.log(`  install: ${item.install}`)
  console.log("")
}
if (matches.length > 40) {
  console.log(`… ${matches.length - 40} more. Narrow the query.`)
}

#!/usr/bin/env node
/**
 * Copy MIT component source into components/external.
 * Expects extracted GitHub trees:
 *   node scripts/pull-external.mjs <easyui-repo> <boardui-repo> <easyui-components.json>
 *
 * BoardUI Pro is not in the public repo and is not copied.
 */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"

const [easyRepo, boardRepo, easyIndexPath] = process.argv.slice(2)
if (!easyRepo || !boardRepo || !easyIndexPath) {
  console.error(
    "Usage: node scripts/pull-external.mjs <easyui-repo> <boardui-repo> <easyui-components.json>"
  )
  process.exit(1)
}

const root = join(dirname(new URL(import.meta.url).pathname), "..")
const easyOut = join(root, "components/external/easyui")
const boardOut = join(root, "components/external/boardui")

rmSync(easyOut, { recursive: true, force: true })
rmSync(boardOut, { recursive: true, force: true })

function writeText(dest, text) {
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, text)
}

function copyEasyFile(relFromSrc, destRel, rewrite) {
  const src = join(easyRepo, relFromSrc)
  let text = readFileSync(src, "utf8")
  if (rewrite) text = rewrite(text)
  writeText(join(root, destRel), text)
}

const uiDir = join(easyRepo, "src/components/ui")
for (const name of readdirSync(uiDir)) {
  if (name.endsWith(".meta.ts") || name.includes(".test.")) continue
  const dest = `components/external/easyui/ui/${name}`
  copyEasyFile(`src/components/ui/${name}`, dest, (text) =>
    text.replaceAll("../../lib/", "../lib/").replaceAll("../../types/", "../types/")
  )
}

const libFiles = [
  "src/lib/utils.ts",
  "src/lib/motion-tokens.ts",
  "src/lib/chart-primitives.tsx",
  "src/lib/dashboard-chart-utils.ts",
  "src/lib/constants.ts",
  "src/lib/particle-delete.ts",
  "src/lib/theme/useTheme.tsx",
]
for (const rel of libFiles) {
  const dest = rel.replace("src/lib/", "components/external/easyui/lib/")
  copyEasyFile(rel, dest)
}

copyEasyFile(
  "src/components/icons/GithubIcon.tsx",
  "components/external/easyui/icons/GithubIcon.tsx"
)
copyEasyFile(
  "src/components/registry/catalog-index.ts",
  "components/external/easyui/registry/catalog-index.ts",
  (text) => text.replaceAll("../../types/", "../types/")
)
copyEasyFile(
  "src/types/component.ts",
  "components/external/easyui/types/component.ts"
)
cpSync(join(easyRepo, "LICENSE"), join(easyOut, "LICENSE"))

function rewriteBoard(text) {
  return text
    .replaceAll("@/components/base/", "@/components/external/boardui/base/")
    .replaceAll(
      "@/components/application/",
      "@/components/external/boardui/application/"
    )
    .replaceAll(
      "@/components/foundations/",
      "@/components/external/boardui/foundations/"
    )
    .replaceAll("@/utils/", "@/components/external/boardui/utils/")
    .replaceAll("@/hooks/", "@/components/external/boardui/hooks/")
}

function copyTree(srcDir, destDir) {
  for (const name of readdirSync(srcDir)) {
    const src = join(srcDir, name)
    const dest = join(destDir, name)
    if (statSync(src).isDirectory()) {
      copyTree(src, dest)
      continue
    }
    if (/\.(ts|tsx)$/.test(name)) {
      writeText(dest, rewriteBoard(readFileSync(src, "utf8")))
    } else {
      mkdirSync(dirname(dest), { recursive: true })
      cpSync(src, dest)
    }
  }
}

copyTree(join(boardRepo, "components"), boardOut)
copyTree(join(boardRepo, "utils"), join(boardOut, "utils"))
copyTree(join(boardRepo, "hooks"), join(boardOut, "hooks"))
copyTree(join(boardRepo, "styles"), join(boardOut, "styles"))
cpSync(join(boardRepo, "LICENSE"), join(boardOut, "LICENSE"))

for (const folder of ["avatars", "carousel", "brand", "ai-chat", "templates"]) {
  const src = join(boardRepo, "public", folder)
  if (!existsSync(src)) continue
  cpSync(src, join(root, "public", folder), { recursive: true })
}

const easyIndex = JSON.parse(readFileSync(easyIndexPath, "utf8"))
const manifest = { easyui: {}, boardui: {} }
for (const item of easyIndex.components) {
  const files = (item.source_files_in_repo ?? [])
    .filter(
      (path) =>
        path.includes("/components/ui/") &&
        !path.endsWith(".meta.ts") &&
        !path.includes(".test.")
    )
    .map((path) => `components/external/easyui/ui/${path.split("/").pop()}`)
    .filter((path) => existsSync(join(root, path)))
  manifest.easyui[item.slug] = files
}

function destForRegistryPath(path) {
  if (path.startsWith("components/")) {
    return `components/external/boardui/${path.slice("components/".length)}`
  }
  if (path === "app/api/chat/route.ts") {
    return "components/external/boardui/server/chat-route.ts"
  }
  if (
    path.startsWith("utils/") ||
    path.startsWith("hooks/") ||
    path.startsWith("styles/") ||
    path.startsWith("docs/")
  ) {
    return `components/external/boardui/${path}`
  }
  return `components/external/boardui/registry-files/${path}`
}

const registry = await fetch("https://www.boardui.com/r/registry.json").then((res) =>
  res.json()
)
for (const item of registry.items) {
  const detail = await fetch(`https://www.boardui.com/r/${item.name}.json`).then((res) =>
    res.json()
  )
  const written = []
  for (const file of detail.files ?? []) {
    if (!file.content) continue
    const dest = destForRegistryPath(file.path)
    const text = /\.(ts|tsx)$/.test(dest) ? rewriteBoard(file.content) : file.content
    writeText(join(root, dest), text)
    written.push(dest)
  }
  manifest.boardui[item.name] = written.filter((path) => existsSync(join(root, path)))
}

const dataTable = "components/external/boardui/application/data-table/data-table.tsx"
if (existsSync(join(root, dataTable))) {
  const list = manifest.boardui["data-table"] ?? []
  if (!list.includes(dataTable)) list.unshift(dataTable)
  manifest.boardui["data-table"] = list
}

writeText(
  join(root, "components/external/manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`
)

const easyFiles = Object.values(manifest.easyui).filter((files) => files.length).length
const boardFiles = Object.values(manifest.boardui).filter((files) => files.length).length
console.log(
  JSON.stringify(
    {
      easyuiWithSource: easyFiles,
      boarduiWithSource: boardFiles,
      easyuiMissing: Object.entries(manifest.easyui)
        .filter(([, files]) => files.length === 0)
        .map(([slug]) => slug),
      boarduiMissing: Object.entries(manifest.boardui)
        .filter(([, files]) => files.length === 0)
        .map(([name]) => name),
    },
    null,
    2
  )
)

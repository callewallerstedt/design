#!/usr/bin/env node
/**
 * Rebuild catalog/components.json and CATALOG.md from the EasyUI and BoardUI
 * index files. Index only — this script never writes component source.
 *
 *   node scripts/build-catalog.mjs <easyui.json> <boardui.json>
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const easyPath = process.argv[2]
const boardPath = process.argv[3]

if (!easyPath || !boardPath) {
  console.error(
    "Usage: node scripts/build-catalog.mjs <easyui.json> <boardui.json>"
  )
  process.exit(1)
}

const USE_CASES = [
  "buttons",
  "nav",
  "hero",
  "forms",
  "tables",
  "charts",
  "chat",
  "dashboard",
  "animation",
  "feedback",
  "overlays",
  "auth",
  "search",
  "loading",
  "cards",
  "layout",
  "marketing",
  "theme",
]

const PRIORITY = [
  "auth",
  "chat",
  "charts",
  "tables",
  "forms",
  "buttons",
  "search",
  "nav",
  "hero",
  "dashboard",
  "overlays",
  "loading",
  "marketing",
  "layout",
  "feedback",
  "cards",
  "theme",
  "animation",
]

const RULES = [
  [
    "auth",
    /\b(login|sign[- ]?up|sign[- ]?in|auth card|registration|social button|otp|passcode|password strength)\b/i,
  ],
  [
    "chat",
    /\b(chat|composer|agent|thinking orb|ai response|questionnaire|web search|multi-agent|image generation)\b/i,
  ],
  [
    "charts",
    /\b(chart|sparkline|heatmap|funnel|donut|sankey|radar|gauge|bar list|contributions|meter)\b/i,
  ],
  ["tables", /\b(data table|data grid|spreadsheet|table)\b/i],
  [
    "forms",
    /\b(inputs?|forms?|checkbox|radio|switch|select|slider|textarea|combobox|date|calendar|picker|uploads?|otp|number field|time field|tag group|segmented)\b/i,
  ],
  ["buttons", /\b(buttons?|drag to confirm|pressbutton)\b/i],
  ["search", /\b(search|command palette|command menu|spotlight)\b/i],
  [
    "nav",
    /\b(nav|navbar|navigation|sidebar|breadcrumb|pagination|menu|dock|tabs|stepper|hamburger|mega menu|dynamic island)\b/i,
  ],
  ["hero", /\b(sticky pages|page transition|intro loader)\b/i],
  [
    "dashboard",
    /\b(dashboard|stat cards?|kpi|revenue|orders|wallet|metric hud|patient|medical|kanban|headcount|cash-flow|event chips)\b/i,
  ],
  [
    "overlays",
    /\b(modal|dialog|drawer|popover|tooltip|sheet|peek|dropdown|tour|tray|basket)\b/i,
  ],
  ["loading", /\b(loaders?|skeleton|spinner|progress|orbital loading)\b/i],
  ["marketing", /\b(pricing|faq|comparison|announcement|profile)\b/i],
  [
    "layout",
    /\b(divider|accordion|carousel|tree view|timeline|avatar|code snippet)\b/i,
  ],
  [
    "feedback",
    /\b(alerts?|badges?|notifications?|toasts?|status|activity feed|undo|404|not found|payment|kbd|chips?)\b/i,
  ],
  ["cards", /\b(cards?)\b/i],
  ["theme", /\b(theme|typography|direction provider|tokens)\b/i],
  [
    "animation",
    /\b(morph\w*|particle|glitch|shader|meteor|sparkle|cursor follower|blob|warp|scramble|gravity|orbit|parallax|matrix|starfield)\b/i,
  ],
]

const EASY_CATEGORY = {
  Motion: "animation",
  Feedback: "feedback",
  Navigation: "nav",
  Buttons: "buttons",
  Forms: "forms",
  Overlays: "overlays",
  Auth: "auth",
}

const DEFAULTS = {
  buttons: ["local:components/ui/button", "boardui/button"],
  nav: ["local:components/kit/app-sidebar", "boardui/sidebar"],
  hero: ["easyui/sticky-pages"],
  forms: ["local:components/ui/input", "boardui/input"],
  tables: ["local:components/ui/table", "boardui/data-table"],
  charts: ["easyui/bar-chart", "easyui/live-line-chart", "boardui/revenue-chart-card"],
  chat: ["local:components/kit", "boardui/agent-chat"],
  dashboard: ["local:components/dash", "boardui/stat-cards"],
  animation: ["easyui/thinking-orb"],
  feedback: ["local:components/ui/alert", "boardui/notification"],
  overlays: ["local:components/ui/dialog", "boardui/modal"],
  auth: ["boardui/auth-card", "easyui/login"],
  search: ["boardui/command-palette", "easyui/spotlight-search"],
  loading: ["local:components/ui/skeleton", "boardui/spinner"],
  cards: ["local:components/ui/card", "boardui/stat-cards"],
  layout: ["boardui/accordion", "boardui/divider"],
  marketing: ["easyui/pricing", "easyui/faq"],
  theme: ["local:app/globals.css"],
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function registryName(install) {
  const board = install.match(/boardui@latest add ([a-z0-9-]+)/)
  if (board) return board[1]
  const easy = install.match(/easyui\/([a-z0-9-]+)/)
  if (easy) return easy[1]
  return null
}

function classify(name, description, category) {
  const text = `${name} ${description}`
  const tags = new Set()
  for (const [useCase, pattern] of RULES) {
    if (pattern.test(text)) tags.add(useCase)
  }
  if (EASY_CATEGORY[category]) tags.add(EASY_CATEGORY[category])
  if (category === "Motion") tags.add("animation")

  if (/intro loader/i.test(text)) {
    tags.add("hero")
    tags.delete("loading")
  }
  if (/code snippet/i.test(text)) {
    tags.add("layout")
    tags.delete("buttons")
  }
  if (/event chips/i.test(text)) {
    tags.add("dashboard")
    tags.delete("forms")
  }
  if (tags.size === 0) tags.add("layout")

  let primary = PRIORITY.find((useCase) => tags.has(useCase)) ?? "layout"
  if (category === "template") {
    if (tags.has("chat")) primary = "chat"
    else if (tags.has("dashboard")) primary = "dashboard"
  }

  const use_cases = [
    primary,
    ...PRIORITY.filter((useCase) => useCase !== primary && tags.has(useCase)),
  ]
  return { primary, use_cases }
}

function entry(base) {
  const { primary, use_cases } = classify(
    base.name,
    base.description,
    base.category
  )
  return { ...base, primary, use_cases }
}

const easy = JSON.parse(readFileSync(easyPath, "utf8"))
const board = JSON.parse(readFileSync(boardPath, "utf8"))

const components = []

for (const item of easy.components) {
  components.push(
    entry({
      id: `easyui/${item.slug}`,
      name: item.name,
      slug: item.slug,
      registry_name: item.slug,
      source: "easyui",
      tier: "free",
      paid: false,
      license: "MIT",
      kind: "component",
      category: item.category,
      url: item.url,
      description: item.description,
      install: item.install,
      npm_dependencies: item.npm_dependencies ?? [],
    })
  )
}

for (const item of board) {
  const paid = item.tier === "pro"
  const urlSlug = item.url.split("/").pop().split("#")[0]
  const freeInstall = item.install.split(" (or:")[0].trim()
  const alt = item.install.match(/npx shadcn@latest add https?:\/\/\S+?\.json/)
  const install = paid
    ? `npx boardui@latest add ${urlSlug} --yes`
    : freeInstall
  const row = entry({
    id: `boardui/${slugify(item.name)}`,
    name: item.name,
    slug: slugify(item.name),
    registry_name: registryName(install) ?? urlSlug,
    source: "boardui",
    tier: paid ? "pro" : "free",
    paid,
    license: paid
      ? "BoardUI Pro (paid). Needs a license before install."
      : "MIT",
    kind: item.category === "template" ? "template" : "component",
    category: item.category,
    url: item.url,
    description: item.description,
    install,
    npm_dependencies: item.npm_deps ?? [],
  })
  if (!paid && alt) row.install_alt = alt[0]
  if (paid) {
    row.license_url = "https://www.boardui.com/pricing"
    row.install_docs = "https://www.boardui.com/components/pro-installation"
    row.install_note =
      "Paid. Run `npx boardui@latest login` after buying a license. Do not copy Pro source."
  }
  components.push(row)
}

const ids = new Set()
for (const item of components) {
  if (ids.has(item.id)) {
    throw new Error(`Duplicate id: ${item.id}`)
  }
  ids.add(item.id)
}

const order = new Map(USE_CASES.map((useCase, index) => [useCase, index]))
components.sort((a, b) => {
  const byUse = (order.get(a.primary) ?? 99) - (order.get(b.primary) ?? 99)
  if (byUse !== 0) return byUse
  if (a.paid !== b.paid) return Number(a.paid) - Number(b.paid)
  return a.name.localeCompare(b.name)
})

for (const [useCase, picks] of Object.entries(DEFAULTS)) {
  for (const pick of picks) {
    if (pick.startsWith("local:")) continue
    if (!ids.has(pick)) throw new Error(`Missing default ${useCase}: ${pick}`)
  }
}

const groups = {}
for (const useCase of USE_CASES) {
  groups[useCase] = components
    .filter((item) => item.use_cases.includes(useCase))
    .map((item) => item.id)
}

const easyCount = components.filter((item) => item.source === "easyui").length
const boardCount = components.filter((item) => item.source === "boardui").length
const proCount = components.filter((item) => item.paid).length
const freeBoard = boardCount - proCount

const manifestPath = join(root, "components/external/manifest.json")
const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { easyui: {}, boardui: {} }

for (const item of components) {
  if (item.paid) {
    item.local_path = null
    item.local_paths = []
    item.availability = "paid-license-required"
    continue
  }
  const files =
    item.source === "easyui"
      ? (manifest.easyui?.[item.slug] ?? [])
      : (manifest.boardui?.[item.registry_name] ?? [])
  const key = item.source === "easyui" ? item.slug : item.registry_name
  const preferred = files.find((path) =>
    new RegExp(`/${key}\\.(tsx|ts|css)$`).test(path)
  )
  item.local_paths = files
  item.local_path = preferred ?? files.find((path) => path.endsWith(".tsx")) ?? files[0] ?? null
  item.availability = files.length ? "vendored" : "not-vendored"
}

if (easyCount !== 131) throw new Error(`Expected 131 EasyUI, got ${easyCount}`)
if (boardCount !== 116) throw new Error(`Expected 116 BoardUI, got ${boardCount}`)
if (freeBoard !== 76) throw new Error(`Expected 76 BoardUI free, got ${freeBoard}`)
if (proCount !== 40) throw new Error(`Expected 40 BoardUI Pro, got ${proCount}`)

const catalog = {
  name: "calle-design-catalog",
  updated: "2026-11-01",
  policy:
    "Free MIT source is vendored under components/external so you can read and import it. BoardUI Pro is paid and is indexed only — no Pro source is included. Prefer components/ui and components/kit for Calle UI, then import from local_path. Apply tokens in app/globals.css.",
  counts: {
    total: components.length,
    easyui: easyCount,
    boardui: boardCount,
    boardui_free: freeBoard,
    boardui_pro: proCount,
    vendored: components.filter((item) => item.availability === "vendored").length,
  },
  local_kit: {
    primitives: "components/ui",
    shell_and_chat: "components/kit",
    tokens: "app/globals.css",
    external: "components/external",
    note: "Calle UI lives in components/ui and components/kit. Free EasyUI and BoardUI source lives in components/external, one library per folder. Open local_path from this catalog.",
  },
  use_cases: USE_CASES,
  defaults: DEFAULTS,
  sources: [
    {
      id: "easyui",
      site: "https://easyui.site",
      github: "https://github.com/Surajmaurya1/easyui",
      license: "MIT",
      tier: "free",
      install: "npx shadcn@latest add Surajmaurya1/easyui/<slug>",
    },
    {
      id: "boardui",
      site: "https://www.boardui.com",
      github: "https://github.com/BoardUI/boardui",
      license:
        "MIT for free components. Pro components and templates require a paid license.",
      pricing: "https://www.boardui.com/pricing",
      install_free: "npx boardui@latest add <name> --yes",
      install_pro:
        "npx boardui@latest login && npx boardui@latest add <name> --yes",
      install_docs: "https://www.boardui.com/components/pro-installation",
    },
  ],
  groups,
  components,
}

mkdirSync(join(root, "catalog"), { recursive: true })
writeFileSync(
  join(root, "catalog/components.json"),
  `${JSON.stringify(catalog, null, 2)}\n`
)

function mdEscape(value) {
  return value.replace(/`/g, "'").replace(/\|/g, "\\|")
}

const lines = []
lines.push("# Component catalog")
lines.push("")
lines.push(
  "Index of [EasyUI](https://easyui.site) (131, MIT, free) and [BoardUI](https://www.boardui.com) (76 free MIT, 40 paid Pro). Machine-readable copy: [`catalog/components.json`](./catalog/components.json). Search: `node scripts/find.mjs <query>`."
)
lines.push("")
lines.push(
  "Free source is in [`components/external`](./components/external). Each catalog row has a `local_path` you can open and import. BoardUI Pro is indexed only — the source is not in this repo."
)
lines.push("")
lines.push(
  "Calle UI stays in `components/ui` and `components/kit`. Tokens stay in `app/globals.css`. Restyle imported library components to [`DESIGN.md`](./DESIGN.md)."
)
lines.push("")
lines.push("## Defaults")
lines.push("")
lines.push("| Use case | Start with |")
lines.push("| --- | --- |")
for (const useCase of USE_CASES) {
  lines.push(`| ${useCase} | ${DEFAULTS[useCase].join(", ")} |`)
}
lines.push("")
lines.push(
  "An item is listed once, under its primary use case. `use_cases` and `groups` in the JSON include every tag, so a chart card can also match `dashboard`."
)
lines.push("")
lines.push(
  "**Pro (paid license)** means BoardUI Pro. Buy a license, then `npx boardui@latest login`, then the install command. Pricing: https://www.boardui.com/pricing"
)
lines.push("")

for (const useCase of USE_CASES) {
  const items = components.filter((item) => item.primary === useCase)
  lines.push(`## ${useCase} (${items.length})`)
  lines.push("")
  if (items.length === 0) {
    lines.push("None primarily. Check `groups` in the JSON for secondary tags.")
    lines.push("")
    continue
  }
  for (const item of items) {
    const tier = item.paid ? "**Pro (paid license)**" : "free"
    const source = item.source === "easyui" ? "EasyUI" : "BoardUI"
    const kind = item.kind === "template" ? " template" : ""
    const local = item.local_path ? ` — \`${item.local_path}\`` : ""
    lines.push(
      `- [${mdEscape(item.name)}](${item.url}) — ${source}${kind} — ${tier}${local} — ${mdEscape(item.description)} — \`${item.install}\``
    )
  }
  lines.push("")
}

writeFileSync(join(root, "CATALOG.md"), `${lines.join("\n")}\n`)

const primaryCounts = Object.fromEntries(
  USE_CASES.map((useCase) => [
    useCase,
    components.filter((item) => item.primary === useCase).length,
  ])
)
console.log(
  JSON.stringify(
    { total: components.length, easyCount, freeBoard, proCount, primaryCounts },
    null,
    2
  )
)

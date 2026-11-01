# DESIGN.md

Calle’s design language for product UI. **Agents: read this file, search [`catalog/components.json`](./catalog/components.json), open `local_path`, apply the tokens.**

Greyscale SaaS. Inter. 6px corners, 8px ceiling. Tight padding. White accent on near-black. Dark by default.

The faux dashboard at `/` is the visual source of truth. `/kit` is the component gallery.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- shadcn/ui **Nova** on **Base UI** (`components/ui`)
- Shell + chat pieces in `components/kit`
- `cn()` (`clsx` + `tailwind-merge`) for class logic
- Tokens live in `app/globals.css`. Do not introduce raw hex in components.

## Taste

- **Inter** for all UI. `font-medium` on body, `font-semibold` on headings, buttons, and metrics.
- Geist Mono for code, commands, identifiers.
- Palette is **total greyscale**. No colored brand hues.
- Accent is **white** in dark mode and **near-black** in light mode (`--brand`). Not a second hue.
- Elevation is a hairline ring (`ring-1 ring-foreground/10`). No card glow.
- Radius is **6px** (`--radius: 6px`, `rounded-lg`). Nothing rounds past **8px**.
- Empty states get **one** next action.
- Copy is **minimal**. Icons are fine; keep them `size-4` and muted. No emojis, eyebrows, or helper badges.

## Anti-slop

Never ship these unless Calle asks for them by name:

- Purple or a second brand color
- Glow / bloom on cards
- Inter Display + giant marketing hero
- `rounded-2xl` / `rounded-3xl` product chrome
- Loose `p-6`/`p-8` cards
- Bounce / spring on controls used many times a day
- `h-screen` (use `h-dvh`)
- Mixing Radix and Base UI in the same interaction
- Rebuilding keyboard behavior by hand
- Emojis, sparkles-as-brand, or “AI insight” banners
- Eyebrows / overlines / `01` section numbers / Pro tip cards
- Keyboard-hint microcopy next to a composer
- Long button labels (“View recommended actions”)

## Spacing & layout

See **TUTORIAL.md §3**. Short version:

- Page: `p-2`, grids `gap-2` — vertical and horizontal gutters match.
- Cards: 8px padding on every side (`--card-spacing`).
- Controls: `h-8`.
- Sidebar rows: `h-8`.
- Use `size-*` for squares.
- Z-index scale (`lib/z-index.ts`): base 0, sticky 20, overlay 50, toast 60.

## Typography

- Inter only for UI.
- Copy is short. No emojis. No eyebrow labels.
- `text-balance` on headings, `text-pretty` on body.
- `tabular-nums` for data.
- `truncate` / `line-clamp` in dense UI.
- Do not change letter-spacing unless asked.

## Color

| Token | Use |
| --- | --- |
| `--background` / `--card` | Greyscale surfaces |
| `--foreground` / `--muted-foreground` | Text |
| `--brand` / `--brand-from` / `--brand-to` | White on dark, near-black on light |
| `--brand-foreground` | Text on brand fills |
| `--destructive` | Irreversible / error. The only chroma. |

Dark is the default. Light stays greyscale so contrast holds. Do not add ember, sun, ice, purple, or a second accent.

## Motion

From Emil Kowalski, *You Don’t Need Animations*, plus UI Skills `baseline-ui`:

1. **Purpose first.** Animate to explain, orient, or confirm.
2. Sidebar expand is allowed (150ms). Keyboard actions: never animate.
3. UI motion ≤ 200ms. Compositor props preferred.
4. Honor `prefers-reduced-motion`.

## Accessibility

- Icon-only buttons have `aria-label`. Decorative icons are `aria-hidden`.
- Every input has a label. Errors use `aria-invalid` + `aria-describedby`.
- Visible focus. Dialogs trap focus and close on Escape.
- Do not use color alone for state.
- Never block paste on inputs.

## Components — use the kit

**Shell:** `AppShell`, `AppSidebar` — collapsible nav.

**Primitives** (`components/ui`): Button (including `variant="brand"`), Input, Field, Card, Dialog, AlertDialog, Sheet, Tabs, Table, Badge, Avatar, …

**Chat / agent** (`components/kit`): ChatThread, ChatMessage, MarkdownBubble, Composer, ToolChip, StatusChip, ThinkingTrace, ApprovalCard, TaskRow, CodeBlock.

**External libraries** (`components/external`): free EasyUI and BoardUI source. Search with `node scripts/find.mjs <query>`. Import the `local_path`. BoardUI Pro is paid and is not in the repo.

## Restyle EasyUI and BoardUI

Their defaults are not Calle’s. After you import a file:

- Point surfaces at `--background`, `--card`, `--muted`, `--foreground`, `--border`.
- Accent is white (`bg-primary` / `text-primary`) in dark mode. Strip rainbow, neon, purple, and glow.
- Radius stays `rounded-lg` (6px). Do not leave `rounded-2xl` or `rounded-3xl`. This repo caps `--radius-xl` and above at 8px.
- Padding is `p-2` and `gap-2`. Controls stay `h-8`. Replace `p-6` / `p-8`.
- EasyUI motion stays off unless the task asks for it.
- Do not import `components/external/boardui/styles/globals.css` over `app/globals.css`.
- Pro items stop at the catalog. Do not paste paid source.

## Checklist before shipping UI

- [ ] Inter, semibold headings, medium body
- [ ] 6px radius (`rounded-lg`), nothing over 8px
- [ ] Tight padding (no `p-6` cards)
- [ ] Greyscale surfaces; white accent on dark
- [ ] Dark default still readable in light
- [ ] Keyboard + visible focus
- [ ] Reused an existing primitive

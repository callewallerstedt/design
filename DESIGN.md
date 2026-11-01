# DESIGN.md

Calle’s design language for product UI. **Agents: read this file, search [`catalog/components.json`](./catalog/components.json), open `local_path`, apply the tokens.**

Minimalist, engineered, sharp, quiet. Geist Mono. Dark greyscale. No borders, no shadows. White only for focus and the active item.

The faux dashboard at `/` is the visual source of truth. `/kit` is the component gallery.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- shadcn/ui **Nova** on **Base UI** (`components/ui`)
- Shell + chat pieces in `components/kit`
- `cn()` (`clsx` + `tailwind-merge`) for class logic
- Tokens live in `app/globals.css`. Do not introduce raw hex in components.

## Taste

- **Geist Mono** for all UI, including body copy. `font-medium` on body, `font-semibold` on headings and buttons.
- Palette is **layered greys**. Page is near-black. Cards and inputs are one step lighter. Hover is one step lighter again.
- **No borders and no shadows** by default. Do not use `border`, `ring-1`, or `shadow-*` to separate surfaces.
- White is the accent **only** for the focus ring and the active tab or nav item. Buttons stay grey.
- Radius is **6px** (`rounded-lg`).
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

- Page: `p-1`, grids `gap-1` (4px).
- Cards: 4px padding (`--card-spacing`).
- Controls: `h-7` (28px).
- Sidebar rows: `h-7`.
- Use `size-*` for squares.
- Z-index scale (`lib/z-index.ts`): base 0, sticky 20, overlay 50, toast 60.

## Typography

- Geist Mono only for UI.
- Copy is short. No emojis. No eyebrow labels.
- `text-balance` on headings, `text-pretty` on body.
- `tabular-nums` for data.
- `truncate` / `line-clamp` in dense UI.
- Do not change letter-spacing unless asked.

## Color

| Token | Use |
| --- | --- |
| `--background` | Near-black page |
| `--sidebar` | One step off the page |
| `--card` / `--popover` | Raised surface |
| `--muted` / `--secondary` | Inputs and quiet fills |
| `--accent` | Hover surface, one step lighter |
| `--foreground` | Text |
| `--ring` | White focus ring in dark mode |
| `--destructive` | Irreversible error only |

Do not add colored brand hues. A button is never white.

## Motion

From Emil Kowalski, *You Don’t Need Animations*, plus UI Skills `baseline-ui`:

1. **Purpose first.** Animate to explain, orient, or confirm.
2. Sidebar expand is allowed (150ms). Keyboard actions: never animate.
3. UI motion ≤ 200ms. Compositor props preferred.
4. Honor `prefers-reduced-motion`. The spotlight border and skeleton shimmer both turn off.
5. **Spotlight border.** On hover, a 1px highlight follows the cursor. Use `Spotlight` or `useCursorBorder` from `components/kit/spotlight.tsx`. It sets `--x` and `--y` and fades in 150ms. Apply it to cards, buttons, and list items.
6. **Skeleton shimmer.** Loading placeholders use `Skeleton` (`skeleton-shimmer` in `app/globals.css`). Soft, grey, no color.

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

Their defaults are not Calle’s. After you import a file from `components/external`:

- Delete `border`, `ring`, `shadow`, and hardcoded hex fills. Separate with `bg-background`, `bg-card`, `bg-muted`, and `hover:bg-accent`.
- Buttons stay `bg-secondary text-foreground`. Do not leave white, rainbow, neon, or purple fills.
- Focus uses `focus-visible:ring-2 focus-visible:ring-ring` (white in dark mode). Active nav or tabs use `bg-accent text-white`.
- Radius stays `rounded-lg` (6px). Replace `rounded-2xl` and `rounded-3xl`.
- Padding is `p-1` and `gap-1`. Controls are `h-7`. Replace `p-6` / `p-8` and `h-10`+.
- Wrap the root in `Spotlight` if it is a card, button, or row.
- EasyUI motion stays off unless the task asks for it.
- Do not import `components/external/boardui/styles/globals.css` over `app/globals.css`.
- BoardUI Pro is not in this repo. The catalog links to it. Do not paste paid source.

## Checklist before shipping UI

- [ ] Geist Mono everywhere
- [ ] 6px radius, 4px gaps, 28px controls
- [ ] No borders, no shadows; layers of grey
- [ ] White only on focus ring and the active item
- [ ] Spotlight border on cards, buttons, and rows
- [ ] Skeleton shimmer for loading
- [ ] Keyboard + visible focus
- [ ] Reused an existing primitive

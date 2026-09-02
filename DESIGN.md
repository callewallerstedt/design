# DESIGN.md

Calle’s design language for product UI. **Agents: read [`TUTORIAL.md`](./TUTORIAL.md) first**, then this file.

Greyscale SaaS. Inter. 8px corners. Tight padding. One settable accent gradient. Dark by default.

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
- Palette is **total greyscale** plus **one** accent (`ember` | `sun` | `ice`).
- Accent is a short gradient (`--brand-from` → `--brand-to`) on CTAs, sparklines, and active nav. Not on backgrounds.
- Elevation is a hairline ring (`ring-1 ring-foreground/10`). No card glow.
- Radius is **8px** everywhere (`--radius: 8px`, use `rounded-lg`).
- Empty states get **one** next action.

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
- New primitive when `components/ui` or `components/kit` already has one

## Spacing & layout

See **TUTORIAL.md §3**. Short version:

- Page: `p-3`, grids `gap-2`.
- Cards: 10px padding (8px on `size="sm"`).
- Controls: `h-8`.
- Sidebar rows: `h-8`.
- Use `size-*` for squares.
- Z-index scale (`lib/z-index.ts`): base 0, sticky 20, overlay 50, toast 60.

## Typography

- Inter only for UI.
- `text-balance` on headings, `text-pretty` on body.
- `tabular-nums` for data.
- `truncate` / `line-clamp` in dense UI.
- Do not change letter-spacing unless asked.

## Color

| Token | Use |
| --- | --- |
| `--background` / `--card` | Greyscale surfaces |
| `--foreground` / `--muted-foreground` | Text |
| `--brand` / `--brand-from` / `--brand-to` | The one accent |
| `--brand-foreground` | Text on brand fills |
| `--destructive` | Irreversible / error |

Switch accent with `data-accent` (`ember`, `sun`, `ice`) via `useAccent()`. Light and dark are first-class.

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

**Shell:** `AppShell`, `AppSidebar` — collapsible nav, accent picker.

**Primitives** (`components/ui`): Button (including `variant="brand"`), Input, Field, Card, Dialog, AlertDialog, Sheet, Tabs, Table, Badge, Avatar, …

**Chat / agent** (`components/kit`): ChatThread, ChatMessage, MarkdownBubble, Composer, ToolChip, StatusChip, ThinkingTrace, ApprovalCard, TaskRow, CodeBlock.

## Checklist before shipping UI

- [ ] Inter, semibold headings, medium body
- [ ] 8px radius (`rounded-lg`)
- [ ] Tight padding (no `p-6` cards)
- [ ] Greyscale surfaces; one accent only
- [ ] Checked `ember` / `sun` / `ice`
- [ ] Dark default still readable in light
- [ ] Keyboard + visible focus
- [ ] Reused an existing primitive

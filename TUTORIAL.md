# UI tutorial — Calle’s rules

Read this before drawing any screen. Then read [`DESIGN.md`](./DESIGN.md) for the longer taste file.

This is the checklist future agents should follow: **Geist Mono**, **6px rounding**, **4px gaps**, **layered greys**, **white only on focus and the active item**.

The live example is the faux dashboard at `/`. The component gallery is `/kit`.

---

## 1. Type

- **Font:** Geist Mono. Always. Loaded in `app/layout.tsx` as `--font-geist-mono` and used for sans and mono.
- **Body:** `font-medium` (500).
- **Headings / numbers / buttons:** `font-semibold` (600).
- **Data:** `tabular-nums`.
- **Headings:** `text-balance`. Body: `text-pretty`.
- Do not switch to Inter, Inter Display, or a second face.

```tsx
<h1 className="text-2xl font-semibold tracking-tight">Churn</h1>
<p className="text-2xl font-semibold tabular-nums">2,842</p>
```

---

## 2. Rounding — 6px, 8px ceiling

`--radius` is **6px**. `rounded-lg` is 6px. `rounded-xl` and larger are capped at **8px**.

| Surface | Class |
| --- | --- |
| Cards, sidebar, inputs, buttons, charts | `rounded-lg` |
| Tiny chips that must stay pill-like | badges may stay full-round |
| Never | `rounded-xl`, `rounded-2xl`, `rounded-3xl` on product chrome |

If you add a new component, use `rounded-lg`. Do not invent a second radius.

---

## 3. Tight layout and padding

Dense SaaS, not a marketing page.

| Token | Value | Use |
| --- | --- | --- |
| Page gap | `gap-1` | 4px, both axes |
| Page padding | `p-1` | Main canvas |
| Card padding | `--card-spacing` = 4px | All cards, all sides |
| Control height | `h-7` | 28px buttons and inputs |
| Sidebar row | `h-7` | Nav items |

**Do**

- Pack KPI cards in one row with `gap-1`.
- Keep list rows at `h-7`.
- Prefer `gap-1` over `gap-2` inside cards.
- Separate surfaces with background steps, not borders.

**Do not**

- `p-6` / `p-8` on cards.
- Large hero whitespace above product UI.
- `max-w-prose` as the app shell.

---

## 4. Color — greyscale, white accent

Surfaces are greys stacked on a near-black page. No borders. No shadows.

White appears on the focus ring (`--ring`) and on the active nav item or tab (`text-white` on `bg-accent`). Buttons use `bg-secondary`.

```tsx
<Button>Open</Button>
<Button variant="brand">Active</Button>
```

---

## 5. Shell

Product screens use `AppShell`:

- Collapsible sidebar (`w-56` / `w-14`), 150ms width, labels hide when collapsed.
- Expand from the header panel icon, the logo mark (when collapsed), or the bottom sidebar control.
- Header 48px, tight, filters on the right.
- Main column scrolls. Sidebar does not.

```tsx
import { AppShell } from "@/components/kit/app-shell"

export default function Page() {
  return (
    <AppShell>
      {/* page */}
    </AppShell>
  )
}
```

---

## 6. Cards

Use `Card` from `components/ui/card`. It is already tight, with a 6px radius.

```tsx
<Card size="sm">
  <CardHeader>
    <CardTitle className="text-xs font-medium text-muted-foreground">
      At risk subscribers
    </CardTitle>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>
```

Hairline only: `ring-1 ring-foreground/10`. No drop shadows, no glow on the card itself. Chart strokes use the white accent.

---

## 7. Motion

- Sidebar expand/collapse: 150ms, compositor + width, honor `motion-safe`.
- No bounce. No page-load fade.
- Daily controls (tabs, send, toggle): no animation.

---

## 8. Copy

Minimal text. Icons stay. No emojis.

- One-word titles when they still parse: `Churn`, `Chat`, `Mail`, `Kit`.
- No eyebrows, kickers, overlines, numbered `01` labels, or `uppercase tracking-wide` microcopy.
- No “Pro tip”, “AI insight”, “Live”, “Help center”, or keyboard-hint paragraphs.
- Buttons: `Open`, `Filter`, `30d` — not “View recommended actions”.
- Lucide icons, `size-4`, muted unless active. No decorative wells, sparkles, or emoji.
- `aria-label` on icon-only controls. Visible UI stays short.

---

## 9. Copy-paste order for a new screen

1. Wrap in `AppShell`.
2. Inter is already on `body`.
3. Grid with `gap-2` and `p-2` (same on every side).
4. `Card` / `Card size="sm"` — do not restyle radius.
5. Brand only through `variant="brand"`, `text-brand`, `bg-brand-gradient`.
6. Check dark (default) and light. Accent stays white on dark.
7. If you need a primitive, take it from `components/ui`. Chat pieces from `components/kit`.

---

## Files

| File | What |
| --- | --- |
| `app/globals.css` | Greyscale tokens, 6px radius, white accent |
| `catalog/components.json` | EasyUI + BoardUI index, with `local_path` |
| `components/external/` | Vendored free source |
| `components/kit/app-shell.tsx` | Shell |
| `components/kit/app-sidebar.tsx` | Expandable nav |
| `components/dash/churn-dashboard.tsx` | Faux dashboard reference |
| `components/dash/ops-panels.tsx` | Chat, todo, and mail-in cards |
| `DESIGN.md` | Full taste + a11y + anti-slop |

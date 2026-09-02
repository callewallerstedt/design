# UI tutorial — Calle’s rules

Read this before drawing any screen. Then read [`DESIGN.md`](./DESIGN.md) for the longer taste file.

This is the checklist future agents should follow: **Inter**, **8px rounding**, **tight padding**, **greyscale + one settable accent**.

The live example is the faux dashboard at `/`. The component gallery is `/kit`.

---

## 1. Type

- **Font:** Inter. Always. Loaded in `app/layout.tsx` as `--font-inter`.
- **Body:** `font-medium` (500). Slightly bolder than default UI.
- **Headings / numbers / buttons:** `font-semibold` (600).
- **Mono:** Geist Mono for code, chips, elapsed time.
- **Data:** `tabular-nums`.
- **Headings:** `text-balance`. Body: `text-pretty`.
- Do not switch to Geist, Inter Display, serif display, or a second sans.

```tsx
<h1 className="text-2xl font-semibold tracking-tight">Churn</h1>
<p className="text-2xl font-semibold tabular-nums">2,842</p>
```

---

## 2. Rounding — 8px everywhere

`--radius` is **8px**. Tailwind `rounded-lg` / `rounded-md` both resolve to 8px in this repo.

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
| Page gap | `gap-2` | Dashboard grids — same vertically and horizontally |
| Page padding | `p-2` | Main canvas — same as the gap between cards |
| Card padding | `--card-spacing` = 8px (`spacing(2)`) | All cards, all sides |
| Control height | `h-8` | Buttons, inputs (Nova) |
| Sidebar row | `h-8` | Nav items |

**Do**

- Pack KPI cards in one row with `gap-2`.
- Keep list rows at `py-1.5`.
- Prefer `gap-2` over `gap-6` inside cards.

**Do not**

- `p-6` / `p-8` on cards.
- Large hero whitespace above product UI.
- `max-w-prose` as the app shell.

---

## 4. Color — greyscale + one accent

Surfaces, text, borders: **no chroma**. White / grey / near-black only.

Chroma lives in **one** accent, switched with `data-accent` on `<html>`:

| Id | Name | Gradient |
| --- | --- | --- |
| `ember` | Red–orangish | `--brand-from` → `--brand-to` |
| `sun` | Yellow–orangeish | same tokens |
| `ice` | Blue–light blue | same tokens |

Set it with `useAccent()` / the sidebar swatches. Never hard-code orange hex in a component.

```tsx
<Button variant="brand">Open</Button>
<span className="text-brand">↑ 18.6%</span>
<div className="bg-brand-gradient" />
```

Sparklines and primary CTAs use the accent **gradient**. Status text uses `--brand`.

Do not add a second accent. Do not use purple. Green is only for “Active” / done, never as brand.

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

Use `Card` from `components/ui/card`. It is already tight and 8px.

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

Hairline only: `ring-1 ring-foreground/10`. No drop shadows, no glow on the card itself. Chart strokes may use the accent gradient.

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
6. Check dark (default) and the three accent swatches.
7. If you need a primitive, take it from `components/ui`. Chat pieces from `components/kit`.

---

## Files

| File | What |
| --- | --- |
| `app/globals.css` | Greyscale tokens, 8px radius, accent palettes |
| `lib/accent.ts` | `ember` / `sun` / `ice` |
| `components/kit/app-shell.tsx` | Shell |
| `components/kit/app-sidebar.tsx` | Expandable nav + accent picker |
| `components/dash/churn-dashboard.tsx` | Faux dashboard reference |
| `components/dash/ops-panels.tsx` | Chat, todo, and mail-in cards |
| `DESIGN.md` | Full taste + a11y + anti-slop |

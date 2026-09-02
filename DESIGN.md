# DESIGN.md

Calle’s design language for product UI. **Agents: read this before writing any interface.** Humans: this is the taste file.

Quiet, editorial, Nordic-tool. Ink on warm paper. Not a marketing site. Not a dashboard costume.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- shadcn/ui **Nova** on **Base UI** (`components/ui`)
- Original chat pieces in `components/kit`
- `cn()` (`clsx` + `tailwind-merge`) for class logic
- Tokens live in `app/globals.css`. Do not introduce raw hex in components.

## Taste

- One type family for UI: **Geist**. Mono for code, commands, identifiers.
- Medium-weight, tight-tracking headings. Sentence case for labels.
- Palette is parchment / ink. Neutral. No decorative accents.
- One reserved chroma: ochre for *live* AI status (`--status-running`). Green for done. Destructive red for failure. Never purple.
- Elevation is a hairline ring (`ring-1 ring-foreground/10`) or `shadow-xs`. No glow.
- Radius is modest (`--radius: 0.5rem`). Long-form content stays rectangular.
- Empty states get **one** next action.
- Limit accent color to one per view.

## Anti-slop

Never ship these unless Calle asks for them by name:

- Purple, violet, or multicolor gradients
- Glow / bloom as an affordance
- Inter + gradient hero + three feature cards
- Decorative blobs, noise overlays used as identity
- Glassmorphism on every surface
- Bounce / spring on controls used many times a day
- `h-screen` (use `h-dvh`)
- Mixing Radix and Base UI in the same interaction
- Rebuilding keyboard behavior by hand
- New primitive when `components/ui` or `components/kit` already has one

## Spacing & layout

- Tailwind default scale. Prefer `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`.
- Compact controls (Nova is `h-8` for default buttons/inputs). Page chrome can breathe; controls stay dense.
- Use `size-*` for squares instead of paired `w-*` + `h-*`.
- Fixed z-index scale only (`lib/z-index.ts`): base 0, sticky 20, overlay 50, toast 60.
- Respect `safe-area-inset` on fixed elements.
- Narrow reading column for documentation. Grids for collections.

## Typography

- `text-balance` on headings, `text-pretty` on body.
- `tabular-nums` for data, money, counters, elapsed time.
- `truncate` / `line-clamp` in dense UI.
- Do not change letter-spacing unless asked.
- Body stays at the base size. Do not inflate paragraph type to “look designed”.

## Color

| Token | Use |
| --- | --- |
| `--background` | Page |
| `--card` / `--popover` | Elevated surfaces |
| `--foreground` | Primary text |
| `--muted-foreground` | Secondary text |
| `--primary` | Important actions (ink, not brand candy) |
| `--destructive` | Irreversible / error |
| `--status-running` | Live agent work only |
| `--status-done` | Completed agent work |

Light and dark are first-class. Semantic tokens must flip. Do not hard-code `white` / `black` on surfaces.

## Motion

From Emil Kowalski, *You Don’t Need Animations*, plus UI Skills `baseline-ui`:

1. **Purpose first.** Animate to explain, orient, or confirm. Not to decorate.
2. **Frequency.** If someone will do it dozens of times a day, skip the animation. Keyboard-initiated actions: never animate.
3. **Speed.** UI motion ≤ 200ms for interaction feedback, never over 300ms. Faster often feels more honest.
4. **Compositor only.** `transform` and `opacity`. Never `width`, `height`, `top`, `left`, `margin`, `padding`. Avoid animating `background` / `color` except tiny local UI.
5. **Reduced motion.** Honor `prefers-reduced-motion`. Pause looping animation when off-screen.
6. **Tooltips.** Delay on first open; subsequent tooltips in the same session appear with no delay (provider already set to 400ms).
7. Do not add animation unless the task asks for it.

Delight is allowed on rare paths (first-run, success that happens weekly). It is banned on send, toggle, tab, and command palette.

## Accessibility

- Icon-only buttons have `aria-label`. Decorative icons are `aria-hidden`.
- Every input has a label. Errors use `aria-invalid` + `aria-describedby` next to the field.
- Visible focus. Do not remove rings without a replacement.
- Dialogs trap focus, restore trigger focus, close on Escape.
- Prefer native elements over ARIA theater.
- Contrast: body text AA against background and card.
- Do not use color alone for state. Pair with a label or icon (`StatusChip`).
- Never block paste on inputs.

## Components — use the kit

**Primitives** (`components/ui`, MIT, shadcn): Button, Input, Textarea, Field, Checkbox, Switch, Select, Card, Dialog, AlertDialog, Sheet, DropdownMenu, Tabs, Accordion, Breadcrumb, Alert, Badge, Avatar, Table, Tooltip, Progress, Skeleton, Empty, Spinner, Kbd, Toggle, Sonner.

**Chat / agent** (`components/kit`, MIT, original):

| Component | When |
| --- | --- |
| `ChatThread` | Scrollable message log (`role="log"`) |
| `ChatMessage` | User / assistant bubbles |
| `MarkdownBubble` | Assistant markdown without the chrome of a full message |
| `Composer` | Enter to send, Shift+Enter newline, never block paste |
| `ToolChip` / `ToolChipStack` | Tool calls as compact chips |
| `StatusChip` | queued / running / done / error |
| `ThinkingTrace` | Expandable reasoning |
| `ApprovalCard` | Human-in-the-loop confirm |
| `TaskRow` | Agent task list |
| `CodeBlock` | Copyable listing |
| `SiteNav` | Product top bar |
| `ThemeToggle` | Light / dark |

Destructive actions go through `AlertDialog`. Loading: skeleton for structure, spinner for local actions.

## Checklist before shipping UI

Copied in spirit from [designsystemchecklist.com](https://www.designsystemchecklist.com) and UI Skills:

- [ ] Uses existing tokens (no new named color)
- [ ] Uses an existing primitive or kit piece
- [ ] Hover, focus, disabled, loading, empty, error considered
- [ ] Keyboard works; focus is visible
- [ ] Dark mode checked
- [ ] Reduced motion does not break the flow
- [ ] No purple, glow, or ornamental gradient
- [ ] Copy is specific, sentence case, not lorem

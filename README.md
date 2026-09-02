# Calle Design

Personal design-template repo: **taste**, **rules**, and an **AI-ready component kit**.

Point future coding agents at this repository instead of a list of inspiration links.

**Preview:** [https://design-callewallerstedts-projects.vercel.app](https://design-callewallerstedts-projects.vercel.app)

## For agents

1. Read **[`TUTORIAL.md`](./TUTORIAL.md)** — Inter, 8px rounding, tight padding, greyscale + accent gradients.
2. Then [`DESIGN.md`](./DESIGN.md) and [`AGENTS.md`](./AGENTS.md).
3. Wrap product UI in `AppShell`. Prefer existing pieces:

```ts
import { AppShell } from "@/components/kit/app-shell"
import { Button } from "@/components/ui/button"
import { Composer, ChatThread, ToolChip } from "@/components/kit"
```

## For humans

```bash
npm install
npm run dev
```

- [http://localhost:3000](http://localhost:3000) — faux churn dashboard (sidebar, accents, tight cards)
- [http://localhost:3000/kit](http://localhost:3000/kit) — component gallery (light / dark / split)

Accent swatches in the sidebar: **Ember** (red–orange), **Sun** (yellow–orange), **Ice** (blue). Collapse from the header panel icon or the bottom of the sidebar; expand the same way, or click the **C** mark when the rail is collapsed.

## Kit map

| Area | Path |
| --- | --- |
| Tutorial (start here) | `TUTORIAL.md` |
| Design tokens | `app/globals.css` |
| shadcn primitives | `components/ui/` |
| Shell + chat | `components/kit/` |
| Faux dashboard | `components/dash/` |
| Gallery | `app/kit/page.tsx` |

## Sources

Full licenses: [`ATTRIBUTION.md`](./ATTRIBUTION.md) · this repo [`LICENSE`](./LICENSE) (MIT).

- [ui-skills.com](https://ui-skills.com) (MIT skills)
- [coss.com/ui](https://coss.com/ui) (MIT UI via CLI)
- [designsystemchecklist.com](https://www.designsystemchecklist.com)
- [reui.io/components](https://reui.io/components) (reference only — commercial)
- [You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)
- [beautifului.dev](https://www.beautifului.dev/) (patterns only)
- [beui.dev](https://beui.dev/)
- [rareui.com](https://www.rareui.com/)
- [transitions.dev](https://transitions.dev/)
- [ui.shadcn.com](https://ui.shadcn.com/) (MIT)

## License

MIT. Third-party snippets keep their original licenses as listed in ATTRIBUTION.md.

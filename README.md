# Calle Design

Personal design-template repo: **taste**, **rules**, and an **AI-ready component kit**.

Point future coding agents at this repository instead of a list of inspiration links.

**Preview:** [https://design-callewallerstedts-projects.vercel.app](https://design-callewallerstedts-projects.vercel.app)

## What this is

Machina’s method ([thread](https://x.com/EXM7777/status/2092250905655812121)): frontend needs taste so it does not look like slop. Collect modules, build a lego of components, let agents edit real code.

EP’s follow-up ([thread](https://x.com/eptwts/status/2092298910190448727)): send the agent a short list of UI resources. This repo **collapses those resources** into rules + owned code, rather than asking every agent to scrape the internet.

## For agents

1. Read [`DESIGN.md`](./DESIGN.md) — taste, spacing, type, color, motion restraint, a11y, anti-slop.
2. Follow [`AGENTS.md`](./AGENTS.md) / [`AGENT.md`](./AGENT.md).
3. Prefer existing pieces:

```ts
import { Button } from "@/components/ui/button"
import { Composer, ChatThread, ToolChip } from "@/components/kit"
```

4. Do not paste Beautiful UI / ReUI / transitions.dev Pro source. Wrap primitives. Attribute new MIT copies in [`ATTRIBUTION.md`](./ATTRIBUTION.md).

## For humans

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Light / Dark / Split** in the header.

```bash
npm run build
```

Stack: Next.js App Router, TypeScript, Tailwind v4, shadcn/ui Nova + Base UI.

## Kit map

| Area | Path |
| --- | --- |
| Design tokens | `app/globals.css` |
| shadcn primitives | `components/ui/` |
| Chat / agent pieces | `components/kit/` |
| Gallery | `app/page.tsx`, `components/gallery/` |

Chat pieces: message list, markdown bubble, composer, tool chips, status chips, thinking trace, approval card, task rows.

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

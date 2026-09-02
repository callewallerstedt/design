# Attribution

This kit is original work unless noted. Closed-source galleries were used as **pattern references only**. Their source was not copied.

## Copied (MIT / permissive)

### shadcn/ui
- Site: https://ui.shadcn.com/
- License: [MIT](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- What we shipped: owned copies in `components/ui/*`, generated with `npx shadcn@latest` (Nova preset, Base UI).
- Also: `lib/utils.ts` (`cn`), Tailwind preset CSS from the shadcn CLI.

### UI Skills
- Site: https://ui-skills.com · https://github.com/ibelick/ui-skills
- License: MIT
- What we used: rules from `DESIGN.md`, `skills/baseline-ui/SKILL.md`, and `skills/fixing-accessibility/SKILL.md`, rewritten into this repo’s `DESIGN.md` / `AGENTS.md`. Skill files themselves were not vendored.

### Base UI
- https://base-ui.com — MIT, dependency `@base-ui/react`.

### Geist
- Vercel Geist fonts via `next/font/google`.

## Inspired, not copied

Original wrappers live in `components/kit/*` (MIT, this repo).

| Source | License | How it was used |
| --- | --- | --- |
| [Beautiful UI](https://www.beautifului.dev/) | Proprietary | Pattern names only: tool chips, composer, thinking, approval, task rows. Reimplemented. |
| [beUI](https://beui.dev/) | Open registry / shadcn distribution | Motion restraint instead of copying spring/tilt primitives. |
| [Rare UI](https://www.rareui.com/) | Open registry | Not vendored; too ornamental for this taste file. |
| [transitions.dev](https://transitions.dev/) | Mixed (copy snippets + Pro) | Principles only (fast overlay, delayed tooltips). No snippet dump. |
| [ReUI](https://reui.io/components) | Commercial (KeenThemes) on MIT primitives | **Not copied.** Use shadcn primitives instead. |
| [coss.com/ui](https://coss.com/ui) | MIT for CLI-installed UI (`apps/ui`) | Catalog as a completeness checklist. We installed shadcn Nova rather than vendoring coss. |
| [designsystemchecklist.com](https://www.designsystemchecklist.com) | Site content | Foundations / components / a11y checklist folded into DESIGN.md. |
| [You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations) | Essay © Emil Kowalski | Purpose / frequency / speed rules paraphrased in DESIGN.md. Read the original. |

## Prompt sources

- [Machina (@EXM7777)](https://x.com/EXM7777/status/2092250905655812121) — collect modules, send agents a lego kit.
- [EP (@eptwts)](https://x.com/eptwts/status/2092298910190448727) — additional UI resources for agents.

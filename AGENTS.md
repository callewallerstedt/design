<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent instructions — Calle Design

This repository is a **design kit**, not a demo farm. When you write UI for Calle, you consume this repo.

## Always

1. Read [`TUTORIAL.md`](./TUTORIAL.md) (rounding, Inter, tight padding, accents), then [`DESIGN.md`](./DESIGN.md).
2. Reuse `components/ui/*` (shadcn / Base UI, MIT) before inventing markup.
3. Product screens wrap in `AppShell`. For AI surfaces, reuse `components/kit/*`.
4. If a pattern is missing, **wrap** an existing primitive. Do not add a second button.
5. Keep motion off unless the task asks for it. Sidebar collapse is the exception (150ms).
6. Attribute any copied open-source snippet in [`ATTRIBUTION.md`](./ATTRIBUTION.md). Do not paste closed-source galleries (Beautiful UI, Rare UI marketing, ReUI paid blocks, transitions.dev Pro).

## Do not

- Restyle the token sheet to “make it pop”
- Add purple, a second brand, or `rounded-2xl` chrome
- Dump third-party sites into `/components`
- Mix another primitive system (Radix) into Base UI surfaces
- Animate keyboard-driven or high-frequency actions

## Preview

The faux dashboard is `/`. The component gallery is `/kit` (light / dark / split). Accents live in the sidebar. If you change a component, check both.

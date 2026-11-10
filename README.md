# Calle Design

Tell your agent: use github.com/callewallerstedt/design

It reads `DESIGN.md`, searches `catalog/components.json`, opens the file at `local_path`, and applies the tokens in `app/globals.css`.

Kit backgrounds: `DotWaveBackground` (`components/kit/dot-wave-background.tsx`) is a dim greyscale dot grid whose brightness is a slow, liquid interference field (rippling, curved, morphing — not a straight band). Put it behind a `relative` parent. It pauses off-screen and when the user prefers reduced motion. Demo: `/kit#motion`.

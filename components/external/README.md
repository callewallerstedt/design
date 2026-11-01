# External components

Free MIT source, vendored so you can read it and import it. BoardUI Pro is not here.

| Library | Path | License |
| --- | --- | --- |
| EasyUI | `components/external/easyui/ui/` | MIT |
| BoardUI free | `components/external/boardui/` | MIT |

Shared EasyUI helpers are in `components/external/easyui/lib/`. BoardUI primitives are under `base/`, composed blocks under `application/`, tokens under `styles/`.

Search from the repo root:

```bash
node scripts/find.mjs chart
```

Import a file from its `local_path` in `catalog/components.json`:

```tsx
import { MagneticButton } from "@/components/external/easyui/ui/MagneticButton"
import { Button } from "@/components/external/boardui/base/buttons/button"
```

Calle’s own primitives stay in `components/ui` and `components/kit`. Both libraries export a `Button`. Alias one of them when you import both.

BoardUI styles in `components/external/boardui/styles/` are their theme. Do not import that sheet over `app/globals.css`. Restyle to the tokens in [`DESIGN.md`](../../DESIGN.md).

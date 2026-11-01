# BoardUI (free)

MIT source from [boardui.com](https://www.boardui.com) / [BoardUI/boardui](https://github.com/BoardUI/boardui). License: `LICENSE` in this folder.

| Folder | What |
| --- | --- |
| `base/` | Primitives (button, input, modal, …) |
| `application/` | Blocks (sidebar, charts, auth, chat) |
| `foundations/` | Direction, icons, template chrome |
| `utils/`, `hooks/` | `cx`, dismiss, count-up |
| `styles/` | Their theme. Do not replace `app/globals.css` with this |
| `server/chat-route.ts` | Agent chat endpoint source. Not mounted as a route |
| `docs/agent-rules.md` | Upstream agent rules. Calle’s rules stay in `AGENTS.md` |

Pro components and templates are not included. They need a license: https://www.boardui.com/pricing

```tsx
import { Button } from "@/components/external/boardui/base/buttons/button"
import { Modal } from "@/components/external/boardui/base/modal/modal"
```

import { cn } from "@/lib/utils"
import { Markdown } from "@/lib/markdown"

export function MarkdownBubble({
  markdown,
  className,
}: {
  markdown: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-[min(100%,42rem)] rounded-xl bg-card px-3.5 py-3 ring-1 ring-foreground/10",
        className
      )}
    >
      <Markdown>{markdown}</Markdown>
    </div>
  )
}

import { cn } from "@/lib/utils"

export function ChatThread({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      className={cn(
        "flex h-full min-h-0 flex-col gap-4 overflow-y-auto px-3 py-4",
        className
      )}
    >
      {children}
    </div>
  )
}

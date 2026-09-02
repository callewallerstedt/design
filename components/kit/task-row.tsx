import { cn } from "@/lib/utils"
import { StatusChip } from "@/components/kit/status-chip"

export function TaskRow({
  title,
  meta,
  status,
  className,
}: {
  title: string
  meta?: string
  status: "queued" | "running" | "done" | "error"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/60",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {meta ? (
          <p className="truncate text-xs text-muted-foreground">{meta}</p>
        ) : null}
      </div>
      <StatusChip status={status} />
    </div>
  )
}

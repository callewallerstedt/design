"use client"

import { cva, type VariantProps } from "class-variance-authority"
import {
  AlertCircleIcon,
  CheckIcon,
  CircleDashedIcon,
  Loader2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const statusChipVariants = cva(
  "inline-flex h-6 w-fit items-center gap-1.5 rounded-full border px-2 font-mono text-[11px] font-medium tabular-nums",
  {
    variants: {
      status: {
        queued:
          "border-border bg-muted text-muted-foreground",
        running:
          "border-status-running/30 bg-status-running/10 text-status-running",
        done: "border-status-done/30 bg-status-done/10 text-status-done",
        error:
          "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      status: "queued",
    },
  }
)

const icons = {
  queued: CircleDashedIcon,
  running: Loader2Icon,
  done: CheckIcon,
  error: AlertCircleIcon,
}

export function StatusChip({
  status = "queued",
  children,
  className,
  elapsed,
}: VariantProps<typeof statusChipVariants> & {
  children?: React.ReactNode
  className?: string
  elapsed?: string
}) {
  const Icon = icons[status ?? "queued"]
  const label =
    children ??
    (status === "queued"
      ? "Queued"
      : status === "running"
        ? "Running"
        : status === "done"
          ? "Done"
          : "Failed")

  return (
    <span className={cn(statusChipVariants({ status }), className)}>
      <Icon
        className={cn(
          "size-3",
          status === "running" && "motion-safe:animate-spin"
        )}
        aria-hidden
      />
      {label}
      {elapsed ? <span className="opacity-70">{elapsed}</span> : null}
    </span>
  )
}

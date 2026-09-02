"use client"

import {
  FileSearchIcon,
  GlobeIcon,
  PencilIcon,
  TerminalIcon,
  WrenchIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { StatusChip } from "@/components/kit/status-chip"

const toolIcons = {
  search: FileSearchIcon,
  browse: GlobeIcon,
  edit: PencilIcon,
  shell: TerminalIcon,
  tool: WrenchIcon,
} as const

export type ToolKind = keyof typeof toolIcons
export type ToolStatus = "queued" | "running" | "done" | "error"

export function ToolChip({
  name,
  kind = "tool",
  status = "done",
  detail,
  className,
}: {
  name: string
  kind?: ToolKind
  status?: ToolStatus
  detail?: string
  className?: string
}) {
  const Icon = toolIcons[kind]

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1 text-xs text-foreground ring-1 ring-foreground/5",
        className
      )}
    >
      <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <span className="truncate font-medium">{name}</span>
      {detail ? (
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {detail}
        </span>
      ) : null}
      <StatusChip status={status} />
    </span>
  )
}

export function ToolChipStack({
  children,
  summary,
  className,
}: {
  children: React.ReactNode
  summary?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {summary ? (
        <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {summary}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

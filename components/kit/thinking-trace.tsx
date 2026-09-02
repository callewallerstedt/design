"use client"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { StatusChip } from "@/components/kit/status-chip"

export function ThinkingTrace({
  title = "Thinking",
  status = "done",
  elapsed,
  children,
  className,
}: {
  title?: string
  status?: "running" | "done"
  elapsed?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Accordion className={cn("w-full", className)}>
      <AccordionItem value="trace" className="border-none">
        <AccordionTrigger className="py-1.5 hover:no-underline">
          <span className="flex items-center gap-2">
            <span className="text-xs font-medium">{title}</span>
            <StatusChip status={status} elapsed={elapsed} />
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="rounded-lg bg-muted/60 px-3 py-2 font-mono text-[12px] leading-relaxed text-muted-foreground">
            {children}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

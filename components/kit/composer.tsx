"use client"

import { useState } from "react"
import { ArrowUpIcon, PaperclipIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

export function Composer({
  placeholder = "Message the agent…",
  onSubmit,
  disabled,
  className,
}: {
  placeholder?: string
  onSubmit?: (value: string) => void
  disabled?: boolean
  className?: string
}) {
  const [value, setValue] = useState("")
  const canSend = value.trim().length > 0 && !disabled

  function submit() {
    if (!canSend) return
    onSubmit?.(value.trim())
    setValue("")
  }

  return (
    <form
      className={cn(
        "rounded-xl bg-card p-2 ring-1 ring-foreground/10 focus-within:ring-ring/40",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <label className="sr-only" htmlFor="composer-input">
        Message
      </label>
      <textarea
        id="composer-input"
        rows={2}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            submit()
          }
        }}
        className="field-sizing-content max-h-40 min-h-12 w-full resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
      />
      <div className="flex items-center justify-between gap-2 px-1 pt-1">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Attach file"
            disabled={disabled}
          >
            <PaperclipIcon />
          </Button>
          <span className="hidden text-[11px] sm:inline">
            <Kbd>Enter</Kbd> to send · <Kbd>Shift</Kbd> <Kbd>Enter</Kbd> for
            newline
          </span>
        </div>
        <Button
          type="submit"
          size="icon-sm"
          aria-label="Send message"
          disabled={!canSend}
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </form>
  )
}

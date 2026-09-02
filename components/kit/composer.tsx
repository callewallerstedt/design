"use client"

import { useState } from "react"
import { ArrowUpIcon, PaperclipIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Composer({
  placeholder = "Message",
  onSubmit,
  disabled,
  className,
  inputId = "composer-input",
}: {
  placeholder?: string
  onSubmit?: (value: string) => void
  disabled?: boolean
  className?: string
  inputId?: string
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
        "rounded-lg bg-card p-2 ring-1 ring-foreground/10 focus-within:ring-ring/40",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <label className="sr-only" htmlFor={inputId}>
        Message
      </label>
      <textarea
        id={inputId}
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
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Attach"
          disabled={disabled}
        >
          <PaperclipIcon />
        </Button>
        <Button
          type="submit"
          size="icon-sm"
          aria-label="Send"
          disabled={!canSend}
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </form>
  )
}

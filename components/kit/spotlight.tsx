"use client"

import { useCallback, type MouseEvent, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type MoveEvent<T extends HTMLElement> = MouseEvent<T>

export function useCursorBorder<T extends HTMLElement>() {
  const onMouseMove = useCallback((event: MoveEvent<T>) => {
    const node = event.currentTarget
    const rect = node.getBoundingClientRect()
    node.style.setProperty("--x", `${event.clientX - rect.left}px`)
    node.style.setProperty("--y", `${event.clientY - rect.top}px`)
  }, [])

  return { onMouseMove }
}

export function Spotlight({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { children?: ReactNode }) {
  const { onMouseMove } = useCursorBorder<HTMLDivElement>()

  return (
    <div
      className={cn("spotlight", className)}
      onMouseMove={onMouseMove}
      {...props}
    >
      {children}
    </div>
  )
}

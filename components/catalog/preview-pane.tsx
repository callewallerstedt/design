"use client"

import { Component, useEffect, useState, type ReactNode } from "react"

import { DirectionProvider } from "@/components/external/boardui/foundations/direction/direction"
import { previewLoaders } from "@/components/catalog/preview-loaders"
import { Skeleton } from "@/components/ui/skeleton"

type Item = {
  id: string
  name: string
  source: string
  paid: boolean
  local_path: string | null
  description: string
  install: string
  url: string
}

function pickComponent(
  mod: Record<string, unknown>,
  fileStem: string
) {
  const pascal = fileStem
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
  const named = [pascal, fileStem, `${pascal}Example`, `DataTableExample`]
  for (const key of named) {
    if (typeof mod[key] === "function") return mod[key] as React.ComponentType
  }
  const fns = Object.entries(mod).filter(([, value]) => typeof value === "function")
  const example = fns.find(([name]) => /Example|Preview|Demo/.test(name))
  if (example) return example[1] as React.ComponentType
  const component = fns.find(([name]) => /^[A-Z]/.test(name))
  return (component?.[1] ?? fns[0]?.[1]) as React.ComponentType | undefined
}

class PreviewBoundary extends Component<
  { children: ReactNode; resetKey: string },
  { error: Error | null }
> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <p className="text-xs text-muted-foreground">
          This file needs props or a provider before it can render. Open the path and import it directly.
        </p>
      )
    }
    return this.props.children
  }
}

export function PreviewPane({ item }: { item: Item | null }) {
  const [Comp, setComp] = useState<React.ComponentType | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!item?.local_path) {
      setComp(null)
      setFailed(false)
      return
    }
    const load = previewLoaders[item.id]
    if (!load) {
      setComp(null)
      setFailed(true)
      return
    }
    let cancel = false
    setComp(null)
    setFailed(false)
    const stem = item.local_path.split("/").pop()?.replace(/\.tsx$/, "") ?? ""
    load()
      .then((mod) => {
        if (cancel) return
        const next = pickComponent(mod, stem)
        if (!next) setFailed(true)
        else setComp(() => next)
      })
      .catch(() => {
        if (!cancel) setFailed(true)
      })
    return () => {
      cancel = true
    }
  }, [item])

  if (!item) {
    return (
      <p className="text-sm text-muted-foreground">Select a component.</p>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <div>
        <h2 className="text-sm font-semibold">{item.name}</h2>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
      <p className="truncate text-xs text-muted-foreground">
        {item.local_path ?? "BoardUI Pro. Source is not in this repo."}
      </p>
      <p className="truncate text-xs text-muted-foreground">{item.install}</p>
      <div className="relative isolate min-h-48 overflow-hidden rounded-lg bg-background p-1 [transform:translateZ(0)]">
        {item.paid ? (
          <p className="text-xs text-muted-foreground">
            Indexed only. The public registry does not ship this file.
          </p>
        ) : failed ? (
          <p className="text-xs text-muted-foreground">
            Could not mount a preview. The source file is still at the path above.
          </p>
        ) : Comp ? (
          <PreviewBoundary resetKey={item.id}>
            <DirectionProvider locale="en">
              <Comp />
            </DirectionProvider>
          </PreviewBoundary>
        ) : (
          <Skeleton className="h-24 w-full" />
        )}
      </div>
    </div>
  )
}

"use client"

import { useMemo, useState } from "react"

import { PreviewPane } from "@/components/catalog/preview-pane"
import { Spotlight } from "@/components/kit/spotlight"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

type Item = {
  id: string
  name: string
  source: string
  paid: boolean
  primary: string
  local_path: string | null
  description: string
  install: string
  url: string
  use_cases: string[]
}

export function CatalogBrowser({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("")
  const [source, setSource] = useState<"all" | "easyui" | "boardui">("all")
  const [selected, setSelected] = useState<string>(items.find((item) => item.local_path)?.id ?? items[0]?.id)

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    return items.filter((item) => {
      if (source !== "all" && item.source !== source) return false
      if (!terms.length) return true
      const hay = `${item.name} ${item.primary} ${item.description} ${item.use_cases.join(" ")}`.toLowerCase()
      return terms.every((term) => hay.includes(term))
    })
  }, [items, query, source])

  const current = items.find((item) => item.id === selected) ?? filtered[0] ?? null

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 p-1">
      <Card>
        <CardHeader>
          <CardTitle>Style</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-1">
            <Button>Open</Button>
            <Button variant="outline">Filter</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <Input aria-label="Sample field" placeholder="Field" />
          <Skeleton className="h-7 w-40" />
        </CardContent>
      </Card>

      <div className="grid gap-1 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="flex min-h-0 flex-col gap-1">
          <Input
            aria-label="Search components"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="flex gap-1">
            {(["all", "easyui", "boardui"] as const).map((id) => (
              <Button
                key={id}
                size="sm"
                variant={source === id ? "brand" : "ghost"}
                onClick={() => setSource(id)}
              >
                {id}
              </Button>
            ))}
          </div>
          <ul className="flex max-h-[70dvh] flex-col overflow-y-auto">
            {filtered.map((item) => {
              const active = item.id === current?.id
              return (
                <li key={item.id}>
                  <Spotlight>
                    <button
                      type="button"
                      onClick={() => setSelected(item.id)}
                      className={
                        active
                          ? "flex h-7 w-full items-center gap-1 rounded-lg bg-accent px-2 text-left text-xs text-white"
                          : "flex h-7 w-full items-center gap-1 rounded-lg px-2 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                      }
                    >
                      <span className="truncate">{item.name}</span>
                      {item.paid ? <span className="ml-auto">Pro</span> : null}
                    </button>
                  </Spotlight>
                </li>
              )
            })}
          </ul>
        </div>
        <Card>
          <CardContent>
            <PreviewPane item={current} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

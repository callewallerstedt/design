"use client"

import { Columns2Icon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GallerySections } from "@/components/gallery/gallery-sections"

export type GalleryMode = "light" | "dark" | "split"

export function GalleryApp({
  mode,
  onModeChange,
}: {
  mode: GalleryMode
  onModeChange: (mode: GalleryMode) => void
}) {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-3 py-5 lg:px-4">
        <aside className="sticky top-3 hidden h-fit w-40 shrink-0 lg:block">
          <nav className="flex flex-col gap-0.5 text-sm">
            {[
              ["#foundations", "Foundations"],
              ["#primitives", "Primitives"],
              ["#forms", "Forms"],
              ["#overlays", "Overlays"],
              ["#nav", "Navigation"],
              ["#feedback", "Feedback"],
              ["#chat", "Chat"],
              ["#motion", "Motion"],
              ["#rules", "Rules"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 pb-16">
          <GalleryHero
            mode={mode}
            onModeChange={onModeChange}
          />
          <GallerySections />
        </main>
      </div>
    </div>
  )
}

function GalleryHero({
  mode,
  onModeChange,
}: {
  mode: GalleryMode
  onModeChange: (mode: GalleryMode) => void
}) {
  return (
    <section className="mb-8 max-w-2xl">
      <div className="mb-3">
        <ModeSwitch mode={mode} onModeChange={onModeChange} />
      </div>
      <h1 className="text-balance text-3xl font-semibold tracking-tight">
        Kit
      </h1>
      <p className="mt-2 text-pretty text-sm text-muted-foreground">
        TUTORIAL.md · DESIGN.md
      </p>
    </section>
  )
}

function ModeSwitch({
  mode,
  onModeChange,
}: {
  mode: GalleryMode
  onModeChange: (mode: GalleryMode) => void
}) {
  const { setTheme } = useTheme()

  function choose(next: GalleryMode) {
    onModeChange(next)
    if (next !== "split") {
      setTheme(next)
    } else {
      setTheme("light")
    }
  }

  const options: { id: GalleryMode; label: string; icon: React.ReactNode }[] = [
    { id: "light", label: "Light", icon: <SunIcon className="size-3.5" /> },
    { id: "dark", label: "Dark", icon: <MoonIcon className="size-3.5" /> },
    { id: "split", label: "Split", icon: <Columns2Icon className="size-3.5" /> },
  ]

  return (
    <div
      role="group"
      aria-label="Preview theme"
      className="flex rounded-lg border border-border p-0.5"
    >
      {options.map((option) => (
        <Button
          key={option.id}
          type="button"
          size="xs"
          variant={mode === option.id ? "secondary" : "ghost"}
          aria-pressed={mode === option.id}
          className={cn(mode === option.id && "bg-muted")}
          onClick={() => choose(option.id)}
        >
          {option.icon}
          <span className="hidden sm:inline">{option.label}</span>
        </Button>
      ))}
    </div>
  )
}

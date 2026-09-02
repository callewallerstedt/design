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
          <p className="mb-1.5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            Kit
          </p>
          <nav className="flex flex-col gap-0.5 text-sm">
            {[
              ["#foundations", "Foundations"],
              ["#primitives", "Primitives"],
              ["#forms", "Forms"],
              ["#overlays", "Overlays"],
              ["#nav", "Navigation"],
              ["#feedback", "Feedback"],
              ["#chat", "AI chat"],
              ["#motion", "Motion"],
              ["#rules", "Agent rules"],
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
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          Component gallery
        </p>
        <ModeSwitch mode={mode} onModeChange={onModeChange} />
      </div>
      <h1 className="text-balance text-3xl font-semibold tracking-tight">
        Inter, 8px, greyscale, one accent.
      </h1>
      <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground">
        Follow{" "}
        <code className="rounded-lg bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
          TUTORIAL.md
        </code>{" "}
        and{" "}
        <code className="rounded-lg bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
          DESIGN.md
        </code>
        . Homepage is the faux dashboard. This page is the lego kit.
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

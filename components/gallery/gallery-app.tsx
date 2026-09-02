"use client"

import { Columns2Icon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SiteNav } from "@/components/kit/site-nav"
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
    <div className="min-h-dvh bg-background text-foreground">
      <SiteNav
        trailing={
          <ModeSwitch mode={mode} onModeChange={onModeChange} />
        }
      />
      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-8 lg:px-6">
        <aside className="sticky top-16 hidden h-fit w-44 shrink-0 lg:block">
          <p className="mb-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Kit
          </p>
          <nav className="flex flex-col gap-1 text-sm">
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
                className="rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 pb-24">
          <GalleryHero />
          <GallerySections />
        </main>
      </div>
    </div>
  )
}

function GalleryHero() {
  return (
    <section className="mb-14 max-w-2xl">
      <p className="mb-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        Personal design system · for humans and agents
      </p>
      <h1 className="text-balance text-4xl font-medium tracking-tight sm:text-5xl">
        Quiet interfaces. Sharp type. Almost no motion.
      </h1>
      <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">
        Calle&apos;s lego kit: taste rules in{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
          DESIGN.md
        </code>
        , copy-own primitives from shadcn, and original AI-chat pieces. Point
        future agents here instead of a pile of inspiration links.
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

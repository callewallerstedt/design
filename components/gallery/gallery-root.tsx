"use client"

import { useState } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { GalleryApp, type GalleryMode } from "@/components/gallery/gallery-app"

export function GalleryRoot() {
  const [mode, setMode] = useState<GalleryMode>("dark")

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      forcedTheme={mode === "split" ? "light" : mode}
    >
      <TooltipProvider delay={400}>
        {mode === "split" ? (
          <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
            <div className="min-h-dvh overflow-auto border-b border-border lg:border-r lg:border-b-0">
              <GalleryApp mode={mode} onModeChange={setMode} />
            </div>
            <div className="dark min-h-dvh overflow-auto bg-background text-foreground">
              <GalleryApp mode={mode} onModeChange={setMode} />
            </div>
          </div>
        ) : (
          <GalleryApp mode={mode} onModeChange={setMode} />
        )}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}

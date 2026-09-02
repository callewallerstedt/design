"use client"

import { useState } from "react"

import { AppHeader, AppSidebar } from "@/components/kit/app-sidebar"
import { ThemeToggle } from "@/components/kit/theme-toggle"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <AppSidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          trailing={<ThemeToggle />}
        />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

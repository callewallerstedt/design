"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { AccentProvider } from "@/components/accent-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AccentProvider>
        <TooltipProvider delay={400}>
          {children}
          <Toaster />
        </TooltipProvider>
      </AccentProvider>
    </ThemeProvider>
  )
}

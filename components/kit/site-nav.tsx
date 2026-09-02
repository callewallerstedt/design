import Link from "next/link"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export function SiteNav({
  className,
  trailing,
}: {
  className?: string
  trailing?: React.ReactNode
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-12 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-sm",
        className
      )}
    >
      <Link href="/" className="flex items-baseline gap-2">
        <span className="text-sm font-medium tracking-tight">Calle</span>
        <span className="text-sm text-muted-foreground">Design</span>
      </Link>
      <Separator orientation="vertical" className="hidden h-4 sm:block" />
      <nav className="hidden items-center gap-3 text-sm text-muted-foreground sm:flex">
        <a href="#primitives" className="hover:text-foreground">
          Primitives
        </a>
        <a href="#chat" className="hover:text-foreground">
          Chat
        </a>
        <a href="#motion" className="hover:text-foreground">
          Motion
        </a>
        <a href="#rules" className="hover:text-foreground">
          Rules
        </a>
      </nav>
      <div className="ml-auto flex items-center gap-2">{trailing}</div>
    </header>
  )
}

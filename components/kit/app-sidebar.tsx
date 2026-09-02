"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PanelsTopLeftIcon,
  SparklesIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { accentMeta, accents, type Accent } from "@/lib/accent"
import { useAccent } from "@/components/accent-provider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/#subscriptions", label: "Subscriptions", icon: WalletIcon },
  { href: "/#customers", label: "Customers", icon: UsersIcon },
  { href: "/#analytics", label: "Analytics", icon: BarChart3Icon },
  { href: "/", label: "Churn Risk", icon: SparklesIcon, match: "churn" },
  { href: "/kit", label: "Component kit", icon: PanelsTopLeftIcon },
  { href: "/kit#rules", label: "Tutorial", icon: BookOpenIcon },
]

export function AppSidebar({
  collapsed,
  onCollapsedChange,
}: {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}) {
  const pathname = usePathname()
  const { accent, setAccent } = useAccent()
  const churnActive = pathname === "/"

  return (
    <aside
      className={cn(
        "flex h-dvh shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground motion-safe:transition-[width] motion-safe:duration-150 motion-safe:ease-out",
        collapsed ? "w-14" : "w-56"
      )}
    >
      <div className={cn("flex h-12 items-center gap-2 px-2.5", collapsed && "justify-center")}>
        {collapsed ? (
          <button
            type="button"
            aria-label="Expand sidebar"
            title="Expand sidebar"
            onClick={() => onCollapsedChange(false)}
            className="flex size-7 items-center justify-center rounded-lg bg-brand-gradient text-[11px] font-semibold text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            C
          </button>
        ) : (
          <>
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand-gradient text-[11px] font-semibold text-brand-foreground">
              C
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-none">Calle</p>
              <p className="truncate text-[11px] text-muted-foreground">Design</p>
            </div>
          </>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-1.5 py-1">
        {nav.map((item) => {
          const Icon = item.icon
          const active =
            item.href === "/kit"
              ? pathname.startsWith("/kit")
              : item.match === "churn"
                ? churnActive
                : item.href === "/"
                  ? false
                  : pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-8 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0",
                active && "bg-brand-soft text-foreground ring-1 ring-brand/40"
              )}
            >
              <Icon className={cn("size-4 shrink-0", active && "text-brand")} />
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
            </Link>
          )
        })}
      </nav>

      {!collapsed ? (
        <div className="mx-1.5 mb-2 rounded-lg bg-muted/60 p-2.5 ring-1 ring-foreground/8">
          <p className="text-[11px] font-semibold">Pro tip</p>
          <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
            One accent. Greyscale everything else.
          </p>
          <Button variant="brand" size="sm" className="mt-2 w-full">
            Create flow
          </Button>
        </div>
      ) : null}

      <div className={cn("flex flex-col gap-1 px-1.5 pb-2", collapsed && "items-center")}>
        {!collapsed ? (
          <p className="px-1 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            Accent
          </p>
        ) : null}
        <div className={cn("flex gap-1", collapsed ? "flex-col" : "px-1")}>
          {accents.map((id) => (
            <AccentSwatch
              key={id}
              id={id}
              selected={accent === id}
              collapsed={collapsed}
              onSelect={setAccent}
            />
          ))}
        </div>
        <Separator className="my-1" />
        {!collapsed ? (
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-muted-foreground"
            aria-label="Help center"
          >
            <HelpCircleIcon />
            Help center
          </Button>
        ) : null}
        <Button
          variant={collapsed ? "outline" : "ghost"}
          size={collapsed ? "icon-sm" : "sm"}
          className={cn("justify-start text-muted-foreground", collapsed && "justify-center")}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => onCollapsedChange(!collapsed)}
        >
          {collapsed ? <PanelLeftOpenIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4" />}
          {!collapsed ? "Collapse" : null}
        </Button>
      </div>
    </aside>
  )
}

function AccentSwatch({
  id,
  selected,
  collapsed,
  onSelect,
}: {
  id: Accent
  selected: boolean
  collapsed: boolean
  onSelect: (accent: Accent) => void
}) {
  const meta = accentMeta[id]
  return (
    <button
      type="button"
      aria-label={`${meta.label} accent`}
      aria-pressed={selected}
      title={meta.hint}
      onClick={() => onSelect(id)}
      className={cn(
        "size-5 rounded-lg bg-brand-gradient ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring",
        selected && "ring-2 ring-foreground",
        collapsed && "size-4"
      )}
      style={swatchStyle(id)}
    />
  )
}

function swatchStyle(id: Accent): React.CSSProperties {
  const map: Record<Accent, [string, string]> = {
    ember: ["oklch(0.74 0.18 52)", "oklch(0.58 0.22 32)"],
    sun: ["oklch(0.86 0.16 92)", "oklch(0.7 0.18 58)"],
    ice: ["oklch(0.82 0.1 220)", "oklch(0.58 0.16 250)"],
  }
  const [from, to] = map[id]
  return { backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }
}

export function AppHeader({
  collapsed,
  onCollapsedChange,
  trailing,
}: {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  trailing?: React.ReactNode
}) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => onCollapsedChange(!collapsed)}
      >
        {collapsed ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
      </Button>
      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="outline" size="sm">
          Last 30 days
        </Button>
        <Button variant="outline" size="sm">
          Filters
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <BellIcon />
        </Button>
        {trailing}
      </div>
    </header>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ActivityIcon,
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  FolderOpenIcon,
  LayoutDashboardIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PanelsTopLeftIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/#subscriptions", label: "Subs", icon: WalletIcon },
  { href: "/#customers", label: "Customers", icon: UsersIcon },
  { href: "/#analytics", label: "Analytics", icon: BarChart3Icon },
  { href: "/", label: "Churn", icon: ActivityIcon, match: "churn" },
  { href: "/kit", label: "Kit", icon: PanelsTopLeftIcon },
  { href: "/catalog", label: "Catalog", icon: FolderOpenIcon },
  { href: "/kit#rules", label: "Rules", icon: BookOpenIcon },
]

export function AppSidebar({
  collapsed,
  onCollapsedChange,
}: {
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
}) {
  const pathname = usePathname()
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
              : item.href === "/catalog"
                ? pathname.startsWith("/catalog")
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

      <div className={cn("flex flex-col gap-1 px-1.5 pb-2", collapsed && "items-center")}>
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
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-2">
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
          30d
        </Button>
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <BellIcon />
        </Button>
        {trailing}
      </div>
    </header>
  )
}

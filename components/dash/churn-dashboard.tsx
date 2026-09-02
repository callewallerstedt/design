"use client"

import { ArrowUpRightIcon, BrainIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  RetentionChart,
  RiskDonut,
  ScoreRing,
  Sparkline,
} from "@/components/dash/charts"

const kpis = [
  {
    label: "At risk subscribers",
    value: "2,842",
    delta: "18.6%",
    spark: [18, 22, 19, 28, 26, 34, 32, 41],
  },
  {
    label: "High risk",
    value: "614",
    delta: "9.2%",
    spark: [8, 10, 9, 14, 13, 18, 16, 21],
  },
  {
    label: "Churn risk score",
    value: "72",
    delta: "4.1%",
    spark: [54, 58, 57, 61, 63, 66, 68, 72],
  },
  {
    label: "Predicted churn",
    value: "4.8%",
    delta: "1.3%",
    spark: [2.1, 2.4, 2.2, 3.1, 3.0, 3.8, 4.2, 4.8],
  },
]

const subscribers = [
  {
    name: "Mira Chen",
    email: "mira@northstar.io",
    score: 92,
    level: "High",
    factor: "Payment failure",
    last: "2h ago",
  },
  {
    name: "Jonas Berg",
    email: "jonas@fjord.app",
    score: 89,
    level: "High",
    factor: "Usage drop",
    last: "5h ago",
  },
  {
    name: "Amina Diallo",
    email: "amina@lumen.co",
    score: 81,
    level: "High",
    factor: "Support tickets",
    last: "1d ago",
  },
  {
    name: "Eli Park",
    email: "eli@papertrail.dev",
    score: 74,
    level: "Medium",
    factor: "Plan downgrade",
    last: "1d ago",
  },
  {
    name: "Sofia Ruiz",
    email: "sofia@cinder.studio",
    score: 68,
    level: "Medium",
    factor: "Idle seats",
    last: "2d ago",
  },
  {
    name: "Noah Adeyemi",
    email: "noah@keel.xyz",
    score: 61,
    level: "Medium",
    factor: "NPS dip",
    last: "3d ago",
  },
]

const triggers = [
  { title: "Payment failure", count: 128, status: "Active" },
  { title: "Usage cliff (14d)", count: 86, status: "Active" },
  { title: "Seat idle 21d", count: 54, status: "Active" },
  { title: "NPS ≤ 6", count: 31, status: "Paused" },
]

export function ChurnDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 p-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-brand uppercase">
            Churn risk
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Predictive churn flagging
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            AI-powered insights to identify at-risk subscribers before they cancel.
          </p>
        </div>
      </div>

      <section className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} size="sm">
            <CardHeader className="pb-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-2">
              <div>
                <p className="text-2xl font-semibold tabular-nums">{kpi.value}</p>
                <p className="mt-0.5 flex items-center gap-0.5 text-xs font-semibold text-brand">
                  <ArrowUpRightIcon className="size-3" />
                  {kpi.delta}
                </p>
              </div>
              <Sparkline values={kpi.spark} className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section id="analytics" className="grid gap-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Retention trend</CardTitle>
            <div className="rounded-lg bg-muted px-2 py-1 text-right">
              <p className="text-[10px] text-muted-foreground">Current rate</p>
              <p className="text-sm font-semibold tabular-nums text-brand">91.4%</p>
            </div>
          </CardHeader>
          <CardContent className="h-52">
            <RetentionChart
              values={[96, 95, 94.2, 93.1, 92.4, 91.4]}
              labels={["Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Risk score distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <RiskDonut high={614} medium={1288} low={940} />
            <ul className="space-y-1.5 text-xs">
              <LegendDot label="High" value="614" strong />
              <LegendDot label="Medium" value="1,288" />
              <LegendDot label="Low" value="940" muted />
            </ul>
          </CardContent>
        </Card>
      </section>

      <section id="customers" className="grid gap-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>At-risk subscribers</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <ul>
              {subscribers.map((row) => (
                <li
                  key={row.email}
                  className="flex items-center gap-2 border-t border-border px-2.5 py-1.5 first:border-t-0"
                >
                  <Avatar size="sm">
                    <AvatarFallback>
                      {row.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{row.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {row.email}
                    </p>
                  </div>
                  <ScoreRing score={row.score} />
                  <span
                    className={
                      row.level === "High"
                        ? "w-14 text-xs font-semibold text-brand"
                        : "w-14 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {row.level}
                  </span>
                  <span className="hidden w-28 truncate text-xs text-muted-foreground sm:block">
                    {row.factor}
                  </span>
                  <span className="hidden w-14 text-right text-[11px] text-muted-foreground tabular-nums md:block">
                    {row.last}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card id="subscriptions">
          <CardHeader>
            <CardTitle>Automated intervention triggers</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            {triggers.map((trigger) => (
              <div
                key={trigger.title}
                className="flex items-center gap-2 rounded-lg bg-muted/50 px-2 py-1.5 ring-1 ring-foreground/6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{trigger.title}</p>
                  <Badge
                    variant={trigger.status === "Active" ? "secondary" : "outline"}
                    className="mt-0.5 h-4 px-1.5 text-[10px]"
                  >
                    {trigger.status}
                  </Badge>
                </div>
                <p className="text-lg font-semibold tabular-nums text-brand">
                  {trigger.count}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="flex flex-row items-center gap-3 p-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
          <BrainIcon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">AI insight</p>
          <p className="text-xs text-muted-foreground">
            Payment-failure accounts churn 3.4× faster. Offer a 7-day dunning pause
            before the next retry.
          </p>
        </div>
        <Button variant="brand" size="sm">
          View recommended actions
        </Button>
      </Card>
    </div>
  )
}

function LegendDot({
  label,
  value,
  strong,
  muted,
}: {
  label: string
  value: string
  strong?: boolean
  muted?: boolean
}) {
  return (
    <li className="flex items-center gap-2">
      <span
        className="size-2 rounded-full"
        style={{
          background: strong
            ? "var(--brand)"
            : muted
              ? "color-mix(in oklch, var(--foreground) 22%, transparent)"
              : "color-mix(in oklch, var(--brand) 55%, white)",
        }}
      />
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto font-semibold tabular-nums">{value}</span>
    </li>
  )
}

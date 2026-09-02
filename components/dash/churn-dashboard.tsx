"use client"

import { ArrowUpRightIcon, InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  RetentionChart,
  RiskDonut,
  ScoreRing,
  Sparkline,
} from "@/components/dash/charts"
import { OpsPanels } from "@/components/dash/ops-panels"

const kpis = [
  {
    label: "At risk",
    value: "2,842",
    delta: "18.6%",
    spark: [18, 22, 19, 28, 26, 34, 32, 41],
  },
  {
    label: "High",
    value: "614",
    delta: "9.2%",
    spark: [8, 10, 9, 14, 13, 18, 16, 21],
  },
  {
    label: "Score",
    value: "72",
    delta: "4.1%",
    spark: [54, 58, 57, 61, 63, 66, 68, 72],
  },
  {
    label: "Churn",
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
    factor: "Payment",
    last: "2h",
  },
  {
    name: "Jonas Berg",
    email: "jonas@fjord.app",
    score: 89,
    factor: "Usage",
    last: "5h",
  },
  {
    name: "Amina Diallo",
    email: "amina@lumen.co",
    score: 81,
    factor: "Tickets",
    last: "1d",
  },
  {
    name: "Eli Park",
    email: "eli@papertrail.dev",
    score: 74,
    factor: "Downgrade",
    last: "1d",
  },
  {
    name: "Sofia Ruiz",
    email: "sofia@cinder.studio",
    score: 68,
    factor: "Seats",
    last: "2d",
  },
  {
    name: "Noah Adeyemi",
    email: "noah@keel.xyz",
    score: 61,
    factor: "NPS",
    last: "3d",
  },
]

const triggers = [
  { title: "Payment fail", count: 128 },
  { title: "Usage cliff", count: 86 },
  { title: "Idle seats", count: 54 },
  { title: "NPS ≤ 6", count: 31, muted: true },
]

export function ChurnDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 p-2">
      <h1 className="text-2xl font-semibold tracking-tight">Churn</h1>

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
            <CardTitle>Retention</CardTitle>
            <p className="text-sm font-semibold tabular-nums text-brand">91.4%</p>
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
            <CardTitle>Risk</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <RiskDonut high={614} medium={1288} low={940} />
            <ul className="space-y-1.5 text-xs">
              <LegendDot label="High" value="614" strong />
              <LegendDot label="Med" value="1,288" />
              <LegendDot label="Low" value="940" muted />
            </ul>
          </CardContent>
        </Card>
      </section>

      <section id="customers" className="grid gap-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>At risk</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <ul>
              {subscribers.map((row) => (
                <li
                  key={row.email}
                  className="flex items-center gap-2 border-t border-border px-(--card-spacing) py-1.5 first:border-t-0"
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
                  <span className="hidden w-20 truncate text-xs text-muted-foreground sm:block">
                    {row.factor}
                  </span>
                  <span className="hidden w-8 text-right text-[11px] text-muted-foreground tabular-nums md:block">
                    {row.last}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card id="subscriptions">
          <CardHeader>
            <CardTitle>Triggers</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5">
            {triggers.map((trigger) => (
              <div
                key={trigger.title}
                className="flex items-center gap-2 rounded-lg bg-muted/50 px-2 py-1.5 ring-1 ring-foreground/6"
              >
                <p
                  className={
                    trigger.muted
                      ? "min-w-0 flex-1 text-sm font-semibold text-muted-foreground"
                      : "min-w-0 flex-1 text-sm font-semibold"
                  }
                >
                  {trigger.title}
                </p>
                <p className="text-lg font-semibold tabular-nums text-brand">
                  {trigger.count}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <OpsPanels />

      <Card className="flex flex-row items-center gap-2 p-2">
        <InfoIcon className="size-4 shrink-0 text-brand" />
        <p className="min-w-0 flex-1 text-sm">
          Payment failures churn 3.4×. Pause dunning 7d.
        </p>
        <Button variant="brand" size="sm">
          Open
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

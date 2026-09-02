import { AppShell } from "@/components/kit/app-shell"
import { ChurnDashboard } from "@/components/dash/churn-dashboard"

export default function Home() {
  return (
    <AppShell>
      <ChurnDashboard />
    </AppShell>
  )
}

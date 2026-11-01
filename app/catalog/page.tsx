import { CatalogBrowser } from "@/components/catalog/catalog-browser"
import { AppShell } from "@/components/kit/app-shell"
import catalog from "@/catalog/components.json"

export default function CatalogPage() {
  return (
    <AppShell>
      <CatalogBrowser items={catalog.components} />
    </AppShell>
  )
}

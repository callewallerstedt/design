import { AppShell } from "@/components/kit/app-shell"
import catalog from "@/catalog/components.json"

export default function CatalogPage() {
  const groups = catalog.use_cases.map((useCase) => ({
    useCase,
    items: catalog.components.filter((item) => item.primary === useCase),
  }))

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 p-2">
        <h1 className="text-sm font-semibold">Catalog</h1>
        <p className="text-sm text-muted-foreground">
          {catalog.counts.vendored} components in components/external.{" "}
          {catalog.counts.boardui_pro} BoardUI Pro items are indexed only.
        </p>
        {groups.map((group) =>
          group.items.length ? (
            <section key={group.useCase} className="flex flex-col gap-1">
              <h2 className="text-xs font-semibold text-muted-foreground">
                {group.useCase}
              </h2>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="grid gap-1 border-t border-border py-1.5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:items-baseline"
                  >
                    <a
                      href={item.url}
                      className="truncate text-sm font-medium hover:underline"
                    >
                      {item.name}
                      {item.paid ? " · Pro" : ""}
                    </a>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {item.local_path ?? "Paid license. No source in this repo."}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null
        )}
      </div>
    </AppShell>
  )
}

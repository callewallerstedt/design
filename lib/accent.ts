/** White on dark, near-black on light. No colored brand hues. */
export const accents = ["paper"] as const

export type Accent = (typeof accents)[number]

export const accentMeta: Record<Accent, { label: string; hint: string }> = {
  paper: { label: "Paper", hint: "White" },
}

export const ACCENT_STORAGE_KEY = "calle-accent"
export const DEFAULT_ACCENT: Accent = "paper"

export function isAccent(value: string | null | undefined): value is Accent {
  return accents.includes(value as Accent)
}

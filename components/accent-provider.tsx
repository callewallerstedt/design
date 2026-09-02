"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import {
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  isAccent,
  type Accent,
} from "@/lib/accent"

const AccentContext = createContext<{
  accent: Accent
  setAccent: (accent: Accent) => void
}>({
  accent: DEFAULT_ACCENT,
  setAccent: () => {},
})

const ACCENT_EVENT = "calle-accent"

function subscribe(onStoreChange: () => void) {
  window.addEventListener(ACCENT_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener(ACCENT_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getSnapshot(): Accent {
  const stored = window.localStorage.getItem(ACCENT_STORAGE_KEY)
  return isAccent(stored) ? stored : DEFAULT_ACCENT
}

function getServerSnapshot(): Accent {
  return DEFAULT_ACCENT
}

function writeAccent(accent: Accent) {
  window.localStorage.setItem(ACCENT_STORAGE_KEY, accent)
  document.documentElement.dataset.accent = accent
  window.dispatchEvent(new Event(ACCENT_EVENT))
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const accent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const setAccent = useCallback((next: Accent) => {
    writeAccent(next)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.accent = accent
  }, [accent])

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  )
}

export function useAccent() {
  return useContext(AccentContext)
}

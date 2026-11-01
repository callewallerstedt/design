import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"

import { Providers } from "@/components/providers"

import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Calle Design",
  description:
    "Taste, design rules, and AI-ready UI components. Point future agents at this repo.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-mono">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

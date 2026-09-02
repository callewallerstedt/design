import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import { Providers } from "@/components/providers"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
      data-accent="ember"
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

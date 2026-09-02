import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = pattern.exec(text))) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index))
    }
    const token = match[0]
    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key++}
          className="rounded-md bg-muted px-1 py-0.5 font-mono text-[0.85em]"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        nodes.push(
          <a
            key={key++}
            href={link[2]}
            className="underline underline-offset-3 hover:text-foreground"
          >
            {link[1]}
          </a>
        )
      }
    }
    last = match.index + token.length
  }

  if (last < text.length) {
    nodes.push(text.slice(last))
  }

  return nodes
}

export function renderMarkdown(markdown: string): ReactNode {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const blocks: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const body: string[] = []
      i += 1
      while (i < lines.length && !lines[i].startsWith("```")) {
        body.push(lines[i])
        i += 1
      }
      i += 1
      blocks.push(
        <pre
          key={key++}
          className="my-2 overflow-x-auto rounded-lg bg-muted px-3 py-2 font-mono text-[13px] leading-relaxed"
          data-language={lang || undefined}
        >
          <code>{body.join("\n")}</code>
        </pre>
      )
      continue
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h3 key={key++} className="mt-3 mb-1 text-base font-medium">
          {parseInline(line.slice(2))}
        </h3>
      )
      i += 1
      continue
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h4 key={key++} className="mt-3 mb-1 text-sm font-medium">
          {parseInline(line.slice(3))}
        </h4>
      )
      i += 1
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i += 1
      }
      blocks.push(
        <ul key={key++} className="my-2 list-disc space-y-1 pl-5">
          {items.map((item, index) => (
            <li key={index}>{parseInline(item)}</li>
          ))}
        </ul>
      )
      continue
    }

    if (line.trim() === "") {
      i += 1
      continue
    }

    const para: string[] = []
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("```") && !lines[i].startsWith("#") && !lines[i].startsWith("- ")) {
      para.push(lines[i])
      i += 1
    }
    blocks.push(
      <p key={key++} className="my-2 text-pretty last:mb-0">
        {parseInline(para.join(" "))}
      </p>
    )
  }

  return blocks
}

export function Markdown({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div className={cn("text-sm leading-relaxed text-foreground", className)}>
      {renderMarkdown(children)}
    </div>
  )
}

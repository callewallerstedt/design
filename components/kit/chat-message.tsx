import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Markdown } from "@/lib/markdown"

export type ChatRole = "user" | "assistant" | "system"

export function ChatMessage({
  role,
  name,
  children,
  markdown,
  className,
}: {
  role: ChatRole
  name?: string
  children?: React.ReactNode
  markdown?: string
  className?: string
}) {
  const isUser = role === "user"
  const initials = (name ?? (isUser ? "You" : "AI")).slice(0, 2)

  return (
    <article
      className={cn(
        "flex gap-2.5",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      <Avatar size="sm" className="mt-0.5">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "min-w-0 max-w-[min(100%,42rem)]",
          isUser ? "items-end text-right" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-2.5 py-2 text-left text-sm leading-snug",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card ring-1 ring-foreground/10"
          )}
        >
          {markdown ? (
            <Markdown
              className={
                isUser ? "text-primary-foreground [&_code]:bg-primary-foreground/15" : undefined
              }
            >
              {markdown}
            </Markdown>
          ) : (
            children
          )}
        </div>
      </div>
    </article>
  )
}

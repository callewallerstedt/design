"use client"

import { useState } from "react"
import { InboxIcon, MailIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChatMessage } from "@/components/kit/chat-message"
import { ChatThread } from "@/components/kit/chat-thread"
import { Composer } from "@/components/kit/composer"

const starterThread = [
  {
    role: "user" as const,
    name: "Calle",
    text: "Flag anyone with two failed charges this week.",
  },
  {
    role: "assistant" as const,
    name: "Retention",
    text: "41 accounts. Mira Chen is highest risk — payment failed twice in 18h.",
  },
]

const initialTodos = [
  { id: "mira", title: "Call Mira Chen about failed payment", done: false },
  { id: "dunning", title: "Send 7-day dunning pause to 128 accounts", done: false },
  { id: "nps", title: "Review NPS ≤ 6 cohort", done: true },
  { id: "seats", title: "Flag idle seats over 21 days", done: false },
  { id: "offer", title: "Draft save offer for high-risk plan", done: false },
]

const mailIns = [
  {
    from: "Mira Chen",
    subject: "Cancel after failed invoice",
    channel: "Email",
    time: "12m",
    status: "New",
  },
  {
    from: "Stripe",
    subject: "Chargeback opened · Fjord",
    channel: "Mail-in",
    time: "1h",
    status: "New",
  },
  {
    from: "Amina Diallo",
    subject: "Need invoice PDF for Q2",
    channel: "Form",
    time: "3h",
    status: "Open",
  },
  {
    from: "Eli Park",
    subject: "Downgrade to starter",
    channel: "Email",
    time: "5h",
    status: "Open",
  },
  {
    from: "Sofia Ruiz",
    subject: "Pause seats for July",
    channel: "Form",
    time: "1d",
    status: "Replied",
  },
]

export function OpsPanels() {
  return (
    <section className="grid gap-2 lg:grid-cols-3">
      <ChatPanel />
      <TodoPanel />
      <MailInPanel />
    </section>
  )
}

function ChatPanel() {
  const [messages, setMessages] = useState(starterThread)

  return (
    <Card className="min-h-80">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Retention chat</CardTitle>
        <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
          Live
        </Badge>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 px-0">
        <ChatThread className="h-48 gap-2 px-(--card-spacing) py-0">
          {messages.map((message, index) => (
            <ChatMessage
              key={`${message.role}-${index}`}
              role={message.role}
              name={message.name}
              className="gap-2"
            >
              {message.text}
            </ChatMessage>
          ))}
        </ChatThread>
      </CardContent>
      <CardFooter className="border-t bg-transparent p-(--card-spacing)">
        <Composer
          className="w-full p-1.5"
          inputId="retention-composer"
          placeholder="Ask the retention agent…"
          onSubmit={(value) =>
            setMessages((current) => [
              ...current,
              { role: "user", name: "Calle", text: value },
            ])
          }
        />
      </CardFooter>
    </Card>
  )
}

function TodoPanel() {
  const [todos, setTodos] = useState(initialTodos)
  const open = todos.filter((todo) => !todo.done).length

  return (
    <Card className="min-h-80">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Save-play todos</CardTitle>
        <Badge variant="secondary" className="h-4 px-1.5 text-[10px] tabular-nums">
          {open} open
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5 px-0">
        {todos.map((todo) => (
          <label
            key={todo.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-(--card-spacing) py-1.5 hover:bg-muted/50"
          >
            <Checkbox
              checked={todo.done}
              onCheckedChange={(checked) =>
                setTodos((current) =>
                  current.map((item) =>
                    item.id === todo.id ? { ...item, done: checked === true } : item
                  )
                )
              }
              aria-label={todo.title}
            />
            <span
              className={cn(
                "text-sm font-medium",
                todo.done && "text-muted-foreground line-through"
              )}
            >
              {todo.title}
            </span>
          </label>
        ))}
      </CardContent>
    </Card>
  )
}

function MailInPanel() {
  return (
    <Card className="min-h-80">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Mail-ins</CardTitle>
        <Badge variant="secondary" className="h-4 px-1.5 text-[10px] tabular-nums">
          2 new
        </Badge>
      </CardHeader>
      <CardContent className="px-0">
        <ul>
          {mailIns.map((item) => (
            <li
              key={item.subject}
              className="flex items-center gap-2 border-t border-border px-(--card-spacing) py-1.5 first:border-t-0"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {item.channel === "Form" ? (
                  <InboxIcon className="size-3.5" />
                ) : (
                  <MailIcon className="size-3.5" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.from}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {item.subject}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <Badge
                  variant={item.status === "New" ? "secondary" : "outline"}
                  className={cn(
                    "h-4 px-1.5 text-[10px]",
                    item.status === "New" && "bg-brand-soft text-foreground"
                  )}
                >
                  {item.status}
                </Badge>
                <p className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
                  {item.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

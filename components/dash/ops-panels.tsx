"use client"

import { useState } from "react"
import { InboxIcon, MailIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChatMessage } from "@/components/kit/chat-message"
import { ChatThread } from "@/components/kit/chat-thread"
import { Composer } from "@/components/kit/composer"

const starterThread = [
  {
    role: "user" as const,
    name: "Calle",
    text: "Two failed charges this week.",
  },
  {
    role: "assistant" as const,
    name: "AI",
    text: "41 accounts. Mira Chen highest.",
  },
]

const initialTodos = [
  { id: "mira", title: "Call Mira", done: false },
  { id: "dunning", title: "Pause dunning · 128", done: false },
  { id: "nps", title: "NPS ≤ 6", done: true },
  { id: "seats", title: "Idle seats 21d", done: false },
  { id: "offer", title: "Save offer", done: false },
]

const mailIns = [
  {
    from: "Mira Chen",
    subject: "Cancel invoice",
    channel: "Email",
    time: "12m",
  },
  {
    from: "Stripe",
    subject: "Chargeback · Fjord",
    channel: "Mail",
    time: "1h",
  },
  {
    from: "Amina Diallo",
    subject: "Invoice PDF",
    channel: "Form",
    time: "3h",
  },
  {
    from: "Eli Park",
    subject: "Downgrade",
    channel: "Email",
    time: "5h",
  },
  {
    from: "Sofia Ruiz",
    subject: "Pause seats",
    channel: "Form",
    time: "1d",
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
      <CardHeader>
        <CardTitle>Chat</CardTitle>
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
          placeholder="Message"
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

  return (
    <Card className="min-h-80">
      <CardHeader>
        <CardTitle>Todos</CardTitle>
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
      <CardHeader>
        <CardTitle>Mail</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ul>
          {mailIns.map((item) => (
            <li
              key={item.subject}
              className="flex items-center gap-2 border-t border-border px-(--card-spacing) py-1.5 first:border-t-0"
            >
              {item.channel === "Form" ? (
                <InboxIcon className="size-4 shrink-0 text-muted-foreground" />
              ) : (
                <MailIcon className="size-4 shrink-0 text-muted-foreground" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{item.from}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {item.subject}
                </p>
              </div>
              <p className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
                {item.time}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

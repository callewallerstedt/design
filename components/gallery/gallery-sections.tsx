"use client"

import { toast } from "sonner"
import { FolderIcon, InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Kbd } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  ApprovalCard,
  ChatMessage,
  ChatThread,
  CodeBlock,
  Composer,
  MarkdownBubble,
  StatusChip,
  TaskRow,
  ThinkingTrace,
  ToolChip,
  ToolChipStack,
} from "@/components/kit"

function Section({
  id,
  eyebrow,
  title,
  source,
  children,
}: {
  id: string
  eyebrow?: string
  title: string
  source?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-border py-10">
      <header className="mb-6">
        {eyebrow ? (
          <p className="mb-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        {source ? (
          <p className="mt-1 text-xs text-muted-foreground">{source}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

function Stage({
  label,
  children,
  className,
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="mb-4">
      {label ? (
        <p className="mb-2 text-[11px] font-medium text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div
        className={`rounded-xl bg-card/40 p-4 ring-1 ring-foreground/8 ${className ?? ""}`}
      >
        {children}
      </div>
    </div>
  )
}

export function GallerySections() {
  return (
    <>
      <Section
        id="foundations"
        eyebrow="01"
        title="Foundations"
        source="Tokens follow ui-skills parchment discipline + designsystemchecklist foundations."
      >
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Background", "bg-background"],
            ["Card", "bg-card"],
            ["Muted", "bg-muted"],
            ["Primary", "bg-primary"],
          ].map(([name, swatch]) => (
            <div key={name} className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <div className={`h-16 ${swatch}`} />
              <p className="px-3 py-2 text-xs">{name}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Stage label="Type">
            <p className="text-2xl font-medium tracking-tight">Geist medium, tight tracking</p>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">
              Body stays at the base size. Headings use text-balance. Data uses
              tabular-nums: <span className="tabular-nums">1,280.40</span>
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              $ npx shadcn add button
            </p>
          </Stage>
          <Stage label="Spacing">
            <div className="flex items-end gap-2">
              {[2, 3, 4, 6, 8].map((n) => (
                <div key={n} className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 rounded-sm bg-foreground/80"
                    style={{ height: n * 4 }}
                  />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {n}
                  </span>
                </div>
              ))}
            </div>
          </Stage>
        </div>
      </Section>

      <Section
        id="primitives"
        eyebrow="02"
        title="Primitives"
        source="MIT · shadcn/ui (Base UI Nova) — owned copies in components/ui."
      >
        <Stage label="Buttons">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Button size="icon" aria-label="More">
              <InfoIcon />
            </Button>
          </div>
        </Stage>
        <Stage label="Badges, kbd, spinner">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Kbd>⌘K</Kbd>
            <Spinner />
            <StatusChip status="running" elapsed="2.1s" />
            <StatusChip status="done" />
            <StatusChip status="error" />
          </div>
        </Stage>
        <Stage label="Cards">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Project overview</CardTitle>
              <CardDescription>
                Track progress without a dashboard costume.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-pretty text-muted-foreground">
                Surfaces stay white/parchment with a hairline ring. No glow.
              </p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        </Stage>
        <Stage label="Avatars">
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>CW</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>EP</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </Stage>
        <Stage label="Table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">License</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Button</TableCell>
                <TableCell>shadcn/ui</TableCell>
                <TableCell className="text-right">MIT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Composer</TableCell>
                <TableCell>this repo</TableCell>
                <TableCell className="text-right">MIT</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stage>
      </Section>

      <Section
        id="forms"
        eyebrow="03"
        title="Forms"
        source="shadcn Field + Input. Errors sit next to the control. Never block paste."
      >
        <Stage>
          <FieldGroup className="max-w-sm">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="calle@example.com" />
              <FieldDescription>Used for account recovery.</FieldDescription>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="name">Workspace name</FieldLabel>
              <Input
                id="name"
                aria-invalid
                aria-describedby="name-err"
                defaultValue=" "
              />
              <FieldError id="name-err">Enter a workspace name.</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea id="notes" placeholder="Optional context" />
            </Field>
            <div className="flex items-center gap-2">
              <Checkbox id="updates" />
              <Label htmlFor="updates">Email me product notes</Label>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="private">Private repo</Label>
              <Switch id="private" />
            </div>
            <Field>
              <FieldLabel>Model</FieldLabel>
              <Select defaultValue="composer">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="composer">Composer</SelectItem>
                  <SelectItem value="codex">Codex</SelectItem>
                  <SelectItem value="sonnet">Sonnet</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </Stage>
      </Section>

      <Section
        id="overlays"
        eyebrow="04"
        title="Overlays"
        source="Base UI dialogs. Destructive actions use AlertDialog. Overlay motion stays ≤150ms."
      >
        <Stage>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename project</DialogTitle>
                  <DialogDescription>
                    This updates the public URL slug.
                  </DialogDescription>
                </DialogHeader>
                <Field>
                  <FieldLabel htmlFor="rename">Name</FieldLabel>
                  <Input id="rename" defaultValue="design" />
                </Field>
                <DialogFooter>
                  <Button>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this kit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This cannot be undone. Export first if you still need the
                    tokens.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Open sheet
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Inspector</SheetTitle>
                  <SheetDescription>
                    Side panels for settings, not for primary reading.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4">
                  <p className="text-sm text-muted-foreground">
                    Keep sheets narrow. One task per sheet.
                  </p>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Tooltip
              </TooltipTrigger>
              <TooltipContent>Delay on first open. Instant after.</TooltipContent>
            </Tooltip>
          </div>
        </Stage>
      </Section>

      <Section
        id="nav"
        eyebrow="05"
        title="Navigation"
        source="Breadcrumbs, tabs, accordion, segmented control. Keyboard-first."
      >
        <Stage label="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#foundations">Kit</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#nav">Navigation</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Stage>
        <Stage label="Tabs">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-3 text-muted-foreground">
              One surface. Related panels. No page jump.
            </TabsContent>
            <TabsContent value="tokens" className="pt-3 text-muted-foreground">
              Semantic color tokens only. No raw hex in components.
            </TabsContent>
            <TabsContent value="usage" className="pt-3 text-muted-foreground">
              Prefer existing tabs before inventing a new subnav.
            </TabsContent>
          </Tabs>
        </Stage>
        <Stage label="Segmented control">
          <ToggleGroup defaultValue={["comfortable"]} spacing={0}>
            <ToggleGroupItem value="compact" variant="outline">
              Compact
            </ToggleGroupItem>
            <ToggleGroupItem value="comfortable" variant="outline">
              Comfortable
            </ToggleGroupItem>
          </ToggleGroup>
        </Stage>
        <Stage label="Accordion">
          <Accordion className="max-w-md">
            <AccordionItem value="a">
              <AccordionTrigger>When should I animate?</AccordionTrigger>
              <AccordionContent>
                Only when it explains, orients, or confirms. Daily shortcuts
                should not animate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>What is AI slop here?</AccordionTrigger>
              <AccordionContent>
                Purple gradients, glow, Inter-on-everything, hero cards with
                three feature columns, and ornamental motion.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Stage>
      </Section>

      <Section
        id="feedback"
        eyebrow="06"
        title="Feedback"
        source="Alerts, empty states, skeletons, toasts, progress. Empty states get one action."
      >
        <Stage>
          <Alert>
            <InfoIcon />
            <AlertTitle>Preview is live</AlertTitle>
            <AlertDescription>
              Toggle light, dark, or split from the header.
            </AlertDescription>
          </Alert>
        </Stage>
        <Stage>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => toast("Saved", { description: "No fanfare." })}
            >
              Show toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success("Copied to clipboard")}
            >
              Success toast
            </Button>
          </div>
        </Stage>
        <Stage label="Progress + skeleton">
          <Progress value={64} className="max-w-sm">
            <ProgressLabel>Indexing</ProgressLabel>
            <ProgressValue />
          </Progress>
          <div className="mt-4 flex max-w-sm items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </Stage>
        <Stage>
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderIcon />
              </EmptyMedia>
              <EmptyTitle>No components yet</EmptyTitle>
              <EmptyDescription>
                Add one from the kit instead of generating a new primitive.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Browse kit</Button>
            </EmptyContent>
          </Empty>
        </Stage>
      </Section>

      <Section
        id="chat"
        eyebrow="07"
        title="AI chat"
        source="Original wrappers. Pattern language from Beautiful UI; no third-party source was copied."
      >
        <Stage label="Thread + composer">
          <div className="mx-auto max-w-lg overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <ChatThread className="h-[28rem]">
              <ChatMessage role="user" name="Calle">
                Tighten the settings dialog. It feels loud.
              </ChatMessage>
              <ToolChipStack summary="2 tool calls">
                <ToolChip
                  kind="search"
                  name="Read"
                  detail="DESIGN.md"
                  status="done"
                />
                <ToolChip
                  kind="edit"
                  name="Edit"
                  detail="dialog.tsx"
                  status="running"
                />
              </ToolChipStack>
              <ThinkingTrace title="Reasoning" status="done" elapsed="1.4s">
                Dialogs already fade/zoom at 100ms. Drop the extra scale on
                nested buttons. Keep the hairline ring, drop any shadow-lg.
              </ThinkingTrace>
              <ChatMessage
                role="assistant"
                name="Agent"
                markdown={
                  "Pulled the density down.\n\n- Removed the extra shadow\n- Kept the **100ms** overlay\n- Destructive path now uses `AlertDialog`\n\n```tsx\n<AlertDialogTrigger render={<Button variant=\"destructive\" />}>\n  Delete\n</AlertDialogTrigger>\n```"
                }
              />
              <MarkdownBubble markdown="Follow-up: want the same treatment on **Sheet**?" />
            </ChatThread>
            <div className="border-t border-border p-2">
              <Composer
                onSubmit={(value) => toast("Queued", { description: value })}
              />
            </div>
          </div>
        </Stage>
        <Stage label="Approval + tasks">
          <div className="grid gap-4 md:grid-cols-2">
            <ApprovalCard
              title="Apply token rename?"
              description="Rename --accent-purple to nothing. Purple is banned."
              onApprove={() => toast.success("Approved")}
              onDeny={() => toast("Denied")}
            >
              <p className="font-mono text-xs text-muted-foreground">
                globals.css · 14 tokens
              </p>
            </ApprovalCard>
            <div className="rounded-xl ring-1 ring-foreground/10">
              <TaskRow
                title="Verify contrast pairs"
                meta="AA body text"
                status="done"
              />
              <Separator />
              <TaskRow
                title="Audit motion on composer"
                meta="Enter to send"
                status="running"
              />
              <Separator />
              <TaskRow
                title="Write empty-state copy"
                meta="One next action"
                status="queued"
              />
            </div>
          </div>
        </Stage>
      </Section>

      <Section
        id="motion"
        eyebrow="08"
        title="Motion restraint"
        source="Emil Kowalski — You Don't Need Animations. UI Skills baseline-ui."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Purpose", "Animate only to explain, orient, or confirm."],
            ["Frequency", "Daily shortcuts: no animation. Raycast test."],
            ["Speed", "UI motion under 200–300ms. Prefer none."],
          ].map(([title, body]) => (
            <Card key={title} size="sm">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <Stage label="Code to copy" className="mt-4">
          <CodeBlock
            language="css"
            code={`/* Interaction feedback: compositor props only */
.press { transform: translateY(1px); }
/* Never animate width, height, top, left, margin, padding */
@media (prefers-reduced-motion: reduce) {
  .press { transform: none; }
}`}
          />
        </Stage>
      </Section>

      <Section
        id="rules"
        eyebrow="09"
        title="Agent entry"
        source="Read DESIGN.md and AGENTS.md before writing UI."
      >
        <Card>
          <CardHeader>
            <CardTitle>How to use this repo</CardTitle>
            <CardDescription>
              Future coding agents should consume the kit, not restyle from
              scratch.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              1. Read <code className="font-mono text-foreground">DESIGN.md</code>{" "}
              for taste, spacing, type, color, motion, a11y, anti-slop.
            </p>
            <p>
              2. Reuse <code className="font-mono text-foreground">components/ui</code>{" "}
              primitives and <code className="font-mono text-foreground">components/kit</code>{" "}
              for chat.
            </p>
            <p>
              3. If a pattern is missing, wrap an existing primitive. Do not
              invent a third button.
            </p>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}

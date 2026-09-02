"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ApprovalCard({
  title,
  description,
  children,
  onApprove,
  onDeny,
  className,
}: {
  title: string
  description?: string
  children?: React.ReactNode
  onApprove?: () => void
  onDeny?: () => void
  className?: string
}) {
  return (
    <Card size="sm" className={cn("max-w-md", className)}>
      <CardHeader>
        <CardTitle className="text-balance">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-pretty">{description}</CardDescription>
        ) : null}
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" onClick={onDeny}>
          Deny
        </Button>
        <Button onClick={onApprove}>Approve</Button>
      </CardFooter>
    </Card>
  )
}

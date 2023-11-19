"use client"

import { ClerkProvider } from "@clerk/clerk-react"
import { ReactNode } from "react"

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootClerkProvider({
  children,
}: {
  children: ReactNode
}) {
  return clerkKey ? (
    <ClerkProvider publishableKey={clerkKey}>{children}</ClerkProvider>
  ) : (
    children
  )
}

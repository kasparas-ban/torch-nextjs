"use client"

import { ReactNode } from "react"
import { ClerkProvider } from "@clerk/clerk-react"
import { env } from "@/env.mjs"

const clerkKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

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

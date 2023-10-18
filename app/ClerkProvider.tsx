"use client"

import { ClerkProvider } from "@clerk/clerk-react"

export default function RootClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const clerkKey = process.env.NEXT_PUBLIC_REACT_APP_CLERK_PUBLISHABLE_KEY

  console.log({ clerkKey })

  return clerkKey ? (
    <ClerkProvider publishableKey={clerkKey}>{children}</ClerkProvider>
  ) : null
}

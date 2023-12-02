"use client"

import { ReactNode } from "react"
import { ClerkProvider, useAuth } from "@clerk/clerk-react"
import { env } from "@/env.mjs"
import useUserInfo from "@/hooks/useUserInfo"

const clerkKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function AuthProvider({ children }: { children: ReactNode }) {
  if (clerkKey)
    return (
      <ClerkProvider publishableKey={clerkKey}>
        <AuthWrapper>{children}</AuthWrapper>
      </ClerkProvider>
    )

  return children
}

function AuthWrapper({ children }: { children: ReactNode }) {
  const { isError } = useUserInfo()
  const { signOut } = useAuth()

  if (isError) signOut()

  return children
}

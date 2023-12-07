"use client"

import { ReactNode, useEffect } from "react"
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-react"
import { env } from "@/env.mjs"
import useUserInfo from "@/hooks/useUserInfo"
import { addUser } from "@/api/endpoints/userAPI"
import { useToast } from "@/components/ui/use-toast"

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
  const { data: userInfo, isError } = useUserInfo()
  const { signOut, getToken } = useAuth()
  const { user, isSignedIn } = useUser()
  const { toast } = useToast()

  const addNewUser = async () => {
    const token = await getToken()
    const username = user?.username
    const email = user?.primaryEmailAddress?.emailAddress

    if (!username || !email) throw new Error("Failed to read user details")
    if (token) await addUser(token, { username, email })
  }

  useEffect(() => {
    if (isSignedIn && !userInfo && isError) {
      console.warn("User not found in database, will attempt to add it now")
      addNewUser().catch(() => {
        toast({
          title: "Failed to find user in the database",
          description: "Try to log in later.",
        })
        // TODO: Uncomment when
        // signOut()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, userInfo, isError])

  return children
}

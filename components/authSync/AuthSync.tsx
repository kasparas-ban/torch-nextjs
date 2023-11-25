"use client"

import { useEffect } from "react"
import { useAuth, useUser } from "@clerk/clerk-react"
import useUserInfo from "@/hooks/useUserInfo"
import { addUser } from "@/api/endpoints/userAPI"

export default function AuthWrapper() {
  const { getToken } = useAuth()
  const { user, isSignedIn } = useUser()
  const { data: userInfo, isError } = useUserInfo()

  const addNewUser = async () => {
    const token = await getToken()
    const username = user?.username
    const email = user?.primaryEmailAddress?.emailAddress

    if (!username || !email) throw new Error("Failed to read user details")
    if (token) await addUser(token, { username, email })
  }

  useEffect(() => {
    if (isSignedIn && !userInfo && isError) {
      console.error("User not found in database, will attempt to add it now")
      addNewUser()
        .then(() => {
          // TODO: show notification that user data was updated
        })
        .catch(e => {
          // TODO: show notificaion that user update failed
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, userInfo, isError])

  return null
}

"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth, useUser } from "@clerk/clerk-react"
import useUserInfo from "@/hooks/useUserInfo"
import { addUser } from "@/api/endpoints/userAPI"

export default function useAfterSignUp() {
  const { data: userInfo, isLoading } = useUserInfo()
  const { user } = useUser()
  const { getToken } = useAuth()
  const searchParams = useSearchParams()
  const isAfterSignUp = searchParams.get("signUpSuccess")

  const addNewUser = async () => {
    const token = await getToken()
    const username = user?.username
    const email = user?.primaryEmailAddress?.emailAddress

    if (!username || !email) throw new Error("Failed to read user details")
    if (token) await addUser(token, { username, email })
  }

  useEffect(() => {
    if (isAfterSignUp && user && !userInfo && !isLoading)
      addNewUser()
        .then(() => {
          // TODO: show notification that user has registered successfully
        })
        .catch(e => {
          // TODO: show notification that user registration failed
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAfterSignUp, user, userInfo, isLoading])
}

"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth, useUser } from "@clerk/clerk-react"
import { addUser } from "@/api/endpoints/userAPI"

export default function useAfterSignUp() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const searchParams = useSearchParams()
  const isAfterSignUp = searchParams.get("signUpSuccess")

  const addNewUser = async () => {
    try {
      const token = await getToken()
      const username = user?.username
      const email = user?.primaryEmailAddress?.emailAddress

      if (!username || !email) throw new Error("Failed to read user details")

      if (token) await addUser(token, { username, email })
    } catch (e) {
      // TODO: show error
    }
  }

  useEffect(() => {
    if (isAfterSignUp) addNewUser()
  }, [isAfterSignUp, user])
}

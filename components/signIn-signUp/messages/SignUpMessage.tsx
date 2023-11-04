'use client'

import { addUser } from "@/api/endpoints/userAPI"
import { useAuth, useUser } from "@clerk/clerk-react"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function useAfterSignUp() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const searchParams = useSearchParams()
  const isAfterSignUp = searchParams.get('signUpSuccess')

  const addNewUser = async () => {
    const token = await getToken()
    const newUser = {
      username: string
      birthday?: string
      gender?: string
      country?: string
    }

    addUser(token, user)
  }

  useEffect(() => {
    if (isAfterSignUp) {
    }
  }, [isAfterSignUp])
}
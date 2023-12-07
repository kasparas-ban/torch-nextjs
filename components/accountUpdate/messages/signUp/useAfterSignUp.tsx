"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import useUserInfo from "@/hooks/useUserInfo"
import { useToast } from "@/components/ui/use-toast"

export default function useAfterSignUp() {
  const { data: userInfo, isLoading } = useUserInfo()
  const { user } = useUser()
  const { toast } = useToast()

  const searchParams = useSearchParams()
  const isAfterSignUp = searchParams.get("signUpSuccess")

  useEffect(() => {
    if (isAfterSignUp && user && !userInfo && !isLoading) {
      toast({
        title: "Welcome to Torch",
        description: "You have successfully joined Torch.",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAfterSignUp, user, userInfo, isLoading])
}

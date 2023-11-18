"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { useUpdateUserEmail } from "@/api/hooks/useUser"

export default function useAfterEmailChange() {
  // const { user } = useUser()
  // const searchParams = useSearchParams()
  // const isAfterEmailChangeSuccess = searchParams.get("emailChangeSuccess")
  // const { mutateAsync: updateEmail } = useUpdateUserEmail()
  // const handleUpdateEmail = async () => {
  //   try {
  //     const primaryEmailAddress = user?.emailAddresses.find(
  //       email => email.id === user?.primaryEmailAddressId
  //     )
  //     const newEmailAddress = user?.emailAddresses.find(
  //       email => email.id !== user?.primaryEmailAddressId
  //     )
  //     if (!primaryEmailAddress || !newEmailAddress)
  //       throw new Error("Failed to update the email")
  //     user?.update({ primaryEmailAddressId: newEmailAddress?.id })
  //     updateEmail({ email: newEmailAddress?.emailAddress })
  //   } catch (e) {
  //     // TODO: show error
  //   }
  // }
  // useEffect(() => {
  //   if (isAfterEmailChangeSuccess) handleUpdateEmail()
  // }, [isAfterEmailChangeSuccess, user])
}

"use client"

import { Suspense } from "react"
import { redirect } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import { Skeleton } from "@/components/ui/skeleton"

import AccountContent from "./AccountContent"
import AccountTitle from "./AccountTitle"

export default function AccountPage() {
  // const {
  //   openAccountInfoModal,
  //   openEmailChangeModal,
  //   openPasswordChangeModal,
  //   openAccountDeleteModal,
  // } = useModal()

  const { isSignedIn } = useUser()
  // const { toast } = useToast()

  // if (!isSignedIn) redirect(ROUTES.signIn.path)

  // const showSignOutToast = async () => {
  //   toast({ description: "You signed-out successfully." })
  // }

  return (
    <>
      <div className="flex">
        <h1 className="mb-6 flex items-center text-5xl font-bold text-gray-400">
          Account
        </h1>
        <AccountTitle />
      </div>
      <AccountContent />
    </>
  )
}

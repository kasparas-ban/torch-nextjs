"use client"

import { SignOutButton } from "@clerk/clerk-react"
import { motion } from "framer-motion"
import SignOutIcon from "@/public/icons/sign_out.svg"

export default function AccountTitle() {
  return (
    <div className="ml-auto mt-3 hidden text-white sm:block">
      <SignOutButton
      // signOutCallback={showSignOutToast}
      >
        <motion.button
          className="flex w-full items-center gap-1 rounded-lg bg-gray-700 px-4 py-2 hover:cursor-pointer hover:bg-gray-600"
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-sm font-medium">Sign Out</div>
          <SignOutIcon className="relative top-px h-5 w-5 rotate-180" />
        </motion.button>
      </SignOutButton>
    </div>
  )
}

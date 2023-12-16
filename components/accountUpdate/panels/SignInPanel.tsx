"use client"

import { SignIn } from "@clerk/clerk-react"
import { motion } from "framer-motion"

import "./clerkPanel.scss"
import "@/styles/backgrounds.css"

export default function SignInPanel() {
  return (
    <motion.div
      className="mt-8 flex justify-center [&>div>div]:[border:none] [&>div>div]:[box-shadow:none]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <SignIn
        signUpUrl="/sign-up"
        afterSignInUrl="/timer?signInSuccess=true"
        afterSignUpUrl="/timer?signUpSuccess=true"
        appearance={{
          elements: {
            formButtonPrimary: "bg-multi-color",
            logoBox: "bg-red-200",
            logoImage: "bg-red-600",
          },
        }}
      />
    </motion.div>
  )
}

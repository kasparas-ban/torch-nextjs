"use client"

import { SignUp } from "@clerk/clerk-react"
import { motion } from "framer-motion"

import "./clerkPanel.scss"

export default function SignUpPage() {
  return (
    <motion.div
      className="mt-8 flex justify-center [&>div>div]:[border:none] [&>div>div]:[box-shadow:none]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <SignUp
        signInUrl="/sign-in"
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

import { ReactNode } from "react"
import { useUser } from "@clerk/clerk-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function UserAvatar({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { user } = useUser()
  const hasImage = !!user?.hasImage

  return (
    <Avatar className={cn("h-6 w-6", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        {hasImage ? (
          <motion.div
            key="profile_avatar"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AvatarImage
              src={hasImage ? user.imageUrl : undefined}
              alt="Profile image"
              className="rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="avatar_fallback"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AvatarFallback className="bg-transparent">
              {children}
            </AvatarFallback>
          </motion.div>
        )}
      </AnimatePresence>
    </Avatar>
  )
}

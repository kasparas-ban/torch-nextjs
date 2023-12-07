import { ReactNode, useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { Avatar, AvatarImage } from "../ui/avatar"

export default function UserAvatar({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const { user } = useUser()
  const hasImage = !!user?.hasImage
  const [isImgLoaded, setIsImgLoaded] = useState(false)

  useEffect(() => {
    if (!hasImage) setIsImgLoaded(false)
  }, [hasImage])

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hidden"
        src={user?.imageUrl}
        onLoad={() => setIsImgLoaded(true)}
        alt="Profile avatar"
      />
      <Avatar className={cn("h-6 w-6", className)}>
        <AnimatePresence initial={false} mode="popLayout">
          {isImgLoaded && hasImage ? (
            <motion.div
              key="profile_avatar"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AvatarImage
                src={user?.imageUrl}
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
              <div className="flex h-full w-full items-center justify-center rounded-full bg-transparent">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Avatar>
    </>
  )
}

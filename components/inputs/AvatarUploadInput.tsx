"use client"

import { forwardRef, LegacyRef, useCallback, useRef } from "react"
import { useUser } from "@clerk/clerk-react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import AvatarUpload from "@/public/icons/avatarUpload.svg"

function AvatarUploadInput(
  { onChange }: { onChange: (...event: any[]) => void },
  ref: LegacyRef<HTMLInputElement>
) {
  const { user } = useUser()
  const avatarImageRef = useRef<HTMLImageElement | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (avatarImageRef.current) {
        avatarImageRef.current.src = URL.createObjectURL(acceptedFiles[0])
        onChange?.(acceptedFiles[0])
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="rounded-full">
      <input ref={ref} {...getInputProps()} className="rounded-full" />
      <div className="relative h-28 w-28 cursor-pointer rounded-full bg-gray-300">
        <motion.div
          className="group peer absolute top-0 flex h-full w-full items-center justify-center overflow-hidden rounded-full"
          whileHover={{ scale: 1.04 }}
        >
          <img
            id="avatar"
            src={user?.hasImage ? user.imageUrl : undefined}
            ref={avatarImageRef}
            className={cn(
              "absolute h-28 w-28 scale-[1.02] rounded-full object-cover text-transparent",
              avatarImageRef?.current?.src && "hover:opacity-10"
            )}
            alt="Profile image"
          />
          <AvatarUpload className="h-14 w-14 text-gray-400 group-hover:text-gray-600" />
        </motion.div>
      </div>
    </div>
  )
}

export default forwardRef(AvatarUploadInput)

"use client"

import { forwardRef, LegacyRef, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import AvatarUpload from "@/public/icons/avatarUpload.svg"

function AvatarUploadInput(
  {
    value,
    onChange,
  }: { value: string | File | undefined; onChange: (...event: any[]) => void },
  ref: LegacyRef<HTMLInputElement>
) {
  const avatarImageRef = useRef<HTMLImageElement | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (avatarImageRef.current) {
      avatarImageRef.current.src = URL.createObjectURL(acceptedFiles[0])
      onChange?.(acceptedFiles[0] as any)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="rounded-full">
      <input ref={ref} {...getInputProps()} className="rounded-full" />
      <div className="relative h-28 w-28 cursor-pointer rounded-full bg-gray-300">
        <motion.div
          className="group peer absolute top-0 flex h-full w-full items-center justify-center rounded-full"
          whileHover={{ scale: 1.04 }}
        >
          <img
            id="avatar"
            src=""
            ref={avatarImageRef}
            className={cn(
              "absolute h-28 w-28 rounded-full object-cover indent-[-20000px]",
              avatarImageRef?.current?.src && "hover:opacity-30"
            )}
          />
          <AvatarUpload className="h-14 w-14 text-gray-400 group-hover:text-gray-600" />
        </motion.div>
      </div>
    </div>
  )
}

export default forwardRef(AvatarUploadInput)

"use client"

import { InputHTMLAttributes, ReactNode, useCallback, useState } from "react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import AvatarUpload from "@/public/icons/avatarUpload.svg"

export default function AvatarUploadInput({
  inputProps,
}: {
  inputProps: InputHTMLAttributes<HTMLInputElement>
}) {
  const [avatar, setAvatar] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles)
    setAvatar(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive, onDropAccepted } =
    useDropzone({ onDrop })

  console.log(getInputProps())

  return (
    <div {...getRootProps()}>
      <input {...inputProps} {...getInputProps()} />
      {/* {isDragActive ? <p>Upload</p> : <p>+</p>} */}
      <div className="h-28 w-28 cursor-pointer rounded-full bg-gray-300">
        {onDropAccepted ? (
          <img id="avatar" src="" />
        ) : (
          <motion.div
            className="group flex h-full items-center justify-center rounded-full"
            whileHover={{ scale: 1.04 }}
          >
            <AvatarUpload className="h-14 w-14 text-gray-400 group-hover:text-gray-600" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

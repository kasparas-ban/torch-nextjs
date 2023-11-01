import { InputHTMLAttributes, ReactNode, useCallback } from "react"
import { useDropzone } from "react-dropzone"

export default function FileUploadInput({
  children,
  inputProps,
}: {
  children: ReactNode
  inputProps: InputHTMLAttributes<HTMLInputElement>
}) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive, onDropAccepted } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...inputProps} {...getInputProps()} />
      {/* {isDragActive ? <p>Upload</p> : <p>+</p>} */}
      {onDropAccepted ? (

      ) : children}
    </div>
  )
}

import { ReactNode, useState } from "react"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import EmailChangeComplete from "./EmailChangeComplete"
import EmailChangeForm from "./EmailChangeForm"

export default function EmailChangeModal({
  children,
}: {
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [isComplete, setComplete] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={val => {
        setComplete(false)
        setOpen(val)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {isComplete ? (
          <EmailChangeComplete closeModal={() => setOpen(false)} />
        ) : (
          <EmailChangeForm setComplete={() => setComplete(true)} />
        )}
      </DialogContent>
    </Dialog>
  )
}

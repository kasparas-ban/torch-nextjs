import { ReactNode, useState } from "react"
import useModalState from "@/hooks/useModalState"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import EmailChangeComplete from "./EmailChangeComplete"
import EmailChangeForm from "./EmailChangeForm"

export default function EmailChangeModal({
  children,
}: {
  children: ReactNode
}) {
  const { open, setOpen } = useModalState()
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
          <EmailChangeComplete
            closeModal={() => setOpen(false)}
            key="complete"
          />
        ) : (
          <EmailChangeForm setComplete={() => setComplete(true)} key="form" />
        )}
      </DialogContent>
    </Dialog>
  )
}

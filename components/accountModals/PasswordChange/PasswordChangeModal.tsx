import { ReactNode } from "react"
import useModalState from "@/hooks/useModalState"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import PasswordChangeForm from "./PasswordChangeForm"

export default function PasswordChangeModal({
  children,
}: {
  children: ReactNode
}) {
  const { open, setOpen } = useModalState()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <PasswordChangeForm />
      </DialogContent>
    </Dialog>
  )
}

import { ReactNode } from "react"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import PasswordChangeForm from "./PasswordChangeForm"

export default function PasswordChangeModal({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <PasswordChangeForm />
      </DialogContent>
    </Dialog>
  )
}

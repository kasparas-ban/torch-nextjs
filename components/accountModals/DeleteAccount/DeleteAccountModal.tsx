import { ReactNode } from "react"
import useModalState from "@/hooks/useModalState"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import DeleteAccountForm from "./DeleteAccountForm"

export default function DeleteAccountModal({
  children,
}: {
  children: ReactNode
}) {
  const { open, setOpen } = useModalState()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DeleteAccountForm />
      </DialogContent>
    </Dialog>
  )
}

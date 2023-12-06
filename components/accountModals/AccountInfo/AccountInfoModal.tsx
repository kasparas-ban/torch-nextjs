import { ReactNode } from "react"
import useModalState from "@/hooks/useModalState"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import AccountDetailsForm from "./AccountInfoForm"

export default function AccountDetailsModal({
  children,
}: {
  children: ReactNode
}) {
  const { open, setOpen } = useModalState()
  const closeModal = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <AccountDetailsForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  )
}

import { ReactNode } from "react"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import AccountDetailsForm from "./AccountInfoForm"

export default function AccountDetailsModal({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <AccountDetailsForm />
      </DialogContent>
    </Dialog>
  )
}

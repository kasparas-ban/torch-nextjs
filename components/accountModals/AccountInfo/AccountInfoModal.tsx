import { ReactNode } from "react"

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import AccountDetailsForm from "./AccountDetailsForm"

export default function AccountInfoModal({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <AccountDetailsForm />
      </DialogContent>
    </Dialog>
  )
}

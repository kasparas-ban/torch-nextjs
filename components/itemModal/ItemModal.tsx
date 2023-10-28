import React from "react"

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

function ItemModal({
  content,
  children,
}: {
  content: React.ReactElement
  children: React.ReactElement
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  )
}

export default ItemModal

"use client"

import React from "react"

import { Dialog, DialogContent } from "../ui/dialog"
import useItemModal from "./hooks/useItemModal"

function ItemModal() {
  const { isOpen, closeModal, modalContent } = useItemModal()

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && closeModal()}>
      <DialogContent>{modalContent}</DialogContent>
    </Dialog>
  )
}

export default ItemModal

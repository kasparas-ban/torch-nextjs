"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import useModalState from "@/hooks/useModalState"
import useItemModal from "@/components/itemModal/hooks/useItemModal"

export default function BackgroundScaleWrapper({
  children,
}: {
  children: ReactNode
}) {
  const { isOpen: isItemModalOpen } = useItemModal()
  const { isModalOpen } = useModalState()

  return (
    <motion.div
      initial={false}
      animate={{
        transform: isItemModalOpen || isModalOpen ? "scale(0.97)" : "scale(1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="min-h-[calc(100vh-36px)] origin-top pb-24"
    >
      {children}
    </motion.div>
  )
}

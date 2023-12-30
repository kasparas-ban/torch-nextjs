import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function NumberAnimator({
  value,
  children,
}: {
  value: string | number
  children: ReactNode
}) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

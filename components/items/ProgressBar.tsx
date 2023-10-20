import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import useEditItem from "@/hooks/useEditItem"

function ItemProgress({
  progress,
  showEditPanel,
  isRecurring,
}: {
  progress: number
  showEditPanel: boolean
  isRecurring?: boolean
}) {
  const { editItem } = useEditItem()

  const getProgressColor = () => {
    if (editItem) {
      if (showEditPanel) {
        return isRecurring ? "bg-amber-500" : "bg-red-400"
      }
      return "bg-gray-400"
    }

    return isRecurring ? "bg-amber-500" : "bg-red-400"
  }

  return (
    <motion.div
      className={cn("absolute left-0 top-0 h-full", getProgressColor())}
      style={{ width: `${Math.trunc(progress * 100)}%` }}
    />
  )
}

export default ItemProgress

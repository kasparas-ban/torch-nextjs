import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import useEditItem from "../itemModal/hooks/useEditItem"
import { getProgressBgColor } from "./itemStripColors"

function ItemProgress({
  progress,
  showEditPanel,
  isArchived,
  isRecurring,
}: {
  progress: number
  showEditPanel: boolean
  isArchived?: boolean
  isRecurring?: boolean
}) {
  const { editItem } = useEditItem()

  const progressColor = getProgressBgColor(
    !!editItem,
    showEditPanel,
    isArchived,
    isRecurring
  )

  return (
    <motion.div
      className={cn("absolute left-0 top-0 h-full", progressColor)}
      style={{ width: `${Math.trunc(progress * 100)}%` }}
    />
  )
}

export default ItemProgress

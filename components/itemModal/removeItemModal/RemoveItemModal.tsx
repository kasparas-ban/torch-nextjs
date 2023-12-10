import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Goal, ItemType } from "@/types/itemTypes"
import { formatTimeSpent } from "@/lib/utils"
import useModalState from "@/hooks/useModalState"
import TimerIcon from "@/public/icons/navigationIcons/timer.svg"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import useEditItem from "../hooks/useEditItem"

export default function RemoveItemModal({ children }: { children: ReactNode }) {
  const { editItem } = useEditItem()
  const { open, setOpen } = useModalState()
  const closeModal = () => setOpen(false)

  const handleRemoveItemOnly = () => console.log(editItem)
  const handleRemoveAllRelated = () => console.log(editItem)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-fit px-4 max-md:border-x-0 sm:max-w-fit">
        <div className="px-10">
          <DialogHeader className="mb-3">
            <DialogTitle asChild className="text-center text-xl">
              <motion.h1 layout>{`Remove this ${
                editItem?.type.toLowerCase() ?? ""
              }?`}</motion.h1>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center font-medium text-gray-500">
            {editItem?.title}
          </div>
          {editItem && (
            <div className="mt-1 flex justify-center text-gray-500">
              <span>Total time spent:</span>
              <TimerIcon className="ml-2 w-5" />
              <span className="ml-1">
                {formatTimeSpent(
                  (editItem as Goal).totalTimeSpent || editItem.timeSpent
                )}
              </span>
            </div>
          )}
          <div className="mt-4 flex flex-col justify-center gap-2">
            <motion.button
              className="text-md h-7 rounded-lg bg-gray-200 px-4 hover:bg-gray-300"
              onClick={handleRemoveItemOnly}
              whileTap={{ scale: 0.96 }}
            >
              {editItem?.type === "TASK"
                ? "Remove task"
                : `Remove ${editItem?.type.toLowerCase() ?? ""} only`}
            </motion.button>
            {editItem && editItem.type !== "TASK" && (
              <motion.button
                className="text-md h-7 rounded-lg bg-gray-200 px-4 hover:bg-gray-300"
                onClick={handleRemoveAllRelated}
                whileTap={{ scale: 0.96 }}
              >
                {`Remove ${editItem.type.toLowerCase()} and all related ${getAssociatedTypes(
                  editItem.type
                )}`}
              </motion.button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const getAssociatedTypes = (itemType: ItemType) => {
  if (itemType === "GOAL") {
    return "tasks"
  }
  return "goals/tasks"
}

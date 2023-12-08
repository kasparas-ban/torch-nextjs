import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Goal } from "@/types/itemTypes"
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

export default function CompleteItemModal({
  children,
}: {
  children: ReactNode
}) {
  const { editItem } = useEditItem()
  const { open, setOpen } = useModalState()
  const closeModal = () => setOpen(false)

  const handleSubmit = () => console.log(editItem)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-fit px-4 max-md:border-x-0 sm:max-w-fit">
        <div className="px-10">
          <DialogHeader className="mb-3">
            <DialogTitle asChild className="text-center text-xl">
              <motion.h1 layout>{`Mark ${
                editItem?.type.toLowerCase() ?? ""
              } as complete?`}</motion.h1>
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
          <div className="mt-4 flex justify-center space-x-2">
            <motion.button
              className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={handleSubmit}
              whileTap={{ scale: 0.96 }}
            >
              Yes
            </motion.button>
            <motion.button
              className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={closeModal}
              whileTap={{ scale: 0.96 }}
            >
              No
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

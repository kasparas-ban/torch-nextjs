import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Goal } from "@/types/itemTypes"
import { capitalize, cn, formatTimeSpent } from "@/lib/utils"
import useModalState from "@/hooks/useModalState"
import { useUpdateItemStatus } from "@/api/hooks/items/useUpdateItemStatus"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAction from "@/components/confirmAction/ConfirmAction"
import TimerIcon from "@/public/icons/navigationIcons/timer.svg"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import useEditItem from "../hooks/useEditItem"

const selectOptions = {
  TASK: {
    info: "This task will be archived and its progress will be locked. Its information will remain and you will be able to bring it back to an active status.",
  },
  GOAL: {
    oneSelection: {
      title: "Goal only",
      description: "Complete goal only",
    },
    allSelection: {
      title: "Goal + tasks",
      description: "Complete goal and all associated tasks",
    },
    info: {
      one: "This goal will be archived and its progress will be locked. Its information will remain and you will be able to bring it back to an active status.",
      all: "This goal and all associated tasks will be archived and their progress will be locked. Their information will remain and you will be able to bring them back to an active status.",
    },
  },
  DREAM: {
    oneSelection: {
      title: "Dream only",
      description: "Complete dream only",
    },
    allSelection: {
      title: "All associated",
      description: "Complete dream and all associated goals and tasks",
    },
    info: {
      one: "This dream will be archived and its progress will be locked. Its information will remain and you will be able to bring it back to an active status.",
      all: "This dream and all associated goals and tasks will be archived and their progress will be locked. Their information will remain and you will be able to bring them back to an active status.",
    },
  },
}

type SelectionType = "one" | "all"

export default function CompleteItemModal({
  children,
}: {
  children: ReactNode
}) {
  const { toast } = useToast()
  const { editItem, setEditItem } = useEditItem()
  const { open, setOpen } = useModalState()
  const closeModal = () => setOpen(false)

  const itemType = editItem?.type
  const [selItems, setSelItems] = useState<SelectionType>("one")
  const { mutateAsync: updateStatus, isPending } = useUpdateItemStatus()

  const handleSubmit = () => {
    if (!editItem) return

    updateStatus({
      itemID: editItem.itemID,
      status: "ARCHIVED",
      updateAssociated: selItems === "all",
      itemType: editItem.type,
    })
      .then(() => {
        closeModal()
        setEditItem(undefined)
        toast({
          title: `Marked ${capitalize(editItem.type)} as completed`,
          description: `The ${editItem.type.toLowerCase()} was archived and its progress locked.`,
        })
      })
      .catch(() =>
        toast({
          title: `Failed to mark ${editItem.type.toLowerCase()} as completed`,
          description: "Try to repeat the action later.",
        })
      )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-full px-4 max-md:border-x-0 sm:max-w-fit">
        <div className="flex h-full flex-col">
          <DialogHeader className="mb-3">
            <DialogTitle asChild className="text-center text-2xl">
              <motion.h1 layout>{`Mark ${
                editItem?.type.toLowerCase() ?? ""
              } as complete?`}</motion.h1>
            </DialogTitle>
          </DialogHeader>

          <div className="text-center text-lg font-medium text-gray-500">
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

          {itemType && itemType !== "TASK" && (
            <Tabs
              defaultValue={selItems}
              className="mt-3 sm:w-[390px]"
              onValueChange={val => setSelItems(val as SelectionType)}
            >
              <TabsList className="grid h-auto w-full grid-cols-2 rounded-xl">
                <TabsTrigger
                  value="one"
                  className="h-full justify-start rounded-lg text-left"
                >
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                      {selectOptions[itemType].oneSelection.title}
                    </div>
                    <div className="font-medium text-gray-500">
                      {selectOptions[itemType].oneSelection.description}
                    </div>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="h-full justify-start rounded-lg text-left"
                >
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                      {selectOptions[itemType].allSelection.title}
                    </div>
                    <div className="text-wrap whitespace-normal font-medium text-gray-500">
                      {selectOptions[itemType].allSelection.description}
                    </div>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {itemType && (
            <div className={cn("mt-2 rounded-xl bg-slate-100 sm:w-[390px]")}>
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1">
                  <Info className={cn("h-10 w-10 pl-3 text-gray-500")} />
                </div>
                <div className={cn("pr-3 text-gray-500")}>
                  {itemType === "TASK"
                    ? selectOptions[itemType].info
                    : selectOptions[itemType].info[selItems]}
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto flex justify-center space-x-2 sm:mt-4">
            <ConfirmAction
              onSubmit={handleSubmit}
              onCancel={closeModal}
              isLoading={isPending}
              submitLabel="Complete"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

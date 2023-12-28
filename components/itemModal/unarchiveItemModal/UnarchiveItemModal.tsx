import { ReactNode, useState } from "react"
import { Tabs } from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Goal } from "@/types/itemTypes"
import { capitalize, formatTimeSpent } from "@/lib/utils"
import useModalState from "@/hooks/useModalState"
import { useUpdateItemStatus } from "@/api/hooks/items/useUpdateItemStatus"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    info: "This task will be brought back to an active state. You will be able to edit its information and spend time on it.",
  },
  GOAL: {
    oneSelection: {
      title: "Goal only",
      description: "Unarchive goal only",
    },
    allSelection: {
      title: "Goal + tasks",
      description: "Unarchive goal and all associated tasks",
    },
    info: {
      one: "This goal will be brought back to an active state. You will be able to edit its information and spend time on it.",
      all: "This goal and all associated tasks will be brought back to an active state. You will be able to edit their information and spend time on them.",
    },
  },
  DREAM: {
    oneSelection: {
      title: "Dream only",
      description: "Unarchive dream only",
    },
    allSelection: {
      title: "All associated",
      description: "Unarchive dream and all associated goals and tasks",
    },
    info: {
      one: "This dream will be brought back to an active state. You will be able to edit its information and spend time on it.",
      all: "This dream and all associated goals and tasks will be brought back to an active state. You will be able to edit their information and spend time on them.",
    },
  },
}

type SelectionType = "one" | "all"

export default function UnarchiveItemModal({
  children,
}: {
  children: ReactNode
}) {
  const { toast } = useToast()
  const { editItem } = useEditItem()
  const { open, setOpen } = useModalState()
  const closeModal = () => setOpen(false)

  const { mutateAsync: updateStatus, isPending } = useUpdateItemStatus()

  const itemType = editItem?.type

  const [selItems, setSelItems] = useState<SelectionType>("one")

  const handleSubmit = () => {
    if (!editItem) return

    updateStatus({
      itemID: editItem.itemID,
      status: "ACTIVE",
      updateAssociated: selItems === "all",
      itemType: editItem.type,
    })
      .then(() => {
        closeModal()
        toast({
          title: `${capitalize(editItem.type)} unarchived`,
          description: `You can now commit time towards it.`,
        })
      })
      .catch(() =>
        toast({
          title: `Failed to unarchive ${editItem.type.toLowerCase()}`,
          description: "Try to unarchive it later.",
        })
      )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-fit px-4 max-md:border-x-0 sm:max-w-fit">
        <div>
          <DialogHeader className="mb-3">
            <DialogTitle asChild className="text-center text-2xl">
              <motion.h1 layout>{`Unarchive this ${
                editItem?.type.toLowerCase() ?? ""
              }?`}</motion.h1>
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
            <div className="mt-2 rounded-xl bg-slate-100 sm:w-[390px]">
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1">
                  <Info className="h-10 w-10 pl-3 text-gray-500" />
                </div>
                <div className="pr-3 text-gray-500">
                  {itemType === "TASK"
                    ? selectOptions[itemType].info
                    : selectOptions[itemType].info[selItems]}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-center space-x-2">
            <ConfirmAction
              onSubmit={handleSubmit}
              onCancel={closeModal}
              isLoading={isPending}
              submitLabel="Unarchive"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

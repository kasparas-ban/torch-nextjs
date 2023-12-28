import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Dream, Goal, ItemType } from "@/types/itemTypes"
import { capitalize, cn, formatTimeSpent } from "@/lib/utils"
import useModalState from "@/hooks/useModalState"
import { useDeleteItem } from "@/api/hooks/items/useDeleteItem"
import { useItemsList } from "@/api/hooks/items/useItemsList"
import { useUpdateItemStatus } from "@/api/hooks/items/useUpdateItemStatus"
import { countAssociatedTasks } from "@/api/utils/helpers"
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
    info: {
      archive:
        "This task will be archived and its progress will be locked. Its information will remain and you will be able to bring it back to an active status.",
      delete:
        "This task will be deleted with no way to bring it back. The time spent working towards it will be saved to your account.",
    },
  },
  GOAL: {
    oneSelection: {
      title: "Goal only",
      description: {
        archive: "Archive goal only",
        delete: "Delete goal only",
      },
    },
    allSelection: {
      title: "Goal + tasks",
      description: {
        archive: "Archive goal and all associated tasks",
        delete: "Delete goal and all associated tasks",
      },
    },
    info: {
      one: {
        archive:
          "This goal will be archived and its progress will be locked. Its information will remain and you will be able to bring it back to an active status.",
        delete:
          "This goal will be deleted with no way to bring it back. The time spent working towards it will be saved to your account.",
      },
      all: {
        archive:
          "This goal and all associated tasks will be archived and their progress will be locked. Their information will remain and you will be able to bring them back to an active status.",
        delete:
          "This goal and all associated tasks will be deleted with no way to bring them back. The time spent working towards them will be saved to your account.",
      },
    },
  },
  DREAM: {
    oneSelection: {
      title: "Dream only",
      description: {
        archive: "Archive dream only",
        delete: "Delete dream only",
      },
    },
    allSelection: {
      title: "All associated",
      description: {
        archive: "Archive dream and all associated goals and tasks",
        delete: "Delete dream and all associated goals and tasks",
      },
    },
    info: {
      one: {
        archive:
          "This dream will be archived and its progress will be locked. Its information will remain and you will be able to bring it back to an active status.",
        delete:
          "This dream will be deleted with no way to bring it back. The time spent working towards it will be saved to your account.",
      },
      all: {
        archive:
          "This dream and all associated goals and tasks will be archived and their progress will be locked. Their information will remain and you will be able to bring them back to an active status.",
        delete:
          "This dream and all associated goals and tasks will be deleted with no way to bring them back. The time spent working towards them will be saved to your account.",
      },
    },
  },
}

type ActionType = "archive" | "delete"
type SelectionType = "one" | "all"

export default function RemoveItemModal({ children }: { children: ReactNode }) {
  const { toast } = useToast()
  const { editItem, setEditItem } = useEditItem()
  const { data } = useItemsList()
  const { open, setOpen } = useModalState()
  const closeModal = () => setOpen(false)

  const { mutateAsync: updateStatus, isPending: isUpdatePending } =
    useUpdateItemStatus()
  const { mutateAsync: deleteItem, isPending: isDeletePending } =
    useDeleteItem()

  const itemType = editItem?.type
  const isArchived = editItem?.status === "ARCHIVED"

  const [action, setAction] = useState<ActionType>(
    editItem?.status === "ARCHIVED" ? "delete" : "archive"
  )
  const [selItems, setSelItems] = useState<SelectionType>("one")

  const handleSubmit = () => {
    if (!editItem) return

    if (action === "archive") {
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
            title: `${capitalize(editItem.type)} archived`,
            description: `It will be removed from the ${editItem.type.toLowerCase()} list.`,
          })
        })
        .catch(() =>
          toast({
            title: `Failed to archive ${editItem.type.toLowerCase()}`,
            description: "Try archiving it later.",
          })
        )
    } else {
      deleteItem({
        itemID: editItem.itemID,
        deleteAssociated: selItems === "all",
        itemType: editItem.type,
      })
        .then(() => {
          closeModal()
          setEditItem(undefined)
          toast({
            title: `${capitalize(editItem.type)} deleted`,
            description: `It will be removed from the ${editItem.type.toLowerCase()} list.`,
          })
        })
        .catch(() =>
          toast({
            title: `Failed to delete ${editItem.type.toLowerCase()}`,
            description: "Try deleting it later.",
          })
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-full px-4 max-md:border-x-0 sm:max-w-fit">
        <div className="flex h-full flex-col">
          <DialogHeader className="mb-3">
            <DialogTitle asChild className="text-center text-2xl">
              <motion.h1 layout>{`Remove ${
                editItem?.type.toLowerCase() ?? ""
              }`}</motion.h1>
            </DialogTitle>
          </DialogHeader>

          <div className="text-center text-lg font-medium text-gray-500">
            {editItem?.title}
          </div>
          {editItem && (
            <div className="flex flex-col gap-1">
              <div className="mt-1 flex justify-center text-gray-500">
                <span>Total time spent:</span>
                <TimerIcon className="ml-2 w-5" />
                <span className="ml-1">
                  {formatTimeSpent(
                    (editItem as Goal).totalTimeSpent || editItem.timeSpent
                  )}
                </span>
              </div>
              {editItem.type === "DREAM" && (
                <>
                  <div className="flex justify-center text-gray-500">
                    Number of associated goals:{" "}
                    {(editItem as Dream).goals.length}
                  </div>
                  <div className="flex justify-center text-gray-500">
                    Number of associated tasks:{" "}
                    {countAssociatedTasks(editItem, data?.rawItems || [])}
                  </div>
                </>
              )}
              {editItem.type === "GOAL" && (
                <div className="flex justify-center text-gray-500">
                  Number of associated tasks: {(editItem as Goal).tasks.length}
                </div>
              )}
            </div>
          )}

          <Tabs
            defaultValue={action}
            className="mt-4 sm:w-[390px]"
            value={action}
            onValueChange={val => {
              if (isArchived) return
              setAction(val as ActionType)
            }}
          >
            <TabsList
              className={cn(
                "grid h-auto w-full rounded-xl",
                isArchived ? "grid-cols-1" : "grid-cols-2"
              )}
            >
              {!isArchived && (
                <TabsTrigger
                  value="archive"
                  className="justify-start rounded-lg text-left"
                >
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">Archive</div>
                    <div className="font-medium text-gray-500">
                      Locks & hides the {itemType?.toLowerCase()}
                    </div>
                  </div>
                </TabsTrigger>
              )}
              <TabsTrigger
                value="delete"
                className="justify-start rounded-lg text-left"
              >
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">Delete</div>
                  <div className="font-medium text-gray-500">
                    Deletes all info
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {itemType && itemType !== "TASK" && (
            <Tabs
              defaultValue={selItems}
              className="mt-2 sm:w-[390px]"
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
                      {selectOptions[itemType].oneSelection.description[action]}
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
                      {selectOptions[itemType].allSelection.description[action]}
                    </div>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          {itemType && (
            <div
              className={cn(
                "mt-2 rounded-xl sm:w-[390px]",
                action === "delete" ? "bg-red-100" : "bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1">
                  <Info
                    className={cn(
                      "h-10 w-10 pl-3 text-gray-500",
                      action === "delete" && "text-red-700"
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "pr-3 text-gray-500",
                    action === "delete" && "text-red-700"
                  )}
                >
                  {itemType === "TASK"
                    ? selectOptions[itemType].info[action]
                    : selectOptions[itemType].info[selItems][action]}
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto flex justify-center space-x-2 sm:mt-4">
            <ConfirmAction
              onSubmit={handleSubmit}
              onCancel={closeModal}
              isLoading={isUpdatePending || isDeletePending}
              isDestructive={action === "delete"}
            />
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

import AddItemIcon from "@/public/images/add_item.svg"
import DeleteIcon from "@/public/images/delete.svg"
import EditIcon from "@/public/images/edit.svg"
import StatsIcon from "@/public/images/stats.svg"
import TickIcon from "@/public/images/tick.svg"
import { motion } from "framer-motion"

import { GeneralItem } from "@/types/itemTypes"

export default function ItemEditPanel<T extends GeneralItem>({
  item,
  sublistVisible,
  showBulletLine,
  showAddTask,
}: {
  item: T
  sublistVisible?: boolean
  showBulletLine?: boolean
  showAddTask?: boolean
}) {
  // const { openTaskModal, openGoalModal, openDreamModal } = useModal()
  // const { openItemDoneModal, openRemoveItemModal } = useConfirmModal()

  const doneFn = async () => console.log("Marking this item as done")
  const removeFn = async () => console.log("Removing this item")

  // const openEditItemModal = (item: T, createTaskOnOpen = false) =>
  //   item.type === "TASK"
  //     ? openTaskModal(item)
  //     : item.type === "GOAL"
  //     ? openGoalModal(item, undefined, createTaskOnOpen)
  //     : openDreamModal(item)

  return (
    <motion.div
      layout
      className="relative flex"
      initial={{ marginTop: 0, marginBottom: 0 }}
      animate={{
        marginTop: 12,
        marginBottom: sublistVisible ? 12 : 0,
      }}
      exit={{ marginTop: 0, marginBottom: 0 }}
    >
      {showBulletLine && (
        <div className="absolute left-[6px] h-[140%] w-1 bg-gray-300" />
      )}
      <motion.div
        layout
        className={`mx-auto flex ${
          showAddTask
            ? "w-[360px] max-[500px]:w-full"
            : "w-[300px] max-[400px]:px-6 max-[300px]:w-full"
        } justify-between`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: "auto",
          opacity: 1,
        }}
        exit={{ height: 0, opacity: 0 }}
      >
        {/* <MarkItemDoneModal> */}
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
          // onClick={() => openItemDoneModal(doneFn)}
        >
          <TickIcon className="mx-auto h-5" />
          Done
        </motion.div>
        {/* </MarkItemDoneModal> */}

        {showAddTask && (
          <motion.div
            className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
            whileHover={{ scale: 1.1 }}
            // onClick={() => openEditItemModal(item, true)}
          >
            <AddItemIcon className="mx-auto h-5" />
            Add task
          </motion.div>
        )}
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
        >
          <StatsIcon className="mx-auto h-5" />
          Stats
        </motion.div>
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
          // onClick={() => openEditItemModal(item)}
        >
          <EditIcon className="mx-auto h-5" />
          Edit
        </motion.div>
        {/* <RemoveItemModal> */}
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
          // onClick={() => openRemoveItemModal(removeFn)}
        >
          <DeleteIcon className="mx-auto h-5" />
          Remove
        </motion.div>
        {/* </RemoveItemModal> */}
      </motion.div>
    </motion.div>
  )
}

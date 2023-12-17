import { motion } from "framer-motion"
import { GeneralItem } from "@/types/itemTypes"
import AddItemIcon from "@/public/icons/add_item.svg"
import DeleteIcon from "@/public/icons/delete.svg"
import EditIcon from "@/public/icons/edit.svg"
import StatsIcon from "@/public/icons/stats.svg"
import TickIcon from "@/public/icons/tick.svg"

import CompleteItemModal from "../itemModal/completeItemModal/CompleteItemModal"
import useEditItem from "../itemModal/hooks/useEditItem"
import useItemModal from "../itemModal/hooks/useItemModal"
import RemoveItemModal from "../itemModal/removeItemModal/RemoveItemModal"

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
  const { editItem } = useEditItem()
  const { openTaskModal, openGoalModal, openDreamModal } = useItemModal()

  const openEditItemModal = () => {
    if (item.type === "TASK") {
      openTaskModal()
      return
    }

    if (item.type === "GOAL") {
      openGoalModal()
      return
    }

    openDreamModal()
  }

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
        <CompleteItemModal>
          <motion.div
            className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
            whileHover={{ scale: 1.1 }}
          >
            <TickIcon className="mx-auto h-5" />
            Done
          </motion.div>
        </CompleteItemModal>

        {showAddTask && (
          <motion.div
            className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
            whileHover={{ scale: 1.1 }}
            onClick={() => openTaskModal(undefined, editItem)}
          >
            <AddItemIcon className="mx-auto h-5" />
            Add task
          </motion.div>
        )}
        <motion.div
          className="flex shrink-0 select-none flex-col text-sm opacity-40"
          // whileHover={{ scale: 1.1 }}
        >
          <StatsIcon className="mx-auto h-5" />
          Stats
        </motion.div>
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
          onClick={openEditItemModal}
        >
          <EditIcon className="mx-auto h-5" />
          Edit
        </motion.div>
        <RemoveItemModal>
          <motion.div
            className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
            whileHover={{ scale: 1.1 }}
          >
            <DeleteIcon className="mx-auto h-5" />
            Remove
          </motion.div>
        </RemoveItemModal>
      </motion.div>
    </motion.div>
  )
}

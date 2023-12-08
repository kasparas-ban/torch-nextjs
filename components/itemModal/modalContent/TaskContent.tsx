import { motion } from "framer-motion"

import useEditItem from "../hooks/useEditItem"
import useItemModal from "../hooks/useItemModal"
import TaskForm from "../itemForms/TaskForm"

export default function TaskContent() {
  const { parentItem } = useItemModal()
  const { editItem } = useEditItem()

  return (
    <>
      <motion.h1 layout className="text-center text-4xl font-semibold">
        {editItem && !parentItem ? "Edit Task" : "New Task"}
      </motion.h1>
      <TaskForm />
    </>
  )
}

import { motion } from "framer-motion"

import useEditItem from "../hooks/useEditItem"
import TaskForm from "../itemForms/TaskForm"

export default function TaskContent() {
  const { editItem } = useEditItem()

  return (
    <>
      <motion.h1 layout className="text-center text-4xl font-semibold">
        {editItem ? "Edit Task" : "New Task"}
      </motion.h1>
      <TaskForm />
    </>
  )
}

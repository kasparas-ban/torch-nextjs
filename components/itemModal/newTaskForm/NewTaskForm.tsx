import { motion } from "framer-motion"

import TaskForm from "../itemForms/TaskForm"

export default function NewTaskForm() {
  return (
    <>
      <motion.h1 layout className="text-center text-4xl font-semibold">
        New Task
      </motion.h1>
      <TaskForm />
    </>
  )
}

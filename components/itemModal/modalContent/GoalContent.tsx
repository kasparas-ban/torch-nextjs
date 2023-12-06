import { motion } from "framer-motion"

import useEditItem from "../hooks/useEditItem"
import GoalForm from "../itemForms/GoalForm"

export default function GoalContent() {
  const { editItem } = useEditItem()

  return (
    <>
      <motion.h1 layout className="text-center text-4xl font-semibold">
        {editItem ? "Edit Goal" : "New Goal"}
      </motion.h1>
      <GoalForm />
    </>
  )
}

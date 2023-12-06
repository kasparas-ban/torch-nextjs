import { motion } from "framer-motion"

import useEditItem from "../hooks/useEditItem"
import DreamForm from "../itemForms/DreamForm"

export default function DreamContent() {
  const { editItem } = useEditItem()

  return (
    <>
      <motion.h1 layout className="text-center text-4xl font-semibold">
        {editItem ? "Edit Dream" : "New Dream"}
      </motion.h1>
      <DreamForm />
    </>
  )
}

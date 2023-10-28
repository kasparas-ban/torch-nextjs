import { motion } from "framer-motion"
import DotsIcon from "@/public/images/dots.svg"

function ItemListSkeleton() {
  return (
    <motion.ul
      key="list_skeleton"
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {Array.from({ length: 3 }).map((_, idx) => (
        <motion.div
          key={`item_${idx}`}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.6, delay: 0.1 * idx }}
        >
          <ItemStrip />
        </motion.div>
      ))}
    </motion.ul>
  )
}

function ItemStrip() {
  return (
    <motion.div className="relative flex w-full min-w-0">
      <motion.div className="relative flex w-full items-center overflow-hidden rounded-2xl border bg-gray-200 pl-6 pr-1 md:rounded-3xl">
        <motion.div className="z-10 py-3">
          <div className="h-6 w-56 rounded-md bg-gray-300" />
        </motion.div>
        <div className="z-0 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          <motion.div className="text-gray-400">
            <DotsIcon className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ItemListSkeleton

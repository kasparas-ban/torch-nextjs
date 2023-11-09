import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Loader2, X } from "lucide-react"

type SubmitButtonProps = {
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export default function SubmitButton({
  isLoading,
  isSuccess,
  isError,
}: SubmitButtonProps) {
  const [isFailed, setIsFailed] = useState(false)

  useEffect(() => {
    if (isError) {
      setIsFailed(true)
      const timeoutID = setTimeout(() => setIsFailed(false), 2000)
      return () => clearTimeout(timeoutID)
    }
  }, [isError])

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {isLoading ? (
        <motion.div
          key="button_loading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            layout
            className="flex items-center px-3 py-1 text-xl font-medium text-gray-400"
            disabled
          >
            <Loader2 className="relative top-[1px] mr-2 h-4 w-4 animate-spin" />
            Saving
          </motion.button>
        </motion.div>
      ) : isSuccess ? (
        <motion.div
          key="button_done"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            layout
            disabled
            className="flex items-center px-3 py-1 text-xl font-medium opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            <Check className="relative top-[2px] mr-2 h-4 w-4 text-green-500" />
            Saved
          </motion.button>
        </motion.div>
      ) : isFailed ? (
        <motion.div
          key="button_fail"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            layout
            className="flex items-center px-3 py-1 text-xl font-medium text-red-500"
            disabled
          >
            <X className="relative top-0.5 mr-1 h-4 w-4" />
            Failed
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="button_ready"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            layout
            className="px-3 py-1 text-xl font-medium"
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            Save
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

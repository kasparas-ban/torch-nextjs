import { motion } from "framer-motion"

export default function EmailChangeComplete({
  closeModal,
}: {
  closeModal: () => void
}) {
  return (
    <motion.div
      className="mt-4 flex h-full flex-col px-0 pb-2 sm:mt-0 sm:px-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <h5 className="mb-4 flex justify-center text-3xl font-semibold">
        Confirmation link sent
      </h5>
      <p className="mb-4 text-center text-gray-700">
        A confirmation link was sent to your new email address - click it to
        complete the change.
      </p>

      <div className="relative mb-7 mt-auto flex justify-center sm:mb-0">
        <motion.button
          layout
          className="px-3 py-1 text-xl font-medium"
          whileTap={{ scale: 0.95 }}
          onClick={closeModal}
        >
          Ok
        </motion.button>
      </div>
    </motion.div>
  )
}

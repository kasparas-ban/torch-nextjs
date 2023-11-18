import { motion } from "framer-motion"

export default function EmailChangeSuccess() {
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
    </motion.div>
  )
}

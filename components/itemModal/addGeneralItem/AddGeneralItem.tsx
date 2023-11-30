import { motion } from "framer-motion"

import useItemModal from "../hooks/useItemModal"

export default function AddGeneralItem() {
  const { openTaskModal, openGoalModal, openDreamModal } = useItemModal()

  return (
    <div className="mb-4 flex flex-col gap-3">
      <h3 className="text-center text-4xl font-semibold">Choose type</h3>
      <section className="mx-auto">
        <div className="flex flex-col gap-3 px-0 pb-2 pt-4">
          <motion.button
            layout
            className="w-full rounded-xl bg-gray-200 px-6 py-4 drop-shadow-lg hover:bg-gray-300"
            onClick={() => openTaskModal(true)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-left">
              <div className="text-2xl font-semibold">Add task</div>
              <div className="my-1">One time or recurring short task</div>
              <div className="text-sm text-gray-500">
                Read 20 pages, run 3km, study for 2h...
              </div>
            </div>
          </motion.button>
          <motion.button
            layout
            className="w-full rounded-xl bg-gray-200 px-6 py-4 drop-shadow-lg hover:bg-gray-300"
            onClick={() => openGoalModal(true)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-left">
              <div className="text-2xl font-semibold">Add goal</div>
              <div className="my-1">
                Larger objective composed of smaller tasks
              </div>
              <div className="text-sm text-gray-500">
                Finish a book, run a marathon, pass the exam...
              </div>
            </div>
          </motion.button>
          <motion.button
            layout
            className="w-full rounded-xl bg-gray-200 px-6 py-4 drop-shadow-lg hover:bg-gray-300"
            onClick={() => openDreamModal(true)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-left">
              <div className="text-2xl font-semibold">Add dream</div>
              <div className="my-1">General aspiration to work towards</div>
              <div className="text-sm text-gray-500">
                Become a novelist, finish university...
              </div>
            </div>
          </motion.button>
        </div>
      </section>
    </div>
  )
}

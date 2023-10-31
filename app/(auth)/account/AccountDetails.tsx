import { motion } from "framer-motion"

export default function AccountDetails() {
  return (
    <section className="flex flex-col gap-4 sm:flex-row">
      <section className="flex w-full items-center rounded-xl bg-gray-200 px-5 py-4 shadow-lg">
        <div className="h-24 w-24 rounded-full bg-gray-400" />
        <div className="flex flex-col justify-between px-5">
          <div className="font-bold">kaspis245</div>
          <div className="flex items-end">
            <span className="mr-0.5 text-4xl font-bold">32</span>
            <span className="mr-2 text-xl font-bold">h</span>
            <span className="mr-0.5 text-4xl font-bold">44</span>
            <span className="text-xl font-bold">min</span>
          </div>
          <div className="mt-2 flex w-32 justify-center rounded-lg bg-gray-400 py-0.5 text-sm font-medium">
            Free account
          </div>
        </div>
      </section>

      <motion.button
        className="bg-multi-color group m-auto flex h-32 w-full flex-col items-center justify-around rounded-xl px-5 py-3 text-sm text-gray-700 shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-lg font-semibold text-gray-800">
          Unlock more features
        </div>
        <div className="flex items-center text-left font-medium tracking-wide text-gray-800">
          <div>
            <span className="mr-1">📈</span>
            Stats
          </div>
          <div className="mx-2 h-1 w-1 rounded-full bg-gray-800/40" />
          <div>
            <span className="mr-1">📅</span>Calendar
          </div>
          <div className="mx-2 h-1 w-1 rounded-full bg-gray-800/40" />
          <div>
            <span className="mr-1">🤝</span>Support
          </div>
        </div>
        <div className="relative rounded-md text-2xl font-bold text-white transition-all duration-75 ease-in">
          Become a member
        </div>
      </motion.button>
    </section>
  )
}

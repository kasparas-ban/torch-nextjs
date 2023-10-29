import { forwardRef, Ref } from "react"
import { motion } from "framer-motion"
import SettingsIcon from "@/public/icons/settings.svg"

import useTimerStore from "../hooks/useTimer"

import "@/styles/backgrounds.css"

const buttonVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

function TimerActionButtons() {
  const timerState = useTimerStore.use.timerState()
  const startTimer = useTimerStore.use.startTimer()
  const pauseTimer = useTimerStore.use.pauseTimer()
  const resetTimer = useTimerStore.use.resetTimer()

  return timerState === "idle" ? (
    <motion.button
      layout
      type="submit"
      key="timer_start"
      onClick={startTimer}
      className="bg-multi-color m-auto mt-4 flex h-8 w-24 rounded-full px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
      whileHover={{ scale: 1.06 }}
      variants={buttonVariants}
      initial="initial"
      animate="default"
      exit="close"
    >
      <div className="m-auto flex h-full items-center font-medium tracking-wider text-white">
        Start
      </div>
    </motion.button>
  ) : timerState === "running" ? (
    <motion.button
      layout
      type="submit"
      key="timer_pause"
      onClick={pauseTimer}
      className="m-auto mt-4 flex h-8 w-24 rounded-full border border-gray-400"
      whileHover={{ scale: 1.06 }}
      variants={buttonVariants}
      initial="initial"
      animate="default"
      exit="close"
    >
      <div className="m-auto font-semibold tracking-wide text-gray-600">
        Pause
      </div>
    </motion.button>
  ) : (
    <div key="timer_continue_panel" className="flex justify-center space-x-3">
      <motion.button
        layout
        type="submit"
        key="timer_continue"
        onClick={startTimer}
        className="bg-multi-color relative mt-4 flex h-8 w-24 rounded-full px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
        whileHover={{ scale: 1.06 }}
        variants={buttonVariants}
        initial="initial"
        animate="default"
        exit="close"
      >
        <div className="absolute right-[13px] top-1 font-medium tracking-wide text-white">
          Continue
        </div>
      </motion.button>
      <motion.button
        layout
        type="submit"
        key="timer_reset"
        onClick={resetTimer}
        className="mt-4 flex h-8 w-24 rounded-full border border-gray-400"
        whileHover={{ scale: 1.06 }}
        variants={buttonVariants}
        initial="initial"
        animate="default"
        exit="close"
      >
        <div className="m-auto font-semibold tracking-wide text-gray-600">
          Stop
        </div>
      </motion.button>
    </div>
  )
}

function TimerSettingsButton() {
  const timerState = useTimerStore.use.timerState()

  return (
    timerState !== "running" && (
      <motion.div
        layout
        key="timer_settings"
        className="mt-2 flex justify-center"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: "auto",
        }}
        exit={{ opacity: 0, height: 0, transition: { duration: 0.01 } }}
      >
        <motion.div
          className="flex cursor-pointer items-center rounded-xl px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          whileHover={{ scale: 1.06 }}
        >
          <SettingsIcon className="mr-1 h-4 w-4" />
          Settings
        </motion.div>
      </motion.div>
    )
  )
}

const exports = {
  TimerActionButtons: forwardRef(TimerActionButtons),
  TimerSettingsButton: forwardRef(TimerSettingsButton),
}

export default exports

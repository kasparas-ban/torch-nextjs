"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ROUTES } from "@/config/routes"
import { cn, secondsToMinutes } from "@/lib/utils"
import PauseIcon from "@/public/icons/timerIcons/pause.svg"
import PlayIcon from "@/public/icons/timerIcons/play.svg"
import ResetIcon from "@/public/icons/timerIcons/reset.svg"

import useTimerStore from "../timer/hooks/useTimer"
import useTimerForm from "../timer/hooks/useTimerForm"

const buttonVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

const TimerToast = ({ showBackdrop }: { showBackdrop?: boolean }) => {
  const pathname = usePathname()
  const time = useTimerStore.use.time()
  const startTimer = useTimerStore.use.startTimer()
  const pauseTimer = useTimerStore.use.pauseTimer()
  const resetTimer = useTimerStore.use.resetTimer()
  const timerState = useTimerStore.use.timerState()
  const isBreakActive = useTimerStore.use.break()

  const { focusOn } = useTimerForm()

  const showPlayBtn = timerState === "idle" || timerState === "paused"
  const showPauseBtn = timerState === "running"
  const showResetBtn = timerState === "paused"

  const isShowing =
    pathname !== ROUTES.timer.path &&
    (timerState === "running" || timerState === "paused")

  const toastColor = isBreakActive
    ? timerState !== "running"
      ? "from-blue-200 to-blue-300"
      : "from-blue-400 to-blue-500"
    : timerState !== "running"
      ? "from-red-200 to-rose-300"
      : "from-red-400 to-rose-500"

  return (
    <AnimatePresence mode="popLayout">
      {isShowing && (
        <motion.div
          className={cn(
            "sticky top-[70px] z-20 mt-4 flex justify-center max-[768px]:px-6 max-[600px]:top-2 md:space-x-36",
            showBackdrop &&
              "before:absolute before:top-[-8px] before:z-[-1] before:h-[calc(100%+30px)] before:w-full before:bg-gradient-to-b before:from-white/80 before:from-60% before:content-['']"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: [1, 0.2, 0], y: [0, -10, -20] }}
        >
          <motion.div
            layout
            className={cn(
              "flex w-fit items-center gap-3 rounded-3xl bg-gradient-to-b px-4 py-1 drop-shadow max-sm:max-w-full",
              toastColor
            )}
            initial={{ background: "" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {focusOn && (
              <motion.div
                layout="position"
                className={cn(
                  "max-w-sm truncate sm:pl-2 sm:pr-1 sm:text-lg",
                  timerState !== "running" ? "text-gray-600" : "text-white"
                )}
              >
                {focusOn.label}
              </motion.div>
            )}

            <motion.div
              layout
              className={cn(
                "min-w-[90px] pb-[3px] pl-2 pr-1 text-3xl font-semibold",
                timerState !== "running" ? "text-gray-600" : "text-white"
              )}
            >
              {secondsToMinutes(time)}
            </motion.div>
            <motion.div
              layout
              className={cn(
                "h-4/5 w-[1px]",
                timerState !== "running" ? "bg-gray-500/30" : "bg-gray-100"
              )}
            />
            <div className="flex gap-2">
              <AnimatePresence mode="popLayout">
                {showPlayBtn && (
                  <motion.button
                    layout
                    key="play_btn"
                    onClick={startTimer}
                    className={cn(
                      "group flex h-10 w-10 items-center justify-center rounded-full text-gray-100 hover:text-gray-600",
                      isBreakActive ? "hover:bg-blue-200" : "hover:bg-rose-200"
                    )}
                    whileHover={{ scale: 1.06 }}
                    variants={buttonVariants}
                    initial="initial"
                    animate="default"
                    exit="close"
                  >
                    <PlayIcon className="h-5 w-5 stroke-2 pl-px text-gray-600 group-hover:text-gray-700" />
                  </motion.button>
                )}

                {showPauseBtn && (
                  <motion.button
                    layout
                    key="pause_btn"
                    onClick={pauseTimer}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-gray-100 hover:bg-rose-200 hover:text-gray-700",
                      isBreakActive ? "hover:bg-blue-200" : "hover:bg-rose-200"
                    )}
                    whileHover={{ scale: 1.06 }}
                    variants={buttonVariants}
                    initial="initial"
                    animate="default"
                    exit="close"
                  >
                    <PauseIcon className="h-5 w-5 stroke-2" />
                  </motion.button>
                )}

                {showResetBtn && (
                  <motion.button
                    layout
                    key="reset_btn"
                    onClick={resetTimer}
                    className={cn(
                      "group flex h-10 w-10 items-center justify-center rounded-full text-gray-100 hover:bg-rose-200 hover:text-gray-700",
                      isBreakActive ? "hover:bg-blue-200" : "hover:bg-rose-200"
                    )}
                    whileHover={{ scale: 1.06 }}
                    variants={buttonVariants}
                    initial="initial"
                    animate="default"
                    exit="close"
                  >
                    <ResetIcon className="h-5 w-5 stroke-2 text-gray-600 group-hover:text-gray-700" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TimerToast

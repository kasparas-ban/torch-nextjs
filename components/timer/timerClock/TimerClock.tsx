import { forwardRef, Ref } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import useTimerStore, { useTimerListener } from "../hooks/useTimer"
import { TimerShape } from "./TimerShape"

function TimerClock(_: any, ref: Ref<HTMLDivElement>) {
  useTimerListener()

  const time = useTimerStore.use.time()
  const timerState = useTimerStore.use.timerState()

  const initialTimerTime = useTimerStore.use.initialTime()
  const isBreakActive = useTimerStore.use.break()
  const isLongBreakActive = useTimerStore.use.timerCount() >= 4
  const longBreakTime = useTimerStore.use.longBreakTime()
  const breakTime = useTimerStore.use.breakTime()
  const initialTime = isBreakActive
    ? isLongBreakActive
      ? longBreakTime
      : breakTime
    : initialTimerTime

  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  return (
    <motion.div
      layout
      ref={ref}
      className={cn(
        "m-auto mt-6 flex aspect-square max-w-xs flex-col justify-center rounded-full border",
        isBreakActive && timerState === "idle"
          ? "border-blue-400"
          : timerState === "idle"
          ? "border-rose-600"
          : ""
      )}
    >
      <TimerShape
        initialTime={initialTime}
        currentTime={time}
        isBreakActive={isBreakActive}
      />
      <div className="text-center text-8xl font-thin tabular-nums max-[300px]:text-7xl">
        {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
      </div>
    </motion.div>
  )
}

export default forwardRef(TimerClock)

import { motion } from "framer-motion"
import { ItemOptionType } from "@/types/itemTypes"
import { formatPercentages, formatTimeSpent } from "@/lib/utils"
import NumberAnimator from "@/components/numberAnimator/NumberAnimator"
import TimerIcon from "@/public/icons/navigationIcons/timer.svg"
import TimerBoldIcon from "@/public/icons/timerBold.svg"

function TimerFocusInfo({ focusOn }: { focusOn: ItemOptionType }) {
  const info =
    focusOn.type === "TASK" ? (
      <TaskInfo focusOn={focusOn} />
    ) : (
      <ParentInfo focusOn={focusOn} />
    )

  return (
    <motion.div
      layout
      className="relative mt-4 flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.6 },
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.1 } }}
    >
      <motion.div
        layout
        className="mx-auto max-w-2xl px-6 text-center text-xl font-semibold [text-wrap:balance]"
      >
        {focusOn?.label}
      </motion.div>
      {info}
    </motion.div>
  )
}

const TaskInfo = ({ focusOn }: { focusOn: ItemOptionType }) => {
  const showProgress = !!focusOn.duration
  const timeLeft =
    focusOn.duration && focusOn.timeSpent
      ? focusOn.duration - focusOn.timeSpent
      : undefined

  return (
    <motion.div layout className="flex flex-row justify-center gap-2">
      {showProgress && (
        <div className="text-6xl font-bold">
          <NumberAnimator value={focusOn.progress ?? 0}>
            {formatPercentages(focusOn.progress)}
          </NumberAnimator>
          <span className="text-5xl">%</span>
        </div>
      )}
      <div className="mt-1.5 flex flex-col justify-evenly gap-1">
        <div className="flex gap-1">
          <TimerBoldIcon className="w-5" />
          <span className="font-semibold">
            <NumberAnimator value={focusOn.timeSpent ?? 0}>
              {formatTimeSpent(focusOn.timeSpent ?? 0)}
            </NumberAnimator>
          </span>
          <span className="text-gray-600">spent</span>
        </div>
        {timeLeft && (
          <div className="flex gap-1">
            <TimerIcon className="w-5" />
            <span className="font-semibold">
              <NumberAnimator value={timeLeft}>
                {formatTimeSpent(timeLeft)}
              </NumberAnimator>
            </span>
            <span className="text-gray-600">left</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ParentInfo = ({ focusOn }: { focusOn: ItemOptionType }) => {
  const showProgress = !!focusOn.duration
  const timeLeft =
    focusOn.duration && focusOn.timeSpent
      ? focusOn.duration - focusOn.timeSpent
      : undefined

  return (
    <motion.div layout className="flex justify-center gap-2">
      {showProgress && (
        <div className="flex items-center max-sm:text-center sm:flex sm:items-center sm:text-6xl">
          <div className="text-4xl font-bold">
            <NumberAnimator value={focusOn.progress ?? 0}>
              {formatPercentages(focusOn.progress)}
            </NumberAnimator>
            <span className="text-3xl">%</span>
          </div>
        </div>
      )}
      <div className="mt-1.5 flex flex-col justify-evenly gap-1 max-sm:w-fit max-sm:items-start">
        {focusOn.timeSpent !== undefined && (
          <div className="flex gap-2">
            <TimerBoldIcon className="w-5" />
            <NumberAnimator value={focusOn.timeSpent}>
              <span className="font-semibold">
                {formatTimeSpent(focusOn.timeSpent)}
              </span>
            </NumberAnimator>
            <span className="text-gray-600">{`spent${
              focusOn.containsTasks ? " on tasks" : ""
            }`}</span>
          </div>
        )}
        {focusOn.containsTasks && focusOn.totalTimeSpent !== undefined && (
          <div className="flex gap-2">
            <TimerBoldIcon className="w-5" />
            <span className="font-semibold">
              <NumberAnimator value={focusOn.totalTimeSpent}>
                {formatTimeSpent(focusOn.totalTimeSpent)}
              </NumberAnimator>
            </span>
            <span className="text-gray-600">spent in total</span>
          </div>
        )}
        {!!timeLeft && (
          <div className="flex gap-2">
            <TimerIcon className="w-5" />
            <span className="font-semibold">
              <NumberAnimator value={timeLeft}>
                {formatTimeSpent(timeLeft)}
              </NumberAnimator>
            </span>
            <span className="text-gray-600">{`left ${
              focusOn.totalTimeSpent ? "on tasks" : ""
            }`}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TimerFocusInfo

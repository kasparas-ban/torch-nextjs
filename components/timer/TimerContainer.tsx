"use client"

import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

import useTimerForm from "./hooks/useTimerForm"
import timerButtons from "./timerClock/TimerActionsButtons"
import TimerClock from "./timerClock/TimerClock"
import TimerFocusForm from "./TimerFocusForm/TimerFocusForm"
import TimerFocusInfo from "./TimerFocusForm/TimerFocusInfo"
import TimerSettingsModal from "./TimerSettings/TimerSettingsModal"

export default function TimerContainer() {
  const { focusOn } = useTimerForm()

  return (
    <motion.div
      layout
      className="max-[320px]:mx-2"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          <TimerFocusForm key="timer_focus_form" />

          {focusOn && (
            <motion.div
              layout
              key={`${focusOn.type}_${focusOn.value}_info`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <TimerFocusInfo key="timer_focus_info" focusOn={focusOn} />
            </motion.div>
          )}

          <TimerClock key="timer_clock" />

          <timerButtons.TimerActionButtons key="timer_action_buttons" />
          <TimerSettingsModal>
            <timerButtons.TimerSettingsButton />
          </TimerSettingsModal>
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  )
}

"use client"

import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

import timerButtons from "./timerClock/TimerActionsButtons"
import TimerClock from "./timerClock/TimerClock"
import TimerFocusForm from "./TimerFocusForm/TimerFocusForm"
import TimerFocusInfo from "./TimerFocusForm/TimerFocusInfo"
import TimerSettingsModal from "./TimerSettings/TimerSettingsModal"

export default function TimerContainer() {
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

          <TimerFocusInfo key="timer_focus_info" />

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

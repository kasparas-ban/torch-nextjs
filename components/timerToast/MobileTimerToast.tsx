"use client"

import { useMediaQuery } from "react-responsive"

import TimerToast from "./TimerToast"

export default function MobileTimerToast() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  return !isDesktop && <TimerToast showBackdrop />
}

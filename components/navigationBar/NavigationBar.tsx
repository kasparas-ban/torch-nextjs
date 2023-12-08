"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

import "@/styles/backgrounds.css"

import { createPortal } from "react-dom"
import { useMediaQuery } from "react-responsive"
import { useScrollPosition } from "@/hooks/useScrollPosition"

import NavbarDesktop from "./DesktopNavbar"
import NavbarMobile from "./MobileNavbar"

export default function NavigationBar() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  return (
    <>
      {isDesktop ? (
        <div className="sticky top-0 z-20 hidden sm:block">
          <NavbarDesktop />
        </div>
      ) : (
        <>{createPortal(<NavbarMobile />, document.body)}</>
      )}
    </>
  )
}

export function NavigationBarWrapper({
  children,
  mobile,
}: {
  children: ReactNode
  mobile?: boolean
}) {
  const { yScroll } = useScrollPosition()

  const backgroundColorMobile = "rgb(156 163 175 / 0.3)"
  const backgroundColorDesktop = yScroll
    ? "rgb(156 163 175 / 0.3)"
    : "rgb(0 0 0 / 0)"

  return (
    <motion.nav
      layout
      className="flex justify-between rounded-2xl backdrop-blur-sm"
      animate={{
        backgroundColor: mobile
          ? backgroundColorMobile
          : backgroundColorDesktop,
        paddingLeft: !mobile && yScroll ? 24 : 0,
        paddingRight: !mobile && yScroll ? 24 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.nav>
  )
}

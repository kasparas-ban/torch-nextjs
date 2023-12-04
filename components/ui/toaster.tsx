"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  const isToastShown = !!toasts.find(toast => toast.open)

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <>
            <AnimatePresence>
              {isToastShown && (
                <motion.img
                  src="/images/toast_background.png"
                  className="fixed bottom-0 left-1/2 z-[60] flex max-h-screen w-[500px] max-w-[1200px] translate-x-[-50%] translate-y-[5%] flex-col-reverse p-4 sm:top-auto sm:w-full sm:translate-y-[50%] sm:flex-col md:max-w-[1200px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <Toast
              key={id}
              {...(isDesktop && { onSwipeMove: e => e.preventDefault() })}
              {...(isDesktop && { onSwipeEnd: e => e.preventDefault() })}
              {...props}
            >
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose className="focus:ring-gray-500" />
            </Toast>
          </>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

import { forwardRef, ReactNode, Ref, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import TimerSettingsContent from "./TimerSettingsContent"

function TimerSettingsModal(
  { children }: { children: ReactNode },
  ref: Ref<HTMLDivElement>
) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]" ref={ref}>
        <TimerSettingsContent setModalOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default forwardRef(TimerSettingsModal)

import Link from "next/link"
import { motion } from "framer-motion"
import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/useScrollPosition"
import TimerIcon from "@/public/icons/navigationIcons/timer.svg"
import TorchLogo from "@/public/icons/torch_logo.svg"

type NavigationLinkProps = {
  Icon: any
  path: string
  linkName: string
  highlight?: boolean
  mobile?: boolean
}

export function NavigationLink({
  Icon,
  path,
  linkName,
  highlight,
  mobile,
}: NavigationLinkProps) {
  return (
    <Link
      href={path}
      className={cn(
        "flex flex-col items-center justify-center",
        highlight ? "mx-4 w-12 rounded-full" : "rounded-lg"
      )}
    >
      {highlight ? (
        <TimerLink mobile={mobile} />
      ) : (
        <div
          className={cn(
            "peer flex flex-col rounded-lg px-3 py-2 hover:cursor-pointer max-[600px]:pb-1",
            !mobile && "hover:bg-slate-300 max-[450px]:hidden"
          )}
        >
          <Icon className="mx-auto h-6 w-6 text-slate-800" alt="Nav icon" />
          {mobile && <span className="text-[11px]">{linkName}</span>}
        </div>
      )}
      {!mobile && (
        <div className="relative z-30 hidden translate-y-5 peer-hover:block">
          <div className="absolute z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-200 p-1 shadow-lg">
            {linkName}
          </div>
        </div>
      )}
    </Link>
  )
}

export const TorchLink = () => {
  const { yScroll } = useScrollPosition()

  return (
    <motion.div
      className="relative h-12 hover:cursor-pointer"
      animate={{ scale: yScroll ? 0.8 : 1, top: yScroll ? 0 : -4 }}
    >
      <Link href={ROUTES.index.path}>
        <TorchLogo className="h-12 w-6" alt="Logo" />
      </Link>
    </motion.div>
  )
}

export const TimerLink = ({ mobile }: { mobile?: boolean }) => {
  const { yScroll } = useScrollPosition()
  const scale = mobile ? 0.9 : yScroll ? 0.8 : 1

  return (
    <motion.div
      className="bg-multi-color bg-multi-color-delay peer rounded-full p-2 brightness-150 transition-all hover:cursor-pointer hover:brightness-100"
      animate={{ scale }}
    >
      <TimerIcon
        className="relative mx-auto flex h-8 w-8 items-center text-slate-800"
        alt="Nav icon"
      />
    </motion.div>
  )
}

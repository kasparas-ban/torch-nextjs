import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import AccountIcon from "@/public/icons/navigationIcons/account.svg"
import GoalsIcon from "@/public/icons/navigationIcons/goals.svg"
import StatsIcon from "@/public/icons/navigationIcons/stats.svg"
import TimerIcon from "@/public/icons/navigationIcons/timer.svg"
import WorldIcon from "@/public/icons/navigationIcons/world.svg"

import { NavigationLink } from "./helpers"
import { NavigationBarWrapper } from "./NavigationBar"

export default function NavbarMobile() {
  return (
    <div
      className={cn(
        "fixed bottom-0 z-20 flex w-full flex-col items-center justify-center bg-transparent pb-4 pt-2 shadow-lg max-[768px]:px-3",
        "before:absolute before:top-[-30px] before:z-[-1] before:h-[calc(100%+30px)] before:w-full before:bg-gradient-to-t before:from-white/80 before:from-60% before:content-['']"
      )}
    >
      <div className="w-full max-w-sm">
        <NavigationBarWrapper mobile>
          <NavbarContentMobile />
        </NavigationBarWrapper>
      </div>
    </div>
  )
}

function NavbarContentMobile() {
  return (
    <ul className="h-13 flex w-full justify-between space-x-1 overflow-visible rounded-[16px] px-3">
      <NavigationLink
        Icon={GoalsIcon}
        path={ROUTES.items.path}
        linkName={ROUTES.items.label}
        mobile
      />
      <NavigationLink
        Icon={StatsIcon}
        path={ROUTES.stats.path}
        linkName={ROUTES.stats.label}
        mobile
      />
      <NavigationLink
        Icon={TimerIcon}
        path={ROUTES.timer.path}
        linkName={ROUTES.index.label}
        highlight
        mobile
      />
      <NavigationLink
        Icon={WorldIcon}
        path={ROUTES.world.path}
        linkName={ROUTES.world.label}
        mobile
      />
      <NavigationLink
        Icon={AccountIcon}
        path={ROUTES.account.path}
        linkName={ROUTES.account.label}
        mobile
      />
    </ul>
  )
}

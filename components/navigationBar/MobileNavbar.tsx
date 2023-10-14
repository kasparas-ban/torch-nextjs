import calendarIcon from "@/public/images/navigationIcons/calendar.svg"
import goalsIcon from "@/public/images/navigationIcons/goals.svg"
import statsIcon from "@/public/images/navigationIcons/stats.svg"
import timerIcon from "@/public/images/navigationIcons/timer.svg"
import worldIcon from "@/public/images/navigationIcons/world.svg"

import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

import { NavigationLink } from "./helpers"
import { NavigationBarWrapper } from "./NavigationBar"

export default function NavbarMobile() {
  return (
    <div
      className={cn(
        "fixed bottom-0 z-20 flex items-center w-full flex-col justify-center bg-transparent pb-4 pt-2 shadow-lg max-[768px]:px-3",
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
        iconPath={goalsIcon}
        path={ROUTES.items.path}
        linkName={ROUTES.items.label}
        mobile
      />
      <NavigationLink
        iconPath={calendarIcon}
        path={ROUTES.stats.path}
        linkName={ROUTES.stats.label}
        mobile
      />
      <NavigationLink
        iconPath={timerIcon}
        path={ROUTES.timer.path}
        linkName={ROUTES.index.label}
        highlight
        mobile
      />
      <NavigationLink
        iconPath={worldIcon}
        path={ROUTES.world.path}
        linkName={ROUTES.world.label}
        mobile
      />
      <NavigationLink
        iconPath={statsIcon}
        path={ROUTES.account.path}
        linkName={ROUTES.account.label}
        mobile
      />
    </ul>
  )
}

import CalendarIcon from "@/public/images/navigationIcons/calendar.svg"
import GoalsIcon from "@/public/images/navigationIcons/goals.svg"
import StatsIcon from "@/public/images/navigationIcons/stats.svg"
import TimerIcon from "@/public/images/navigationIcons/timer.svg"
import WorldIcon from "@/public/images/navigationIcons/world.svg"

import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

import AccountDropdown from "./AccountDropdown"
import { NavigationLink, TorchLink } from "./helpers"
import { NavigationBarWrapper } from "./NavigationBar"

export default function DesktopNavbar() {
  return (
    <div
      className={cn(
        "sticky top-0 z-20 flex flex-col justify-center bg-transparent pt-4 max-[768px]:px-6"
        // "before:absolute before:top-0 before:z-[-1] before:h-[calc(100%+35px)] before:w-full before:bg-gradient-to-b before:from-white/90 before:from-60% before:content-['']"
      )}
    >
      <div className="z-30 mx-auto w-full max-w-[650px]">
        <NavigationBarWrapper>
          <TorchLink />
          <ul className="flex h-12 space-x-1 overflow-visible rounded-[16px] px-4">
            <NavigationLink
              Icon={GoalsIcon}
              path={ROUTES.items.path}
              linkName={ROUTES.items.label}
            />
            <NavigationLink
              Icon={CalendarIcon}
              path={ROUTES.calendar.path}
              linkName={ROUTES.calendar.label}
            />
            <NavigationLink
              Icon={TimerIcon}
              path={ROUTES.timer.path}
              linkName={ROUTES.timer.label}
              highlight
            />
            <NavigationLink
              Icon={WorldIcon}
              path={ROUTES.world.path}
              linkName={ROUTES.world.label}
            />
            <NavigationLink
              Icon={StatsIcon}
              path={ROUTES.stats.path}
              linkName={ROUTES.stats.label}
            />
          </ul>
          <div
            id="accountDropdownButton"
            className="group flex items-center max-[450px]:hidden"
          >
            <AccountDropdown />
          </div>
        </NavigationBarWrapper>
      </div>
      {/* <TimerToast /> */}
    </div>
  )
}

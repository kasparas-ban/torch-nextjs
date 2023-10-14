"use client"

import { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { ROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"

import "@/styles/backgrounds.css"

import accountIcon from "@/public/images/navigationIcons/account.svg"
import calendarIcon from "@/public/images/navigationIcons/calendar.svg"
import goalsIcon from "@/public/images/navigationIcons/goals.svg"
import statsIcon from "@/public/images/navigationIcons/stats.svg"
import timerIcon from "@/public/images/navigationIcons/timer.svg"
import worldIcon from "@/public/images/navigationIcons/world.svg"
import torchLogo from "@/public/images/torch_logo.svg"

import { useScrollPosition } from "@/hooks/useScrollPosition"

function NavigationBar() {
  return (
    <>
      <div className="hidden sm:block">
        <NavbarDesktop />
      </div>
      <div className="block sm:hidden">
        <NavbarMobile />
      </div>
    </>
  )
}

function NavbarMobile() {
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

function NavbarDesktop() {
  return (
    <div
      className={cn(
        "sticky top-0 z-20 flex flex-col justify-center bg-transparent pt-4 max-[768px]:px-6",
        "before:absolute before:top-0 before:z-[-1] before:h-[calc(100%+35px)] before:w-full before:bg-gradient-to-b before:from-white/90 before:from-60% before:content-['']"
      )}
    >
      <div className="z-30 mx-auto w-full max-w-[650px]">
        <NavigationBarWrapper>
          <TorchLink />
          <ul className="flex h-12 space-x-1 overflow-visible rounded-[16px] px-4">
            <NavigationLink
              path={ROUTES.items.path}
              iconPath={goalsIcon}
              linkName={ROUTES.items.label}
            />
            <NavigationLink
              path={ROUTES.calendar.path}
              iconPath={calendarIcon}
              linkName={ROUTES.calendar.label}
            />
            <NavigationLink
              path={ROUTES.timer.path}
              iconPath={timerIcon}
              linkName={ROUTES.timer.label}
              highlight
            />
            <NavigationLink
              path={ROUTES.world.path}
              iconPath={worldIcon}
              linkName={ROUTES.world.label}
            />
            <NavigationLink
              path={ROUTES.stats.path}
              iconPath={statsIcon}
              linkName={ROUTES.stats.label}
            />
          </ul>
          <div
            id="accountDropdownButton"
            className="group flex items-center max-[450px]:hidden"
          >
            <Image
              src={accountIcon}
              className="h-6 w-6 hover:cursor-pointer"
              alt="Nav icon"
            />
            {/* {!showAccountDropdown && (
              <div className="relative hidden translate-y-5 group-hover:block">
                <div className="absolute -translate-x-11 rounded-lg bg-red-200 p-1 shadow-lg">
                  Account
                </div>
              </div>
            )}
            <AnimatePresence>
              {showAccountDropdown && (
                <AccountDropdown
                  showAccountDropdown={showAccountDropdown}
                  setShowAccountDropdown={setShowAccountDropdown}
                />
              )}
            </AnimatePresence> */}
          </div>
        </NavigationBarWrapper>
      </div>
      {/* <TimerToast /> */}
    </div>
  )
}

interface NavigationLinkProps {
  iconPath: string
  path: string
  linkName: string
  highlight?: boolean
  mobile?: boolean
}

function NavigationLink({
  iconPath,
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
        <TimerLink iconPath={iconPath} mobile={mobile} />
      ) : (
        <div
          className={cn(
            "peer flex flex-col rounded-lg px-3 py-2 pt-2 hover:cursor-pointer max-[600px]:pb-1",
            !mobile && "hover:bg-slate-300 max-[450px]:hidden"
          )}
        >
          <Image
            src={iconPath}
            className="mx-auto h-6 w-6 text-slate-800"
            alt="Nav icon"
          />
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

const TorchLink = () => {
  const { yScroll } = useScrollPosition()

  return (
    <motion.div
      className="relative h-12 hover:cursor-pointer"
      animate={{ scale: yScroll ? 0.8 : 1, top: yScroll ? 0 : -4 }}
    >
      <Link href={ROUTES.index.path}>
        <Image src={torchLogo} className="h-12 w-6" alt={"Logo"} />
      </Link>
    </motion.div>
  )
}

const TimerLink = ({
  iconPath,
  mobile,
}: {
  iconPath: string
  mobile?: boolean
}) => {
  const { yScroll } = useScrollPosition()
  const scale = mobile ? 0.9 : yScroll ? 0.8 : 1

  return (
    <motion.div
      className="bg-multi-color bg-multi-color-delay peer rounded-full px-2 py-2 brightness-150 transition-all hover:cursor-pointer hover:brightness-100"
      animate={{ scale }}
    >
      <Image
        src={iconPath}
        className="mx-auto h-8 w-8 text-slate-800"
        alt="Nav icon"
      />
    </motion.div>
  )
}

// function AccountDropdown({
//   showAccountDropdown,
//   setShowAccountDropdown,
// }: {
//   showAccountDropdown: boolean
//   setShowAccountDropdown: React.Dispatch<React.SetStateAction<boolean>>
// }) {
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const { isSignedIn } = useUser()
//   const { toast } = useToast()

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       const userIconElement = document.getElementById("userIcon")
//       if (!userIconElement?.contains(e.target as Node))
//         showAccountDropdown && setShowAccountDropdown(false)
//     }

//     document.addEventListener("mousedown", handler)
//     return () => document.removeEventListener("mousedown", handler)
//   }, [])

//   const showSignOutToast = async () => {
//     toast({ description: "You signed-out successfully." })
//   }

//   return (
//     <motion.div
//       className="relative z-30 translate-y-5 group-hover:block"
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 18 }}
//       exit={{ opacity: 0, y: 24 }}
//       transition={{ type: "tween" }}
//     >
//       <div
//         className={clsx(
//           "absolute -translate-y-0.5",
//           isSignedIn ? "-translate-x-40" : "-translate-x-20"
//         )}
//       >
//         <div
//           id="dropdownInformation"
//           ref={dropdownRef}
//           className={clsx(
//             "z-10 divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700",
//             isSignedIn ? "w-44" : "w-24 text-center"
//           )}
//         >
//           {isSignedIn ? (
//             <>
//               <Link to={ROUTES.account.path}>
//                 <div className="rounded-t-lg px-4 py-3 text-sm text-gray-900 hover:cursor-pointer hover:bg-gray-100 dark:text-white">
//                   <div>Bonnie Green</div>
//                   <div className="truncate font-medium">name@email.com</div>
//                   <div className="mx-2 mt-2 truncate rounded-lg bg-gray-300 py-1 text-center text-xs font-medium text-gray-700">
//                     Free account
//                   </div>
//                 </div>
//               </Link>
//               <ul
//                 className="text-sm text-gray-700 dark:text-gray-200"
//                 aria-labelledby="accountDropdownButton"
//               >
//                 <li>
//                   <SignOutButton signOutCallback={showSignOutToast}>
//                     <button className="block w-full px-4 py-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                       Sign out
//                     </button>
//                   </SignOutButton>
//                 </li>
//               </ul>
//             </>
//           ) : (
//             <ul
//               className="text-gray-700 dark:text-gray-200"
//               aria-labelledby="accountDropdownButton"
//             >
//               <li className="border-b border-gray-200">
//                 <Link
//                   to={ROUTES.signIn.path}
//                   className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   Sign In
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to={ROUTES.signUp.path}
//                   className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
//                 >
//                   Sign Up
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   )
// }

export default NavigationBar

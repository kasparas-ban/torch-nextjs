import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import {
  GeneralItem,
  Goal,
  ItemOptionType,
  ItemType,
  Task,
} from "@/types/itemTypes"
import { ROUTES } from "@/config/routes"
import { cn, toPercent } from "@/lib/utils"
import DotsIcon from "@/public/icons/dots.svg"
import TimerIcon from "@/public/icons/navigationIcons/timer.svg"

import useEditItem from "../itemModal/hooks/useEditItem"
import useTimerForm from "../timer/hooks/useTimerForm"
import {
  getStripBgColor,
  getStripBorderColor,
  getStripDotsColor,
  getStripPercentageColor,
  getStripTextColor,
} from "./itemStripColors"
import ItemProgress from "./ProgressBar"

function ItemStrip<T extends GeneralItem>({
  item,
  itemType,
  toggleSublist,
  itemSublist,
  showEditPanel,
  toggleEditClick,
}: {
  item: T
  itemType: ItemType
  toggleSublist?: () => void
  itemSublist?: GeneralItem[]
  showEditPanel: boolean
  toggleEditClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {
  const { editItem, setEditItem } = useEditItem()
  const router = useRouter()
  const { setFocusOn, setFocusType } = useTimerForm()

  const containsSublist = !!itemSublist?.length
  const isActive = item.status === "ACTIVE"

  const handleTimerClick = () => {
    const itemOption: ItemOptionType = {
      value: item.itemID,
      label: item.title,
      type: item.type,
      progress: item.progress,
      timeSpent: item.timeSpent,
      duration: (editItem as Task).duration ?? undefined,
      containsTasks: !!(editItem as Goal).tasks?.length,
    }

    setFocusType(
      itemType === "TASK"
        ? "TASKS"
        : itemType === "GOAL"
          ? "GOALS"
          : itemType === "DREAM"
            ? "DREAMS"
            : "ALL"
    )
    setFocusOn(itemOption)
    router.push(ROUTES.timer.path)
  }

  const handleStripClick = () => {
    const itemInEdit =
      item.itemID === editItem?.itemID && item.type === editItem?.type
    if (itemInEdit) {
      setEditItem(undefined)
    } else if (!editItem && toggleSublist) {
      toggleSublist()
    }
  }

  const stripBgColor = getStripBgColor(!!editItem, showEditPanel, item.status)
  const stripTextColor = getStripTextColor(isActive)
  const stripBorderColor = getStripBorderColor(isActive)
  const stripDotsColor = getStripDotsColor(
    !!editItem,
    showEditPanel,
    item.status
  )
  const stripPercentageColor = getStripPercentageColor(
    !!editItem,
    showEditPanel,
    item.status
  )

  return (
    <motion.div
      layout
      className={cn("relative flex w-full min-w-0", containsSublist && "mb-3")}
      style={{ zIndex: itemSublist?.length }}
      whileTap={{ scale: itemSublist ? (showEditPanel ? 1 : 0.98) : 1 }}
    >
      <motion.div
        layout
        onClick={handleStripClick}
        className={cn(
          "relative flex w-full cursor-pointer items-center overflow-hidden rounded-2xl border pl-6 pr-1 md:rounded-3xl",
          stripBgColor,
          stripBorderColor
        )}
      >
        <ItemProgress
          progress={item.progress || 0}
          showEditPanel={showEditPanel}
          isActive={isActive}
        />
        <motion.div
          className={cn("z-10 select-none truncate py-3", stripTextColor)}
        >
          {item.title}
        </motion.div>
        <div className="z-0 ml-auto flex shrink-0 items-center justify-center pl-2">
          <motion.div
            layout
            className={cn(
              "relative top-[-2px] shrink-0 text-2xl font-bold",
              stripPercentageColor
            )}
          >
            {item.status === "COMPLETED" ? "100%" : toPercent(item.progress)}
          </motion.div>
        </div>
        <div
          className={cn(
            "group z-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            stripDotsColor
          )}
          onClick={toggleEditClick}
        >
          <motion.div
            layout
            className={cn(
              "group-hover:text-gray-800",
              isActive ? "text-gray-600" : "text-gray-400",
              stripDotsColor
            )}
          >
            <DotsIcon className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showEditPanel && item.status === "ACTIVE" && (
          <motion.div
            className="my-auto ml-3 aspect-square w-12 cursor-pointer rounded-full bg-red-400"
            whileHover={{ scale: 1.1 }}
            onClick={handleTimerClick}
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{ width: 48, opacity: 1, marginLeft: 12 }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
          >
            <TimerIcon className="m-auto flex h-full w-6" alt="Timer icon" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function RecurringItemStrip({
  item,
  showEditPanel,
  toggleEditClick,
}: {
  item: Task
  showEditPanel: boolean
  toggleEditClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {
  const { editItem, setEditItem } = useEditItem()

  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  const isActive = item.status === "ACTIVE"
  const itemProgress = item.recurring
    ? (item.recurring?.progress || 0) / item.recurring?.times
    : 0

  const handleStripClick = () => {
    const itemInEdit =
      item.itemID === editItem?.itemID && item.type === editItem?.type
    if (itemInEdit) setEditItem(undefined)
  }

  const stripBgColor = getStripBgColor(
    !!editItem,
    showEditPanel,
    item.status,
    true
  )
  const stripTextColor = getStripTextColor(isActive)
  const stripBorderColor = getStripBorderColor(isActive)
  const stripDotsColor = getStripDotsColor(
    !!editItem,
    showEditPanel,
    item.status,
    true
  )
  const stripPercentageColor = getStripPercentageColor(
    !!editItem,
    showEditPanel,
    item.status,
    true
  )

  return (
    <motion.div
      layout
      className="flex w-full min-w-0"
      onClick={handleStripClick}
    >
      <motion.div
        layout
        className={cn(
          "relative flex w-full cursor-pointer items-center overflow-hidden rounded-2xl border pl-6 pr-1 md:rounded-3xl",
          stripBgColor,
          stripBorderColor
        )}
      >
        {item.status !== "COMPLETED" && (
          <ItemProgress
            progress={itemProgress}
            showEditPanel={showEditPanel}
            isActive={isActive}
            isRecurring
          />
        )}
        <motion.div className="z-10 flex min-w-0 flex-col py-1">
          <div className={cn("select-none truncate", stripTextColor)}>
            {item.title}
          </div>
          <div
            className={cn(
              "truncate text-xs text-gray-700",
              isActive ? "text-gray-700" : "text-gray-400"
            )}
          >
            {isActive ? "Resets tomorrow" : "Repeats every week"}
          </div>
        </motion.div>
        <div className="z-0 ml-auto flex shrink-0 items-center justify-center pl-2">
          <motion.div
            layout
            className={cn(
              "relative top-[-2px] shrink-0 text-2xl font-bold tracking-wider sm:tracking-widest",
              stripPercentageColor
            )}
          >
            {item.recurring?.progress || 0}/{item.recurring?.times}
          </motion.div>
        </div>
        <div
          className={cn(
            "group z-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            stripDotsColor
          )}
          onClick={toggleEditClick}
        >
          <motion.div
            layout
            className="text-gray-600 group-hover:text-gray-800"
          >
            <DotsIcon className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>
      {isActive && (
        <AnimatePresence>
          {showEditPanel && (
            <motion.div
              key="add_recurring"
              className="my-auto flex aspect-square cursor-pointer items-center justify-center rounded-full bg-amber-400 text-xl font-bold text-gray-700"
              whileHover={{ scale: 1.1 }}
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{
                width: isDesktop ? 48 : 64,
                opacity: 1,
                marginLeft: isDesktop ? 12 : 6,
              }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            >
              -1
            </motion.div>
          )}
          {showEditPanel && (
            <motion.div
              key="subtract_recurring"
              className="my-auto flex aspect-square cursor-pointer items-center justify-center rounded-full bg-amber-400 text-xl font-bold text-gray-700"
              whileHover={{ scale: 1.1 }}
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{
                width: isDesktop ? 48 : 64,
                opacity: 1,
                marginLeft: isDesktop ? 12 : 6,
              }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            >
              +1
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export { ItemStrip, RecurringItemStrip }

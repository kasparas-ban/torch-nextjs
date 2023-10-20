import React, { Fragment } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RotateCw } from "lucide-react"
import { useMediaQuery } from "react-responsive"

import { Goal, Task } from "@/types/itemTypes"
import { cn } from "@/lib/utils"
import useEditItem from "@/hooks/useEditItem"

import ItemEditPanel from "./ItemEditPanel"
import { ItemStrip, RecurringItemStrip } from "./ItemStrip"

export default function ItemSublist<T extends Task | Goal>({
  subitems,
  subitemType,
  showSublist,
  isParentEditActive,
}: {
  subitems: T[]
  subitemType: "TASK" | "GOAL"
  showSublist: boolean
  isParentEditActive: boolean
}) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  const { editItem, setEditItem } = useEditItem()

  const showEditPanel = (subitem: T) =>
    subitem.type === editItem?.type && subitem.itemID === editItem?.itemID

  const toggleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    subitem: T
  ) => {
    e.stopPropagation()
    setEditItem(showEditPanel(subitem) ? undefined : subitem)
  }
  const getSubitemKey = (subitem: Task | Goal) =>
    `${
      (subitem as Task).goal
        ? (subitem as Task).goal?.itemID
        : (subitem as Goal).dream?.itemID
    }_${subitem.itemID}`

  const scaledWidth = isDesktop ? "90%" : "82%"

  const isRecurring = (item: T) => !!(item as Task).recurring

  return (
    <motion.div layout>
      <motion.ul
        layout
        className="space-y-3"
        animate={{
          height: showSublist ? "auto" : 0,
        }}
      >
        {subitems.map((subitem, idx) => (
          <Fragment key={getSubitemKey(subitem)}>
            <motion.li
              layout
              className="relative flex"
              animate={{
                scale: showSublist ? 1 : 0.98 - 0.03 * idx,
                width:
                  !showSublist && isParentEditActive ? scaledWidth : "100%",
                y: showSublist ? 0 : -(56 + 50 * idx + 8 * idx),
                zIndex: showSublist ? 0 : subitems.length - 1 - idx,
                opacity: showSublist ? 1 : idx > 1 ? 0 : 1,
              }}
            >
              <BulletPoint
                idx={idx}
                showSublist={showSublist}
                showEditPanel={showEditPanel}
                subitems={subitems}
              />
              {isRecurring(subitem) ? (
                <RecurringItemStrip
                  item={subitem as Task}
                  showEditPanel={showEditPanel(subitem)}
                  toggleEditClick={e => toggleEditClick(e, subitem)}
                />
              ) : (
                <ItemStrip
                  item={subitem}
                  itemType={subitemType}
                  showEditPanel={showEditPanel(subitem)}
                  toggleEditClick={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => toggleEditClick(e, subitem)}
                />
              )}
            </motion.li>
            <AnimatePresence initial={false}>
              {showEditPanel(subitem) && (
                <ItemEditPanel<T>
                  key={`task_${subitem.itemID}_edit_panel`}
                  item={subitem}
                  showBulletLine={idx !== subitems.length - 1}
                />
              )}
            </AnimatePresence>
          </Fragment>
        ))}
      </motion.ul>
    </motion.div>
  )
}

function BulletPoint<T extends Task | Goal>({
  idx,
  showSublist,
  subitems,
}: {
  idx: number
  showSublist: boolean
  showEditPanel: (subitem: T) => boolean
  subitems: T[]
}) {
  const { editItem } = useEditItem()
  const currentItem = subitems[idx]
  const isRecurring = (currentItem as Task).recurring

  const editItemActive =
    editItem?.type === currentItem.type &&
    editItem?.itemID === currentItem.itemID

  const bulletColor = editItem
    ? editItemActive && isRecurring
      ? "bg-amber-200"
      : "bg-gray-300"
    : isRecurring
    ? "bg-amber-200"
    : "bg-gray-300"

  return (
    <motion.div
      className="relative mr-3 flex"
      animate={{
        width: showSublist ? "auto" : 0,
        opacity: showSublist ? 1 : 0,
      }}
      transition={{ duration: 0.1 }}
    >
      <div
        className={cn(
          "relative z-10 my-auto aspect-square w-4 rounded-full",
          bulletColor
        )}
      ></div>
      {isRecurring && (
        <div className="absolute left-[-4px] top-[13px] z-[15] text-gray-500">
          <RotateCw />
        </div>
      )}
      {/* Upper line */}
      {idx !== 0 && (
        <motion.div className="h0 absolute left-[6px] h-1/2 w-1 bg-gray-300" />
      )}
      {/* Lower line */}
      {idx !== subitems.length - 1 && (
        <motion.div className="h0 absolute left-[6px] h-3/4 w-1 translate-y-3/4 bg-gray-300" />
      )}
    </motion.div>
  )
}

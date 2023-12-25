import React, { Fragment } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RotateCw } from "lucide-react"
import { useMediaQuery } from "react-responsive"
import { GeneralItem, Task } from "@/types/itemTypes"
import { cn } from "@/lib/utils"
import { useItemsList } from "@/api/hooks/items/useItemsList"
import { findItemByID } from "@/api/utils/helpers"

import useEditItem from "../itemModal/hooks/useEditItem"
import { ArchivedItemEditPanel, ItemEditPanel } from "./ItemEditPanel"
import { ItemStrip, RecurringItemStrip } from "./ItemStrip"

export default function ItemSublist({
  parentID,
  subitems,
  subitemType,
  showSublist,
  isParentEditActive,
}: {
  parentID: string
  subitems: GeneralItem[]
  subitemType: "TASK" | "GOAL"
  showSublist: boolean
  isParentEditActive: boolean
}) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  const { data } = useItemsList()
  const { editItem, setEditItem } = useEditItem()

  const showEditPanel = (subitem: GeneralItem) =>
    subitem.type === editItem?.type && subitem.itemID === editItem?.itemID

  const toggleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    subitem: GeneralItem
  ) => {
    e.stopPropagation()
    const formattedItem = findItemByID(subitem.itemID, data)
    setEditItem(showEditPanel(subitem) ? undefined : formattedItem)
  }

  const scaledWidth = isDesktop ? "90%" : "82%"

  const isRecurring = (item: GeneralItem) => !!item.recurring

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
          <Fragment key={`${parentID}_${subitem.itemID}`}>
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
                <EditPanel idx={idx} subitem={subitem} subitems={subitems} />
              )}
            </AnimatePresence>
          </Fragment>
        ))}
      </motion.ul>
    </motion.div>
  )
}

function EditPanel({
  idx,
  subitem,
  subitems,
}: {
  idx: number
  subitem: GeneralItem
  subitems: GeneralItem[]
}) {
  const Panel =
    subitem.status === "ARCHIVED" ? ArchivedItemEditPanel : ItemEditPanel

  return (
    <Panel
      key={`task_${subitem.itemID}_edit_panel`}
      item={subitem}
      showBulletLine={idx !== subitems.length - 1}
    />
  )
}

function BulletPoint({
  idx,
  showSublist,
  subitems,
}: {
  idx: number
  showSublist: boolean
  showEditPanel: (subitem: GeneralItem) => boolean
  subitems: GeneralItem[]
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

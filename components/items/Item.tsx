"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion"
import { Dream, FormattedItem, Goal, ItemType, Task } from "@/types/itemTypes"
import useItemListConfig from "@/hooks/useItemListConfig"
import {
  ArchivedItemEditPanel,
  ItemEditPanel,
} from "@/components/items/ItemEditPanel"
import { ItemStrip, RecurringItemStrip } from "@/components/items/ItemStrip"
import ItemSublist from "@/components/items/ItemSublist"

import useEditItem from "../itemModal/hooks/useEditItem"

export default function Item<T extends FormattedItem>({
  idx,
  itemType,
  item,
}: {
  idx: number
  item: T
  itemType: ItemType
}) {
  const { editItem, setEditItem } = useEditItem()
  const { isItemCollapsed, saveCollapseState } = useItemListConfig()
  const [showSublist, setShowSublist] = useState(!isItemCollapsed(item))

  const [item_scope, animate] = useAnimate()

  useEffect(() => {
    if (!item_scope.current) return
    animate(
      item_scope.current,
      {
        y: [-40, 0],
        opacity: [0, 1],
      },
      {
        duration: 1,
        type: "spring",
        bounce: 0.4,
        delay: 0.05 * idx,
      }
    )
    showSublist &&
      containsSublist &&
      animate(
        "li",
        {
          y: [-40, 0],
          opacity: [0, 1],
        },
        {
          duration: 1,
          type: "spring",
          bounce: 0.4,
          delay: stagger(0.025),
        }
      )
  }, [])

  const itemSublist =
    itemType === "GOAL"
      ? (item as Goal).tasks
      : item.type === "DREAM"
        ? (item as Dream).goals
        : undefined
  const containsSublist = !!itemSublist?.length

  const toggleSublist = () => {
    const newState = !showSublist
    setShowSublist(newState)
    saveCollapseState({ itemId: item.itemID, itemType: item.type }, !newState)
  }

  const showEditPanel =
    editItem?.type === item.type && editItem?.itemID === item.itemID

  const toggleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setEditItem(showEditPanel ? undefined : item)
  }

  const isRecurring = itemType === "TASK" && !!(item as Task).recurring

  const EditPanel =
    item.status === "ARCHIVED" ? ArchivedItemEditPanel : ItemEditPanel

  return (
    <motion.li
      layout
      ref={item_scope}
      id={`li_${item.itemID}${showSublist ? "" : "_COLLAPSED"}`}
    >
      {isRecurring ? (
        <RecurringItemStrip
          item={item as Task}
          showEditPanel={showEditPanel}
          toggleEditClick={toggleEditClick}
        />
      ) : (
        <ItemStrip
          item={item}
          itemType={itemType}
          toggleSublist={toggleSublist}
          itemSublist={itemSublist}
          showEditPanel={showEditPanel}
          toggleEditClick={toggleEditClick}
        />
      )}
      {showSublist ? (
        <>
          <AnimatePresence initial={false}>
            {showEditPanel && (
              <EditPanel<T>
                key={`${itemType}_${item.itemID}_edit_panel`}
                item={item}
                sublistVisible={showSublist && showEditPanel}
                showAddTask={itemType === "GOAL"}
              />
            )}
          </AnimatePresence>
          {containsSublist && (
            <ItemSublist
              parentID={item.itemID}
              key={`${itemType}_${item.itemID}_sublist`}
              subitems={itemSublist || []}
              subitemType={itemType === "DREAM" ? "GOAL" : "TASK"}
              showSublist={showSublist}
              isParentEditActive={showEditPanel}
              isParentArchived={item.status === "ARCHIVED"}
            />
          )}
        </>
      ) : (
        <>
          {containsSublist && (
            <ItemSublist
              parentID={item.itemID}
              key={`${itemType}_${item.itemID}_sublist`}
              subitems={itemSublist || []}
              subitemType={itemType === "DREAM" ? "GOAL" : "TASK"}
              showSublist={showSublist}
              isParentEditActive={showEditPanel}
              isParentArchived={item.status === "ARCHIVED"}
            />
          )}
          <AnimatePresence initial={false}>
            {showEditPanel && (
              <EditPanel<T>
                key={`${itemType}_${item.itemID}_edit_panel`}
                item={item}
                sublistVisible={showSublist && showEditPanel}
                showAddTask={itemType === "GOAL"}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </motion.li>
  )
}

"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion"

import { Dream, Goal, ItemType, Task } from "@/types/itemTypes"
import useEditItem from "@/hooks/useEditItem"
import useItemListConfig from "@/hooks/useItemListConfig"
import ItemEditPanel from "@/components/items/ItemEditPanel"
import { ItemStrip, RecurringItemStrip } from "@/components/items/ItemStrip"
import ItemSublist from "@/components/items/ItemSublist"

export default function Item<T extends Task | Goal | Dream>({
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

  const recurringInfo = itemType === "TASK" && !!(item as Task).recurring

  return (
    <motion.li
      layout
      ref={item_scope}
      id={`li_${item.itemID}${showSublist ? "" : "_COLLAPSED"}`}
    >
      {recurringInfo ? (
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
              <ItemEditPanel<T>
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
            />
          )}
          <AnimatePresence initial={false}>
            {showEditPanel && (
              <ItemEditPanel<T>
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

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Dream, Goal, GroupedItems, ItemType, Task } from "@/types/itemTypes"
import useEditItem from "@/components/itemModal/hooks/useEditItem"
import useItemModal from "@/components/itemModal/hooks/useItemModal"
import Item from "@/components/items/Item"
import PlusIcon from "@/public/icons/plus.svg"

export default function ItemsList<T extends Task | Goal | Dream>({
  groupedItems,
  itemType,
}: {
  groupedItems?: GroupedItems<T>
  itemType: ItemType
}) {
  const { setEditItem } = useEditItem()
  const { openTaskModal, openGoalModal, openDreamModal } = useItemModal()

  const handleAddItem = () =>
    itemType === "TASK"
      ? openTaskModal()
      : itemType === "GOAL"
        ? openGoalModal()
        : openDreamModal()

  let totalIndex = 0

  const isListEmpty = Object.values(groupedItems || {}).reduce(
    (prev, group) => prev && !group.items.length,
    true
  )

  const sortedItems = groupedItems
    ? Object.keys(groupedItems).sort((a, b) => {
        if (a === "other") return 1
        if (b === "other") return -1
        return 0
      })
    : undefined

  useEffect(() => () => setEditItem(undefined), [])

  return (
    <>
      {groupedItems && sortedItems && !isListEmpty ? (
        <motion.ul key={`list_${itemType}`} className="space-y-3 pb-32">
          {sortedItems.map((groupKey, groupIdx) => {
            const parentLabel = groupedItems[groupKey].parentLabel
            const items = groupedItems[groupKey].items

            if (groupIdx - 1 >= 0) {
              const prevKey = Object.keys(groupedItems)[groupIdx - 1]
              totalIndex += groupedItems[prevKey].items.length
            }

            return (
              <motion.li key={`group_${groupKey}`}>
                {parentLabel && (
                  <motion.div
                    layout
                    className="mb-2 ml-3 font-medium text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {parentLabel}
                  </motion.div>
                )}
                {items?.length && (
                  <motion.ul className="space-y-3">
                    {items.map((item, itemIdx) => (
                      <Item<T>
                        idx={totalIndex + itemIdx}
                        key={`${groupKey}_${itemType}_${item.itemID}`}
                        item={item}
                        itemType={itemType}
                      />
                    ))}
                  </motion.ul>
                )}
              </motion.li>
            )
          })}
        </motion.ul>
      ) : (
        <motion.div layout className="mt-6 text-center">
          <div>No {itemType.toLowerCase()}s have been added.</div>
          <button className="mt-8 font-medium" onClick={handleAddItem}>
            <motion.div className="flex" whileHover={{ scale: 1.05 }}>
              <PlusIcon alt="Plus" className="h-6" />
              Add new{" "}
              {itemType === "TASK"
                ? "task"
                : itemType === "GOAL"
                  ? "goal"
                  : "dream"}
            </motion.div>
          </button>
        </motion.div>
      )}
    </>
  )
}

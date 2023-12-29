"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { AnimatePresence } from "framer-motion"
import { Dream, Goal, ItemStatus, Task } from "@/types/itemTypes"
import useItemListConfig from "@/hooks/useItemListConfig"
import { useItemsList } from "@/api/hooks/items/useItemsList"
import { filterItemsByStatus, groupItemsByParent } from "@/api/utils/helpers"
import ItemModal from "@/components/itemModal/ItemModal"
import ItemListSkeleton from "@/components/items/ItemListSkeleton"

import ItemsList from "./ItemsList"

function ItemsListWrapper() {
  const { isSignedIn } = useUser()
  const { itemType, showArchivedItems, showCompletedItems } =
    useItemListConfig()
  const { data, error, isLoading } = useItemsList()

  // const { toast } = useToast()

  const items =
    itemType === "TASK"
      ? data?.tasks
      : itemType === "GOAL"
        ? data?.goals
        : data?.dreams

  const filterBy = [
    "ACTIVE" as ItemStatus,
    ...(showArchivedItems ? ["ARCHIVED" as ItemStatus] : []),
    ...(showCompletedItems ? ["COMPLETED" as ItemStatus] : []),
  ]
  const itemsWithStatus = filterItemsByStatus(filterBy, items)

  const groupedItems = itemsWithStatus
    ? groupItemsByParent(itemsWithStatus, itemType)
    : {}

  // useEffect(() => {
  //   if (isSignedIn && !isLoading && error)
  //     toast({ title: error.data?.title, description: error.data?.description })
  // }, [error])

  return (
    <>
      <AnimatePresence mode="sync">
        {!data && isLoading ? (
          <ItemListSkeleton />
        ) : (
          <ItemsList<Task | Goal | Dream>
            groupedItems={groupedItems}
            itemType={itemType}
          />
        )}
      </AnimatePresence>
      <ItemModal />
    </>
  )
}

export default ItemsListWrapper

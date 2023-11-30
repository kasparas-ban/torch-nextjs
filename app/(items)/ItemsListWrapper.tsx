"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { AnimatePresence } from "framer-motion"
import { Dream, Goal, Task } from "@/types/itemTypes"
import useItemListConfig from "@/hooks/useItemListConfig"
import { useItemsList } from "@/api/hooks/items.ts/useItemsList"
import { groupItemsByParent } from "@/api/utils/helpers"
import ItemModal from "@/components/itemModal/ItemModal"
import ItemListSkeleton from "@/components/items/ItemListSkeleton"

import ItemsList from "./ItemsList"

function ItemsListWrapper() {
  const { isSignedIn } = useUser()
  const { itemType } = useItemListConfig()
  const { data, error, isLoading } = useItemsList()

  // const { toast } = useToast()

  const items =
    itemType === "TASK"
      ? data?.tasks
      : itemType === "GOAL"
        ? data?.goals
        : data?.dreams

  const groupedItems = items ? groupItemsByParent(items, itemType) : {}

  // useEffect(() => {
  //   if (isSignedIn && !isLoading && error)
  //     toast({ title: error.data?.title, description: error.data?.description })
  // }, [error])

  return (
    <>
      <AnimatePresence mode="sync">
        {isLoading ? (
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

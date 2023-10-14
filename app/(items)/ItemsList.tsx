"use client"

import { useEffect } from "react"
import { groupItemsByParent } from "@/api/helpers"
import { useItemsList } from "@/api/hooks/useItemsList"
import { useUser } from "@clerk/nextjs"
import { AnimatePresence } from "framer-motion"

import { GeneralItem } from "@/types/itemTypes"
import useItemListConfig from "@/hooks/useItemListConfig"

import { ItemsHeader } from "./ItemsHeader"

function ItemsList() {
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
    <div className="flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-full max-w-[650px]">
        {/* <ItemsHeader /> */}
        {/* <AnimatePresence mode="sync">
          {isLoading ? (
            <ItemListSkeleton />
          ) : (
            <ItemsList<GeneralItem>
              groupedItems={groupedItems}
              itemType={itemType}
            />
          )}
        </AnimatePresence> */}
      </div>
    </div>
  )
}

export default ItemsList

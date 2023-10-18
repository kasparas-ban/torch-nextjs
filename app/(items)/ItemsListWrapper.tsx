"use client"

import { useEffect } from "react"
import { groupItemsByParent } from "@/api/helpers"
import { useItemsList } from "@/api/hooks/useItemsList"
import { useUser } from "@clerk/clerk-react"
import { AnimatePresence } from "framer-motion"

import { GeneralItem } from "@/types/itemTypes"
import useItemListConfig from "@/hooks/useItemListConfig"

import RootClerkProvider from "../ClerkProvider"
import ItemListSkeleton from "./goals/ItemListSkeleton"
import ItemsList from "./ItemsList"

function ItemsListWrapper() {
  const { isSignedIn } = useUser()
  const { itemType } = useItemListConfig()
  const { data, error, isLoading } = useItemsList()

  console.log("WRAPPER", data)

  // const { toast } = useToast()

  // const items =
  //   itemType === "TASK"
  //     ? data?.tasks
  //     : itemType === "GOAL"
  //     ? data?.goals
  //     : data?.dreams

  // const groupedItems = items ? groupItemsByParent(items, itemType) : {}

  // console.log({ data })

  // useEffect(() => {
  //   if (isSignedIn && !isLoading && error)
  //     toast({ title: error.data?.title, description: error.data?.description })
  // }, [error])

  return (
    <>
      TEST
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
    </>
  )
}

export default ItemsListWrapper

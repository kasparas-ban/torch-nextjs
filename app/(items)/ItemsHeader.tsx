"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { capitalizeString } from "@/lib/utils"
import useItemListConfig from "@/hooks/useItemListConfig"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddGeneralItem from "@/components/itemModal/addGeneralItem/AddGeneralItem"
import useItemModal from "@/components/itemModal/hooks/useItemModal"
import ItemModal from "@/components/itemModal/ItemModal"
import ArrowIcon from "@/public/icons/arrowDown.svg"
import PlusIcon from "@/public/icons/plus.svg"

export function ItemsHeader() {
  const { openGeneralModal } = useItemModal()

  return (
    <>
      <div className="mb-6 flex">
        <ItemsTypeDropdown />
        <div className="relative bottom-1 ml-auto flex items-end space-x-4">
          <motion.button
            layout
            whileHover={{ scale: 1.2 }}
            onClick={openGeneralModal}
          >
            <PlusIcon className="h-6 hover:cursor-pointer" />
          </motion.button>
        </div>
      </div>
      {/* <div className="mb-8 mt-2">
        <StorageInfo />
      </div> */}
    </>
  )
}

function ItemsTypeDropdown() {
  const { itemType, saveItemType } = useItemListConfig()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group">
        <div className="flex">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.h1
              layout
              key={itemType}
              className="items-center text-clip text-5xl font-bold text-gray-400"
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
            >
              {capitalizeString(itemType)}
            </motion.h1>
          </AnimatePresence>
          <ArrowIcon className="relative top-5 ml-1 h-6 w-6 stroke-[0.5] text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl">
        <DropdownMenuItem
          className="cursor-pointer rounded-md text-xl font-bold text-gray-600 hover:bg-gray-200"
          onClick={() => saveItemType("TASK")}
        >
          Tasks
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer rounded-md text-xl font-bold text-gray-600 hover:bg-gray-200"
          onClick={() => saveItemType("GOAL")}
        >
          Goals
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer rounded-md text-xl font-bold text-gray-600 hover:bg-gray-200"
          onClick={() => saveItemType("DREAM")}
        >
          Dreams
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

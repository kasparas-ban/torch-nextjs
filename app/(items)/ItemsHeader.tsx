"use client"

import ArrowIcon from "@/public/images/arrowDown.svg"
import PlusIcon from "@/public/images/plus.svg"
import { capitalizeString } from "@/utils/utils"
import { AnimatePresence, motion } from "framer-motion"

import useItemListConfig from "@/hooks/useItemListConfig"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ItemsHeader() {
  return (
    <>
      <div className="flex">
        <ItemsTypeDropdown />
        <div className="relative bottom-1 ml-auto flex items-end space-x-4">
          <motion.div layout whileHover={{ scale: 1.2 }}>
            <PlusIcon className="h-6 hover:cursor-pointer" />
          </motion.div>
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
      <DropdownMenuTrigger className="group focus-visible:outline-none">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            layout
            key={itemType}
            className="flex flex-row top-2 cursor-pointer"
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
          >
            <h1 className="flex items-center text-5xl font-bold text-gray-400">
              {capitalizeString(itemType)}
            </h1>
            <ArrowIcon className="relative top-5 left-1 h-6 w-6 text-gray-400 stroke-1 transition-transform group-data-[state=open]:rotate-180" />
          </motion.div>
        </AnimatePresence>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl">
        <DropdownMenuItem
          className="text-xl rounded-md text-gray-600 font-bold hover:bg-gray-200 cursor-pointer"
          onClick={() => saveItemType("TASK")}
        >
          Tasks
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xl rounded-md text-gray-600 font-bold hover:bg-gray-200 cursor-pointer"
          onClick={() => saveItemType("GOAL")}
        >
          Goals
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xl rounded-md text-gray-600 font-bold hover:bg-gray-200 cursor-pointer"
          onClick={() => saveItemType("DREAM")}
        >
          Dreams
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ItemType } from "@/types/itemTypes"
import { capitalizeString, cn } from "@/lib/utils"
import useItemListConfig from "@/hooks/useItemListConfig"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toggle } from "@/components/ui/toggle"
import useEditItem from "@/components/itemModal/hooks/useEditItem"
import useItemModal from "@/components/itemModal/hooks/useItemModal"
import ArrowIcon from "@/public/icons/arrowDown.svg"
import FilterIcon from "@/public/icons/filter.svg"
import PlusIcon from "@/public/icons/plus.svg"

export function ItemsHeader() {
  const { setEditItem } = useEditItem()
  const { openGeneralModal } = useItemModal()

  const { showAllItems } = useItemListConfig()
  const [showFilters, setShowFilters] = useState(showAllItems)

  const handleAddNewItem = () => {
    setEditItem(undefined)
    openGeneralModal()
  }

  return (
    <>
      <div className="mb-6 flex">
        <ItemsTypeDropdown />
        <div className="relative bottom-1 ml-auto flex items-end space-x-3">
          <ListFilterButton
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
          <motion.button
            layout
            whileHover={{ scale: 1.2 }}
            onClick={handleAddNewItem}
          >
            <PlusIcon className="h-6 hover:cursor-pointer" />
          </motion.button>
        </div>
      </div>
      <ListFilterSection showFilters={showFilters} />
      {/* <div className="mb-8 mt-2">
        <StorageInfo />
      </div> */}
    </>
  )
}

function ListFilterSection({ showFilters }: { showFilters: boolean }) {
  return (
    <AnimatePresence mode="sync">
      {showFilters && (
        <motion.section
          layout
          initial={{ height: 0, opacity: 0, y: -16 }}
          animate={{ height: 40, opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -16 }}
        >
          <span className="mr-2 text-sm font-medium text-gray-500">
            Filters:
          </span>
          <ItemStatusSelect />
        </motion.section>
      )}
    </AnimatePresence>
  )
}

function ListFilterButton({
  showFilters,
  setShowFilters,
}: {
  showFilters: boolean
  setShowFilters: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <motion.button
      layout
      className="relative"
      whileHover={{ scale: 1.2 }}
      onClick={() => setShowFilters(prev => !prev)}
    >
      <motion.div
        className="absolute left-[-4px] top-[-5px] flex h-8 w-8 items-center justify-center rounded-full bg-red-300 shadow-md"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showFilters ? 1 : 0, scale: showFilters ? 1 : 0.5 }}
      />
      <FilterIcon
        className={cn(
          "relative h-6 hover:cursor-pointer",
          showFilters && "text-gray-800"
        )}
      />
    </motion.button>
  )
}

function ItemStatusSelect() {
  const { showAllItems, setShowAllItems } = useItemListConfig()
  const { setEditItem } = useEditItem()

  const handleToggle = (pressed: boolean) => {
    setEditItem(undefined)
    setShowAllItems(pressed)
  }

  return (
    <Toggle
      pressed={showAllItems}
      onPressedChange={handleToggle}
      className="h-7 rounded-2xl bg-gray-200 py-1 text-xs text-gray-700 data-[state=on]:bg-rose-400 data-[state=on]:text-white data-[state=on]:hover:bg-rose-300 sm:bottom-0.5 sm:text-sm"
    >
      Show archived
    </Toggle>
  )
}

function ItemsTypeDropdown() {
  const { setEditItem } = useEditItem()
  const { itemType, saveItemType } = useItemListConfig()

  const setItemType = (type: ItemType) => {
    saveItemType(type)
    setEditItem(undefined)
  }

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
          onClick={() => setItemType("TASK")}
        >
          Tasks
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer rounded-md text-xl font-bold text-gray-600 hover:bg-gray-200"
          onClick={() => setItemType("GOAL")}
        >
          Goals
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer rounded-md text-xl font-bold text-gray-600 hover:bg-gray-200"
          onClick={() => setItemType("DREAM")}
        >
          Dreams
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

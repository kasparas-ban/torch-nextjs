import { create } from "zustand"
import { persist } from "zustand/middleware"
import { GeneralItem, ItemType } from "@/types/itemTypes"

type CollapsedItemState = {
  itemId: number
  itemType: ItemType
}

interface ItemListConfigState {
  // Collaped items
  collapsedItems: CollapsedItemState[]
  isItemCollapsed: (item: GeneralItem) => boolean
  saveCollapseState: (item: CollapsedItemState, isCollapsed: boolean) => void

  // Item type header
  itemType: ItemType
  saveItemType: (type: ItemType) => void
}

const useItemListConfig = create<ItemListConfigState>()(
  persist(
    (set, get) => ({
      // Collaped items
      collapsedItems: [],
      isItemCollapsed: (item: GeneralItem) =>
        !!get().collapsedItems.find(
          collapsedItem =>
            collapsedItem.itemId === item.itemID &&
            collapsedItem.itemType === item.type
        ),
      saveCollapseState: (item: CollapsedItemState, isCollapsed: boolean) =>
        set({
          collapsedItems: isCollapsed
            ? [...get().collapsedItems, item]
            : get().collapsedItems.filter(
                collapsedItem =>
                  !(
                    collapsedItem.itemId == item.itemId &&
                    collapsedItem.itemType == item.itemType
                  )
              ),
        }),

      // Item type header
      itemType: "GOAL",
      saveItemType: (type: ItemType) => set({ itemType: type }),
    }),
    {
      name: "item-list-storage",
    }
  )
)

export default useItemListConfig

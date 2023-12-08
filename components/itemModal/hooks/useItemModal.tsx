import React from "react"
import { create } from "zustand"
import { GeneralItem } from "@/types/itemTypes"

import AddGeneralItem from "../addGeneralItem/AddGeneralItem"
import DreamContent from "../modalContent/DreamContent"
import GoalContent from "../modalContent/GoalContent"
import TaskContent from "../modalContent/TaskContent"

type ModalState = {
  isOpen: boolean
  modalContent?: React.ReactNode
  parentItem?: GeneralItem
  openGeneralOnClose?: boolean

  openTaskModal: (
    openGeneralOnClose?: boolean,
    parentItem?: GeneralItem
  ) => void
  openGoalModal: (openGeneralOnClose?: boolean) => void
  openDreamModal: (openGeneralOnClose?: boolean) => void
  openGeneralModal: () => void

  closeModal: () => void
  goBack: () => void
}

const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  modalContent: undefined,

  parentItem: undefined,
  openGeneralOnClose: false,

  openTaskModal: (openGeneralOnClose = false, parentItem?: GeneralItem) =>
    set(() => ({
      isOpen: true,
      modalContent: <TaskContent />,
      openGeneralOnClose: openGeneralOnClose,
      parentItem,
    })),
  openGoalModal: (openGeneralOnClose = false) =>
    set(() => ({
      isOpen: true,
      modalContent: <GoalContent />,
      openGeneralOnClose: openGeneralOnClose,
    })),
  openDreamModal: (openGeneralOnClose = false) =>
    set(() => ({
      isOpen: true,
      modalContent: <DreamContent />,
      openGeneralOnClose: openGeneralOnClose,
    })),
  openGeneralModal: () =>
    set(() => ({
      isOpen: true,
      modalContent: <AddGeneralItem />,
    })),

  goBack: () =>
    set(state =>
      state.openGeneralOnClose
        ? {
            isOpen: true,
            modalContent: <AddGeneralItem />,
            openGeneralOnClose: false,
          }
        : {
            isOpen: false,
            modalContent: undefined,
          }
    ),
  closeModal: () =>
    set(() => ({
      isOpen: false,
      openGeneralOnClose: false,
      parentItem: undefined,
    })),
}))

const useItemModal = () => ({
  isOpen: useModalStore(state => state.isOpen),
  parentItem: useModalStore(state => state.parentItem),
  modalContent: useModalStore(state => state.modalContent),
  closeModal: useModalStore(state => state.closeModal),

  showBackButton: useModalStore(state => state.openGeneralOnClose),
  goBack: useModalStore(state => state.goBack),

  openTaskModal: useModalStore(state => state.openTaskModal),
  openGoalModal: useModalStore(state => state.openGoalModal),
  openDreamModal: useModalStore(state => state.openDreamModal),
  openGeneralModal: useModalStore(state => state.openGeneralModal),
})

export default useItemModal

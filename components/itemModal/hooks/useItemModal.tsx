import React from "react"
import { create } from "zustand"

import AddGeneralItem from "../addGeneralItem/AddGeneralItem"
import DreamContent from "../modalContent/DreamContent"
import GoalContent from "../modalContent/GoalContent"
import TaskContent from "../modalContent/TaskContent"

type ModalState = {
  isOpen: boolean
  modalContent?: React.ReactNode
  addTaskOnOpen: boolean
  openGeneralOnClose?: boolean

  openTaskModal: (openGeneralOnClose?: boolean) => void
  openGoalModal: (openGeneralOnClose?: boolean, addTaskOnOpen?: boolean) => void
  openDreamModal: (openGeneralOnClose?: boolean) => void
  openGeneralModal: () => void

  closeModal: () => void
  goBack: () => void
}

const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  modalContent: undefined,

  addTaskOnOpen: false,
  openGeneralOnClose: false,

  openTaskModal: (openGeneralOnClose = false) =>
    set(() => ({
      isOpen: true,
      modalContent: <TaskContent />,
      openGeneralOnClose: openGeneralOnClose,
    })),
  openGoalModal: (openGeneralOnClose = false, addTaskOnOpen = false) =>
    set(() => ({
      isOpen: true,
      addTaskOnOpen,
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
  closeModal: () => set(() => ({ isOpen: false, openGeneralOnClose: false })),
}))

const useItemModal = () => ({
  isOpen: useModalStore(state => state.isOpen),
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

import { useState } from "react"
import { create } from "zustand"

type ModalStateState = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const useModalStateStore = create<ModalStateState>(set => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
}))

const useModalState = () => {
  const [open, setOpen] = useState(false)

  const setModalState = (isOpen: boolean) => {
    setOpen(isOpen)
    useModalStateStore.getState().setIsOpen(isOpen)
  }

  return {
    isModalOpen: useModalStateStore(state => state.isOpen),
    open,
    setOpen: setModalState,
  }
}

export default useModalState

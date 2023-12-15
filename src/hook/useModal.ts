import { useState } from "react"
type TUseModal = [
  isOpen: boolean,
  openModal: () => void,
  closeModal: () => void,
]

export const useModal = (): TUseModal => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return [isOpen, openModal, closeModal]
}
import { ReactElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ModalBody from "./ModalBody";
import './style.css'

type TModal = {
  children: ReactElement;
  onClose: () => void;
  button?: boolean;
}

const Modal = ({ children, onClose, button = true }: TModal) => {
  const ref = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    document.body.append(ref.current)
    return () => ref.current.remove()
  }, [])

  return createPortal(
    <ModalBody
      button={button}
      onClose={onClose}>
      {children}
    </ModalBody>,
    ref.current)
};

export default Modal;

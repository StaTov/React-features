import { ReactElement, useEffect, useRef } from "react";
import './style.css'

type TBody = {
  children: ReactElement;
  onClose: () => void;
  button?: boolean;
}

const ModalBody = ({ children, onClose, button }: TBody) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeModal = (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        return onClose()
      }
    }
    ref.current?.addEventListener('click', closeModal)
    return () => {
      ref.current?.removeEventListener('click', closeModal)
    }
  }, [])

  return (
    <div ref={ref} className="modal__container">
      <div className="modal__body">
        {button && <button
          className="modal__button"
          onClick={onClose}>
          &#10006;
        </button>}
        {children}
      </div>
    </div>
  )
};

export default ModalBody;

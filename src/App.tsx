import { useModal } from './hook/useModal';
import './style.css'
import Modal from './UI/Modal/Modal';

const App = () => {
  const [isOpen, openModal, closeModal] = useModal()
  return (
    <div className="container">
      <button onClick={openModal}>open</button>
      {isOpen &&
        <Modal
          onClose={closeModal}>
          <div>Modal</div>
        </Modal>}
    </div >)
}
export default App;

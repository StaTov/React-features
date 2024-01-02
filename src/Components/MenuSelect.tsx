import { useRef, useState } from "react";
import Select from "./Select";
import './style.css'

type TMenuSelectProp = {
  initialValue?: string;
  placeholder?: string;
  data: string[];
};


const MenuSelect = ({
  placeholder = 'Выберите страну',
  initialValue = '',
  data = []
}: TMenuSelectProp) => {

  const [value, setValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null);

  const position = ref.current?.getBoundingClientRect()
  const menuStyle = `menu__wrapper ${isOpen ? 'menuOpen' : ''}`
  const currentValue = value ? value : placeholder
  
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        ref={ref}
        onClick={handleClick}
        className={menuStyle}>
        <div>{currentValue}</div>
      </div>
      <Select
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={value}
        setValue={setValue}
        position={position}
        data={data}
      />
    </>
  )
};

export default MenuSelect;


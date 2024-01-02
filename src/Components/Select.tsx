type TSelectProps = {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  setValue: (value: React.SetStateAction<string>) => void;
  value: string;
  data: string[];
  position: DOMRect | undefined;
}

const Select = ({
  isOpen = false,
  setIsOpen,
  setValue,
  value,
  data = [],
  position
}: TSelectProps) => {

  if (!isOpen) {
    return null
  }

  const selectPosition = {
    marginTop: position?.bottom + 'px',
    marginLeft: position?.x + 'px'
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div
      onClick={handleClickOutside}
      className="select__container">
      <div
        style={selectPosition}
        className="select__wrapper">
        {data.map(item => {

          const selected = item === value ? 'selected' : ''
          const className = `select__item ${selected}`

          const handleClick = () => {
            setIsOpen(!isOpen)
            setValue(item)
          }

          return (
            <div
              onClick={handleClick}
              key={item}
              className={className}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Select;

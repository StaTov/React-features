import { Typography, TextField, Box } from '@mui/material';
import { FieldHelperProps, FieldInputProps, FieldMetaProps, prepareDataForValidation, useField } from 'formik';

import { useState, useRef, useEffect } from 'react';
import { inputLabel } from '../MyInput/style';
import { maskSpacesAmount } from './constants';
import { container, currencyContainer } from './style';

type TProp = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
};
type Ta = { nativeEvent: { inputType: string; data: number }; key: string; };
type TEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & Ta;


const AmountInputWithSpace = ({
  label,
  name
}: TProp) => {
  const [field, meta, { setValue }]: [FieldInputProps<string>, FieldMetaProps<string>, FieldHelperProps<string>] = useField<string>({ name })
  const [position, setPosition] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.selectionStart = position;
      input.selectionEnd = position;
    }
  })

  const getHundredths = (str: string): string => {
    const index = str.indexOf('.')
    return index >= 0 ? str.slice(0, index + 3) : str
  }

  const getFlat = (str: string): string => {
    let isFirst = true;
    const arr = str.split('').map((el) => {
      if (el === '.' && isFirst) {
        isFirst = false
        return el
      }
      if (el === '.' && !isFirst) {
        return ''
      }
      return el
    })
    const result = arr.join('')
    return result.startsWith('.') ? '0' + result : result
  }

  const deleteFirstZero = (str: string): string => {
    const first = str[0];
    const second = str[1];
    if (first === '0' && Number(second)) {
      return str.slice(1)
    }
    if (first === '0' && second === '0') {
      return str.slice(1)
    }
    return str;
  }

  const getLengthNoFlat = (str: string): number => {
    return str.replace(/\.\d{0,}/, '').length;
  }
  const getLengthForDelete = (str: string): number => {
    if (str.match(/\.\d{0,}/)) {
      return str.replace(/\.\d{0,}/, '').length + 1
    }
    return str.length;
  }
  const getClaerLength = (str: string): number => {
    const noSpace = clearSpaces(str);
    return getLengthNoFlat(noSpace);
  }
  const clearSpaces = (str: string): string => {
    return str.replace(/\s/g, '')
  }

  const setMask = (string: string): string => {


    let isDot = false;
    const result = [];
    const typeSpaces = getLengthNoFlat(string) % 3;

    for (let i = 0; i < string.length; i++) {
      result.push(string[i])
      if (isDot) {
        continue
      }
      if (string[i + 1] === '.') {
        isDot = true;
        continue
      }
      if (maskSpacesAmount[typeSpaces].includes(i)
        && !isDot
      ) {
        result.push(' ')
      }
    }
    return result.join('');
  }

  const handleChange = (event: TEvent) => {

    let rawValue = event.target.value;
    const cursorPosition = event.target.selectionStart;
    const typeInputEvent = event.nativeEvent.inputType;
    if (cursorPosition === null || rawValue.length > 15) {
      return;
    }

    if (typeInputEvent === 'deleteContentForward' &&
      [4, 8, 12].includes(getLengthForDelete(rawValue) - cursorPosition)
    ) {
      const arr = rawValue.split('')
      arr.splice(cursorPosition, 1)
      rawValue = arr.join('')
    }

    // удалить пробелы 
    let resultValue = clearSpaces(rawValue)
    // удалить все кроме цифр и '.'
    resultValue = resultValue.replace(/[^\d|.]/g, '')
    // Запретить больше одной точки подряд
    resultValue = resultValue.replace(/\.\./, '.')
    // Спарсить во flat
    resultValue = getFlat(resultValue)
    // Обрезать до сотых *.00
    resultValue = getHundredths(resultValue)
    // Запертить больше одного '0' в начале
    resultValue = deleteFirstZero(resultValue)
    // приментиь маску
    resultValue = setMask(resultValue)

    setValue(resultValue)

    setPosition(() => {
      const length = getClaerLength(rawValue)
      // ввод текста 
      if (typeInputEvent === 'insertText'
        && [4, 7, 10, 13, 17].includes(length)
        // && !rawValue.slice(cursorPosition).includes('.')
      ) {
        return cursorPosition + 1;
      }
      //удаление Backspace 4, 8, 12, 16, 20
      if (typeInputEvent === 'deleteContentBackward'
        && [3, 6, 9, 12, 15].includes(length)) {
        return cursorPosition - 1;
      }
      // обновить первый нолик
      if (typeInputEvent === 'insertText'
        && cursorPosition === 2
        && rawValue[0] === '0') {
        return cursorPosition - 1
      }
      return cursorPosition;
    })

  }
  return (
    <Box sx={container}>
      <Typography sx={inputLabel}>{label}</Typography>
      <TextField
        {...field}
        inputRef={inputRef}
        onChange={handleChange}
      />
    </Box>)
};
export default AmountInputWithSpace;

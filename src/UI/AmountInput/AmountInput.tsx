import { Typography, TextField, Box } from '@mui/material';
import { FieldHelperProps, FieldInputProps, FieldMetaProps, useField } from 'formik';

import { useState, useRef, useEffect } from 'react';
import { inputLabel } from '../MyInput/style';
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


const AmountInput = ({
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
  const getCaretPosition = (value: string): number => {
    if (!value) {
      return 0
    }
    return (value.length * 9) + 20;
  }
  const handleChange = (event: TEvent) => {
    let rawValue = event.target.value;
    const cursorPosition = event.target.selectionStart;
    const typeInputEvent = event.nativeEvent.inputType;
    if (cursorPosition === null) {
      return;
    }
    if (rawValue.match(/\.\d{3}/) && rawValue.length === cursorPosition + 2) {
      const arr = rawValue.split('');
      arr[arr.length - 2] = '';
      rawValue = arr.join('');
    }
    let value = rawValue.replace(/[^\d|.]/g, '')
    value = value.replace(/\.\./, '.')
    value = value.replace(/^00/, '0')
    const value1 = value.match(/\d+\.\d{1,2}/)
    let resultValue = value1 ? value1.join('') : value
    if (resultValue.startsWith('.')) {
      resultValue = 0 + resultValue
    }
    if (resultValue.match(/^0\d/)) {
      resultValue = resultValue.slice(1);
    }
   
    setValue(resultValue)
 

    setPosition(() => {
      if (rawValue.match(/0\d\./) && cursorPosition === 2) {
        console.log('gg')
        return cursorPosition - 1
      }
      if (cursorPosition === 1
        && rawValue.length > 1
        && rawValue.startsWith('0')
        && typeInputEvent === 'insertText') {
        console.log(' -> !')
        return cursorPosition - 1
      }
      if ((cursorPosition > rawValue.length - 3)
        && typeInputEvent === 'insertText'
        && event.target.value.at(-1) !== '.'
        && cursorPosition !== rawValue.length
      ) {
        console.log('->1')
        return cursorPosition - 1;
      } else {
        console.log('->2')
        return cursorPosition
      }
    })
  }
  const currencyPosition = (value: string) => {
    const positionValue = getCaretPosition(value)
    return value.includes('.') ? positionValue - 5 : positionValue
  }
  return (
    <Box sx={container}>
      <Typography sx={inputLabel}>{label}</Typography>
      <TextField
        {...field}
        inputRef={inputRef}
        onChange={handleChange}
      />
      {field.value && <Box
        sx={currencyContainer}
        style={{ left: `${currencyPosition(field.value)}px` }}
      >RUB</Box>}
    </Box>)
};
export default AmountInput;

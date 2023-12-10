/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import { TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { useEffect, useRef, useState } from 'react';
import ErrorInput from './ErrorInput';
import { inputLabel } from './style';

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

const MyInput = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  error,
}: TProp) => {

  const [field, meta, { setValue }] = useField<string>({ name });
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef !== null && inputRef.current) {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition
    }
  })

  const setMask = (string: string): string => {
    const result = [];
    for (let i = 0; i < string.length; i++) {
      result.push(string[i])
      if ([4, 8, 9, 12].includes(i)) {
        result.push(' ')
      }
    }
    return result.join('');
  }

  function handleChange(event: TEvent) {
    const inputType = event.nativeEvent.inputType
    const currentPosition = event.target.selectionStart
    let value = event.target.value;

    if (inputType === 'deleteContentForward') {
      const arr = value.split('')
      if (currentPosition) {
        arr.splice(currentPosition, 1)
      }
      value = arr.join('')
    }

    value = value.replace(/\D/g, '')

    if (value.length > 20) {
      return
    }
    const resultValue = setMask(value)
    setValue(resultValue);

    setCursorPosition((prev) => {
      const space = [6, 11, 13, 17];
      
      if (!currentPosition) {
        return 0
      }
      if (space.includes(currentPosition)
        && inputType === 'insertText') {
        return currentPosition + 1;
      }
      if (space.includes(currentPosition) &&
        inputType === 'deleteContentBackward') {
        return currentPosition - 1;
      }
      return currentPosition;
    });
  }
  return (
    <>
      <Typography sx={inputLabel}>{label}</Typography>
      <TextField
        {...field}
        inputRef={inputRef}
        onChange={handleChange}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
      {
        error
          ? <div>{error}</div>
          : <ErrorInput meta={meta} />
      }
    </>
  );
};
export default MyInput;

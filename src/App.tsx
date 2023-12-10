/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material';
import {
  Formik, Form,
} from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { formStyle } from './style';
import AmountInput from './UI/AmountInput/AmountInput';
import AmountInputWithSpace from './UI/AmountInputWithSpace/AmountInputWithSpace';
import MyInput from './UI/MyInput/MyInput';

const App: FC = () => {
  const [error, setError] = useState<string>('');
  return (
    <>
      <Formik
        initialValues={{
          myInput: '',
        }}
        validationSchema={
          Yup.object({
            myInput: Yup.string()
              .max(24, 'Must be 20 number or less')
              .required('Required'),
          })
        }
        onSubmit={(values, { setSubmitting }) => {
          // const result = { myInput: values.myInput.replace(/\D/g, '') };
          setSubmitting(false);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={formStyle}>
                <MyInput
                  type="text"
                  label="***** **** * *** *******"
                  name="myInput"
                  error={error}
                />
                <AmountInput
                  name="amount"
                  label="введите сумму"
                />
                <AmountInputWithSpace
                  name="amountSpace"
                  label="введите сумму"
                />
                <button type="submit">Submit</button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default App;

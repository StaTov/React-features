import { Typography } from '@mui/material';
import { FieldMetaProps } from 'formik';
import { inputError } from './style';

type TProps = {
  meta: FieldMetaProps<string>
};

const ErrorInput = ({ meta }: TProps) => {
  const { error, touched } = meta;
  if (!(error && touched)) return null;
  return (
    <Typography sx={inputError}>
      {error}
    </Typography>
  );
};

export default ErrorInput;

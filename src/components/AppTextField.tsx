import { InputProps, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';

export interface AppTextFieldProps extends Record<string, unknown> {
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  isTranslate?: boolean;
  extraElement?: JSX.Element;
  isFormik?: boolean;
  component?: any;
  InputProps?: InputProps;
}

const AppTextField: FC<AppTextFieldProps> = ({
  label,
  onChange,
  value,
  isTranslate = true,
  extraElement,
  isFormik,
  component,
  InputProps,
  ...rest
}) => {
  const inputSymbolLabel = rest['required'] ? ' *' : '';

  return (
    <div>
      {label && (
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {label} {inputSymbolLabel}
        </Typography>
      )}
      <Box position="relative">
        <TextField
          fullWidth
          value={value}
          onChange={onChange}
          InputProps={InputProps}
          {...rest}
        />
        {extraElement}
      </Box>
    </div>
  );
};

export default AppTextField;

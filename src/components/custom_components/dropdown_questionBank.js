import React from 'react';
import { MenuItem, Select, InputLabel, OutlinedInput, FormControl, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomFormControl = styled(FormControl)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: error ? '#F44336' : '#F7B446',
    },
    '&:hover fieldset': {
      borderColor: error ? '#F44336' : '#F7B446',
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? '#F44336' : '#F7B446',
    },
  },
  '& .MuiInputLabel-root': {
    color: error ? '#F44336' : '#252525',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: error ? '#F44336' : '#252525',
  },
}));

const DropdownComponent = ({ value, onChange, error, helperText, label, options }) => {
  return (
    <CustomFormControl fullWidth variant="outlined" margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && helperText && (
        <Typography variant="body2" color="error" style={{ marginTop: '4px' }}>
          {helperText}
        </Typography>
      )}
    </CustomFormControl>
  );
};

export default DropdownComponent;

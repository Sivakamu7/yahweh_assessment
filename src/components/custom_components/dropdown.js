import React from 'react';
import { MenuItem, Select, Typography, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomFormControl = styled(FormControl)(({ error }) => ({
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

const DropdownComponent = ({ value, onChange, error, helperText }) => {
  return (
    <CustomFormControl fullWidth variant="outlined" margin="normal" error={error}>
      <InputLabel>Type of Assessment</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        input={<OutlinedInput label="Type of Assessment" />}
      >
        <MenuItem value="quiz">Quiz</MenuItem>
        <MenuItem value="assignment">Assignment</MenuItem>
        <MenuItem value="survey">Survey</MenuItem>
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

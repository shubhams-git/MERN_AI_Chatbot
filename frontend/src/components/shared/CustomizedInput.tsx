import React from 'react';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  type: string;
  label: string;
}

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      name={props.name}
      label={props.label}
      type={props.type}
      slotProps={{ inputLabel: { sx: { color: 'white' } } }}
      sx={{
        width: 400,
        mt: 2,
        borderRadius: 2,
        color: 'white',
        fontSize: 12,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          borderWidth: "2px",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .Mui-focused .MuiInputLabel-root": {
          color: "white",
        },
      }}
      margin="normal"
    />
  );
};

export default CustomizedInput;
import { TextField } from '@mui/material';

type Props={
    name: string;
    type: string;
    label: string;
}

const CustomizedInput = (props:Props) => {
  return (
    <TextField
        name={props.name}
        label={props.label}
        type={props.type}
        slotProps={{
        inputLabel: {
            sx: { color: 'white' },
        },
        }}
        sx={{ width: 400, borderRadius: 2, color: 'white', fontSize: 20, margin: "normal" }}
    />
  
  )
}

export default CustomizedInput
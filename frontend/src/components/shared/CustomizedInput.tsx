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
        color: "white",
        fontSize: 12,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", 
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: "white",  
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",  
          },
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white",
        },
        "& .MuiInputBase-root":{
          color: "white",
        }
      }}
      margin="normal"
    />
  );
};


export default CustomizedInput;
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
        width: "100%",
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
        },
        // Override autofill styles
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #121212 inset", 
          WebkitTextFillColor: "white", 
        },
        "& input:-webkit-autofill:hover, & input:-webkit-autofill:focus": {
          WebkitBoxShadow: "0 0 0 1000px #121212 inset", 
          WebkitTextFillColor: "white", 
        },
      }}
      margin="normal"
    />
  );
};

export default CustomizedInput;
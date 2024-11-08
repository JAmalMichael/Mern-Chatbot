import { TextField } from '@mui/material';


interface inputProps {
    name: string;
    type: string;
    label: string;
}

const CustomizedInput = (props: inputProps) => {
  return (
    <TextField name={props.name} label={props.label} type={props.type} 
    InputLabelProps={{ style: { color: "white" } }}
    margin="normal"
    InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        }
      }}/>
  )
}

export default CustomizedInput
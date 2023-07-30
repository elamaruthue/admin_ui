import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextFields({Feild, label,setState,error,inputProps,value}) {
    const onChangeHandle =(e)=>{
      const regex = /^[0-9\b]+$/;
      if(label==="Phone No"||
      label=== "Adhar No"){
        if (regex.test(e)) {
          setState(e)
        }
        else{
          setState('')
        }
      }
      else{
        setState(e)
      }
    }
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {Feild === "outlined" ? (
        <TextField id="outlined-basic" label={label} variant="outlined" />
      ) : Feild === "Filled" ? (
        <TextField id="filled-basic" label={label} variant="filled" onChange={(e)=> onChangeHandle(e.target.value)} />
      ) : Feild === "Multiline" ? (
        <TextField
          id="outlined-multiline-static"
          label={label} 
          multiline
          maxRows={4}
          variant="standard"
          onChange={(e)=> onChangeHandle(e.target.value)}
          error={error}
        />
      ) : (
          
          <TextField id="standard-basic" error={error} label={label} 
          variant="standard"
          value={value}
          onChange={(e)=> onChangeHandle(e.target.value,)}
          inputProps={inputProps}
          
          />
      )}
    </Box>
  );
}

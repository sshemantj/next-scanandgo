import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const CustomTextField = (props: TextFieldProps) => {
  const { ...rest } = props;
  return (
    <TextField
      inputProps={{
        style: {
          padding: "4px",
        },
      }}
      {...{ ...rest }}
    />
  );
};

export default CustomTextField;

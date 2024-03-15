import React, { useState } from "react";
import { TextField, MenuItem, TextFieldProps } from "@mui/material";

interface IProps {
  onChange: (_: string) => void;
  value: string;
  countryCodes: {
    code: string;
  }[];
}

const customSx = {
  "& .MuiSelect-select": {
    padding: "12px 14px",
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
  },
  "& .MuiFormLabel-root": {
    top: "-3px",
  },
  "& .MuiInputLabel-shrink": {
    top: "0",
  },
};

const MobileNumberInput = ({
  countryCodes,
  onChange,
  value,
  sx = {},
  ...rest
}: IProps & Omit<TextFieldProps, "onChange">) => {
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);

  const handleCountryCodeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCountryCode(event.target.value);
  };

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value: phoneNumber } = event.target;
    if (phoneNumber?.length <= 10) {
      onChange(`${countryCode}${phoneNumber}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        border: "1.5px solid rgba(0, 0, 0, 0.42)",
        borderRadius: "6px",
      }}
    >
      <TextField
        select
        value={countryCode}
        onChange={handleCountryCodeChange}
        variant="outlined"
        sx={{
          ...customSx,
          ...sx,
          width: "6rem",
          "& fieldset": {
            border: "none",
          },
          "& .Mui-focused": {
            color: "rgba(0, 0, 0, 0.42) !important",
          },
        }}
        {...rest}
      >
        {countryCodes.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.code}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="tel"
        label="Mobile Number"
        onChange={handleNumberChange}
        value={value.replace(countryCode, "")}
        variant="outlined"
        sx={{
          ...customSx,
          ...sx,
          width: "100%",
          "& fieldset": {
            border: "none",
          },
          "& .Mui-focused": {
            color: "rgba(0, 0, 0, 0.42) !important",
          },
          "& .MuiInputLabel-shrink": {
            top: "0",
            left: "-70px",
            background: "#fff",
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.42)",
          },
        }}
        {...rest}
      />
    </div>
  );
};

export default MobileNumberInput;

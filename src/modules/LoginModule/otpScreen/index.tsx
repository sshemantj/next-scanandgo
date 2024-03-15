import CustomButton from "@/component/atoms/customButton";
import { TextField } from "@mui/material";
import React from "react";

interface IOtpScreen {
  otpinput: string;
  setOtpInput: React.Dispatch<React.SetStateAction<string>>;
}

const OtpScreen = (props: IOtpScreen) => {
  const { otpinput, setOtpInput } = props;

  const handleSubmit = () => {};

  return (
    <div
      style={{
        height: "90vh",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <TextField
        sx={{
          margin: "1rem 0 0 0",
          width: "100%",
          border: "1.5px solid rgba(0, 0, 0, 0.42)",
          borderRadius: "6px",
          "& .MuiInputBase-input": {
            padding: "12px 14px",
          },
          "& .MuiFormLabel-root": {
            top: "-3px",
          },
          "& .MuiInputLabel-shrink": {
            top: "0",
            background: "#fff",
            fontWeight: 600,
          },
          "& .Mui-focused": {
            color: "rgba(0, 0, 0, 0.42) !important",
          },
          "& fieldset": {
            border: "none",
          },
        }}
        label="Verify OTP"
        value={otpinput}
        onChange={(e) => setOtpInput(e.target.value)}
      />
      <CustomButton
        onClick={() => handleSubmit()}
        style={{ width: "100%" }}
        variant="dark"
      >
        Submit
      </CustomButton>
    </div>
  );
};

export default OtpScreen;

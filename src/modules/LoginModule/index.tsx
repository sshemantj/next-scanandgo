import React, { useState } from "react";
import LoginUsingMobile from "./loginUsingMobile";
import CustomButton from "@/component/atoms/customButton";
import styles from "./loginModule.module.scss";
import MobileNumberInput from "@/component/atoms/mobileInput";
import { TextField } from "@mui/material";

const countryCodes = [{ code: "+1" }, { code: "+91" }];

const LoginModule = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
  };
  const handleLoginClick = () => {};

  const handleEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.loginModuleWrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.alreadyLoginContainer}>
          <p className={styles.loginTitle}>
            ALREADY HAVE A SHOPPERS STOP ACCOUNT?
          </p>
          <CustomButton
            onClick={() => handleLoginClick()}
            style={{ width: "100%", fontWeight: 700 }}
            variant="dark"
          >
            LOG IN
          </CustomButton>
        </div>
        <p className={styles.orSignInwith}>
          <span>Or sign in with</span>
        </p>
        <MobileNumberInput
          {...{
            countryCodes,
            value: phoneNumber,
            onChange: handlePhoneNumberChange,
          }}
        />
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
          label="Email ID."
          value={email}
          onChange={handleEmail}
        />
      </div>
      <CustomButton style={{ width: "100%" }} variant="dark">
        Submit
      </CustomButton>
    </div>
  );
};

export default LoginModule;

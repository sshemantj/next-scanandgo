import React from "react";
import styles from "./enterNumScreen.module.scss";
import { Grid, TextField, Typography } from "@mui/material";
import CustomButton from "../../../component/molecules/customBtn";
import { handleEnterClick } from "@/utils/common";
import { useMobileCheck } from "@/hooks/useMobile";

interface IEnterScreen {
  username: string;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  handleProceed: () => void;
  error: boolean;
  helpertext: string;
  isDisabled: boolean;
}

const EnterNumScreen = (props: IEnterScreen) => {
  const {
    handleChange,
    handleProceed,
    helpertext,
    isDisabled,
    username,
    error,
  } = props;
  const isMobile = useMobileCheck();

  return (
    <div className={styles.enterNumWrapper}>
      <>
        <Typography variant="subtitle1" m={0} fontWeight={400}>
          SIGN IN TO Scan and Go!
        </Typography>
        <Typography variant="subtitle2" mt={1} mb={2} fontWeight={400}>
          Enter your phone number to sign in
        </Typography>
        <Grid width={"100%"} item xs={12} margin={"0 0 1rem 0"}>
          <div className={styles.inputComp}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23) !important",
                },
              }}
              value={username}
              onChange={handleChange}
              onKeyDown={(e) => handleEnterClick(e, handleProceed)}
              label="Enter your phone number"
              autoComplete="off"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              helperText={error ? helpertext : " "}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                // border: "1px solid #AD184C",
              }}
              type="tel"
              InputLabelProps={{
                style: { color: "#AD184C" },
              }}
              InputProps={{
                style: {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0,
                  position: "relative",
                  justifyContent: isMobile ? "center" : "none",
                },
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            sx={{ width: "100%", margin: "0" }}
            onClick={() => handleProceed()}
            disabled={isDisabled}
          >
            Proceed
          </CustomButton>
        </Grid>
      </>
    </div>
  );
};

export default EnterNumScreen;

import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import styles from "./customBtn.module.scss";

interface IProps {
  onClick?: () => void;
  disabled?: boolean;
  children: string;
  variant?: "text" | "outlined" | "contained";
  sx?: SxProps<Theme>;
}

const defaultSx = { width: "100%", margin: "1rem 0" };

const CustomButton = (props: IProps) => {
  const { children, onClick, disabled, variant = "contained", sx = {} } = props;
  return (
    <Button
      className={`${styles.proceedBtn} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      sx={{ ...defaultSx, ...sx }}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

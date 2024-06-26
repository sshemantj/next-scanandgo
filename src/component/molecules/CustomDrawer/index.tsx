import React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  window?: () => Window;
  children: JSX.Element;
  onClose: () => void;
  drawerStyles?: any;
  drawerBleeding?: number;
  isHomeScreen?: boolean;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const CustomDrawer = (props: Props) => {
  const {
    window,
    open,
    setOpen,
    children,
    onClose,
    drawerStyles = {},
    drawerBleeding = 0,
    isHomeScreen = false,
  } = props;

  const onOpen = () => () => {
    setOpen(true);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            overflow: "visible",
            borderTopLeftRadius: isHomeScreen ? 40 : 12,
            borderTopRightRadius: isHomeScreen ? 40 : 12,
            ...drawerStyles,
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => onClose()}
        onOpen={onOpen()}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: isHomeScreen ? 40 : 12,
            borderTopRightRadius: isHomeScreen ? 40 : 12,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
            borderTopLeftRadius: isHomeScreen ? 40 : 12,
            borderTopRightRadius: isHomeScreen ? 40 : 12,
          }}
        >
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default CustomDrawer;

import React, { ForwardedRef, Ref, useRef, useState } from "react";
import CustomBarCodeScanner from "@/component/molecules/customBarcodeScanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import CustomDrawer from "@/component/molecules/CustomDrawer";
import CustomButton from "@/component/atoms/customButton";
import styles from "./scannerScreen.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { addProduct } from "@/store/slices/processSlice";
import { processScreenRoutes } from "@/constants/allRoutes";
import { Button } from "@mui/material";

const ScannerScreen = () => {
  const [currentText, setCurrentText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onNewScanResult = (decodedText: string) => {
    if (!currentText) {
      setDisabled(false);
      setCurrentText(decodedText);
      setOpen(true);
      ref.current?.pause(true);
    }
  };

  const handleAddProduct = () => {
    setCurrentText("");
    dispatch(
      addProduct({
        id: `${Math.random() * 100}`,
        name: currentText.length >= 15 ? currentText.slice(0, 15) : currentText,
        description: "Half Sleeve T-shirt",
        price: "1,299",
        discount: null,
      })
    );
    router.push(processScreenRoutes.PROCESS_SCANNED_ITEM_SCREEN);
  };

  const resetAndScanAgain = () => {
    setCurrentText("");
    ref.current?.resume();
    setOpen(false);
  };

  const onClose = () => () => {
    ref.current?.resume();
    setOpen(false);
  };

  return (
    <div className={styles.scannerScreenWrapper}>
      <div className={styles.scanContainer}>
        <CustomBarCodeScanner
          ref={ref as Ref<ForwardedRef<Html5QrcodeScanner | null>>}
          fps={10}
          qrbox={250}
          disableFlip={false}
          defaultZoomValueIfSupported={4}
          qrCodeSuccessCallback={onNewScanResult}
          qrCodeErrorCallback={(error) => console.log(error)}
          showZoomSliderIfSupported={true}
        />
      </div>
      <CustomDrawer
        {...{
          open,
          setOpen,
          onClose,
          data: currentText,
          setCurrentText,
          camRef: ref,
          handleAddProduct,
        }}
      >
        <div className={styles.customDrawerContainer}>
          <div className={styles.drawerInner}>
            <h3 className={styles.pdName}>Current product: {currentText}</h3>
            <div className={styles.btnWrapper}>
              <Button
                className={styles.addProductBtn}
                onClick={() => handleAddProduct()}
                variant="contained"
              >
                ADD Product
              </Button>
              <Button
                className={styles.resetAndScanAgain}
                onClick={() => resetAndScanAgain()}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </CustomDrawer>
      <div className={styles.buttonWrapper}>
        <CustomButton
          onClick={() => handleAddProduct()}
          disabled={disabled}
          style={{ width: "100%" }}
          variant="dark"
        >
          ADD ITEMS
        </CustomButton>
      </div>
    </div>
  );
};

export default ScannerScreen;

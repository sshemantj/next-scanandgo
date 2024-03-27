import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useAppDispatch } from "@/store/hooks";
import { hideBackNavbar } from "@/store/slices/menu";
import styles from "./showQrScreen.module.scss";

const ShowQrScreen = () => {
  const [inputValue, setInputValue] = useState("this is demo 323232");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hideBackNavbar());
  }, []);

  return (
    <div className={styles.showQrScreenWrapper}>
      <div className={styles.instruction}>
        <p className={styles.success}>
          Your order has been <br /> placed successfully.
        </p>
        <p className={styles.showText}>
          Show this QR Code to the <br /> Store Associate & you’re all done!
        </p>
      </div>
      <QRCode value={inputValue} />
      <div className={styles.invoice}>
        <p>Invoice will be shared on your mobile and email.</p>
      </div>
    </div>
  );
};

export default ShowQrScreen;

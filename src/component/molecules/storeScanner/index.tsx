import React, { ForwardedRef, Ref, useEffect, useRef, useState } from "react";
import CustomQrcodeScanner from "@/component/molecules/customQrcodeScanner";
import { ToastContainer, toast } from "react-toastify";
import { Html5QrcodeScanner } from "html5-qrcode";
import { processScreenRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import useWithinRadius from "@/hooks/useWithinRadius";
// import CustomDrawer from "../CustomDrawer";
import styles from "./storeScanner.module.scss";
import CustomButton from "@/component/atoms/customButton";
import CustomHtml5Qrcode from "../customHtml5Qrcode";

interface IStoreLocation {
  latitude: number | null;
  longitude: number | null;
  name: string | null;
}

const initialLocationValue = {
  latitude: null,
  longitude: null,
  name: null,
};

let TIMEOUT: NodeJS.Timeout;

const StoreScanner = () => {
  const ref = useRef<Html5QrcodeScanner | null>(null);
  const router = useRouter();
  const [distance, setDistance] = useState<number>(200);
  const [disabled, setDisabled] = useState(true);
  const [storeLocation, setStoreLocation] =
    useState<IStoreLocation>(initialLocationValue);
  const { isWithinRadius, setIsWithinRadius, setStoreDetailsSetup } =
    useWithinRadius();

  useEffect(() => {
    setStoreDetailsSetup({
      distanceToCalculate: distance,
      storeLocation: storeLocation,
    });
  }, [storeLocation]);

  const onNewScanResult = (result: string) => {
    const newLocation = JSON.parse(result);
    setStoreLocation(newLocation);
  };

  useEffect(() => {
    if (isWithinRadius) {
      toast.success(`Store qr-code scan successfull!`);
      setDisabled(false);
    }
    if (isWithinRadius === false) {
      toast.error(`Store is not within ${distance}m range!`);
    }

    if (TIMEOUT) clearTimeout(TIMEOUT);

    TIMEOUT = setTimeout(() => {
      setIsWithinRadius(null);
    }, 3000);
  }, [isWithinRadius]);

  useEffect(() => {
    const handleStartCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (err: any) {
        console.log(err.message || "Failed to access camera.");
      }
    };
    handleStartCamera();
  }, []);

  const handleScanNow = () => {
    router.push(processScreenRoutes.PROCESS_SCANNER_SCREEN);
  };

  const qrCodeSuccessCallback = (decodedText: string) => {
    alert(decodedText);
    onNewScanResult(decodedText);
  };
  const qrCodeErrorCallback = (error: string) => {
    console.log(error);
  };

  return (
    <div className={styles.storeScannerContainer}>
      <div className={styles.qrCodeScanWrapper}>
        <CustomHtml5Qrcode
          {...{ qrCodeSuccessCallback, qrCodeErrorCallback }}
        />
        {/* <CustomQrcodeScanner
          ref={ref as Ref<ForwardedRef<Html5QrcodeScanner | null>>}
          fps={10}
          qrbox={250}
          disableFlip={false}
          defaultZoomValueIfSupported={4}
          qrCodeSuccessCallback={onNewScanResult}
          qrCodeErrorCallback={(error) => console.log(error)}
          showZoomSliderIfSupported={true}
        /> */}
      </div>
      <div className={styles.scanNowWrapper}>
        <p>
          Scan Shoppers Stop Store <br /> QR Code To Start Shopping
        </p>
        <div className={styles.buttonWrapper}>
          <CustomButton
            onClick={() => handleScanNow()}
            disabled={disabled}
            style={{ padding: "0.5rem 2rem" }}
            variant="dark"
          >
            SCAN NOW
          </CustomButton>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default StoreScanner;

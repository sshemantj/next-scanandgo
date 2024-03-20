import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Html5QrcodeScanner } from "html5-qrcode";
import { processScreenRoutes } from "@/constants/allRoutes";
import { useRouter } from "next/router";
import useWithinRadius from "@/hooks/useWithinRadius";
import styles from "./storeScanner.module.scss";
import CustomButton from "@/component/atoms/customButton";
import CustomHtml5Qrcode from "../customHtml5Qrcode";
import CustomQrScanner from "../customQrScanner";
import { isAndroid, isIphone } from "@/utils/checkDevice";

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
  const router = useRouter();
  const [distance, setDistance] = useState<number>(200);
  const [disabled, setDisabled] = useState(true);
  const [currentDevice, setCurrentDevice] = useState<
    "iphone" | "android" | "other"
  >("other");
  const [storeLocation, setStoreLocation] =
    useState<IStoreLocation>(initialLocationValue);
  const { isWithinRadius, setIsWithinRadius, setStoreDetailsSetup } =
    useWithinRadius();

  useLayoutEffect(() => {
    if (isIphone()) {
      setCurrentDevice("iphone");
    } else if (isAndroid()) {
      setCurrentDevice("android");
    }
  }, []);

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
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
        });
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
    // alert(decodedText);
    onNewScanResult(decodedText);
  };
  const qrCodeErrorCallback = (error: string) => {
    console.log(error);
  };

  return (
    <div className={styles.storeScannerContainer}>
      <div className={styles.qrCodeScanWrapper}>
        {currentDevice === "iphone" && (
          <CustomHtml5Qrcode
            {...{ qrCodeSuccessCallback, qrCodeErrorCallback }}
          />
        )}
        {currentDevice === "android" && (
          <CustomQrScanner
            {...{ qrCodeSuccessCallback, qrCodeErrorCallback }}
          />
        )}
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

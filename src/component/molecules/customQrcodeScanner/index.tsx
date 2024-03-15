import React, { ForwardedRef, useEffect, useRef } from "react";
import styles from "./CustomQrcodeScanner.module.scss";

import {
  Html5QrcodeScanner,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";

interface ICustomQrcodeScanner {
  fps: number;
  qrbox: number;
  aspectRatio?: string;
  verbose?: boolean;
  pause?: boolean;
  showZoomSliderIfSupported?: boolean;
  defaultZoomValueIfSupported?: number;
  disableFlip: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
}

const CustomQrcodeScanner = React.forwardRef<
  ForwardedRef<Html5QrcodeScanner | null>,
  ICustomQrcodeScanner
>((props, ref) => {
  const qrcodeRegionId = "html5qr-code-full-region__2";
  const createConfig = (props: ICustomQrcodeScanner) => {
    const config: any = {};
    const {
      fps,
      qrbox,
      aspectRatio,
      disableFlip,
      showZoomSliderIfSupported,
      defaultZoomValueIfSupported,
    } = props;

    if (fps) config.fps = fps;
    if (qrbox) config.qrbox = qrbox;
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (disableFlip !== undefined) config.disableFlip = disableFlip;
    if (showZoomSliderIfSupported !== undefined)
      config.showZoomSliderIfSupported = showZoomSliderIfSupported;
    config.videoConstraints = {
      facingMode: { exact: window.innerWidth > 768 ? "user" : "environment" },
    };
    if (defaultZoomValueIfSupported !== undefined)
      config.defaultZoomValueIfSupported = defaultZoomValueIfSupported;
    return config;
  };

  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;

    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const newRef = ref as React.MutableRefObject<Html5Qrcode | null>;
    if (newRef && newRef.current === null) {
      newRef.current = new Html5Qrcode(qrcodeRegionId, {
        useBarCodeDetectorIfSupported: true,
        verbose: true,
        // formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      });
    }
    const html5QrcodeScanner = newRef.current;

    setTimeout(() => {
      const container = document.getElementById(qrcodeRegionId);
      if (html5QrcodeScanner && container?.innerHTML == "") {
        html5QrcodeScanner.start(
          { facingMode: "user" },
          undefined,
          props.qrCodeSuccessCallback,
          props.qrCodeErrorCallback
        );
      }
    }, 0);

    // return () => {
    //   if (html5QrcodeScanner) {
    //     html5QrcodeScanner.clear().catch((error: any) => {
    //       console.error("Failed to clear html5QrcodeScanner. ", error);
    //     });
    //   }
    // };
  }, []);

  return <div id={qrcodeRegionId} />;
});

CustomQrcodeScanner.displayName = "CustomQrcodeScanner";

export default CustomQrcodeScanner;

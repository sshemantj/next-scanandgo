import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CryptoJS from "crypto-js";
import VerifyOtp from "@/component/molecules/verifyOtp";
import { isEmailID, isMobileNumber } from "@/utils/common";
import styles from "./loginUsingMobile.module.scss";
import { ErrorEvent, SignInProccess } from "@/constants/analyticsAttributes";
import useStorage from "@/hooks/useStorage";
import { Cookies } from "react-cookie";
import { event } from "@/lib/ga";
import { loginWithOtpAPI } from "@/services/ssoAPI";
import LoaderSs from "@/component/atoms/loader/loaderSS";
import EnterNumScreen from "../EnterNumScreen";
import SignupScreen from "../SignupScreen";

type IAllScreen = "enter_number" | "verify_otp" | "signup_details";

interface IAllScreenMap {
  enter_number: any;
  verify_otp: any;
  signup_details: any;
}

const allScreens: IAllScreenMap = {
  enter_number: EnterNumScreen,
  verify_otp: VerifyOtp,
  signup_details: SignupScreen,
};

const LoginUsingMobile = () => {
  // const [isOtpChecking, setIsOtpChecking] = useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [resendMes, setResendMes] = useState<boolean>(false);
  const [resendOtp, setResendOtp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [helpertext, setHelperText] = useState<string>("");
  const [currScreen, setCurrScreen] = useState<IAllScreen>("enter_number");
  const [isDisabled, setIsDisabled] = useState<boolean>(
    username?.length > 1 ? false : true
  );

  const { getItem } = useStorage();
  const cookie = new Cookies();

  const ResendOtp = async () => {
    const apiResponse = await loginWithOtpAPI(getItem("mobileNumber", "local"));

    const { status, response }: any = apiResponse;

    if (status === "success") {
      const { otpSent, errorCode, errorMessage } = response?.data?.loginWithOtp;

      if (otpSent === true) {
        setResendOtp((v) => !v);
        setResendMes(true);
        // setSnackBarOpen(true);
        setCounter(30);
        // setResetOtpFields((value) => !value);
        // triggerGAEvent(
        //   {
        //     link_text: "edit",
        //     link_url: "na",
        //     widget_description: "Resend",
        //   },
        //   "hyperlink",
        //   "signindetailpage",
        //   "SSO"
        // );
        // setNetworkError(false);
      }
      if (
        errorCode.toLowerCase() === "maxresendattemptsreachedotperror" ||
        errorCode.toLowerCase() === "maxverificationattemptsreachedotperror"
      ) {
        // setOtpErrorSnackBarOpen(true);
        // setSnackBarMessage(errorMessage);
      }
    }
    if (status === "fail") {
      // setNetworkError(true);
      // setNetworkError("Network Error");
    }
  };

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    console.log({ counter });
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // if (isMobileNumber(value)) {
    //   setUserName(value);
    // }
    value?.length <= 10 && Number(value[0]) > 5
      ? setUserName(Math.max(0, parseInt(value)).toString().slice(0, 10))
      : value?.length == 0 && setUserName("");

    if (value?.length == 0) {
      setError(false);
    } else if (value?.length < 10) {
      setError(true);
      setHelperText("Phone number should be a valid number of 10 digits");
      setIsDisabled(true);
    } else {
      setError(false);
      setIsDisabled(false);
    }
  };

  const handleProceed = async () => {
    // router.push(processScreenRoutes.);

    if (isEmailID(username)) {
      let SignInProcced = SignInProccess();
      setError(false);
      // getIsEmail(true);
      localStorage.setItem("Email", username);
      (SignInProcced.page_title = "signindetailpage"),
        (SignInProcced.page_type = "SSO"),
        (SignInProcced.page_path = window?.location?.pathname),
        (SignInProcced.platform =
          window?.innerWidth > 768 ? "PWA" : "MobilePWA"),
        (SignInProcced.method = "email");
      (SignInProcced.link_url = "na"), (SignInProcced.link_text = "email");
      SignInProcced.outbound = false;
      SignInProcced.jounry_type = "signIn";
      SignInProcced.status = "valid";
      let SignInProceed = {
        ...SignInProcced,
        user_info_hash: CryptoJS.MD5(username),
        page_referrer: getItem("previousPagePath", "local"),
        page_referrer_title: getItem("previousPageTitle", "local"),
        platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        customer_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        msd_user_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : "",
        page_path: window?.location?.href,
        page_type: "SSO",
        loyalty_level: getItem("loyalitylevel", "local")
          ? getItem("loyalitylevel", "local")
          : "",
        user_mail_id: CryptoJS.MD5(username),
        user_phone_number: username,
      };
      const param = { params: SignInProceed, action: "signin_proceed" };
      event(param);
    } else if (isMobileNumber(username)) {
      setError(false);
      let SignInProcced = SignInProccess();
      (SignInProcced.page_title = "signindetailpage"),
        localStorage.setItem("mobileNumber", username);
      SignInProcced.method = "mobile";
      (SignInProcced.link_url = "na"), (SignInProcced.link_text = "PROCEED");
      SignInProcced.outbound = false;
      SignInProcced.jounry_type = "signin";
      SignInProcced.status = "valid";
      let SignInProceed = {
        ...SignInProcced,
        user_info_hash: CryptoJS.MD5(username),
        page_referrer:
          JSON?.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPagePath || "na",
        page_referrer_title:
          JSON.parse(localStorage?.getItem("pageReferrer") as string)?.[
            JSON?.parse(localStorage?.getItem("pageReferrer") as string)
              ?.length - 2
          ]?.previousPageTitle || "na",
        platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
        customer_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : cookie.get("MADid"),
        msd_user_id: getItem("customerID", "local")
          ? getItem("customerID", "local")
          : "",
        page_path: window.location.href,
        page_type: "SSO",
        loyalty_level: getItem("loyalitylevel", "local")
          ? getItem("loyalitylevel", "local")
          : "na",
        user_mail_id: "na",
        user_phone_number: username,
        page_slug: getItem("currentPageSlug", "local"),
      };
      const param = { params: SignInProceed, action: "signin_proceed" };

      event(param);
      setIsLoading(true);

      // call api
      const loginWithOtpApiResponse = await loginWithOtpAPI(username);

      const { status, response }: any = loginWithOtpApiResponse;

      if (status === "success") {
        const { otpSent, errorCode, errorMessage } =
          response?.data?.loginWithOtp;

        if (otpSent === true) {
          // setIsOtpChecking(true);
          setCurrScreen("verify_otp");
          // getIsMobile(true);
          // setNetworkError(false);
        }

        if (
          errorCode.toLowerCase() === "maxresendattemptsreachedotperror" ||
          errorCode.toLowerCase() === "maxverificationattemptsreachedotperror"
        ) {
          // setOtpErrorSnackBarOpen(true);
          // setSnackBarMessage(errorMessage);
        }
        setIsLoading(false);
      }
      if (status === "fail") {
        // setNetworkError(true);
        // setNetworkError("Network Error");
        setIsLoading(false);
      }
    } else {
      setError(true);
      let Error = ErrorEvent();
      Error.page_title = "signindetailpage";
      (Error.page_type = "SSO"), (Error.page_path = window.location.href);
      Error.platform = window?.innerWidth > 768 ? "PWA" : "MobilePWA";
      Error.status = "invalid";
      let ErrorDetails = {
        ...Error,
        page_referrer_title: getItem("previousPageTitle", "local"),
        page_referrer: getItem("previousPagePath", "local"),
      };

      const param = { params: ErrorDetails, action: "error" };
      event(param);
      setHelperText("Please enter a valid phone number");
    }
    // getUserInfo(username);
  };

  const RenderScreen = () => {
    const ScreenRender = allScreens[currScreen];
    switch (currScreen) {
      case "enter_number":
        return (
          <ScreenRender
            {...{
              error,
              handleChange,
              handleProceed,
              helpertext,
              isDisabled,
              username,
            }}
          />
        );
      case "verify_otp":
        return <ScreenRender {...{ ResendOtp, counter, setCounter }} />;
      case "signup_details":
        return <ScreenRender />;
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {RenderScreen()}
        </Grid>
      </div>
      {isLoading ? <LoaderSs /> : null}
    </div>
  );
};

export default LoginUsingMobile;

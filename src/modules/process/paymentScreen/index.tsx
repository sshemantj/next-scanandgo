import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";
import PaymentSuccess from "@/component/atoms/paymentSuccess";
import styles from "./paymentScreen.module.scss";
import OfferBox from "@/component/atoms/offerBox";
import SavedPayment from "@/component/atoms/savedPayment";
import upiIcon from "@/images/upiIcon.svg";
import creditCardIcon from "@/images/creditCardIcon.svg";

const paymentListStatic = [
  {
    label: "qw79012@oksbi",
    value: "qw79012@oksbi1",
    supportText: "",
    icon: upiIcon,
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card",
    supportText: "**** 7269",
    icon: creditCardIcon,
  },
  {
    label: "qw79012@oksbi1",
    value: "qw79012@oksbi2",
    supportText: "",
    icon: upiIcon,
  },
  {
    label: "qw79012@oksbi1",
    value: "qw79012@oksbi3",
    supportText: "",
    icon: upiIcon,
  },
];

const PaymentScreen = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = () => {
    setPaymentSuccess(true);
    setTimeout(
      () => router.push(processScreenRoutes.PROCESS_SHOW_QR_SCREEN),
      3000
    );
  };

  return (
    <div className={styles.selectPaymentWrapper}>
      {paymentSuccess ? (
        <PaymentSuccess />
      ) : (
        <div>
          <OfferBox
            count={2}
            description={
              "15% off on SBI credit card. Minimum spent ₹3000, Max discount ₹1000."
            }
          />
          <SavedPayment paymentList={paymentListStatic} />
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;

import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { processScreenRoutes } from "@/constants/allRoutes";
import PaymentSuccess from "@/component/atoms/paymentSuccess";
import styles from "./paymentScreen.module.scss";
import OfferBox from "@/component/atoms/offerBox";
import upiIcon from "@/images/upiicon2.svg";
import creditCardIcon from "@/images/creditCardIcon.svg";
import CustomButton from "@/component/atoms/customButton";
import SavedPayment from "@/component/atoms/savedPayment";
import OtherPayment from "@/component/atoms/otherPayment";

const paymentListStatic = [
  {
    label: "qw79012@oksbi",
    value: "qw79012@oksbi1",
    supportText: "",
    icon: upiIcon,
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card1",
    supportText: "**** 7269",
    icon: creditCardIcon,
  },
  {
    label: "qw79012@oksbi",
    value: "qw79012@oksbi2",
    supportText: "",
    icon: upiIcon,
  },
  {
    label: "qw79012@oksbi",
    value: "qw79012@oksbi3",
    supportText: "",
    icon: upiIcon,
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card2",
    supportText: "**** 7269",
    icon: creditCardIcon,
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card3",
    supportText: "**** 7269",
    icon: creditCardIcon,
  },
];

const otherPaymentStatic = [
  {
    label: "UPI",
    value: "UPI",
    supportText: "PhonePe/Google Pay/BHIM/others",
    icon: upiIcon,
    type: "upi",
  },
  {
    price: "233",
    type: "sswallet",
  },
  {
    label: "Credit Card / Debit Card",
    value: "Credit Card / Debit Card",
    supportText: "",
    icon: upiIcon,
    type: "normal",
  },
  {
    type: "wallet",
    data: [
      {
        label: "First Citizen",
        value: "First Citizen",
        price: "15690",
        type: "normal",
      },
      {
        label: "Gift Card/ E-Gift Voucher",
        value: "Gift Card/ E-Gift Voucher",
        type: "normal",
      },
    ],
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card3",
    supportText: "**** 7269",
    icon: creditCardIcon,
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

  const handlePayClick = () => {
    router.push(processScreenRoutes.PROCESS_SHOW_QR_SCREEN);
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
          <OtherPayment otherPaymentList={otherPaymentStatic} />
          <CustomButton
            onClick={() => handlePayClick()}
            style={{ marginTop: "1rem", width: "100%" }}
            variant="dark"
          >
            PAY
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;

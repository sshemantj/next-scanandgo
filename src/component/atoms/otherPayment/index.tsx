import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Image from "next/image";
import OtherPaymentInner from "./otherPaymentInner";
import styles from "./otherPayment.module.scss";

interface IProps {
  otherPaymentList: {}[];
}

const otherPaymentList: {
  label: string;
  value: string;
  supportText: string;
  icon?: any;
}[] = [
  {
    label: "qw79012@oksbi",
    value: "qw79012@oksbi1",
    supportText: "",
    // icon: upiIcon,
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card1",
    supportText: "**** 7269",
    // icon: creditCardIcon,
  },
  {
    label: "qw79012@oksbi",
    value: "qw79012@oksbi2",
    supportText: "",
    // icon: upiIcon,
  },
  {
    label: "qw79012@oksbi",
    value: "qw79012@oksbi3",
    supportText: "",
    // icon: upiIcon,
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card2",
    supportText: "**** 7269",
    // icon: creditCardIcon,
  },
  {
    label: "HDFC Credit Card",
    value: "HDFC Credit Card3",
    supportText: "**** 7269",
    // icon: creditCardIcon,
  },
];

const OtherPayment = (props: IProps) => {
  const [value, setValue] = useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.otherPaymentWrapper}>
      <div className={styles.titleWrapper}>
        <p>OTHER PAYMENT METHODS</p>
      </div>
      <div className={styles.paymentList}>
        <div className={styles.singlePayment}>
          <FormControl style={{ width: "100%" }}>
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {otherPaymentList.map((item, index) => {
                const { value, ...rest } = item;
                return (
                  <OtherPaymentInner
                    key={index}
                    {...{ itemValue: value, ...rest }}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default OtherPayment;

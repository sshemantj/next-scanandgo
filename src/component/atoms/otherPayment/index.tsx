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
  otherPaymentList: {
    label?: string;
    value?: string;
    supportText?: string;
    icon?: any;
    price?: string;
  }[];
}

const OtherPayment = (props: IProps) => {
  const { otherPaymentList } = props;
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
                return (
                  <OtherPaymentInner
                    key={index}
                    {...{ itemValue: item?.value, ...item }}
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

import React, { useState } from "react";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import styles from "./savedPayment.module.scss";

interface IProps {
  paymentList: {
    label: string;
    value: string;
    icon?: any;
    supportText?: string;
  }[];
}

const SavedPayment = (props: IProps) => {
  const { paymentList } = props;
  const [value, setValue] = useState("female");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className={styles.savedPaymentWrapper}>
      <div className={styles.titleWrapper}>
        <p>SAVED PAYMENT OPTION</p>
      </div>
      <div className={styles.paymentList}>
        <div className={styles.singlePayment}>
          <FormControl style={{ width: "100%" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {paymentList.map((item, index) => {
                const { label, value, supportText, icon } = item;
                return (
                  <div key={index} className={styles.formLabel}>
                    <div className={styles.lhs}>
                      <FormControlLabel
                        label={label}
                        value={value}
                        control={<Radio />}
                      />
                      <p className={styles.supportText}>{supportText}</p>
                    </div>
                    {icon ? (
                      <div className={styles.rhs}>
                        <Image width={50} height={30} src={icon} alt="icon" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SavedPayment;

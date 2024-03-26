import React from "react";
import { Radio } from "@mui/material";
import Image from "next/image";
import styles from "./otherpaymentinner.module.scss";

interface IProps {
  label: string;
  itemValue: string;
  supportText: string;
  icon?: any;
}

const OtherPaymentInner = (props: IProps) => {
  const { label, itemValue, supportText, icon } = props;
  return (
    <div className={styles.otherPaymentInner}>
      <div className={styles.formLabel}>
        <div className={styles.lhs}>
          <label htmlFor={itemValue}>
            <div>
              {label}
              <p className={styles.supportText}>{supportText}</p>
            </div>
          </label>
          <div>
            <Radio id={itemValue} value={itemValue} />
          </div>
        </div>
        {icon ? (
          <div className={styles.rhs}>
            <Image width={50} height={30} src={icon} alt="icon" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OtherPaymentInner;

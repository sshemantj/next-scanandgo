import React from "react";
import { Button, Radio } from "@mui/material";
import Image from "next/image";
import styles from "./otherpaymentinner.module.scss";

interface IProperties {
  label?: string;
  itemValue?: string;
  supportText?: string;
  icon?: any;
  type?: "wallet" | "sswallet" | "upi" | "normal";
  price?: string;
  value?: string;
}

interface IProps extends IProperties {
  data?: IProperties[];
}

const OtherPaymentInner = (props: IProps) => {
  const { type } = props;
  return (
    <div className={styles.otherPaymentInner}>
      {type === "sswallet" ? <SsWallet price={props.price} /> : null}
      {type === "upi" ? <UPIComponent {...{ ...props }} /> : null}
      {type === "normal" ? <NormalComponent {...{ ...props }} /> : null}
      {type === "wallet" ? <WalletComponent {...{ ...props }} /> : null}
    </div>
  );
};

function WalletComponent(props: IProps) {
  const { data, ...rest } = props;
  return (
    <>
      <div className={`${styles.WalletComponent} ${styles.showBorder1}`}>
        <p>Wallet</p>
      </div>
      {data?.map((item, index) => {
        return (
          <NormalComponent
            key={index}
            {...{
              ...item,
              ...rest,
              index,
              itemValue: item.value,
              length: data?.length,
            }}
          />
        );
      })}
    </>
  );
}
function NormalComponent(props: IProps & { index?: number; length?: number }) {
  const { label, itemValue, price, index = 0, length = 0 } = props;
  return (
    <div
      className={`${styles.formLabel} ${
        length - 1 !== index && styles.showBorder
      }`}
    >
      <div className={styles.lhs}>
        <label htmlFor={itemValue}>
          <div className={styles.labelInner}>
            <p className={styles.label}>{label}</p>
            {price ? (
              <p className={`${styles.supportText} ${styles.normal}`}>
                Available balance: ₹{price}
              </p>
            ) : null}
          </div>
        </label>
        <div className={styles.radioWrapper}>
          <Radio id={itemValue} value={itemValue} />
        </div>
      </div>
    </div>
  );
}
function UPIComponent(props: IProps) {
  const { label, itemValue, supportText, icon } = props;
  return (
    <div className={`${styles.formLabel} ${styles.showBorder}`}>
      {icon ? (
        <div className={styles.rhs}>
          <Image width={40} height={40} src={icon} alt="icon" />
        </div>
      ) : null}
      <div className={styles.lhs}>
        <label htmlFor={itemValue}>
          <div className={styles.labelInner}>
            <p>{label}</p>
            <p className={styles.supportText}>{supportText}</p>
          </div>
        </label>
        <div className={styles.radioWrapper}>
          <Radio id={itemValue} value={itemValue} />
        </div>
      </div>
    </div>
  );
}
function SsWallet({ price }: { price: string | undefined }) {
  const handleRedeem = () => {
    alert("redeem clicked");
  };
  return (
    <div
      style={{
        margin: "1rem 0",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ fontSize: "14px" }}>Shoppers Stop Wallet</p>
        <p style={{ fontSize: "12px", color: "#059669" }}>
          Available balance: ₹{price}
        </p>
      </div>
      <div>
        <p
          onClick={() => handleRedeem()}
          style={{ fontSize: "12px", color: "#2463EB" }}
        >
          Redeem
        </p>
      </div>
    </div>
  );
}

export default OtherPaymentInner;

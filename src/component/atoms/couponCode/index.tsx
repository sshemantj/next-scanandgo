import React, { useState } from "react";
import styles from "./couponCode.module.scss";
import CustomTextField from "../customTextField";

const CouponCode = () => {
  const [coupon, setCoupon] = useState<string>("");

  const handleApplyCoupon = () => {
    alert("apply coupon clicked");
  };

  return (
    <div className={styles.couponCodeWrapper}>
      <CustomTextField
        placeholder="Have a Coupon Code?"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        sx={{
          "& input::placeholder": {
            fontSize: "14px",
          },
          "& fieldset": {
            border: "none",
          },
          "& .Mui-focused": {
            borderColor: "none",
            border: "1px dashed #CA594D !imortant",
          },
        }}
      />
      <p onClick={() => handleApplyCoupon()} className={styles.applyCoupon}>
        Apply Coupon
      </p>
    </div>
  );
};

export default CouponCode;

import React from "react";
import Image from "next/image";
import infoIcon from "@/images/info.svg";
import rightTickIcon from "@/images/rightTick.svg";
import styles from "./priceDetails.module.scss";

const PriceDetails = () => {
  return (
    <div className={styles.priceDetailsWrapper}>
      <div className={styles.headlineWrapper}>
        <p className={styles.title}>PRICE DETAILS</p>
        <p className={styles.viewTag}>View 2 items</p>
      </div>
      <div className={styles.distributionWrapper}>
        <div className={styles.distributionInner}>
          <p className={styles.priceTitle}>Total MRP</p>
          <p className={styles.price}>`2,598</p>
        </div>
        <div className="dashed-border"></div>
        <div className={styles.distributionInner}>
          <p className={styles.priceTitle}>Offer Discount</p>
          <p className={styles.price}>- `598</p>
        </div>
        <div className={styles.distributionInner}>
          <p className={styles.priceTitle}>SS Wallet</p>
          <p className={styles.price}>- `58</p>
        </div>
        <div className={styles.distributionInner}>
          <p className={styles.priceTitle}>First Citizen</p>
          <p className={styles.price}>- `120</p>
        </div>
        <div className={styles.distributionInner}>
          <p className={styles.priceTitle}>Gift Card</p>
          <p className={styles.price}>- `500</p>
        </div>
        <div className={`${styles.distributionInner} ${styles.total}`}>
          <p className={`${styles.priceTitle} ${styles.total}`}>
            Your Total Savings
          </p>
          <p className={`${styles.price} ${styles.total}`}>- `820</p>
        </div>
        <div
          className="dashed-border"
          style={{
            margin: "0.5rem 0 0 0",
          }}
        ></div>
        <div className={`${styles.distributionInner} ${styles.delivery}`}>
          <div className={`${styles.deliveryContainer}`}>
            <div className={styles.deliveryInner}>
              <p>Delivery Fee</p>
              <Image src={infoIcon} width={20} height={20} alt="info" />
            </div>
            <div className={styles.giftWrapContainer}>
              <p>Gift Wrap</p>
            </div>
          </div>
          <p className={`${styles.discount}`}>
            <s>`100</s> Free
          </p>
        </div>
        <div
          className="dashed-border"
          style={{
            margin: "0 0 0.5rem 0",
          }}
        ></div>
        <div className={`${styles.distributionInner}`}>
          <div className={`${styles.freeSample}`}>
            <Image
              src={rightTickIcon}
              width={20}
              height={20}
              alt="right tick"
            />
            <p>Free Sample Added!</p>
          </div>
          <p className={`${styles.price}`}>- `25</p>
        </div>
      </div>
      <div className={styles.totalPayableamt}>
        <p className={styles.title}>Total Payable amount</p>
        <p className={styles.price}>`1865</p>
      </div>
    </div>
  );
};

export default PriceDetails;

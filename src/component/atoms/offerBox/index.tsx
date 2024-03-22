import React from "react";
import Image from "next/image";
import offerIcon from "@/images/discount.svg";
import styles from "./offerBox.module.scss";

interface IProps {
  count?: number;
  description?: string | JSX.Element;
}

const OfferBox = (props: IProps) => {
  const { count = 0, description = "" } = props;
  return (
    <div className={styles.offerBoxWrapper}>
      <div className={styles.headingContainer}>
        <p className={styles.title}>OFFERS FOR YOU</p>
        {count && count > 1 ? (
          <p className={styles.offerCount}>+{count} Offers</p>
        ) : null}
      </div>
      <div className={styles.descrContainer}>
        <Image
          width={40}
          height={40}
          className={styles.image}
          src={offerIcon}
          alt="discount"
        />
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default OfferBox;

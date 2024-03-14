import React from "react";
import Image from "next/image";
import loaderImg from "@/images/newLoader.webp";
import styles from "./ssLoader.module.scss";

const LoaderSs = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderContainer}>
        <Image
          className={styles.img}
          src={loaderImg}
          alt="loader"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default LoaderSs;

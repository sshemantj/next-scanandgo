import Image from "next/image";
import scanImg from "@/images/scan-img.png";
import CustomButton from "@/component/atoms/customButton";
import { useRouter } from "next/router";
import { allRoutes } from "@/constants/allRoutes";
import styles from "./homemodule.module.scss";

const HomeModule = () => {
  const router = useRouter();
  const handleScanNow = () => {
    router.push(allRoutes.STORE_SCANNER);
  };
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeContainer}>
        <p className={styles.headingWrapper}>
          WELCOME TO <br /> SHOPPERS STOP - MALAD
        </p>
        <div>
          <Image
            loading="eager"
            width={200}
            height={200}
            src={scanImg}
            alt="scan imgage"
          />
        </div>
        <p className={styles.scanAndGoPara}>SCAN & GO</p>
        <p className={styles.description}>
          Now Enjoy Superfast Checkout <br /> For Less Than 10 Products
        </p>
        <CustomButton
          onClick={() => handleScanNow()}
          style={{
            margin: "1.5rem 0 0 0",
            padding: "0.2rem 2rem",
            width: "100%",
          }}
          variant="dark"
        >
          SCAN NOW
        </CustomButton>
      </div>
    </div>
  );
};

export default HomeModule;

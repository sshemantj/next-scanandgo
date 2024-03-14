import StoreScanner from "@/component/molecules/storeScanner";
import styles from "./homemodule.module.scss";

const HomeModule = () => {
  return (
    <div className={styles.homeWrapper}>
      <StoreScanner />
    </div>
  );
};

export default HomeModule;

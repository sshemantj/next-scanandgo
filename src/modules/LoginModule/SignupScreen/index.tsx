import React from "react";
import styles from "./signupscreen.module.scss";

interface ISignupScreen {}

const SignupScreen = (props: ISignupScreen) => {
  return (
    <div className={styles.signupScreenWrapper}>
      <div className={styles.headingWrapper}>
        <p className={styles.mainHeading}>ALMOST THERE !</p>
        <p className={styles.subHeading}>
          Complete your profile for the best experience
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;

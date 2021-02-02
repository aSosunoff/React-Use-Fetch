import React from "react";
import styles from "./Spinner.module.scss";

const Spinner: React.FC = () => {
  return (
    <div className={styles["lds-css"]}>
      <div className={styles["lds-double-ring"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;

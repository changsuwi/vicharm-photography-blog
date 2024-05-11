import * as React from "react";

import styles from "../styles/components/TopLanding.module.scss";
import MyImage from "./common/MyImage";

export default function TopLanding() {
  return (
    <div className={styles.landing}>
      <MyImage
        src="/九份/50185219987_dd610f128f_o_xEr4kVwGoaE.jpeg?updatedAt=1637218851648"
        alt=""
        className={styles.background}
        fill
        loading="eager"
        priority
      />
      <div className={styles["text-container"]}>
        <span className={styles.title}>Vicharm 攝影旅行日誌</span>
        <p className={styles.content}>在旅行途中，成就更美好的意義</p>
      </div>
    </div>
  );
}

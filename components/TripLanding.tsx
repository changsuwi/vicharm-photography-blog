import Image from "next/image";
import router from "next/router";
import * as React from "react";

import styles from "../styles/components/TripLanding.module.scss";
import MyImage from "./common/MyImage";

export default function TripLanding() {
  return (
    <div className={styles["trip-landing"]}>
      <MyImage
        src="/鼻頭角/50319789558_7ae74799a3_o_nDz_u3VUP.jpeg"
        alt=""
        className={styles.background}
        loading="lazy"
        fill
      />
      <div className={styles.container}>
        <span>探索美好旅程</span>
        <p>春季櫻花飛舞 / 夏季海風吹拂</p>
        <p>秋季雲海秋芒 / 冬季白雪霧淞</p>
        <button className={styles["cta"]} onClick={() => router.push("/trip")}>
          旅程指南列表
        </button>
      </div>
    </div>
  );
}

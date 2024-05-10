import router from 'next/router' 
import * as React from "react";

import styles from "../styles/components/ArticleLanding.module.scss";

export default function TripLanding() {
    
  return (
    <div className={styles["article-landing"]}>
      <img src="https://ik.imagekit.io/vicharm/九份/50188569871_7430e1dc46_o_i701rkfVT.jpeg?updatedAt=1637218853301" alt="" className={styles.background} loading="lazy"/>
      <div className={styles.container}>
        <span>旅行紀錄</span>
        <p>分享旅行遇到的點點滴滴</p>
        <p>美景與回憶都值得紀念</p>
        <button className={styles["cta"]} onClick={() => router.push("/article")}>旅行紀錄列表</button>
      </div>
    </div>
  )

}
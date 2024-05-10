import * as React from "react";

import styles from "../styles/components/Introduction.module.scss";

export default function Introduction() {
    
  return (
    <div className={styles.introduction}>
      <div className={styles["photo-container"]}>
        <div className={styles["base-layer"]}/>
        <div className={styles.photo} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <span>Vicharm photography</span>
        </div>
                
        <p>
                    Hello 我是Vicharm，
        </p>
        <p>
                    目前是WFH軟體工程師/旅行風景攝影愛好者，
        </p>
        <p>
                    旅行過台灣許多鄉鎮，看過許多台灣的美，
        </p>
        <p>
                    會在這裡分享旅行中所看到的風景, 故事與攻略
        </p>
      </div>
    </div>
  )
}
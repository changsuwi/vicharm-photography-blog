import * as React from "react";
import router from 'next/router';
import styles from "../styles/components/TripLanding.module.scss";

export default class TripLanding extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <div className={styles["trip-landing"]}>
                <div className={styles.container}>
                    <span>探索美好旅程</span>
                    <p>春季櫻花飛舞 / 夏季海風吹拂</p>
                    <p>秋季雲海秋芒 / 冬季白雪霧淞</p>
                    <button className={styles["cta"]} onClick={() => router.push("/trip")}>旅程指南列表</button>
                </div>
            </div>
        )
    }
}
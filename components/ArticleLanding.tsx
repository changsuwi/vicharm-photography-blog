import * as React from "react";
import router from 'next/router' 
import styles from "../styles/components/ArticleLanding.module.scss";

export default class TripLanding extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <div className={styles["article-landing"]}>
                <div className={styles.container}>
                    <span>旅行紀錄</span>
                    <p>分享旅行遇到的點點滴滴</p>
                    <p>美景與回憶都值得紀念</p>
                    <button className={styles["cta"]} onClick={() => router.push("/article")}>旅行紀錄列表</button>
                </div>
            </div>
        )
    }
}
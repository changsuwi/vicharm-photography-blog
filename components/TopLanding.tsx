import * as React from "react";
import styles from "../styles/components/TopLanding.module.scss";

export default class TopLanding extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <div className={styles.landing}>
                <div className={styles["text-container"]}>
                    <span className={styles.title}>Vicharm 攝影與旅行日誌</span>
                    <p className={styles.content}>在旅行途中，成就更美好的意義</p>
                </div>
                
            </div>
        )
    }
}
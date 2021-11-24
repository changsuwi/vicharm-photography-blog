import * as React from "react";
import Link from 'next/link'
import styles from "../styles/components/Trips.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";

interface Props {
    trips: any,
    isListPage: boolean
}
export default class Trips extends React.Component<Props, any> {
    render(): JSX.Element {
        const trips = this.props.trips.length > 3 ? this.props.trips.slice(0, 3) : this.props.trips;
        return (
            <div className={`${styles.trips}  ${this.props.isListPage ? styles.list : ""}`}>
                {trips.map((trip: any) => (
                    <Link href={`/trip/${trip.id}`} key={trip.id}>
                        <div className={styles.trip}>
                            <div className={styles["photo-container"]}>
                                <img src={trip.img} alt="" className={styles.photo}/>
                                <div className={styles.overlay}>
                                    <FontAwesomeIcon icon={faArrowRight} width="24px" height="24px" color="#f8f8f7"/>
                                </div>
                            </div>
                            <div className={styles.container}>
                                <span className={styles.title}>{trip.title}</span>
                                <div className={styles.content}>
                                    {trip.preview}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}
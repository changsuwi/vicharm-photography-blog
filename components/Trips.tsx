import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import * as React from "react";

import styles from "../styles/components/Trips.module.scss";

interface Props {
    trips: any,
    isListPage: boolean
}
export default function Trips(props: Props) {
    
  const trips = props.trips.length > 3 && !props.isListPage ? props.trips.slice(0, 3) : props.trips;
  return (
    <div className={`${styles.trips}  ${props.isListPage ? styles.list : ""}`}>
      {trips.map((trip: any) => (
        <Link href={`/trip/${trip.id}`} key={trip.id}>
          <div className={styles.trip} data-testid="trip">
            <div className={styles["photo-container"]}>
              <img src={trip.img} alt="" className={styles.photo} loading="lazy"/>
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
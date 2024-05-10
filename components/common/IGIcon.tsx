import styles from "../../styles/components/Layout.module.scss";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Amplitude from "../../lib/Amplitude";

export function IGIcon() {
  return (
    <div className={styles["social-media-list"]}>
      <Link
        href={"https://www.instagram.com/vic_chang_life/"}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          Amplitude.analyticsEvent({
            category: "Navigation IG",
            action: "Click Header IG",
          });
        }}
      >
        <a className={styles.ig}>
          <FontAwesomeIcon icon={faInstagram} width="18px" />
        </a>
      </Link>
    </div>
  );
}

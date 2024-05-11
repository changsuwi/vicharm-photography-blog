import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import Amplitude from "../../lib/Amplitude";
import styles from "../../styles/components/Layout.module.scss";

export function IGIcon() {
  return (
    <div className={styles["social-media-list"]}>
      <Link
        href={process.env.IG_URL || "https://www.instagram.com/vic_chang_life/"}
        target="_blank"
        rel="noreferrer"
        className={styles.ig}
        onClick={() => {
          Amplitude.analyticsEvent({
            category: "Navigation IG",
            action: "Click Header IG",
          });
        }}
        aria-label="Instagram"
      >
        <FontAwesomeIcon icon={faInstagram} width="18px" />
      </Link>
    </div>
  );
}

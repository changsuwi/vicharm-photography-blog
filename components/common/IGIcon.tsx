import styles from "../../styles/components/Layout.module.scss";
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
    onClick: () => void
}
export function IGIcon(props: Props) {
    const {onClick} = props;
    return (
        <div className={styles["social-media-list"]}>
            <a 
                href="https://www.instagram.com/vicharm_photography/"
                className={styles.ig}
                onClick={onClick}
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon icon={faInstagram} width="18px"/>
            </a>
        </div>
    )
}

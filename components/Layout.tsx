import * as React from "react";
import Link from 'next/link'

import styles from "../styles/components/Layout.module.scss";

import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Amplitude from "../lib/Amplitude";
import { useState } from "react";

interface Props {
    children: any
}
export default function Articles(props: Props) {

    const [sticky, setSticky] = useState(false)

    const handleScroll = () => {
        if (window.pageYOffset > window.screen.height * 0.08 && !sticky) {
            setSticky(true);
        } else if (window.pageYOffset === 0 && sticky) {
            setSticky(false);
        }
    }

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])
    
    
    return (
        <div className={styles.layout}>
            <div className={`${styles.header} ${sticky && styles.sticky}`} >
                <Link href="/">
                    <div className={styles.icon}/>
                </Link>
                
                <div className={styles["nav-list"]}>
                    <Link href="/trip">
                        <a>旅程指南</a>
                    </Link>

                    <Link href="/article">
                        <a className="mr-0">旅行紀錄</a>
                    </Link>

                    <Link href="/article" >
                        <a className="hide">攝影紀錄</a>
                    </Link>

                    <Link href="/article" >
                        <a className="hide">景點列表</a>
                    </Link>
                </div>
                <div className={styles["social-media-list"]}>
                    <a 
                        href="https://www.instagram.com/vicharm_photography/"
                        className={styles.ig}
                        onClick={() => Amplitude.analyticsEvent({
                            category: "Navigation IG",
                            action: "Click Header IG"
                        })}
                    >
                        <FontAwesomeIcon icon={faInstagram} width="18px" height="18px"/>
                    </a>
                </div>
            </div>
            {props.children}
            <footer className={styles.footer}>
                <p>© 2021 Vicharm. All rights reserved</p>
                <div className={styles["social-media-list"]}>
                    <a 
                        href="https://www.instagram.com/vicharm_photography/"
                        className={styles.ig}
                        onClick={() => Amplitude.analyticsEvent({
                            category: "Navigation IG",
                            action: "Click Footer IG"
                        })}
                    >
                        <FontAwesomeIcon icon={faInstagram} width="18px"/>
                    </a>
                </div>
            </footer>
        </div>
        
    )
    
}
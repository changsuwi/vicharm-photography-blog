import * as React from "react";
import Link from 'next/link'

import styles from "../styles/components/Layout.module.scss";

import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Amplitude from "../lib/Amplitude";

interface Props {
    children: any
}
export default class Articles extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
    
        this.state = {
            sticky: false,
        };
    }

    handleScroll(): void {
        if (window.pageYOffset > window.screen.height * 0.08 && !this.state.sticky) {
            this.setState({ sticky: true });
        } else if (window.pageYOffset === 0 && this.state.sticky) {
            this.setState({ sticky: false });
        }
      }
    
    componentDidMount(): void {
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.handleScroll);
    }
    
    render(): JSX.Element {
        return (
            <div className={styles.layout}>
                <div className={`${styles.header} ${this.state.sticky && styles.sticky}`} >
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
                {this.props.children}
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
}
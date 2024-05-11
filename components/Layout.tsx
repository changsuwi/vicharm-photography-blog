import Link from "next/link";
import * as React from "react";
import { useState } from "react";

import styles from "../styles/components/Layout.module.scss";
import GA from "./common/GA";
import { IGIcon } from "./common/IGIcon";

interface Props {
  children: any;
}
export default function Articles(props: Props) {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > window.screen.height * 0.08 && !sticky) {
      setSticky(true);
    } else if (window.pageYOffset === 0 && sticky) {
      setSticky(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <GA />
      <div className={styles.layout}>
        <div className={`${styles.header} ${sticky && styles.sticky}`}>
          <Link href="/">
            <div className={styles.icon} />
          </Link>

          <div className={styles["nav-list"]}>
            <Link href="/trip">
              旅程指南
            </Link>

            <Link href="/article" className="mr-0">
              旅行紀錄
            </Link>

            <Link href="/article" className="hide">
              攝影紀錄
            </Link>

            <Link href="/article" className="hide">
              景點列表
            </Link>
          </div>
          <IGIcon />
        </div>
        {props.children}
        <footer className={styles.footer}>
          <p>© 2023 Vicharm. All rights reserved</p>
          <IGIcon />
        </footer>
      </div>
    </>
  );
}

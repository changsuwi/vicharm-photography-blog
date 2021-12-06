import * as React from "react";
import { getSortedPostsData } from '../../lib/post'
import Head from 'next/head'
import { GetStaticProps } from "next";

import Trips from "../../components/Trips"
import styles from "../../styles/TripList.module.scss";

import Amplitude from "../../lib/Amplitude";

interface Props {
    postData: any
}

export const getStaticProps: GetStaticProps = async (content: any) => {
    const postData = await getSortedPostsData('trips')
    return {
      props: {
        postData
      }
    }
}

export default class TripList extends React.Component<Props, any> {
    private maxScroll = 0;

    componentDidMount(): void {
        Amplitude.init();
        Amplitude.analyticsPageView("/trip-list");

        document.addEventListener("scroll", this.scrollHandler)
    }

    scrollHandler(e: Event): void {
      const currentScrollY = window.scrollY;
      if(currentScrollY > this.maxScroll) this.maxScroll = currentScrollY;
    }

    componentWillUnmount(): void {
      document.removeEventListener("scroll", this.scrollHandler);

      Amplitude.leavePageEvent(document, "trip-list", this.maxScroll, "trip-list");
    }
    
    render(): JSX.Element {
        return (
            <div className={styles["trip-list"]}>
                <Head>
                    <title>旅程指南</title>
                    <meta name="description" content="秘境美景攻略與推薦旅程都在這" />
                    <meta property="og:title" content="Vicharm 攝影與旅行日誌-旅程指南" />
                    <meta property="og:description" content="秘境美景攻略與推薦旅程都在這" />
                    <meta property="og:image" content="/favicon.ico" />
                </Head>
                <div className={styles["top-landing"]}>
                    <img src="https://ik.imagekit.io/vicharm/鼻頭角/50319789558_7ae74799a3_o_nDz_u3VUP.jpeg?updatedAt=1637215858452" alt="" className={styles.background} loading="lazy"/>
                </div>
                <Trips trips={this.props.postData} isListPage={true}/>
            </div>
            
        )
    }
}
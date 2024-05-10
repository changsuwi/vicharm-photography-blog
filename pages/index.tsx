import { GetStaticProps } from "next";
import Head from 'next/head'
import React, { useEffect } from "react";

import ArticleLanding from '../components/ArticleLanding'
import Articles from '../components/Articles'
import Introduction from '../components/Introduction'
import TopLanding from '../components/TopLanding'
import TripLanding from '../components/TripLanding'
import Trips from "../components/Trips";
import Amplitude from "../lib/Amplitude";
import { getSortedPostsData } from '../lib/post'
import styles from '../styles/Home.module.scss'

interface Props {
  tripData: any;
  articleData: any;
}

export const getStaticProps: GetStaticProps = async (content: any) => {
  const articleData = await getSortedPostsData('articles');
  const tripData = await getSortedPostsData('trips');
  return {
    props: {
      articleData,
      tripData
    }
  }
}

export default function Home(props: Props) {
  let maxScroll = 0;

  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if(currentScrollY > maxScroll) maxScroll = currentScrollY;
  }

  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView("/");

    return () => {
      document.removeEventListener("scroll", scrollHandler);
      Amplitude.leavePageEvent(document, "home", maxScroll, "home");
    }
  }, []) 

  
  return(
    <div className={styles.container}>
      <Head>
        <title>Vicharm 攝影與旅行日誌</title>
        <meta name="description" content="台灣旅行指南與旅行紀錄，用相機紀錄旅行的美好" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Vicharm 攝影與旅行日誌" />
        <meta property="og:description" content="台灣旅行指南與旅行紀錄，用相機紀錄旅行的美好" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TopLanding />
        <Introduction />
        <TripLanding />
        <Trips trips={props.tripData} isListPage={false}/>
        <ArticleLanding />
        <Articles articles={props.articleData} isListPage={false}/>
      </main>
    </div>
  )

}
import React from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import Introduction from '../components/Introduction'
import TopLanding from '../components/TopLanding'
import { GetStaticProps } from "next";
import { getSortedPostsData } from '../lib/post'
import ArticleLanding from '../components/ArticleLanding'
import Articles from '../components/Articles'
import TripLanding from '../components/TripLanding'
import Trips from "../components/Trips";

import Amplitude from "../lib/Amplitude";

interface Props {
  postData: any
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

export default class Home extends React.Component<any, any> {
  private maxScroll = 0;

  componentDidMount(): void {
    Amplitude.init();
    Amplitude.analyticsPageView("/");
  }

  scrollHandler(e: Event): void {
    const currentScrollY = window.scrollY;
    if(currentScrollY > this.maxScroll) this.maxScroll = currentScrollY;
  }

  componentWillUnmount(): void {
    document.removeEventListener("scroll", this.scrollHandler);

    Amplitude.leavePageEvent(document, "home", this.maxScroll, "home");
  }

  render(): JSX.Element {
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
          <Trips trips={this.props.tripData} isListPage={false}/>
          <ArticleLanding />
          <Articles articles={this.props.articleData} isListPage={false}/>
        </main>
      </div>
    )
  }

}
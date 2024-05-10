import { GetStaticProps } from "next";
import Head from 'next/head'
import * as React from "react";
import { useEffect } from "react";

import Articles from "../../components/Articles";
import Amplitude from "../../lib/Amplitude";
import { getSortedPostsData } from '../../lib/post'
import styles from "../../styles/ArticleList.module.scss";

interface Props {
    postData: any
}

export const getStaticProps: GetStaticProps = async (content: any) => {
  const postData = await getSortedPostsData('articles')
  return {
    props: {
      postData
    }
  }
}

export default function ArticleList(props: Props) {
  let maxScroll = 0;
    
  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if(currentScrollY > maxScroll) maxScroll = currentScrollY;
  }

  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView("/article-list");

    return () => {
      document.removeEventListener("scroll", scrollHandler);

      Amplitude.leavePageEvent(document, "article-list", maxScroll, "article-list");
    }
  }, [])

  return (
    <div className={styles["article-list"]}>
      <Head>
        <title>旅行紀錄</title>
        <meta name="description" content="用相機與文字記錄每次旅行的美好"/>
        <meta property="og:title" content="Vicharm 攝影與旅行日誌-旅行紀錄" />
        <meta property="og:description" content="用相機與文字記錄每次旅行的美好" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <div className={styles["top-landing"]}>
        <img src="https://ik.imagekit.io/vicharm/九份/50188569871_7430e1dc46_o_i701rkfVT.jpeg?updatedAt=1637218853301" alt="" className={styles.background} loading="lazy"/>
      </div>
      <Articles articles={props.postData} isListPage={true}/>
    </div>
        
  )
}
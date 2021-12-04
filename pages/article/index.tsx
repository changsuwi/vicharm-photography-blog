import * as React from "react";
import { getSortedPostsData } from '../../lib/post'
import Head from 'next/head'

import { GetStaticProps } from "next";
import Articles from "../../components/Articles";
import styles from "../../styles/ArticleList.module.scss";

import Amplitude from "../../lib/Amplitude";

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

export default class ArticleList extends React.Component<Props, any> {
    private maxScroll = 0;

    componentDidMount(): void {
        Amplitude.init();
        Amplitude.analyticsPageView("/article-list");
    }

    scrollHandler(e: Event): void {
        const currentScrollY = window.scrollY;
        if(currentScrollY > this.maxScroll) this.maxScroll = currentScrollY;
      }
  
    componentWillUnmount(): void {
        document.removeEventListener("scroll", this.scrollHandler);

        Amplitude.leavePageEvent(document, "article-list", this.maxScroll, "article-list");
    }

    render(): JSX.Element {
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
                    {/* 放標題     */}
                </div>
                <Articles articles={this.props.postData} isListPage={true}/>
            </div>
            
        )
    }
}
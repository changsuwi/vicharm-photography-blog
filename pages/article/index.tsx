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
    componentDidMount(): void {
        Amplitude.init();
        Amplitude.analyticsPageView("/article-list");
    }

    render(): JSX.Element {
        return (
            <div className={styles["article-list"]}>
                <Head>
                    <title>旅行紀錄</title>
                </Head>
                <div className={styles["top-landing"]}>
                    {/* 放標題     */}
                </div>
                <Articles articles={this.props.postData} isListPage={true}/>
            </div>
            
        )
    }
}
import * as React from "react";
import { getSortedPostsData } from '../../lib/post'
import Head from 'next/head'

import { GetStaticProps } from "next";
import Trips from "../../components/Trips"
import styles from "../../styles/TripList.module.scss";

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
    render(): JSX.Element {
        return (
            <div className={styles["trip-list"]}>
                <Head>
                    <title>旅行紀錄</title>
                </Head>
                <div className={styles["top-landing"]}>
                    {/* 放標題     */}
                </div>
                <Trips trips={this.props.postData} isListPage={true}/>
            </div>
            
        )
    }
}
import * as React from "react";
import { getAllPostIds, getPostData } from '../../lib/post'
import Head from 'next/head'

import styles from "../../styles/Post.module.scss";
import { GetStaticProps } from "next";

import Amplitude from "../../lib/Amplitude";

interface Props {
    postData: any
}

export const getStaticProps: GetStaticProps = async (content: any) => {
    const postData = await getPostData(content.params.id, 'articles')
    return {
      props: {
        postData
      }
    }
}
  
export async function getStaticPaths() {
    const paths = getAllPostIds('articles')
    return {
      paths,
      fallback: false
    }
}

export default class Post extends React.Component<Props, any> {

    componentDidMount(): void {
        Amplitude.init();
        Amplitude.analyticsPageView("/article", {
          id: this.props.postData.id
        });
    }
    render(): JSX.Element {
        return (
            <div className={styles.article}>
              <Head>
                <title>{this.props.postData.title}</title>
                <meta name="description" content={this.props.postData.hint}/>
              </Head>
              <article>
                <img src={this.props.postData.img} alt="" className={styles["top-img"]}/>
                <div className={styles.container}>
                    <h1 >{this.props.postData.title}</h1>
                    <div className={styles.tags}>
                        {
                            this.props.postData.tags.map((tag: any) => {
                                return (
                                    <a href={`/tag/${tag}`} target="_blank" rel="noreferrer" key={tag}>{`#${tag}`}</a>
                                )
                            })
                        }
                    </div>
                    <div className={styles.hint}>{this.props.postData.hint}</div>
                    <p className={styles.season}>
                        適合季節：{this.props.postData.season}
                    </p>
                    <iframe
                        src={this.props.postData.map}
                        className={styles.map}
                        allowFullScreen={true}
                        loading="lazy">    
                    </iframe>
                    
                    <div>
                    {/* <Date dateString={postData.date} /> */}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: this.props.postData.contentHtml }} className={styles.content} />
                </div>
                
              </article>
            </div>
          )
    }
}
import * as React from "react";
import { getAllPostIds, getPostData } from '../../lib/post'
import Head from 'next/head'
import { GetStaticProps } from "next";

import styles from "../../styles/Post.module.scss";

import Amplitude from "../../lib/Amplitude";

interface Props {
    postData: any
}

export const getStaticProps: GetStaticProps = async (content: any) => {
    const postData = await getPostData(content.params.id, 'trips')
    return {
      props: {
        postData
      }
    }
}
  
export async function getStaticPaths() {
    const paths = getAllPostIds('trips')
    return {
      paths,
      fallback: false
    }
}

export default class Post extends React.Component<Props, any> {
    private maxScroll = 0;
    constructor(props: any) {
      super(props);
      this.scrollHandler = this.scrollHandler.bind(this);
    } 

    componentDidMount(): void {
        Amplitude.init();
        Amplitude.analyticsPageView("/trip", {
          id: this.props.postData.id
        });

        document.addEventListener("scroll", this.scrollHandler)
    }

    scrollHandler(e: Event): void {
      const currentScrollY = window.scrollY;
      if(currentScrollY > this.maxScroll) this.maxScroll = currentScrollY;
    }

    componentWillUnmount(): void {
      document.removeEventListener("scroll", this.scrollHandler);

      const body = document.body;
      const html = document.documentElement;
      const pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
      
      Amplitude.analyticsEvent({
        category: "Effectiveness trip",
        action: "leave trip",
        id: this.props.postData.id,
        maxScrollPercentage: Math.round(((this.maxScroll + html.clientHeight) / pageHeight) * 100)
      })
    }

    render(): JSX.Element {
        return (
            <div className={styles.article}>
              <Head>
                <title>{this.props.postData.title}</title>
                <meta name="description" content={`
                  ${this.props.postData.hint} 標籤: ${this.props.postData.tags.toString()}
                `}/>
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
                    { this.props.postData.season &&
                    <p className={styles.season}>
                        適合季節：{this.props.postData.season}
                    </p>
                    }
                    { this.props.postData.map &&
                    <iframe
                        src={this.props.postData.map}
                        className={styles.map}
                        allowFullScreen={true}
                        loading="lazy">    
                    </iframe>
                    }
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
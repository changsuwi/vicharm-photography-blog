import { GetStaticProps } from "next";
import Head from 'next/head'
import Image from "next/image";
import * as React from "react";
import { useEffect } from "react";

import Amplitude from "../../lib/Amplitude";
import { getAllPostIds, getPostData } from '../../lib/post'
import styles from "../../styles/Post.module.scss";

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

export default function Post(props: Props) {
  let maxScroll = 0;

  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if(currentScrollY > maxScroll) maxScroll = currentScrollY;
  }
    
  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView("/trip", {
      id: props.postData.id
    });

    document.addEventListener("scroll", scrollHandler)

    return () => {
      document.removeEventListener("scroll", scrollHandler);

      Amplitude.leavePageEvent(document, props.postData.id, maxScroll, "trip");
    }
  }, []) 


    
  return (
    <div className={styles.article}>
      <Head>
        <title>{props.postData.title}</title>
        <meta name="description" content={`
              ${props.postData.hint}
              標籤: ${props.postData.tags.toString()}
              關鍵字: ${props.postData.keyword.toString()}
            `}/>
        <meta property="og:title" content={props.postData.title} />
        <meta property="og:description" content={props.postData.hint} />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <article>
        <div className={styles["top-img-container"]}>
          <Image src={props.postData.img} alt="" loading="eager"  layout="fill" objectFit="cover" priority />
        </div>
        <div className={styles.container}>
          <h1 >{props.postData.title}</h1>
          <div className={styles.tags}>
            {
              props.postData.tags.map((tag: any) => {
                return (
                  <a href={`/tag/${tag}`} target="_blank" rel="noreferrer" key={tag}>{`#${tag}`}</a>
                )
              })
            }
          </div>
          <div className={styles.hint}>{props.postData.hint}</div>
          { props.postData.season &&
                <p className={styles.season}>
                    適合季節：{props.postData.season}
                </p>
          }
          { props.postData.map &&
                <iframe
                  src={props.postData.map}
                  className={styles.map}
                  allowFullScreen={true}
                  loading="lazy">    
                </iframe>
          }
          <div>
            {/* <Date dateString={postData.date} /> */}
          </div>
          <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} className={styles.content} />
        </div>
            
      </article>
    </div>
  )

}
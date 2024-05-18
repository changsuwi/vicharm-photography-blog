import { GetStaticProps } from "next";
import * as React from "react";
import { useEffect } from "react";

import Article from "../../components/Article";
import Amplitude from "../../lib/Amplitude";
import { getAllPostIds, getPostData } from '../../lib/post'

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

export default function Post(props: Props) {
  let maxScroll = 0;

  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if(currentScrollY > maxScroll) maxScroll = currentScrollY;
  }

  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView("/article", {
      id: props.postData.id
    });

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);

      Amplitude.leavePageEvent(document, props.postData.id, maxScroll, "article");
    }
  }, [])

    
    
  return (
    <Article data={props.postData} />
  )
}
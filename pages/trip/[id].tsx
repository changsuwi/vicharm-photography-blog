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
    <Article data={props.postData} />
  )

}
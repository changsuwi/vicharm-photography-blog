import { GetStaticProps } from "next";
import * as React from "react";

import Article from "../../components/Article";
import useScrollTrack from "../../hooks/useScrollTrack";
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
  useScrollTrack(props.postData.id, "trip");

  return (
    <Article data={props.postData} />
  )

}
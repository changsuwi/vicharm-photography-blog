import { GetStaticProps } from "next";
import * as React from "react";

import Article from "../../components/Article";
import useScrollTrack from "../../hooks/useScrollTrack";
import { getAllPostIds, getPostData } from '../../lib/markdownRepo'
import { Post } from "../../models/post";

interface Props {
    postData: Post
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
  useScrollTrack(props.postData.id, "article");

  return (
    <Article data={props.postData} />
  )
}
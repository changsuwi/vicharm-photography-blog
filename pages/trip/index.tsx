import { GetStaticProps } from "next";
import Head from "next/head";
import * as React from "react";

import PostCard from "../../components/PostCard";
import PostCardPage from "../../components/PostCardPage";
import useScrollTrack from "../../hooks/useScrollTrack";
import { getSortedPostsData } from "../../lib/markdownRepo";
import { PostCardView, PostMeta } from "../../models/post";

interface Props {
  postData: PostMeta[];
}

export const getStaticProps: GetStaticProps = async (content: any) => {
  const postData = await getSortedPostsData("trips");
  return {
    props: {
      postData,
    },
  };
};

export default function TripList(props: Props) {
  useScrollTrack("trip-list", "trip-list");

  return (
    <div>
      <Head>
        <title>旅程指南</title>
        <meta name="description" content="秘境美景攻略與推薦旅程都在這" />
        <meta property="og:title" content="Vicharm 攝影與旅行日誌-旅程指南" />
        <meta
          property="og:description"
          content="秘境美景攻略與推薦旅程都在這"
        />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <PostCardPage landingImgSrc="/鼻頭角/50319789558_7ae74799a3_o_nDz_u3VUP.jpeg" category="trip" >
        {props.postData.map((postcard: PostCardView) => (
          <PostCard
            data={postcard}
            category={"trip"}
            key={postcard.id}
            supportVerticalUI
          />
        ))}
      </PostCardPage>
    </div>
  );
}

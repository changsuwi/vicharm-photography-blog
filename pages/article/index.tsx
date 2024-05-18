import { GetStaticProps } from "next";
import Head from "next/head";
import * as React from "react";
import { useEffect } from "react";

import PostCard from "../../components/PostCard";
import PostCardPage from "../../components/PostCardPage";
import Amplitude from "../../lib/Amplitude";
import { getSortedPostsData } from "../../lib/post";
import { PostCardView } from "../../models/post";
interface Props {
  postData: any;
}

export const getStaticProps: GetStaticProps = async (content: any) => {
  const postData = await getSortedPostsData("articles");
  return {
    props: {
      postData,
    },
  };
};

export default function ArticleList(props: Props) {
  let maxScroll = 0;

  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > maxScroll) maxScroll = currentScrollY;
  };

  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView("/article-list");

    return () => {
      document.removeEventListener("scroll", scrollHandler);

      Amplitude.leavePageEvent(
        document,
        "article-list",
        maxScroll,
        "article-list"
      );
    };
  }, []);

  return (
    <div>
      <Head>
        <title>旅行紀錄</title>
        <meta name="description" content="用相機與文字記錄每次旅行的美好" />
        <meta property="og:title" content="Vicharm 攝影與旅行日誌-旅行紀錄" />
        <meta
          property="og:description"
          content="用相機與文字記錄每次旅行的美好"
        />
        <meta property="og:image" content="/favicon.ico" />
      </Head>

      <PostCardPage landingImgSrc="/九份/50188569871_7430e1dc46_o_i701rkfVT.jpeg" category="article">
        {props.postData.map((postcard: PostCardView) => (
          <PostCard
            data={postcard}
            category={"article"}
            key={postcard.id}
            supportVerticalUI
          />
        ))}
      </PostCardPage>
    </div>
  );
}

import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";

import Introduction from "../components/Introduction";
import PostCard from "../components/PostCard";
import SectionLanding from "../components/SectionLanding";
import TopLanding from "../components/TopLanding";
import Amplitude from "../lib/Amplitude";
import { getSortedPostsData } from "../lib/post";
import { PostCardView } from "../models/post";

const PostCards = ({posts}: {posts: PostCardView[]}) => {
  return (
    <div className="flex flex-wrap w-full items-center justify-center gap-4 px-4 py-12">
      {posts.map((post: PostCardView) => (
        <PostCard data={post} category="trip" key={post.id} />
      ))}
    </div>
  )
}
interface Props {
  tripData: any;
  articleData: any;
}

export const getStaticProps: GetStaticProps = async (content: any) => {
  const articleData = await getSortedPostsData("articles").slice(0, 3);
  const tripData = await getSortedPostsData("trips").slice(0, 3);
  return {
    props: {
      articleData,
      tripData,
    },
  };
};

export default function Home(props: Props) {
  let maxScroll = 0;

  const scrollHandler = (e: Event) => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > maxScroll) maxScroll = currentScrollY;
  };

  useEffect(() => {
    Amplitude.init();
    Amplitude.analyticsPageView("/");

    return () => {
      document.removeEventListener("scroll", scrollHandler);
      Amplitude.leavePageEvent(document, "home", maxScroll, "home");
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>Vicharm 攝影與旅行日誌</title>
        <meta
          name="description"
          content="台灣旅行指南與旅行紀錄，用相機紀錄旅行的美好"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Vicharm 攝影與旅行日誌" />
        <meta
          property="og:description"
          content="台灣旅行指南與旅行紀錄，用相機紀錄旅行的美好"
        />
        <meta property="og:image" content="/favicon.ico" />
      </Head>

      <main className="w-screen flex flex-col justify-center items-center">
        <TopLanding />
        <Introduction />
        <SectionLanding
          title="探索美好旅程"
          description={[
            "春季櫻花飛舞 / 夏季海風吹拂",
            "秋季雲海秋芒 / 冬季白雪霧淞",
          ]}
          imageSrc={"/鼻頭角/50319789558_7ae74799a3_o_nDz_u3VUP.jpeg"}
          imageAlt={"鼻頭角"}
          textBoxColor={"cyan"}
          ctaText={"旅程指南列表"}
          ctaLink={"/trip"}
        />
        <PostCards posts={props.tripData} />
        <SectionLanding
          title="旅行紀錄"
          description={[
            "分享旅行遇到的點點滴滴",
            "美景與回憶都值得紀念",
          ]}
          imageSrc={"/九份/50188569871_7430e1dc46_o_i701rkfVT.jpeg"}
          imageAlt={"九份"}
          textBoxColor={"lime"}
          ctaText={"旅行紀錄列表"}
          ctaLink={"/article"}
        />
        <PostCards posts={props.articleData} />
      </main>
    </div>
  );
}

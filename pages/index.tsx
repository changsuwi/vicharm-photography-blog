import clsx from "clsx";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import MyImage from "../components/common/MyImage";
import PostCard from "../components/PostCard";
import useScrollTrack from "../hooks/useScrollTrack";
import { getSortedPostsData } from "../lib/markdownRepo";
import { PostCardView, PostMeta } from "../models/post";

const TopLanding = () => (
  <div className="w-full h-[667px] relative overflow-hidden flex flex-col justify-center items-center color-white text-center lg:h-[900px]">
    <MyImage
      src="/九份/50185219987_dd610f128f_o_xEr4kVwGoaE.jpeg"
      alt=""
      className="w-full h-full object-cover object-center"
      fill
      loading="eager"
      priority
    />
    <div className={"z-10 text-white text-center absolute bottom-12 flex flex-col gap-4"}>
      <span className={"text-3xl font-bold md:text-4xl"}>Vicharm 攝影旅行日誌</span>
      <p className={"text-xl md:text-2xl"}>在旅行途中，成就更美好的意義</p>
    </div>
  </div>
);

const Introduction = () => (
  <div className="flex justify-center items-center flex-wrap pt-10 pb-5 px-4 gap-10 md:my-28">
    <div className="relative w-[270px] h-[180px] md:w-[330px] md:h-[220px] 2xl:w-[600px] 2xl:h-[400px]">
      <div className="absolute bg-gray-300 bottom-5 right-5 w-full h-full 2xl:bottom-10 2xl:right-10"></div>
      <MyImage
        src="/kenting/47536553071_25cbcccaa4_o_0z1ZTr_yh.jpeg"
        alt="Vicharm"
        fill
        priority
      />
    </div>
    <div className="flex flex-col gap-2 2xl:text-2xl 2xl:gap-8">
      <div className="text-slate-900 text-2xl font-semibold 2xl:text-5xl">
        <span>Vicharm photography</span>
      </div>
      <div>
        <p>Hello 我是 Vicharm</p>
        <p>目前是WFH軟體工程師/旅行風景攝影愛好者，</p>
        <p>旅行過台灣許多鄉鎮，看過許多台灣的美，</p>
        <p>會在這裡分享旅行中所看到的風景, 故事與攻略</p>
      </div>
    </div>
  </div>
)

export const SectionLanding = ({
  title,
  description,
  imageSrc,
  imageAlt,
  textBoxColor,
  ctaText,
  ctaLink,
}: {
  title: string;
  description: string[];
  imageSrc: string;
  imageAlt: string;
  textBoxColor: "cyan" | "lime";
  ctaText: string;
  ctaLink: string;
}) => {
  return (
    <div
      className={
        "w-screen h-[667px] relative flex justify-center items-center lg:h-[900px]"
      }
    >
      <MyImage
        src={imageSrc}
        alt={imageAlt}
        className="object-cover object-center absolute"
        loading="lazy"
        fill
      />
      <div
        className={clsx(
          "absolute bottom-5 text-white w-[300px] py-4 rounded-2xl text-lg font-light gap-2 flex flex-col items-center text-center 2xl:bottom-12 2xl:text-2xl 2xl:gap-4 2xl:w-[400px] 2xl:py-8",
          textBoxColor === "cyan" && "bg-cyan-700/60",
          textBoxColor === "lime" && "bg-lime-950/60"
        )}
      >
        <span className="text-2xl font-semibold 2xl:text-4xl">{title}</span>
        {description.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
        <Link
          href={ctaLink}
          className="bg-transparent border border-white text-white font-semibold py-2 px-4 rounded-lg  2xl:text-xl"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

const PostCards = ({posts, category}: {posts: PostCardView[], category: "trip" | "article"}) => {
  return (
    <div className="flex flex-wrap w-full items-center justify-center gap-4 px-4 py-12">
      {posts.map((post: PostCardView) => (
        <PostCard data={post} category={category} key={post.id} />
      ))}
    </div>
  )
}
interface Props {
  tripData: PostMeta[];
  articleData: PostMeta[];
}

export const getStaticProps: GetStaticProps = async () => {
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
  useScrollTrack("home", "home");

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
        <PostCards posts={props.tripData} category="trip" />
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
        <PostCards posts={props.articleData} category="article" />
      </main>
    </div>
  );
}

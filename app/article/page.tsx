import type { Metadata } from "next";

import PostCard from "../../components/PostCard";
import PostCardPage from "../../components/PostCardPage";
import ScrollTracker from "../../components/ScrollTracker";
import { getSortedPostsData } from "../../lib/markdownRepo";
import { PostCardView } from "../../models/post";

export const metadata: Metadata = {
  metadataBase: new URL("https://vicharm-life.com"),
  title: "旅行紀錄",
  description: "用相機與文字記錄每次旅行的美好",
  openGraph: {
    title: "Vicharm 攝影與旅行日誌-旅行紀錄",
    description: "用相機與文字記錄每次旅行的美好",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Vicharm Life",
      },
    ],
  },
};

export default async function ArticleListPage() {
  const postData = await getSortedPostsData("articles");
  return (
    <main>
      <ScrollTracker id="article-list" type="article-list" />

      <PostCardPage
        landingImgSrc="/九份/50188569871_7430e1dc46_o_i701rkfVT.jpeg"
        category="article"
      >
        {postData.map((postcard: PostCardView) => (
          <PostCard
            data={postcard}
            category={"article"}
            key={postcard.id}
            supportVerticalUI
          />
        ))}
      </PostCardPage>
    </main>
  );
}

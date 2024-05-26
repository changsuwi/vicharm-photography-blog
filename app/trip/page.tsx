import type { Metadata } from 'next'

import PostCard from '../../components/PostCard';
import PostCardPage from '../../components/PostCardPage';
import ScrollTracker from '../../components/ScrollTracker';
import { getSortedPostsData } from "../../lib/markdownRepo";
import { PostCardView } from '../../models/post';

export const metadata: Metadata = {
  metadataBase: new URL('https://vicharm-life.com'),
  title: '旅程指南',
  description: '秘境美景攻略與推薦旅程都在這好',
  openGraph: {
    title: 'Vicharm 攝影與旅行日誌-旅程指南',
    description: '秘境美景攻略與推薦旅程都在這',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Vicharm Life',
      },
    ],
  },
}

export default async function TripListPage() {
  const postData = await getSortedPostsData("trips");
  return (
    <main>
      <ScrollTracker id="trip-list" type="trip-list" />
      <PostCardPage landingImgSrc="/鼻頭角/50319789558_7ae74799a3_o_nDz_u3VUP.jpeg" category="trip" >
        {postData.map((postcard: PostCardView) => (
          <PostCard
            data={postcard}
            category={"trip"}
            key={postcard.id}
            supportVerticalUI
          />
        ))}
      </PostCardPage>
    </main>
  )
}
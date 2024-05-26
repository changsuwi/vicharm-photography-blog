import type { Metadata, ResolvingMetadata } from 'next'

import Article from "../../../components/Article";
import ScrollTracker from "../../../components/ScrollTracker";
import { getAllPostIds, getPostData } from "../../../lib/markdownRepo"

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllPostIds('trips')
}

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const id = params.id
  const postData = await getPostData(id, 'trips')
  const { title, hint, tags, img, keyword } = postData;

  const description = `${hint}
  標籤: ${tags.toString()}
  關鍵字: ${keyword.toString()}`
 
  return {
    metadataBase: new URL('https://vicharm-life.com/trip'),
    title: title,
    description,
    openGraph: {
      images: [`https://ik.imagekit.io/vicharm${img}`],
      title: title,
      description,
      url: `/${id}`,
    },
  }
}

export default async function TripPage({params}: {params: {id: string}}) {
  const id = params.id
  const postData = await getPostData(id, 'trips')
  return (
    <main>
      <ScrollTracker id={id} type="trip" />
      <Article data={postData} />
    </main>
  );
}
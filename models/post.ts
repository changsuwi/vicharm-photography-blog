export interface PostCardView {
  id: string;
  title: string;
  date: string;
  img: string;
  preview: string;
}

export interface PostMeta {
  id: string;
  title: string;
  date: string;
  img: string;
  preview: string;
  tags: string[];
  season: string[];
  hint: string;
  map: string;
  keyword: string[];
  recommendation?: number;
}

export type Post = PostMeta & {
  contentHtml: string;
}
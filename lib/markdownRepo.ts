import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkUnwrapImages from "remark-unwrap-images";
import { unified } from "unified";

import { Post, PostMeta } from "../models/post";

const base = process.cwd();

export function getSortedPostsData(dirName: string) {
  const fileNames = fs.readdirSync(path.join(base, dirName));
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(base, dirName, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return { id, ...matterResult.data } as PostMeta;
  });

  return allPostsData.sort(({ date: a }, { date: b }) => b.localeCompare(a));
}

export function getAllPostIds(dirName: string) {
  const fileNames = fs.readdirSync(path.join(base, dirName));

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
}

export async function getPostData(id: string, dirName: string): Promise<Post> {
  const fullPath = path.join(base, dirName, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkUnwrapImages)
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...{ id, ...matterResult.data } as PostMeta,
  };
}

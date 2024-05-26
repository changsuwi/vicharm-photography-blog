import * as React from "react";

import { Post } from "../models/post";
import styles from "../styles/Post.module.scss";
import MyImage from "./MyImage";

export default function Article({
  data,
}: {
  data: Post;
}) {
  const { title, hint, tags, img, contentHtml, season, map } =
    data;
  return (
    <div className={styles.article}>
      <article>
        <div className={styles["top-img-container"]}>
          <MyImage
            src={img}
            alt=""
            loading="eager"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className={styles.container}>
          <h1>{title}</h1>
          <div className={styles.tags}>
            {tags.map((tag: any) => {
              return (
                <a
                  href={`/tag/${tag}`}
                  target="_blank"
                  rel="noreferrer"
                  key={tag}
                >{`#${tag}`}</a>
              );
            })}
          </div>
          <div className={styles.hint}>{hint}</div>
          {season && <p className={styles.season}>適合季節：{season}</p>}
          {map && (
            <iframe
              src={map}
              className={styles.map}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          )}
          <div>{/* <Date dateString={postData.date} /> */}</div>
          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className={styles.content}
          />
        </div>
      </article>
    </div>
  );
}

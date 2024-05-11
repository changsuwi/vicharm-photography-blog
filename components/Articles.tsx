import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import * as React from "react";

import styles from "../styles/components/Articles.module.scss";
import MyImage from "./common/MyImage";

interface Props{
    articles: any
    isListPage: boolean
}
export default function Articles(props: Props) {
    
  const articles = props.articles.length > 3 && !props.isListPage ? props.articles.slice(0, 3) : props.articles;
  return (
    <div className={`${styles.articles} ${props.isListPage ? styles.list : ""}`}>
      {articles.map((article: any) => (
        <Link href={`/article/${article.id}`} key={article.id} className={styles.link}>
          <div className={styles.article} data-testid="article">
            <div className={styles["photo-container"]}>
              <MyImage src={article.img} alt="" className={styles.photo} loading="lazy" fill sizes="(min-width: 320px) 300px, (min-width: 768px) 320px, (min-width: 1024px) 480px, (min-width: 1440px) 640px" />
              <div className={styles.overlay}>
                <FontAwesomeIcon icon={faArrowRight} width="24px" height="24px" color="#f8f8f7"/>
              </div>
            </div>
            <div className={styles.container}>
              <span className={styles.title}>{article.title}</span>
              <div className={styles.content}>
                {article.preview}
              </div>
            </div>
                        
          </div>
        </Link>
      ))}
            
    </div>
  )

}
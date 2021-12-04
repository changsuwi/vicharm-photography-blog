import * as React from "react";
import Link from 'next/link'
import styles from "../styles/components/Articles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";

interface Props{
    articles: any
    isListPage: boolean
}
export default class Articles extends React.Component<Props, any> {
    render(): JSX.Element {
        const articles = this.props.articles.length > 3 && !this.props.isListPage ? this.props.articles.slice(0, 3) : this.props.articles;
        return (
            <div className={`${styles.articles} ${this.props.isListPage ? styles.list : ""}`}>
                {articles.map((article: any) => (
                    <Link href={`/article/${article.id}`} key={article.id}>
                        <div className={styles.article}>
                            <div className={styles["photo-container"]}>
                                <img src={article.img} alt="" className={styles.photo}/>
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
}
import * as React from "react";
import Link from 'next/link'
import styles from "../styles/components/Articles.module.scss";

interface Props{
    articles: any
    isListPage: boolean
}
export default class Articles extends React.Component<Props, any> {
    render(): JSX.Element {
        const articles = this.props.articles
        return (
            <div className={`${styles.articles} ${this.props.isListPage ? styles.list : ""}`}>
                {articles.map((article: any) => (
                    <Link href={`/article/${article.id}`} key={article.id}>
                        <div className={styles.article}>
                            <img src={article.img} alt="" className={styles.photo}/>
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
import styles from './articlesSection.module.css'
import {ArticleScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import BoyWithCompass from "@/app/_components/common/boyWithCompass/boyWithCompass";
import React from "react";


interface props {
    articles: ArticleScheme[]
    pageMode: 'articles' | 'users'
}

export default function ArticlesSection(props: props) {
    return (
        <div className={styles.div_0} style={props.pageMode !== 'articles' ? {display: "none"} : {}}>
            {props.articles.map((article: ArticleScheme, index: number) => <ReducedArticleContainer article={article} key={index}/>)}
            {props.articles.length === 0?
                <div className={styles.div_1}>
                    <BoyWithCompass className={styles.BoyWithCompass}/>
                    <h2 className={styles.h2_0}>記事が見つかりませんでした</h2>
                    <h3 className={styles.h3_0}>No articles found</h3>
                </div>
                :
                undefined
            }
        </div>
    )
}

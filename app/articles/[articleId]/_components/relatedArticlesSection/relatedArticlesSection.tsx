import styles from './relatedArticlesSection.module.css'
import {useEffect, useState} from "react";
import {ArticleScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";

interface props {
    isMobile: boolean;
    userProfile: UserProfileScheme
}

export default function RelatedArticlesSection(props: props) {
    const [relatedArticles, setRelatedArticles] = useState<ArticleScheme[]>([])

    const getRelatedArticles = () => {
        getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>('/api/getArticles').then((json) => {
            if(!json.error && json.articles.length > 0) {
                setRelatedArticles(json.articles);
            }
        })
    }

    useEffect(() => {
        getRelatedArticles()
    }, [])

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>関連記事</h2>
            {!props.isMobile? <div className={styles.div_1}>{relatedArticles.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index}/>)}</div> : null}
            {props.isMobile? <div className={styles.div_2}>{relatedArticles.map((article: ArticleScheme, index) => <ReducedArticleContainer article={article} key={index}/>)}</div> : null}
        </div>
    )
}

import styles from './relatedArticlesSection.module.css'
import {useEffect, useState} from "react";
import {ArticleScheme, UserScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface props {
    isMobile: boolean;
    articleId: string;
}

export default function RelatedArticlesSection(props: props) {
    const [relatedArticles, setRelatedArticles] = useState<ArticleScheme[]>([])
    const appendError = useErrorStore(state => state.appendError)

    const getRelatedArticles = () => {
        getDataFromServerWithJson<{articles: ArticleScheme[]}>(`/api/getArticles/relation?articleId=${props.articleId}`).then((json) => {
            if(!!json && json.articles.length > 0) {
                setRelatedArticles(json.articles);
            }
        }).catch((err) => {
            appendError(err);
        })
    }

    useEffect(() => {
        getRelatedArticles()
    }, [])

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>関連記事</h2>
            {!props.isMobile? <div className={styles.div_1}>{relatedArticles.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index} isDummy={false} isFirstDummy={false}/>)}</div> : null}
            {props.isMobile? <div className={styles.div_2}>{relatedArticles.map((article: ArticleScheme, index) => <ReducedArticleContainer article={article} key={index}/>)}</div> : null}
        </div>
    )
}

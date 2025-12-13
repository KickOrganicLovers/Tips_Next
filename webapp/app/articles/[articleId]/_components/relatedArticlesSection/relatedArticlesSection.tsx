import styles from './relatedArticlesSection.module.css'
import {useEffect, useState} from "react";
import {ArticleScheme, ErrorScheme, UserScheme} from "@/types";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

interface props {
    isMobile: boolean;
    articleId: string;
}

export default function RelatedArticlesSection(props: props) {
    const [relatedArticles, setRelatedArticles] = useState<ArticleScheme[]>([])
    const [isMax, setIsMax] = useState<boolean>(false);
    const appendError = useErrorStore(state => state.appendError)

    const getRelatedArticles = async () => {
        try {
            const json = await postDataToServerWithJson<{articles: ArticleScheme[]}>(`/api/getArticles/relation`, {articleId: props.articleId, viewingArticleIds: relatedArticles.map(viewingArticle => viewingArticle.id)})
            if(!json) return
            setRelatedArticles((prevState) => [...prevState, ...json.articles])
            if(json.articles.length < 12) setIsMax(true)
        }catch (error) {
            appendError(error as ErrorScheme)
        }
    }

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>関連記事</h2>
            {!props.isMobile && <div className={styles.div_1}>
                {relatedArticles.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index} isDummy={false} isFirstDummy={false}/>)}
                {!isMax && Array.from({length: 12}).map((_, i) => (<ArticleContainer isDummy={true} isFirstDummy={i === 0} firstDummy_onVisible={getRelatedArticles} key={i}/>))}
            </div>}
            {props.isMobile && <div className={styles.div_2}>
                {relatedArticles.map((article: ArticleScheme, index) => <ReducedArticleContainer article={article} key={index}/>)}
                {!isMax && Array.from({length: 12}).map((_, i) => (<ReducedArticleContainer isDummy={true} isFirstDummy={i === 0} firstDummy_onVisible={getRelatedArticles} key={i}/>))}
            </div>}
        </div>
    )
}

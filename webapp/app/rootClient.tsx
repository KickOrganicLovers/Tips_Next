'use client'
import {useArticlesStore} from "@/lib/lib-client/stores/articlesStore";
import styles from "@/app/app.module.css";
import {ArticleScheme} from "@/types";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useEffect} from "react";

export default function RootClient () {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const recommendedArticles_isMax = useArticlesStore(state => state.recommendedArticles_isMax);
    const recommendedArticles = useArticlesStore(state => state.recommendedArticles)
    const getRecommendedArticles = useArticlesStore(state => state.getRecommendedArticles)

    useEffect(() => {
        applyWhereIam('root')
    }, []);


    return (
        <div className={styles.div_0}>
            {recommendedArticles.map((article: ArticleScheme, index) => <ArticleContainer key={index} article={article}/>)}
            {!recommendedArticles_isMax && Array.from({length: 30}).map((_, index) => (
                <ArticleContainer isDummy={true} key ={index} isFirstDummy={index === 0} firstDummy_onVisible={getRecommendedArticles}/>
            ))}
        </div>
    )
}

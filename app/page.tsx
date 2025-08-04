'use client'

import styles from './app.module.css'
import {use, useEffect, useRef, useState} from "react";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {ArticleScheme} from "@/types";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";
import {useArticlesStore} from "@/lib/lib-client/stores/articlesStore";

export default function Page() {
    const recommendedArticles_isMax = useArticlesStore(state => state.recommendedArticles_isMax);
    const recommendedArticles = useArticlesStore(state => state.recommendedArticles)
    const getRecommendedArticles = useArticlesStore(state => state.getRecommendedArticles)

    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)

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

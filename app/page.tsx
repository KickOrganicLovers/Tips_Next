'use client'

import styles from './app.module.css'
import {use, useEffect, useState} from "react";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {ArticleScheme} from "@/types";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";
import {useArticlesStore} from "@/lib/lib-client/stores/articlesStore";

export default function Page() {
    const recommendedArticles = useArticlesStore(state => state.recommendedArticles)
    const getRecommendedArticles = useArticlesStore(state => state.getRecommendedArticles)

    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)

    useEffect(() => {
        //Get recommended articles from server
        getRecommendedArticles()
        applyWhereIam('root')
    }, []);



    return (
        <div className={styles.div_0}>
            {recommendedArticles.map((article: ArticleScheme, index) => <ArticleContainer key={index}
                                                                                             article={article}/>)}
        </div>
    )
}

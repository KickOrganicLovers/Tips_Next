'use client'

import styles from './app.module.css'
import {useEffect} from "react";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {ArticleScheme} from "@/types";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useArticlesStore} from "@/lib/lib-client/stores/articlesStore";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const articlesStore = useArticlesStore((state) => state);

    useEffect(() => {
        //Get recommended articles from server
        articlesStore.getRecommendArticles()
        applyWhereIam('root')
    }, []);

    return (
        <div className={styles.div_0}>
            {articlesStore.articles.map((article: ArticleScheme, index) => <ArticleContainer key={index}
                                                                                             article={article}/>)}
        </div>
    )
}

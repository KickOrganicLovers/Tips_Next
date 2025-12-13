'use client'

import styles from './trending.module.css'
import {ArticleScheme} from "@/types";
import {useEffect, useState} from "react";
import ExtendedArticleContainer from "@/app/_components/common/extendedArticleContainer/extendedArticleContainer";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useArticlesStore} from "@/lib/lib-client/stores/articlesStore";

export default function Page () {
    const trendingArticles = useArticlesStore(state => state.trendingArticles);
    const getTrendingArticles = useArticlesStore(state => state.getTrendingArticles);
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)


    useEffect(() => {
        getTrendingArticles()
        applyWhereIam('trending')
    }, [])



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoFire.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>Trending</h1>
                    <p className={styles.p_0}>今トレンドの記事が<wbr/>表示されます</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {trendingArticles.map((article: ArticleScheme, index: number) => <ExtendedArticleContainer
                    article={article} key={index} index={index + 1}/>)}
            </div>
        </div>
    )
}

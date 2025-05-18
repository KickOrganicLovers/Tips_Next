'use client'

import styles from './trending.module.css'
import {ArticleScheme} from "@/types";
import {useEffect} from "react";
import ExtendedArticleContainer from "@/app/_components/common/extendedArticleContainer/extendedArticleContainer";
import useWhereIamStore from "@/lib/lib-client/stores/whereIamStore";
import useArticlesStore from "@/lib/lib-client/stores/articlesStore";

export default function Page () {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const articles = useArticlesStore((state) => state.articles);


    useEffect(() => {
        applyWhereIam('trending')
    }, [])



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoFire.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>Trending</h1>
                    <p className={styles.p_0}>今トレンドの記事が表示されます</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {articles.map((article: ArticleScheme, index: number) => <div key={index}><ExtendedArticleContainer
                    article={article} key={index}/></div>)}
            </div>
        </div>
    )
}

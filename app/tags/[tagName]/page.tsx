'use client'

import styles from './tags.module.css'
import React, {useEffect, useState} from "react";
import {ArticleScheme} from "@/types";
import {useParams, useRouter} from "next/navigation";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import BoyWithCompass from "@/app/_components/common/boyWithCompass/boyWithCompass";

export default function Page () {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const [articles, setArticles] = useState<ArticleScheme[]>([]);
    const {tagName} = useParams<{tagName: string}>()


    const getArticlesWithTag = async (tag: string) => {
        return await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/getArticles?tagName=${tag}`)
    }

    useEffect(() => {
        console.log(tagName)
        getArticlesWithTag(tagName).then((json) => {
            if(!json.error){
                setArticles(json.articles)
                applyWhereIam(`tagName-${tagName}`)
            }
        })
    }, [tagName]);


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoTag.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>{decodeURIComponent(tagName)}</h1>
                    <p className={styles.p_0}>{`${articles.length}件の記事`}</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {articles.map((article: ArticleScheme, index: number) => <ArticleContainer article= {article} key={index}/>)}
                {articles.length === 0?
                    <div className={styles.div_4}>
                        <BoyWithCompass className={styles.BoyWithCompass}/>
                        <h2 className={styles.h2_0}>記事が見つかりませんでした</h2>
                        <h3 className={styles.h3_0}>No articles found</h3>
                    </div>
                    :
                    undefined
                }
            </div>
        </div>
    )
}

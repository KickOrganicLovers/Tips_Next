'use client'

import styles from './tags.module.css'
import React, {useEffect, useState} from "react";
import {ArticleScheme} from "@/types";
import {useParams, useRouter} from "next/navigation";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import BoyWithCompass from "@/app/_components/common/boyWithCompass/boyWithCompass";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

export default function Page () {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const appendError = useErrorStore(state => state.appendError)
    const [articleLength, setArticleLength] = useState(0);
    const [viewingArticles, setViewingArticles] = useState<ArticleScheme[]>([]);
    const [isMax, setIsMax] = useState<boolean>(false)
    const {tagName} = useParams<{tagName: string}>()



    const getArticlesWithTag = async () => {
        postDataToServerWithJson<{articles: ArticleScheme[], articleLength: number}>(`/api/getArticles/tag`, {tagName: decodeURIComponent(tagName), viewingArticleIds: viewingArticles.map(viewingArticle => viewingArticle.id)}).then((json) => {
            if(!!json){
                setArticleLength(json.articleLength);
                setViewingArticles((prevState) => [...prevState, ...json.articles]);
                setIsMax(json.articles.length < 30)
            }
        }).catch((error) => {
            appendError(error)
        })
    }

    useEffect(() => {
        setIsMax(false)
        setViewingArticles([])
        applyWhereIam(`tag-${tagName}`)
    }, [tagName]);


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoTag.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>{decodeURIComponent(tagName)}</h1>
                    <p className={styles.p_0}>{`${articleLength}件の記事`}</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {viewingArticles.map((article: ArticleScheme, index: number) => (
                    <ArticleContainer article= {article} key={index} isDummy={false} isFirstDummy={false}/>
                ))}
                {!isMax && Array.from({length: 30}).map((_, index) => (
                    <ArticleContainer isDummy={true} key ={index} isFirstDummy={index === 0} firstDummy_onVisible={getArticlesWithTag}/>
                ))}
                {viewingArticles.length === 0 && isMax?
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

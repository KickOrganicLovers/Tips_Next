'use client'

import styles from './trending.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {ArticleScheme} from "@/types";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {useEffect, useState} from "react";
import ExtendedArticleContainer from "@/app/_components/common/extendedArticleContainer/extendedArticleContainer";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";

export default function Page () {
    const dispatch = useDispatch<AppDispatch>();

    const Articles = useSelector<RootState, RootState['Articles']>((state) => state.Articles)


    useEffect(() => {
        dispatch(applyWhereIam('trending'))
    }, [Articles])



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
                {Articles.map((article: ArticleScheme, index: number) => <div key={index}><ExtendedArticleContainer article={article} key={index}/></div>)}
            </div>
        </div>
    )
}

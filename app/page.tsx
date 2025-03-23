'use client'

import styles from './app.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "@/redux/store";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import {setCategories} from "@/redux/slices/categoriesSlice";
import {ArticleScheme, UserProfileScheme} from "@/types";
import {setArticles} from "@/redux/slices/articlesSlice";

export default function Page() {
    const Articles = useSelector<RootState, RootState['Articles']>((state) => state.Articles)
    const dispatch = useDispatch<AppDispatch>();


    async function getArticles() {
        const json = await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>('/api/getArticles')
        if (!json.error) {
            console.log(json)
            return json.articles
        }
    }

    useEffect(() => {
        dispatch(applyWhereIam('app'))
        getArticles().then((articles) => {
            if (articles !== undefined) {
                dispatch(setArticles(articles))
            }
        })
    }, []);



    return (
        <div className={styles.div_0}>
            {Articles.map((article: ArticleScheme, index) => <ArticleContainer key={index} article={article}/>)}
        </div>
    )
}

'use client'

import styles from './app.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "@/redux/store";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import ArticleContainer from "@/app/_components/articleContainer/articleContainer";
import {getDataFromServerWithJson} from "@/app/lib-client/fetch";
import {setCategories} from "@/redux/slices/categoriesSlice";
import {setArticlesWithAuthorProfile} from "@/redux/slices/articlesWithAuthorProfileSlice";
import {ArticleScheme, UserProfileScheme} from "@/typs";

export default function Page() {
    const ArticlesWithAuthorProfile = useSelector<RootState, RootState['ArticlesWithAuthorProfile']>((state) => state.ArticlesWithAuthorProfile)
    const dispatch = useDispatch<AppDispatch>();



    async function getArticles() {
        const json = await getDataFromServerWithJson<{articlesWithAuthorProfile: {article: ArticleScheme, authorProfile: UserProfileScheme}[], error: string}>('/api/getArticles')
        if (!json.error) {
            console.log(json.articlesWithAuthorProfile)
            return json.articlesWithAuthorProfile
        }

    }

    useEffect(() => {
        dispatch(applyWhereIam('app'))
        getArticles().then((articlesWithAuthorProfile) => {
            if (articlesWithAuthorProfile !== undefined) {
                dispatch(setArticlesWithAuthorProfile(articlesWithAuthorProfile))
            }
        })
    }, []);



    return (
        <div className={styles.div_0}>
            {ArticlesWithAuthorProfile.map(({article,  authorProfile}, index) => <ArticleContainer key={index} article={article} authorProfile={authorProfile} />)}
        </div>
    )
}

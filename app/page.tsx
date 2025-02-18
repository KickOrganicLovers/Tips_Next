'use client'

import styles from './app.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "@/redux/store";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {ArticleScheme, Category} from "@/typs";
import ArticleContainer from "@/app/_components/articleContainer/articleContainer";
import {getDataFromServerWithJson} from "@/app/lib-client/fetch";
import {setCategories} from "@/redux/slices/categoriesSlice";
import {setArticles} from "@/redux/slices/articlesSlice";

export default function Page() {
    const Articles = useSelector<RootState, RootState['Articles']>((state) => state.Articles)
    const dispatch = useDispatch<AppDispatch>();



    //Get categories from db and initialize categories state

    const getCategories = async () => {
        return await getDataFromServerWithJson<{categories: Category[]; error: string}>('/api/getCategories');
    }


    useEffect(() => {
        getCategories().then((json) => {
            if(!json.error){
                console.log(json.categories)
                dispatch(setCategories(json.categories))
            }
        })
    }, []);



    useEffect(() => {
        dispatch(applyWhereIam('app'))

        getArticles().then((articles) => {
            if (articles !== undefined) {
                dispatch(setArticles(articles));

            }
        })
    }, []);

    async function getArticles() {
        const json = await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>('/api/getArticles')
        if (!json.error) {
            console.log(json.articles)
            return json.articles
        }

    }


    return (
        <div className={styles.div_0}>
            {Articles.map((article: ArticleScheme, index) => <ArticleContainer key={index} {...article}/>)}
        </div>
    )
}

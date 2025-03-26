'use client'

import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {useParams, useSearchParams} from "next/navigation";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import {ArticleScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import styles from './search.module.css'

export default function Page() {
    const [articles, setArticles] = useState<ArticleScheme[]>();
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const search_query = searchParams.get('search_query') as string;

    const searchArticles = async (query: string) => {
        return getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/searchArticle?search_query=${query}`);
    }




    useEffect(() => {
        dispatch(applyWhereIam('search'))
        searchArticles(search_query).then((json) => {
            if(!json.error){
                setArticles(json.articles)
            }
        })
    }, [search_query])
    return (
        <div className={styles.div_0}>{articles?.map((article, index) => <ReducedArticleContainer article={article} key={index}/>)}</div>
    )
}

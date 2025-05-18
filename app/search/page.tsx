'use client'

import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useSearchParams} from "next/navigation";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {ArticleScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import styles from './search.module.css'
import loginStatusStore from "@/lib/lib-client/stores/loginStatusStore";

export default function Page() {
    const [articles, setArticles] = useState<ArticleScheme[]>();
    const loginStatus = loginStatusStore((state) => state.loginStatus)
    const searchParams = useSearchParams();
    const search_query = decodeURIComponent(searchParams.get('search_query') as string)

    const searchArticles = async (query: string) => {
        return getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/searchArticle?search_query=${query}`);
    }

    const postSearchHistory = (query: string, userId: string)=> {
        return postDataToServerWithJson<{error: string}>('/api/postSearchHistory', {userId: userId, searchQuery: search_query})
    }



    useEffect(() => {
        searchArticles(search_query).then((json) => {
            if(!json.error){
                setArticles(json.articles)
                if (loginStatus.isLoggedIn) {
                    postSearchHistory(search_query, loginStatus.userProfile.userId).then((json) => {
                        if(!!json.error){
                            console.error(json.error)
                        }
                    }).catch((error) => {
                        console.error(error)
                    })
                }
            }
        })
    }, [search_query])
    return (
        <div className={styles.div_0}>{articles?.map((article, index) => <ReducedArticleContainer article={article} key={index}/>)}</div>
    )
}

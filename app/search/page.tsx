'use client'

import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useSearchParams} from "next/navigation";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {ArticleScheme, UserScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import styles from './search.module.css'
import ArticlesSection from "@/app/search/articlesSection/articlesSection";
import classNames from "classnames";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";
import UsersSection from "@/app/search/usersSection/usersSection";



export default function Page() {
    const [articles, setArticles] = useState<ArticleScheme[]>([]);
    const [users, setUsers] = useState<UserScheme[]>([])
    const [pageMode, setPageMode] = useState<'articles' | 'users'>('articles')

    const user = useUserStore((state) => state.user)
    const session = useSession();
    const searchParams = useSearchParams();
    const search_query = decodeURIComponent(searchParams.get('search_query') as string)
    const className_p_0_articles = pageMode === 'articles'? classNames(styles.p_0, styles.active) : classNames(styles.p_0)
    const className_p_0_users = pageMode === 'users'? classNames(styles.p_0, styles.active) : classNames(styles.p_0)


    const searchArticles = async (query: string) => {
        return getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/searchArticle?search_query=${query}`);
    }

    const searchUsers = async (query: string) => {
        return getDataFromServerWithJson<{users: UserScheme[], error: string}>(`/api/searchUser?search_query=${query}`)
    }

    const postSearchHistory = (query: string, userId: string)=> {
        return postDataToServerWithJson<{error: string}>('/api/postSearchHistory', {userId: userId, searchQuery: search_query})
    }



    useEffect(() => {
        searchArticles(search_query).then((json) => {
            if(!json.error){
                setArticles(json.articles)
                if (session.status === 'authenticated') {
                    postSearchHistory(search_query, user.id).then((json) => {
                        if(!!json.error){
                            console.error(json.error)
                        }
                    }).catch((error) => {
                        console.error(error)
                    })
                }
            }
        })
        searchUsers(search_query).then((json) => {
            if(!json.error){
                setUsers(json.users)
            }else {
                console.log(json.error)
            }
        })
    }, [search_query])


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <h1 className={styles.h1_0}>{`「 ${search_query} 」の検索結果`}</h1>
                <div className={styles.div_3}>
                    <p className={className_p_0_articles} onClick={() => {setPageMode('articles')}}>記事</p>
                    <p className={className_p_0_users} onClick={() => {setPageMode('users')}}>ユーザー</p>
                </div>
            </div>
            <div className={styles.div_2}>
                <ArticlesSection articles={articles} pageMode={pageMode}/>
                <UsersSection users={users} setUsers={setUsers} pageMode={pageMode}/>
            </div>
        </div>
    )
}

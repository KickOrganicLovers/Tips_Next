'use client'

import {useEffect, useState} from "react";
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
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";



export default function Page() {
    const [users, setUsers] = useState<UserScheme[]>([])
    const [pageMode, setPageMode] = useState<'articles' | 'users'>('articles')
    const appendError = useErrorStore(state => state.appendError)
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)

    const session = useSession();
    const searchParams = useSearchParams();
    const search_query = decodeURIComponent(searchParams.get('search_query') as string)
    const className_p_0_articles = pageMode === 'articles'? classNames(styles.p_0, styles.active) : classNames(styles.p_0)
    const className_p_0_users = pageMode === 'users'? classNames(styles.p_0, styles.active) : classNames(styles.p_0)



    const postSearchHistory = (query: string)=> {
        return postDataToServerWithJson('/api/postSearchHistory', {searchQuery: search_query})
    }



    useEffect(() => {
        if(session.status === 'authenticated'){
            postSearchHistory(search_query).catch(error => {appendError(error)})
        }
        applyWhereIam(`search-${search_query}`)
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
                <ArticlesSection query={search_query} pageMode={pageMode}/>
                <UsersSection query={search_query} pageMode={pageMode}/>
            </div>
        </div>
    )
}

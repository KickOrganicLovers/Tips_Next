import styles from "@/app/search/search.module.css";
import ArticlesSection from "@/app/search/articlesSection/articlesSection";
import UsersSection from "@/app/search/usersSection/usersSection";
import {useEffect, useState} from "react";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import classNames from "classnames";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";

export default function SearchClient() {
    const [pageMode, setPageMode] = useState<'articles' | 'users'>('articles')
    const appendError = useErrorStore(state => state.appendError)
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)

    const session = useSession();
    const searchParams = useSearchParams();
    const search_query = decodeURIComponent(searchParams.get('search_query') as string)
    const className_p_0_articles = pageMode === 'articles'? classNames(styles.p_0, styles.active) : classNames(styles.p_0)
    const className_p_0_users = pageMode === 'users'? classNames(styles.p_0, styles.active) : classNames(styles.p_0)

    const postSearchHistory = ()=> {
        return postDataToServerWithJson('/api/postSearchHistory', {searchQuery: search_query})
    }



    useEffect(() => {
        if(session.status === 'authenticated'){
            postSearchHistory().catch(error => {appendError(error)})
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

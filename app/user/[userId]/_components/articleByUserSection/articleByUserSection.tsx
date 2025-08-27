import styles from './articleByUserSection.module.css'
import {ArticleScheme, ErrorScheme, UserScheme} from "@/types";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {SessionContextValue, useSession} from "next-auth/react";
import GirlWithBalloon from "@/public/images/girlWithBalloon.svg";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import GirlWithBook from "@/app/_components/common/girlWithBook/girlWithBook";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {findCategoryById} from "@/lib/lib-client/processing";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";


interface props {
    user: UserScheme
}

export default function ArticleByUserSection(props: props) {
    const session = useSession();
    const [isMax, setIsMax] = useState<boolean>(false);
    const [viewingArticles, setViewingArticles] = useState<ArticleScheme[]>([]);
    const appendError = useErrorStore(state => state.appendError)

    const getArticlesCreatedByUser = async () => {
        if(session.status === 'authenticated' && session.data.user.id === props.user.id) return
        try {
            const json = await postDataToServerWithJson<{articles: ArticleScheme[]}>(`/api/getArticles/byUser`, {authorId: props.user.id, viewingArticleIds: viewingArticles.map(viewingArticle => viewingArticle.id)})
            if(!!json) {
                console.log(json.articles)
                setViewingArticles((prevState) => [...prevState, ...json.articles]);
                if(json.articles.length < 30) setIsMax(true);
            }
        }catch (error) {
            appendError(error as ErrorScheme)
        }
    }

    useEffect(() => {
        // setIsMax(false)
        // setViewingArticles([])
        if(session.status === 'authenticated' && session.data.user.id === props.user.id){
            setViewingArticles(props.user.articleCreatedBy)
            setIsMax(true)
        }
    }, [props.user])

    return (
        <div className={styles.div_0}>
            {(viewingArticles.length !== 0 || !isMax)&&
                <h2 className={styles.h2_0}>作成した記事</h2>
            }
            <div className={styles.div_1}>
                {viewingArticles.map((article: ArticleScheme, index) => <ArticleContainer article={article} key={index} isDummy={false} isFirstDummy={false}/>)}
                {!isMax && Array.from({length: 30}).map((_, index) => (
                    <ArticleContainer isDummy={true} key ={index} isFirstDummy={index === 0} firstDummy_onVisible={getArticlesCreatedByUser}/>
                ))}
                {(viewingArticles.length === 0 && isMax) &&
                    <div className={styles.div_2}>
                        <GirlWithBook className={styles.GirlWithBook}/>
                        <h2 className={styles.h2_1}>作成した記事がここに表示されます</h2>
                        <h3 className={styles.h3_0}><Link className={styles.Link} href={'/createArticle'}>＋ 記事を作成する</Link></h3>
                    </div>
                }
            </div>
        </div>
    )
}

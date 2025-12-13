import styles from './articlesSection.module.css'
import {ArticleScheme, ErrorScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import BoyWithCompass from "@/app/_components/common/boyWithCompass/boyWithCompass";
import React, {useEffect, useState} from "react";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";


interface props {
    pageMode: 'articles' | 'users'
    query: string
}

export default function ArticlesSection(props: props) {
    const [viewingArticles, setViewingArticles] = useState<ArticleScheme[]>([]);
    const [isMax, setIsMax] = useState<boolean>(false);
    const appendError = useErrorStore(state => state.appendError)

    const searchArticles = async () => {
        try {
            const json = await postDataToServerWithJson<{articles: ArticleScheme[]}>(`/api/searchArticle`, {viewingArticleIds: viewingArticles.map(viewingArticle => viewingArticle.id), searchQuery: props.query});
            if(!!json){
                setViewingArticles((prevState) => [...prevState, ...json.articles]);
                if(json.articles.length < 30) setIsMax(true)
            }
        }catch (error) {
            appendError(error as ErrorScheme)
        }
    }

    useEffect(() => {
        setViewingArticles([])
        setIsMax(false)
    }, [props.query]);

    return (
        <div className={styles.div_0} style={props.pageMode !== 'articles' ? {display: "none"} : {}}>
            {!isMax && Array.from({length: 30}).map((_, index) => (
                <ReducedArticleContainer isDummy={true} isFirstDummy={index === 0} firstDummy_onVisible={searchArticles} key={index}/>
            ))}
            {viewingArticles.map((article: ArticleScheme, index: number) => <ReducedArticleContainer article={article} key={index}/>)}
            {viewingArticles.length === 0 && isMax?
                <div className={styles.div_1}>
                    <BoyWithCompass className={styles.BoyWithCompass}/>
                    <h2 className={styles.h2_0}>記事が見つかりませんでした</h2>
                    <h3 className={styles.h3_0}>No articles found</h3>
                </div>
                :
                undefined
            }
        </div>
    )
}

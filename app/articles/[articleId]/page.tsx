'use client'

import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {useEffect, useRef, useState} from "react";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import styles from './article.module.css'
import {ArticleScheme, UserProfileScheme} from "@/typs";
import ArticleDetailsSection from "@/app/articles/[articleId]/_components/articleDetailsSection/articleDetailsSection";
import ArticleManagementCard from "@/app/articles/[articleId]/_components/articleManagementCard/articleManagementCard";

export default function Page() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)
    const ArticlesWithAuthorProfile = useSelector<RootState, RootState['ArticlesWithAuthorProfile']>((state) => state.ArticlesWithAuthorProfile)
    const [articleWithAuthorProfile, setArticleWithAuthorProfile] = useState<{article: ArticleScheme, authorProfile: UserProfileScheme}>();
    const [hasError, setHasError] = useState(false);
    const {articleId} = useParams<{articleId: string}>()
    const articleIdAsNumber = parseInt(articleId, 10)
    const dispatch = useDispatch<AppDispatch>();
    const contentRef = useRef<HTMLDivElement>(null);


    const getArticle = async (articleId: number): Promise<{article: ArticleScheme, authorProfile: UserProfileScheme}> => {
        const json = await getDataFromServerWithJson<{articlesWithAuthorProfile: {article: ArticleScheme, authorProfile: UserProfileScheme}[], error: string}>(`/api/getArticles?articleId=${articleId}`);
        return json.articlesWithAuthorProfile[0]// 必要な記事を取得
    };

    useEffect(() => {
        const articleInState = ArticlesWithAuthorProfile.find(({article, authorProfile}) => article.id === articleIdAsNumber);
        if (!!articleInState) {
            setArticleWithAuthorProfile(articleInState); // 状態を更新
        } else {
            (async () => {
                const fetchedArticle = await getArticle(articleIdAsNumber);
                if(!!fetchedArticle){
                    setArticleWithAuthorProfile(fetchedArticle); // 非同期で取得した記事を状態にセット
                }else {
                    setHasError(true);
                }
            })()
        }
        dispatch(applyWhereIam(`article-${articleIdAsNumber}`))
    }, [articleIdAsNumber, ArticlesWithAuthorProfile]);


    useEffect(() => {
        if (articleWithAuthorProfile?.article && contentRef.current) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(articleWithAuthorProfile.article.contents, "text/html");

            // 既存の内容をクリアしてから、新しい DOM を追加
            contentRef.current.innerHTML = ""; // または contentRef.current.textContent = ""
            contentRef.current.appendChild(doc.body); // HTML を `contentRef` に追加
        }
    }, [articleWithAuthorProfile?.article]); // `article` が変更されるたびに再実行


    if (!articleWithAuthorProfile) {
        if(hasError) {
            return <p>記事が存在しません。</p>
        }
        return <p>now loading...</p>;
    }
    return (
        <div className={styles.div_0}>
            <ArticleDetailsSection {...articleWithAuthorProfile}/>
            <div className={styles.div_1}>
                {(() => articleWithAuthorProfile.authorProfile.userId === LoginStatus.userProfile.userId ? <ArticleManagementCard {...articleWithAuthorProfile}/> : undefined)()}
                <h1 className={styles.h1_0}>{articleWithAuthorProfile.article.title}</h1>
                <div ref={contentRef} className={styles.div_2}/>
            </div>
        </div>
    )
}

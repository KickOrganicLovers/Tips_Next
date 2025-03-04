'use client'

import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {useEffect, useRef, useState} from "react";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import styles from './article.module.css'
import {ArticleScheme, UserProfileScheme} from "@/types";
import ArticleDetailsSection from "@/app/articles/[articleId]/_components/articleDetailsSection/articleDetailsSection";
import ArticleManagementCard from "@/app/articles/[articleId]/_components/articleManagementCard/articleManagementCard";
import {FaRegHeart} from "react-icons/fa6";
import {CiHeart} from "react-icons/ci";
import {IoMdHeartEmpty} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import {IoHeart} from "react-icons/io5";
import LikeButton from "@/app/articles/[articleId]/_components/likeButton/likeButton";
import TotalLikesCard from "@/app/articles/[articleId]/_components/totalLikesCard/totalLikesCard";

export default function Page() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)
    const Articles = useSelector<RootState, RootState['Articles']>((state) => state.Articles)
    const [article, setArticle] = useState<ArticleScheme>();
    const [hasError, setHasError] = useState(false);
    const {articleId} = useParams<{articleId: string}>()
    const articleIdAsNumber = parseInt(articleId, 10)
    const dispatch = useDispatch<AppDispatch>();
    const contentRef = useRef<HTMLDivElement>(null);


    const getArticle = async (articleId: number): Promise<ArticleScheme> => {
        const json = await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/getArticles?articleId=${articleId}`);
        return json.articles[0]// 必要な記事を取得
    };

    useEffect(() => {
        const articleInState = Articles.find((article: ArticleScheme) => article.id === articleIdAsNumber);
        if (!!articleInState) {
            setArticle(articleInState); // 状態を更新
        } else {
            (async () => {
                const fetchedArticle = await getArticle(articleIdAsNumber);
                if(!!fetchedArticle){
                    setArticle(fetchedArticle); // 非同期で取得した記事を状態にセット
                }else {
                    setHasError(true);
                }
            })()
        }
        dispatch(applyWhereIam(`article-${articleIdAsNumber}`))
    }, [articleIdAsNumber, Articles]);


    useEffect(() => {
        if (article && contentRef.current) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(article.contents, "text/html");

            // 既存の内容をクリアしてから、新しい DOM を追加
            contentRef.current.innerHTML = ""; // または contentRef.current.textContent = ""
            contentRef.current.appendChild(doc.body); // HTML を `contentRef` に追加
        }
    }, [article]); // `article` が変更されるたびに再実行


    if (!article) {
        if(hasError) {
            return <p>記事が存在しません。</p>
        }
        return <p>now loading...</p>;
    }
    return (
        <div className={styles.div_0}>
            <ArticleDetailsSection article={article}/>
            <LikeButton articleId={article.id} userId={LoginStatus.userProfile.userId}/>
            <div className={styles.div_1}>
                {(() => article.authorProfile.userId === LoginStatus.userProfile.userId ? <ArticleManagementCard article={article}/> : undefined)()}
                {(() => article.authorProfile.userId === LoginStatus.userProfile.userId ? <TotalLikesCard likes={article.likes}/> : undefined)()}
                <h1 className={styles.h1_0}>{article.title}</h1>
                <div ref={contentRef} className={styles.div_2}/>
            </div>
        </div>
    )
}

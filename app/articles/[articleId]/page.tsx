'use client'

import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib-client/fetch";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import styles from './article.module.css'
import {ArticleScheme, FollowScheme, LikeScheme, UserProfileScheme, WatchHistoryScheme} from "@/types";
import ArticleDetailsSection from "@/app/articles/[articleId]/_components/articleDetailsSection/articleDetailsSection";
import ArticleManagementCard from "@/app/articles/[articleId]/_components/articleManagementCard/articleManagementCard";
import {FaRegHeart} from "react-icons/fa6";
import {CiHeart} from "react-icons/ci";
import {IoMdHeartEmpty} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import {IoHeart} from "react-icons/io5";
import LikeButton from "@/app/articles/[articleId]/_components/likeButton/likeButton";
import TotalLikesCard from "@/app/articles/[articleId]/_components/totalLikesCard/totalLikesCard";
import CommentsSection from "@/app/articles/[articleId]/_components/commentsSection/commentsSection";
import {setArticles} from "@/redux/slices/articlesSlice";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {appendWatchHistories} from "@/redux/slices/loginStatusSlice";
import ReducedArticleDetailsSection
    from "@/app/articles/[articleId]/_components/reducedArticleDetailsSection/reducedArticleDetailsSection";
import TotalLikesAndViewsCard
    from "@/app/articles/[articleId]/_components/totalLikesAndViewsCard/totalLikesAndViewsCard";

export default function Page() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)
    const [article, setArticle] = useState<ArticleScheme | undefined>();
    const [like, setLike] = useState<LikeScheme | undefined>(undefined);
    const [follow, setFollow] = useState<FollowScheme | undefined>(undefined);
    const [hasError, setHasError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const {articleId} = useParams<{articleId: string}>()
    const dispatch = useDispatch<AppDispatch>();
    const contentRef = useRef<HTMLDivElement>(null);


    const checkIsLiked = (likes: LikeScheme[]) => {
        const like = likes.filter((like: LikeScheme) => like.userId === LoginStatus.userProfile.userId)
        if(like.length > 0){
            setLike(like[0]);
        }else {
            setLike(undefined)
        }
    }

    const checkIsFollowed = (follows: FollowScheme[]) => {
        const follow =  follows.filter((follow: FollowScheme) => follow.following === article?.authorId)
        if(follow.length > 0){
            setFollow(follow[0])
        }else {
            setFollow(undefined)
        }
    }

    const postWatchHistory = async () => {
        if(LoginStatus.isLoggedIn){
            return await postDataToServerWithJson<{watchHistory: WatchHistoryScheme, error: string}>('/api/postWatchHistory', {articleId: articleId, userId: LoginStatus.userProfile.userId})
        }
    }

    const getArticle = async (articleId: string): Promise<ArticleScheme> => {
        const json = await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/getArticles?articleId=${articleId}`);
        return json.articles[0]// 必要な記事を取得
    };


    useEffect(() => {
        getArticle(articleId).then((fetchedArticle) => {
            if(!!fetchedArticle){
                setArticle(fetchedArticle); // 非同期で取得した記事を状態にセット
            }else {
                setHasError(true);
            }
        })
        dispatch(applyWhereIam(`article-${articleId}`))

    }, [articleId]);


    useEffect(() => {
        if (article && contentRef.current) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(article.contents, "text/html");

            // 既存の内容をクリアしてから、新しい DOM を追加
            contentRef.current.innerHTML = ""; // または contentRef.current.textContent = ""
            contentRef.current.appendChild(doc.body); // HTML を `contentRef` に追加

            postWatchHistory().then((json) => {
                if(!!json && !json.error){
                    console.log('hello')
                    dispatch(appendWatchHistories(json.watchHistory))
                }else {
                    //
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [article]); // `article` が変更されるたびに再実行

    useEffect(() => {
        if(article){
            checkIsLiked(article.likes)
            checkIsFollowed(LoginStatus.userProfile.followings)
        }
    }, [article, LoginStatus]);

    useEffect(() => {
        // クライアント側でのみ実行される
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);


    if (!article) {
        if(hasError) {
            return <p>記事が存在しません。</p>
        }
        return <p>now loading...</p>;
    }
    return (
        <div className={styles.div_0}>
            {(() => isMobile?<CommentsSection article={article} loginStatus={LoginStatus}/> : null)()}
            {(() => !isMobile?<ArticleDetailsSection article={article} loginStatus={LoginStatus} follow={follow} setFollow={setFollow} /> : null)()}
            {(() => isMobile?<ReducedArticleDetailsSection article={article} loginStatus={LoginStatus} follow={follow} setFollow={setFollow}/> : null)()}
            {(() => LoginStatus.isLoggedIn && !isMobile? <LikeButton articleId={article.id} userId={LoginStatus.userProfile.userId} like={like} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>} /> : null)()}
            <div className={styles.div_1}>
                {(() => article.authorProfile.userId === LoginStatus.userProfile.userId ? <ArticleManagementCard article={article}/> : undefined)()}
                <TotalLikesAndViewsCard article={article} loginStatus={LoginStatus} like={like} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>
                <h1 className={styles.h1_0}>{article.title}</h1>
                <div ref={contentRef} className={styles.div_2}/>
                {(() => !isMobile?<CommentsSection article={article} loginStatus={LoginStatus}/> : null)()}
            </div>
        </div>
    )
}

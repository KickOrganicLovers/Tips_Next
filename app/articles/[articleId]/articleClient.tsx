'use client'
export const dynamic = "force-dynamic";

import DOMPurify from "dompurify";
import {useParams} from "next/navigation";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import styles from './article.module.css'
import {ArticleScheme, FollowScheme, LikeForArticleScheme} from "@/types";
import ArticleDetailsSection from "@/app/articles/[articleId]/_components/articleDetailsSection/articleDetailsSection";
import ArticleManagementCard from "@/app/articles/[articleId]/_components/articleManagementCard/articleManagementCard";
import LikeButton from "@/app/articles/[articleId]/_components/likeButton/likeButton";
import CommentsSection from "@/app/articles/[articleId]/_components/commentsSection/commentsSection";
import ReducedArticleDetailsSection
    from "@/app/articles/[articleId]/_components/reducedArticleDetailsSection/reducedArticleDetailsSection";
import TotalLikesAndViewsCard
    from "@/app/articles/[articleId]/_components/totalLikesAndViewsCard/totalLikesAndViewsCard";
import RelatedArticlesSection
    from "@/app/articles/[articleId]/_components/relatedArticlesSection/relatedArticlesSection";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";

export default function ArticleClient(props: {article: ArticleScheme}) {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const appendWatchHistories = useUserStore((state) => state.appendWatchHistories)
    const [article, setArticle] = useState<ArticleScheme>(props.article);
    const [like, setLike] = useState<LikeForArticleScheme | undefined>(undefined);
    const [follow, setFollow] = useState<FollowScheme | undefined>(undefined);
    const [hasError, setHasError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const session = useSession();
    const contentRef = useRef<HTMLDivElement>(null);


    const checkIsLiked = (likes: LikeForArticleScheme[]) => {
        const like = likes.filter((like: LikeForArticleScheme) => like.userId === session.data?.user.id)
        if(like.length > 0){
            setLike(like[0]);
        }else {
            setLike(undefined)
        }
    }

    const checkIsFollowed = (follows: FollowScheme[]) => {
        const follow =  follows.filter((follow: FollowScheme) => follow.followerId === session.data?.user.id)
        if(follow.length > 0){
            setFollow(follow[0])
        }else {
            setFollow(undefined)
        }
    }


    useEffect(() => {
        setArticle(props.article);
        applyWhereIam(`article-${props.article.id}`)
    }, [props.article]);


    useEffect(() => {
        if (article && contentRef.current) {
            const parser = new DOMParser();
            const safeHtml = DOMPurify.sanitize(article.contents);
            const doc = parser.parseFromString(safeHtml, "text/html");

            // 既存の内容をクリアしてから、新しい DOM を追加
            contentRef.current.innerHTML = "";
            const frag = document.createDocumentFragment();
            Array.from(doc.body.childNodes).forEach(node => {
                // クローンしてフラグメントに追加（deep=true で全階層コピー）
                frag.appendChild(node.cloneNode(true));
            });


            contentRef.current.appendChild(frag);
            appendWatchHistories(session, article.id)
        }
    }, [article?.id]); // `article` が変更されるたびに再実行

    useEffect(() => {
        if(article){
            checkIsLiked(article.likes)
            checkIsFollowed(article.author.followers)
        }
    }, [article]);


    useEffect(() => {
        window.scrollTo(0, 0);
        // クライアント側でのみ実行される
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    return (
        //マジで改善の余地あり、これだとisMedia切り替え時に再レンダリング走る
        <div className={styles.div_0}>
            {!isMobile && <ArticleDetailsSection article={article} follow={follow} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>}
            {(session.status ==='authenticated' && !isMobile) &&
                <LikeButton isLoggedIn={session.status === 'authenticated'} articleId={article.id} like={like} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>}
            {isMobile &&  <div className={styles.div_4}><h1 className={styles.h1_1}>{article.title}</h1></div> }
            <div className={styles.div_1}>
                {!isMobile &&
                    <div className={styles.div_3}>
                        <ArticleManagementCard article={article}/>
                        <h1 className={styles.h1_0}>{article.title}</h1>
                        <TotalLikesAndViewsCard article={article} like={like} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>
                    </div>
                }
                <div ref={contentRef} className={styles.div_2}/>
                {!isMobile && <CommentsSection article={article} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>}
                {!isMobile && <RelatedArticlesSection isMobile={isMobile} articleId={article.id}/>}
            </div>
            {isMobile &&
                <div className={styles.div_3}>
                    <ArticleManagementCard article={article}/>
                    <TotalLikesAndViewsCard article={article} like={like} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>
                </div>
            }
            {isMobile && <ReducedArticleDetailsSection article={article} follow={follow} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>}
            {isMobile && <CommentsSection article={article} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>}
            {isMobile && <RelatedArticlesSection isMobile={isMobile} articleId={article.id}/>}
        </div>
    )
}

'use client'

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

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const appendWatchHistories = useUserStore((state) => state.appendWatchHistories)
    const [article, setArticle] = useState<ArticleScheme | undefined>();
    const [like, setLike] = useState<LikeForArticleScheme | undefined>(undefined);
    const [follow, setFollow] = useState<FollowScheme | undefined>(undefined);
    const [hasError, setHasError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const session = useSession();

    const {articleId} = useParams<{articleId: string}>()
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


    const getArticle = async (articleId: string): Promise<ArticleScheme> => {
        const json = await getDataFromServerWithJson<{articles: ArticleScheme[]}>(`/api/getArticles?articleId=${articleId}`);
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
        applyWhereIam(`article-${articleId}`)
    }, [articleId]);


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
            appendWatchHistories(session, articleId)
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


    if (!article) {
        if(hasError) {
            return <p>記事が存在しません。</p>
        }
        return <p>now loading...</p>;
    }
    return (
        //マジで改善の余地あり、これだとisMedia切り替え時に再レンダリング走る
        <div className={styles.div_0}>
            {(() => !isMobile ? <ArticleDetailsSection article={article} follow={follow}
                                                       setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/> : null)()}
            {(() => session.status ==='authenticated' && !isMobile ?
                <LikeButton isLoggedIn={session.status === 'authenticated'} articleId={article.id} like={like}
                            setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/> : null)()}
            <div className={styles.div_1}>
                {(() => article.author.id === session.data?.user.id ?
                    <ArticleManagementCard article={article}/> : undefined)()}
                <TotalLikesAndViewsCard article={article} like={like}
                                        setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/>
                <h1 className={styles.h1_0}>{article.title}</h1>
                <div ref={contentRef} className={styles.div_2}/>
                {(() => !isMobile ? <CommentsSection article={article} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/> : null)()}
                {(() => !isMobile ? <RelatedArticlesSection isMobile={isMobile}/> : null)()}
            </div>
            {(() => isMobile ? <ReducedArticleDetailsSection article={article} follow={follow}
                                                             setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/> : null)()}
            {(() => isMobile ? <CommentsSection article={article} setArticle={setArticle as Dispatch<SetStateAction<ArticleScheme>>}/> : null)()}
            {(() => isMobile ? <RelatedArticlesSection isMobile={isMobile}/> : null)()}
        </div>
    )
}

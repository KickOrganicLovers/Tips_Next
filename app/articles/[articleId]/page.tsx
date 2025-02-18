'use client'

import {useParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {Article} from "@prisma/client";
import {useEffect, useRef, useState} from "react";
import {getDataFromServerWithJson} from "@/app/lib-client/fetch";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";

export default function Page() {
    const Articles = useSelector<RootState, RootState['Articles']>((state) => state.Articles)
    const [article, setArticle] = useState<Article | undefined>();
    const [hasError, setHasError] = useState(false);
    const {articleId} = useParams<{articleId: string}>()
    const articleIdAsNumber = parseInt(articleId, 10)
    const dispatch = useDispatch<AppDispatch>();

    const contentRef = useRef<HTMLDivElement>(null);


    const getArticle = async (articleId: number): Promise<Article> => {
        const json = await getDataFromServerWithJson<{articles: Article[], error: string}>(`/api/getArticles?id=${articleId}`);
        return json.articles[0]// 必要な記事を取得
    };

    useEffect(() => {
        const articleInState = Articles.find((article: Article) => article.id === articleIdAsNumber);
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
    return <div ref={contentRef} />;
}

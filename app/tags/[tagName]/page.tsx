'use client'

import styles from './tags.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {useEffect, useState} from "react";
import {ArticleScheme, CategoryScheme, LikeScheme} from "@/types";
import ExtendedArticleContainer from "@/app/_components/common/extendedArticleContainer/extendedArticleContainer";
import {useParams, useRouter} from "next/navigation";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {findCategoryById} from "@/lib-client/processing";

export default function Page () {
    const [articles, setArticles] = useState<ArticleScheme[]>([]);
    const router = useRouter();
    const dispatch = useDispatch()
    const {tagName} = useParams<{tagName: string}>()


    const getArticlesWithTag = async (tag: string) => {
        return await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/getArticles?tagName=${tag}`)
    }

    useEffect(() => {
        console.log(tagName)
        getArticlesWithTag(tagName).then((json) => {
            if(!json.error){
                setArticles(json.articles)
            }
        })
    }, [tagName]);


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoTag.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>{decodeURIComponent(tagName)}</h1>
                    <p className={styles.p_0}>{`${articles.length}件の記事`}</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {articles.map((article: ArticleScheme, index: number) => <ArticleContainer article= {article} key={index}/>)}
            </div>
        </div>
    )
}

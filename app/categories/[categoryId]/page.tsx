'use client'
export const dynamic = "force-dynamic";
import styles from './category.module.css'
import React, {useEffect, useState} from "react";
import {ArticleScheme, CategoryScheme} from "@/types";
import {useParams, useRouter} from "next/navigation";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {findCategoryById} from "@/lib/lib-client/processing";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useCategoriesStore} from "@/lib/lib-client/stores/categoriesStore";
import BoyWithCompass from "@/app/_components/common/boyWithCompass/boyWithCompass";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

export default function Page () {
    const appendError = useErrorStore(state => state.appendError);
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const [viewingArticles, setViewingArticles] = useState<ArticleScheme[]>([]);
    const [articleLength, setArticleLength] = useState(0);
    const [category, setCategory] = useState<CategoryScheme>();
    const router = useRouter();
    const {categoryId} = useParams<{categoryId: string}>()
    const categories = useCategoriesStore(state => state.categories)
    const [isMax, setIsMax] = useState<boolean>(false);


    const getArticlesWithCategory = async () => {
        postDataToServerWithJson<{articles: ArticleScheme[], articleLength: number}>(`/api/getArticles/category`, {categoryId, viewingArticleIds: viewingArticles.map(viewingArticle => viewingArticle.id)}).then((json) => {
            if(!!json){
                setArticleLength(json.articleLength);
                setViewingArticles((prevState) => [...prevState, ...json.articles]);
                setIsMax(json.articles.length < 30)
            }
        }).catch((error) => {
            appendError(error)
        })
    }


    useEffect(() => {
        setIsMax(false)
        setViewingArticles([])
        const category = findCategoryById(categories, categoryId)
        if(!!category){
            setCategory(category)
            applyWhereIam(`category-${category.categoryName}`)
        }else {
            router.push('/')
        }
    }, [categories, categoryId])


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoCategory.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>{category?.categoryName}</h1>
                    <p className={styles.p_0}>{`${articleLength}件の記事`}</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {viewingArticles.map((article: ArticleScheme, index: number) => (
                    <ArticleContainer article= {article} key={index} isDummy={false} isFirstDummy={false}/>
                ))}
                {!isMax && Array.from({length: 30}).map((_, index) => (
                    <ArticleContainer isDummy={true} key ={index} isFirstDummy={index === 0} firstDummy_onVisible={getArticlesWithCategory}/>
                ))}
            </div>
            {viewingArticles.length === 0 && isMax?
                <div className={styles.div_4}>
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

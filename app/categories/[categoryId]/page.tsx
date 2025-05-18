'use client'

import styles from './category.module.css'
import {useEffect, useState} from "react";
import {ArticleScheme, CategoryScheme} from "@/types";
import {useParams, useRouter} from "next/navigation";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import ArticleContainer from "@/app/_components/common/articleContainer/articleContainer";
import {findCategoryById} from "@/lib/lib-client/processing";
import useWhereIamStore from "@/lib/lib-client/stores/whereIamStore";
import useCategoriesStore from "@/lib/lib-client/stores/categoriesStore";

export default function Page () {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const [articles, setArticles] = useState<ArticleScheme[]>([]);
    const [category, setCategory] = useState<CategoryScheme>();
    const router = useRouter();
    const {categoryId} = useParams<{categoryId: string}>()
    const categories = useCategoriesStore(state => state.categories)


    const getArticlesWithCategory = async (id: string) => {
        return await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/getArticles?categoryId=${id}`)
    }


    useEffect(() => {
        const category = findCategoryById(categories, categoryId)
        if(!!category){
            setCategory(category)
            applyWhereIam(`category-${category.categoryName}`)

            getArticlesWithCategory(categoryId).then((json)=> {
                if(!json.error){
                    setArticles(json.articles)
                }
            })

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
                    <p className={styles.p_0}>{`${articles.length}件の記事`}</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {articles.map((article: ArticleScheme, index: number) => <ArticleContainer article= {article} key={index}/>)}
            </div>
        </div>
    )
}

'use client'

import styles from './category.module.css'
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
    const [category, setCategory] = useState<CategoryScheme>();
    const router = useRouter();
    const dispatch = useDispatch()
    const {categoryId} = useParams<{categoryId: string}>()
    const Categories = useSelector<RootState, RootState['Categories']>((state) => state.Categories)


    const getArticlesWithCategory = async (id: string) => {
        return await getDataFromServerWithJson<{articles: ArticleScheme[], error: string}>(`/api/getArticles?categoryId=${id}`)
    }


    useEffect(() => {
        const category = findCategoryById(Categories, categoryId)
        if(!!category){
            setCategory(category)
            dispatch(applyWhereIam(`category-${category.categoryName}`))

            getArticlesWithCategory(categoryId).then((json)=> {
                if(!json.error){
                    setArticles(json.articles)
                }
            })

        }else {
            router.push('/')
        }
    }, [Categories, categoryId])


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoCategory.png' alt='fire' className={styles.img_0}/>
                <h1 className={styles.h1_0}>{category?.categoryName}</h1>
                <p className={styles.p_0}>{`${articles.length}件の記事`}</p>
            </div>
            <div className={styles.div_2}>
                {articles.map((article: ArticleScheme, index: number) => <ArticleContainer article= {article} key={index}/>)}
            </div>
        </div>
    )
}

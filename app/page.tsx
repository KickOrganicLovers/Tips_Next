'use client'

import styles from './app.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "@/redux/store";
import {applyWhereIam} from "@/redux/whereIamSlice";
import {ArticleScheme} from "@/typs";
import ArticleContainer from "@/app/_components/articleContainer/articleContainer";

export default function Page(){
    const [articleArray, setArticleArray] = useState<ArticleScheme[]>([]);
    const WhereIam = useSelector<RootState, RootState['WhereIam']>((state: RootState) => state.WhereIam)
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(applyWhereIam('app'))
        fetchData().then((data) => {
            if(data !== undefined){
                setArticleArray(data)
            }
        })
    }, []);

    async function fetchData(): Promise<ArticleScheme[] | undefined> {
        const res = await fetch('/api/getArticle')
        const data = await res.json()
        console.log(data)
        if(Array.isArray(data)){
            return data
        }
    }



    return (
        <div className={styles.div_0}>
            {(() => {
                const items = []
                for (let i = 0; i < articleArray.length; i++) {
                    if (articleArray[i] === undefined) {
                        items.push(<ArticleContainer title={''} thumbnailImgUrl={''} sentence={''} author={''}/>)
                    } else {
                        items.push(<ArticleContainer title={articleArray[i].title} thumbnailImgUrl={articleArray[i].imgLink}
                                                     sentence={articleArray[i].sentence} author={articleArray[i].author}/>)
                    }
                }
                return items
            })()}
        </div>
    )
}
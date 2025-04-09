'use client'

import styles from './likes.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {useEffect} from "react";
import {ArticleScheme, LikeScheme} from "@/types";
import ExtendedArticleContainer from "@/app/_components/common/extendedArticleContainer/extendedArticleContainer";
import {useRouter} from "next/navigation";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";

export default function Page () {
    const dispatch = useDispatch()
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)

    useEffect(() => {
        dispatch(applyWhereIam('likes'))
    }, [LoginStatus])




    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoHeart.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>Likes</h1>
                    <p className={styles.p_0}>いいねした記事が表示されます</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {(() => {
                    const likes = [...LoginStatus.userProfile.likes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    return likes.map((like: LikeScheme, index: number) => <ReducedArticleContainer article={like.article as ArticleScheme} key={index}/>)
                })()}
            </div>
        </div>
    )
}

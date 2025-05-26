'use client'

import styles from './likes.module.css'
import {useEffect} from "react";
import {ArticleScheme, LikeForArticleScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";

export default function Page () {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const userProfile = useUserProfileStore(state => state.userProfile)

    useEffect(() => {
        applyWhereIam('likes')
    }, [userProfile.likesForArticle])




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
                    const likes = [...userProfile.likesForArticle].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    return likes.map((like: LikeForArticleScheme, index: number) => <ReducedArticleContainer
                        article={like.article as ArticleScheme} key={index}/>)
                })()}
            </div>
        </div>
    )
}

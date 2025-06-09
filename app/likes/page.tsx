'use client'

import styles from './likes.module.css'
import React, {useEffect} from "react";
import {ArticleScheme, LikeForArticleScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import GirlWithBalloon from '@/public/images/girlWithBalloon.svg'
import Link from "next/link";
import {useSession} from "next-auth/react";

export default function Page () {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const session = useSession();

    useEffect(() => {
        applyWhereIam('likes')
    }, [userProfile.likesForArticle])




    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoHeart.png' alt='fire' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>Likes</h1>
                    <p className={styles.p_0}>いいねした記事が<wbr/>表示されます</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {(() => {
                    const likes = [...userProfile.likesForArticle].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    return likes.map((like: LikeForArticleScheme, index:number) => <ReducedArticleContainer
                        article={like.article as ArticleScheme} key={index}/>)
                })()}

                {userProfile.likesForArticle.length === 0?
                    <div className={styles.div_4}>
                        <GirlWithBalloon className={styles.GirlWithBalloon}/>
                        <h2 className={styles.h2_0}>ここにはまだ何もありません...</h2>
                        <h3 className={styles.h3_0}>There is nothing here...</h3>
                        {session.status === 'authenticated' ?
                            undefined
                            :
                            <p　className={styles.p_1}>記事をいいねするには<Link className={styles.Link} href={'/login'}>ログイン</Link></p>
                        }
                    </div>
                    :
                    undefined
                }
            </div>

        </div>
    )
}

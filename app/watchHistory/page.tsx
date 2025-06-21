'use client'

import styles from './watchHistory.module.css'
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {ArticleScheme, WatchHistoryScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";
import GirlWithBalloon from "@/public/images/girlWithBalloon.svg";
import Link from "next/link";


export default function Page () {

    const user = useUserStore(state => state.user)
    const session = useSession();

    const classifyWatchHistories = (watchHistories: WatchHistoryScheme[]) => {
        return watchHistories.reduce((acc, watchHistory) => {
            const dateKey = new Date(watchHistory.createdAt).toLocaleDateString('ja-JP',{timeZone: 'Asia/Tokyo'})
            if (!acc[dateKey]) {
                acc[dateKey] = []
            }
            acc[dateKey].push(watchHistory as WatchHistoryScheme)
            return acc;
        }, {} as Record<string, WatchHistoryScheme[]>)
    }


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoHistory.png' alt='history' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>History</h1>
                    <p className={styles.p_0}>過去視聴した記事が<wbr/>表示されます</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {(() => {
                    const watchHistories = classifyWatchHistories(user.watchHistories)
                    return Object.entries(watchHistories).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).map(([date,watchHistories], index) => (
                        <div className={styles.div_4} key={index}>
                            <h2 className={styles.h2_0}>{`${date} に閲覧`}</h2>
                            <div className={styles.div_5}>
                                {watchHistories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((watchHistory, index) => <ReducedArticleContainer article={watchHistory.article as ArticleScheme} key={index}/>)}
                            </div>
                        </div>
                    ))
                })()}

                {user.watchHistories.length === 0?
                    <div className={styles.div_4}>
                        <GirlWithBalloon className={styles.GirlWithBalloon}/>
                        <h2 className={styles.h2_1}>ここにはまだ何もありません...</h2>
                        <h3 className={styles.h3_0}>There is nothing here...</h3>
                        {session.status === 'authenticated' ?
                            undefined
                            :
                            <p className={styles.p_1}>視聴履歴を表示するには<Link className={styles.Link} href={'/login'}>ログイン</Link></p>
                        }
                    </div>
                    :
                    undefined
                }
            </div>
        </div>
    )
}

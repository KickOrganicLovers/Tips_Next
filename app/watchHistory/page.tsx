'use client'

import styles from './watchHistory.module.css'
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {ArticleScheme, WatchHistoryScheme} from "@/types";
import ReducedArticleContainer from "@/app/_components/common/reducedArticleContainer/reducedArticleContainer";
import loginStatusStore from "@/lib/lib-client/stores/loginStatusStore";

export default function Page () {
    const router = useRouter();
    const loginStatus = loginStatusStore(state => state.loginStatus)

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



    useEffect(() => {
        if (loginStatus.isLoggedIn) {

        }else {
            router.push('/login')
        }
    }, [loginStatus])


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img src='/images/logoHistory.png' alt='history' className={styles.img_0}/>
                <div className={styles.div_2}>
                    <h1 className={styles.h1_0}>History</h1>
                    <p className={styles.p_0}>視聴履歴が表示されます</p>
                </div>
            </div>
            <div className={styles.div_3}>
                {(() => {
                    const watchHistories = classifyWatchHistories(loginStatus.userProfile.watchHistories)
                    return Object.entries(watchHistories).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).map(([date,watchHistories], index) => (
                        <div className={styles.div_4} key={index}>
                            <h2 className={styles.h2_0}>{`${date} に閲覧`}</h2>
                            <div className={styles.div_5}>
                                {watchHistories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((watchHistory, index) => <ReducedArticleContainer article={watchHistory.article as ArticleScheme} key={index}/>)}
                            </div>
                        </div>
                    ))
                })()}
                {/*{loginStatus.userProfile.watchHistories.map((watchHistory: WatchHistoryScheme, index: number) => <div><ExtendedArticleContainer article={watchHistory.article as ArticleScheme}/></div>)}*/}
            </div>
        </div>
    )
}

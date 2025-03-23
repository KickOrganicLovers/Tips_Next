import styles from './subscribedAccountCard.module.css'
import {FollowScheme, LoginStatusScheme} from "@/types";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface props {
    loginStatus: LoginStatusScheme
}

export default function SubscribedAccountCard(props: props) {
    const router = useRouter();

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>登録済みアカウント</div>
            {props.loginStatus.userProfile.followings?.map((following, index) => (
                <div key={index} className={styles.div_2} onClick={() => {router.push(`/userProfile/${following.followingWithProfile?.userId}`)}}>
                    <img alt={'profile'} src={following.followingWithProfile?.profileImageUrl} className={styles.img_0}/>
                    <p className={styles.p_1}>{following.followingWithProfile?.username}</p>
                </div>))}
            {(() => props.loginStatus.userProfile.followings?.length === 0 ? <p className={styles.p_0}>登録したアカウントはありません。</p> : null)()}
        </div>
    )
}

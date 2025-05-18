import styles from './followingAccountCard.module.css'
import {LoginStatusScheme} from "@/types";
import {Dispatch, SetStateAction} from "react";
import {useRouter} from "next/navigation";

interface props {
    loginStatus: LoginStatusScheme
    setSideBarStatus: Dispatch<SetStateAction<{ isActive: boolean }>>
}

export default function FollowingAccountCard(props: props) {
    const router = useRouter();

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>フォロー済みアカウント</div>
            {props.loginStatus.userProfile.followings?.map((following, index) => (
                <div key={index} className={styles.div_2} onClick={() => {
                    router.push(`/userProfile/${following.followingWithProfile?.userId}`);
                    props.setSideBarStatus({isActive: false})
                }}>
                    <img alt={'profile'} src={following.followingWithProfile?.profileImageUrl} className={styles.img_0}/>
                    <p className={styles.p_1}>{following.followingWithProfile?.username}</p>
                </div>))}
            {(() => props.loginStatus.userProfile.followings?.length === 0 ? <p className={styles.p_0}>登録したアカウントはありません。</p> : null)()}
        </div>
    )
}

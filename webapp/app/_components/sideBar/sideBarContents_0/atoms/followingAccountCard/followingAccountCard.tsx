import styles from './followingAccountCard.module.css'
import { UserScheme} from "@/types";
import {Dispatch, SetStateAction} from "react";
import {useRouter} from "next/navigation";

interface props {
    user: UserScheme,
    setSideBarStatus: Dispatch<SetStateAction<{ isActive: boolean }>>
}

export default function FollowingAccountCard(props: props) {
    const router = useRouter();

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>フォロー済みアカウント</div>
            {props.user.followings?.map((following, index) => (
                <div key={index} className={styles.div_2} onClick={() => {
                    router.push(`/users/${following.followingId}`);
                    props.setSideBarStatus({isActive: false})
                }}>
                    <img alt={'profile'} src={following.following?.image} className={styles.img_0}/>
                    <p className={styles.p_1}>{following.following?.name}</p>
                </div>))}
            {(() => props.user.followings?.length === 0 ? <p className={styles.p_0}>登録したアカウントはありません。</p> : null)()}
        </div>
    )
}

import styles from './totalFollowCard.module.css'
import {UserProfileScheme} from "@/types";


interface props {
    userProfile: UserProfileScheme;
}
export default function TotalFollowCard(props: props) {

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <p className={styles.p_0}>フォロワー</p>
                <p className={styles.p_1}>{props.userProfile?.followers.length}</p>
            </div>
            <div className={styles.div_1}>
                <p className={styles.p_0}>フォロー中</p>
                <p className={styles.p_1}>{props.userProfile?.followings.length}</p>
            </div>
        </div>
    )
}

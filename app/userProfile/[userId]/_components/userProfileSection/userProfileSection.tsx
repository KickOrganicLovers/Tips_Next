import styles from './userProfileSection.module.css'
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import {FollowScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import PostFollowCard from "@/app/_components/common/postFollowCard/postFollowCard";

interface props {
    userProfile: UserProfileScheme
    loginStatus: LoginStatusScheme
    follow: FollowScheme
}
export default function UserProfileSection(props: props) {

    return (
        <div className={styles.div_0}>
            <div className={styles.div_2}>
                <div className={styles.div_3}>
                    <img alt='profileImage' src={props.userProfile?.profileImageUrl} className={styles.img_0}/>
                    <h1 className={styles.h1_0}>{props.userProfile?.username}</h1>
                </div>
                <div className={styles.div_4}>
                    <TotalFollowCard userProfile={props.userProfile as UserProfileScheme}/>
                    <div className={styles.div_1}>{props.userProfile?.introduction}</div>
                </div>
            </div>
            {(() => !!props.loginStatus && props.loginStatus.isLoggedIn ? <PostFollowCard follow={props.follow} userProfile={props.userProfile} loginStatus={props.loginStatus} />: null )()}
        </div>
    )


}

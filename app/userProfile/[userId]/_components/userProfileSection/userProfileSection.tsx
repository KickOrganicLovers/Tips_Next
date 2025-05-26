import styles from './userProfileSection.module.css'
import {FollowScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import PostFollowCard from "@/app/_components/common/postFollowCard/postFollowCard";
import {useSession} from "next-auth/react";
import {Dispatch, SetStateAction} from "react";

interface props {
    userProfile_myOwn: UserProfileScheme
    userProfile: UserProfileScheme
    setUserProfile: Dispatch<SetStateAction<UserProfileScheme>>
    follow: FollowScheme
}
export default function UserProfileSection(props: props) {
    const session = useSession();

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
            {(() => session.status === 'authenticated' ? <PostFollowCard follow={props.follow} userProfile={props.userProfile} setUserProfile={props.setUserProfile}/>: null )()}
        </div>
    )


}

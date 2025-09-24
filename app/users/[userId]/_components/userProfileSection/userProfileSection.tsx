import styles from './userProfileSection.module.css'
import {FollowScheme, UserScheme} from "@/types";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import PostFollowCard from "@/app/_components/common/postFollowCard/postFollowCard";
import {useSession} from "next-auth/react";
import {Dispatch, SetStateAction} from "react";

interface props {
    user: UserScheme
    setUser: Dispatch<SetStateAction<UserScheme>>
    follow: FollowScheme
}
export default function UserProfileSection(props: props) {
    const session = useSession();

    return (
        <div className={styles.div_0}>
            <div className={styles.div_2}>
                <div className={styles.div_3}>
                    <img alt='profileImage' src={props.user?.image} className={styles.img_0}/>
                    <h1 className={styles.h1_0}>{props.user?.name}</h1>
                </div>
                <div className={styles.div_4}>
                    <TotalFollowCard user={props.user as UserScheme}/>
                    <div className={styles.div_1}>
                        <div className={styles.div_5}>{props.user?.introduction}</div>
                    </div>
                </div>
            </div>
            {(() => session.status === 'authenticated' ? <PostFollowCard follow={props.follow} user={props.user} setUser={props.setUser}/>: null )()}
        </div>
    )


}

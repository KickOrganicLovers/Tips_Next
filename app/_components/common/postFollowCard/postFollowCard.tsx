import {FollowScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import classNames from "classnames";
import styles from './postFollowCard.module.css'
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import {useSession} from "next-auth/react";
import {Dispatch, SetStateAction} from "react";

interface props {
    follow: FollowScheme;
    userProfile: UserProfileScheme;
    setUserProfile: Dispatch<SetStateAction<UserProfileScheme>>;
}

export default function PostFollowCard(props: props) {
    const postFollowing = useUserProfileStore(state => state.postFollowing)
    const session = useSession()

    const clickEventHandler = () => {
        console.log('呼び出されました')
        console.log(!!props.setUserProfile)
        postFollowing(session, props.userProfile.userId, props.follow, props.setUserProfile)
    }

    return (
        <div>
            {(() => session.status === 'authenticated' ? <button
                className={(() => !!props.follow ? classNames(styles.button_0, styles.active) : classNames(styles.button_0))()}
                onClick={clickEventHandler}>{(() => !!props.follow ? 'フォロー済み' : 'フォロー')()}</button> : null)()}
        </div>
    )
}

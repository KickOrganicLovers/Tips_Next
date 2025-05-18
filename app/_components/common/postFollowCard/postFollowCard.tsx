import {FollowScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import classNames from "classnames";
import styles from './postFollowCard.module.css'
import useLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";

interface props {
    follow: FollowScheme;
    userProfile: UserProfileScheme;
    loginStatus: LoginStatusScheme;
}

export default function PostFollowCard(props: props) {
    const postFollowing = useLoginStatusStore(state => state.postFollowing)

    const clickEventHandler = () => {
        postFollowing(props.userProfile.userId, props.follow)
    }

    return (
        <div>
            {(() => props.loginStatus.isLoggedIn ? <button
                className={(() => !!props.follow ? classNames(styles.button_0, styles.active) : classNames(styles.button_0))()}
                onClick={clickEventHandler}>{(() => !!props.follow ? 'フォロー済み' : 'フォロー')()}</button> : null)()}
        </div>
    )
}

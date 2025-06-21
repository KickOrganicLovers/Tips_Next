import {FollowScheme, UserScheme} from "@/types";
import classNames from "classnames";
import styles from './postFollowCard.module.css'
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useSession} from "next-auth/react";
import {Dispatch, SetStateAction} from "react";

interface props {
    follow: FollowScheme;
    user: UserScheme;
    setUser: Dispatch<SetStateAction<UserScheme>>;
}

export default function PostFollowCard(props: props) {
    const postFollowing = useUserStore(state => state.postFollowing)
    const session = useSession()

    const clickEventHandler = () => {
        console.log('呼び出されました')
        console.log(!!props.setUser)
        postFollowing(session, props.user.id, props.follow, props.setUser)
    }

    return (
        <div>
            {(() => session.status === 'authenticated' ? <button
                className={(() => !!props.follow ? classNames(styles.button_0, styles.active) : classNames(styles.button_0))()}
                onClick={clickEventHandler}>{(() => !!props.follow ? 'フォロー済み' : 'フォロー')()}</button> : null)()}
        </div>
    )
}

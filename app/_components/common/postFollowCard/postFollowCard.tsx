import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {FollowScheme, LoginStatusScheme, UserProfileScheme} from "@/types";
import {editFollowings} from "@/redux/slices/loginStatusSlice";
import classNames from "classnames";
import styles from './postFollowCard.module.css'

interface props {
    follow: FollowScheme;
    userProfile: UserProfileScheme;
    loginStatus: LoginStatusScheme;
}

export default function PostFollowCard(props: props) {
    const dispatch = useDispatch<AppDispatch>();

    const postFollow = async () =>{
        return await postDataToServerWithJson<{follow: FollowScheme, error: string}>('/api/postFollow', {following: props.userProfile.userId, follower: props.loginStatus.userProfile.userId, follow: props.follow})
    }

    const clickEventHandler = () => {
        if(props.follow){
            postFollow().then(json => {
                if(json.follow && !json.error){
                    dispatch(editFollowings({following: json.follow, remove: true}))
                }
            })
        }else {
            postFollow().then(json => {
                if(json.follow && !json.error){
                    dispatch(editFollowings({following: json.follow, remove: false}))
                }
            })
        }
    }

    return (
        <div>
            {(() => props.loginStatus.isLoggedIn ? <button
                className={(() => !!props.follow ? classNames(styles.button_0, styles.active) : classNames(styles.button_0))()}
                onClick={clickEventHandler}>{(() => !!props.follow ? 'フォロー済み' : 'フォロー')()}</button> : null)()}
        </div>
    )
}

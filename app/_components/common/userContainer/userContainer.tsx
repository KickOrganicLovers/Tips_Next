import styles from './userContainer.module.css'
import {FollowScheme, UserProfileScheme} from "@/types";
import PostFollowCard from "@/app/_components/common/postFollowCard/postFollowCard";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import {useRouter} from "next/navigation";
import classNames from "classnames";

interface props {
    userProfile: UserProfileScheme
    setUsers: Dispatch<SetStateAction<UserProfileScheme[]>>
}
export default function UserContainer(props: props) {
    const userProfile_myOwn = useUserProfileStore(state => state.userProfile);
    const [follow, setFollow] = useState<FollowScheme>();
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted? classNames(styles.div_0, styles.active) : classNames(styles.div_0)
    const router = useRouter();

    const setUserProfile: Dispatch<SetStateAction<UserProfileScheme>> = (newUserProfileOrAdapter) => {
        props.setUsers((prevState) => {
            const target = prevState.filter(
                (userProfile) => userProfile.userId === props.userProfile.userId
            )[0]
            if(target !== undefined){
                if(typeof newUserProfileOrAdapter === "function"){
                    const updater = newUserProfileOrAdapter as (prevState: UserProfileScheme) => UserProfileScheme;

                    return[
                        ...prevState.filter(userProfile => userProfile.userId !== target.userId),
                        updater(target)
                    ]
                }else {
                    return [
                        ...prevState.filter(userProfile => userProfile.userId !== target.userId),
                        newUserProfileOrAdapter
                    ]
                }
            }
            return prevState
        })
    }


    const checkIsFollowed = (follows: FollowScheme[]) => {
        const follow =  follows.filter((follow: FollowScheme) => follow.following === props.userProfile.userId)
        if(follow.length > 0){
            setFollow(follow[0])
        }else {
            setFollow(undefined)
        }
    }

    const clickEventHandler = () => {
        router.push(`/userProfile/${props.userProfile.userId}`)
    }

    useEffect(() => {
        checkIsFollowed(userProfile_myOwn.followings)
    }, [props.userProfile])

    useEffect(() => {
        setIsMounted(true)
    })

    return (
        <div className={className}>
            <img className={styles.img_0} src={props.userProfile.profileImageUrl} alt='profileImage'/>
            <h2 className={styles.h2_0} onClick={clickEventHandler}>{props.userProfile.username}</h2>
            <TotalFollowCard userProfile={props.userProfile}/>
            <div className={styles.div_1}>{props.userProfile.introduction}</div>
            <div className={styles.div_2}>
                <PostFollowCard follow={follow as FollowScheme} userProfile={props.userProfile} setUserProfile={setUserProfile}/>
            </div>
        </div>
    )
}

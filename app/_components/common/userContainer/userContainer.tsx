import styles from './userContainer.module.css'
import {FollowScheme, UserScheme} from "@/types";
import PostFollowCard from "@/app/_components/common/postFollowCard/postFollowCard";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useRouter} from "next/navigation";
import classNames from "classnames";

interface props {
    user: UserScheme
    setUsers: Dispatch<SetStateAction<UserScheme[]>>
}
export default function UserContainer(props: props) {
    const user_myOwn = useUserStore(state => state.user);
    const [follow, setFollow] = useState<FollowScheme>();
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted? classNames(styles.div_0, styles.active) : classNames(styles.div_0)
    const router = useRouter();

    const setUser: Dispatch<SetStateAction<UserScheme>> = (newuserOrAdapter) => {
        props.setUsers((prevState) => {
            const target = prevState.filter(
                (user) => user.id === props.user.id
            )[0]
            if(target !== undefined){
                if(typeof newuserOrAdapter === "function"){
                    const updater = newuserOrAdapter as (prevState: UserScheme) => UserScheme;

                    return[
                        ...prevState.filter(user => user.id !== target.id),
                        updater(target)
                    ]
                }else {
                    return [
                        ...prevState.filter(user => user.id !== target.id),
                        newuserOrAdapter
                    ]
                }
            }
            return prevState
        })
    }


    const checkIsFollowed = (follows: FollowScheme[]) => {
        const follow =  follows.filter((follow: FollowScheme) => follow.followingId === props.user.id)
        if(follow.length > 0){
            setFollow(follow[0])
        }else {
            setFollow(undefined)
        }
    }

    const clickEventHandler = () => {
        router.push(`/user/${props.user.id}`)
    }

    useEffect(() => {
        checkIsFollowed(user_myOwn.followings)
    }, [props.user])

    useEffect(() => {
        setIsMounted(true)
    })

    return (
        <div className={className}>
            <img className={styles.img_0} src={props.user.image} alt='profileImage'/>
            <h2 className={styles.h2_0} onClick={clickEventHandler}>{props.user.name}</h2>
            <TotalFollowCard user={props.user}/>
            <div className={styles.div_1}>{props.user.introduction}</div>
            <div className={styles.div_2}>
                <PostFollowCard follow={follow as FollowScheme} user={props.user} setUser={setUser}/>
            </div>
        </div>
    )
}

import styles from './userContainer.module.css'
import {FollowScheme, UserScheme} from "@/types";
import PostFollowCard from "@/app/_components/common/postFollowCard/postFollowCard";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useRouter} from "next/navigation";
import classNames from "classnames";

interface props {
    user?: UserScheme
    setUsers?: Dispatch<SetStateAction<UserScheme[]>>
    isDummy?: boolean;
    isFirstDummy?: boolean;
    firstDummy_onVisible?: () => Promise<void>
}
export default function UserContainer(props: props) {
    const user_myOwn = useUserStore(state => state.user);
    const [follow, setFollow] = useState<FollowScheme>();
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted? classNames(styles.div_0, styles.active) : classNames(styles.div_0)
    const router = useRouter();
    const ref = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef(false);

    const setUser: Dispatch<SetStateAction<UserScheme>> = (newUserOrAdapter) => {
        if(props.isDummy || !props.user || !props.setUsers) return
        props.setUsers((prevState) => {
            const target = prevState.filter(
                (user) => user.id === props.user?.id
            )[0]
            if(target !== undefined){
                if(typeof newUserOrAdapter === "function"){
                    const updater = newUserOrAdapter as (prevState: UserScheme) => UserScheme;

                    return[
                        ...prevState.filter(user => user.id !== target.id),
                        updater(target)
                    ]
                }else {
                    return [
                        ...prevState.filter(user => user.id !== target.id),
                        newUserOrAdapter
                    ]
                }
            }
            return prevState
        })
    }


    const checkIsFollowed = (follows: FollowScheme[]) => {
        const follow =  follows.filter((follow: FollowScheme) => follow.followingId === props.user?.id)
        if(follow.length > 0){
            setFollow(follow[0])
        }else {
            setFollow(undefined)
        }
    }

    const clickEventHandler = () => {
        if(!props.user || !props.setUsers) return
        router.push(`/user/${props.user.id}`)
    }

    useEffect(() => {
        checkIsFollowed(user_myOwn.followings)
    }, [props.user])

    useEffect(() => {
        const target = ref?.current;
        if (!target || !props.isFirstDummy) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetchingRef.current) {
                    isFetchingRef.current = true;

                    props.firstDummy_onVisible?.().finally(() => {
                        isFetchingRef.current = false;
                    });
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [props.isFirstDummy, props.firstDummy_onVisible]);

    return (
        <div className={className} onClick={clickEventHandler}>
            {!props.isDummy && !!props.user? (
                <img className={styles.img_0} src={props.user.image} alt='profileImage'/>
            ): (
                <div className={styles.div_3} ref={ref}></div>
            ) }
            {!props.isDummy && !!props.user ?(
                <div className={styles.div_4}>
                    <h2 className={styles.h2_0}>{props.user.name}</h2>
                    <TotalFollowCard user={props.user}/>
                    <div className={styles.div_1}>{props.user.introduction}</div>
                    <div className={styles.div_2}>
                        <PostFollowCard follow={follow as FollowScheme} user={props.user} setUser={setUser}/>
                    </div>
                </div>
            ): (
                <div className={styles.div_5}>
                    <div className={styles.shimmerBar}></div>
                    <div className={styles.shimmerBar} style={{width: '75%'}}></div>
                    <div className={styles.shimmerBar} style={{width: '75%'}}></div>
                    <div className={styles.shimmerBar}></div>
                </div>
            ) }
        </div>
    )
}

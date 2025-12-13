'use client'
export const dynamic = "force-dynamic";

import styles from './user.module.css'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {FollowScheme, UserScheme} from "@/types";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";
import ArticleByUserSection from "@/app/users/[userId]/_components/articleByUserSection/articleByUserSection";
import UserProfileSection from "@/app/users/[userId]/_components/userProfileSection/userProfileSection";
import UserProfileSection_MyOwn
    from "@/app/users/[userId]/_components/userProfileSection_myOwn/userProfileSection_myOwn";

export default function UserClient(props: {user: UserScheme}) {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const user_myOwn = useUserStore((state) => state.user)
    const [user, setUser] = useState<UserScheme>(props.user)
    const [follow, setFollow] = useState<FollowScheme>()
    const session = useSession();

    const checkIsFollowed = (follows: FollowScheme[]) => {
        if(!!follows){
            const follow = follows.filter((follow: FollowScheme) => follow.followerId === user_myOwn.id)
            if(follow.length > 0){
                setFollow(follow[0])
            }else {
                setFollow(undefined)
            }
        }
    }

    useEffect(() => {
        setUser(props.user);
        applyWhereIam(`user-${props.user.id}`)
    }, [props.user])


    useEffect(() => {
        checkIsFollowed(user?.followers as FollowScheme[])
    }, [user]);

    return (
        <div className={styles.div_0}>
            {session.status === 'authenticated' && session.data.user.id === props.user.id && user? <UserProfileSection_MyOwn user={user as UserScheme}/> :
                <UserProfileSection user={user as UserScheme} follow={follow as FollowScheme} setUser={setUser as Dispatch<SetStateAction<UserScheme>>}/>}
            {!!user && <ArticleByUserSection user={user}/>}
        </div>
    )
}

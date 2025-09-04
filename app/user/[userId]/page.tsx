'use client'
export const dynamic = "force-dynamic";

import styles from './user.module.css'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {FollowScheme, UserScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";
import ArticleByUserSection from "@/app/user/[userId]/_components/articleByUserSection/articleByUserSection";
import UserProfileSection from "@/app/user/[userId]/_components/userProfileSection/userProfileSection";
import UserProfileSection_MyOwn
    from "@/app/user/[userId]/_components/userProfileSection_myOwn/userProfileSection_myOwn";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const user_myOwn = useUserStore((state) => state.user)
    const {userId} = useParams<{userId: string}>();
    const [user, setUser] = useState<UserScheme>()
    const [follow, setFollow] = useState<FollowScheme>()
    const session = useSession();

    const getUser = async () => {
        return await getDataFromServerWithJson<{user: UserScheme}>(`/api/getUser?userId=${userId}`)
    }

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
        if(session.status !== 'authenticated' || session.data.user.id !== userId){
            getUser().then((json) => {
                if(!!json){
                    setUser(json.user)
                }
            })
        }else{
            setUser(user_myOwn)
        }
    }, [userId, user_myOwn])


    useEffect(() => {
        applyWhereIam('user-' + userId)
        checkIsFollowed(user?.followers as FollowScheme[])
    }, [userId, user]);

    return (
        <div className={styles.div_0}>
            {session.status === 'authenticated' && session.data.user.id === userId && user? <UserProfileSection_MyOwn user={user as UserScheme}/> :
                <UserProfileSection user={user as UserScheme} follow={follow as FollowScheme} setUser={setUser as Dispatch<SetStateAction<UserScheme>>}/>}
            {!!user && <ArticleByUserSection user={user}/>}
        </div>
    )
}

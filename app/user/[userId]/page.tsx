'use client'

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
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [user, setUser] = useState<UserScheme>()
    const [follow, setFollow] = useState<FollowScheme>()
    const session = useSession();

    const getUser = async () => {
        return await getDataFromServerWithJson<{user: UserScheme, error: string}>(`/api/getUser?userId=${userId}`)
    }

    const checkIsFollowed = (follows: FollowScheme[]) => {
        if(!!follows){
            const follow = follows.filter((follow: FollowScheme) => follow.followingId === user_myOwn.id)
            if(follow.length > 0){
                setFollow(follow[0])
            }else {
                setFollow(undefined)
            }
        }
    }

    useEffect(() => {
        getUser().then((json) => {
            console.log(json.user)
            if(!!json.user && !json.error){
                setUser(json.user)
            }
        })
    }, [userId])


    useEffect(() => {
        applyWhereIam('user-' + userId)
        if (session.status === 'authenticated' && session.data.user.id === userId) {
            setIsOwner(true)
        }else {
            setIsOwner(false)
        }
        checkIsFollowed(user?.followings as FollowScheme[])
    }, [userId, user]);

    return (
        <div className={styles.div_0}>
            {(() => isOwner ? <UserProfileSection_MyOwn user={user_myOwn}/> :
                <UserProfileSection user={user as UserScheme} user_myOwn={user_myOwn}
                                    follow={follow as FollowScheme} setUser={setUser as Dispatch<SetStateAction<UserScheme>>}/>)()}
            <ArticleByUserSection user={user}/>
        </div>
    )
}

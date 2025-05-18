'use client'

import styles from './userProfile.module.css'
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import UserProfileSection_myOwn
    from "@/app/userProfile/[userId]/_components/userProfileSection_myOwn/userProfileSection_myOwn";
import ArticleByUserSection from "@/app/userProfile/[userId]/_components/articleByUserSection/articleByUserSection";
import UserProfileSection from "@/app/userProfile/[userId]/_components/userProfileSection/userProfileSection";
import {FollowScheme, UserProfileScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import loginStatusStore from "@/lib/lib-client/stores/loginStatusStore";
import useWhereIamStore from "@/lib/lib-client/stores/whereIamStore";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const loginStatus = loginStatusStore((state) => state.loginStatus)
    const {userId} = useParams<{userId: string}>();
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfileScheme>()
    const [follow, setFollow] = useState<FollowScheme>()

    const getUserProfile = async () => {
        return await getDataFromServerWithJson<{userProfile: UserProfileScheme, error: string}>(`/api/getUserProfile?userId=${userId}`)
    }

    const checkIsFollowed = (follows: FollowScheme[]) => {
        if(!!follows){
            const follow = follows.filter((follow: FollowScheme) => follow.following === loginStatus.userProfile.userId)
            if(follow.length > 0){
                setFollow(follow[0])
            }else {
                setFollow(undefined)
            }
        }
    }

    useEffect(() => {
        getUserProfile().then((json) => {
            console.log(json.userProfile)
            if(!!json.userProfile && !json.error){
                setUserProfile(json.userProfile)
            }
        })
    }, [userId])


    useEffect(() => {
        applyWhereIam('userProfile-' + userId)
        if (loginStatus.isLoggedIn && loginStatus.userProfile.userId === userId) {
            setIsOwner(true)
        }else {
            setIsOwner(false)
        }
        checkIsFollowed(userProfile?.followings as FollowScheme[])
    }, [userId, loginStatus]);

    return (
        <div className={styles.div_0}>
            {(() => isOwner ? <UserProfileSection_myOwn loginStatus={loginStatus}/> :
                <UserProfileSection userProfile={userProfile as UserProfileScheme} loginStatus={loginStatus}
                                    follow={follow as FollowScheme}/>)()}
            <ArticleByUserSection userProfile={userProfile}/>
        </div>
    )
}

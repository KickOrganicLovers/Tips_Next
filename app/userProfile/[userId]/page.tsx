'use client'

import styles from './userProfile.module.css'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import UserProfileSection_myOwn
    from "@/app/userProfile/[userId]/_components/userProfileSection_myOwn/userProfileSection_myOwn";
import ArticleByUserSection from "@/app/userProfile/[userId]/_components/articleByUserSection/articleByUserSection";
import UserProfileSection from "@/app/userProfile/[userId]/_components/userProfileSection/userProfileSection";
import {FollowScheme, UserProfileScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib/lib-client/fetch";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const userProfile_myOwn = useUserProfileStore((state) => state.userProfile)
    const {userId} = useParams<{userId: string}>();
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfileScheme>()
    const [follow, setFollow] = useState<FollowScheme>()
    const session = useSession();

    const getUserProfile = async () => {
        return await getDataFromServerWithJson<{userProfile: UserProfileScheme, error: string}>(`/api/getUserProfile?userId=${userId}`)
    }

    const checkIsFollowed = (follows: FollowScheme[]) => {
        if(!!follows){
            const follow = follows.filter((follow: FollowScheme) => follow.following === userProfile_myOwn.userId)
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
        if (session.status === 'authenticated' && session.data.user.id === userId) {
            setIsOwner(true)
        }else {
            setIsOwner(false)
        }
        checkIsFollowed(userProfile?.followings as FollowScheme[])
    }, [userId, userProfile]);

    return (
        <div className={styles.div_0}>
            {(() => isOwner ? <UserProfileSection_myOwn userProfile={userProfile_myOwn}/> :
                <UserProfileSection userProfile={userProfile as UserProfileScheme} userProfile_myOwn={userProfile_myOwn}
                                    follow={follow as FollowScheme} setUserProfile={setUserProfile as Dispatch<SetStateAction<UserProfileScheme>>}/>)()}
            <ArticleByUserSection userProfile={userProfile}/>
        </div>
    )
}

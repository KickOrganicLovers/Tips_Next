'use client'

import styles from './userProfile.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {AppDispatch, RootState} from "@/redux/store";
import {useParams, useRouter} from "next/navigation";
import UserProfileSection_myOwn from "@/app/userProfile/[userId]/_components/userProfileSection_myOwn/userProfileSection_myOwn";
import ArticleByUserSection from "@/app/userProfile/[userId]/_components/articleByUserSection/articleByUserSection";
import UserProfileSection from "@/app/userProfile/[userId]/_components/userProfileSection/userProfileSection";
import {FollowScheme, UserProfileScheme} from "@/types";
import {getDataFromServerWithJson} from "@/lib-client/fetch";

export default function Page() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const {userId} = useParams<{userId: string}>();
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfileScheme>()
    const [follow, setFollow] = useState<FollowScheme>()

    const getUserProfile = async () => {
        return await getDataFromServerWithJson<{userProfile: UserProfileScheme, error: string}>(`/api/getUserProfile?userId=${userId}`)
    }

    const checkIsFollowed = (follows: FollowScheme[]) => {
        if(!!follows){
            const follow =  follows.filter((follow: FollowScheme) => follow.following === LoginStatus.userProfile.userId)
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
        dispatch(applyWhereIam('userProfile-' + userId));

        if(LoginStatus.isLoggedIn && LoginStatus.userProfile.userId === userId){
            setIsOwner(true)
        }else {
            setIsOwner(false)
        }

        checkIsFollowed(userProfile?.followings as FollowScheme[])
    }, [userId, LoginStatus]);

    return (
        <div className={styles.div_0}>
            {(() => isOwner? <UserProfileSection_myOwn loginStatus={LoginStatus}/> : <UserProfileSection userProfile={userProfile as UserProfileScheme} loginStatus={LoginStatus} follow={follow as FollowScheme}/>)()}
            <ArticleByUserSection userProfile={userProfile}/>
        </div>
    )
}

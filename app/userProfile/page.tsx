'use client'

import styles from './userProfile.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {AppDispatch, RootState} from "@/redux/store";
import {AiOutlineCheck, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import {FiPlus} from "react-icons/fi";
import ImageEditingCard from "@/app/userProfile/_components/userProfileSection/atoms/imageEditingCard/imageEditingCard";
import {setUserProfile} from "@/redux/slices/loginStatusSlice";
import {UserProfileScheme} from '@/typs';
import {router} from "next/client";
import {useRouter} from "next/navigation";
import UserProfileSection from "@/app/userProfile/_components/userProfileSection/userProfileSection";
import ArticleByUserSection from "@/app/userProfile/_components/articleByUserSection/articleByUserSection";

export default function Page() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();


    useEffect(() => {
        if (LoginStatus.isLoggedIn) {
            dispatch(applyWhereIam('userProfile'))
        } else {
            router.push('/')
        }
    }, []);

    return (
        <div className={styles.div_0}>
            <UserProfileSection loginStatus={LoginStatus} />
            <ArticleByUserSection loginStatus={LoginStatus} />
        </div>
    )
}

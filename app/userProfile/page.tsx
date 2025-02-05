'use client'

import styles from './userProfile.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {RootState} from "@/redux/store";
import {AiOutlineCheck, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import {FiPlus} from "react-icons/fi";
import ImageEditingCard from "@/app/userProfile/_components/imageEditingCard/imageEditingCard";
import {setUserProfile} from "@/redux/slices/loginStatusSlice";
import { UserProfileScheme } from '@/typs';
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function Page() {

    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);

    const [username, setUsername] = useState(LoginStatus.userProfile.username);
    const [profileImageUrl, setProfileImageUrl] = useState(LoginStatus.userProfile.profileImageUrl);
    const [introduction, setIntroduction] = useState(LoginStatus.userProfile.introduction);


    const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
    const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
    const [loadedImage, setLoadedImage] = useState<string>('');
    const [profileImageAsBase64, setProfileImageAsBase64] = useState<string>('')

    const inputImageRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const router = useRouter()

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (reader.result) {
                    setLoadedImage(reader.result?.toString())
                    setIsCropperOpen(true)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const postImgToServer = async (profileImageAsBase64: string, userId: number) => {
        const url = 'api/editUserProfile/postUserProfileImage'
        console.log(userId)
        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                profileImageAsBase64: profileImageAsBase64,
                userId: userId,
            })
        }

        return await fetch(url, params)
    }

    const applyUserProfileChanges = async (userId: number, username: string, introduction: string, profileImageUrl?: string) => {

        const url = 'api/editUserProfile';

        // 条件付きでオブジェクトを構築
        const body = {
            userId,
            username,
            introduction,
            ...(profileImageUrl && { profileImageUrl }),
        };

        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };


        try {
            return await fetch(url, params)
        } catch (error) {
            throw error
        }
    }


    const onEditComplete = () => {
        if(profileImageAsBase64 !== ''){
            console.log(LoginStatus.userProfile.userId)
            postImgToServer(profileImageAsBase64, LoginStatus.userProfile.userId).then(
                (res) => {
                    res.json().then(
                        (json: {error: string; profileImageUrl: string}) => {
                            if (!json.error && introduction && json.profileImageUrl) {
                                // setProfileImageUrl(json.profileImageUrl)
                                applyUserProfileChanges(LoginStatus.userProfile.userId, username, introduction, json.profileImageUrl).then(
                                    (res) => {
                                        res.json().then(
                                            (json: { error: string; updatedUserProfile: UserProfileScheme; }) => {
                                                if(!json.error){
                                                    if(json.updatedUserProfile.profileImageUrl){
                                                        setProfileImageUrl(json.updatedUserProfile.profileImageUrl)
                                                        setProfileImageAsBase64('')
                                                        dispatch(setUserProfile(json.updatedUserProfile))
                                                        setIsEditingMode(false)
                                                        console.log(LoginStatus.userProfile)
                                                    }
                                                }
                                            }
                                        )
                                    }
                                )
                            }
                        })
                }
            )
        }else{
            applyUserProfileChanges(LoginStatus.userProfile.userId, username, introduction).then(
                (res) => {
                    res.json().then(
                        (json: {error: string; updatedUserProfile: UserProfileScheme}) => {
                            if(!json.error){
                                dispatch(setUserProfile(json.updatedUserProfile))
                                setIsEditingMode(false)
                            }
                    })
                }
            )

        }
    }

    const onEditCancel = () => {
        setProfileImageAsBase64('')
        setUsername(LoginStatus.userProfile.username)
        setIntroduction(LoginStatus.userProfile.introduction)
        setIsEditingMode(false)
    }



    useEffect(() => {
        if(LoginStatus.isLoggedIn){
            dispatch(applyWhereIam('userProfile'))
        }else{
            router.push('/')
        }
    }, []);

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <div className={styles.div_3}>
                    <img src={(() => profileImageAsBase64 === '' ? profileImageUrl : profileImageAsBase64)()} alt='profileImage' className={styles.img_0}/>
                    {(() => isEditingMode ? <FiPlus className={styles.FiPlus} onClick={() => {inputImageRef.current?.click()}}/> : undefined)()}
                </div>
                <div className={styles.div_4}>
                    {(() => isEditingMode ?
                        <input type={"text"} className={styles.input_0} value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }}/> : <h1 className={styles.h1_0}>{LoginStatus.userProfile.username}</h1>)()}
                </div>
                <div className={styles.div_5}>
                    {(() => isEditingMode ?
                        <textarea className={styles.textarea_0} value={introduction} onChange={(e) => {
                            setIntroduction(e.target.value)
                        }}/> : <div className={styles.div_7}>{LoginStatus.userProfile.introduction}</div>)()}
                </div>
                <div className={styles.div_6}>
                    {(() => isEditingMode ?
                        <div className={styles.div_9}>
                            <AiOutlineCheck className={styles.AiOutlineCheck} onClick={onEditComplete}/>
                            <AiOutlineClose className={styles.AiOutlineClose} onClick={onEditCancel}/>
                        </div>
                        :
                        <div className={styles.div_8} onClick={() => setIsEditingMode(true)}>
                            <AiOutlineEdit className={styles.AiOutlineEdit}/>
                            <p className={styles.p_0}>プロフィールを編集</p>
                        </div>)()}
                </div>
            </div>
            <div className={styles.div_2}>

            </div>
            {(() => isCropperOpen? <ImageEditingCard loadedImage={loadedImage} setIsCropperOpen={setIsCropperOpen} userProfile={LoginStatus.userProfile} setProfileImageAsBase64={setProfileImageAsBase64}/> : undefined)()}
            {(() => isCropperOpen? <div className={styles.FadeLayer}></div> : undefined)()}
            <input type={'file'} accept={'image/*'} className={styles.input_1} onChange={onFileChange} ref={inputImageRef}/>
        </div>
    )
}

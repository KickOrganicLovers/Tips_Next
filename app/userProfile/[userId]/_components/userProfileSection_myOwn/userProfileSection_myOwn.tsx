import styles from './userProfileSection_myOwn.module.css'
import {FiPlus} from "react-icons/fi";
import {AiOutlineCheck, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {LoginStatusScheme, UserProfileScheme} from "@/types";
import {setUserProfile} from "@/redux/slices/loginStatusSlice";
import ImageEditingCard from "@/app/userProfile/[userId]/_components/userProfileSection_myOwn/atoms/imageEditingCard";
import {WritableDraft} from "immer";
import {redirect} from "next/navigation";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";

interface props {
    loginStatus: LoginStatusScheme
}

export default function UserProfileSection_MyOwn(props: props) {

    const [username, setUsername] = useState(props.loginStatus.userProfile.username);
    const [profileImageUrl, setProfileImageUrl] = useState(props.loginStatus.userProfile.profileImageUrl);
    const [introduction, setIntroduction] = useState(props.loginStatus.userProfile.introduction);

    const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
    const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
    const [loadedImage, setLoadedImage] = useState<string>('');
    const [profileImageAsBase64, setProfileImageAsBase64] = useState<string>('')

    const inputImageRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();


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

    const postImgToServer = async (profileImageAsBase64: string, userId: string) => {

        const url = '/api/editUserProfile/postUserProfileImage'
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

    const applyUserProfileChanges = async (userId: string, username: string, introduction: string, profileImageUrl?: string) => {

        const url = '/api/editUserProfile';

        // 条件付きでオブジェクトを構築
        const body = {
            userId,
            username,
            introduction,
            ...(profileImageUrl && {profileImageUrl}),
        };

        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        };


        try {
            return await fetch(url, params)
        } catch (error) {
            throw error
        }
    }


    const onEditComplete = () => {
        if (profileImageAsBase64 !== '') {
            console.log(props.loginStatus.userProfile.userId)
            postImgToServer(profileImageAsBase64, props.loginStatus.userProfile.userId).then(
                (res) => {
                    res.json().then(
                        (json: { error: string; profileImageUrl: string }) => {
                            if (!json.error && introduction && json.profileImageUrl) {
                                // setProfileImageUrl(json.profileImageUrl)
                                applyUserProfileChanges(props.loginStatus.userProfile.userId, username, introduction, json.profileImageUrl).then(
                                    (res) => {
                                        res.json().then(
                                            (json: { error: string; updatedUserProfile: UserProfileScheme; }) => {
                                                if (!json.error) {
                                                    if (json.updatedUserProfile.profileImageUrl) {
                                                        setProfileImageUrl(json.updatedUserProfile.profileImageUrl)
                                                        setProfileImageAsBase64('')
                                                        dispatch(setUserProfile(json.updatedUserProfile as unknown as WritableDraft<UserProfileScheme>))
                                                        setIsEditingMode(false)
                                                        console.log(props.loginStatus.userProfile)
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
        } else {
            applyUserProfileChanges(props.loginStatus.userProfile.userId, username, introduction).then(
                (res) => {
                    res.json().then(
                        (json: { error: string; updatedUserProfile: UserProfileScheme }) => {
                            if (!json.error) {
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
        setUsername(props.loginStatus.userProfile.username)
        setIntroduction(props.loginStatus.userProfile.introduction)
        setIsEditingMode(false)
    }

    useEffect(() => {
        if(!props.loginStatus.isLoggedIn){
            redirect('/')
        }
    }, []);


    return (
        <div className={styles.div_0}>
            <div className={styles.div_7}>
                <div className={styles.div_5}>
                    <div className={styles.div_1}>
                        <img src={(() => profileImageAsBase64 === '' ? profileImageUrl : profileImageAsBase64)()}
                             alt='profileImage' className={styles.img_0}/>
                        {(() => isEditingMode ? <FiPlus className={styles.FiPlus} onClick={() => {
                            inputImageRef.current?.click()
                        }}/> : undefined)()}
                    </div>

                    {(() => isEditingMode ?
                        <input type={"text"} className={styles.input_0} value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }}/> : <h1 className={styles.h1_0}>{props.loginStatus.userProfile.username}</h1>)()}
                </div>

                {/*//image*/}
                {/*<div className={styles.div_1}>*/}
                {/*    <img src={(() => profileImageAsBase64 === '' ? profileImageUrl : profileImageAsBase64)()}*/}
                {/*         alt='profileImage' className={styles.img_0}/>*/}
                {/*    {(() => isEditingMode ? <FiPlus className={styles.FiPlus} onClick={() => {*/}
                {/*        inputImageRef.current?.click()*/}
                {/*    }}/> : undefined)()}*/}
                {/*</div>*/}

                {/*//username*/}
                {/*{(() => isEditingMode ?*/}
                {/*    <input type={"text"} className={styles.input_0} value={username} onChange={(e) => {*/}
                {/*        setUsername(e.target.value)*/}
                {/*    }}/> : <h1 className={styles.h1_0}>{props.loginStatus.userProfile.username}</h1>)()}*/}


                <div className={styles.div_6}>
                    {(() => isEditingMode ? null : <TotalFollowCard userProfile={props.loginStatus.userProfile}/>)()}


                    {(() => isEditingMode ?
                        <textarea className={styles.textarea_0} value={introduction} onChange={(e) => {
                            setIntroduction(e.target.value)
                        }}/> : <div className={styles.div_2}>{props.loginStatus.userProfile.introduction}</div>)()}
                </div>

                {/*//follow*/}
                {/*{(() => isEditingMode ? null : <TotalFollowCard userProfile={props.loginStatus.userProfile}/>)()}*/}

                {/*//introduction*/}
                {/*{(() => isEditingMode ?*/}
                {/*    <textarea className={styles.textarea_0} value={introduction} onChange={(e) => {*/}
                {/*        setIntroduction(e.target.value)*/}
                {/*    }}/> : <div className={styles.div_2}>{props.loginStatus.userProfile.introduction}</div>)()}*/}
            </div>
            {(() => isEditingMode ?
                    <div className={styles.div_4}>
                        <AiOutlineCheck className={styles.AiOutlineCheck} onClick={onEditComplete}/>
                        <AiOutlineClose className={styles.AiOutlineClose} onClick={onEditCancel}/>
                    </div>
                    :
                    <div className={styles.div_3} onClick={() => setIsEditingMode(true)}>
                        <AiOutlineEdit className={styles.AiOutlineEdit}/>
                        <p className={styles.p_0}>プロフィールを編集</p>
                    </div>
            )()}


            {(() => isCropperOpen ? <ImageEditingCard loadedImage={loadedImage} setIsCropperOpen={setIsCropperOpen}
                                                      userProfile={props.loginStatus.userProfile}
                                                      setProfileImageAsBase64={setProfileImageAsBase64}/> : undefined)()}
            {(() => isCropperOpen ? <div className={styles.FadeLayer}></div> : undefined)()}
            <input type={'file'} accept={'image/*'} className={styles.input_1} onChange={onFileChange}
                   ref={inputImageRef}/>
        </div>
    )
}

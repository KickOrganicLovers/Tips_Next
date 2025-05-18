import styles from './userProfileSection_myOwn.module.css'
import {FiPlus} from "react-icons/fi";
import {AiOutlineCheck, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import React, {useEffect, useRef, useState} from "react";
import {LoginStatusScheme} from "@/types";
import ImageEditingCard from "@/app/userProfile/[userId]/_components/userProfileSection_myOwn/atoms/imageEditingCard";
import {redirect} from "next/navigation";
import TotalFollowCard from "@/app/_components/common/totalFollowCard/totalFollowCard";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import setLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";

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
    const applyUserProfileChanges = setLoginStatusStore((state) => state.applyUserProfileChanges)

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

    const postImageToServer = async (profileImageAsBase64: string, userId: string) => {
        return await postDataToServerWithJson<{
            profileImageUrl: string,
            error: string
        }>('/api/editUserProfile/postUserProfileImage', {profileImageAsBase64, userId})
    }

    const onEditComplete = () => {
        if (profileImageAsBase64 !== '') {
            postImageToServer(profileImageAsBase64, props.loginStatus.userProfile.userId).then((json) => {
                if (!!json.profileImageUrl && !json.error) {
                    applyUserProfileChanges(username, introduction, profileImageUrl)
                    setIsEditingMode(false)
                }
            })
        } else {
            applyUserProfileChanges(username, introduction, profileImageUrl)
            setIsEditingMode(false)
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

                <div className={styles.div_6}>
                    {(() => isEditingMode ? null : <TotalFollowCard userProfile={props.loginStatus.userProfile}/>)()}


                    {(() => isEditingMode ?
                        <textarea className={styles.textarea_0} value={introduction} onChange={(e) => {
                            setIntroduction(e.target.value)
                        }}/> : <div className={styles.div_2}>{props.loginStatus.userProfile.introduction}</div>)()}
                </div>
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

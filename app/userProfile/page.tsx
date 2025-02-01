'use client'

import styles from './userProfile.module.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {RootState} from "@/redux/store";
import {AiOutlineCheck, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import {FiPlus} from "react-icons/fi";
import ImageEditingCard from "@/app/userProfile/_components/imageEditingCard/imageEditingCard";

export default function Page() {

    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);

    const [username, setUsername] = useState(LoginStatus.userStatus.username);
    const [profileImageUrl, setProfileImageUrl] = useState(LoginStatus.userStatus.profileImageUrl);
    const [introduction, setIntroduction] = useState(LoginStatus.userStatus.introduction);


    const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
    const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
    const [loadedImage, setLoadedImage] = useState<string>('');

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



    useEffect(() => {
        dispatch(applyWhereIam('userProfile'))
    }, []);

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <div className={styles.div_3}>
                    <img src={profileImageUrl} alt='profileImage' className={styles.img_0}/>
                    {(() => isEditingMode ? <FiPlus className={styles.FiPlus} onClick={() => {inputImageRef.current?.click()}}/> : null)()}
                </div>
                <div className={styles.div_4}>
                    {(() => isEditingMode ?
                        <input type={"text"} className={styles.input_0} value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }}/> : <h1 className={styles.h1_0}>{username}</h1>)()}
                </div>
                <div className={styles.div_5}>
                    {(() => isEditingMode ?
                        <textarea className={styles.textarea_0} value={introduction} onChange={(e) => {
                            setIntroduction(e.target.value)
                        }}/> : <div className={styles.div_7}>{introduction}</div>)()}
                </div>
                <div className={styles.div_6}>
                    {(() => isEditingMode ?
                        <div className={styles.div_9}>
                            <AiOutlineCheck className={styles.AiOutlineCheck}/>
                            <AiOutlineClose className={styles.AiOutlineClose}/>
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
            {(() => isCropperOpen? <ImageEditingCard loadedImage={loadedImage}/> : null)()}
            <input type={'file'} accept={'image/*'} className={styles.input_1} onChange={onFileChange} ref={inputImageRef}/>
        </div>
    )
}

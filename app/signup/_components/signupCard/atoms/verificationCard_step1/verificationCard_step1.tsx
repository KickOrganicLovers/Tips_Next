import {useState} from "react";
import styles from './verificationCard_step1.module.css'
import {postDataToServerWithJson} from "@/lib-client/fetch";

interface props {
    setVerificationCardStatus: (step: string) => void
    email: string
    setEmail: (email: string) => void
}

export default function VerificationCard_Step1(props: props) {

    const verifyEmail_step1 = async () => {
        return await postDataToServerWithJson<{isVerified: boolean, error: string}>('/api/signup/verifyEmail/step1', {email: props.email})
    }
    const clickEventHandler = () => {
        verifyEmail_step1().then(data => {
            if (data.isVerified) {
                props.setVerificationCardStatus('verifying_step2')
            } else {
                console.log(data.error)
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>使用するメールアドレスを入力</h2>
            <div className={styles.div_1}>
                <input className={styles.input_0} type={`email`} name={'email'} placeholder={'メールアドレス'}
                       onChange={(e) => {
                           props.setEmail(e.target.value)
                       }}/>
                <button className={styles.button_0} onClick={clickEventHandler}>送信</button>
            </div>
            <div className={styles.div_2}>
                <p className={styles.p_0}>または、以下のサービスで登録</p>
                <div className={styles.div_3}>
                    <div className={styles.div_4}>
                        <img src={'/images/logoGoogle.png'} alt={'logoGoogle'} className={styles.img_0}/>
                    </div>
                    <div className={styles.div_4}>
                        <img src={'/images/logoApple.png'} alt={'logoApple'} className={styles.img_0}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

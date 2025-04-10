import styles from './verificationCard_step2.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import OTPInput from "react-otp-input";
import PinInput from "@/app/signup/_components/signupCard/atoms/verificationCard_step3/atoms/pinInput";
import {postDataToServerWithJson} from "@/lib-client/fetch";

interface props {
    setVerificationCardStatus: Dispatch<SetStateAction<string>>
}

export default function VerificationCard_Step2(props: props) {

    const clickEventHandler = () => {
        props.setVerificationCardStatus('step3')
    }

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                {/*<div className={styles.div_2}>各項目を入力して登録を完了</div>*/}
                <input className={styles.input_0} type={`email`} name={'email'} placeholder={'メールアドレスを入力'}/>
                <input className={styles.input_0} type={`password`} name={'password'} placeholder={'パスワードを入力'}/>
                <button className={styles.button_0} onClick={clickEventHandler}>この内容で登録</button>
            </div>
            <div className={styles.div_2}>または、以下のサービスで登録</div>
            <div className={styles.div_3}>
                <img className={styles.img_0} src={'/images/logos/google.png'} alt={'google'}/>
                <img className={styles.img_0} src={'/images/logos/apple.png'} alt={'apple'}/>
            </div>
        </div>
    )
}

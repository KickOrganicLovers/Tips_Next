import {useState} from "react";
import styles from './verificationCard_step1.module.css'
import {postDataToServerWithJson} from "@/lib-client/fetch";
import Link from "next/link";

interface props {
    setVerificationCardStatus: (step: string) => void
}

export default function VerificationCard_Step1(props: props) {

    //一時的に画面遷移用に作成する関数
    const clickEventHandler = () => {
        props.setVerificationCardStatus('step2')
    }

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>使用するユーザーネームを入力</h2>
            <div className={styles.div_1}>
                <input className={styles.input_0} type={`text`} name={'username'} placeholder={'ユーザーネームを入力'}/>
                <button className={styles.button_0} onClick={clickEventHandler}>送信</button>
            </div>
            <div className={styles.div_2}>アカウントが既に存在する場合は<Link href={'/login'}>ログイン</Link></div>
        </div>
    )
}

import styles from './signupCard.module.css'
import {useEffect, useState} from "react";
import VerificationCard_Step1
    from "@/app/signup/_components/signupCard/atoms/verificationCard_step1/verificationCard_step1";
import VerificationCard_Step2
    from "@/app/signup/_components/signupCard/atoms/verificationCard_step2/verificationCard_step2";
import VerificationCard_Step3
    from "@/app/signup/_components/signupCard/atoms/verificationCard_step3/verificationCard_step3";


export default function SignupCard() {
    const [isMounted, setIsMounted] = useState(false);
    const [verificationCardStatus, setVerificationCardStatus] = useState('step1');


    const className_div0 = isMounted ? `${styles['div_0']} ${styles['mounted']}` : styles['div_0'];
    const className_div1 = `${styles['div_1']} ${styles[verificationCardStatus]}`


    useEffect(() => {
        setIsMounted(true);
    })

    return (
        <div className={className_div0}>
            <img src='/images/PageIcon.svg' alt='PageIcon' className={styles.img}/>
            <h1 className={styles.h1}>Tipsにサインアップ</h1>
            <div className={className_div1}>
                {/*ユーザーネーム登録用*/}
                <VerificationCard_Step1 setVerificationCardStatus={setVerificationCardStatus}/>
                {/*メールアドレス、パスワード及びOAuth認証用*/}
                <VerificationCard_Step2 setVerificationCardStatus={setVerificationCardStatus}/>
                {/*Credentialにおけるメール認証用*/}
                <VerificationCard_Step3/>
            </div>
        </div>
    )
}

import styles from './verificationCard_step2.module.css'
import {Dispatch, SetStateAction, useState} from "react";
import PinInput from "@/app/signup/_components/signupCard/atoms/verificationCard_step2/atoms/pinInput";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {FiAlertCircle} from "react-icons/fi";

interface props {
    setVerificationCardStatus: Dispatch<SetStateAction<string>>
    email: string
}

export default function VerificationCard_Step2(props: props) {
    const [token, setToken] = useState('')
    const [error, setError] = useState('')


    const verifyEmail_step2 = async () => {
        return await postDataToServerWithJson('/api/signup/verifyEmail/step2', {email: props.email, token: token})
    }

    const clickEventHandler = () => {
        verifyEmail_step2().then(() => {
            setError('')
            props.setVerificationCardStatus('accountCreation')
        }).catch(error => {
            setError(error.message)
        })
    }

    return (
        <div className={styles.div_0}>
            <p className={styles.p_0}>
                <mark className={styles.mark_0}>{props.email}</mark>
                宛に認証メールを送信しました。メール内に記載された6桁の数字をフォーム内に入力し、メールアドレスを認証してください。
            </p>
            <PinInput setToken={setToken}/>
            {error && <p className={styles.p_1}><FiAlertCircle className={styles.FiAlertCircle}/>{error}</p>}
            <button className={styles.button_0} onClick={clickEventHandler}>認証</button>
        </div>
    )
}

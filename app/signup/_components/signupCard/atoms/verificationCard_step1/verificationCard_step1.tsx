import {useState} from "react";
import styles from './verificationCard_step1.module.css'

interface props  {
    setVerificationCardStatus: (step: string) => void
    email: string
    setEmail: (email: string) => void
}
export default function VerificationCard_Step1(props: props) {

    const verifyEmail_step1 = async () => {
        const url = '/api/signup/verifyEmail/step1'
        const params = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email: props.email})
        }
        try {
            const res = await fetch(url, params)
            const data = await res.json()
            console.log(data)
            return data
        } catch (err) {
            throw err
        }
    }

    const clickEventHandler = () => {
        verifyEmail_step1().then(data => {
            if (data.isVerified) {
                props.setVerificationCardStatus('verifying_step2')
            }else {
                console.log(data.error)
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className={styles.div_0}>
            <h2 className={styles.h2_0}>使用するメールアドレスを入力</h2>
            <input className={styles.input_0} type={`email`} name={'email'} placeholder={'メールアドレス'}
                   onChange={(e) => {
                       props.setEmail(e.target.value)
                   }}/>
            <button className={styles.button_0} onClick={clickEventHandler}>送信</button>
        </div>
    )
}

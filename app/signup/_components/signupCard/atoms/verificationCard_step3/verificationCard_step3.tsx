import styles from './verificationCard_step3.module.css'
import PinInput from "@/app/signup/_components/signupCard/atoms/verificationCard_step3/atoms/pinInput";
import {useState} from "react";

export default function VerificationCard_Step3() {
    const [token, setToken] = useState<string>('');

    const clickEventHandler = () => {

    }

    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                指定したメールアドレス宛に認証コードをおくりました。このコードを入力して登録を完了してください。
            </div>
            <PinInput setToken={setToken}/>
            <button className={styles.button_0} onClick={clickEventHandler}>認証</button>
        </div>
    )
}

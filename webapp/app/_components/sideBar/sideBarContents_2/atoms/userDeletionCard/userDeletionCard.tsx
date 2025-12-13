import styles from './userDeletionCard.module.css'
import AccountBanner from "@/app/_components/sideBar/sideBarContents_2/atoms/accountBanner/AccountBanner";
import {getDataFromServerWithJson, postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {SettingsMode} from "@/types";
import {Dispatch, SetStateAction, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import classNames from "classnames";
import {useRouter} from "next/navigation";
import {FiAlertCircle} from "react-icons/fi";

interface props {
    setSettingsMode: Dispatch<SetStateAction<SettingsMode>>
}

export default function UserDeletionCard(props: props) {
    const [error, setError] = useState<string>();
    const [token, setToken] = useState<string | null>(null);
    const [step, setStep] = useState<'checkEmailExisting' | 'verifyEmail' | 'deleteUser'>()
    const router = useRouter();

    const className = `${styles['div_1']} ${styles[step as string]}`


    const clickEventHandler_sendEmail = () => {
        getDataFromServerWithJson('/api/deleteUser/verifyEmail/step1').then(() => {
            setError('')
            setStep('verifyEmail')
        }).catch(error => {
            setError(error.message)
        })
    }
    const clickEventHandler_verifyEmail = () => {
        postDataToServerWithJson('/api/deleteUser/verifyEmail/step2', {token}).then(() => {
            setError('')
            setStep('deleteUser')
        }).catch(error => {
            setError(error.message)
        })
    }
    const clickEventHandler_deleteUser = () => {
        getDataFromServerWithJson('/api/deleteUser').then(data => {
            setError('')
            router.push('/')
            signOut()
        }).catch(error => {
            setError(error.message)
        })
    }
    const clickEventHandler_cancel = () => {
        props.setSettingsMode('default')
    }


    return (
        <div className={styles.div_0}>
            <div className={className}>
                <div className={styles.div_2}>
                    <AccountBanner/>
                    <p className={styles.p_0}>アカウント削除に際して、メールによる認証を行います。</p>
                    {error && <p className={styles.p_1}><FiAlertCircle className={styles.FiAlertCircle}/>{error}</p>}
                    <div className={styles.div_3}>
                        <button className={styles.button_0} onClick={clickEventHandler_sendEmail}>続行</button>
                        <button className={styles.button_0} onClick={clickEventHandler_cancel}>キャンセル</button>
                    </div>
                </div>
                <div className={styles.div_2}>
                    <p className={styles.p_0}>アカウントに登録されたメールアドレスに確認用のトークンを送信しました。入力して認証してください。</p>
                    <input className={styles.input_0} type={"text"} inputMode={"numeric"} placeholder={'トークンを入力'}
                           onChange={(e) => {setToken(e.target.value)
                    }} />
                    {error && <p className={styles.p_1}><FiAlertCircle className={styles.FiAlertCircle}/>{error}</p>}
                    <div className={styles.div_3}>
                        <button className={styles.button_0} onClick={clickEventHandler_verifyEmail} style={!!token ? {visibility: 'visible'} : {visibility: "hidden"}}>認証</button>
                        <button className={styles.button_0} onClick={clickEventHandler_cancel}>キャンセル</button>
                    </div>
                </div>
                <div className={styles.div_2}>
                    <p className={styles.p_0}>アカウントを削除すると、作成した記事などの関連データもすべて消失します。アカウントを削除しますか？</p>
                    {error && <p className={styles.p_1}><FiAlertCircle className={styles.FiAlertCircle}/>{error}</p>}
                    <div className={styles.div_3}>
                        <button className={styles.button_0} onClick={clickEventHandler_deleteUser}>削除</button>
                        <button className={styles.button_0} onClick={clickEventHandler_cancel}>キャンセル</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

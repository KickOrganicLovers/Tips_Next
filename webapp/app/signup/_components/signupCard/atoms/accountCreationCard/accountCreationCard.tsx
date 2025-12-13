import styles from './accountCreationCard.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {FiAlertCircle} from "react-icons/fi";
import {signIn, useSession} from "next-auth/react";

interface props {
    email: string
}

export default function AccountCreationCard(props: props) {
    const [error, setError] = useState<string>();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const createAccount = async () => {
        return await postDataToServerWithJson<{email?:string, password?:string}>('/api/signup', {username: username, password: password, email: props.email})
    }

    const handleLogin = async (email: string, password: string) => {
        try{
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if(!result){
                setError('ログイン時にサーバーとの通信に失敗しました');
            }else if(!!result.error) {
                setError(result.error)
            }
        }catch (error){
            if(error instanceof Error){
                setError(error.message)
            }else {
                setError('ログイン時に内部エラーが発生しました。しばらく待ってからもう一度お試しください。');
            }
        }
    };


    const clickEventHandler = () => {
        createAccount().then((json) => {
            setError('')
            if(!!json && !!json.email && !!json.password){
                handleLogin(json.email, password)
            }
        }).catch(error => {
            setError(error.message)
        })
    }

    return (
        <div className={styles.div_0}>
            <p className={styles.p_0}>メールアドレスの認証に成功しました。以下の情報を入力し、登録を完了してください。</p>
            <input className={styles.input_0} type='text' placeholder='ユーザー名' onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <input className={styles.input_0} type='password' placeholder='パスワード' onChange={(e) => {
                setPassword(e.target.value)
            }}/>
            {error && <p className={styles.p_1}><FiAlertCircle className={styles.FiAlertCircle}/>{error}</p>}
            <button className={styles.button_0} onClick={clickEventHandler}>登録</button>
        </div>
    )
}

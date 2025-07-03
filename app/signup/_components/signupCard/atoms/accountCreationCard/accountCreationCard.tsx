import styles from './accountCreationCard.module.css'
import {useState} from "react";
import {useRouter} from "next/navigation";
import {postDataToServerWithJson} from "@/lib/lib-client/fetch";
import {FiAlertCircle} from "react-icons/fi";

interface props {
    email: string
}

export default function AccountCreationCard(props: props) {
    const [error, setError] = useState<string>();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const createAccount = async () => {
        return await postDataToServerWithJson('/api/signup', {username: username, password: password, email: props.email})
    }


    //改善の余地あり
    const clickEventHandler = () => {
        createAccount().then(() => {
            setError('')
            router.push('/login')
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

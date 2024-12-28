import styles from './accountCreationCard.module.css'
import {SyntheticEvent, useState} from "react";
import {useRouter} from "next/navigation";

interface props {
    email: string
}

export default function AccountCreationCard(props: props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()


    const clickEventHandler = () => {
        createAccount().then((data) => {
            if(data !== null){
                if(data.isCreated){
                    router.push('/login')
                }else {
                    console.error(data.error)
                }
            }else {
                console.error('something went wrong')
            }
        })


    }

    const createAccount = async () => {
        const url = '/api/signup/createAccount'
        const params = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: props.email,
                password: password,
            })
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

    return (
        <div className={styles.div_0}>
            <p className={styles.p_0}>メールアドレスの認証に成功しました。以下の情報を入力し、登録を完了してください。</p>
            <input className={styles.input_0} type='text' placeholder='ユーザー名' onChange={(e) => {setUsername(e.target.value)}} />
            <input className={styles.input_0}  type='password' placeholder='パスワード' onChange={(e) => {setPassword(e.target.value)}}/>
            <button className={styles.button_0} onClick={clickEventHandler}>登録</button>
        </div>
    )
}

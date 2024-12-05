import styles from './loginCard.module.css'
import {useEffect, useState} from "react";



export default function LoginCard() {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted? `${styles['div_0']} ${styles['mounted']}` : styles['div_0'];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setIsMounted(true);
    })


    return (
        <div className={className}>
            <img src='/images/PageIcon.svg' alt='PageIcon' className={styles.img}/>
            <h1 className={styles.h1}>Tipsにログイン</h1>
            <div className={styles.div_1}>
                <input className={styles.input} type={`email`} name={'email'} placeholder={'メールアドレス'} onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
                <input className={styles.input} type={'password'} name={'password'} placeholder={'パスワード'} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <button className={styles.button}>ログイン</button>
            </div>
        </div>
    )
}
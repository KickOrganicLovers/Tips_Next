import styles from './loginCard.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn, useSession} from 'next-auth/react';

export default function LoginCard() {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted ? `${styles['div_0']} ${styles['mounted']}` : styles['div_0'];
    const session = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if(session.status === 'authenticated'){
            router.push('/');
        }
    }, [session.status]);


    const handleLogin = async (e: React.FormEvent) => {
         e.preventDefault();
         const result = await signIn("credentials", {
           redirect: false,
           email,
           password,
         });
    };

    return (
        <div className={className}>
            <img src='/images/PageIcon.svg' alt='PageIcon' className={styles.img}/>
            <h1 className={styles.h1}>Tipsにログイン</h1>
            <div className={styles.div_1}>
                <input className={styles.input} type={`email`} name={'email'} value={email}
                       placeholder={'メールアドレス'}
                       onChange={(e) => {
                           setEmail(e.target.value)
                       }}/>
                <input className={styles.input} type={'password'} name={'password'} value={password}
                       placeholder={'パスワード'}
                       onChange={(e) => {
                           setPassword(e.target.value)
                       }}/>
                <button className={styles.button} onClick={handleLogin}>ログイン</button>
                <p className={styles.p_0}>または、以下のサービスでログイン</p>
                <div className={styles.div_2}>
                    <div className={styles.div_3}>
                        <img src={'/images/logos/apple.png'} alt={'logoApple'} className={styles.img_0}/>
                    </div>3
                    <div className={styles.div_3} onClick={() => {signIn('google', {callbackUrl: '/'})}}>
                        <img src={'/images/logos/google.png'} alt={'logoGoogle'} className={styles.img_0}/>
                    </div>
                </div>
            </div>
            <div>
                {/*<button className={styles.button} onClick={() => {*/}
                {/*    signIn('google')*/}
                {/*}}>googleでログイン*/}
                {/*</button>*/}
            </div>
        </div>
    )


};

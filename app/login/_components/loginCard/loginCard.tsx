import styles from './loginCard.module.css'
import {use, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {setIsLoggedIn, setLoginStatus} from "@/redux/slices/loginStatusSlice";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {LoginStatusScheme} from "@/types";
import { signIn, useSession } from 'next-auth/react';

export default function LoginCard() {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted ? `${styles['div_0']} ${styles['mounted']}` : styles['div_0'];
    const dispatch = useDispatch<AppDispatch>();
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);
    const session = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // ログイン画面にてまずsessionがあるかを確認し、あればそのままログイン状態にする
    // その後、sessionがない場合はログイン画面を表示する
    const fetchuserdata = async () => {
        const res = await fetch('api/login/', {method: 'POST', body: JSON.stringify({email: session.data?.user?.email})})
        const data = await res.json();
        dispatch(setLoginStatus(data));
    }
    // 初回レンダリング時とsessionが変化したときに実行
    useEffect(() => {
       if (session?.status === 'authenticated' && LoginStatus?.isLoggedIn) {
           dispatch(setIsLoggedIn(true));
           // ここにもredux?
           router.push('/');　
       }else if (session?.status === 'authenticated' && !LoginStatus?.isLoggedIn) {
           // 新規登録画面に遷移router.push('');
       }
    }, [session?.status]);

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
                        <img src={'/images/logoGoogle.png'} alt={'logoGoogle'} className={styles.img_0}/>
                    </div>
                    <div className={styles.div_3}>
                        <img src={'/images/logoApple.png'} alt={'logoApple'} className={styles.img_0}/>
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

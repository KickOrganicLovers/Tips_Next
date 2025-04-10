import styles from './loginCard.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {setIsLoggedIn, setLoginStatus} from "@/redux/slices/loginStatusSlice";
import {postDataToServerWithJson} from "@/lib-client/fetch";
import {LoginStatusScheme} from "@/types";
import { signIn, useSession } from 'next-auth/react';
import Link from "next/link";

export default function LoginCard() {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted ? `${styles['div_0']} ${styles['mounted']}` : styles['div_0'];
    const dispatch = useDispatch<AppDispatch>();
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);
    const session = useSession();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchuserdata = async () => {

          if (session.status === 'authenticated') {
              const data = await fetch('api/login/', {method: 'POST', body: JSON.stringify({email: session.data?.user?.email})})
              return await data.json();
             }
         else{
             return null;
         };

     }

     useEffect(() => {
         fetchuserdata().then((data)=> {
             console.log(data);
            //  router.push('/');
         })
     }, [session])




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
                <input className={styles.input} type={`email`} name={'email'} value={email} placeholder={'メールアドレス'}
                       onChange={(e) => {
                           setEmail(e.target.value)
                       }}/>
                <input className={styles.input} type={'password'} name={'password'} value={password} placeholder={'パスワード'}
                       onChange={(e) => {
                           setPassword(e.target.value)
                       }}/>
                <button className={styles.button} onClick={handleLogin}>ログイン</button>
            </div>
            <div>
                <button className={styles.button} onClick={() =>{signIn('google')}}>googleでログイン</button>
            </div>
            <div>
                <Link href="/signup"><a>アカウントを作成</a></Link>
            </div>
        </div>
    )
}

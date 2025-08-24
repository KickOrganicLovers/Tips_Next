import styles from './loginCard.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn, useSession} from 'next-auth/react';
import {CiCircleAlert} from "react-icons/ci";
import {FiAlertCircle} from "react-icons/fi";
import {FaApple, FaGoogle} from "react-icons/fa";

export default function LoginCard() {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted ? `${styles['div_0']} ${styles['mounted']}` : styles['div_0'];
    const session = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>();


    //ログインしsessionを更新する。エラーがある場合はエラーを分析してステートにセットする。セットされたステートはpタグを通して表示される。
    const handleLogin = async (e: React.FormEvent) => {
         e.preventDefault();
         try{
             const result = await signIn("credentials", {
                 redirect: false,
                 email,
                 password,
             });

             if(!result){
                 setError('サーバーとの通信に失敗しました');
             }else if(!!result.error) {
                 setError(result.error)
             }
         }catch (error){
             if(error instanceof Error){
                 setError(error.message)
             }else {
                setError('内部エラーが発生しました。しばらく待ってからもう一度お試しください。');
             }
         }
    };


    useEffect(() => {
        if(session.status === 'authenticated'){
            router.push('/');
        }
    }, [session.status]);

    return (
        <div className={className}>
            <img src='/images/logoTitle.png' alt='PageIcon' className={styles.img}/>
            <h1 className={styles.h1}>Tipsにログイン</h1>
            <div className={styles.div_1}>
                <input className={styles.input_0} type={`email`} name={'email'} value={email}
                       placeholder={'メールアドレス'}
                       onChange={(e) => {
                           setEmail(e.target.value)
                       }}/>
                <input className={styles.input_0} type={'password'} name={'password'} value={password}
                       placeholder={'パスワード'}
                       onChange={(e) => {
                           setPassword(e.target.value)
                       }}/>

                {error && <p className={styles.p_1}><FiAlertCircle className={styles.FiAlertCircle}/>{error}</p>}

                <button className={styles.button} onClick={handleLogin}>ログイン</button>
                <p className={styles.p_0}>または、以下のサービスでログイン</p>
                <div className={styles.div_2}>
                    <div className={styles.div_3}>
                        <FaGoogle className={styles.FaGoogle}
                                  onClick={() => {signIn('google', {callbackUrl: '/'});}}/>
                    </div>
                    <div className={styles.div_3}>
                        <FaApple className={styles.FaApple}/>
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

import styles from './loginCard.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {setIsLoggedIn, setLoginStatus} from "@/redux/slices/loginStatusSlice";


export default function LoginCard() {
    const [isMounted, setIsMounted] = useState(false);
    const className = isMounted ? `${styles['div_0']} ${styles['mounted']}` : styles['div_0'];
    const dispatch = useDispatch<AppDispatch>();
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const url = '/api/login'
        const params = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
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

    const clickEventHandler = () => {
        login().then(data => {
            dispatch(setLoginStatus(data))
        }).catch(error => {
            console.error(error)
        })
    }


    useEffect(() => {
        if(LoginStatus.isLoggedIn){
            router.push('/')
        }else {
            setIsMounted(true);
        }
    })


    return (
        <div className={className}>
            <img src='/images/PageIcon.svg' alt='PageIcon' className={styles.img}/>
            <h1 className={styles.h1}>Tipsにログイン</h1>
            <div className={styles.div_1}>
                <input className={styles.input} type={`email`} name={'email'} placeholder={'メールアドレス'}
                       onChange={(e) => {
                           setEmail(e.target.value)
                       }}/>
                <input className={styles.input} type={'password'} name={'password'} placeholder={'パスワード'}
                       onChange={(e) => {
                           setPassword(e.target.value)
                       }}/>
                {(() => {return LoginStatus.error !== '' ? <p>{LoginStatus.error}</p> : null})()}
                <button className={styles.button} onClick={clickEventHandler}>ログイン</button>
            </div>
        </div>
    )
}

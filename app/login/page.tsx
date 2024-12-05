'use client'

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {useRouter} from "next/navigation";
import {applyWhereIam} from "@/redux/whereIamSlice";
import styles from './login.module.css'
import LoginCard from "@/app/login/_components/loginCard/loginCard";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    useEffect(() => {
        if(LoginStatus.isLoggedIn){
            router.push('/')
        }
        else {
            dispatch(applyWhereIam('login'))
        }
    })

    return (
        <div className={styles.div_0}>
            <LoginCard/>
        </div>
    )
}

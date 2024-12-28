'use client'

import {useEffect} from "react";
import {applyWhereIam} from "@/redux/slices/whereIamSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {useRouter} from "next/navigation";
import styles from './signup.module.css'
import SignupCard from "@/app/signup/_components/signupCard/signupCard";

export default function Page() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>(state => state.LoginStatus);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    useEffect(() => {
        if (LoginStatus.isLoggedIn) {
            router.push('/')
        } else {
            dispatch(applyWhereIam('signup'))
        }
    })


    return (
        <div className={styles.div_0}>
            <SignupCard/>
        </div>
    )
}

'use client'

import styles from './login.module.css'
import LoginCard from "@/app/login/_components/loginCard/loginCard";
import {use, useEffect} from "react";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const session = useSession();

    useEffect(() => {
        applyWhereIam('login')
    }, []);
    useEffect(() => {
    console.log('session in login page', session)}, [session]);
    return (
        <div className={styles.div_0}>
            <LoginCard/>
        </div>
    )
}

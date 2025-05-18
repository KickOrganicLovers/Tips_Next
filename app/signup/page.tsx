'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import styles from './signup.module.css'
import SignupCard from "@/app/signup/_components/signupCard/signupCard";
import useLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";
import useWhereIamStore from "@/lib/lib-client/stores/whereIamStore";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const loginStatus = useLoginStatusStore(state => state.loginStatus)
    const router = useRouter()

    useEffect(() => {
        if (loginStatus.isLoggedIn) {
            router.push('/')
        } else {
            applyWhereIam('signup')
        }
    })


    return (
        <div className={styles.div_0}>
            <SignupCard/>
        </div>
    )
}

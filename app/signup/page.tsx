'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import styles from './signup.module.css'
import SignupCard from "@/app/signup/_components/signupCard/signupCard";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import {useSession} from "next-auth/react";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session.status === 'authenticated') {
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

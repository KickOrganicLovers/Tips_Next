'use client'

import styles from './login.module.css'
import LoginCard from "@/app/login/_components/loginCard/loginCard";
import useWhereIamStore from "@/lib/lib-client/stores/whereIamStore";
import {useEffect} from "react";

export default function Page() {
    const applyWhereIam = useWhereIamStore(state => state.applyWhereIam)

    useEffect(() => {
        applyWhereIam('login')
    }, []);

    return (
        <div className={styles.div_0}>
            <LoginCard/>
        </div>
    )
}

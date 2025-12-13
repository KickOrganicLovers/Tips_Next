'use client'

import {getSession, SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/app/_components/themeProvider";
import Header from "@/app/_components/header/header";
import styles from "@/app/app.module.css";
import Main from "@/app/_components/main/main";
import SideBar from "@/app/_components/sideBar/sideBar";
import {ReactNode, useEffect, useState} from "react";
import {Session} from "next-auth";
import {useRouter} from "next/navigation";

export default function SessionWrapper ({children}: { children: ReactNode }) {
    const [session, setSession] = useState<Session>();
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.push('/')
            }else{
            }
        })
    }, [])

    return (
        <SessionProvider session={session}>
            <ThemeProvider>
                <Header/>
                <div className={styles.wrapper}>
                    <Main children={children}/>
                    <SideBar/>
                </div>
            </ThemeProvider>
        </SessionProvider>
    )
}

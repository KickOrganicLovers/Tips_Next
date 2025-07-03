'use client'

import {ReactNode, useEffect, useState} from "react";
import Header from "@/app/_components/header/header";
import styles from './app.module.css'
import Main from "@/app/_components/main/main";
import './globals.css'
import {Noto_Sans_JP} from "next/font/google"
import {useRouter} from "next/navigation";
import SideBar from "@/app/_components/sideBar/sideBar";
import 'dotenv/config'

import {SessionProvider} from "next-auth/react"
import {getServerSession} from "next-auth/next"
import {authOptions} from "@/lib/lib-server/auth";
import {Session} from "next-auth";
import {ThemeProvider} from "@/app/_components/themeProvider";
import ViewportHeightSetter from "@/app/_components/viewportHeightSetter";
import RouteProgress from "@/app/_components/header/atoms/routeProgress/routeProgress";


const noto_sans_jp = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['400', '600'],
})



export default  function RootLayout({children}: { children: ReactNode }) {
    const [session, setSession] = useState<Session>();
    const router = useRouter();

    useEffect(() => {
        getServerSession(authOptions).then((session) => {
            console.log('fuck')
            if(!!session){
                setSession(session)

                router.push('/')
            }}
        )}, [])

    return (
        <html lang='ja' className={noto_sans_jp.className}>
        <head>
            <title>Tips</title>
        </head>
        <body className={styles.body}>
        <ViewportHeightSetter/>
        <SessionProvider session={session}>
            <ThemeProvider>
                <Header/>
                <div className={styles.wrapper}>
                    <Main children={children}/>
                    <SideBar/>
                </div>
            </ThemeProvider>
        </SessionProvider>
        </body>
        </html>
    )
}

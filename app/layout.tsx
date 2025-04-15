'use client'

import {ReactNode, useEffect} from "react";
import Header from "@/app/_components/header/header";
import styles from './app.module.css'
import store, {AppDispatch, RootState} from "@/redux/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import Main from "@/app/_components/main/main";
import './globals.css'
import {Noto_Sans_JP} from "next/font/google"
import {usePathname} from "next/navigation";
import SideBar from "@/app/_components/sideBar/sideBar";
import 'dotenv/config'
import {json} from "node:stream/consumers";
import {setCategories} from "@/redux/slices/categoriesSlice";

import { SessionProvider, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib-server/auth";
import { useState } from "react";
import { Session } from "next-auth";




const noto_sans_jp = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['400', '600'],
})



export default  function RootLayout({children}: { children: ReactNode }) {
    const [session, setSession] = useState<Session>(); 

    useEffect(() => {
        getServerSession(authOptions).then((session) => {
            if(!!session){setSession(session)}}
        )}, [])

    return (
        <html lang='ja' className={noto_sans_jp.className}>
        <head>
            <title>Tips</title>
        </head>
        <body className={styles.body}>
        <SessionProvider session={session}> 
        <Provider store={store}>
            <Header/>
            <SideBar/>
            <Main children={children}/>
        </Provider>
        </SessionProvider> 
        </body>
        </html>
    )
}

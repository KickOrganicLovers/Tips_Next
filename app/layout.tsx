'use client'

import {ReactNode} from "react";
import Header from "@/app/_components/header/header";
import styles from './app.module.css'
import store, {RootState} from "@/redux/store";
import {Provider, useSelector} from "react-redux";
import SideBar from "@/app/_components/sideBar/sideBar";
import Main from "@/app/_components/main/main";
import './globals.css'
import {Noto_Sans_JP} from "next/font/google"

const noto_sans_jp = Noto_Sans_JP({
    subsets: ['latin'],
    weight: '400',
})


export default function RootLayout({children}: {children: ReactNode}) {

    return(
        <html lang='ja' className={noto_sans_jp.className}>
        <head>
            <title>Tips</title>
        </head>
        <body className={styles.body}>
            <Provider store={store}>
                <Header/>
                <SideBar/>
                <Main children={children}/>
            </Provider>
        </body>
        </html>
    )
}
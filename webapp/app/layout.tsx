import {ReactNode} from "react";
import styles from './app.module.css'
import './globals.css'
import {Noto_Sans_JP, Zen_Kaku_Gothic_Antique} from "next/font/google"
import 'dotenv/config'
import SessionWrapper from "@/app/sessionWrapper";
import classNames from "classnames";


const noto_sans_jp = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-noto'
})

const zen_kaku_gothic_antique = Zen_Kaku_Gothic_Antique({
    subsets: ['latin'],
    weight: ['300','400','500','700'],
    variable: '--font-zen'
})


export default  function RootLayout({children}: { children: ReactNode }) {


    return (
        <html lang='ja' className={classNames(noto_sans_jp.className, zen_kaku_gothic_antique.className)}>
        <head>
            <title>Cluee</title>
        </head>
        <body className={styles.body}>
        <SessionWrapper>
            {children}
        </SessionWrapper>
        </body>
        </html>
    )
}

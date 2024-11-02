import {ReactNode} from "react";
import Header from "@/app/_components/header/header";
import styles from './app.module.css'

export default function RootLayout({children}: {children: ReactNode}) {
    return(
        <html lang='ja'>
            <body className={styles.body}>
                <Header/>
                {children}
            </body>
        </html>
    )
}
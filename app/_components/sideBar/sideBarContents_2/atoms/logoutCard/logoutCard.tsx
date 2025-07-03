import styles from './logoutCard.module.css'
import AccountBanner from "@/app/_components/sideBar/sideBarContents_2/atoms/accountBanner/AccountBanner";
import {signOut, useSession} from "next-auth/react";
import {Dispatch, SetStateAction} from "react";
import {SettingsMode} from "@/types";

interface props {
    setSettingsMode: Dispatch<SetStateAction<SettingsMode>>
}

export default function LogoutCard (props: props) {
    const session = useSession();

    const clickEventHandler_logout = () => {
        signOut({callbackUrl: '/'})
    }

    const clickEventHandler_cancel = () => {
        props.setSettingsMode('default')
    }



    return (
        <div className={styles.div_0}>
            <AccountBanner/>
            <p className={styles.p_0}>ログイン中のアカウントからログアウトしてホームへ戻ります。</p>
            <div className={styles.div_1}>
                <button className={styles.button_0} onClick={clickEventHandler_logout}>続行</button>
                <button className={styles.button_0} onClick={clickEventHandler_cancel}>キャンセル</button>
            </div>
        </div>
    )
}

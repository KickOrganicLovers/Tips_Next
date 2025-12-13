import {IoMdSettings} from "react-icons/io";
import styles from './settingsButton.module.css'
import {useWhereIamStore} from "@/lib/lib-client/stores/whereIamStore";
import classNames from "classnames";
import {settingsAtom, sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";
import {useSession} from "next-auth/react";

export default function SettingsButton() {
    const session = useSession();
    const [settings, setSettings] = useAtom(settingsAtom)
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const className = settings.isActive ? classNames(styles.IoMdSettings, styles.active) : classNames(styles.IoMdSettings)

    const clickEventHandler = () => {
        setSettings({isActive: !settings.isActive})
        if(!sideBarStatus.isActive && !settings.isActive){
            setSideBarStatus({isActive: true})
        }
    }

    return (
        <IoMdSettings className={className} onClick={clickEventHandler} style={session.status !== "authenticated"? {display: 'none'} : undefined}/>
    )
}

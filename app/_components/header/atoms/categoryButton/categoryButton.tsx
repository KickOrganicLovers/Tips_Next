import {AiOutlineMenu} from "react-icons/ai";
import styles from './categoryButton.module.css'
import {useAtom} from "jotai";
import {settingsAtom, sideBarStatusAtom} from "@/lib/lib-client/atoms";

export default function CategoryButton() {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const [settings, setSettings] = useAtom(settingsAtom)
    const className = sideBarStatus.isActive ? `${styles['AiOutlineMenu']} ${styles['active']}` : `${styles['AiOutlineMenu']}`

    const clickEventHandler = () => {
        if(sideBarStatus.isActive) setSettings({isActive: false})
        setSideBarStatus({
            isActive: !sideBarStatus.isActive
        })
    }

    return (<AiOutlineMenu onClick={clickEventHandler} className={className}/>)

}

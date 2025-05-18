import {AiOutlineMenu} from "react-icons/ai";
import styles from './categoryButton.module.css'
import {useAtom} from "jotai";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";

export default function CategoryButton() {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const className = sideBarStatus.isActive ? `${styles['AiOutlineMenu']} ${styles['active']}` : `${styles['AiOutlineMenu']}`

    const clickEventHandler = () => {
        setSideBarStatus({
            isActive: !sideBarStatus.isActive
        })
    }

    return (<AiOutlineMenu onClick={clickEventHandler} className={className}/>)

}

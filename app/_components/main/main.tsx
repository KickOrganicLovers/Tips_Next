import {ReactNode} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './main.module.css'

export default function Main({children}: { children: ReactNode }) {
    const SideBarStatus = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    const className = SideBarStatus.isActive ? `${styles['fadeLayer']} ${styles['active']}` : `${styles['fadeLayer']}`

    return (
        <div className={styles.mainContent}>
            {children}
            <div className={className}></div>
        </div>
    )
}

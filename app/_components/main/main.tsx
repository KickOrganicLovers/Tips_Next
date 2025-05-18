import {ReactNode, useEffect} from "react";
import styles from './main.module.css'
import {useSession} from "next-auth/react";
import useLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";
import useCategoriesStore from "@/lib/lib-client/stores/categoriesStore";
import {useAtom} from "jotai";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";

export default function Main({children}: { children: ReactNode }) {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const className = sideBarStatus.isActive ? `${styles['fadeLayer']} ${styles['active']}` : `${styles['fadeLayer']}`
    const tryToLogin = useLoginStatusStore((state) => state.tryToLogin)
    const getCategories = useCategoriesStore(state => state.getCategories)
    const session = useSession()

    //Get categories from db and initialize categories state

    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        tryToLogin(session)
    }, [session.status]);

    return (
        <div className={styles.mainContent}>
            {children}
            <div className={className}></div>
        </div>
    )
}

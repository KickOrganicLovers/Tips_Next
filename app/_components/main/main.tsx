import {ReactNode, useEffect} from "react";
import styles from './main.module.css'
import {useSession} from "next-auth/react";
import {useAtom} from "jotai";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useCategoriesStore} from "@/lib/lib-client/stores/categoriesStore";
import {useUserStore} from "@/lib/lib-client/stores/userStore";
import ErrorCard from "@/app/_components/common/errorCard/errorCard";
import {useErrorStore} from "@/lib/lib-client/stores/errorsStore";

export default function Main({children}: { children: ReactNode }) {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const className = sideBarStatus.isActive ? `${styles['fadeLayer']} ${styles['active']}` : `${styles['fadeLayer']}`
    const tryToLogin = useUserStore((state) => state.tryToLogin)
    const getCategories = useCategoriesStore(state => state.getCategories)
    const session = useSession()
    const errors = useErrorStore(state => state.errors)

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
            <div className={styles.errorsSection}>
                {errors.map((error, index) => <ErrorCard error={error} index={index}/>)}
            </div>
        </div>
    )
}

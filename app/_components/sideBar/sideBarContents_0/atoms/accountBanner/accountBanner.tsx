import {AiOutlinePlusCircle} from "react-icons/ai";
import styles from './accountBanner.module.css'
import {useRouter} from "next/navigation";
import {UserScheme} from "@/types";
import {Dispatch, SetStateAction} from "react";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";
import {useSession} from "next-auth/react";
import {useUserStore} from "@/lib/lib-client/stores/userStore";

interface props {
    setSideBarStatus: Dispatch<SetStateAction<{ isActive: boolean }>>
}
export default function AccountBanner(props: props) {
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)
    const user = useUserStore(state => state.user)
    const router = useRouter()
    const session = useSession()


    const clickEventHandler_navigateToLogin = () => {
        router.push('/login')
        setSideBarStatus({isActive: false})
    }

    const clickEventHandler_navigateToSignup = () => {
        router.push('/signup')
        setSideBarStatus({isActive: false})
    }

    const clickEventHandler_navigateToCreateArticle = () => {
        router.push('/createArticle')
        setSideBarStatus({isActive: false})
    }

    const clickEventHandler_navigateTouser = () => {
        router.push('/user/me')
        setSideBarStatus({isActive: false})
    }


    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <img className={styles.img_0} src={user.image as string} alt='profileimage'/>
                {(() => session.status === 'authenticated' ? (
                    <p className={styles.p_1}
                       onClick={clickEventHandler_navigateTouser}>{user.name as string}</p>
                ) : (
                    <p className={styles.p_1} onClick={clickEventHandler_navigateToLogin}>ログイン</p>
                ))()}
            </div>
            <div className={styles.div_2}>
                {(() => session.status === 'authenticated' ? (
                    <div className={styles.div_3}>
                        <AiOutlinePlusCircle className={styles.AiOutlinePlusCircle}
                                             onClick={clickEventHandler_navigateToCreateArticle}/>
                        <p className={styles.p_0}>記事を作成</p>
                    </div>
                ) : (
                    <div className={styles.div_3}>
                        <AiOutlinePlusCircle className={styles.AiOutlinePlusCircle}
                                             onClick={clickEventHandler_navigateToSignup}/>
                        <p className={styles.p_0}>アカウントを作成</p>
                    </div>
                ))()}
            </div>
        </div>
    )
}

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {AiOutlinePlusCircle} from "react-icons/ai";
import styles from './accountBanner.module.css'
import {useRouter} from "next/navigation";
import {disable} from "@/redux/slices/sideBarStatusSlice";

export default function AccountBanner() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()


    const clickEventHandler_navigateToLogin = () => {
        router.push('/login')
        dispatch(disable())
    }

    const clickEventHandler_navigateToSignup = () => {
        router.push('/signup')
        dispatch(disable())
    }

    const clickEventHandler_navigateToCreateArticle = () => {
        router.push('/createArticle')
        dispatch(disable())
    }

    const clickEventHandler_navigateToUserProfile = () => {
        router.push('/userProfile')
        dispatch(disable())
    }



    return (
        <div className={styles.div_0}>
            <div className={styles.div_1}>
                <div className={styles.div_3}>
                    <img className={styles.img_0} src={LoginStatus.userProfile.profileImageUrl} alt='profileimage'/>
                </div>
                <div className={styles.div_4}>
                    {(() => LoginStatus.isLoggedIn ? (
                        <p className={styles.p_1} onClick={clickEventHandler_navigateToUserProfile}>{LoginStatus.userProfile.username}</p>
                    ) : (
                        <p className={styles.p_1} onClick={clickEventHandler_navigateToLogin}>ログイン</p>
                    ))()}
                </div>
            </div>
            <div className={styles.div_2}>
                {(() => LoginStatus.isLoggedIn ? (
                    <div className={styles.div_5}>
                        <AiOutlinePlusCircle className={styles.AiOutlinePlusCircle} onClick={clickEventHandler_navigateToCreateArticle}/>
                        <p className={styles.p_0}>記事を作成</p>
                    </div>
                ) : (
                    <div className={styles.div_5}>
                        <AiOutlinePlusCircle className={styles.AiOutlinePlusCircle} onClick={clickEventHandler_navigateToSignup}/>
                        <p className={styles.p_0}>アカウントを作成</p>
                    </div>
                ))()}
            </div>
        </div>
    )
}

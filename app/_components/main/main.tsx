import {ReactNode, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import styles from './main.module.css'
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import {ArticleScheme, CategoryScheme, UserProfileScheme} from "@/types";
import {setCategories} from "@/redux/slices/categoriesSlice";
import {useSession} from "next-auth/react";
import {resetLoginStatus, setLoginStatus, setUserProfile} from "@/redux/slices/loginStatusSlice";

export default function Main({children}: { children: ReactNode }) {
    const SideBarStatus = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    const className = SideBarStatus.isActive ? `${styles['fadeLayer']} ${styles['active']}` : `${styles['fadeLayer']}`
    const dispatch = useDispatch<AppDispatch>();
    const session = useSession()

    //Get categories from db and initialize categories state

    const getCategories = async () => {
        return await getDataFromServerWithJson<{categories: CategoryScheme[]; error: string}>('/api/getCategories');
    }

    const getUserProfile = async (userId: string) => {
        return await getDataFromServerWithJson<{userProfile: UserProfileScheme, error: string}>(`/api/getUserProfile?userId=${userId}`);
    }



    useEffect(() => {
        getCategories().then((json) => {
            if(!json.error){
                console.log(json.categories)
                dispatch(setCategories(json.categories))
            }
        })
    }, []);

    useEffect(() => {
        if(!!session){
            if(session.status === 'authenticated'){
                getUserProfile(session.data.user.id).then((json) => {
                    if(!json.error){
                        dispatch(setLoginStatus({
                            isLoggedIn: true,
                            error: '',
                            userProfile: json.userProfile,
                        }))
                    }else {
                        console.error(json.error)
                    }
                })
            }else if(session.status === 'unauthenticated') {
                dispatch(resetLoginStatus())
            }
        }
    }, [session.status]);

    return (
        <div className={styles.mainContent}>
            {children}
            <div className={className}></div>
        </div>
    )
}

import {ReactNode, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import styles from './main.module.css'
import {getDataFromServerWithJson} from "@/lib-client/fetch";
import {ArticleScheme, CategoryScheme, UserProfileScheme} from "@/types";
import {setCategories} from "@/redux/slices/categoriesSlice";

export default function Main({children}: { children: ReactNode }) {
    const SideBarStatus = useSelector<RootState, RootState['SideBarStatus']>((state) => state.SideBarStatus)
    const className = SideBarStatus.isActive ? `${styles['fadeLayer']} ${styles['active']}` : `${styles['fadeLayer']}`
    const dispatch = useDispatch<AppDispatch>();

    //Get categories from db and initialize categories state

    const getCategories = async () => {
        return await getDataFromServerWithJson<{categories: CategoryScheme[]; error: string}>('/api/getCategories');
    }


    useEffect(() => {
        getCategories().then((json) => {
            if(!json.error){
                console.log(json.categories)
                dispatch(setCategories(json.categories))
            }
        })
    }, []);


    return (
        <div className={styles.mainContent}>
            {children}
            <div className={className}></div>
        </div>
    )
}

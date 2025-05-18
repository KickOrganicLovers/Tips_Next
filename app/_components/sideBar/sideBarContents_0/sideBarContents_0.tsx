import styles from './sideBarContents_0.module.css'
import AccountBanner from "@/app/_components/sideBar/sideBarContents_0/atoms/accountBanner/accountBanner";
import CategoryCard from "@/app/_components/sideBar/sideBarContents_0/atoms/categoryCard/categoryCard";
import {useEffect} from "react";
import MyPageOptionsCard from "@/app/_components/sideBar/sideBarContents_0/atoms/myOptionsCard/myOptionsCard";
import FollowingAccountCard
    from "@/app/_components/sideBar/sideBarContents_0/atoms/followingAccountCard/followingAccountCard";
import {useTheme} from "@/app/_components/themeProvider";
import useLoginStatusStore from "@/lib/lib-client/stores/loginStatusStore";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";

export default function SideBarContents_0() {
    const {toggleTheme} = useTheme()
    const loginStatus = useLoginStatusStore((state) => state.loginStatus)
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)

    useEffect(() => {
    }, [loginStatus]);

    return (
        <div className={styles.div_0}>
            <AccountBanner loginStatus={loginStatus} setSideBarStatus={setSideBarStatus}/>
            <MyPageOptionsCard setSideBarStatus={setSideBarStatus}/>
            <FollowingAccountCard loginStatus={loginStatus} setSideBarStatus={setSideBarStatus}/>
            <CategoryCard setSideBarStatus={setSideBarStatus}/>
            <button onClick={toggleTheme} type="button">テーマ切り替え</button>
        </div>
    )
}

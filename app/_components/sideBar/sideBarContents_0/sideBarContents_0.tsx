import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import styles from './sideBarContents_0.module.css'
import AccountBanner from "@/app/_components/sideBar/sideBarContents_0/atoms/accountBanner/accountBanner";
import CategoryCard from "@/app/_components/sideBar/sideBarContents_0/atoms/categoryCard/categoryCard";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import MyPageOptionsCard from "@/app/_components/sideBar/sideBarContents_0/atoms/myOptionsCard/myOptionsCard";
import SubscribedAccountCard
    from "@/app/_components/sideBar/sideBarContents_0/atoms/subscribedAccountsCard/subscribedAccountCard";

export default function SideBarContents_0() {
    const LoginStatus = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)

    useEffect(() => {
        console.log(LoginStatus)
    }, [LoginStatus]);

    return (
        <div className={styles.div_0}>
            <AccountBanner loginStatus={LoginStatus}/>
            <MyPageOptionsCard/>
            <SubscribedAccountCard loginStatus={LoginStatus}/>
        </div>
    )
}

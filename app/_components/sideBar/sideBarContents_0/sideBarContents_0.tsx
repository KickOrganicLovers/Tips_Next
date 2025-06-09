import styles from './sideBarContents_0.module.css'
import AccountBanner from "@/app/_components/sideBar/sideBarContents_0/atoms/accountBanner/accountBanner";
import CategoryCard from "@/app/_components/sideBar/sideBarContents_0/atoms/categoryCard/categoryCard";
import {useEffect} from "react";
import MyPageOptionsCard from "@/app/_components/sideBar/sideBarContents_0/atoms/myOptionsCard/myOptionsCard";
import FollowingAccountCard
    from "@/app/_components/sideBar/sideBarContents_0/atoms/followingAccountCard/followingAccountCard";
import {sideBarStatusAtom} from "@/lib/lib-client/atoms";
import {useAtom} from "jotai";
import {useUserProfileStore} from "@/lib/lib-client/stores/userProfileStore";

export default function SideBarContents_0() {
    const userProfile = useUserProfileStore(state => state.userProfile)
    const [sideBarStatus, setSideBarStatus] = useAtom(sideBarStatusAtom)


    return (
        <div className={styles.div_0}>
            <AccountBanner userProfile={userProfile} setSideBarStatus={setSideBarStatus}/>
            <MyPageOptionsCard setSideBarStatus={setSideBarStatus}/>
            <FollowingAccountCard userProfile={userProfile} setSideBarStatus={setSideBarStatus}/>
            <CategoryCard setSideBarStatus={setSideBarStatus}/>
        </div>
    )
}
